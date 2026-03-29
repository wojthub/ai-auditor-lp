# CLAUDE.md -- CitationOne

## Opis projektu

**CitationOne** — webapp do audytu contentu pod katem AI Search (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot). Analizuje tresci przez pryzmat **10 wymiarow jakosci + CSI Alignment + E-E-A-T**, integruje dane **AI Overview** z Google SERP i generuje raport z:

- **Content Quality Score (CQS)** 0-100
- **AI Citability Score** 0-10
- Priorytetyzowane rekomendacje **BEFORE/AFTER**

Narzedzie wewnetrzne. Jezyk interfejsu: **polski**. Light theme.

## Stack technologiczny

- **Framework:** Next.js 16 (App Router, SSR + API Routes)
- **Runtime:** React 19, TypeScript strict
- **Styling:** Tailwind CSS 4 (CSS-first config via `@theme inline` w globals.css -- brak tailwind.config)
- **Wykresy:** Recharts (radar chart 10 wymiarow, bar chart)
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
| [spec/dimensions.md](spec/dimensions.md) | 11 wymiarow audytu (10+EEAT), kryteria, CSI-A, BLUF, E-E-A-T, Effort Score |
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
│   │   │   ├── LoginForm.tsx     # Client Component — formularz email + checkbox zgody na Politykę Prywatności
│   │   │   ├── actions.ts       # Server Actions: sendCode (crypto OTP), verifyCode (atomic)
│   │   │   └── verify/
│   │   │       ├── page.tsx      # 8-cyfrowy kod weryfikacyjny
│   │   │       └── VerifyForm.tsx # Client Component — formularz kodu + cooldown 60s na "Wyślij ponownie"
│   │   ├── share/[token]/
│   │   │   └── page.tsx          # Publiczny raport (read-only, bez logowania, minimalny header)
│   │   ├── polityka-prywatnosci/
│   │   │   └── page.tsx          # Polityka Prywatności (publiczna, bez logowania)
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
│   │   │   ├── page.tsx          # Strona ustawien (admin: pelne, user: info o wbudowanych narzędziach)
│   │   │   ├── SettingsForm.tsx  # Formularz ustawien (Client Component, split admin/user view; per-user Gemini key UI zachowane w komentarzu)
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
│   │       ├── audit/[id]/report/
│   │       │   └── route.ts      # POST -- generowanie raportu z rekomendacjami
│   │       ├── checkout/
│   │       │   └── route.ts      # POST -- tworzenie sesji Lemon Squeezy checkout (auth, quantity)
│   │       └── webhook/
│   │           └── lemonsqueezy/
│   │               └── route.ts  # POST -- webhook LS (HMAC verify, idempotent, credit add/refund)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx       # Nawigacja boczna (lista audytow, nowy audyt, user info, kredyty, admin link, wyloguj)
│   │   │   ├── SidebarWrapper.tsx # Client wrapper na Sidebar (mobile drawer + hamburger, auto-close na nawigacji)
│   │   │   └── TopBar.tsx        # Gorny pasek (tytul z opcjonalnym linkiem titleHref, akcje)
│   │   ├── wizard/
│   │   │   ├── WizardShell.tsx   # Kontener wizarda z krokami i nawigacja
│   │   │   ├── Step1Input.tsx    # Krok 1: URL lub wklej tekst
│   │   │   ├── Step2CSI.tsx      # Krok 2: Definicja/potwierdzenie CSI
│   │   │   ├── Step3Audit.tsx    # Krok 3: Audyt w toku (równoległe wymiary, progress bars, cache popup, Przerwij)
│   │   │   └── Step4Results.tsx  # Krok 4: Podsumowanie + etapy audytu z cache popup + link do raportu
│   │   ├── dashboard/
│   │   │   ├── AuditList.tsx     # Client Component — filtrowanie/wyszukiwanie audytów (search + project pills)
│   │   ├── AuditListItem.tsx # Wiersz audytu na liscie (2x SVG circular score ring: CQS + Citability + badge projektu + przycisk usun)
│   │   ├── AuditActions.tsx  # Client Component — przyciski projekt + udostępnij na stronie raportu
│   │   │   ├── AuditReport.tsx   # Glowny raport audytu: 4 zakladki (Podsumowanie, Wymiary, Rekomendacje, Eksport)
│   │   │   ├── ScoreCard.tsx     # Karta CQS / AI Citability Score
│   │   │   ├── RadarChart.tsx    # Radar chart 9 wymiarow (Recharts) + rozbudowany tooltip z glossary na etykietach osi
│   │   │   ├── DimensionInfoGrid.tsx # Siatka 10 wymiarow z popupem wyjasniajacym (strona glowna)
│   │   │   ├── DimensionCard.tsx # Karta wymiaru (score + top problem)
│   │   │   ├── AiOverviewCoverageCard.tsx # Karta pokrycia AI Overview (wyekstrahowana z AuditReport, uzywana w DimensionDetail queryFanout)
│   │   │   ├── DimensionDetail.tsx # Rozwiniety widok wymiaru z danymi dimension-specific (EAV/Graf wiedzy, benchmark, TF-IDF, SRL, ChunkMap, Fan-Out+AIO)
│   │   │   ├── RecommendationList.tsx # Rekomendacje priorytetyzowane
│   │   │   ├── BeforeAfter.tsx   # Porownanie BEFORE/AFTER
│   │   │   ├── EAVTable.tsx      # Tabela Entity-Attribute-Value (3 kategorie badge: pokryte, unikalne, luka)
│   │   │   ├── KnowledgeGraph.tsx # Interaktywny graf wiedzy (react-force-graph-2d, canvas, dynamic import SSR-safe)
│   │   │   ├── ChunkMap.tsx      # Wizualizacja struktury H1/H2/H3
│   │   │   └── EEATCard.tsx      # Karta E-E-A-T z sygnalami (polskie etykiety + InfoHint per sub-wymiar)
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx         # Status badge (ok/warn/critical)
│   │       ├── InfoHint.tsx      # Tooltip z wyjaśnieniem pojęcia (ⓘ icon, hover/click, React portal, fixed positioning)
│   │       ├── BuyCreditsButton.tsx # Przycisk "Kup kredyty" z quantity picker (Lemon Squeezy checkout)
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
│   │   │   ├── recommendation-builder.ts # Algorytmiczny builder rekomendacji z wymiarów (0 Gemini calls)
│   │   │   └── orchestrator.ts   # Orkiestracja audytu (równoległe wymiary via Promise.all, error handling per wymiar)
│   │   ├── services/
│   │   │   ├── crawler.ts        # Ekstrakcja URL -> Markdown (Bright Data Web Unlocker + node-html-markdown + cleanContent)
│   │   │   └── dataforseo.ts     # SERP API (Bright Data SERP API -- nazwa pliku legacy)
│   │   ├── db/
│   │   │   ├── schema.ts         # Drizzle schema
│   │   │   ├── index.ts          # Polaczenie z DB
│   │   │   └── queries.ts        # CRUD (createAudit, getAudit, etc.) + User CRUD + verification codes + scoped getAudits
│   │   ├── settings.ts           # resolveCredential() + resolveGeminiKey(userId) -- user key → global/env (wszyscy userzy mają fallback)
│   │   ├── cache.ts              # Pipeline cache -- zapis/odczyt JSON per etap
│   │   ├── content-cleaning.ts   # Pipeline czyszczenia treści (14 kroków, 4 fazy) + extractTitle/extractDescription
│   │   ├── knowledge-graph.ts   # Transformacja EAV triples → graf wiedzy (buildKnowledgeGraph + filterKnowledgeGraph + semantic edges)
│   │   ├── export.ts             # Shared export -- buildExportMarkdown() (14 sekcji Markdown)
│   │   ├── export-html.ts       # Stylowany eksport PDF -- buildExportHTML(audit) (kolorowe karty, badge, Before/After)
│   │   ├── scoring.ts            # Kalkulacja CQS, AI Citability Score (opcjonalne wagi z profilu typu tresci)
│   │   ├── content-type-profiles.ts # Profile typow tresci (8 profili: article, listing, product, comparison, faq, landing, encyclopedia, tool)
│   │   ├── glossary.ts           # Centralny slownik 60 pojec z definicjami i tipami -- uzywany przez InfoHint
│   │   ├── rate-limit.ts        # In-memory per-user rate limiter (sliding window, cleanup co 5min)
│   │   └── utils.ts              # Helpers (sanitize, truncate, formatters, SSRF URL validation + IPv6)
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

### Kolory badge'ow pokrycia (spójnosc UI)

**WAZNE:** Badge'e pokrycia musza uzywac tych samych kolorow w calej aplikacji.

#### Badge "pokryte" -- **ZIELONY** (success)
Uzycie: encje/atrybuty/sub-zapytania pokryte w artykule vs konkurencja/benchamark.

```tsx
<span className="bg-success/10 text-success border border-success/20">pokryte</span>
```

Miejsca uzycia:
- DimensionDetail: Pokrycie encji (tabela), Macierz EAV, Formaty tresci, Query Fan-Out (sub-zapytania)
- EAVTable: badge pokrycia + statystyka "X pokrytych"
- KnowledgeGraph: statystyka "Pokryte: X"
- AiOverviewCoverageCard: tabela twierdzen AI Overview

#### Badge "luka" -- **CZERWONY** (danger)
Uzycie: brakujace elementy, niepokryte encje/atrybuty, P1/P2 priority gaps.

```tsx
<span className="bg-danger/10 text-danger border border-danger/20">luka</span>
```

