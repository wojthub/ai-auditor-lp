# Pipeline audytu

> Czesc specyfikacji Smart Content Audit. Indeks: [CLAUDE.md](../CLAUDE.md)

## Architektura

### Pipeline audytu

Dwa tryby: **Content-only** i **Full** (domyslny, z benchmarkiem SERP).

```
[Uzytkownik]
    |
    v
[Krok 1: Input]
    ├── URL -> POST /api/extract (Bright Data Web Unlocker) -> Markdown
    │   └── cache: shared/crawl/{urlHash}.json + audits/{id}/01_extract.json
    ├── Tekst wklejony -> bezposrednio -> audits/{id}/01_extract.json
    └── Opcja: "Tryb Full (z analiza konkurencji)" -- checkbox
    |
    v
[Krok 2: CSI]
    ├── POST /api/csi (Gemini API) -> {CE, SC, CSI, predicate}
    │   └── cache: audits/{id}/02_csi.json
    ├── POST /api/serp-consensus (Gemini API) -- tylko tryb Full + keyword
    │   ├── searchSerp(keyword) -> top 10 (title+snippet) + PAA + related  [SERP cache hit]
    │   ├── Kontekst artykulu: tytul + snippet tresci (do analizy typ/format/perspektywa zrodla)
    │   ├── Gemini -> consensus CE/SC/CSI/Predicate + typ/format/perspektywa SERP + typ/format/perspektywa artykulu + alignment per pole (7 pol: 4 CSI + 3 content)
    │   ├── Server-side computeOverallAlignment() — srednia z 7 pol fieldAlignment (nadpisuje Gemini)
    │   └── Dane persisted -- zapisywane w DB (kolumna serp_consensus w tabeli audits) + opcjonalnie do orchestratora (CSI Alignment)
    └── Uzytkownik potwierdza lub edytuje (moze skorygowac CSI na podstawie konsensusu)
    |
    v
[Krok 2b: Benchmark SERP -- tylko tryb Full]
    ├── POST /api/serp (Bright Data SERP API) -> {organic URLs, PAA, related}
    │   └── cache: shared/serp/{keywordHash}.json + audits/{id}/03_serp.json
    ├── POST /api/extract (Bright Data Web Unlocker) x top 10 URLs -> Markdown konkurentow
    │   └── cache: shared/crawl/{urlHash}.json x10 + audits/{id}/04_competitors.json
    ├── Filtrowanie: tylko konkurenci z wordCount >= MIN_COMPETITOR_WORDS (domyslnie 100, konfigurowalny w /ustawienia) trafiaja do EAV extraction i scoring
    ├── Gemini API -> EAV extraction z konkurentow -> gaps P1-P4 + Content Format Intelligence + algorytmiczna klasyfikacja URR
    └── Gemini API -> Competitor scoring (1 call per competitor) -> estimatedCQS + estimatedCitability + summary
        └── cache: audits/{id}/05_benchmark.json (competitors[] zawiera pola scoring)
    |
    v
[Krok 3: Audyt]
    └── POST /api/audit (równoległe wywolania Gemini API via Promise.all)
        ├── CSI-A: CSI Alignment -> cache: 06_dimensions/csiAlignment.json -> zapis do DB
        ├── D1: Information Density -> cache: 06_dimensions/density.json -> zapis do DB
        ├── D2: EAV Structure -> cache: 06_dimensions/eav.json -> zapis do DB
        ├── D3: BLUF -> cache: 06_dimensions/bluf.json -> zapis do DB
        ├── D4: Chunk Optimization -> cache: 06_dimensions/chunk.json -> zapis do DB
        ├── D5: Cost of Retrieval -> cache: 06_dimensions/cor.json -> zapis do DB
        ├── D6: TF-IDF -> cache: 06_dimensions/tfidf.json -> zapis do DB
        ├── D7: Semantic Roles -> cache: 06_dimensions/srl.json -> zapis do DB
        ├── D8: Fan-Out i AIO -> cache: 06_dimensions/queryFanout.json -> zapis do DB
        └── EEAT: E-E-A-T -> cache: 06_dimensions/eeat.json -> zapis do DB
    |
    v
[Scoring]
    └── lib/scoring.ts -> CQS (0-100), AI Citability (0-10)
        └── cache: audits/{id}/07_scoring.json
    |
    v
[Generowanie raportu]
    └── POST /api/audit/[id]/report (Gemini API)
        -> rekomendacje BEFORE/AFTER, struktura H1/H2/H3, BLUF per H2
        -> analiza Title & Meta Description (current vs recommended, SEO best practices)
        -> tryb Full: + gaps P1-P4, benchmark vs SERP, Content Format Intelligence
        └── cache: audits/{id}/08_report.json
    |
    v
[Dashboard raportu]
    └── /audyt/[id] -> pelny raport z wykresami
        ├── Tab Podsumowanie: CQS, Citability, Radar, CSI, Walidacja SERP (z DB — tabela 7 wierszy: CE/SC/CSI/Predicate/Typ/Format/Perspektywa + kluczowe dane), Title & Description (current vs recommended), Top 10 SERP (3 metryki benchmarkowe: Śr. CQS/Citability/długość + tabela ranked competitors)
        └── Tab Eksport: Markdown (.md) + PDF (.pdf, client-side html2pdf.js + marked)
    |
    v
[Audit meta]
    └── cache: audits/{id}/_meta.json (podsumowanie wszystkich etapow)
```

