# Pipeline audytu

> Czesc specyfikacji CitationOne. Indeks: [CLAUDE.md](../CLAUDE.md)

## Architektura

### Pipeline audytu

Dwa tryby: **Content-only** i **Full** (domyslny, z benchmarkiem SERP).

```
[Uzytkownik]
    |
    v
[Krok 1: Input]
    ├── URL -> POST /api/extract (Bright Data Web Unlocker, fallback: Jina Reader) -> Markdown
    │   ├── cache: shared/crawl/{urlHash}.json + audits/{id}/01_extract.json
    │   └── POST /api/keyword-volume (DataForSEO Keywords Data) -> search volume badge
    ├── Tekst wklejony -> bezposrednio -> audits/{id}/01_extract.json
    └── Opcja: "Tryb Full (z analiza konkurencji)" -- checkbox
    |
    v
[Krok 2: CSI]
    ├── POST /api/csi (Gemini API) -> {CE, SC, CSI, predicate}
    │   └── cache: audits/{id}/02_csi.json
    ├── POST /api/serp-consensus (Gemini API) -- tylko tryb Full + keyword
    │   ├── searchSerp(keyword) -> top 10 (Bright Data, fallback: DataForSEO) + PAA + related  [SERP cache hit]
    │   ├── Kontekst artykulu: tytul + snippet tresci (do analizy typ/format/perspektywa zrodla)
    │   ├── Gemini -> consensus CE/SC/CSI/Predicate + typ/format/perspektywa SERP + typ/format/perspektywa artykulu + alignment per pole (7 pol: 4 CSI + 3 content)
    │   ├── Server-side computeOverallAlignment() — wazona srednia z hard cap (CE/Predicate 2x, hard cap: CE=low|Predicate=low → overall=low) (nadpisuje Gemini)
    │   └── Dane persisted -- zapisywane w DB (kolumna serp_consensus w tabeli audits) + opcjonalnie do orchestratora (CSI Alignment)
    └── Uzytkownik potwierdza lub edytuje (moze skorygowac CSI na podstawie konsensusu)
    |
    v
[Krok 2b: Benchmark SERP -- tylko tryb Full]
    ├── POST /api/serp (Bright Data SERP API, default SERP — no udm param) -> {organic URLs, PAA, related}
    │   ├── Filtr social media/video (YouTube, Facebook, Instagram, TikTok, etc.) z organic results
    │   └── cache: shared/serp/{keywordHash}.json + audits/{id}/03_serp.json
    ├── POST /api/extract (Bright Data Web Unlocker) x top 10 URLs -> Markdown konkurentow
    │   └── cache: shared/crawl/{urlHash}.json x10 + audits/{id}/04_competitors.json
    ├── Filtrowanie: tylko konkurenci z wordCount >= MIN_COMPETITOR_WORDS (domyslnie 100, konfigurowalny w /ustawienia) trafiaja do EAV extraction i scoring
    ├── Gemini API -> EAV extraction z konkurentow -> gaps P1-P4 + Content Format Intelligence + algorytmiczna klasyfikacja (wewnetrznie URR: UNIQUE/ROOT/RARE, UI label: "Klasyfikacja")
    └── Gemini API -> Competitor scoring (1 call per competitor) -> estimatedCQS + estimatedCitability + summary
        └── cache: audits/{id}/05_benchmark.json (competitors[] zawiera pola scoring)
    |
    v
[Resolve Content Type Profile]
    └── resolveProfile(serpConsensus.contentType.primary) -> ContentTypeProfile
        ├── Fuzzy matching free-form stringa na 8 profili (article/listing/product/comparison/faq/landing/encyclopedia/tool)
        ├── Profil ID zapisywany w DB (audits.content_type_profile)
        ├── Wagi CQS/Citability i instrukcje per wymiar przekazywane do pipeline'u
        └── Fallback: 'article' (brak serpConsensus lub nierozpoznany typ)
    |
    v
[Krok 3: Audyt]
    └── POST /api/audit (równoległe wywolania Gemini API via Promise.all)
        ├── Prompty adaptowane do profilu: instrukcja kontekstowa + relabel "Artykul" -> "Treść (Typ)"
        ├── CSI-A: CSI Alignment -> cache: 06_dimensions/csiAlignment.json -> zapis do DB
        ├── D1: Information Density -> cache: 06_dimensions/density.json -> zapis do DB
        ├── D2: EAV Structure -> cache: 06_dimensions/eav.json -> zapis do DB
        ├── D3: BLUF -> cache: 06_dimensions/bluf.json -> zapis do DB
        ├── D4: Chunk Optimization -> cache: 06_dimensions/chunk.json -> zapis do DB
        ├── D5: Cost of Retrieval -> cache: 06_dimensions/cor.json -> zapis do DB
        ├── D6: TF-IDF -> cache: 06_dimensions/tfidf.json -> zapis do DB
        ├── D7: Semantic Roles -> cache: 06_dimensions/srl.json -> zapis do DB
        ├── D8: Fan-Out i AIO -> cache: 06_dimensions/queryFanout.json -> zapis do DB
        └── EEAT: E-E-A-T (pre-detekcja sygnalow regex/keyword via detectEeatSignals() -> blok wstrzykniety do prompta) -> cache: 06_dimensions/eeat.json -> zapis do DB
    |
    v
[Scoring]
    └── lib/scoring.ts -> CQS (0-100), AI Citability (0-10) z wagami z profilu typu tresci
        └── cache: audits/{id}/07_scoring.json
    |
    v
[Budowanie rekomendacji]
    └── lib/ai/recommendation-builder.ts (algorytmiczny, 0 Gemini calls)
        -> buildRecommendationsFromDimensions(dimensions, eeat, cqsWeights)
        -> DimensionProblem[] → Recommendation[] (priorytet z impact + waga CQS)
        -> fuzzy dedup (token overlap >=80%), cap 20, EEAT bonus recs
        -> saveRecommendations() — zapis do DB PRZED raportem (odporne na blad raportu)
        -> buildQuickWins(audit) — algorytmicznie max 7 quick wins (0 Gemini calls, Effort/Title/EEAT/TF-IDF/Fan-Out/BLUF/Chunk)
    |
    v
[Schema Auditor (algorytmiczny, 0 Gemini calls)]
    └── detectRecommendedSchemas(htmlMetrics.schemas, profileId, contentStructure)
        -> katalog ~14 typow schema.org (Article, BlogPosting, FAQPage, HowTo, Product, Review, BreadcrumbList, WebPage, etc.)
        -> detekcja: profil typu tresci + regex pattern matching + always recommended (BreadcrumbList, WebPage)
        -> per rekomendacja: type, label PL/EN, status (present/incomplete/missing), priority (required/recommended), presentProperties, missingRequired, missingRecommended, googleRichResult
        -> dane zapisywane w reportExtras.schemaAudit (brak migracji DB)
        -> backward compat: stare audyty bez schemas → sekcja ukryta
    |
    v
[Generowanie raportu (extras)]
    └── POST /api/audit/[id]/report (Gemini API, retry 2 proby)
        -> struktura H1/H2/H3, BLUF per H2
        -> analiza Title & Meta Description (current vs recommended, SEO best practices)
        -> tryb Full: + gaps P1-P4, benchmark vs SERP, Content Format Intelligence
        -> proponowana struktura zasilana: chunk optimization + gaps + sub-zapytania Fan-Out (POKRYTE/NIEPOKRYTE) + twierdzenia AI Overview (jesli obecne)
        -> NIE generuje rekomendacji (przeniesione do recommendation-builder)
        -> tfidfMissingTerms przekazywane jako `[]` (TF-IDF mapping usuniety z raportu — oszczednosc ~600-1200 tokenow)
        -> 7 zadan (bylo 8 — usuniety task 1 "rekomendacje")
        └── cache: audits/{id}/08_report.json
    |
    v
[Dashboard raportu]
    └── /audyt/[id] -> pelny raport z wykresami
        ├── Tab Podsumowanie: CQS, Citability, Radar, CSI, Walidacja SERP (z DB — tabela 7 wierszy: CE/SC/CSI/Predicate/Typ/Format/Perspektywa + kluczowe dane), Title & Description (current vs recommended), Top 10 SERP (keyword + volume + KD (estimated, avg DR/10) + 5 metryk benchmarkowych: Śr. CQS/Citability/długość/Wpływ jakości/Wpływ linków + tabela ranked competitors z DR/RD)
        ├── Tab Rekomendacje: priorytetyzowane (z recommendation-builder, generowane przed raportem)
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
- **Batch 0 (tylko tryb Full):** SERP fetch + zachowanie source URL w `competitors[]` z pozycja SERP (wordCount: 0, nie crawlowany) + filtrowanie source z crawlingu + crawl remaining (failed crawls dodawane z wordCount: 0) + filtr `wordCount >= MIN_COMPETITOR_WORDS` dla EAV/scoringu + EAV extraction + **competitor scoring** (1 call AI per usable competitor -> estimatedCQS, estimatedCitability, summary, strengths, weaknesses) + **backlinks fetch** (DataForSEO Backlinks Summary, domain-level DR/RD, ~$0.02/domain) -> benchmark
- **Batch 1 (równolegle via Promise.all):** CSI-A, D1-D8, EEAT (9 wymiarów + EEAT = 10 concurrent calls)
  - CSI-A otrzymuje opcjonalnie `serpConsensus` (jesli dostepny z Kroku 2) -- wzbogaca analize o porownanie z konsensusem SERP
  - **EEAT pre-detekcja:** przed budowaniem prompta EEAT, orchestrator wywoluje `detectEeatSignals(content, htmlMetrics)` z `eeat-detection.ts` — regex/keyword detekcja ~15 sygnalow. `formatPreDetectedSignals()` tworzy blok wstrzykiwany do `buildPrompt(..., preDetectedBlock)`. Gemini weryfikuje + ocenia sile (oszczednosc ~700-1000 tokenow/audyt)
  - Kazdy wymiar zapisywany do DB natychmiast po zakonczeniu (`saveDimensionResults`)
  - `rawResponse` zapisywany razem z wynikiem wymiaru (surowa odpowiedz AI)
  - Polling w UI pokazuje biezacy postep (tylko jeden wymiar jako "running")
  - **Error handling per wymiar:** try/catch -- blad jednego wymiaru nie przerywa calego audytu (fallback: score=0, puste pola)
  - **Warning detection:** jesli AI zwroci score=0 i brak summary -> status `'warning'` w `_meta.json`
- **Batch 2a (po batch 1):** Budowanie rekomendacji algorytmicznie z wymiarow + Schema Auditor
  - `buildRecommendationsFromDimensions()` w `recommendation-builder.ts` — 0 Gemini calls
  - Konwersja DimensionProblem[] → Recommendation[] z priorytetem, dedup, cap 20
  - `saveRecommendations()` — zapis do DB PRZED raportem (odporne na blad raportu)
  - Recommendation IDs generowane przez `nanoid()` (nie AI-generated `rec_N`)
  - `detectRecommendedSchemas()` w `schema-catalog.ts` — algorytmiczna analiza schema.org JSON-LD (0 Gemini calls), wynik zapisywany do `reportExtras.schemaAudit`
- **Batch 2b (po batch 2a):** Generowanie raportu (tylko extras)
  - Report prompt: 7 zadan (bylo 8 — usuniety task 1 "rekomendacje")
  - Generuje: struktura H1/H2/H3, BLUF per H2, SRL transforms, EEAT blocks, Title & Meta Description, AIO coverage. TF-IDF mapping task otrzymuje pusta liste (`[]`) — `tfidfMapping` puste (oszczednosc ~600-1200 tokenow/audyt). Konsumenci uzywaja `rawResponse.missingTerms`
  - Report retry (2 proby) — blad raportu nie traci rekomendacji (juz zapisane)
  - `saveReportExtras` z niezaleznym try/catch
  - `parseReportResponse()` nie zwraca juz rekomendacji

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
            ├── extractHtmlMetrics(html) -- m.in. JSON-LD schema.org parsing (wszystkie <script type="application/ld+json">, obsluga @graph z WordPress Yoast/RankMath) -> HtmlMetrics.schemas?: ExtractedSchema[]
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
- Retry z exponential backoff + jitter (3 proby, brak retry na 4xx). Logowanie kazdej nieudanej proby.
- Timeout: 60s per URL
- Min content: 500 znakow (krotsze = odrzucone)
- Concurrent: 5 rownolegych (batch crawl w orchestratorze)
- **Brak BM25 filtering** -- parametr `keyword` ignorowany
- **Brak accordion expansion** -- Bright Data renderuje JS ale nie wstrzykuje custom scripts

### SERP API: Bright Data

Dane SERP pobierane z **Bright Data SERP API** -- ten sam vendor co Web Unlocker, jedno API z dwoma strefami (zones).

**Endpoint:** `POST https://api.brightdata.com/request`