#### Badge "unikalne" -- **TEAL** (accent)
Uzycie: wyróżniki -- elementy obecne tylko w Twoim artykule (nie w konkurencji).

```tsx
<span className="bg-accent/10 text-accent border border-accent/20">unikalne</span>
```

#### Klasyfikacja atrybutów (wewnetrznie: URR)

| Klasa (UI: Klasyfikacja) | Kolor     | Hex       | Tailwind    | Znaczenie                           |
|------------|-----------|-----------|-------------|-------------------------------------|
| UNIQUE     | Teal      | `#0b7983` | `accent`    | Wyróżnik (<30% konkurentów)         |
| ROOT       | Cyan      | `#0891b2` | `cyan`      | Podstawa (≥70% konkurentów)         |
| RARE       | Żółty     | `#ca8a04` | `warning`   | Rzadki (30-69% konkurentów)         |

```tsx
// Wzorzec dla URR w tabelach
const urrColors: Record<string, string> = {
  UNIQUE: 'text-accent',    // #0b7983
  ROOT: 'text-cyan',        // #0891b2
  RARE: 'text-warning',     // #ca8a04
};
```

Miejsca uzycia:
- EAVTable: kolumna Klasyfikacja, statystyka "X unikalnych"
- DimensionDetail: kolumna Klasyfikacja w tabeli Pokrycie encji (pokryte + luki)
- KnowledgeGraph: kolory węzłów grafu, legenda, tooltip i filtr label "Klasyfikacja"

#### Inne statusy (bez zmian)

- **OK/WARN/CRITICAL** (Badge.tsx): success/warning/danger -- uzywane w ScoreCard, tabeli wymiarow
- **Strengths** (mocne strony): success (zielony)
- **Weaknesses** (slabe strony): danger (czerwony)
- **Priority gaps:** P1 = danger, P2 = warning, P3/P4 = muted

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
EMAIL_FROM=CitationOne <noreply@citationone.com>  # Opcjonalne -- adres nadawcy (domyslnie noreply@citationone.com)
GEMINI_API_KEY=AIza...                 # Opcjonalne -- Google Gemini API (lepiej w /ustawienia)
MODEL_NAME=gemini-3-flash-preview      # Opcjonalne -- nazwa modelu Gemini (domyslnie gemini-3-flash-preview)
BRIGHTDATA_API_TOKEN=...               # Opcjonalne -- Bright Data Bearer token (lepiej w /ustawienia)
BRIGHTDATA_SERP_ZONE=serp_api1         # Opcjonalne -- nazwa strefy SERP API
BRIGHTDATA_UNLOCKER_ZONE=web_unlocker1 # Opcjonalne -- nazwa strefy Web Unlocker
```

Na Vercel: `POSTGRES_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `RESEND_API_KEY` ustawic w Vercel → Settings → Environment Variables. Klucze API (Gemini, Bright Data) konfigurowac w `/ustawienia` (DB).

### Deploy na Vercel

- **Repo:** `wojthub/ai-auditor` (prywatne), auto-deploy z `main`
- **Domena:** `app.citationone.com`
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
  - **Content-only**: analizuje sam tekst (równolegle: 9 wymiarów Gemini + Effort Score algorytmiczny + EEAT via `Promise.all`)
  - **Full** (domyslny): benchmark SERP (Bright Data SERP + Web Unlocker + EAV + scoring równolegle) -> potem audyt z danymi benchmarku