### Klient AI (`lib/ai/client.ts`)

Klient Google GenAI SDK z per-call API key threading:

- **`callClaude(prompt, maxTokens?, apiKey?)`** — zwraca raw text
- **`callClaudeJSON<T>(prompt, maxTokens?, apiKey?)`** — zwraca parsed JSON (wrapper na `callClaudeJSONWithMeta`)
- **`callClaudeJSONWithMeta<T>(prompt, maxTokens?, apiKey?)`** — concurrent-safe, zwraca `{ data: T, meta: CallMeta }`. Użyj w `Promise.allSettled` zamiast `callClaudeJSON` + `getLastCallMeta()`.
- **`getLastCallMeta()`** — globalny singleton, bezpieczny TYLKO w kodzie sekwencyjnym (race condition w concurrent batches)
- **Client cache:** `getOrCreateClient(apiKey)` — reużywa client jeśli ten sam klucz. `resolveClient(apiKey?)` — fallback na `resolveCredential('GEMINI_API_KEY')`.
- **JSON mode:** `responseMimeType: 'application/json'` (natywny structured output Gemini)
- **Auto-retry:** jeśli `finishReason === 'MAX_TOKENS'` → ponawia z 2x tokenami
- **JSON repair:** `extractBalancedJSON()` — wyciąga pierwszy zbalansowany `{...}` obiekt z odpowiedzi z trailing garbage

### Sekwencyjne wywolania AI

Orkiestrator (`lib/ai/orchestrator.ts`) uruchamia wymiary **równolegle** via `Promise.all` (9 wymiarów + EEAT = 10 concurrent Gemini calls):

- **Per-call API key:** orchestrator otrzymuje `apiKey` z API route (`resolveGeminiKey(userId)`) i przekazuje go do wszystkich wywołań `callClaude`/`callClaudeJSON` jako parametr — brak globalnego singletona.
- **Batch 0 (tylko tryb Full):** SERP fetch + zachowanie source URL w `competitors[]` z pozycja SERP (wordCount: 0, nie crawlowany) + filtrowanie source z crawlingu + crawl remaining (failed crawls dodawane z wordCount: 0) + filtr `wordCount >= MIN_COMPETITOR_WORDS` dla EAV/scoringu + EAV extraction + **competitor scoring** (1 call AI per usable competitor -> estimatedCQS, estimatedCitability, summary, strengths, weaknesses) -> benchmark
- **Batch 1 (równolegle via Promise.all):** CSI-A, D1-D8, EEAT (9 wymiarów + EEAT = 10 concurrent calls)
  - CSI-A otrzymuje opcjonalnie `serpConsensus` (jesli dostepny z Kroku 2) -- wzbogaca analize o porownanie z konsensusem SERP
  - Kazdy wymiar zapisywany do DB natychmiast po zakonczeniu (`saveDimensionResults`)
  - `rawResponse` zapisywany razem z wynikiem wymiaru (surowa odpowiedz AI)
  - Polling w UI pokazuje biezacy postep (tylko jeden wymiar jako "running")
  - **Error handling per wymiar:** try/catch -- blad jednego wymiaru nie przerywa calego audytu (fallback: score=0, puste pola)
  - **Warning detection:** jesli AI zwroci score=0 i brak summary -> status `'warning'` w `_meta.json`
