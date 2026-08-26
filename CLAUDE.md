# CLAUDE.md - CitationOne LP

## Opis projektu

Landing page dla narzędzia **CitationOne** (`citationone.com`) - webapp do audytu contentu pod kątem AI Search (ChatGPT, Perplexity, Google AI Overview, Bing Copilot).

**Cel LP:** konwersja na logowanie/rejestrację (`/login`) lub zakup pakietu audytów.

**Języki:** EN (domyślny, root `/`) + PL (`/pl`). Osobne komponenty per język w `src/components/` (PL) i `src/components/en/` (EN).

**Powiązane repo:** aplikacja główna w `../ai-auditor/`. Jej specyfikacja to **`../ai-auditor/spec/`** (indeks: `../ai-auditor/CLAUDE.md`) — czytaj stamtąd. To repo **nie trzyma własnej kopii** specyfikacji: kopia w `spec/` istniała do 2026-08-07, ale zdążyła się rozjechać z oryginałem o ~3 miesiące i wprowadzała w błąd, więc została usunięta (przywrócenie: `git checkout 616abc1 -- spec/`).

---

## Stack technologiczny

- **Framework:** Next.js 15 (App Router, static export `output: 'export'`)
- **Runtime:** React 19, TypeScript strict
- **Styling:** Tailwind CSS 4 - CSS-first config przez `@theme inline` w `src/app/globals.css`. **Brak pliku `tailwind.config.js`.**
- **Animacje:** Framer Motion (`motion`, `AnimatePresence`)
- **Font:** Inter (Google Fonts, `variable: --font-inter`, subsets: latin + latin-ext)
- **Icons:** inline SVG (nie ma biblioteki ikon - wszystkie ikony to JSX SVG)
- **Dev server:** `npm run dev` → domyślnie port 3000 (fallback na 3001 jeśli zajęty)

---

## Komendy

```bash
npm run dev        # Dev server
npm run build      # Static export → katalog out/ (output: 'export')
npm run start      # Serwuj build
```

**Brak testów i lintu** — `package.json` definiuje wyłącznie te trzy skrypty. Nie ma tu Vitest ani ESLint;
weryfikacja zmiany = `npm run build` (static export wyłapie błędy typów i nieobsłużone dynamiczne API).

---

## Struktura projektu