**Auth:** Bearer token (`BRIGHTDATA_API_TOKEN`) + zone (`BRIGHTDATA_SERP_ZONE`)

**TypeScript wrapper** (`lib/services/dataforseo.ts` -- nazwa pliku legacy).
Auto-retry: 2 ponowienia z 3s delay (max 3 proby). Retry na 5xx i timeout, bez retry na 4xx. `parseBrightDataResponse()` wyekstrahowana do osobnej funkcji.

```typescript
async function searchSerp(keyword: string, locationCode = 2616, languageCode = 'pl') {
  const apiToken = await resolveCredential('BRIGHTDATA_API_TOKEN');
  const zone = await resolveCredential('BRIGHTDATA_SERP_ZONE');

  // gl = country (LANG_TO_COUNTRY mapping: en→us, pl→pl, de→de), hl = language
  const gl = LANG_TO_COUNTRY[languageCode] || 'us';
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&hl=${languageCode}&gl=${gl}&num=10&brd_json=1`;

  const response = await fetch('https://api.brightdata.com/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`,
    },
    body: JSON.stringify({ zone, url: googleUrl, format: 'raw' }),
    signal: AbortSignal.timeout(30_000),
    cache: 'no-store', // zapobiega cache'owaniu przez Next.js na Vercel
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