- **Batch 2 (po batch 1):** Generowanie raportu z rekomendacjami
  - `saveRecommendations` i `saveReportExtras` maja niezalezne try/catch -- blad jednego nie blokuje drugiego
  - Recommendation IDs generowane przez `nanoid()` (nie AI-generated `rec_N`)

**Cancellation:** Orchestrator sprawdza `getAuditStatus(auditId)` przed i po batchu równoległych wymiarów (nie między poszczególnymi — max ~15s opóźnienia detekcji). Jesli `'cancelled'` -- rzuca `AuditCancelledError` i konczy prace bez nadpisywania statusu w DB.

Szacowany czas:
- **Content-only:** ~15-25s (batch 1 rownolegle, 10 wywolan) + ~10-15s (batch 2) = ~25-40s
- **Full:** ~45-90s (batch 0 SERP+crawl+EAV+scoring rownolegle) + ~15-25s (batch 1, 10 wywolan rownolegle) + ~10-15s (batch 2) = ~70-130s

### Content Extraction: Bright Data Web Unlocker

Ekstrakcja tresci z URL realizowana przez **Bright Data Web Unlocker** -- HTTP API zwracajace raw HTML z JS rendering i anti-bot bypass. HTML konwertowany do Markdown przez `node-html-markdown`, nastepnie czyszczony przez `cleanContent()`.

**Wazne:** Source article extraction (Step 1 wizarda) **nie uzywa BM25** -- keyword nie jest wysylany. Parametr `keyword` w `crawlUrl()` jest ignorowany (Bright Data zwraca pelny HTML, content cleaning pipeline usuwa szum).

**Architektura:** Bright Data Web Unlocker to HTTP API -- serverless-compatible (Vercel), brak potrzeby osobnego serwera:

```
[Next.js API Route: /api/extract]
    |
    └── POST https://api.brightdata.com/request { zone, url, format: 'raw' }
        |
        └── [lib/services/crawler.ts]
            ├── Bright Data zwraca raw HTML (z JS rendering)
            ├── extractTitle(html) -- regex <title> tag
            ├── extractDescription(html) -- 4 regex patterns (meta desc + og:desc, oba porzadki atrybutow)
            ├── node-html-markdown (HTML -> Markdown)
            ├── cleanContent(markdown) -- 14-krokowy pipeline w 4 fazach:
            │   ├── PRE-CLEAN (full markdown):
            │   │   ├── 1. HTML tag stripping (CMS plugins, WordPress glossary tooltips)
            │   │   ├── 2. Tooltip remnant cleanup (.Więcej") -> .)
            │   │   └── 3. Empty link stripping ([](url), [ ](url))
            │   ├── PRE-SPLIT (granice blokow):
            │   │   ├── 4. Heading boundaries (\n\n przed i po # / ## / ###)
            │   │   ├── 5. Horizontal rule boundaries (\n\n wokol --- / ***)
            │   │   └── 6. Navigation transition boundaries (\n\n przed liniami >70% link density po tekscie)
            │   ├── BLOCK FILTERING (po split na \n{2,}):
            │   │   ├── 7. Block deduplication (responsive nav 3x -> 1x)
            │   │   ├── 8. Blacklista ~25 fraz (nawigacja/UI, GDPR, e-commerce, social)
            │   │   ├── 9. Category listing filter (3+ wzorcow (\d+) = odrzucone)
            │   │   ├── 10. Concatenated nav filter (3+ lowercase→uppercase bez spacji = odrzucone)
            │   │   └── 11. Link density filter (>50% = odrzucone)
            │   └── POST-CLEAN (per block):
            │       ├── 12. Image link removal (![alt](url))
            │       ├── 13. Markdown link stripping ([text](url) -> text)
            │       └── 14. Whitespace collapse (spacje, \n{3,} -> \n\n)
            └── Response: { title, description (meta/og:description), content (cleaned markdown), wordCount }
```

