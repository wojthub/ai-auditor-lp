# CLAUDE.md -- Smart Content Audit

## Opis projektu

**Smart Content Audit** — webapp do audytu contentu pod katem AI Search (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot). Analizuje tresci przez pryzmat **9 wymiarow jakosci + CSI Alignment + E-E-A-T**, integruje dane **AI Overview** z Google SERP i generuje raport z:

- **Content Quality Score (CQS)** 0-100
- **AI Citability Score** 0-10
- Priorytetyzowane rekomendacje **BEFORE/AFTER**

Narzedzie wewnetrzne. Jezyk interfejsu: **polski**. Light theme.

## Stack technologiczny

- **Framework:** Next.js 16 (App Router, SSR + API Routes)
- **Runtime:** React 19, TypeScript strict
- **Styling:** Tailwind CSS 4 (CSS-first config via `@theme inline` w globals.css -- brak tailwind.config)
- **Wykresy:** Recharts (radar chart 9 wymiarow, bar chart)
- **Animacje:** Framer Motion (wizard, tranzycje)
- **AI Backend:** Google Gemini API (`@google/genai`) -- model `gemini-3-flash-preview` (konfigurowalny w Ustawieniach)
- **Content Extraction:** Bright Data Web Unlocker (HTTP API, raw HTML) + `node-html-markdown` + `cleanContent()` pipeline
- **SERP API:** Bright Data SERP API (`POST https://api.brightdata.com/request`) -- Google organic, PAA, Related Searches, AI Overview
- **Baza danych:** PostgreSQL (Vercel Postgres / Neon) via Drizzle ORM (`@vercel/postgres` + `drizzle-orm/vercel-postgres`)
- **Font:** Inter (Google Fonts, subset latin + latin-ext)
- **Deploy target:** Vercel (serverless, `after()` + `maxDuration` na dlugich route'ach)

## Specyfikacja (podpliki)

Pelna specyfikacja podzielona na podpliki w katalogu `spec/`:

| Plik | Zawartosc |
|------|-----------|
| [spec/pipeline.md](spec/pipeline.md) | Architektura, pipeline audytu, Bright Data (SERP + Web Unlocker) |
| [spec/data-models.md](spec/data-models.md) | Typy TypeScript, schema bazy danych |
| [spec/routes.md](spec/routes.md) | Strony (Dashboard, Wizard, Raport), API endpoints |
| [spec/dimensions.md](spec/dimensions.md) | 10 wymiarow audytu (9+EEAT), kryteria, CSI-A, BLUF, E-E-A-T |
| [spec/scoring.md](spec/scoring.md) | CQS formula, AI Citability, priorytety |
| [spec/cache.md](spec/cache.md) | Pipeline cache, lib/cache.ts, shared cache |
| [spec/skills-integration.md](spec/skills-integration.md) | Mapowanie skilli -> prompty, scoring code |
| [spec/report-components.md](spec/report-components.md) | Format raportu Markdown, komponenty UI |

## Struktura projektu

```
ai-auditor/
├── CLAUDE.md                    # Ten plik (indeks)
├── package.json
├── tsconfig.json
├── next.config.ts
├── drizzle.config.ts
├── spec/                        # Podpliki specyfikacji (patrz tabela powyzej)
│   ├── pipeline.md
│   ├── data-models.md
│   ├── routes.md
│   ├── dimensions.md
│   ├── scoring.md
│   ├── cache.md
│   ├── skills-integration.md
│   └── report-components.md
├── cache/                       # Pipeline cache (JSON, gitignore)
│   ├── shared/                  # Shared cache (wspoldzielony miedzy audytami)
│   │   ├── crawl/               # Cache crawl po URL hash (Bright Data Web Unlocker)
│   │   │   └── {urlHash}.json
│   │   └── serp/                # Cache SERP po keyword hash (Bright Data SERP API)
│   │       └── {keywordHash}.json
│   └── audits/                  # Cache per audit
│       └── {auditId}/
│           ├── _meta.json       # Podsumowanie etapow audytu
│           ├── 01_extract.json
│           ├── 02_csi.json
│           ├── 03_serp.json     # Tylko tryb Full
│           ├── 04_competitors.json  # Tylko tryb Full
│           ├── 05_benchmark.json    # Tylko tryb Full
│           ├── 06_dimensions/
│           │   ├── csiAlignment.json
│           │   ├── density.json
│           │   ├── eav.json
│           │   ├── bluf.json
│           │   ├── chunk.json
│           │   ├── cor.json
│           │   ├── tfidf.json
│           │   ├── srl.json
│           │   ├── queryFanout.json
│           │   └── eeat.json
│           ├── 07_scoring.json
│           └── 08_report.json
├── docs/                        # Dokumentacja referencyjne (read-only, zrodlo wiedzy)
│   ├── STRUKTURA-AUDYTU-AI-SEARCH.md  # Pelna metodologia audytu
│   ├── audyt-claude-code-skills-docs-2026-01-29.md  # Przyklad audytu
│   ├── content-auditor/SKILL.md
│   ├── information-density-checker/SKILL.md
│   ├── eav-extractor/SKILL.md
│   ├── bluf-generator/SKILL.md        # + references/transformations.md
│   ├── chunk-optimizer/SKILL.md
│   ├── cost-of-retrieval-optimizer/SKILL.md
│   ├── tfidf-analyzer/SKILL.md
│   ├── semantic-role-labels-parser/SKILL.md
│   ├── attribute-classifier/SKILL.md
│   ├── query-fanout/SKILL.md
│   ├── eeat-evaluator/SKILL.md
│   ├── csi-alignment-checker/SKILL.md
│   ├── csi-definition-helper/SKILL.md
│   ├── content-quality-scorer/SKILL.md
│   ├── audit-report-generator/SKILL.md
│   └── ...                             # Pozostale skille (keyword, cluster, content-planning)
├── src/
│   ├── middleware.ts              # Edge Runtime: JWT verify, redirect /login, admin guard /admin
│   ├── app/
│   │   ├── globals.css           # @theme inline + keyframes
│   │   ├── layout.tsx            # Root layout (html, Inter font, providers)
│   │   ├── error.tsx             # Error boundary (Client Component — catch render errors)
│   │   ├── global-error.tsx      # Root layout error handler (Client Component — fallback HTML)
│   │   ├── not-found.tsx         # Custom 404 page
│   │   ├── page.tsx              # Dashboard -- lista audytow (scoped per user)
│   │   ├── login/
│   │   │   ├── page.tsx          # Email input form
│   │   │   ├── LoginForm.tsx     # Client Component — formularz email
│   │   │   ├── actions.ts       # Server Actions: sendCode (crypto OTP), verifyCode (atomic)
│   │   │   └── verify/
│   │   │       ├── page.tsx      # 6-cyfrowy kod weryfikacyjny
│   │   │       └── VerifyForm.tsx # Client Component — formularz kodu
│   │   ├── admin/
│   │   │   ├── page.tsx          # Panel admina (admin guard + SidebarWrapper)
│   │   │   ├── AdminPanel.tsx    # Client Component — tabela userow, +kredyty, usun, dodaj
│   │   │   └── actions.ts       # Server Actions: getAdminUsers, addUser, addCredits, removeUser
│   │   ├── nowy-audyt/
│   │   │   ├── page.tsx          # Server Component (SidebarWrapper + audits + ownership check from=)
│   │   │   └── WizardContent.tsx # Client Component (WizardShell + 4 kroki)
│   │   ├── audyt/[id]/
│   │   │   └── page.tsx          # Pelny raport audytu (ownership check)
│   │   ├── audyt/[id]/eksport/
│   │   │   └── route.ts          # GET -- eksport raportu jako Markdown (ownership check)
│   │   ├── ustawienia/
│   │   │   ├── page.tsx          # Strona ustawien (admin: pelne, user: tylko Gemini key)
│   │   │   ├── SettingsForm.tsx  # Formularz ustawien (Client Component, split admin/user view)
│   │   │   └── actions.ts       # Server Actions (saveSettings [admin], saveUserGeminiKey [user], getSettingsForDisplay, getSettingsStatus, getCacheSummary, clearCache [admin])
│   │   ├── actions.ts           # Server Actions globalne (deleteAuditAction -- auth + ownership + cancel + delete)
│   │   └── api/
│   │       ├── auth/logout/
│   │       │   └── route.ts      # POST -- clear session cookie
│   │       ├── extract/
│   │       │   └── route.ts      # POST -- ekstrakcja tresci z URL (Bright Data Web Unlocker)
│   │       ├── serp/
│   │       │   └── route.ts      # POST -- pobranie SERP (Bright Data SERP API)
│   │       ├── csi/
│   │       │   └── route.ts      # POST -- inferowanie CSI (Gemini API)
│   │       ├── serp-consensus/
│   │       │   └── route.ts      # POST -- walidacja CSI wobec konsensusu SERP (tryb Full + keyword)
│   │       ├── audit/
│   │       │   └── route.ts      # POST -- uruchomienie audytu 9D
│   │       ├── audit/[id]/
│   │       │   └── route.ts      # GET -- pobranie stanu audytu (polling)
│   │       ├── audit/[id]/cancel/
│   │       │   └── route.ts      # POST -- anulowanie audytu w toku
│   │       ├── audit/[id]/cache/[stage]/
│   │       │   └── route.ts      # GET -- odczyt cache JSON per etap (do podgladu w UI)
│   │       └── audit/[id]/report/
│   │           └── route.ts      # POST -- generowanie raportu z rekomendacjami
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx       # Nawigacja boczna (lista audytow, nowy audyt, user info, kredyty, admin link, wyloguj)
│   │   │   ├── SidebarWrapper.tsx # Client wrapper na Sidebar (mobile drawer + hamburger, auto-close na nawigacji)
│   │   │   └── TopBar.tsx        # Gorny pasek (tytul, breadcrumbs, akcje)
│   │   ├── wizard/
│   │   │   ├── WizardShell.tsx   # Kontener wizarda z krokami i nawigacja
│   │   │   ├── Step1Input.tsx    # Krok 1: URL lub wklej tekst
│   │   │   ├── Step2CSI.tsx      # Krok 2: Definicja/potwierdzenie CSI
│   │   │   ├── Step3Audit.tsx    # Krok 3: Audyt w toku (równoległe wymiary, progress bars, cache popup, Przerwij)
│   │   │   └── Step4Results.tsx  # Krok 4: Podsumowanie + etapy audytu z cache popup + link do raportu
│   │   ├── dashboard/
│   │   │   ├── AuditListItem.tsx # Wiersz audytu na liscie (2x SVG circular score ring: CQS + Citability + przycisk usun)
│   │   │   ├── AuditReport.tsx   # Glowny raport audytu: 4 zakladki (Podsumowanie, Wymiary, Rekomendacje, Eksport)
│   │   │   ├── ScoreCard.tsx     # Karta CQS / AI Citability Score
│   │   │   ├── RadarChart.tsx    # Radar chart 9 wymiarow (Recharts) + CustomTooltip z opisem
│   │   │   ├── DimensionInfoGrid.tsx # Siatka 10 wymiarow z popupem wyjasniajacym (strona glowna)
│   │   │   ├── DimensionCard.tsx # Karta wymiaru (score + top problem)
│   │   │   ├── AiOverviewCoverageCard.tsx # Karta pokrycia AI Overview (wyekstrahowana z AuditReport, uzywana w DimensionDetail queryFanout)
│   │   │   ├── DimensionDetail.tsx # Rozwiniety widok wymiaru z danymi dimension-specific (EAV/Graf wiedzy, benchmark, TF-IDF, SRL, ChunkMap, Fan-Out+AIO)
│   │   │   ├── RecommendationList.tsx # Rekomendacje priorytetyzowane
│   │   │   ├── BeforeAfter.tsx   # Porownanie BEFORE/AFTER
│   │   │   ├── EAVTable.tsx      # Tabela Entity-Attribute-Value (3 kategorie badge: pokryte, unikalne, luka)
│   │   │   ├── KnowledgeGraph.tsx # Interaktywny graf wiedzy (react-force-graph-2d, canvas, dynamic import SSR-safe)
│   │   │   ├── ChunkMap.tsx      # Wizualizacja struktury H1/H2/H3
│   │   │   └── EEATCard.tsx      # Karta E-E-A-T z sygnalami
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx         # Status badge (ok/warn/critical)
│   │       ├── Progress.tsx      # Pasek postepu
│   │       ├── Textarea.tsx
│   │       ├── Input.tsx
│   │       ├── Tabs.tsx
│   │       ├── Skeleton.tsx
│   │       └── StatusDot.tsx
│   ├── lib/
│   │   ├── auth.ts              # JWT session: create/verify/destroy + getCurrentUser helper (jose, DB role refresh)
│   │   ├── email.ts             # Resend wrapper: sendVerificationCode(email, code)
│   │   ├── ai/
│   │   │   ├── client.ts         # Klient Google GenAI SDK (per-call apiKey param, cached client, callClaudeJSONWithMeta for concurrent-safe meta)
│   │   │   ├── prompts/
│   │   │   │   │   ├── csi-definition.ts
│   │   │   │   ├── csi-alignment.ts
│   │   │   │   ├── serp-consensus.ts
│   │   │   │   ├── information-density.ts
│   │   │   │   ├── eav-extraction.ts
│   │   │   │   ├── bluf-analysis.ts
│   │   │   │   ├── chunk-optimization.ts
│   │   │   │   ├── cost-of-retrieval.ts
│   │   │   │   ├── tfidf-analysis.ts
│   │   │   │   ├── semantic-roles.ts
│   │   │   │   ├── attribute-classifier.ts   # UNUSED — URR wchłonięty do CSI-A (algorytmiczna klasyfikacja)
│   │   │   │   ├── query-fanout.ts
│   │   │   │   ├── eeat-evaluation.ts
│   │   │   │   └── report-generation.ts
│   │   │   ├── parsers/
│   │   │   │   └── dimension-parser.ts
│   │   │   ├── content-structure.ts # Deterministyczna analiza struktury markdown (headingi, word count, tabele, listy, etc.)
│   │   │   ├── grounding.ts      # Weryfikacja fragmentów (BEFORE cytaty vs treść artykułu) + rekomendacje
│   │   │   └── orchestrator.ts   # Orkiestracja audytu (równoległe wymiary via Promise.all, error handling per wymiar)
│   │   ├── services/
│   │   │   ├── crawler.ts        # Ekstrakcja URL -> Markdown (Bright Data Web Unlocker + node-html-markdown + cleanContent)
│   │   │   └── dataforseo.ts     # SERP API (Bright Data SERP API -- nazwa pliku legacy)
│   │   ├── db/
│   │   │   ├── schema.ts         # Drizzle schema
│   │   │   ├── index.ts          # Polaczenie z DB
│   │   │   └── queries.ts        # CRUD (createAudit, getAudit, etc.) + User CRUD + verification codes + scoped getAudits
│   │   ├── settings.ts           # resolveCredential() + resolveGeminiKey(userId) -- DB first, fallback process.env
│   │   ├── cache.ts              # Pipeline cache -- zapis/odczyt JSON per etap
│   │   ├── content-cleaning.ts   # Pipeline czyszczenia treści (14 kroków, 4 fazy) + extractTitle/extractDescription
│   │   ├── knowledge-graph.ts   # Transformacja EAV triples → graf wiedzy (buildKnowledgeGraph + filterKnowledgeGraph)
│   │   ├── export.ts             # Shared export -- buildExportMarkdown() (14 sekcji Markdown)
│   │   ├── export-html.ts       # Stylowany eksport PDF -- buildExportHTML(audit) (kolorowe karty, badge, Before/After)
│   │   ├── scoring.ts            # Kalkulacja CQS, AI Citability Score
│   │   └── utils.ts              # Helpers (sanitize, truncate, formatters)
│   └── types/
│       └── index.ts              # Wszystkie typy TS
└── .env.local                    # POSTGRES_URL + AUTH_SECRET + ADMIN_EMAIL + RESEND_API_KEY + opcjonalnie klucze API
```

## Design System

### Motyw (globals.css @theme inline) -- Light theme

| Token              | Wartosc   | Uzycie                    |
|--------------------|-----------|---------------------------|
| `background`       | `#F8F9FA` | Tlo strony (jasne szare)  |
| `foreground`       | `#111827` | Tekst glowny (ciemny)     |
| `accent`           | `#3B82F6` | Akcenty, linki, CTA       |
| `accent-hover`     | `#2563EB` | Hover state (ciemniejszy) |
| `success`          | `#16A34A` | Score 8-10 (ok)           |
| `warning`          | `#CA8A04` | Score 5-7 (warn)          |
| `danger`           | `#DC2626` | Score 0-4 (critical)      |
| `muted`            | `#F1F5F9` | Alternatywne tlo (slate)  |
| `muted-foreground` | `#64748B` | Tekst drugorzedny         |
| `border`           | `#E2E8F0` | Obramowania kart          |
| `surface`          | `#FFFFFF` | Tlo kart (bialy)          |

### Skala statusow

| Score  | Status     | Kolor     | Uzycie                  |
|--------|------------|-----------|-------------------------|
| 8-10   | `ok`       | `success` | Wymiar bez problemow    |
| 5-7    | `warn`     | `warning` | Wymaga optymalizacji    |
| 0-4    | `critical` | `danger`  | Pilna przebudowa        |

## Komendy

Uruchamiaj z katalogu `ai-auditor/`:

```bash
# Next.js webapp (z katalogu ai-auditor/)
npm run dev        # Dev server (Turbopack)
npm run build      # Production build
npm run start      # Serwuj production build
npm run lint       # ESLint
npm run db:push    # Drizzle -- push schema do PostgreSQL (wymaga POSTGRES_URL w env)
npm run db:studio  # Drizzle Studio -- przegladanie DB
```

## Zmienne srodowiskowe (.env.local)

Kredencjaly API mozna tez wpisac w `/ustawienia` (zapisywane w DB, priorytet nad env vars).

```
POSTGRES_URL=postgresql://...          # Wymagane -- connection string do PostgreSQL (Vercel Postgres / Neon)
AUTH_SECRET=losowy-32-bajtowy-string   # Wymagane -- do podpisywania JWT sesji (openssl rand -base64 32)
ADMIN_EMAIL=twoj@email.pl             # Wymagane -- email admina (auto-rola admin przy pierwszym logowaniu)
RESEND_API_KEY=re_xxxxx               # Wymagane -- klucz API Resend (wysylanie kodow OTP)
EMAIL_FROM=Smart Content Audit <noreply@smartcontentaudit.com>  # Opcjonalne -- adres nadawcy (domyslnie noreply@smartcontentaudit.com)
GEMINI_API_KEY=AIza...                 # Opcjonalne -- Google Gemini API (lepiej w /ustawienia)
MODEL_NAME=gemini-3-flash-preview      # Opcjonalne -- nazwa modelu Gemini (domyslnie gemini-3-flash-preview)
BRIGHTDATA_API_TOKEN=...               # Opcjonalne -- Bright Data Bearer token (lepiej w /ustawienia)
BRIGHTDATA_SERP_ZONE=serp_api1         # Opcjonalne -- nazwa strefy SERP API
BRIGHTDATA_UNLOCKER_ZONE=web_unlocker1 # Opcjonalne -- nazwa strefy Web Unlocker
```

Na Vercel: `POSTGRES_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `RESEND_API_KEY` ustawic w Vercel → Settings → Environment Variables. Klucze API (Gemini, Bright Data) konfigurowac w `/ustawienia` (DB).

### Deploy na Vercel

- **Repo:** `wojthub/ai-auditor` (prywatne), auto-deploy z `main`
- **Domena:** `app.smartcontentaudit.com`
- **DB:** Neon PostgreSQL (zewnetrzny, nie Vercel Storage)

1. Polacz repo z Vercel (auto-deploy z `main`)
2. Dodaj env vars: `POSTGRES_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `RESEND_API_KEY`
3. Lokalnie: `POSTGRES_URL=... npm run db:push` (push schema do bazy Neon)
4. Redeploy

**Wymagania:**
- **Vercel Pro** (lub Team) -- audyty Full trwaja 2-5 min, wymaga `maxDuration = 300` (Hobby limit: 60s)
- `after()` z `next/server` -- utrzymuje Lambda zywą po wyslaniu response (audyt biegnie w tle)
- `maxDuration` exportowane w: `/api/audit` (300s), `/api/extract`, `/api/serp`, `/api/csi`, `/api/serp-consensus` (60s)

## Wazne notatki

### Architektura
- **Tailwind 4** uzywa CSS-first config -- brak `tailwind.config.ts`. Tokeny w `globals.css` `@theme inline`.
- **Path alias:** `@/*` mapuje do `./src/*`.
- **Audyt jest asynchroniczny** -- POST /api/audit zwraca auditId natychmiast, `after()` utrzymuje Lambda, wizard polluje co 3s.
- **Cancel audytu:** POST `/api/audit/[id]/cancel` ustawia `status: 'cancelled'` w DB. Orchestrator sprawdza status przed i po batchu równoległych wymiarów (nie między poszczególnymi — max ~15s opóźnienia detekcji) oraz przed benchmark i raportem.
- **Usuwanie audytu:** Server Action `deleteAuditAction` -- automatycznie anuluje audyt w toku, potem kaskadowo usuwa z DB (dimensions, eeat, recommendations, eav, benchmark, audit).
- **Dwa tryby audytu:**
  - **Content-only**: analizuje sam tekst (równolegle: 9 wymiarów + EEAT via `Promise.all`)
  - **Full** (domyslny): benchmark SERP (Bright Data SERP + Web Unlocker + EAV + scoring równolegle) -> potem audyt z danymi benchmarku
- **Wymiary analizowane równolegle** (10 concurrent Gemini calls via `Promise.all`: 9 wymiarów + EEAT) -- natychmiastowy zapis do DB po zakończeniu każdego, polling w UI pokazuje postęp (wszystkie nieukończone oznaczone jako `running`).
- **Kazdy wymiar to osobne wywolanie Gemini API** -- niezalezne error handling (błąd jednego nie blokuje reszty, fallback z score=0).
- **JSON mode:** `responseMimeType: 'application/json'` w `callClaudeJSON()` -- natywny structured output.
- **Metadata AI:** `callClaudeJSONWithMeta()` w `client.ts` -- zwraca `{ data, meta }` razem (concurrent-safe). Orchestrator uzywaja go we wszystkich concurrent batches (wymiary, EAV extraction, scoring). `getLastCallMeta()` (globalny singleton) uzywany juz tylko w kodzie sekwencyjnym (CSI inference, raport).
- **Benchmark filtrowanie:** konkurenci z `wordCount < MIN_COMPETITOR_WORDS` (domyslnie 100, konfigurowalny w `/ustawienia`) sa wykluczeni z EAV extraction i scoringu -- nadal widoczni w liscie `competitors` i w rankingu SERP w raporcie (wyszarzeni na swoim miejscu z informacja "wykluczone — za malo tresci"), ale nie zaburzaja analizy. Konkurenci ktorym nie udalo sie pobrac tresci (failed crawl) sa dodawani z `wordCount: 0` i wyswietlani jako wyszarzeni z informacja "nie udalo sie pobrac tresci".
- **Benchmark: source URL w competitors:** audytowany URL jest wykluczany z crawlowania/EAV/scoringu (znormalizowane porownanie URL -- strip protocol, www, trailing slash, lowercase), ale **zachowywany w tablicy `competitors`** z pozycja SERP i `wordCount: 0`. Dzieki temu ranking SERP w raporcie wyswietla source article na jego faktycznej pozycji SERP (★) zamiast na dole tabeli. UI rozpoznaje source przez `isSourceUrl()` i uzywa `sourceCQS`/`sourceCitability` z propsow.
- **Competitor scoring:** w trybie Full, EAV extraction i scoring biegną **równolegle** (`Promise.all` w `runBenchmark()`). Source EAV jest częścią batchu konkurentów (flaga `isSource`). Scoring: 1 call Gemini per competitor z wystarczajacą liczbą słów. Pola `estimatedCQS`, `estimatedCitability`, `qualitySummary`, `topStrengths`, `topWeaknesses` w `CompetitorData` (opcjonalne, backward compat). Ranking SERP w raporcie + mini ranking w Step4Results.
- **SERP Consensus (walidacja CSI + analiza treści):** w trybie Full z keyword, Krok 2 wizarda automatycznie pobiera konsensus SERP (`POST /api/serp-consensus` z tytulem + snippetem tresci artykulu). Gemini analizuje top 10 wynikow Google (tytuly + snippety + PAA + related) i buduje: (1) consensus CSI (CE/SC/CSI/Predicate z SERP), (2) analize tresci SERP (typ/format/perspektywa/kluczowe dane), (3) analize tresci artykulu (sourceContentType/sourceContentFormat/sourceContentAngle). Wynik: `SerpConsensus` z 7 pol alignment (4 CSI + 3 content: contentType/contentFormat/contentAngle). Ogolna zgodnosc obliczana **server-side** (`computeOverallAlignment()` — srednia z 7 pol, progi: >=1.5 high, >=0.75 partial, else low). UI: tabela porownawcza 7 wierszy (Źródło vs Konsensus SERP) z alignment dots + sekcja kluczowych danych. Dane zapisywane w DB (kolumna `serp_consensus` TEXT/JSON) przy tworzeniu audytu. Wyswietlane w Kroku 2 wizarda i raporcie (tab Podsumowanie). Przekazywane opcjonalnie do CSI Alignment w orchestratorze. SERP cache hit -- 0 dodatkowego kosztu Bright Data. Koszt: 1 wywolanie Gemini (~800 tokenow output).
- **Fan-Out i AIO (D8):** wymiar dekompozycji CSI na 5-10 sub-zapytan AI Search (3 typy: semantic, intent, verification) + **zintegrowana karta AI Overview Coverage** (przeniesiona z Summary tab). W trybie Full grounduje sub-zapytania wobec PAA/Related z SERP + AI Overview (tagi CONFIRMED/OVERVIEW/PREDICTED/SERP-ONLY; priorytet: CONFIRMED > OVERVIEW > PREDICTED). Tag OVERVIEW (niebieski) oznacza potwierdzenie w syntezie Google AI. Mapuje sub-zapytania do sekcji H2 artykulu. Scoring: % pokrytych sub-zapytan. Dane sub-queries i coverageStats (w tym `overviewCount`) w `rawResponse`. Scoring: płaskie wagi — CQS: W_QUERY_FANOUT=0.07, Citability: CIT_QUERY_FANOUT=0.10. `find()` zwraca `?? 0` dla brakujących wymiarów w starych audytach (brak `hasQueryFanout` backward compat). `AiOverviewCoverageCard` (osobny komponent) wyswietlany w DimensionDetail pod tabela sub-zapytan.
- **AI Overview integration:** Bright Data SERP API zwraca pole `ai_overview` z synteza Google AI. `extractAiOverview()` w `dataforseo.ts` wyciaga: `summary` (splaszczona tresc z `texts[]`, rekurencyjna — `snippet`/`title`/`list[]`), `references[]` (`url`/`title`/`domain`), `sourceInReferences` (czy URL zrodla jest cytowany — obliczane w orchestratorze via `normalizeUrl()`). Dane w `AiOverviewData` (typy), kolumna `ai_overview` w `benchmark_data` (JSON). Uzywane w 5 miejscach: (1) SERP Consensus prompt — tresc AIO jako dodatkowy kontekst, (2) Fan-Out i AIO — tag OVERVIEW (sub-zapytanie potwierdzone przez AI Overview) + karta pokrycia, (3) CSI Alignment — AIO summary w sekcji konsensusu, (4) Report prompt (zadanie 8) — analiza pokrycia AI Overview (kluczowe twierdzenia vs tresc artykulu), (5) UI — `AiOverviewCoverageCard` w DimensionDetail (queryFanout) + badge w SerpConsensusPanel + badge w Step2CSI. `AiOverviewCoverage` w `reportExtras`: `keyClaims[]` (claim/covered/section), `coveragePercent`, `recommendation`. Eksport: zintegrowane z sekcja Fan-Out. Koszt: 0 dodatkowych wywolan API. Google nie zawsze wyswietla AIO — `extractAiOverview()` zwraca `undefined` gdy pole puste/krotkie (<20 zn.), caly flow gracefully degraduje (pola opcjonalne). Truncation: 2000 zn. w promptach, 500 zn. w UI `SerpConsensus`.
- **Title & Meta Description analysis:** crawler wyciaga title (`<title>` tag) i description (regex: meta description + og:description, 4 patterny) z HTML. Zapisywana w DB (kolumna `source_description` TEXT nullable w tabeli `audits`). Analiza w fazie raportu -- rozszerzenie istniejacego report prompt (zadanie 7) z kryteriami SEO best practices (title: 55-60 zn., keyword na poczatku, CE w tytule; description: do 155 zn., active voice, CTA). Gemini generuje rekomendowane wersje + analiza current. Dane w `reportExtras.titleDescription` (opcjonalne, backward compat). UI: karta "Title & Description" w Summary tab z current vs recommended + badge dlugosci (zielony/zolty/czerwony). Eksport: sekcja 13 w markdown. Koszt: 0 dodatkowych wywolan Gemini.
- **Fuzzy EAV attribute matching:** porownanie atrybutow zrodla vs konkurentow uzywa 3-poziomowego dopasowania (`attributesMatch()` w orchestratorze): (1) exact match, (2) substring containment (np. "ltv" w "wskaźnik ltv"), (3) token overlap — wspolne slowo ≥3 znaków. Eliminuje falszywe luki gdy Gemini nazywa ten sam atrybut roznie w roznych wywolaniach. Uzywane w obu kierunkach: `isInSource()` (gap detection) i `isInCompetitors()` (unique_opportunity).
- **TF-IDF z realnym korpusem konkurencji:** w trybie Full, `computeTermStats()` (`term-analysis.ts`) algorytmicznie analizuje terminy z treści źródła i konkurentów (tokenizacja + document frequency). Wynik: `TermStats` (sourceHighIdf, missingFromSource, coveredCommon) zapisywany w `BenchmarkData.termStats` (DB: kolumna `term_stats` w `benchmark_data`). Prompt TF-IDF (`tfidf-analysis.ts`) w trybie Full otrzymuje realne dane: brakujące terminy z `X/N konkurentów`, wyróżniki źródła, pokryte terminy. W trybie content-only fallback na wiedzę ekspercką Gemini. `missingTerms` w odpowiedzi zawierają `competitorFrequency` z realnymi danymi — passthrough do raportu.
- **Gap sorting:** luki tresciowe (benchmark gaps) sortowane wg priorytetu (P1 -> P2 -> P3 -> P4), potem wg `coverageCount` desc. Sorting w orchestratorze (nowe audyty) + UI-side sort w `AuditReport.tsx` i `DimensionDetail.tsx` (stare audyty).
- **URR klasyfikacja (algorytmiczna, wchłonięta do CSI-A):** w trybie Full, `enrichEavWithBenchmark()` w orchestratorze algorytmicznie reklasyfikuje `urrClass` source triples na podstawie `eavMatrix` coverage data: `coverageCount/coverageTotal` per atrybut → UNIQUE (<30%), ROOT (>=70%), RARE (30-69%). Brak osobnego wywołania Gemini (stary prompt `attribute-classifier.ts` UNUSED). W content-only: `urrClass` pochodzi z AI w prompcie EAV extraction. **Backward compat:** stare audyty z `urr` w DB — `queries.ts` scala URR problems/strengths do csiAlignment (nie tworzy osobnej karty). Rekomendacje `dimension: 'urr'` → `'csiAlignment'` na poziomie danych.
- **Prompt label sanitization:** prompt CSI Alignment (`csi-alignment.ts`) uzywa human-readable polskich etykiet statusu luk ("krytyczna luka (P1)", "ważna luka (P2)" itd.) zamiast surowych wartosci enum (`gap_p1`, `gap_p2`) -- zapobiega wyciekowi nazw zmiennych do tekstu generowanego przez Gemini.
- **Algorytmiczne metryki (content-structure.ts):** deterministyczna analiza struktury markdown -- oblicza metryki ktore NIE powinny byc generowane przez LLM (headingi, word count per sekcja, tabele, listy, bold, linki, sciany tekstu, liczba zdan). `analyzeContentStructure(content, ce)` wywoływany raz w `runDimensions()`. Wyniki wstrzykiwane do promptow (CoR, Chunk, Density) jako "metryki obliczone algorytmicznie" + nadpisywane w `postProcessRawResponse()` po odpowiedzi Gemini. Post-processing obejmuje 5 wymiarow: CoR (structureAnalysis), Chunk (sections wordCount/ceRepeatCount + stats), Density (totalSentences + densityRatio), SRL (stats z srlInstances[]), Query Fan-Out (coverageStats z subQueries[]). Chunk matching uzywa `normalizeHeading()` (lowercase, strip bold/italic/code/links) zamiast exact match.
- **Grounding fragmentów (grounding.ts):** `verifyDimensionProblems()` sprawdza czy cytaty (BEFORE) w `problems[].fragment` istnieja w tresci artykulu — 3-poziomowa weryfikacja: (1) exact substring (po normalizacji whitespace+lowercase), (2) substring bez interpunkcji, (3) token overlap ≥60% (globalny, nie sliding window). `verifyRecommendationsBefore()` analogicznie dla rekomendacji. Fragmenty <15 znaków lub opisowe ("Brak...", "Artykuł nie...") automatycznie zweryfikowane. Wywolywane w orchestratorze po kazdym wymiarze i po generowaniu raportu.
- **Recommendation IDs:** zawsze generowane przez `nanoid()` w `queries.ts` -- parser moze zwracac `rec_1`, `rec_2` z AI, ale DB nadpisuje je unikalnymi ID (unikanie kolizji miedzy audytami).
- **raw_response:** kazdy wymiar zapisuje surowa odpowiedz AI w kolumnie `raw_response` tabeli `dimension_results` (JSON). Pole `rawResponse?: unknown` w typie `DimensionResult`.
- **Niezalezny zapis raportu:** `saveRecommendations` i `saveReportExtras` maja osobne try/catch -- blad jednego nie blokuje drugiego.
- **Dimension warning:** jesli AI zwroci pustą odpowiedz (score=0 i brak summary), orchestrator loguje status `'warning'` w `_meta.json` zamiast `'completed'`.
- **Ustawienia (kredencjaly, model, parametry):** przechowywane w tabeli `settings` (key-value) -- `resolveCredential()` sprawdza DB first, fallback `process.env`. Klucze: `GEMINI_API_KEY`, `MODEL_NAME`, `BRIGHTDATA_API_TOKEN`, `BRIGHTDATA_SERP_ZONE`, `BRIGHTDATA_UNLOCKER_ZONE`, `MIN_COMPETITOR_WORDS`.

### Raport audytu (`/audyt/[id]`)
- **4 zakladki:** Podsumowanie | Wymiary | Rekomendacje | Eksport
- **Podsumowanie:** CQS + Citability ScoreCards, RadarChart, tabela wymiarow, CSI context, **panel Walidacja SERP** (jesli `serpConsensus` w DB -- tabela porownawcza 7 wierszy: CE/SC/CSI/Predicate/Typ/Format/Perspektywa z alignment dots, badge zgodnosci ze sredniej 7 pol, kluczowe dane, tematy SERP, sygnaly PAA, badge + zwijanra synteza AI Overview jesli obecne), **karta Title & Description** (jesli `reportExtras.titleDescription` -- current vs recommended title/desc z badge'ami dlugosci i analiza SEO), **Top 10 SERP** (tryb Full — polaczona karta: 3 metryki benchmarkowe (Śr. CQS SERP, Śr. Citability, Śr. długość treści) + tabela top 10 z CQS/Citability per competitor, klikalne wiersze z rozwinieciem strengths/weaknesses, wykluczona konkurencja wyszarzona na swoim miejscu, failed crawls wyszarzone z info "nie udalo sie pobrac tresci", source article na swojej pozycji SERP z ★)
- **Wymiary:** klikalne DimensionCard -> DimensionDetail z danymi dimension-specific:
  - Graf wiedzy (eav) -> KnowledgeGraph (interaktywny graf force-directed) + EAVTable + Macierz EAV (tagi pokrycia) + Formaty treści | Chunk -> ChunkMap | CSI-A -> Pokrycie encji (tabela pokrytych + luk z priorytetami) + Macierz EAV (tagi) | TF-IDF -> mapping | SRL -> transforms | Fan-Out i AIO (queryFanout) -> sub-queries table z grounding tags (CONFIRMED/OVERVIEW/PREDICTED/SERP-ONLY, OVERVIEW w niebieskim) + AiOverviewCoverageCard (karta pokrycia AI Overview — przeniesiona z Summary tab)
- **Rekomendacje:** priorytetyzowane (critical/high/medium/bonus) z collapse/expand per priorytet (domyslnie 3 widoczne, przycisk "Pokaż wszystkie (X więcej)") + proponowana struktura + BLUF + TF-IDF missing + SRL transforms + EEAT blocks
- **Eksport:** generuje Markdown raportu (POST /api/audit/[id]/report), pobierz .md / pobierz .pdf / kopiuj do schowka; stan podniesiony do rodzica AuditReport. PDF generowany client-side (`html2pdf.js` + `marked` -- markdown -> HTML -> stylowany A4 PDF)
- **reportExtras** (kolumna JSON w tabeli `audits`): structure, srlTransforms, eeatBlocks, tfidfMapping, titleDescription (opcjonalne), aiOverviewCoverage (opcjonalne) -- zapisywane przez orchestrator po fazie raportu
- **EAV triples** ladowane z tabeli `eav_triples` przez `getAudit()`
- **Shared export:** `lib/export.ts` -- `buildExportMarkdown()` uzywany przez oba route handlery (eksport GET + report POST). Sekcja 9b: Pokrycie Fan-Out i AIO (tabela sub-zapytan z grounding tags + pokrycie AI Overview — obecnosc, cytowanie zrodla, % pokrycia, tabela twierdzenie/pokryte/sekcja, rekomendacja, zrodla). Sekcja 13: Title & Meta Description (current vs recommended z analiza i dlugoscia). Sekcja 14: Graf wiedzy (tekstowa reprezentacja grafu — encja centralna, encje, relacje z statusami [OK]/[LUKA]/[UNIKALNE] + coverage).

### Promptowanie
- Model: `gemini-3-flash-preview` domyslnie (konfigurowalny w `/ustawienia` lub env `MODEL_NAME`)
- Max tokens: 8192 domyslnie (auto-retry z 16384 przy obcietej odpowiedzi)
- Temperature: 0.3 (niska, stabilne wyniki ekstrakcji)
- Kazdy prompt zawiera: role systemowa + kryteria scoringu + JSON schema + artykul + CSI
- Natywny JSON mode (`responseMimeType: 'application/json'`) -- brak potrzeby instrukcji "odpowiedz w JSON"
- Auto-retry: jesli `finishReason === 'MAX_TOKENS'`, ponawia z podwojonym limitem tokenow
- **Rate limit retry:** `withRateLimitRetry()` w `client.ts` -- exponential backoff (2s, 4s, 8s, 16s, 32s, 5 prob) na blad 429/RESOURCE_EXHAUSTED. Po wyczerpaniu prob rzuca `GeminiRateLimitExhaustedError` (fatal w orchestratorze -- przerywa audyt). Detekcja: `error.name === 'RateLimitError'` || `status === 429` || regex w message. Komunikat po polsku zapisywany w DB (`error_message` kolumna) i wyswietlany w UI (Step3Audit polling + strona audytu).
- **Instrukcja PL w kazdym prompcie:** wszystkie 15 prompt files zawieraja na koncu glownego template stringa: `WAZNE: Wszystkie wartosci tekstowe w odpowiedzi JSON musza byc w jezyku polskim. Nie uzywaj angielskiego.` -- wymusza polskojezyczne odpowiedzi od Gemini

### UI/UX
- **Light theme** -- jasne tlo, ciemny tekst, biale karty
- Wizard nie pozwala cofnac sie do kroku 1 po rozpoczeciu audytu
- **Sidebar:** na desktop (md+, >=768px) widoczny normalnie. Na mobile (<md) ukryty — hamburger button (fixed top-left, z-50) otwiera drawer overlay (z-40, backdrop bg-black/30). Ikona: ☰ (zamkniety) / X (otwarty). Auto-close na nawigacji (`usePathname` + `useEffect`). `SidebarWrapper.tsx` = Client Component.
- **Lista audytow:** dwa SVG circular progress rings -- CQS (0-100) + AI Citability (0-10). Progi kolorow: CQS (zielony >=80, zolty >=50, czerwony <50), Citability (zielony >=8, zolty >=5, czerwony <5). Formatowanie: CQS `Math.round()`, Citability `toFixed(1)`.
- **Radar chart:** staly porzadek 9 osi (CSI + D1-D8), tooltip z opisem wymiaru na hover (`CustomAxisTick` z SVG `<title>`, `DIMENSION_DESCRIPTIONS` map)
- **Odśwież audyt:** przycisk "↻ Odśwież audyt" na stronie raportu (`/audyt/[id]`), widoczny tylko dla zakonczonych audytow. Nawiguje do `/nowy-audyt?from=AUDIT_ID`. Wizard pre-wypelnia URL, keyword, tryb i CSI z poprzedniego audytu (`WizardPrefill` -> `useMemo` initialState w `WizardShell`). Tresc i SERP consensus NIE sa przenoszone -- musza byc re-crawlowane/re-walidowane.
- **Strona glowna:** naglowek "Co bedzie sprawdzane?" + siatka 10 wymiarow z popupem wyjasniajacym (DimensionInfoGrid) -- domyslnie 1 rzad (5 kart na desktop), przycisk "Pokaż wszystkie (5 więcej)" rozwija reszte
- **Step 1 input:** rozwijany `<details>` "Co bedzie sprawdzane?" z siatka 10 wymiarow (domyslnie zwinieta). Status check zamiast preview tresci (zielony check / czerwony alert z liczba slow), klik otwiera popup z pelna trescia. Hint "Kliknij Pobierz" + animacja glow na przycisku gdy URL wklejony ale nie pobrany.
- **Step 2 CSI:** full-screen loader z lista pol (CE, SC, CSI, Predicate) podczas inferowania CSI (zanim dane sie pojawia). **Walidacja SERP Consensus** (tryb Full + keyword): po inferowaniu CSI automatyczny fetch `POST /api/serp-consensus` z tytulem + snippetem tresci -- tabela porownawcza 7 wierszy (CE, SC, CSI, Predicate, Typ, Format, Perspektywa) z alignment dots (zielony/zolty/czerwony), kolumny Źródło vs Konsensus SERP. Badge zgodnosci (Wysoka/Czesciowa/Niska — obliczana server-side ze sredniej 7 pol). Sekcja kluczowych danych z formatami. Tematy SERP (tagi), sygnaly PAA. Badge "AI Overview obecne w SERP" + skrot syntezy (jesli obecne). Przycisk "Zwaliduj ponownie" po edycji pol. Consensus nie blokuje uzytkownika -- moze potwierdzic CSI zanim consensus sie zaladuje.
- **Step 3 audyt:** równoległy postęp (wszystkie wymiary jednocześnie — oznaczone jako `running`), klik na ukonczony etap otwiera popup z cache JSON
- **Step 4 wyniki:** wyswietla etapy audytu z mozliwoscia podgladu cache (jak w kroku 3) + wyniki + link do pelnego raportu. Cache popup znika dopiero na stronie `/audyt/[id]`.
- **Ustawienia:** badge "Skonfigurowany" (zielony) / "Brak" (czerwony) przy kazdej sekcji. Sekcja "Cache" z licznikami plikow (crawl/SERP/audyty) + rozmiar MB + przycisk "Wyczysc cache" (server action `clearCache()` -- kasuje caly katalog `cache/`).
- **Responsive padding:** strony `p-4 sm:p-6 md:p-8`, Card `p-4 sm:p-5` (header `px-4 sm:px-5`), TopBar `px-4 pl-14 md:px-6 py-3 md:py-4` (pl-14 = miejsce na hamburger)
- BEFORE/AFTER: diff kolorem -- czerwone tlo dla BEFORE, zielone dla AFTER
- Polling co 3s (nie WebSocket) -- prostota implementacji i deploy na Vercel
- Etykiety wymiarow i output AI w **jezyku polskim**
- **Polskie etykiety UI (presentation-layer):** enumy w typach/promptach/parserach zostaja po angielsku, tlumaczenie tylko w warstwie prezentacji via `Record<string, string>` label maps:
  - **URR:** `URR_LABELS` — UNIQUE → "Wyróżnik", ROOT → "Podstawa", RARE → "Rzadki" (w `EAVTable.tsx`, `DimensionDetail.tsx`, `DimensionInfoGrid.tsx`, `export.ts`)
  - **EAV Type:** `EAV_TYPE_LABELS` — simple → "Prosta", complex → "Złożona", derived → "Pochodna", key → "Identyfikator", multi → "Lista" (w `EAVTable.tsx`)
- **Graf wiedzy (Knowledge Graph):** wymiar `eav` wyswietlany jako "Graf wiedzy" w calym UI (RadarChart: "Graf", Step3: "Graf wiedzy", DimensionInfoGrid, RecommendationList, parsers, queries). Wewnetrzny `dimensionId = 'eav'` zachowany (backward compat). Wizualizacja: `react-force-graph-2d` (canvas-based, dynamic import `{ ssr: false }`). Transformacja EAV→graf w `lib/knowledge-graph.ts`: `buildKnowledgeGraph(triples, ce, benchmarkEavMatrix?)` → `KnowledgeGraphData` (nodes + links + stats). Typy: `KGNode` (central/entity/value), `KGEdge`, `KGFilterOptions`. **3 kategorie pokrycia:** covered (zielony, nie-UNIQUE), unique (niebieski, UNIQUE+covered), gap (czerwony, !covered). **Krawędzie strukturalne:** CE→entity widoczne nawet gdy `showValues: false` — utrzymuja spójnosc grafu. **Filtry:** coverage (all/covered/gap/unique), URR (all/UNIQUE/ROOT/RARE), showValues (domyslnie true — pokazuje literaly). Filtry zsynchronizowane miedzy grafem a EAVTable. **Stan filtrów podniesiony** do DimensionDetail (unikniecie utraty stanu przy unmount Tabs). **D3 node cloning:** `filterKnowledgeGraph()` klonuje wezly (`{ ...node }`) bo `react-force-graph-2d` mutuje obiekty in-place (dodaje x/y/vx/vy). **Min próg:** <3 trojki → fallback message. **Canvas rendering:** `nodeCanvasObject` (okragi/prostokaty z kolorami), `linkCanvasObject` (linie ciagle/przerywane z labelkami atrybutow). **Interakcja:** hover tooltip, click → podswietlenie polaczonych krawedzi, drag/zoom/pan, `zoomToFit(400, 50)` po renderze. **Eksport:** sekcja 14 — tekstowa reprezentacja grafu (grupowana po encji, statusy [OK]/[LUKA]/[UNIKALNE], coverage count).
- **EAV Table:** `formatValue()` parsuje JSON arrays/objects w kolumnie Value (tablice → comma-separated, obiekty → "key: value"). `hasNoValue()` filtruje trojki bez wartosci (`[brak]`, `brak`, `[brak danych]`, puste) -- niekompletne trojki nie sa wyswietlane. **Pokrycie konkurencyjne:** w trybie Full, po ekstrakcji EAV ze zrodla, `enrichEavWithBenchmark()` (wyekstrahowana funkcja w orchestratorze) wzbogaca trojki o luki z `benchmark.eavMatrix` (atrybuty konkurentow z `inArticle === false`). `BenchmarkEAV` przechowuje pelne trojki (entity + attribute + value + eavType) z pierwszego konkurenta — gap triples uzywaja prawdziwych entity/value zamiast CE + placeholder. **Entity case normalization:** `entityCaseMap` (lowercase→oryginal) z source triples + CE — gap entity dopasowywany do casing ze zrodla (np. `Kredyt pomostowy` z benchmarku → `kredyt pomostowy` jak w artykule). **Gap value filter:** luki z pustym value lub `[brak]` sa pomijane (competitors tez nie maja danych — slaby sygnal). Fuzzy dedup (exact + substring + token overlap) zapobiega duplikatom. **Score adjustment:** po wzbogaceniu, score EAV korygowany algorytmicznie: `40% AI score (jakosc artykulu) + 60% coverage ratio (pokrycie konkurencyjne)`. Wywoływane inline w promise wymiaru `eav` (równoległa analiza). UI: sortowanie (pokryte → luki), czerwone tlo dla luk, statystyka pokrycia atrybutow z liczba luk

### Autentykacja i autoryzacja
- **Email + OTP login:** uzytkownik podaje email -> 6-cyfrowy kod (crypto-secure `randomInt`) -> sesja JWT (7 dni)
- **Email service:** Resend (`resend` package) — wymaga `RESEND_API_KEY` + zweryfikowanej domeny `smartcontentaudit.com` (DKIM + SPF + DMARC). Nadawca: `noreply@smartcontentaudit.com` (konfigurowalny via env `EMAIL_FROM`)
- **Sesja:** JWT w HTTP-only cookie (`session`), podpisywany HS256 z `AUTH_SECRET` (env var, 32+ bajtow). Biblioteka: `jose` (Edge Runtime compatible). **`getSession()` odswieża rolę z DB** (`getUserById()`) przy kazdym wywolaniu — zapobiega stale claims po zmianie roli admina. Jesli user usuniety z DB -> sesja uniewazniona (return null).
- **Middleware:** `src/middleware.ts` — Edge Runtime, weryfikacja JWT, redirect na `/login`, ochrona `/admin` (admin-only)
- **Role:** `admin` (1 osoba, `ADMIN_EMAIL` env var, bez limitu kredytow) + `user` (domyslnie 5 kredytow audytu)
- **Auto-tworzenie konta:** przy pierwszym logowaniu email -> auto-create user (5 kredytow, lub admin jesli email === ADMIN_EMAIL). **Auto-promocja:** jesli istniejacy user loguje sie z emailem === ADMIN_EMAIL ale ma role `user` (np. konto stworzone przed ustawieniem env var), automatycznie promowany do admina z 999999 kredytow
- **Limity audytow:** user traci 1 kredyt per audyt (atomowy `UPDATE ... WHERE audit_credits > 0`), admin bez limitu. Przy 0 kredytow -> 403
- **Per-user Gemini key:** kolumna `gemini_api_key` w tabeli `users`. `resolveGeminiKey(userId)` — user key → global (settings DB) → env. Klucz przekazywany jako parametr `apiKey` do `callClaude()`/`callClaudeJSON()` — brak globalnego singletona (eliminacja race condition w concurrent batches)
- **Ownership:** kazdy audyt ma `userId` (nullable — NULL = stary audyt admina). Scoped queries: user widzi tylko swoje, admin widzi swoje + NULL. API routes + Server Actions sprawdzaja ownership
- **Admin panel:** `/admin` — tabela uzytkownikow, dodawanie kredytow (+5), usuwanie usera (kaskadowe DELETE audytow), tworzenie pre-registered usera
- **Ustawienia split:** admin widzi pelne ustawienia (Gemini, Bright Data, parametry, cache), user widzi tylko swoj klucz Gemini + instrukcje
- **DB tabele:** `users` (id, email, role, audit_credits, gemini_api_key, created_at), `verification_codes` (id, email, code, expires_at, used, created_at)
- **OTP bezpieczenstwo:** `crypto.randomInt()` (nie Math.random), kod nie w temacie emaila, stare kody invalidowane przed wyslaniem nowego, atomowe `UPDATE...RETURNING` przy weryfikacji (brak TOCTOU)
- **Pliki auth:** `src/lib/auth.ts` (JWT session), `src/lib/email.ts` (Resend), `src/middleware.ts`, `src/app/login/` (page + verify + actions), `src/app/admin/` (page + AdminPanel + actions), `src/app/api/auth/logout/route.ts`

### Bezpieczenstwo
- API klucze w `.env.local` lub w DB (strona `/ustawienia`) -- NIGDY w kodzie
- Input sanitization: URL validation, max content length 100 000 znakow (~15k slow)
- **Autentykacja:** email + OTP login z JWT sesja (patrz sekcja powyzej)
- **Ownership checks:** wszystkie API routes (`/api/audit/[id]`, cancel, cache) + Server Actions (deleteAudit, settings) + strony (`/audyt/[id]`, `/nowy-audyt?from=`) sprawdzaja ownership audytu
- **Atomic DB operations:** `decrementAuditCredits` i `verifyAndMarkCode` uzywaja single `UPDATE...RETURNING` (brak race conditions)
- **Admin guard:** middleware blokuje `/admin` dla non-admin, Server Actions sprawdzaja role
- **Sensitive data:** `geminiApiKey` nie przekazywany do klienta (admin panel: zamaskowany `***`), klucze API maskowane w UI (`****ostatnie4`)
- **`getCurrentUser()` POZA try-catch:** `getCurrentUser()` wywoluje `redirect('/login')` ktory rzuca specjalny Next.js error. Jesli wewnatrz try-catch, redirect zostanie przechwycony i Server Action zwroci blad zamiast przekierowania. Wzorzec: `const session = await getCurrentUser();` PRZED blokiem try w Server Actions.
- **Per-call API key (brak globalnego singletona):** `callClaude()`/`callClaudeJSON()` przyjmuja opcjonalny `apiKey` param. Eliminuje race conditions w concurrent batches. `callClaudeJSONWithMeta()` zwraca `{ data, meta }` razem -- bezpieczne w `Promise.all` (uzywane w: 10 równoległych wymiarów, EAV extraction batch, competitor scoring batch).
- **Error boundaries:** `error.tsx` (route-level, Client Component), `global-error.tsx` (root layout fallback z inline styles), `not-found.tsx` (custom 404)

### Cache
- **Cel:** debug i inspekcja surowych wynikow kazdego etapu pipeline'u (nie resume)
- **Storage:** filesystem -- `cache/` (gitignore), czytelny JSON z pretty-print
- **Na Vercel:** cache filesystem jest read-only (serverless). Wszystkie zapisy sa fire-and-forget (`.catch(console.warn)`) wiec bledy nie przerywaja audytu. Cache popup w UI zwraca null (brak danych). Sekcja Cache w `/ustawienia` pokazuje zera.
- **Lokalnie:** dziala normalnie -- `cache/shared/` (crawl 24h TTL, SERP 1h TTL), `cache/audits/{auditId}/` per etap
- **Fire-and-forget:** zapis cache NIE blokuje pipeline'u -- `.catch(console.warn)`, bledy cache nie przerywaja audytu
- **Modul:** `lib/cache.ts` -- eksportuje `writeStageCache`, `writeDimensionCache`, `writeAuditMeta`, `readSharedCache`, `writeSharedCache`, `readStageCache`, `readDimensionCache`
- **Metadane cache:** `_model` (nazwa modelu Gemini) i `_tokensUsed` (total token count) -- wypelniane przez orchestrator. Wymiary i benchmark uzywają `callClaudeJSONWithMeta()` (concurrent-safe meta). Token tracking: `totalTokens +=` bezpieczne w JS (single-threaded, bez await między read/write).
- **API podgladu cache:** `GET /api/audit/[id]/cache/[stage]` -- odczyt cache JSON per etap/wymiar, uzywany w Step3Audit i Step4Results popup

### Wydajnosc
- **Content-only:** 10 wywołań Gemini API równolegle (~15-25s) + raport (~10-15s) = ~25-40s
- **Full:** benchmark SERP + crawl 10 URLs + EAV + scoring równolegle (~45-90s) + 10 wymiarów równolegle (~15-25s) + raport (~10-15s) = ~70-130s
- **Optymalizacje pipeline'u (A+C+D):**
  - **A — Równoległe wymiary:** 9 wymiarów + EEAT via `Promise.all` zamiast sekwencyjnego for loop. Czas analizy: ~70-100s → ~15-25s (ograniczony najwolniejszym wymiarem)
  - **C — Równoległy EAV + scoring:** `extractBenchmarkData()` i `scoreCompetitors()` w `Promise.all` w `runBenchmark()`. Benchmark: ~60-90s → ~45-60s
  - **D — Source EAV w batchu:** ekstrakcja EAV źródła połączona z batchem konkurentów (flaga `isSource`). Eliminuje 1 osobne wywołanie Gemini (~5-8s)
  - **Wyekstrahowana `enrichEavWithBenchmark()`:** benchmark gap enrichment i score adjustment w osobnej funkcji, wywoływanej inline w promise wymiaru `eav`

### Pliki referencyjne (read-only)
- `docs/` -- pelna dokumentacja skilli i metodologii (SKILL.md per skill + references)
- `docs/STRUKTURA-AUDYTU-AI-SEARCH.md` -- pelna metodologia audytu 9-wymiarowego
- `docs/audyt-claude-code-skills-docs-2026-01-29.md` -- przyklad audytu

### Bright Data (SERP API + Web Unlocker)
Jeden vendor zamiast dwoch (DataForSEO + crawl4ai). HTTP API, serverless-compatible (Vercel).

**Architektura:**
- Jedno API: `POST https://api.brightdata.com/request` z Bearer token
- Dwie strefy (zones): SERP API (dane Google) i Web Unlocker (crawling stron)
- Zone names to **krotkie human-readable stringi** (np. `serp_api1`, `web_unlocker1`) — NIE UUID
- Klucze: `BRIGHTDATA_API_TOKEN` (wspolny), `BRIGHTDATA_SERP_ZONE`, `BRIGHTDATA_UNLOCKER_ZONE`

**SERP API** (`dataforseo.ts` -- nazwa pliku legacy):
- Request: Google URL z `brd_json=1` -> Bright Data parsuje HTML na JSON
- Mapowanie pol: `rank`/`global_rank` -> position, `link` -> url, `display_link` -> domain, `title`, `description`
- PAA: `people_also_ask[].question` -> `paa: string[]`
- Related: `related[]` w dwoch formatach (carousel items z `items[].text` + proste z `text`) -> `flatMap` wyciaga oba
- AI Overview: `ai_overview` -> `AiOverviewData` via `extractAiOverview()` + `flattenAiOverviewTexts()` (rekursywna ekstrakcja z `texts[].snippet`/`title`/`list[]`, strip HTML artifacts). Zwraca `undefined` gdy brak lub tresc <20 zn.
- Timeout: 30s (`AbortSignal.timeout`)

**Web Unlocker** (`crawler.ts`):
- Zwraca raw HTML -> `node-html-markdown` (konwersja HTML->Markdown) -> `cleanContent()` (14-krokowy pipeline)
- Metadata: `extractTitle(html)` (regex `<title>`), `extractDescription(html)` (4 regex patterns: meta desc + og:desc, oba porzadki atrybutow)
- Retry: 3 proby, exponential backoff, brak retry na 4xx
- Timeout: 60s per URL
- Min content: 500 znakow
- Concurrent: 5 rownolegych (batch crawl w orchestratorze)
- **Brak BM25 filtering** -- parametr `keyword` w `crawlUrl()` ignorowany (akceptowane: stary prog 0.5 byl permisywny, prompty truncuja do 12000 zn.)
- **Brak accordion expansion** -- Bright Data renderuje JS ale nie wstrzykuje custom scripts (wiekszosc stron uzywa `<details>` otwartych domyslnie)

**Content cleaning** (`lib/content-cleaning.ts` -- port 1:1 z Python `crawl-server/server.py`):
  **Pre-clean (full markdown):**
  1. HTML tag stripping -- usuwa tagi HTML wstrzykniete przez CMS (np. WordPress glossary tooltips)
  2. Tooltip remnant cleanup -- pattern `.Więcej")` -> `.` (remnant po usunieciu tagow)
  3. Empty link stripping -- `[](url)` i `[ ](url)` usuwane
  **Pre-split (zapewnienie granic blokow):**
  4. Heading boundaries -- `\n\n` przed i po liniach `#`/`##`/`###` (kazdy naglowek = osobny blok)
  5. Horizontal rule boundaries -- `\n\n` wokol `---` / `***`
  6. Navigation transition boundaries -- `\n\n` przed liniami z >70% link density, gdy poprzednia linia to tekst
  **Block filtering (po split na `\n{2,}`):**
  7. Block deduplication -- identyczne bloki odrzucane via `seenBlocks` set
  8. Blacklista fraz (~25 fraz: nawigacja/UI chrome, e-commerce, cookies/GDPR, auth/newsletter, social share, apps)
  9. Category listing filter -- bloki z 3+ wzorcami `(\d+)` odrzucane
  10. Concatenated navigation filter -- bloki z 3+ przejsciami lowercase→uppercase bez spacji
  11. Link density filter -- bloki z >50% link density odrzucane
  **Post-clean (per block):**
  12. Image link removal -- `![alt](url)` usuwane
  13. Markdown link stripping -- `[text](url)` -> `text`
  14. Whitespace collapse -- wielokrotne spacje -> jedna, `\n{3,}` -> `\n\n`