## Inne narzedzia (obok audytu)

### Pipeline klasteryzacji slow kluczowych (`lib/clustering/`)

Grupowanie fraz kluczowych w tematyczne klastry na podstawie nakladania sie wynikow SERP (URL overlap).

```
[POST /api/clustering] → after() → runClustering()
    |
    v
[1. SERP fetch]
    ├── fetchSerpForKeywords(keywords, serpResults=5, concurrency=8)
    ├── Reuse searchSerp() z dataforseo.ts (Bright Data + DataForSEO fallback)
    └── Wynik: Map<keyword, url[]>
    |
    v
[2. Macierz + clustering]
    ├── buildUrlMatrix(keywordUrls) → binarna macierz keyword × URL
    ├── Cosine similarity miedzy wektorami URL-i
    └── Union-Find clustering (threshold default 0.95, minClusterSize default 1)
    |
    v
[3. Analiza + volumes — równolegle]
    ├── Gemini analiza per klaster (label, intent, pillar suggestion)
    └── DataForSEO batch volume fetch (do 700 keywords per call)
    |
    v
[4. Sort + zapis]
    └── Sort klastrow po totalVolume desc → zapis clusters JSON do DB
```

**Config:** `clusterThreshold` (0.5-1.0, default 0.95), `minClusterSize` (1-20, default 1), `serpResults` (1-10, default 5), `maxKeywords` (default 500).
**Koszt:** 1 kredyt per job. **maxDuration:** 600s.