**Bezpieczenstwo URL:**
- Blokowanie non-HTTP schemes (file://, ftp://)
- Blokowanie localhost (127.0.0.1, ::1)
- Blokowanie prywatnych zakresow IP (10.x, 172.16-31.x, 192.168.x)

**TypeScript wrapper** (`lib/services/crawler.ts`):
- Wywoluje `POST https://api.brightdata.com/request` z Bearer token + zone + url
- Auth: `Authorization: Bearer ${BRIGHTDATA_API_TOKEN}`, zone: `BRIGHTDATA_UNLOCKER_ZONE`
- Retry z exponential backoff (3 proby, brak retry na 4xx)
- Timeout: 60s per URL
- Min content: 500 znakow (krotsze = odrzucone)
- Concurrent: 5 rownolegych (batch crawl w orchestratorze)
- **Brak BM25 filtering** -- parametr `keyword` ignorowany
- **Brak accordion expansion** -- Bright Data renderuje JS ale nie wstrzykuje custom scripts

### SERP API: Bright Data

Dane SERP pobierane z **Bright Data SERP API** -- ten sam vendor co Web Unlocker, jedno API z dwoma strefami (zones).

**Endpoint:** `POST https://api.brightdata.com/request`

**Auth:** Bearer token (`BRIGHTDATA_API_TOKEN`) + zone (`BRIGHTDATA_SERP_ZONE`)

**TypeScript wrapper** (`lib/services/dataforseo.ts` -- nazwa pliku legacy):

```typescript
async function searchSerp(keyword: string, locationCode = 2616, languageCode = 'pl') {
  const apiToken = await resolveCredential('BRIGHTDATA_API_TOKEN');
  const zone = await resolveCredential('BRIGHTDATA_SERP_ZONE');

  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&hl=${languageCode}&gl=${languageCode}&num=10&brd_json=1`;

  const response = await fetch('https://api.brightdata.com/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`,
    },
    body: JSON.stringify({ zone, url: googleUrl, format: 'raw' }),
    signal: AbortSignal.timeout(30_000),
  });

  const data = await response.json();

  return {
    organic: (data.organic || []).slice(0, 10).map((o) => ({
      position: o.rank ?? o.global_rank,
      title: o.title || '',
      url: o.link || '',
      domain: o.display_link || '',
      description: o.description || '',
    })),
    paa: (data.people_also_ask || []).map((p) => p.question).filter(Boolean),
    related: (data.related || []).flatMap((r) =>
      r.items ? r.items.map((i) => i.text).filter(Boolean) : (r.text ? [r.text] : [])
    ),
  };
}
```

**Mapowanie pol Bright Data -> nasz model:**

| Bright Data | Nasz `OrganicResult` |
|-------------|---------------------|
| `rank` / `global_rank` | `position` |
| `title` | `title` |
| `link` | `url` |
| `display_link` | `domain` |
| `description` | `description` |
| `people_also_ask[].question` | `paa: string[]` |
| `related[].text` / `related[].items[].text` | `related: string[]` |

**Related searches:** Bright Data zwraca `related[]` w dwoch formatach -- carousel items (`items[].text`) + proste (`text`). `flatMap` w `dataforseo.ts` wyciaga oba typy.

**PAA guard:** PAA moze byc puste (`[]`) dla niektorych fraz. Route `serp-consensus` wymusza `topPaaSignals: []` gdy zrodlowe PAA bylo puste (`hadPaaData` check) -- zapobiega fabrykacji pytan przez Gemini.
