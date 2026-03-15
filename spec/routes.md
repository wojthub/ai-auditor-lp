# Strony i API Routes

> Czesc specyfikacji Smart Content Audit. Indeks: [CLAUDE.md](../CLAUDE.md)

## Strony / Routes

### Error Pages

- **`error.tsx`** — Route-level error boundary (Client Component). Łapie błędy renderowania w stronach (nie w layoutach). Wyświetla komunikat "Coś poszło nie tak" z przyciskiem "Spróbuj ponownie" (`reset()`). Używa Tailwind classes (CSS dostępne).
- **`global-error.tsx`** — Root layout error handler (Client Component). Fallback gdy `layout.tsx` lub `error.tsx` rzuci błąd. Wymaga własnych `<html>/<body>` tagów i **inline styles** (brak dostępu do CSS/Tailwind). Kolory hardcoded (#F8F9FA bg, #4F46E5 accent).
- **`not-found.tsx`** — Custom 404 page. Logo AI + "Strona nie została znaleziona" + link `<Link href="/">` (next/link). Używa Tailwind classes.

### Dashboard (`/`)

Lista audytow z kolumnami: tytul, data, **dwa SVG circular progress rings** (CQS 0-100 + AI Citability 0-10 -- kolory wg progów: zielony/zolty/czerwony), status, przycisk usun. Przycisk "Nowy audyt". Siatka 10 wymiarow z popupem wyjasniajacym (DimensionInfoGrid).

- Kazdy audyt ma przycisk usuwania (ikona kosza) z potwierdzeniem (Usun/Nie)
- Jesli audyt jest w toku -- automatycznie anuluje przed usunieciem
- Kaskadowe usuwanie: dimensions, eeat, recommendations, eav, benchmark, audit
- Implementacja: `AuditListItem` (Client Component) + `deleteAuditAction` (Server Action)

### Wizard (`/nowy-audyt`)

Server Component (`page.tsx`) laduje audyty i opakowuje w `SidebarWrapper`. Obsluguje `searchParams.from` -- jesli podane, pobiera stary audyt z DB i tworzy `WizardPrefill` (sourceUrl, keyword, mode, csi) przekazywany do WizardContent. Client Component (`WizardContent.tsx`) zawiera `WizardShell` z `useReducer` i 4 kroki:

**Krok 1 -- Zrodlo tresci:**
- Przelacznik: URL / Wklej tekst
- Pole URL + przycisk "Pobierz" (POST /api/extract)
  - Gdy URL wklejony ale nie pobrany: hint "Kliknij Pobierz" + animacja glow na przycisku (custom keyframe `glow-accent`)
- Textarea do wklejenia tekstu Markdown
- Pole "Slowo kluczowe" (opcjonalne, wymagane w trybie Full)
- Checkbox: "Tryb Full (analiza konkurencji z SERP)" -- domyslnie zaznaczony
- Status check: zielony check + liczba slow (>= 100) lub czerwony alert (< 100), klik otwiera popup z pelna trescia
- Walidacja: content > 100 slow

**Krok 2 -- Definicja CSI:**
- Auto-inferowanie CSI (POST /api/csi) z full-screen loaderem (lista pol: CE, SC, CSI, Predicate z mini-spinnerami)
- 4 edytowalne pola: CE, SC, CSI, Predicate (etykiety po polsku)
- **Walidacja SERP Consensus** (tryb Full + keyword): po inferowaniu CSI automatyczny fetch `POST /api/serp-consensus` z tytulem + snippetem tresci:
  - Tabela porownawcza 7 wierszy (CE, SC, CSI, Predicate, Typ, Format, Perspektywa) z alignment dots (zielony/zolty/czerwony) — kolumny: Źródło | Konsensus SERP
  - Panel "Walidacja SERP": badge zgodnosci (Wysoka/Czesciowa/Niska — obliczana server-side ze sredniej 7 pol), explanation, tematy SERP (tagi), sygnaly PAA, kluczowe dane
  - Przycisk "Zwaliduj ponownie" po edycji pol CSI
  - Loading skeleton podczas fetch, error z przyciskiem "Ponow"
  - Nie blokuje uzytkownika -- moze potwierdzic CSI zanim consensus sie zaladuje
  - W trybie content-only lub bez keyword: panel nie jest renderowany
- Uzytkownik potwierdza lub edytuje

**Krok 3 -- Audyt w toku:**
- Tryb Full: dodatkowy etap "Benchmark SERP" (SERP fetch + crawl + EAV extraction)
- 10 pozycji (CSI-A + D1-D8 + EEAT) analizowanych **równolegle** (wszystkie jednocześnie) z animowanym statusem
- Wszystkie nieukończone wymiary oznaczone jako "running" podczas fazy analyzing
- Pasek postepu per kazdy etap (pending=0%, running=animacja, completed=100%, error=czerwony)
- **Popup cache JSON:** klikniecie na ukonczony etap otwiera modal z surowym cache (GET /api/audit/[id]/cache/[stage])
- Etap "Generowanie raportu" widoczny po zakonczeniu wszystkich wymiarow
- Przycisk **"Przerwij"** -- anuluje audyt na dowolnym etapie (POST /api/audit/[id]/cancel)
- Polling GET /api/audit/[id] co 3s
- Automatyczne przejscie do Kroku 4 po zakonczeniu

**Krok 4 -- Wyniki:**
- CQS (duzy numer 0-100) + AI Citability Score (0-10)
- Mini radar chart 9 wymiarow
- TOP 3 problemy
- **Etapy audytu z cache popup** -- lista wszystkich etapow (benchmark, 10 wymiarow, raport) z ikonka dokumentu; klik otwiera popup z cache JSON (identycznie jak w Kroku 3). Znika dopiero po przejsciu na pelny raport.
- Przycisk "Zobacz pelny raport" -> `/audyt/[id]`

### Raport audytu (`/audyt/[id]`)

Layout: sidebar + content, 4 zakladki (Tabs). Przycisk **"↻ Odśwież audyt"** w TopBar (widoczny tylko dla zakonczonych audytow) -- nawiguje do `/nowy-audyt?from=AUDIT_ID` z pre-wypelnionymi danymi (URL, keyword, tryb, CSI). Tresc i consensus NIE sa przenoszone -- musza byc re-crawlowane/re-walidowane.

**Tab 1 -- Podsumowanie:**
- ScoreCard CQS (0-100) + ScoreCard AI Citability (0-10)
- RadarChart (9 osi: CSI + D1-D8)
- Kontekst CSI (CE, SC, CSI)
- **Panel Walidacja SERP** (jesli `serpConsensus` zapisany w DB): tabela porownawcza 7 wierszy (CE, SC, CSI, Predicate, Typ, Format, Perspektywa) — kolumny Źródło vs Konsensus SERP z alignment dots per pole, badge zgodnosci (obliczana ze sredniej 7 pol), explanation, tematy SERP (tagi), sygnaly PAA, kluczowe dane. Backward compat: stare audyty bez serpConsensus — panel nie renderowany.
- **Karta Title & Description** (jesli `reportExtras.titleDescription`): current title/desc z badge dlugosci (zielony/zolty/czerwony wg SEO best practices) + analiza AI + recommended title/desc na zielonym tle. Backward compat: stare audyty — karta nie renderowana.
- Tabela wymiarow (nazwa, score, status badge, top problem)
- **Top 10 SERP** (tryb Full): polaczona karta z 3 metrykami benchmarkowymi (Śr. CQS SERP, Śr. Citability, Śr. długość treści w słowach) + tabela top 10 posortowana wg pozycji SERP, scored competitors z CQS/Citability (klikalne wiersze z rozwinieciem strengths/weaknesses), wykluczona konkurencja wyszarzona na swoim miejscu z informacja "wykluczone — za malo tresci (X slow)"

**Tab 2 -- Wymiary:**
- 9 kart DimensionCard (CSI-A + D1-D8: score, summary, klikalne)
- Po kliknieciu -> DimensionDetail z: mocne strony, problemy z BEFORE/AFTER, dane dodatkowe (zalezne od wymiaru)
- CSI-A: Pokrycie encji (tabela pokrytych + luk P1-P4) + Macierz EAV (tagi) (tryb Full)
- Graf wiedzy (EAV): KnowledgeGraph (graf) + EAVTable (trójki z badge pokryte/unikalne/luka) + Macierz EAV (tagi pokrycia) + Formaty treści
- D4 (Chunk): ChunkMap z dlugosciami sekcji
- D8 (Fan-Out i AIO): tabela sub-zapytan z grounding tags (CONFIRMED/OVERVIEW/PREDICTED/SERP-ONLY), coverage stats (badge pokryte/brak), lista niepokrytych sub-queries + AiOverviewCoverageCard (karta pokrycia AI Overview — przeniesiona z Summary tab)
- EEATCard z 4 wymiarami E-E-A-T

**Tab 3 -- Rekomendacje:**
- Sekcje: KRYTYCZNE (czerwone) / WYSOKIE (zolte) / SREDNIE (szare)
- Kazda rekomendacja: tytul, wymiar, BeforeAfter, wplyw, szacowany +CQS
- Proponowana struktura H1/H2/H3 (ChunkMap z [OK]/[ZMIEN]/[NOWA])
- BLUF per H2
- Brakujace terminy TF-IDF z mapowaniem do sekcji
- Transformacje SRL (CE Patient -> Agent)
- EEAT bloki do wdrozenia

**Tab 4 -- Eksport:**
- Podglad Markdown
- Przyciski: "Pobierz .md", "Pobierz .pdf", "Kopiuj do schowka"
- PDF generowany client-side: `marked` (markdown -> HTML) + `html2pdf.js` (HTML -> stylowany A4 PDF z typografia, tabelami, nagłówkami)

## API Routes

### POST /api/extract

Ekstrakcja tresci z URL via Bright Data Web Unlocker (HTTP API, serverless-compatible).

- **Request:** `{ url: string, keyword?: string }`
- **Response:** `{ title: string, description: string, content: string, wordCount: number }`
- **Logika:** Sprawdz shared crawl cache (`readSharedCache('crawl', url)`). Jesli cache hit i TTL < 24h -> zwroc z cache. Jesli miss -> `POST https://api.brightdata.com/request` (Web Unlocker zone, Bearer token), zapisz do shared cache (`writeSharedCache('crawl', url, result)`). Bright Data zwraca raw HTML, konwersja do markdown przez `node-html-markdown`, nastepnie `cleanContent()` -- 14-krokowy pipeline w 4 fazach: (1) Pre-clean: HTML tag stripping, tooltip cleanup, empty link stripping. (2) Pre-split: heading boundaries, horizontal rule boundaries, navigation transition boundaries. (3) Block filtering: deduplication, blacklista ~25 fraz, category listing filter, concatenated nav filter, link density filter (>50%). (4) Post-clean: image link removal, markdown link stripping, whitespace collapse. `extractTitle(html)` i `extractDescription(html)` wyciagaja metadane z HTML (regex). Walidacja URL (SSRF protection). Min content: 500 znakow.
- **Uwaga:** Parametr `keyword` w `crawlUrl()` jest ignorowany — Bright Data zwraca pelny HTML, content cleaning pipeline usuwa szum. BM25 nie jest uzywany.

### POST /api/serp

Pobranie wynikow SERP z Bright Data SERP API. Uzywane w trybie Full do budowy benchmarku.

- **Request:** `{ keyword: string, locationCode?: number, languageCode?: string }`
- **Response:** `{ organic: OrganicResult[], paa: string[], related: string[] }`
- **Logika:** Sprawdz shared SERP cache (`readSharedCache('serp', keyword)`). Jesli cache hit i TTL < 1h -> zwroc z cache. Jesli miss -> `POST https://api.brightdata.com/request` (SERP zone, Bearer token, URL = Google Search z `brd_json=1`), zapisz do shared cache (`writeSharedCache('serp', keyword, result)`). Parsowanie odpowiedzi: `organic[]` (rank/title/link/description), `people_also_ask[]` (question), `related[]` (text — dwa formaty: carousel items + proste). Defaults: `languageCode='pl'`, `gl=pl` w URL Google.
- **Wykorzystanie:** Tryb Full -> top 10 URLs z organic -> Bright Data Web Unlocker -> EAV extraction -> benchmark

### POST /api/csi

Inferowanie CSI z tresci artykulu.

- **Request:** `{ content: string, title: string }`
- **Response:** `{ centralEntity: string, sourceContext: string, centralSearchIntent: string, predicate: string }`
- **Logika:** Gemini API z promptem z `lib/ai/prompts/csi-definition.ts`. Odpowiedz w JSON.

### POST /api/serp-consensus

Walidacja CSI artykulu wobec konsensusu SERP (top 10 Google) + analiza typu/formatu/perspektywy tresci. Uzywane w Kroku 2 wizarda (tryb Full + keyword).

- **Request:** `{ keyword: string, csi: CSI, sourceTitle?: string, contentSnippet?: string }`
- **Response:** `SerpConsensus` (7 pol alignment: CE, SC, CSI, Predicate, contentType, contentFormat, contentAngle; analiza tresci SERP: contentType, contentFormat, contentAngle, contentData; analiza zrodla: sourceContentType, sourceContentFormat, sourceContentAngle; tematy i PAA)
- **Logika:**
  1. `searchSerp(keyword)` -- uzywa shared SERP cache (1h TTL), ten sam klucz co benchmark
  2. Top 10 organic (title + snippet) + PAA + related + kontekst artykulu (tytul + snippet tresci) -> `buildSerpConsensusPrompt(serpInput, csi, articleContext)` (`lib/ai/prompts/serp-consensus.ts`)
  3. `callClaudeJSON<SerpConsensus>(prompt)` -- Gemini analizuje SERP, buduje consensus, okresla typ/format/perspektywe SERP i artykulu, porownuje z CSI artykulu
  4. Walidacja alignment levels, predicatow, content analysis fields, sanitization
  5. **Server-side `computeOverallAlignment()`** -- oblicza ogolna zgodnosc ze sredniej WSZYSTKICH fieldAlignment (4 wymagane + do 3 opcjonalnych). Scoring: high=2, partial=1, low=0. Progi: avg>=1.5 -> high, avg>=0.75 -> partial, else -> low. Nadpisuje wartosc z Gemini.
  6. Zwrot `SerpConsensus`
- **Koszt:** 1 wywolanie Gemini (~800 tokenow output), 0 dodatkowych wywolan Bright Data (SERP cache hit)
- **Dane persisted:** zapisywane w DB (kolumna `serp_consensus` TEXT/JSON w tabeli `audits`) przy tworzeniu audytu. Wyswietlane w raporcie (tab Podsumowanie, panel "Walidacja SERP" z tabela porownawcza 7 wierszy). Opcjonalnie przekazywane do orchestratora (wymiar CSI Alignment)

### POST /api/audit

Uruchomienie audytu (asynchroniczny).

- **Request:** `{ content: string, title: string, sourceDescription?: string | null, csi: CSI, mode: AuditMode, keyword?: string, serpConsensus?: SerpConsensus }`
- **Response:** `{ auditId: string }`
- **Logika:**
  1. Tworzenie rekordu audytu w DB (`status: 'analyzing'`) + `writeStageCache(auditId, '01_extract', extractData)`
  2. `writeStageCache(auditId, '02_csi', csiData)`
  3. Tryb Full: `status: 'benchmarking'` -> SERP fetch (Bright Data SERP API) + crawl top 10 (Bright Data Web Unlocker) + EAV extraction (Gemini API) + **competitor scoring** (1 call per competitor -> estimatedCQS, estimatedCitability, summary, strengths, weaknesses) -> benchmark
     - `writeStageCache(auditId, '03_serp', serpData)`
     - `writeStageCache(auditId, '04_competitors', competitorData)`
     - `writeStageCache(auditId, '05_benchmark', benchmarkData)` — competitors[] zawiera pola scoring
  4. 10 równoległych wywolan Gemini API (CSI-A + D1-D8 + EEAT) via `orchestrator.ts` (`Promise.all`)
     - Tryb Full: prompty dostaja benchmark data (EAV matrix, gaps, PAA)
     - Per wymiar: `writeDimensionCache(auditId, dimensionId, result)`
  5. Parsowanie odpowiedzi do `DimensionResult[]`
  6. Obliczenie CQS i AI Citability (`lib/scoring.ts`) + `writeStageCache(auditId, '07_scoring', scores)`
  7. Zapis do DB, `status: 'generating_report'`
  8. Generowanie raportu (rekomendacje BEFORE/AFTER, struktura, transformacje SRL)
     - Tryb Full: + gaps P1-P4, benchmark vs SERP, Content Format Intelligence
     - `writeStageCache(auditId, '08_report', reportData)`
  9. Zapis do DB, `status: 'completed'` + `writeAuditMeta(auditId, meta)`

### GET /api/audit/[id]

Pobranie aktualnego stanu audytu (polling z wizarda).

- **Response:** `{ audit: Audit }`

### POST /api/audit/[id]/cancel

Anulowanie audytu w toku.

- **Response:** `{ success: true }` lub `{ error: string }`
- **Logika:** Sprawdza status w DB. Jesli audyt jest w stanie aktywnym (pending/extracting/benchmarking/analyzing/generating_report) -> ustawia `status: 'cancelled'`. Orchestrator sprawdza status przed kazdym batchem i przerywa prace. Nie mozna anulowac audytu w stanie terminalnym (completed/cancelled/error).

### GET /api/audit/[id]/cache/[stage]

Odczyt cache JSON per etap audytu (do podgladu w UI).

- **Params:** `stage` -- identyfikator wymiaru (np. `density`, `eav`, `eeat`) lub etapu (`benchmark`, `report`, `extract`, `csi`, `serp`, `competitors`, `scoring`)
- **Response:** `{ data: object }` lub `{ error: 'Cache not found' }` (404)
- **Logika:** Jesli `stage` jest ID wymiaru -> `readDimensionCache(id, stage)`. Jesli `stage` jest etapem -> mapuje na nazwe pliku (np. `benchmark` -> `05_benchmark`) i czyta `readStageCache(id, mappedStage)`.

### POST /api/audit/[id]/report

Wygenerowanie raportu z rekomendacjami.

- **Logika:** Gemini API z promptem `report-generation.ts` -- czyta wyniki wszystkich wymiarow i generuje priorytetyzowane rekomendacje BEFORE/AFTER, strukture H1/H2/H3, BLUF per H2, transformacje SRL, bloki EEAT.

### GET /audyt/[id]/eksport

Eksport raportu jako Markdown.

- **Response:** Plik `.md` z pelnym raportem w formacie z `audit-report-generator/SKILL.md`.

## Wzorce auth w Server Actions i API Routes

### Server Actions — `getCurrentUser()` poza try-catch

`getCurrentUser()` wywołuje `redirect('/login')` z `next/navigation` które rzuca specjalny Next.js error. Jeśli wewnątrz try-catch, redirect zostanie przechwycony i Server Action zwróci error response zamiast przekierowania.

```typescript
// ✅ POPRAWNIE — getCurrentUser() PRZED try
export async function myAction(): Promise<{ success: boolean; error?: string }> {
  const session = await getCurrentUser();
  try {
    // ... logika z session
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Błąd' };
  }
}

// ❌ ŹLE — redirect przechwycony przez catch
export async function myAction() {
  try {
    const session = await getCurrentUser(); // redirect() -> caught!
    // ...
  } catch (err) {
    return { error: 'Błąd' }; // redirect nigdy nie dojdzie do klienta
  }
}
```

### API Routes — `getSession()` z DB role refresh

`getSession()` odświeża rolę z bazy danych przy każdym wywołaniu (`getUserById()`). Jeśli user usunięty z DB → sesja unieważniona (return null). Chroni przed stale claims po zmianie roli admina.

### Per-call API key w AI routes

API routes przekazują per-user Gemini key jako parametr `apiKey` do funkcji AI:

```typescript
const geminiKey = await resolveGeminiKey(session.userId);
const result = await callClaudeJSON<T>(prompt, 8192, geminiKey);
```

Brak globalnego `setGeminiApiKey()` — eliminuje race conditions w concurrent batches.