```
ai-auditor-lp/
├── CLAUDE.md
├── package.json
├── tsconfig.json
├── next.config.ts               # output: 'export' (static)
├── public/
│   └── _redirects               # 301 redirecty (Vercel/Netlify)
│                                # (brak spec/ — specyfikacja aplikacji glownej: ../ai-auditor/spec/)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (lang="en"), metadata EN, hreflang
│   │   ├── page.tsx             # EN homepage (root /)
│   │   ├── error.tsx            # Route-level error boundary (Client Component)
│   │   ├── global-error.tsx     # Root layout fallback — wlasne <html>/<body> + inline styles (brak Tailwinda)
│   │   ├── globals.css          # Tailwind + tokeny kolorów + animacje
│   │   ├── how-it-works/        # EN "How it works" (/how-it-works)
│   │   │   ├── page.tsx
│   │   │   └── PageContentEN.tsx
│   │   ├── pricing/             # EN "Pricing" (/pricing)
│   │   │   ├── page.tsx
│   │   │   └── PricingContentEN.tsx
│   │   ├── dimensions/          # EN "Dimensions" (/dimensions)
│   │   │   ├── page.tsx
│   │   │   ├── DimensionsContent.tsx
│   │   │   └── [slug]/page.tsx  # 12 podstron EN (/dimensions/bluf itd.) — patrz nota niżej
│   │   ├── sitemap.ts           # out/sitemap.xml (42 URL-e + hreflangi); wymaga dynamic='force-static'
│   │   ├── robots.ts            # out/robots.txt — wskazuje sitemapę
│   │   ├── tools/[slug]/        # 4 podstrony narzędzi EN — hub /tools usunięty 2026-08-24
│   │   ├── (en)/api/            # EN "API" (/api) — grupa routingu, NIE `src/app/api/`
│   │   │   ├── page.tsx         #   (patrz nota "Zakladka API" nizej)
│   │   │   └── ApiContentEN.tsx
│   │   └── pl/                  # Wersja PL
│   │       ├── layout.tsx       # PL layout (lang="pl", metadata PL, hreflang)
│   │       ├── page.tsx         # PL homepage (/pl)
│   │       ├── jak-to-dziala/   # PL "Jak to działa?" (/pl/jak-to-dziala)
│   │       │   ├── page.tsx
│   │       │   └── PageContent.tsx
│   │       ├── cennik/          # PL "Cennik" (/pl/cennik)
│   │       │   ├── page.tsx
│   │       │   └── PricingContent.tsx
│   │       ├── wymiary/         # PL "Wymiary" (/pl/wymiary)
│   │       │   ├── page.tsx
│   │       │   ├── WymiaryContent.tsx
│   │       │   └── [slug]/page.tsx  # 12 podstron PL (/pl/wymiary/bluf itd.)
│   │       ├── narzedzia/[slug]/ # 4 podstrony narzędzi PL — hub /pl/narzedzia usunięty 2026-08-24
│   │       └── api/             # PL "API" (/pl/api)
│   │           ├── page.tsx
│   │           └── ApiContent.tsx
│   ├── data/                    # Treść podstron (czyste dane, zero JSX)
│   │   ├── dimension-types.ts   # Typy + STRINGS_PL/STRINGS_EN + DIMENSION_SLUG_PAIRS (hreflang)
│   │   ├── dimensions-pl.ts     # 12 wymiarów PL
│   │   ├── dimensions-en.ts     # 12 wymiarów EN (lustro)
│   │   ├── tool-types.ts        # Typy narzędzi + TOOL_STRINGS_* + TOOL_SLUG_PAIRS
│   │   ├── tools-pl.ts          # 4 narzędzia PL
│   │   └── tools-en.ts          # 4 narzędzia EN (lustro)
│   └── components/
│       ├── DimensionPage.tsx    # Shared - szablon podstrony wymiaru (PL i EN przez prop `t`)
│       ├── ToolPage.tsx         # Shared - szablon podstrony narzędzia
│       ├── Navbar.tsx           # PL Navbar - switcher EN → /
│       ├── Hero.tsx
│       ├── TechLogos.tsx
│       ├── Showcase.tsx         # Mockup panelu (sam mockup, bez copy) - na HP
│       ├── Problem.tsx
│       ├── Solution.tsx         # NIEUŻYWANA na HP
│       ├── HowItWorks.tsx
│       ├── Features.tsx         # 5 sekcji PL - NIEUŻYWANA na HP
│       ├── BrandMorph.tsx      # Shared - animowane logo CitationNone?→CitationOne (typing effect)
│       ├── ForWho.tsx
│       ├── AuthorSection.tsx    # Karta autora (foto + bio + LinkedIn) - na HP, po FAQ
│       ├── ClosingCta.tsx
│       ├── RadarIllustration.tsx # PL etykiety
│       ├── Footer.tsx           # PL Footer - linki /pl/*
│       ├── CtaSection.tsx
│       ├── SocialProof.tsx      # UKRYTA
│       ├── Pricing.tsx          # UKRYTA
│       ├── ReportExample.tsx    # UKRYTA
│       ├── FAQ.tsx              # na HP (PL); EN: en/FAQEN.tsx
│       ├── DimensionsTeaser.tsx # na HP; EN: en/DimensionsTeaserEN.tsx
│       ├── ReportSection.tsx    # na HP; EN: en/ReportSectionEN.tsx
│       └── en/                  # EN komponenty
│           ├── NavbarEN.tsx     # EN Navbar - switcher PL → /pl
│           ├── HeroEN.tsx
│           ├── TechLogosEN.tsx
│           ├── ShowcaseEN.tsx    # Mockup panelu (sam mockup, bez copy) - na HP
│           ├── ProblemEN.tsx
│           ├── SolutionEN.tsx    # NIEUŻYWANA na HP
│           ├── HowItWorksEN.tsx
│           ├── FeaturesEN.tsx    # NIEUŻYWANA na HP
│           ├── ForWhoEN.tsx
│           ├── AuthorSectionEN.tsx # Karta autora (foto + bio + LinkedIn) - na HP, po FAQ
│           ├── ClosingCtaEN.tsx
│           ├── RadarIllustrationEN.tsx
│           └── FooterEN.tsx     # Mirror PL: logo + /how-it-works + /#who-is-it-for + CTA
```

---

## Strony i routing

### EN (domyślny, root)

| URL | Komponent | Title |
|-----|-----------|-------|
| `/` | EN HP (komponenty EN) | GEO & AI Search Content Audit Tool - CitationOne |
| `/how-it-works` | PageContentEN | How does CitationOne work? |
| `/pricing` | PricingContentEN | Pricing |
| `/dimensions` | DimensionsContent | 10 content quality dimensions + E-E-A-T |
| `/dimensions/[slug]` | DimensionPage + dimensions-en.ts | H1 = title, np. `What is BLUF in SEO and GEO?` |
| `/tools/[slug]` | ToolPage + tools-en.ts | H1 = title, fraza sprzedażowa `… tool for SEO`, np. `Keyword clustering tool for SEO` |
| `/api` | ApiContentEN | CitationOne API - audyty AI Search przez REST |

### PL (katalog /pl)

| URL | Komponent | Title |
|-----|-----------|-------|
| `/pl` | PL HP (komponenty PL) | Narzędzie GEO - audyt treści pod AI Search - CitationOne (jedyna strona z marką w title) |
| `/pl/jak-to-dziala` | PageContent PL | Jak działa CitationOne? |
| `/pl/cennik` | PricingContent PL | Cennik |
| `/pl/wymiary` | WymiaryContent PL | 10 wymiarów jakości treści + E-E-A-T |
| `/pl/wymiary/[slug]` | DimensionPage + dimensions-pl.ts | H1 = title, np. `Czym jest BLUF w SEO i GEO?` |
| `/pl/narzedzia/[slug]` | ToolPage + tools-pl.ts | H1 = title, fraza sprzedażowa `Narzędzie do … dla SEO`, np. `Narzędzie do klasteryzacji słów kluczowych dla SEO` |
| `/pl/api` | ApiContent PL | API CitationOne - audyty AI Search przez REST |

### Zakładka API (`/api` i `/pl/api`)