### Pipeline content pruning & cannibalization (`lib/pruning/`)

Wykrywanie zbednych stron (tematycznie odbiegajacych) i kanibalizujacych sie tresci (zbyt podobne semantycznie).

```
[POST /api/pruning] → after() → runPruningAnalysis()
    |
    v
[1. Sitemap parse] (0-5%)
    ├── parseSitemap(url) — rekursywne XML, nested sitemaps, filtr mediow
    ├── SSRF walidacja URL-i
    └── Cap 2000 URL-i
    |
    v
[2. Page scrape] (5-40%)
    ├── scrapePages(urls, concurrency=8)
    ├── Lightweight: title, H1, meta description (direct fetch, nie Bright Data)
    ├── SSRF check, 5MB limit, HTML entity decoding
    └── Fail per URL → pominiete
    |
    v
[3. Embeddings] (40-55%)
    ├── generateEmbeddings(texts) — Gemini gemini-embedding-2-preview (configurable via EMBEDDING_MODEL_NAME)
    ├── 5 concurrent calls (1 text per call)
    └── Empty → zero vector fallback
    |
    v
[4. KMeans + TF-IDF] (55-65%)
    ├── KMeans clustering (KMeans++ init, Lloyd's algorithm)
    ├── Merge similar centroids (>=0.95 cosine similarity, BFS)
    └── TF-IDF top keywords per cluster → main topic + side topics
    |
    v
[5. Content Pruning] (65-70%)
    ├── Cosine distance od centroidu glownego klastra
    ├── Percentyl (default 90) → kandydaci do pruningu
    └── Wynik: PruningCandidate[]
    |
    v
[6. Kanibalizacja] (70-80%)
    ├── Pairwise cosine similarity (cap 1000 stron)
    ├── Threshold (default 0.9) → pary
    ├── BFS connected components → grupy
    └── Wynik: CannibalizationGroup[]
    |
    v
[7. Gemini expert analysis] (80-95%)
    ├── 3-5 pruning recommendations z content type/intent
    └── 2-3 cannibalization groups z recommendation
    |
    v
[8. Zapis] (95-100%)
    └── results JSON → DB (pruning_jobs)
```