- **Wymiary analizowane równolegle** (10 concurrent Gemini calls via `Promise.all`: 9 wymiarów + EEAT) + **Effort Score** (algorytmiczny, 0 Gemini calls) -- natychmiastowy zapis do DB po zakończeniu każdego, polling w UI pokazuje postęp (wszystkie nieukończone oznaczone jako `running`).
- **Kazdy wymiar to osobne wywolanie Gemini API** -- niezalezne error handling (błąd jednego nie blokuje reszty, fallback z score=0).
- **JSON mode:** `responseMimeType: 'application/json'` w `callClaudeJSON()` -- natywny structured output.
- **Metadata AI:** `callClaudeJSONWithMeta()` w `client.ts` -- zwraca `{ data, meta }` razem (concurrent-safe). Orchestrator uzywaja go we wszystkich concurrent batches (wymiary, EAV extraction, scoring). `getLastCallMeta()` (globalny singleton) uzywany juz tylko w kodzie sekwencyjnym (CSI inference, raport).
- **Benchmark filtrowanie:** konkurenci z `wordCount < MIN_COMPETITOR_WORDS` (domyslnie 100, konfigurowalny w `/ustawienia`) sa wykluczeni z EAV extraction i scoringu -- nadal widoczni w liscie `competitors` i w rankingu SERP w raporcie (wyszarzeni na swoim miejscu z informacja "wykluczone — za malo tresci"), ale nie zaburzaja analizy. Konkurenci ktorym nie udalo sie pobrac tresci (failed crawl) sa dodawani z `wordCount: 0` i wyswietlani jako wyszarzeni z informacja "nie udalo sie pobrac tresci". **Zero usable competitors:** jesli po crawlowaniu 0 konkurentow ma wystarczajaca tresc, `runBenchmark` zwraca minimalny benchmark z SERP data (PAA, Related, AIO) ale bez EAV/gaps/scoring — audyt kontynuuje normalnie. UI: komunikat "Nie udalo sie pobrac tresci zadnego konkurenta — porownanie niedostepne".
- **Benchmark: source URL w competitors:** audytowany URL jest wykluczany z crawlowania/EAV/scoringu (znormalizowane porownanie URL -- strip protocol, www, trailing slash, lowercase), ale **zachowywany w tablicy `competitors`** z pozycja SERP i `wordCount: 0`. Dzieki temu ranking SERP w raporcie wyswietla source article na jego faktycznej pozycji SERP (★) zamiast na dole tabeli. UI rozpoznaje source przez `isSourceUrl()` i uzywa `sourceCQS`/`sourceCitability` z propsow.
- **Competitor scoring:** w trybie Full, EAV extraction i scoring biegną **równolegle** (`Promise.all` w `runBenchmark()`). Source EAV jest częścią batchu konkurentów (flaga `isSource`). Scoring: 1 call Gemini per competitor (temperature 0) z rubricem punktowym 9 wymiarów + EEAT (wagi 1:1 z source scoring). Pola `estimatedCQS`, `estimatedCitability`, `qualitySummary`, `topStrengths`, `topWeaknesses` w `CompetitorData` (opcjonalne, backward compat). Ranking SERP w raporcie + mini ranking w Step4Results. **Stabilizacja wyników:** temperature 0 + algorytmiczne metryki z `analyzeContentStructure()` wstrzyknięte do prompta + htmlMetrics z crawlera + profil typu treści. Rubric CQS: CSI-A 13 + Density 11 + BLUF 11 + EAV 13 + Chunk 7 + CoR 6 + TF-IDF 6 + **Fan-Out 13** + SRL 9 + Effort 6 + EEAT 5 = 100. Rubric Citability: BLUF 1.8 + Density 1.4 + Chunk 1.0 + CoR 1.0 + TF-IDF 0.7 + **Fan-Out 1.8** + EAV 1.2 + Effort 1.1 = 10.
- **SERP Consensus (walidacja CSI + analiza treści):** w trybie Full z keyword, Krok 2 wizarda automatycznie pobiera konsensus SERP (`POST /api/serp-consensus` z tytulem + snippetem tresci artykulu). Gemini analizuje top 10 wynikow Google (tytuly + snippety + PAA + related) i buduje: (1) consensus CSI (CE/SC/CSI/Predicate z SERP), (2) analize tresci SERP (typ/format/perspektywa/kluczowe dane), (3) analize tresci artykulu (sourceContentType/sourceContentFormat/sourceContentAngle). Wynik: `SerpConsensus` z 7 pol alignment (4 CSI + 3 content: contentType/contentFormat/contentAngle). Ogolna zgodnosc obliczana **server-side** (`computeOverallAlignment()` — srednia z 7 pol, progi: >=1.5 high, >=0.75 partial, else low). UI: tabela porownawcza 7 wierszy (Źródło vs Konsensus SERP) z alignment dots + sekcja kluczowych danych. Dane zapisywane w DB (kolumna `serp_consensus` TEXT/JSON) przy tworzeniu audytu. Wyswietlane w Kroku 2 wizarda i raporcie (tab Podsumowanie). Przekazywane opcjonalnie do CSI Alignment w orchestratorze. SERP cache hit -- 0 dodatkowego kosztu Bright Data. Koszt: 1 wywolanie Gemini (~800 tokenow output). Error handling: specificzne komunikaty bledu (Bright Data vs Gemini vs generyczny) w catch bloku route.
- **Fan-Out i AIO (D8):** wymiar dekompozycji CSI na 5-10 sub-zapytan AI Search (3 typy: semantic, intent, verification) + **zintegrowana karta AI Overview Coverage** (przeniesiona z Summary tab). W trybie Full grounduje sub-zapytania wobec PAA/Related z SERP + AI Overview (tagi CONFIRMED/OVERVIEW/PREDICTED/SERP-ONLY; priorytet: CONFIRMED > OVERVIEW > PREDICTED). Tag OVERVIEW (niebieski) oznacza potwierdzenie w syntezie Google AI. Mapuje sub-zapytania do sekcji H2 artykulu. Scoring: % pokrytych sub-zapytan. Dane sub-queries i coverageStats (w tym `overviewCount`) w `rawResponse`. Scoring: wysokie wagi — CQS: W_QUERY_FANOUT=0.14 (Tier 1 obok CSI i EAV), Citability: CIT_QUERY_FANOUT=0.20 (co-dominant z BLUF). `find()` zwraca `?? 0` dla brakujących wymiarów w starych audytach (brak `hasQueryFanout` backward compat). `AiOverviewCoverageCard` (osobny komponent) wyswietlany w DimensionDetail pod tabela sub-zapytan.
- **Effort Score:** algorytmiczny wymiar (0 Gemini calls) mierzacy wysilek wlozony w strukture i formatowanie tresci. Checklista 10 kryteriow: tresc >700 slow, tresc > dynamiczny prog dlugosci (srednia slow top 10 konkurentow, fallback 2000 w content-only), obrazki >=4 (htmlMetrics), wideo (htmlMetrics), listy, tabele, hierarchia H1/H2/H3, wyroznione terminy (bold), spis tresci/podsumowanie, brak scian tekstu. Label: "Tresc > X slow (sr. top 10)". `calculateEffortScore()` w `content-structure.ts` oblicza score 0-10 z `ContentStructure` + `HtmlMetrics`. Zapisywany jako dimension result (`effort`) w DB + `writeDimensionCache()` (model: 'algorithmic', tokensUsed: 0). Wplyw na scoring: CQS 6%, Citability 11%. UI: karta "Effort Score vs konkurencja" w Podsumowaniu (checklista badge bez score/kryteriow w naglowku + formaty tresci z porownaniem konkurencji). Detekcja formatow (`hasFormat()` w orchestratorze) ujednolicona z `content-structure.ts` — ten sam regex dla tabel (wymaga separatora `|---|`) i list (wymaga tresci po `-`/`*`/`1.`) + osobna sekcja pod EEAT w zakladce Wymiary (NIE w gridzie DimensionCard). Widoczny w RadarChart (10 osi) i DimensionInfoGrid. Backward compat: stare audyty bez effort — `find()` zwraca `?? 0`. Ograniczenia: obrazki i wideo dostepne tylko przy crawl z URL (nie paste), linki niedostepne (cleanContent stripuje).
- **AI Overview integration:** Bright Data SERP API zwraca pole `ai_overview` z synteza Google AI. `extractAiOverview()` w `dataforseo.ts` wyciaga: `summary` (splaszczona tresc z `texts[]`, rekurencyjna — `snippet`/`title`/`list[]`), `references[]` (`url`/`title`/`domain`), `sourceInReferences` (czy URL zrodla jest cytowany — obliczane w orchestratorze via `normalizeUrl()`). Dane w `AiOverviewData` (typy), kolumna `ai_overview` w `benchmark_data` (JSON). Uzywane w 5 miejscach: (1) SERP Consensus prompt — tresc AIO jako dodatkowy kontekst, (2) Fan-Out i AIO — tag OVERVIEW (sub-zapytanie potwierdzone przez AI Overview) + karta pokrycia, (3) CSI Alignment — AIO summary w sekcji konsensusu, (4) Report prompt (zadanie 7) — analiza pokrycia AI Overview (kluczowe twierdzenia vs tresc artykulu), (5) UI — `AiOverviewCoverageCard` w DimensionDetail (queryFanout) + badge w SerpConsensusPanel + badge w Step2CSI. `AiOverviewCoverage` w `reportExtras`: `keyClaims[]` (claim/covered/section), `coveragePercent`, `recommendation`. Eksport: zintegrowane z sekcja Fan-Out. Koszt: 0 dodatkowych wywolan API. Google nie zawsze wyswietla AIO — `extractAiOverview()` zwraca `undefined` gdy pole puste/krotkie (<20 zn.), caly flow gracefully degraduje (pola opcjonalne). Truncation: 2000 zn. w promptach, 500 zn. w UI `SerpConsensus`.
- **Title & Meta Description analysis:** crawler wyciaga title (`<title>` tag) i description (regex: meta description + og:description, 4 patterny) z HTML. Zapisywana w DB (kolumna `source_description` TEXT nullable w tabeli `audits`). Analiza w fazie raportu -- rozszerzenie istniejacego report prompt (zadanie 6) z kryteriami SEO best practices (title: 55-60 zn., keyword na poczatku, CE w tytule; description: do 155 zn., active voice, CTA). Gemini generuje rekomendowane wersje + analiza current. Dane w `reportExtras.titleDescription` (opcjonalne, backward compat). UI: karta "Title & Description" w Summary tab z current vs recommended + badge dlugosci (zielony/zolty/czerwony). Eksport: sekcja 13 w markdown. Koszt: 0 dodatkowych wywolan Gemini.
- **Fuzzy EAV attribute matching:** porownanie atrybutow zrodla vs konkurentow uzywa 3-poziomowego dopasowania (`attributesMatch()` w orchestratorze): (1) exact match, (2) substring containment (np. "ltv" w "wskaźnik ltv"), (3) token overlap — wspolne slowo ≥3 znaków. Eliminuje falszywe luki gdy Gemini nazywa ten sam atrybut roznie w roznych wywolaniach. Uzywane w obu kierunkach: `isInSource()` (gap detection) i `isInCompetitors()` (unique_opportunity).
- **TF-IDF z realnym korpusem konkurencji:** w trybie Full, `computeTermStats()` (`term-analysis.ts`) algorytmicznie analizuje terminy z treści źródła i konkurentów (tokenizacja bigram + document frequency + **UI_NOISE_TERMS blacklist** ~80 terminow nawigacyjnych/UI). **Tylko terminy wielowyrazowe** (bigramy+) — jednowyrazowe odfiltrowane jako zbyt generyczne. Wynik: `TermStats` (sourceHighIdf, missingFromSource, coveredCommon) zapisywany w `BenchmarkData.termStats` (DB: kolumna `term_stats` w `benchmark_data`). Prompt TF-IDF (`tfidf-analysis.ts`) w trybie Full otrzymuje WSZYSTKIE brakujace terminy (bez limitu) i **musi podac `targetSection`** (istniejacy H2) dla KAZDEGO. Pole `suggestedSection` zrenameowane na `targetSection` w prompcie, orchestratorze i raporcie (backward compat: fallback na `suggestedSection` w starych audytach). UI: jedna tabela "Pokrycie terminow konkurencji" w DimensionDetail (pokryte/luki jak w Grafie wiedzy) + "Luki terminologiczne TF-IDF" w Rekomendacjach i eksportach MD/PDF (**dane z `termStats.missingFromSource`** — spojne z wymiarem; fallback na `tfidfMapping` dla starych audytow). W trybie content-only: fallback na wiedze ekspercka Gemini, tabela pokrycia ukryta.
- **Gap sorting:** luki tresciowe (benchmark gaps) sortowane wg priorytetu (P1 -> P2 -> P3 -> P4), potem wg `coverageCount` desc. Sorting w orchestratorze (nowe audyty) + UI-side sort w `AuditReport.tsx` i `DimensionDetail.tsx` (stare audyty).
- **URR klasyfikacja (algorytmiczna, wchłonięta do CSI-A):** w trybie Full, `enrichEavWithBenchmark()` w orchestratorze algorytmicznie reklasyfikuje `urrClass` source triples na podstawie `eavMatrix` coverage data: `coverageCount/coverageTotal` per atrybut → UNIQUE (<30%), ROOT (>=70%), RARE (30-69%). Brak osobnego wywołania Gemini (stary prompt `attribute-classifier.ts` UNUSED). W content-only: `urrClass` pochodzi z AI w prompcie EAV extraction. **Backward compat:** stare audyty z `urr` w DB — `queries.ts` scala URR problems/strengths do csiAlignment (nie tworzy osobnej karty). Rekomendacje `dimension: 'urr'` → `'csiAlignment'` na poziomie danych.
- **Prompt label sanitization:** prompt CSI Alignment (`csi-alignment.ts`) uzywa human-readable polskich etykiet statusu luk ("krytyczna luka (P1)", "ważna luka (P2)" itd.) zamiast surowych wartosci enum (`gap_p1`, `gap_p2`) -- zapobiega wyciekowi nazw zmiennych do tekstu generowanego przez Gemini.
- **Algorytmiczne metryki (content-structure.ts):** deterministyczna analiza struktury markdown -- oblicza metryki ktore NIE powinny byc generowane przez LLM (headingi, word count per sekcja, tabele, listy, bold, linki, sciany tekstu, liczba zdan). `analyzeContentStructure(content, ce)` wywoływany raz w `runDimensions()`. Wyniki wstrzykiwane do promptow (CoR, Chunk, Density) jako "metryki obliczone algorytmicznie" + nadpisywane w `postProcessRawResponse()` po odpowiedzi Gemini. Post-processing obejmuje 5 wymiarow: CoR (structureAnalysis), Chunk (sections wordCount/ceRepeatCount + stats), Density (totalSentences + densityRatio), SRL (stats z srlInstances[]), Query Fan-Out (coverageStats z subQueries[]). Chunk matching uzywa `normalizeHeading()` (lowercase, strip bold/italic/code/links) zamiast exact match.
- **Grounding fragmentów (grounding.ts):** `verifyDimensionProblems()` sprawdza czy cytaty (BEFORE) w `problems[].fragment` istnieja w tresci artykulu — 3-poziomowa weryfikacja: (1) exact substring (po normalizacji whitespace+lowercase), (2) substring bez interpunkcji, (3) token overlap ≥60% (globalny, nie sliding window). `verifyRecommendationsBefore()` analogicznie dla rekomendacji. Fragmenty <15 znaków lub opisowe ("Brak...", "Artykuł nie...") automatycznie zweryfikowane. Wywolywane w orchestratorze po kazdym wymiarze i po generowaniu raportu.
- **Hybrid Recommendation Architecture:** rekomendacje generowane algorytmicznie z wymiarow (nie przez report prompt). `buildRecommendationsFromDimensions(dimensions, eeat, cqsWeights)` w `lib/ai/recommendation-builder.ts` konwertuje `DimensionProblem[]` → `Recommendation[]` (0 Gemini calls). Priorytet z impact + waga CQS wymiaru. `estimatedCqsDelta` algorytmiczny (`weight * 100 * multiplier` — CQS jest na skali 0-100, wartosci 1-9). Fuzzy dedup (token overlap >=80%). Cap 20. Brakujace sygnaly EEAT jako bonus recs. `DimensionProblem` rozszerzony o 4 opcjonalne pola: `title`, `section`, `actionType`, `clientWhy` -- generowane przez kazdy prompt wymiaru (9 promptow zaktualizowanych). Orchestrator zapisuje rekomendacje PRZED faza raportu -- odporne na blad raportu. Raport (retry 2 proby) generuje tylko extras (struktura, BLUF, SRL, EEAT blocks, TF-IDF mapping, title/desc, AIO coverage). `parseReportResponse()` nie zwraca juz rekomendacji. Brak zmian DB schema, brak zmian UI. Stare audyty backward compatible.
- **Recommendation IDs:** zawsze generowane przez `nanoid()` w `queries.ts` -- parser moze zwracac `rec_1`, `rec_2` z AI, ale DB nadpisuje je unikalnymi ID (unikanie kolizji miedzy audytami).
- **raw_response:** kazdy wymiar zapisuje surowa odpowiedz AI w kolumnie `raw_response` tabeli `dimension_results` (JSON). Pole `rawResponse?: unknown` w typie `DimensionResult`.
- **Niezalezny zapis raportu:** `saveRecommendations` i `saveReportExtras` maja osobne try/catch -- blad jednego nie blokuje drugiego. Rekomendacje zapisywane PRZED raportem (z recommendation-builder), raport zapisuje tylko reportExtras.
- **Dimension warning:** jesli AI zwroci pustą odpowiedz (score=0 i brak summary), orchestrator loguje status `'warning'` w `_meta.json` zamiast `'completed'`.
- **Ustawienia (kredencjaly, model, parametry):** przechowywane w tabeli `settings` (key-value) -- `resolveCredential()` sprawdza DB first, fallback `process.env`. Klucze: `GEMINI_API_KEY`, `MODEL_NAME`, `BRIGHTDATA_API_TOKEN`, `BRIGHTDATA_SERP_ZONE`, `BRIGHTDATA_UNLOCKER_ZONE`, `MIN_COMPETITOR_WORDS`.