Podstrona dla programistów: opis publicznego API v1 aplikacji + dwa wyjścia dokumentacji —
`https://app.citationone.com/api-docs` (HTML) i `https://app.citationone.com/api-docs.md`
(`text/markdown` dla agentów AI). Oba adresy są **publiczne** (`PUBLIC_PATHS` w middleware głównej
apki) i powstają z jednego źródła `lib/api/docs-content.ts` — kontrakt opisany w
`../ai-auditor/spec/public-api.md`. Linki: Navbar (desktop + mobile) i Footer, w obu językach.

⚠️ **Gotcha — EN wersja NIE może leżeć w `src/app/api/`.** Next traktuje ten katalog jak API routes
i przy `output: 'export'` build wywala się na `PageNotFoundError: Cannot find module for page:
/_document` (etap „Collecting page data"). Strona leży więc w grupie routingu
[src/app/(en)/api/](<src/app/(en)/api/page.tsx>) — URL pozostaje `/api`. PL (`/pl/api`) problemu nie ma.

**Dokumentacja jest po angielsku** (od `v1.2`, 2026-08-14 — wcześniej PL). Strona PL ma o tym jedno
zdanie w sekcji o wersji Markdown; strona EN nie potrzebuje żadnej adnotacji.

Siatka cech na LP odwzorowuje kontrakt z `../ai-auditor/src/lib/api/version.ts` — przy bumpie
`API_VERSION` **sprawdź, czy nie doszła funkcja warta karty** (v1.2 dołożyła webhooki i audyt treści
podanej wprost). Numeru wersji celowo NIE ma w copy: LP jest statyczne i zwietrzałoby przy pierwszym
bumpie; w pasku bloku kodu jest `api/v1`, czyli prefiks ścieżki, który zmienia się tylko przy zmianie łamiącej.

### 301 Redirecty (`public/_redirects`)

| Stary URL | Nowy URL | Powód |
|-----------|----------|-------|
| `/en` | `/` | EN przeniesione na root |
| `/en/how-it-works` | `/how-it-works` | EN przeniesione na root |
| `/jak-to-dziala` | `/pl/jak-to-dziala` | PL przeniesione do /pl |
| `/admin` | `app.citationone.com/admin` | Statyczny eksport nie ma własnego logowania |

### SEO metadata

- **Root layout** (`layout.tsx`): `<html lang="en">`, `title.template: '%s - CitationOne'`
- **PL layout** (`pl/layout.tsx`): `<div lang="pl">`, własne `title.template`, OG `locale: pl_PL`
- **hreflang** w obu layoutach: `en` → `citationone.com`, `pl` → `citationone.com/pl`

### Kolejność sekcji HP (identyczna EN i PL)

```
Navbar → Hero → Showcase → Problem → HowItWorks → TechLogos → DimensionsTeaser → ReportSection → ForWho → FAQ → AuthorSection → ClosingCta → Footer
```

Pliki: PL [page.tsx](src/app/pl/page.tsx), EN [page.tsx](src/app/page.tsx) (komponenty EN w `src/components/en/*EN.tsx`).

**Showcase** ([Showcase.tsx](src/components/Showcase.tsx) / [en/ShowcaseEN.tsx](src/components/en/ShowcaseEN.tsx)) - sam mockup panelu w ramce urządzenia (cienki bezel, metaliczna krawędź, połysk), zanikający ku dołowi przez `maskImage` linear-gradient. Bez copy/CTA. Hover = lekki zoom (`scale: 1.025`). Umieszczony zaraz po Hero - górny kawałek mockupu widoczny above the fold (Showcase `padding: 76px 0 96px`, Hero zredukowany: bez `minHeight`/flex-center, `padding: 40px 24px 28px`). Mockup `animate` z `delay: 1` - wjeżdża od dołu po 1 s. Screeny: `public/dashboard-preview.png` (EN), `public/dashboard-preview-pl.png` (PL) - oba z usuniętym bannerem TESTING PHASE / FAZA TESTÓW.

**ReportSection** ([ReportSection.tsx](src/components/ReportSection.tsx) / [en/ReportSectionEN.tsx](src/components/en/ReportSectionEN.tsx)) - "Dane gotowe do wdrożenia". Układ 2-kolumnowy (stack <900px): lewa = label + h2 + opis + 3 punkty (Raport PDF / Audyt Schema / Historia rewizji) + CTA "Zobacz przykładowy raport"/"View sample report" (otwiera udostępniony raport online w nowej karcie, `target="_blank"`); prawa = podgląd raportu w papierowej ramce (cień, połysk, zanikanie ku dołowi przez `maskImage`, perspektywa, hover-zoom), też klikalny → raport. Linki **ustawia admin w aplikacji**, nie kod: `useReportUrl` ([src/lib/useReportUrl.ts](src/lib/useReportUrl.ts)) dociąga je w runtime z `app.citationone.com/api/public/lp-links` (w aplikacji: `/ustawienia` → karta „Strona citationone.com”, klucze `LP_REPORT_URL_PL` / `LP_REPORT_URL_EN`). Stałe `REPORT_URL_FALLBACK` w obu komponentach to wartość domyślna wypalona w HTML — zostaje, gdy aplikacja nie odpowie, pole jest puste albo odpowiedź nie wygląda jak link `…/share/…`. **LP jest statyczne, więc panelu logowania tu nie postawimy** — `citationone.com/admin` to 301 do panelu aplikacji (`public/_redirects`). Podgląd: `public/report-preview.png` (screenshot udostępnionego raportu web - score'y, profil 10 wymiarów, Quick Wins).

**AuthorSection** ([AuthorSection.tsx](src/components/AuthorSection.tsx) / [en/AuthorSectionEN.tsx](src/components/en/AuthorSectionEN.tsx)) - karta autora: zdjęcie z lewej (kolumna 208px, na mobile pełna szerokość na górze) + treść z prawej (label "O autorze"/"About the author", nazwisko **Wojciech Władziński-Ulatowski**, rola "Twórca CitationOne"/"Creator of CitationOne", bio, przycisk LinkedIn w accentcie). Zdjęcie: `public/author.jpg` (B&W, wyszywane logo usunięte z koszuli).

> Uwaga: na HP nie ma sekcji `Solution` ani `Features` (komponenty istnieją w repo, ale są nieużywane na HP).

### Kolejność sekcji /how-it-works i /pl/jak-to-dziala

```
Navbar → 3 kroki → CQS/Citability → 10 wymiarów → Benchmark → Before/After → AI Overview → Graf wiedzy → Eksport → Quick Wins → Schema.org Audit → Information Gain → CTA → Footer
```

Schema.org Audit i Information Gain tylko na podstronach (nie na HP).

---

## Sekcje ukryte (ławka rezerwowa, tylko PL)

| Komponent | Zawartość | Gdzie wstawić |
|-----------|-----------|---------------|
| `SocialProof` | Stats bar + testimoniale | Po Features, przed ForWho |
| `ReportExample` | Przykład raportu | Po Features, przed ForWho |
| `Pricing` | 3 pakiety cenowe | Po ForWho, przed ClosingCta |
| `FAQ` | Akordeon 5 pytań | Po Pricing, przed ClosingCta |

---

## Wymiary

### PL (komponenty w `src/components/`)

| ID | Label PL | Radar PL |
|----|----------|----------|
| CSI-A | Zgodność z intencją | Intencja |
| D1 | Gęstość informacji | Gęstość |
| D2 | Graf wiedzy | Graf |
| D3 | BLUF | BLUF |
| D4 | Autonomiczność sekcji | Chunki |
| D5 | Koszt ekstrakcji | Ekstrakcja |
| D6 | TF-IDF | TF-IDF |
| D7 | Role semantyczne | Role |
| D8 | Pokrycie AI Overview | AIO |
| D9 | Wysiłek redakcyjny | Wysiłek |
| EEAT | E-E-A-T | - |

### EN (komponenty w `src/components/en/`)

| ID | Label EN | Radar EN |
|----|----------|----------|
| CSI-A | Intent Alignment | Intent |
| D1 | Info Density | Density |
| D2 | Knowledge Graph | KGraph |
| D3 | BLUF | BLUF |
| D4 | Chunks | Chunks |
| D5 | Cost of Retrieval | CoR |
| D6 | TF-IDF | TF-IDF |
| D7 | Semantic Roles | Roles |
| D8 | AIO Coverage | AIO |
| D9 | Editorial Effort | Effort |
| EEAT | E-E-A-T | - |

### Wymiary na stronach `/dimensions` i `/pl/wymiary`

Lista 10 wymiarów (numerowana 01–10) — **nazwy i kolejność = `dim.*` + `DIMENSION_ORDER`
(RadarChart) w aplikacji**, żeby klient widział po zakupie te same etykiety co na LP.
Każdy kafel linkuje do własnej podstrony.

| # | EN (/dimensions) | PL (/pl/wymiary) | slug EN | slug PL |
|---|------------------|------------------|---------|---------|
| 01 | CSI Alignment | Zgodność z CSI | `csi-alignment` | `zgodnosc-z-csi` |
| 02 | Information Density | Gęstość informacji | `information-density` | `gestosc-informacji` |
| 03 | Knowledge Graph (EAV) | Graf wiedzy (EAV) | `knowledge-graph-eav` | `graf-wiedzy` |
| 04 | BLUF | BLUF | `bluf` | `bluf` |
| 05 | Chunk Optimization | Optymalizacja chunków | `chunk-optimization` | `optymalizacja-chunkow` |
| 06 | Cost of Retrieval | Koszt pozyskania | `cost-of-retrieval` | `koszt-pozyskania` |
| 07 | TF-IDF | TF-IDF | `tf-idf` | `tf-idf` |
| 08 | Semantic Roles | Role semantyczne | `semantic-roles` | `role-semantyczne` |
| 09 | Fan-Out & AIO Coverage | Pokrycie Fan-Out i AIO | `query-fan-out` | `pokrycie-fan-out` |
| 10 | Effort Score | Effort Score | `effort-score` | `effort-score` |

**Poza dziesiątką** (osobny blok pod gridem, bo w kodzie aplikacji nie są wymiarami z radaru):
E-E-A-T (`e-e-a-t`) oraz Wartość dodana / Information Gain (`information-gain` / `wartosc-dodana`).

> **Trzy pułapki, przez które ta lista rozjechała się z aplikacją do 2026-08 i nie mogą wrócić:**
> (1) „Information Gain" figurował jako wymiar 07 — w kodzie NIE jest w `DimensionId` ani w wagach
> CQS, to osobny moduł zasilający ranking terminów TF-IDF. (2) `cor` był opisany jako „koszt
> ekstrakcji / zwięzłość" — mierzy STRUKTURĘ (hierarchia, tabele, listy, boldy), nie długość zdań.
> (3) Brakowało `effort` — jedynego wymiaru liczonego w 100% algorytmicznie, bez modelu.

### Podstrony wymiarów (`/dimensions/[slug]`, `/pl/wymiary/[slug]`)

24 statyczne podstrony (12 per język) opisujące każdy wymiar: czym jest, dlaczego obchodzi modele
AI, jak jest liczony, co podnosi i obniża wynik, co widać w raporcie, FAQ.

- **Treść to czyste dane** — `src/data/dimensions-pl.ts` i `dimensions-en.ts`. Jeden szablon
  (`components/DimensionPage.tsx`) renderuje obie wersje; etykiety interfejsu przychodzą propem
  `t` (`STRINGS_PL` / `STRINGS_EN`). Zmiana copy = edycja danych, nigdy JSX-a.
- **Slugi idą za językiem strony** (wyjątek od zasady angielskich URL-i w aplikacji): PL po polsku
  bez diakrytyków, EN po angielsku. Nie mapują się jeden do jednego, więc pary trzyma
  `DIMENSION_SLUG_PAIRS` w `dimension-types.ts` — **to jedyne źródło hreflangów i sitemapy**.
  Dodanie wymiaru bez wpisu tam = strona bez wersji alternatywnej.
- **`heading` musi równać się `title`** (H1 = tytuł w SERP). Osobne pola `whyHeading` i
  `howHeading` trzymają pełne zdania, bo polska odmiana nie skleja się z `name`: „Dlaczego
  zgodność jest **ważna**", ale „graf **ważny**", „role **są ważne**"; „Jak liczymy wartość
  **dodaną**" wymaga biernika.
- **Wag CQS nie publikujemy** — profil typu treści je nadpisuje, więc każda liczba byłaby
  nieprawdziwa dla części audytów. Dotyczy to też przeliczników w rodzaju „wpływ: wysoki/średni".
- **Progi oceny 1-10 świadomie usunięte** z podstron (decyzja z 2026-08-20); wzory zostają tam,
  gdzie istnieją: gęstość, koszt pozyskania, TF-IDF, role semantyczne.
- **Typografia treści** (audyt z 2026-08-21): cudzysłowy zamykamy znakiem `”` (U+201D) — PL `„…”`,
  EN `“…”`; apostrof w EN to `’`. Wcześniej 284 cytaty otwierały się typograficznie, a zamykały
  prostym `"`. Skala wymiaru to **0-10** (`scoring.ts`, prompty) — nie 1-10.
- **Kotwice sekcji idą z `t.toc`**, nie z twardych `id` w szablonie: strona EN ma
  `#why-it-matters`, PL `#dlaczego`. Kolejność w `toc` musi odpowiadać kolejności sekcji.
  Ten sam mechanizm mają podstrony narzędzi (`TOOL_STRINGS_*.toc`, 6 pozycji).
  Etykiety w formie pytania dostają w PL pytajnik („Jak liczymy?"), po angielsku nie
  („How we measure it" to fraza oznajmująca, nie okaleczone pytanie).
- **JSON-LD** per strona: `BreadcrumbList` + `DefinedTerm` + `FAQPage`, budowane z tych samych
  danych co widoczne FAQ — nie da się rozjechać znaczników z treścią.
- `related[].slug` musi wskazywać slug z **tej samej** mapy językowej; nieznany slug renderuje się
  jako karta bez linku (zamiast 404), więc literówka nie wysypie builda — tylko cicho zgasi link.

### Podstrony narzędzi (`/tools/[slug]`, `/pl/narzedzia/[slug]`)

Cztery narzędzia poza audytem strony: klasteryzacja, pruning, analiza schema.org, linki
wewnętrzne. Ta sama mechanika co przy wymiarach (dane osobno od szablonu, slugi za językiem,
pary w `TOOL_SLUG_PAIRS`), ale **własny szablon** — zamiast „co podnosi/obniża wynik" mamy
kroki działania, tabelę konfiguracji, listę wyników i sekcję kosztów.

- **Nie ma huba narzędzi** (`/tools`, `/pl/narzedzia` usunięte 2026-08-24). Wejściem jest rozwijane
  menu „Narzędzia" w Navbarze — jego trigger to `<button>`, nie link, bo nie ma dokąd prowadzić.
  Nawigację między narzędziami przejmuje lista pigułek („Wszystkie narzędzia") na dole każdej
  podstrony, a breadcrumb ma nieklikalny korzeń. `TOOL_STRINGS_*.basePath` ZOSTAJE — napędza
  linki do rodzeństwa, nie do huba. Audyt treści ma własne wejście „Jak to działa?", więc
  w menu narzędzi go nie ma.
- **Źródło faktów:** [`../ai-auditor/spec/tools.md`](../ai-auditor/spec/tools.md).
- **Hierarchia nagłówków jest inna niż przy wymiarach** (decyzja z 2026-08-21): intencja na tych
  adresach jest transakcyjna, więc H1 (`heading` = `title`) to fraza sprzedażowa zakończona
  kwalifikatorem `dla SEO` / `for SEO` na **wszystkich czterech** narzędziach (spójny wzorzec,
  nie decyzja per strona), a w hero od razu siedzi CTA do aplikacji + nota `heroNote`. Pytanie definicyjne
  („Czym jest…?") zeszło do pierwszej sekcji treści jako H2 — pola `defHeading` + `def`.
  Zasada H1 = `title` obowiązuje dalej, zmienił się tylko charakter tego tytułu.
- **Limitów (capów URL-i i fraz) świadomie NIE publikujemy** — decyzja z 2026-08-20. W specyfikacji
  są oznaczone jako TYMCZASOWE, więc każda liczba na LP szybko kłamie, a przed zakupem i tak nie
  jest argumentem. Sekcja `limits` została przy samych kosztach i zwrotach kredytu.
- **Koszt:** 1 kredyt za zadanie, zwrot przy błędzie (`failToolJobWithRefund`). Rozwinięcie
  klastra to osobny kredyt. To pisane wprost, bo są to pytania sprzed zakupu.
- **Masowy audyt NIE ma własnej podstrony** — ma sekcję na HP; hub linkuje do `/pl#masowy-audyt`.
- CTA prowadzi bezpośrednio do narzędzia w aplikacji (`appPath`), niezalogowany trafi na `/login`.

### Statusy / URR

| | PL | EN |
|-|----|----|
| Statusy | OK / UWAGA / KRYTYCZNY | OK / WARNING / CRITICAL |
| URR | Wyróżnik / Podstawa / Rzadki | Unique / Root / Rare |

---

## APP_URL i linki

```ts
const APP_URL = 'https://app.citationone.com';
```

| Kontekst | PL | EN |
|----------|----|----|
| CTA / Login | `APP_URL/login?lang=pl` | `APP_URL/login?lang=en` |
| Audyt z URL (Hero) | `APP_URL/login?lang=pl&audit-url={URL}` | `APP_URL/login?lang=en&audit-url={URL}` |

### Hero - input URL → audyt

- Input "Wklej link do strony..." (PL) / "Paste your page URL..." (EN) z walidacją URL po stronie klienta.
- `normalizeUrl`: trim + auto-prefix `https://` jeśli brak protokołu.
- `isValidUrl`: `new URL()` try/catch + protokół `http:`/`https:` + `hostname` musi zawierać `.`.
- Submit → `${APP_URL}/login?lang={pl|en}&audit-url={encoded}` gdzie `encoded = encodeURIComponent(normalized).replace(/%3A/gi, ':').replace(/%2F/gi, '/')` - `:` i `/` zostają nieencodowane w query (RFC 3986).
- Komunikaty błędów: "Podaj adres URL." / "Podaj poprawny adres URL (np. https://example.com/strona)." (PL); odpowiedniki EN.
- **Placeholder pisze się sam** — [useTypewriterPlaceholder.ts](src/lib/useTypewriterPlaceholder.ts) przewija
  przykładowe adresy (`twojastrona.pl/…` / `yoursite.com/…`, zawsze neutralne, nigdy domena klienta).
  Kasuje **tylko do wspólnego prefiksu** z następnym przykładem, więc placeholder nigdy nie robi się pusty
  i nie miga między zachętą a przykładem. Wyłącza się gdy użytkownik zacznie pisać oraz przy
  `prefers-reduced-motion: reduce`; do pierwszego wpisania zwraca `''` (chroni przed rozjazdem hydracji).
- **Ikony silników AI** w podtytule: `public/logos/{chatgpt,perplexity,google}.png` (48px, ~1-3 KB),
  serwowane lokalnie — **nie hotlinkujemy** faviconów (`chatgpt.com/favicon.ico` zwraca 403 dla nie-przeglądarki,
  a każdy odwiedzający wysyłałby request do OpenAI/Perplexity/Google). Klasa `.hero-brand` (inline-flex +
  `white-space: nowrap`) trzyma ikonę przy nazwie, żeby nie rozjechały się na osobne wiersze.

### Cennik (Hero CTA caption + /pricing + /pl/cennik)

- Cena: **€2.00 / audyt** (pay-as-you-go, brak abonamentów).
- Pod CTA w Hero: ikona prezentu (teal) + "Pierwsze 3 audyty są darmowe." / "First 3 audits are free."

### SEO - title template i FAQ schema

- Root layout: `title.template: '%s - CitationOne'` (EN); PL layout ma własny template. **Strony `metadata.title` NIE dopisują " - CitationOne"** - template robi to automatycznie. Wyjątek: `openGraph.title` jest standalone i może zawierać brand.
- `FAQPage` JSON-LD schema renderowana w [FAQ.tsx](src/components/FAQ.tsx) i [FAQEN.tsx](src/components/en/FAQEN.tsx) - generowana z tablicy `faqs` (UI i structured data zawsze zsync).

### Language switcher

- Badge prowadzi na **odpowiednik bieżącej podstrony** w drugim języku (`/pricing` → `/pl/cennik`,
  `/pl/api` → `/api`), a nie na stronę główną. Dotyczy badge'a desktopowego i pozycji w menu mobilnym.
- Pary adresów: [src/lib/languageSwitch.ts](src/lib/languageSwitch.ts) (`PAIRS` + `plCounterpart`/`enCounterpart`).
  **Nowa podstrona = działający przełącznik, zawsze** — bez pary przełącznik po cichu wyrzuca na HP
  (fallback `/` / `/pl`), więc brak wpisu nie wysypie builda i łatwo go przeoczyć.
  - Statyczne route'y (`/pricing`, `/api`, huby) dopisujesz ręcznie do `STATIC_PAIRS`.
  - Rodziny stron z danych (wymiary, narzędzia) **generują się same** z `DIMENSION_SLUG_PAIRS`
    i `TOOL_SLUG_PAIRS` — tych samych tablic, które zasilają hreflangi i sitemapę. Nowy wymiar czy
    narzędzie działa w przełączniku od razu. Nową rodzinę stron podłącz tak samo, zamiast
    utrzymywać drugą listę adresów.
- Navbary czytają ścieżkę przez `usePathname()`. Przy `output: 'export'` docelowy `href` trafia do
  **statycznego HTML** każdej strony (zweryfikowane w `out/`), więc działa bez czekania na hydratację.
- **Uwaga:** `alternates.languages` (hreflang) w layoutach wciąż wskazuje HP dla wszystkich podstron —
  to osobna sprawa niż przełącznik i nadal do naprawienia (mapa z `languageSwitch.ts` się do tego nadaje).
- CSS class `.nav-lang`: border badge, 13px, `#a4acb9`

---

## Branding i design system

### Kolory (globals.css `@theme inline`)

| Token | Wartość | Użycie |
|-------|---------|--------|
| `--color-accent` | `#0b7983` | Teal - primary, CTA, akcenty |
| `--color-accent-hover` | `#097380` | Hover przycisku |
| `--color-background` | `#ffffff` | Tło strony |
| `--color-surface` | `#f8fafb` | Tło sekcji |
| `--color-border` | `#dfe1e7` | Obramowania |
| `--color-foreground` | `#0d0d12` | Główny kolor tekstu |
| `--color-muted-foreground` | `#666d80` | Sekundarny tekst |
| `--color-subtle` | `#818898` | Trzeciorzędny tekst |
| `--color-faint` | `#a4acb9` | Najsłabszy tekst |

### Logo

- **Logotyp PNG:** `https://app.citationone.com/logo.png` - Navbar (36px), Footer (28px)
- **Favicon SVG:** `src/app/icon.svg`

### Typografia

- H1 Hero: `clamp(2.4rem, 4.56vw, 3.6rem)`, fontWeight 700
- H2 sekcji: `clamp(1.6rem, 3.5vw, 2.2rem)`, fontWeight 600
- SectionLabel: fontSize 11, uppercase, `#818898`
- Body: 14-17px, lineHeight 1.65-1.7
- Navbar: 15px/500 (linki), 15px/600 (CTA)

---

## Tło nagłówków - graf węzłów

Dekoracyjna warstwa w tle nagłówków: węzły połączone cienkimi liniami (nawiązanie do grafu wiedzy, który
audyt mierzy). [HeroNodes.tsx](src/components/HeroNodes.tsx) - samo SVG, [HeroBackdrop.tsx](src/components/HeroBackdrop.tsx)
- SVG + siatka kropek dla podstron.

- **Gdzie:** HP (PL i EN, wewnątrz `Hero`/`HeroEN`) + nagłówki 11 podstron: `jak-to-dziala`/`how-it-works`,
  `cennik`/`pricing`, `wymiary`/`dimensions`, `api` (obie wersje) oraz współdzielone `ToolsHub`,
  `ToolPage`, `DimensionPage` (te trzy obsługują PL i EN naraz).
- **Osadzanie:** sekcja musi mieć `position: 'relative'` + `overflow: 'hidden'`, a jej kontener treści
  `position: 'relative'` - inaczej treść wyląduje POD tłem.
- **Stała wysokość zamiast `inset: 0`:** `HeroBackdrop` domyślnie 340px. Cennik i API to **jedna sekcja
  obejmująca całą stronę** - rozciągnięcie tła na jej wysokość rozdmuchałoby graf przez
  `preserveAspectRatio="slice"`. `vbHeight` spłaszcza układ pod niższe nagłówki; bez tego graf ucieka
  w górę i chowa się pod nawigacją.
- **Maska wygaszająca:** `mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 58%, transparent 88%)`.
  `slice` przycina graf inaczej przy każdej proporcji okna - bez maski linie kończyły się ostrym cięciem
  na krawędzi sekcji. Przesuwanie węzłów tego nie naprawia (dla jednej szerokości dobrze, dla innej znów ucina).
- **Mobile:** `display: none` poniżej 900px - `slice` rozdmuchałby graf na całą szerokość i wszedłby pod tekst.
- **Ruch tylko na wejściu:** jednorazowy fade + 10px w górę (1,3s, delay 0,25s), potem tło stoi.
  Ciągły ruch obok pola URL odciąga uwagę od głównej konwersji.

### PUŁAPKA: animacje CSS nie działają na elementach SVG

**`@keyframes` nie odmalowują się ani na dzieciach `<svg>` (`line`, `circle`, `path`), ani na samym `<svg>`.**
`getComputedStyle` grzecznie raportuje wartość końcową (`opacity: 1`, `stroke-dashoffset: 0`,
`matrix(1,0,0,1,0,0)`), element ma poprawny `getBoundingClientRect`, animacja ma stan `finished` -
a na ekranie zostaje to, co jest w **regule bazowej**. Każdy wariant z bazowym `opacity: 0`, `transform: scale(0)`
albo `stroke-dashoffset: 220` jest po prostu niewidoczny.

Stąd zasady dla tej warstwy:

1. Wnętrze grafu jest **w pełni statyczne** - linie i węzły mają wartości docelowe w regule bazowej CSS.
2. Wejście robi **Framer Motion** (`motion.svg`, style inline z JS) - to działa niezawodnie.
3. `prefers-reduced-motion` obsługuje CSS z `!important` (`opacity: 1 !important; transform: none !important`) -
   deklaracja `!important` z arkusza bije style inline Motion, więc animacja nie startuje.

Nie przenoś animacji z powrotem na `@keyframes`: graf zniknie, a wszystkie narzędzia deweloperskie będą
twierdzić, że jest w porządku. **Weryfikuj próbkowaniem pikseli, nie na oko** - linie 1px przy 16% krycia
znikają przy skalowaniu zrzutu ekranu i łatwo uznać działający efekt za zepsuty.

---

## Konwencje kodowania

- Style inline (`style={{ }}`) - Tailwind tylko do layout (`flex`, `items-center`, `hidden sm:flex`)
- Responsywność przez `<style>` tag z `@media` w komponentach
- Ikony: JSX SVG inline
- `'use client'` - komponenty z animacjami/state
- Brak emoji w UI
- `output: 'export'` - static export, brak middleware/server-side redirects. Redirecty przez `public/_redirects`

## RWD / Mobile

- **Viewport:** `export const viewport` w [layout.tsx](src/app/layout.tsx) (`width: device-width, initialScale: 1, maximumScale: 5`). PL layout dziedziczy z root.
- **Breakpointy:** **820px Navbar**, 900px HowItWorks (3 kroki z connectorami), 768px pozostałe gridy.
  Historia progu: `sm:` → `md:` przy 5. pozycji („API"), a przy „Audycie masowym" (2026-08-26) klasa
  Tailwinda przestała wystarczać — pasek zmieściłby się dopiero od 820px, więc **własna reguła**
  `@media (max-width: 819px)` chowa `.nav-desktop` i wymusza `.nav-burger` / `.nav-mobile-panel`
  (`md:` = 768px zostaje w klasach jako baza). Między 820 a 1023px `.nav-link` i `.nav-cta` mają
  zwężone odstępy. **Te reguły muszą stać PO definicji `.nav-cta`** — mają tę samą specyficzność, więc
  wcześniejsze `padding-left/right` przegrywało ze skrótem `padding` i CTA dalej łamał się na dwie linie.
  Dodając kolejną pozycję **zmierz** wysokość `.nav-cta` (zawijanie = >46px) — nie powoduje przewijania
  strony, więc nie rzuca się w oczy. Uwaga przy pomiarze: logo `BrandMorph` animuje szerokość przez ~3 s,
  więc mierz po ustabilizowaniu, inaczej pasek wychodzi węższy niż jest naprawdę.
- **Kolejność menu** (2026-08-26, PL i EN): Jak działa audytor? → **Audyt masowy** → Cennik →
  Inne narzędzia → API. Audyt masowy stoi przed API świadomie: to ta sama obietnica skalowania
  w mniej technicznej formie, a wcześniej przekaz z reklamy domykało samo API, przez co skalowanie
  wyglądało na dostępne wyłącznie przez integrację. **Audyt masowy nie ma własnej podstrony** — link
  to kotwica `/pl#masowy-audyt` (`/#bulk-audit`), zawsze pełną ścieżką, bo nawigacja działa też na podstronach.
- **Navbar — menu „Inne narzędzia":** desktop ma rozwijaną listę (`TOOLS_MENU` w `Navbar.tsx` /
  `en/NavbarEN.tsx`), otwieraną **czystym CSS-em** (`:hover` + `:focus-within`), więc działa przed
  hydratacją i dla klawiatury. W liście są 4 narzędzia; audyt treści ma własne wejście „Jak działa
  audytor?", a Content Pruning i kanibalizacja to jedna pozycja (jedno zadanie, dwie zakładki wyniku).
  Trigger to `<button>`, nie link — huba narzędzi nie ma, więc nie ma dokąd prowadzić. `key` w mapowaniu
  idzie po `label`, nie po `href`. Na mobile ta sama tablica renderuje się jako rozwijana grupa
  (stan `toolsOpen`) — inaczej menu otwierałoby się na 9 pozycji.
- **Navbar:** hamburger + panel, auto-close, full-width CTA. `.nav-cta` ma `min-height: 44px` (touch target tablet/mobile).
- **Hero button:** `min-height: 44`, bez `whiteSpace: nowrap` (uniknięcie overflow <360px). Input+button stack na <580px.
- **Gridy responsive:** dims 3→2→1, ba 2→1, feat 2→1, howitworks 5→1 (≤900px), problem/forwho 3→1.
- **Section padding mobile:** globalna reguła w [globals.css](src/app/globals.css) - sekcje z inline `padding: 90px 0` → `padding: 48px 0 !important` na ≤640px (overrides przez attribute selector `section[style*="padding: 90px 0"]`).
- **FAQ button:** `minHeight: 44` (touch target).
- **Solution card:** 80%→100% na mobile, score font 40→32px, **radar ukryty na mobile** (`.sol-radar-wrap { display: none }` na <=768px - widoczny w Hero, nie powtarza się).
- **TechLogos:** Gemini, Bright Data, Jina AI, DataForSEO