**Config:** `pruningPercentile` (50-99, default 90), `cannibalizationThreshold` (0.7-1.0, default 0.9).
**Koszt:** 1 kredyt per job. **maxDuration:** 600s.
**Embedding model:** `gemini-embedding-2-preview` domyslnie, konfigurowalny via `EMBEDDING_MODEL_NAME` w `/ustawienia` (SettingKey w DB).

### Pipeline Schema Gaps (`lib/schema-gaps/`)

Sitemap-wide analiza schema.org JSON-LD — ekstrakcja istniejacych schemat + detekcja luk per strona + agregacja sitewide.

```
[POST /api/schema] → after() → runSchemaGapsAnalysis()
    |
    v
[1. Sitemap parse] (0-5%)
    ├── parseSitemap(url) — reuse z lib/pruning/sitemap-parser.ts
    ├── Rekursywne XML, nested sitemaps, filtr mediow
    ├── SSRF walidacja URL-i
    └── Cap 500 URL-i (Lambda timeout constraint, nizszy niz pruning 2000)
    |
    v
[2. Per-URL fetch + JSON-LD extraction] (5-85%)
    ├── Direct HTTP fetch (nie Bright Data — 0 kosztu)
    ├── 5 concurrent, 15s timeout per URL
    ├── redirect: 'error' — blokuje redirecty (SSRF defense)
    ├── validateUrl() na kazdym URL
    ├── cheerio: parsuje <script type="application/ld+json">
    ├── Obsluga @graph (WordPress Yoast/RankMath)
    ├── Bare JSON arrays: Array.isArray(json) przed @graph check
    ├── Fail per URL → pominiete (success rate tracking)
    └── Wynik: ExtractedSchema[] per URL
    |
    v
[3. Profile detection + gap analysis] (85-95%)
    ├── detectPageProfile(schemas, url, htmlBody) — heurystyka z 3 zrodel:
    │   ├── (1) Istniejace JSON-LD schemas (np. Product → 'product')
    │   ├── (2) URL patterns (np. /faq → 'faq', /produkt/ → 'product')
    │   └── (3) Content body patterns (regex na HTML)
    ├── detectRecommendedSchemas() per strona — reuse z schema-catalog.ts
    └── Wynik: SchemaPageResult[] (url, profile, schemas, recommendations, issues)
    |
    v
[4. Agregacja + zapis] (95-100%)
    ├── Site-wide summary: total pages, total issues, missing schemas ranking, profile distribution
    ├── Success rate logging (warning jesli <50%)
    └── results JSON → DB (schema_jobs)
```