### Raport audytu (`/audyt/[id]`)
- **TopBar:** tytul audytu jako link do sourceUrl (otwiera w nowej karcie, hover accent, ikona ↗). Prop `titleHref` w TopBar.tsx. Brak breadcrumbs. Akcje: przycisk Projekt + Udostepnij (AuditActions) + Odswiez audyt
- **4 zakladki:** Podsumowanie | Wymiary | Rekomendacje | Eksport
- **Podsumowanie:** CQS + Citability ScoreCards + **badge jezyka zrodla** (PL/EN) + keyword + **przycisk Pobierz PDF** (wspoldzielona logika z ExportTab), **Executive Summary + profil** (polaczony box: liczba problemow critical+high, najwazniejsza zmiana + badge profilu typu tresci dla non-article), RadarChart, tabela wymiarow, CSI context, **panel Walidacja SERP** (jesli `serpConsensus` w DB -- tabela porownawcza 7 wierszy: CE/SC/CSI/Predicate/Typ/Format/Perspektywa z alignment dots (ikony checkmark/dash/X zamiast samych kropek — dostepnosc), badge zgodnosci ze sredniej 7 pol, kluczowe dane, tematy SERP, sygnaly PAA, badge + zwijanra synteza AI Overview jesli obecne), **karta Pokrycie Fan-Out** (naglowek bez licznika — licznik w tagach coverage stats ponizej; tabela sub-zapytan z grounding tags, sekcja mapowana, status pokryte/brak + callout niepokrytych — te same dane co w wymiarze queryFanout), **karta Formaty tresci vs konkurencja** (siatka 2x3: checkmark/X per format + % adopcji u konkurentow, widoczna w trybie Full), **karta Title & Description** (jesli `reportExtras.titleDescription` -- current vs recommended title/desc z badge'ami dlugosci i analiza SEO), **Proponowana struktura tresci** (ChunkMap z tabami Aktualna/Po poprawieniu — visual diff: ZMIEN = zolte tlo + przekreslony oryginalny tytul, NOWA = niebieskie tlo, OK = bez zmian), **Top 10 SERP** (tryb Full — polaczona karta: 4 metryki benchmarkowe (Sr. CQS, Sr. Citability, Sr. slow, **Wplyw jakosci na pozycje** — Spearman rank correlation, srednia dwoch sygnalow: CQS vs pozycja + Citability vs pozycja, floor 10% jesli raw >=5%, skala 0-100%) + tabela top 10 z CQS/Citability per competitor + **analiza konkurentow** (qualitySummary/topStrengths/topWeaknesses po rozwinieciu wiersza + w eksportach MD/PDF))
- **Wymiary:** klikalne DimensionCard -> DimensionDetail z danymi dimension-specific:
  - Grid 9 wymiarow (bez effort) -> klikalne DimensionCard -> DimensionDetail. Dimension-specific: Graf wiedzy (eav) -> KnowledgeGraph + EAVTable + Macierz EAV | Chunk -> ChunkMap | CSI-A -> Pokrycie encji (InfoHint na kolumnach Status/Klasyfikacja/Pokrycie) + Macierz EAV | TF-IDF -> Pokrycie terminow konkurencji (tylko bigramy+) | SRL -> transforms | Fan-Out i AIO -> sub-queries table (InfoHint na kolumnach: Sub-zapytanie/Typ/Sekcja/Status/Grounding) + AiOverviewCoverageCard
  - **EEAT** (pod gridem) -> 4 sub-wymiary z badge sygnałów
  - **Effort Score** (pod EEAT, osobna karta) -> checklista on-site z badge (zielone/czerwone jak EEAT sygnaly, score X/10)
  - **Nawigacja prev/next:** strzalki ← / → na dole DimensionDetail z nazwa poprzedniego/nastepnego wymiaru
- **Rekomendacje:** priorytetyzowane (critical/high/medium/bonus) z collapse/expand per priorytet (domyslnie 3 widoczne, przycisk "Pokaż wszystkie (X więcej)"). Każda rekomendacja: tytuł, wymiar, **sekcja** (nazwa H2 lub "Lead"/"Meta"/"Nowa sekcja"), **akcja** (badge: zamień/dodaj/usuń/przenieś/rozszerz), **clientWhy** (💡 uzasadnienie klienta) + **impact** (techniczne uzasadnienie SEO) — oba widoczne jednocześnie (clientWhy akcentowy na gorze, impact szary pod spodem), BEFORE/AFTER, +CQS delta. Proponowana struktura + **BLUF per sekcja z BEFORE/AFTER** (currentBluf + suggestedBluf per kazda H2, wymuszane w prompcie) + **Luki terminologiczne TF-IDF** (dane z `termStats.missingFromSource` — te same co w wymiarze TF-IDF, wzbogacone o `targetSection` z tfidfMapping; fallback na tfidfMapping dla starych audytow) + SRL transforms + EEAT blocks
- **Eksport:** generuje Markdown raportu (POST /api/audit/[id]/report), pobierz .md / pobierz .pdf / kopiuj do schowka / **brief do klienta** (przycisk generuje podglad markdown z 📍Gdzie + ✏️Co zrobić + 💡Dlaczego, potem przycisk "Kopiuj do schowka" — `buildClientBriefMarkdown()`). Generowane client-side bez API call. Stan podniesiony do rodzica AuditReport. PDF generowany client-side (`html2pdf.js` + `marked` -- markdown -> HTML -> stylowany A4 PDF). **PDF beta badge:** wszystkie przyciski Pobierz PDF wyswietlaja zolty badge "beta" (maly, uppercase)
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
- **Wielojezycznosc zrodel (sourceLanguage):** auto-detekcja jezyka artykulu w CSI inference (Gemini zwraca `sourceLanguage` jako ISO 639-1). Przepływ: `/api/csi` → Step2CSI → WizardState → Step3Audit → `/api/audit` → DB (`source_language` kolumna, nullable, NULL=pl) → orchestrator (`AuditInput.sourceLanguage`). Dla PL: bez zmian (backward compat). Dla EN/innych: `replaceLanguageInstruction(prompt, lang)` w orchestratorze podmienia hardcoded instrukcje PL na jezykowa — cytaty BEFORE/AFTER w jezyku zrodla, opisy/sugestie rowniez. Pokrywa: 9 wymiarow (`buildDimensionPrompt`), EEAT, raport, competitor scoring, benchmark EAV. SERP consensus: pola konsensusu w jezyku SERP, pola artykulu w jezyku zrodla. SERP API: `gl` mapowany z jezyka na kraj (en→us, pl→pl, de→de). Cache key SERP wzbogacony o jezyk (`keyword__en`). TF-IDF: angielskie stopwords w `term-analysis.ts`, `tokenize(text, lang)`. Grounding: angielskie descriptive patterns. Step1: heurystyczny badge PL/EN (polskie diakrytyki >= 5 w 2000 zn.). WizardPrefill: `sourceLanguage` przenoszony przy odswiezaniu audytu.
- **Instrukcja jezykowa w promptach:** dla PL — oryginalna instrukcja `WAZNE: Wszystkie wartosci tekstowe...w jezyku polskim`. Dla innych jezykow — `replaceLanguageInstruction()` podmienia na instrukcje w jezyku zrodla. `HARDCODED_PL_INSTRUCTION` + `HARDCODED_PL_INSTRUCTION_V2` (z/bez diakrytykow) — oba warianty obslugiwane. CSI prompt ma wlasna instrukcje ("Odpowiadaj w tym samym jezyku co tresc").
- **Terminologia w promptach:** wszystkie prompty i orchestrator uzywaja "tresc/tresci" zamiast "artykul/artykulu" — neutralne wobec typu (artykul, listing, produkt, landing page). Marker sekcji: `## Tresc do analizy` (orchestrator dynamicznie relabeluje na `## Tresc do analizy ({profil})` dla non-article). CSI prompt: `## Tresc do analizy`, nie prefixuje CSI enumem predykatu.
- **Adaptacja promptow do typu tresci:** dla non-article profili orchestrator wstrzykuje `## Kontekst typu treści` z instrukcja PRZED sekcja z trescia i zamienia `## Artykul do analizy` na `## Treść do analizy (Typ)`. Dotyczy 9 wymiarow + raport. EEAT ma wbudowane tabele sygnalow per typ (nie uzywa instrukcji kontekstowej). Profil `article` = zero zmian (backward compat).
- **Report prompt (report-generation.ts):** 7 zadan (bylo 8 -- usuniety task 1 "rekomendacje", przeniesiony do recommendation-builder). Generuje tylko extras: proponowana struktura H1/H2/H3, BLUF per H2, SRL transforms, EEAT blocks, TF-IDF mapping, Title & Meta Description, AIO coverage. Rekomendacje budowane algorytmicznie PRZED raportem. Report retry (2 proby) tylko dla extras.

### Profile typow tresci (Content Type Profiles)
- **Plik:** `lib/content-type-profiles.ts` — 8 profili: `article` (domyslny), `listing`, `product`, `comparison`, `faq`, `landing`, `encyclopedia`, `tool`
- **Kazdy profil definiuje:** wagi CQS (`WeightSet`, suma=1.0), wagi Citability (`CitabilityWeightSet`, suma=1.0), wagi EEAT sub-wymiarow (`EEATWeights`, suma=1.0), instrukcje per wymiar (`DimensionInstructions`)
- **Resolver:** `resolveProfile(serpConsensus.contentType.primary)` — fuzzy matching free-form stringa z Gemini na profil (substring patterns, kolejnosc MA znaczenie). Fallback: `article`
- **Przepływ:** SERP consensus wykrywa typ → orchestrator resolves profile → profil zapisywany w DB (`audits.content_type_profile`) → instrukcje wstrzykiwane do promptow wymiarow → EEAT prompt dostaje profileId (wbudowane tabele sygnalow) → wagi uzywane w `calculateCQS()`/`calculateCitability()` → EEAT average przeliczany z wagami profilu
- **DB:** kolumna `content_type_profile` (TEXT nullable) w tabeli `audits`. Stare audyty: NULL = profil article
- **Scoring:** `scoring.ts` — `calculateCQS(dims, eeat, weights?)` i `calculateCitability(dims, weights?)` przyjmuja opcjonalne wagi z profilu. Brak wag = stale domyslne (backward compat). EEAT average przeliczany w orchestratorze z `profile.eeatWeights` (np. listing: Trust 50%, Experience 25%, Expertise 15%, Authority 10%)
- **EEAT prompt:** `eeat-evaluation.ts` — `buildPrompt(content, csi, profileId?)`. 7 zestawow tabel sygnalow (listing/product/comparison/faq/landing/encyclopedia/tool) + domyslny article. Kazdy zestaw ma inne sygnaly dopasowane do typu (np. listing Trust: "Aktualne ceny", "Dyrektywa Omnibus" zamiast "Disclaimer artykuł informacyjny"). Instrukcja na koncu: "Oceniaj WYLACZNIE na podstawie sygnalow z tabel"
- **Prompt adaptacja (9 wymiarow):** dla non-article profili orchestrator (1) wstawia `## Kontekst typu treści\n{instrukcja}` PRZED sekcja z trescia, (2) zamienia `## Artykul do analizy` na `## Treść do analizy ({label})`. Raport: analogicznie z `## Artykul (do kontekstu AFTER)`
- **UI:** badge profilu w raporcie (SummaryTab, polaczony box z executive summary) i na liscie audytow (AuditListItem, obok badge Full/Content). Widoczny dla WSZYSTKICH typow (w tym article)
- **Eksport Markdown:** profil w naglowku, Executive Summary i kontekscie CSI (widoczny tylko dla non-article)
- **Eksport PDF:** badge profilu w headerze (obok keyword) + pasek informacyjny pod score cards (widoczny tylko dla non-article)
- **API helpers:** `getProfileById(id)` (z DB), `getAllProfiles()` (lista do dropdown), `resolveProfile(contentType)` (z free-form string)

### InfoHint (tooltips pojec)
- **Komponent:** `components/ui/InfoHint.tsx` — ikonka i w kolku (SVG), tooltip on hover/click, React portal (`createPortal` do `document.body`) z `position: fixed` — nie obcinany przez `overflow-x-auto` w tabelach. Koordynaty z `getBoundingClientRect`. Auto-placement (top/bottom wg dostepnego miejsca). `stopPropagation` (bezpieczne w `<button>`)
- **Glossary:** `lib/glossary.ts` — centralny slownik 60 pojec. Kazdy wpis: `term`, `short`, `detail`, `actionable` (tip). Kategorie: metryki globalne (CQS, Citability, cqsImpact), CSI (CE, SC, predicate, csi), wymiary (bluf, cor, tfidf, srl, fanout, eav, density, chunk, eeat), SERP consensus (serpContentType/Format/Angle, serpData, serpThemes, paaSignals), benchmark (avgCqs, avgCitability, avgWords, urr), sekcje raportu (structure, contentFormats, eavCoverage, eavMatrix, subQueries, eavTriples, knowledgeGraph, tfidfTerms, srlTransforms, dimensionProfile, serpValidation, titleDescription, serpBenchmark), E-E-A-T sub-wymiary (eeatExperience, eeatExpertise, eeatAuthority, eeatTrust), kolumny tabel (entity, attribute, value, eavType, grounding, competitorFreq), kolumny Fan-Out (fanoutSubQuery, fanoutType, fanoutSection, fanoutStatus)
- **Uzycie:** ScoreCard (hintKey prop), AuditReport (sr. CQS, sr. Citability, sr. slow, CSI context, Profil wymiarow, Walidacja SERP, Title & Meta Description, Top 10 SERP, sekcje Rekomendacji: struktura/BLUF/TF-IDF/SRL/EEAT), RadarChart (rozbudowany tooltip na etykietach osi z glossary), Step2CSI (14 pol), EAVTable (kolumny: Encja/Atrybut/Wartość/Typ/Klasyfikacja), EEATCard (tytul + 4 sub-wymiary: Doświadczenie/Ekspertyza/Autorytet/Wiarygodność), DimensionDetail (9 sekcji + kolumny tabel: Atrybut/Klasyfikacja/Frekwencja/Grounding), DimensionInfoGrid (kazdy wymiar), DimensionCard (kazdy wymiar), AuditListItem (SVG `<title>` na kolkach CQS/Citability), Fan-Out table (kolumny: Sub-zapytanie/Typ/Sekcja/Status — w 3 miejscach: SummaryTab, RecommendationsTab, DimensionDetail queryFanout)
- **Implementacja:** `<span role="button">` zamiast `<button>` — bezpieczne zagniezdżanie w `<button>` (DimensionInfoGrid, DimensionCard). Keyboard accessible (Enter/Space). Click outside closes. 150ms delay on mouse leave

### UI/UX
- **Light theme** -- jasne tlo, ciemny tekst, biale karty
- Wizard nie pozwala cofnac sie do kroku 1 po rozpoczeciu audytu
- **Sidebar:** na desktop (md+, >=768px) widoczny normalnie. Na mobile (<md) ukryty — hamburger button (fixed top-left, z-50) otwiera drawer overlay (z-40, backdrop bg-black/30). Ikona: ☰ (zamkniety) / X (otwarty). Auto-close na nawigacji (`usePathname` + `useEffect`). `SidebarWrapper.tsx` = Client Component. **Logo mobile:** kontener `pl-12 md:px-5` (unikanie nakladania na przycisk X), rozmiar logo `h-8 max-w-[180px]`.
- **Lista audytow:** dwa SVG circular progress rings -- CQS (0-100) + AI Citability (0-10). Progi kolorow: CQS (zielony >=80, zolty >=50, czerwony <50), Citability (zielony >=8, zolty >=5, czerwony <5). Formatowanie: CQS `Math.round()`, Citability `toFixed(1)`.
- **Radar chart:** staly porzadek 9 osi, rozbudowany tooltip na etykietach osi (po najechaniu na nazwe wymiaru pojawia sie HTML overlay z pelnym opisem z glossary: term, short, detail, actionable tip). `CustomAxisTick` z `onAxisEnter`/`onAxisLeave` + HTML overlay pozycjonowany absolutnie nad SVG. Fallback: SVG `<title>` dla bazowego tooltipa. `DIM_GLOSSARY_KEYS` mapuje dimId na glossary key. Auto-placement (gora/dol) + clamping do granic kontenera
- **Odśwież audyt:** przycisk "↻ Odśwież audyt" na stronie raportu (`/audyt/[id]`), widoczny tylko dla zakonczonych audytow. Nawiguje do `/nowy-audyt?from=AUDIT_ID`. Wizard pre-wypelnia URL, keyword, tryb i CSI z poprzedniego audytu (`WizardPrefill` -> `useMemo` initialState w `WizardShell`). Tresc i SERP consensus NIE sa przenoszone -- musza byc re-crawlowane/re-walidowane.
- **Strona glowna:** naglowek "Co bedzie sprawdzane?" + siatka 10 wymiarow z popupem wyjasniajacym (DimensionInfoGrid) -- domyslnie 1 rzad (5 kart na desktop), przycisk "Pokaż wszystkie (5 więcej)" rozwija reszte. Karty bez ID-kow (D1-D8 usuniete) -- tylko nazwa wymiaru + InfoHint + krotki opis
- **Step 1 input:** rozwijany `<details>` "Co bedzie sprawdzane?" z siatka 10 wymiarow (domyslnie zwinieta). Status check zamiast preview tresci (zielony check / czerwony alert z liczba slow), klik otwiera popup z pelna trescia. Hint "Kliknij Pobierz" + animacja glow na przycisku gdy URL wklejony ale nie pobrany.
- **Step 1 input (szacowany czas):** info przy trybie Full: "Czas: ok. 2-3 min", Content-only: "Czas: ok. 30-60 sek."
- **Step 2 CSI:** kompaktowy loader (pasek ze spinnerem) podczas inferowania CSI. **Walidacja SERP Consensus** (tryb Full + keyword): po inferowaniu CSI automatyczny fetch `POST /api/serp-consensus` z tytulem + snippetem tresci -- tabela porownawcza 7 wierszy z alignment dots (ikony checkmark/dash/X). Badge zgodnosci. **Blokada przycisku "Potwierdź" przy bledzie SERP** (np. "Brak wyników organicznych") — user musi kliknac "Ponów". Przycisk zmienia tekst na "Błąd SERP - kliknij Ponów".
- **Step 3 audyt:** równoległy postęp (wszystkie wymiary jednocześnie — oznaczone jako `running`), klik na ukonczony etap otwiera popup z cache JSON. **Elapsed timer** obok progress bara (`0:42 / ~2-3 min`). **Auto-collapse wymiarów:** gdy wszystkie wymiary gotowe i raport się generuje — lista wymiarów automatycznie zwija się (nagłówek "Analiza wymiarów (10/10) ✓" z chevronem, klik rozwija). Sekcja "Generowanie raportu" widoczna pod zwiniętą listą.
- **Step 4 wyniki:** wyswietla etapy audytu z mozliwoscia podgladu cache (jak w kroku 3) + wyniki + link do pelnego raportu. Cache popup znika dopiero na stronie `/audyt/[id]`.
- **Ustawienia:** badge "Skonfigurowany" (zielony) / "Brak" (czerwony) przy kazdej sekcji. Sekcja "Cache" z licznikami plikow (crawl/SERP/audyty) + rozmiar MB + przycisk "Wyczysc cache" (server action `clearCache()` -- kasuje caly katalog `cache/`).
- **Responsive padding:** strony `p-4 sm:p-6 md:p-8`, Card `p-4 sm:p-5` (header `px-4 sm:px-5`), TopBar `px-4 pl-14 md:px-6 py-3 md:py-4` (pl-14 = miejsce na hamburger)
- BEFORE/AFTER: diff kolorem -- czerwone tlo dla BEFORE, zielone dla AFTER
- **Projekty (tagi audytow):** kolumna `project` (text, nullable) w tabeli `audits`. Badge projektu na liscie audytow. Przycisk "Projekt" w TopBar raportu → inline input (max 50 zn.). Server Action `updateProjectAction`. Dashboard: `AuditList` Client Component z wyszukiwarka (po tytule/keyword/projekcie) + pill-buttony filtr per projekt.
- **Udostepnianie raportow (public link):** kolumna `share_token` (text, nullable) w tabeli `audits`. Przycisk "Udostepnij" w TopBar → generuje `nanoid(24)` token → kopiuje URL `/share/[token]` do schowka. Publiczna strona `/share/[token]` — Server Component bez logowania, minimalny header z linkiem do logowania. Middleware: `/share` w PUBLIC_PATHS. Tylko completed audyty. Server Actions: `createShareLinkAction` + `removeShareLinkAction` (ownership check). `getAuditIdByShareToken()` → reuse `getAudit()` (bez duplikacji mapperow). Komponent `AuditActions.tsx` (Client) w TopBar obok "Odswiez audyt".
- **SessionStorage persist wizarda:** stan kroków 1-2 zapisywany w `sessionStorage` (klucz `citationone_wizard`). Odswiezenie strony → powrot do tego samego kroku z zachowanymi danymi (URL, keyword, content, CSI, tryb, jezyk, htmlMetrics). Dane czyszczone po starcie audytu (krok 3+). Prefill z "Odswiez audyt" ma priorytet. SSR guard: `typeof window === 'undefined'`.
- **Cooldown "Wyslij ponownie" na /login/verify:** timer 60s od wejscia na strone. Przycisk zablokowany z odliczaniem "Wyslij ponownie (45s)". Reset po kliknieciu.
- Polling co 3s (nie WebSocket) -- prostota implementacji i deploy na Vercel
- Etykiety wymiarow w **jezyku polskim** (UI). Output AI (rekomendacje, BEFORE/AFTER, EAV) w jezyku zrodla (PL lub EN) — patrz sekcja "Wielojezycznosc zrodel"
- **Polskie etykiety UI (presentation-layer):** enumy w typach/promptach/parserach zostaja po angielsku, tlumaczenie tylko w warstwie prezentacji via `Record<string, string>` label maps:
  - **URR (UI label: "Klasyfikacja"):** `URR_LABELS` — UNIQUE → "Wyróżnik", ROOT → "Podstawa", RARE → "Rzadki". Naglowek kolumny w tabelach: "Klasyfikacja" (nie "URR"). Wewnetrzny kod (`urrClass`, `URR_LABELS`, kolumny DB) bez zmian. Pliki: `EAVTable.tsx`, `DimensionDetail.tsx`, `DimensionInfoGrid.tsx`, `KnowledgeGraph.tsx`, `export.ts`, `glossary.ts`
  - **EAV Type:** `EAV_TYPE_LABELS` — simple → "Prosta", complex → "Złożona", derived → "Pochodna", key → "Identyfikator", multi → "Lista" (w `EAVTable.tsx`)
  - **EAV Table headers:** Entity → "Encja", Attribute → "Atrybut", Value → "Wartość", Type → "Typ" (w `EAVTable.tsx`)
  - **EEAT sub-wymiary:** Experience → "Doświadczenie", Expertise → "Ekspertyza", Authoritativeness → "Autorytet", Trustworthiness → "Wiarygodność" (w `EEATCard.tsx`)
  - **Content Format Labels:** `FORMAT_LABELS` — infographics → "Obrazy", tables → "Tabele", lists → "Listy", bibliography → "Bibliografia", videos → "Wideo", faq → "FAQ". Wewnetrzny enum `infographics` zachowany (backward compat). Pliki: `export.ts`, `export-html.ts`, `DimensionDetail.tsx`, `AuditReport.tsx`
  - **Predykat:** `PREDICATE_OPTIONS_PL` / `PREDICATE_OPTIONS_EN` — dropdown i tabela konsensusu w Step2CSI przelaczaja etykiety wg `sourceLanguage` (PL: "Transakcyjny (chce kupić, zamówić)", EN: "Transactional (wants to buy, order)")
- **Graf wiedzy (Knowledge Graph):** wymiar `eav` wyswietlany jako "Graf wiedzy" w calym UI (RadarChart: "Graf", Step3: "Graf wiedzy", DimensionInfoGrid, RecommendationList, parsers, queries). Wewnetrzny `dimensionId = 'eav'` zachowany (backward compat). Wizualizacja: `react-force-graph-2d` (canvas-based, dynamic import `{ ssr: false }`, loading state "Ładowanie grafu..."). Transformacja EAV→graf w `lib/knowledge-graph.ts`: `buildKnowledgeGraph(triples, ce, benchmarkEavMatrix?)` → `KnowledgeGraphData` (nodes + links + stats). Typy: `KGNode` (central/entity/value), `KGEdge` (+ `semantic?: boolean`, `sharedCount?: number`), `KGFilterOptions` (+ `showSemanticEdges: boolean`). **3 kategorie pokrycia:** covered (zielony, nie-UNIQUE), unique (niebieski, UNIQUE+covered), gap (czerwony, !covered). **3 typy krawędzi:** (1) data edges — encja→wartość, pełna linia, kolor wg coverage, strzałka, label = atrybut, (2) structural — CE→entity, szare przerywane, widoczne gdy `showValues: false`, (3) **semantic — encja↔encja, fioletowe (#8B5CF6) zakrzywione (curvature 0.3) przerywane [6,3], bez strzałek, grubość proporcjonalna do `sharedCount`**. Semantyczne krawędzie łączą pary encji dzielące >=2 wspólne atrybuty. Label: nazwy wspólnych atrybutów (do 3) lub `attr1, attr2 (+N)`. **Filtry:** coverage (all/covered/gap/unique), Klasyfikacja (all/Wyróżnik/Podstawa/Rzadki — wewnetrznie URR: UNIQUE/ROOT/RARE), showValues (domyslnie true — pokazuje literaly), **showSemanticEdges** (domyslnie true — checkbox "Powiązania encji"). Filtry zsynchronizowane miedzy grafem a EAVTable. **Stan filtrów podniesiony** do DimensionDetail (unikniecie utraty stanu przy unmount Tabs). **D3 node cloning:** `filterKnowledgeGraph()` klonuje wezly (`{ ...node }`) bo `react-force-graph-2d` mutuje obiekty in-place (dodaje x/y/vx/vy). Semantic edges filtrowane osobno — włączone tylko między widocznymi (connected) encjami. **Min próg:** <3 trojki → fallback message. **Canvas rendering:** `nodeCanvasObject` (okragi/prostokaty z kolorami, `roundRect()` z fallback na `rect()` dla starszych przegladarek), `linkCanvasObject` (linie ciagle/przerywane z labelkami atrybutow). `paintNodeArea` hit area radius = formula z `paintNode` (dynamiczny radius wg `tripleCount`). **D3 force config:** mount-only `useEffect([], [])` — konfiguracja sil (charge, distance) nie resetuje sie przy zmianie filtrów, osobny `useEffect` z `[graphData]` dla `zoomToFit`. **Interakcja:** hover tooltip, click → podswietlenie polaczonych krawedzi, drag/zoom/pan, `zoomToFit(400, 50)` po renderze. **Legenda:** 6 elementów (3 node colors + structural dashed + data solid + **semantic purple dashed**). **Eksport:** sekcja 14 — tekstowa reprezentacja grafu (grupowana po encji, statusy [OK]/[LUKA]/[UNIKALNE], coverage count). Semantic edges nie sa uwzgledniane w eksporcie PDF/markdown.
- **EAV Table:** `formatValue()` parsuje JSON arrays/objects w kolumnie Value (tablice → comma-separated, obiekty → "key: value"). `hasNoValue()` filtruje trojki bez wartosci (`[brak]`, `brak`, `[brak danych]`, puste) -- niekompletne trojki nie sa wyswietlane. **Pokrycie konkurencyjne:** w trybie Full, po ekstrakcji EAV ze zrodla, `enrichEavWithBenchmark()` (wyekstrahowana funkcja w orchestratorze) wzbogaca trojki o luki z `benchmark.eavMatrix` (atrybuty konkurentow z `inArticle === false`). `BenchmarkEAV` przechowuje pelne trojki (entity + attribute + value + eavType) z pierwszego konkurenta — gap triples uzywaja prawdziwych entity/value zamiast CE + placeholder. **Entity case normalization:** `entityCaseMap` (lowercase→oryginal) z source triples + CE — gap entity dopasowywany do casing ze zrodla (np. `Kredyt pomostowy` z benchmarku → `kredyt pomostowy` jak w artykule). **Gap value filter:** luki z pustym value lub `[brak]` sa pomijane (competitors tez nie maja danych — slaby sygnal). Fuzzy dedup (exact + substring + token overlap) zapobiega duplikatom. **Score adjustment:** po wzbogaceniu, score EAV korygowany algorytmicznie: `40% AI score (jakosc artykulu) + 60% coverage ratio (pokrycie konkurencyjne)`. Wywoływane inline w promise wymiaru `eav` (równoległa analiza). UI: sortowanie (pokryte → luki), czerwone tlo dla luk, statystyka pokrycia atrybutow z liczba luk

### Autentykacja i autoryzacja
- **Email + OTP login:** uzytkownik podaje email -> 8-cyfrowy kod (crypto-secure `randomInt`, 90M kombinacji) -> sesja JWT (7 dni)
- **Email service:** Resend (`resend` package) — wymaga `RESEND_API_KEY` + zweryfikowanej domeny `citationone.com` (DKIM + SPF + DMARC). Nadawca: `noreply@citationone.com` (konfigurowalny via env `EMAIL_FROM`)
- **Sesja:** JWT w HTTP-only cookie (`session`), podpisywany HS256 z `AUTH_SECRET` (env var, 32+ bajtow). Biblioteka: `jose` (Edge Runtime compatible). **`getSession()` odswieża rolę z DB** (`getUserById()`) przy kazdym wywolaniu — zapobiega stale claims po zmianie roli admina. Jesli user usuniety z DB -> sesja uniewazniona (return null).
- **Middleware:** `src/middleware.ts` — Edge Runtime, weryfikacja JWT, redirect na `/login`, ochrona `/admin` (admin-only). PUBLIC_PATHS: `/login`, `/login/verify`, `/polityka-prywatnosci`
- **Role:** `admin` (1 osoba, `ADMIN_EMAIL` env var, bez limitu kredytow) + `user` (domyslnie 5 kredytow audytu)
- **Auto-tworzenie konta:** przy pierwszym logowaniu email -> auto-create user (5 kredytow, lub admin jesli email === ADMIN_EMAIL). **Auto-promocja:** jesli istniejacy user loguje sie z emailem === ADMIN_EMAIL ale ma role `user` (np. konto stworzone przed ustawieniem env var), automatycznie promowany do admina z 999999 kredytow
- **Limity audytow:** user traci 1 kredyt per audyt (atomowy `UPDATE ... WHERE audit_credits > 0`), admin bez limitu. Przy 0 kredytow -> 403. **Zabezpieczenie 3-warstwowe:** (1) server-side: `/api/audit` route zwraca 403 z komunikatem PL, (2) UI: Step2CSI przycisk "Potwierdź i rozpocznij audyt" wyszarzony + komunikat "Brak kredytów" pod przyciskiem gdy `hasCredits=false` (prop z `page.tsx` -> `WizardContent` -> `Step2CSI`), (3) Step3Audit parsuje JSON error z 403 i wyswietla komunikat serwera zamiast generycznego "Błąd 403"
- **Shared Gemini key (domyślny model):** `resolveGeminiKey(userId)` — user key → global (settings DB) → env. Wszyscy użytkownicy korzystają ze współdzielonego klucza admina. Per-user key nadal działa technicznie (kolumna `gemini_api_key` w tabeli `users`), ale UI do wpisywania klucza jest ukryte (zakomentowane w `SettingsForm.tsx`). Klucz przekazywany jako parametr `apiKey` do `callClaude()`/`callClaudeJSON()` — brak globalnego singletona (eliminacja race condition w concurrent batches)
- **Ownership:** kazdy audyt ma `userId` (nullable — NULL = stary audyt admina). Scoped queries: user widzi tylko swoje, admin widzi swoje + NULL. API routes + Server Actions sprawdzaja ownership
- **Admin panel:** `/admin` — tabela uzytkownikow (kolumny: email, rola, kredyty, data + akcje: rozwin audyty, generuj kod OTP, +5 kredytow, usun usera). Usuwanie usera = kaskadowe DELETE audytow. Dodawanie pre-registered usera (email + kredyty) → auto-generacja kodu OTP. Rozwijalna lista audytów per user (on-demand loading, cache w state). `/admin/feedback` — osobna strona z lista feedbacku, filtr po typie (bug/sugestia/pytanie), usuwanie feedbacku
- **Usuwanie konta (user self-delete):** Server Action `deleteAccountAction()` w `ustawienia/actions.ts`. Dostepne dla userow (nie admin). Kaskadowe usuwanie (audyty, dimensions, recommendations, EAV, feedback). 2-krokowe potwierdzenie w UI (Ustawienia). Niszczy sesje + redirect do `/login`. Auth log: `user_self_delete`.
- **Ustawienia split:** admin widzi pelne ustawienia (Gemini, Bright Data, parametry, cache), user widzi info o wbudowanych narzędziach (per-user Gemini key UI ukryte w komentarzu — można przywrócić). Sekcja "Twoja firma" widoczna dla obu — white-label PDF (nazwa firmy + URL logo)
- **Feedback system:** `FeedbackWidget.tsx` (floating button, fixed bottom-right) — popup z typem (bug/sugestia/pytanie) + textarea, auto-capture pathname. Zamontowany w `SidebarWrapper`. Admin: `/admin/feedback` z filtrem po typie
- **White-label PDF:** kolumny `companyName`/`companyLogoUrl` w tabeli `users` (nullable). `buildExportHTML(audit, company?)` — logo w nagłówku (max-height 40px) + nazwa firmy zamiast "CitationOne" w linii "Audytor:". CORS: `html2pdf.js` z `useCORS: true`
- **Płatności (Lemon Squeezy):** Lemon Squeezy jako Merchant of Record — obsługuje płatności, faktury, VAT. Integracja: `POST /api/checkout` (tworzy sesję LS z quantity + pre-filled email + custom user_id, rate limit 2/min) → redirect do LS checkout → `POST /api/webhook/lemonsqueezy` (HMAC-SHA256 signature verification, idempotentność UNIQUE lsOrderId, user lookup po custom_data.user_id z fallback na email, obsługa order_created + order_refunded). Tabela `payments` (id, userId, email, lsOrderId UNIQUE, variantId, creditsAdded, amountCents, currency, status). `BuyCreditsButton.tsx` — quantity picker (+/- stepper, domyslnie 5, max 100, dynamiczna cena "Kup X za Y PLN"). Widoczny w Sidebar (przy 0 kredytów) i Step2CSI (przy komunikacie "Brak kredytów"). Admin: sekcja "Płatności" w panelu (data, email, kredyty, kwota, status, order ID). Env vars: `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_WEBHOOK_SECRET`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_VARIANT_ID`, `LEMONSQUEEZY_CREDITS_PER_PURCHASE`. Middleware: `/api/webhook` w public paths (exempt od auth, weryfikowany podpisem).
- **DB tabele:** `users` (id, email, role, audit_credits, gemini_api_key, company_name, company_logo_url, created_at), `verification_codes` (id, email, code, expires_at, used, created_at), `feedback` (id, user_id→cascade, type, message, page, created_at), `payments` (id, user_id, email, ls_order_id UNIQUE, ls_customer_id, variant_id, credits_added, amount_cents, currency, status, created_at)
- **OTP bezpieczenstwo:** `crypto.randomInt()` (nie Math.random), kod nie w temacie emaila, stare kody invalidowane przed wyslaniem nowego, atomowe `UPDATE...RETURNING` przy weryfikacji (brak TOCTOU)
- **Zgoda RODO:** checkbox na stronie logowania — "Akceptuję Politykę Prywatności i wyrażam zgodę na przetwarzanie adresu email". Przycisk "Wyślij kod" zablokowany dopóki niezaznaczony. Link otwiera `/polityka-prywatnosci` w nowej karcie
- **Polityka Prywatności:** `/polityka-prywatnosci` — publiczna strona (Server Component), 10 sekcji (administrator, dane, cele, RODO, cookies+GTM+GA4, usługi zewnętrzne, przechowywanie, prawa, bezpieczeństwo, kontakt). Administrator: Seowp Wojciech Władziński, Gdańsk
- **Pliki auth:** `src/lib/auth.ts` (JWT session), `src/lib/email.ts` (Resend), `src/middleware.ts`, `src/app/login/` (page + verify + actions), `src/app/admin/` (page + AdminPanel + actions), `src/app/api/auth/logout/route.ts`, `src/app/polityka-prywatnosci/page.tsx`

### Bezpieczenstwo
- API klucze w `.env.local` lub w DB (strona `/ustawienia`) -- NIGDY w kodzie
- **Input validation:**
  - **URL:** max 500 znakow, musi zaczynac sie od `http://` lub `https://`. Walidacja front-end (real-time w Step1Input) + backend (`validateUrl()` w `lib/utils.ts`). SSRF protection (blokada localhost, private IP ranges, non-HTTP schemes)
  - **Content:** max 200 000 znakow (~30k slow) — Gemini 1M kontekstu, tresc zrodlowa idzie do promptow bez truncacji
- **Autentykacja:** email + OTP login z JWT sesja (patrz sekcja powyzej)
- **Ownership checks:** wszystkie API routes (`/api/audit/[id]`, cancel, cache) + Server Actions (deleteAudit, settings) + strony (`/audyt/[id]`, `/nowy-audyt?from=`) sprawdzaja ownership audytu
- **Atomic DB operations:** `decrementAuditCredits` i `verifyAndMarkCode` uzywaja single `UPDATE...RETURNING` (brak race conditions)
- **Admin guard:** middleware blokuje `/admin` dla non-admin, Server Actions sprawdzaja role
- **Sensitive data:** klucze API maskowane w UI (`****ostatnie4` w `/ustawienia`), `geminiApiKey` z tabeli `users` nie przekazywany do klienta (kolumna usunięta z admin panelu — wszyscy używają shared key)
- **`getCurrentUser()` POZA try-catch:** `getCurrentUser()` wywoluje `redirect('/login')` ktory rzuca specjalny Next.js error. Jesli wewnatrz try-catch, redirect zostanie przechwycony i Server Action zwroci blad zamiast przekierowania. Wzorzec: `const session = await getCurrentUser();` PRZED blokiem try w Server Actions.
- **Per-call API key (brak globalnego singletona):** `callClaude()`/`callClaudeJSON()` przyjmuja opcjonalny `apiKey` param. Eliminuje race conditions w concurrent batches. `callClaudeJSONWithMeta()` zwraca `{ data, meta }` razem -- bezpieczne w `Promise.all` (uzywane w: 10 równoległych wymiarów, EAV extraction batch, competitor scoring batch).
- **Error boundaries:** `error.tsx` (route-level, Client Component), `global-error.tsx` (root layout fallback z inline styles), `not-found.tsx` (custom 404)
- **Walidacja wag scoringu:** `validateWeights()` w `scoring.ts` — loguje warning gdy suma wag ≠ 1.0 lub wartość poza [0,1]. Chroni przed literówkami w profilach typów treści
- **SSRF ochrona URL:** `validateUrl()` w `lib/utils.ts` + `isSafeLogoUrl()` w `export-html.ts` — blocklist prywatnych IPv4 (localhost, 10.x, 192.168.x, 172.16-31.x, 169.254.x) + **IPv6** (::1, ::ffff:127.x, fe80:, fc00:, fd00:) + .local/.internal
- **Competitor scoring temperature 0:** `callClaudeJSONWithMeta(prompt, 8192, apiKey, 0)` — eliminuje losowość Gemini w scoringu konkurentów. Opcjonalny parametr `temperature` w `callClaudeJSONWithMeta()` (domyślnie 0.3)
- **Content-Security-Policy (CSP):** header w `next.config.ts` — `default-src 'self'`, script-src z GTM/GA4 whitelist, `worker-src 'self' blob:`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`
- **Rate limiting API:** `checkRateLimit()` w `lib/rate-limit.ts` (in-memory sliding window) na 4 kosztownych route'ach: `/api/extract` (10/min), `/api/serp` (20/min), `/api/csi` (15/min), `/api/serp-consensus` (10/min). Cleanup stale entries co 5 min.
- **JWT algorithm allowlist:** `jwtVerify(token, secret, { algorithms: ['HS256'] })` w middleware.ts + auth.ts — zapobiega alg:none attack
- **AUTH_SECRET validation:** min 32 znaków (walidacja w getSecret())
- **OTP 8 cyfr:** `randomInt(10000000, 100000000)` — 90M kombinacji (vs 900K przy 6 cyfrach)
- **Cookie SameSite strict:** `sameSite: 'strict'` w auth.ts (bylo 'lax')
- **CSI validation order:** stripHtml() wykonywany PRZED walidacja dlugosci i empty check — zapobiega bypass przez 500 zn. HTML tagow
- **Email HTML escaping:** pelny OWASP escape (`& < > " '`) na wszystkich polach w emailu feedbacku
- **Unified error messages:** deleteAuditAction zwraca ten sam komunikat niezaleznie czy audyt nie istnieje czy brak uprawnien (anti-enumeration)
- **Admin error sanitization:** 7 catch blokow w admin/actions.ts loguja do console.error ale zwracaja generyczne komunikaty uzytkownikowi
- **Ownership check (NULL userId):** legacy audyty (userId=NULL) widoczne TYLKO dla admina — `isOwner || isLegacyAdmin || isAdmin` pattern w 9 lokalizacjach
- **Atomic deleteUser:** jedna transakcja DB (usuwanie audytow + feedback + user)
- **Keyword validation:** max 200 znaków w `/api/serp` i `/api/serp-consensus`
- **Accessibility:** skip-to-content link (`<a href="#main-content">`), globalne `:focus-visible` ring (accent outline), AlignmentDot z ikonami (checkmark/dash/X) zamiast samych kolorowych kropek (daltonizm)

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
- Request: Google URL z `brd_json=1` + `hl` (jezyk) + `gl` (kraj, mapowany z jezyka: en→us, pl→pl, de→de via `LANG_TO_COUNTRY`) -> Bright Data parsuje HTML na JSON
- Cache key: `keyword` dla PL, `keyword__lang` dla innych jezykow (brak kolizji PL/EN)
- Mapowanie pol: `rank`/`global_rank` -> position, `link` -> url, `display_link` -> domain, `title`, `description`
- PAA: `people_also_ask[].question` -> `paa: string[]`
- Related: `related[]` w dwoch formatach (carousel items z `items[].text` + proste z `text`) -> `flatMap` wyciaga oba
- AI Overview: `ai_overview` -> `AiOverviewData` via `extractAiOverview()` + `flattenAiOverviewTexts()` (rekursywna ekstrakcja z `texts[].snippet`/`title`/`list[]`, strip HTML artifacts). Zwraca `undefined` gdy brak lub tresc <20 zn.
- Timeout: 30s (`AbortSignal.timeout`)
- **Auto-retry:** 2 ponowienia z 3s delay (max 3 proby). Retry na 5xx i timeout, bez retry na 4xx. `parseBrightDataResponse()` wyekstrahowana do osobnej funkcji.
- **`cache: 'no-store'`:** wszystkie `fetch()` do Bright Data (SERP + Web Unlocker) i Lemon Squeezy API maja `cache: 'no-store'` — zapobiega cache'owaniu response przez Next.js na Vercel (domyslnie Next.js cache'uje fetch w serverless).

**Web Unlocker** (`crawler.ts`):
- Zwraca raw HTML -> `node-html-markdown` (konwersja HTML->Markdown) -> `cleanContent()` (14-krokowy pipeline)
- Metadata: `extractTitle(html)` (regex `<title>`), `extractDescription(html)` (4 regex patterns: meta desc + og:desc, oba porzadki atrybutow)
- Retry: 3 proby, exponential backoff z jitter, brak retry na 4xx. Logowanie kazdej nieudanej proby.
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