**Koszt:** 1 kredyt per job, 0 Gemini calls, 0 Bright Data (direct HTTP fetch).
**Limity:** 500 URL cap, 5 concurrent fetches, 15s timeout per URL.
**maxDuration:** 600s.
**Error handling:** try-catch na sitemap parse, per-URL scraping, DB save. Success rate tracking + UI warning <50%. PL error messages.

### Pipeline Cluster Expansion (`lib/clustering/expand-cluster.ts`)

Rozszerzanie klastra o powiazane frazy kluczowe generowane przez Gemini, z walidacja embeddingami i wolumenem.

```
[POST /api/clustering/[id]/expand] (auth + ownership, maxDuration 60s)
    |
    v
[1. Prompt Gemini]
    ├── sanitize() na cluster label/keywords (strip markdown/instrukcje)
    ├── Gemini (temp 0.5) generuje 10-15 fraz z:
    │   ├── Ramka semantyczna (Agent/Cause/Result/Manner/Time/Quantity/Comparison)
    │   └── Terminologia (synonimy/hiponimy/meronimy)
    ├── Kazda fraza: keyword, type (longtail/question/variant/subtopic), suggestedTitle (50-65 zn.)
    └── Walidacja typow (odrzuca nieprawidlowe typy z Gemini)
    |
    v
[2. Dedup]
    └── Odrzucenie sugestii duplikujacych istniejace keywords klastra (exact match po lowercase)
    |
    v
[3. Embed + similarity]
    ├── Gemini embeddings: sugestie + keywords klastra
    ├── Obliczenie centroidu klastra (srednia wektorow keywords)
    └── Cosine similarity kazdej sugestii do centroidu
    |
    v
[4. Volume fetch]
    └── DataForSEO batch volume fetch (1 call per expand)
    |
    v
[5. Merge + zapis]
    ├── Merge sugestii z similarity + volume
    └── Aktualizacja clusters JSON w DB (pole suggestions w danym klastrze)
```

**Koszt:** 1 Gemini call + embeddings (~15 fraz) + volume fetch per expand. Bez dodatkowego kredytu.
**Limit:** 3 ekspansje per job (client-side enforcement, przycisk disabled po osiagnieciu).
**Graceful degradation:** embeddings fail → similarity=null, volume fail → volume=null.
**Prompt sanitization:** `sanitize()` stripuje markdown/instrukcje z user-influenced cluster label/keywords.

### Error handling — ulepszenia wspolne dla 3 narzedzi

Wszystkie 3 narzedzia standalone (Schema Gaps, Pruning, Clustering) stosuja wspolne wzorce error handling:

- **Schema Gaps:** pelne pokrycie try-catch (sitemap parse, per-URL fetch, DB save). Success rate tracking — orchestrator liczy udane vs nieudane fetche. UI: warning banner "Niska skutecznosc pobierania (X%)" gdy <50%
- **Pruning:** try-catch dodany na sitemap parse + embeddings batch + scraping. **Embeddings min 50% success threshold** — odrzuca caly job jesli >50% embeddingow zwraca zero vector (zamiast cichego fallbacku i generowania bezsensownych klastrow)
- **Clustering:** try-catch dodany na SERP fetch per keyword
- **Wspolne:** success rate logging we wszystkich pipeline'ach. Komunikaty bledow po polsku (PL error messages w `errorMessage` DB kolumnie)
