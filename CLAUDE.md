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
│   │   │   └── DimensionsContent.tsx
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
│   │       │   └── WymiaryContent.tsx
│   │       └── api/             # PL "API" (/pl/api)
│   │           ├── page.tsx
│   │           └── ApiContent.tsx
│   └── components/
│       ├── Navbar.tsx           # PL Navbar - switcher EN → /
│       ├── Hero.tsx
│       ├── TechLogos.tsx
│       ├── Showcase.tsx         # Mockup panelu (sam mockup, bez copy) - na HP
│       ├── Problem.tsx
│       ├── Solution.tsx         # NIEUŻYWANA na HP
│       ├── HowItWorks.tsx
│       ├── Features.tsx         # 5 sekcji PL - NIEUŻYWANA na HP
│       ├── BrandMorph.tsx      # Shared - animowane logo CitatioNone→CitationOne (typing effect)
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
| `/` | EN HP (komponenty EN) | AI Search Content Audit - CitationOne |
| `/how-it-works` | PageContentEN | How does CitationOne work? - CitationOne |
| `/pricing` | PricingContentEN | Pricing - CitationOne |
| `/dimensions` | DimensionsContent | 10 content quality dimensions + E-E-A-T - CitationOne |
| `/api` | ApiContentEN | API - CitationOne |

### PL (katalog /pl)

| URL | Komponent | Title |
|-----|-----------|-------|
| `/pl` | PL HP (komponenty PL) | Audyt treści pod AI Search - CitationOne |
| `/pl/jak-to-dziala` | PageContent PL | Jak działa CitationOne? - CitationOne |
| `/pl/cennik` | PricingContent PL | Cennik - CitationOne |
| `/pl/wymiary` | WymiaryContent PL | 10 wymiarów jakości treści + E-E-A-T - CitationOne |
| `/pl/api` | ApiContent PL | API - CitationOne |

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

**ReportSection** ([ReportSection.tsx](src/components/ReportSection.tsx) / [en/ReportSectionEN.tsx](src/components/en/ReportSectionEN.tsx)) - "Dane gotowe do wdrożenia". Układ 2-kolumnowy (stack <900px): lewa = label + h2 + opis + 3 punkty (Raport PDF / Audyt Schema / Historia rewizji) + CTA "Zobacz przykładowy raport"/"View sample report" (otwiera udostępniony raport online w nowej karcie, `target="_blank"`); prawa = podgląd raportu w papierowej ramce (cień, połysk, zanikanie ku dołowi przez `maskImage`, perspektywa, hover-zoom), też klikalny → raport. Linki (stała `REPORT_URL` w każdym komponencie, osobne dla języka): PL `…/share/khZUjVCAgSvScSUGnQ3tgZ58?lang=pl`, EN `…/share/AOlGargxePO9E-hRsQrWxy0V?lang=en`. Podgląd: `public/report-preview.png` (screenshot udostępnionego raportu web - score'y, profil 10 wymiarów, Quick Wins).

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

Lista 10 wymiarów (numerowana 01–10, używana w sekcji edukacyjnej):

| # | EN (/dimensions) | PL (/pl/wymiary) |
|---|------------------|------------------|
| 01 | Intent Alignment | Zgodność z intencją |
| 02 | Info Density | Gęstość informacji |
| 03 | BLUF | BLUF |
| 04 | Knowledge Graph (EAV) | Graf wiedzy (EAV) |
| 05 | Information Chunks | Autonomiczność sekcji |
| 06 | Cost of Retrieval (Conciseness) | Koszt ekstrakcji |
| 07 | Information Gain (Uniqueness) | Wysiłek redakcyjny |
| 08 | AIO Coverage (Query Fan-out) | Pokrycie AI Overview |
| 09 | Semantic Role Logic (SRL) | Role semantyczne |
| 10 | TF-IDF (SERP Benchmark) | TF-IDF |

Plus blok E-E-A-T (Experience / Expertise / Authoritativeness / Trustworthiness).

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
  **Nowa podstrona = nowa para w tej tablicy** — bez niej przełącznik po cichu wyrzuca na HP (fallback `/` / `/pl`).
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

## Konwencje kodowania

- Style inline (`style={{ }}`) - Tailwind tylko do layout (`flex`, `items-center`, `hidden sm:flex`)
- Responsywność przez `<style>` tag z `@media` w komponentach
- Ikony: JSX SVG inline
- `'use client'` - komponenty z animacjami/state
- Brak emoji w UI
- `output: 'export'` - static export, brak middleware/server-side redirects. Redirecty przez `public/_redirects`

## RWD / Mobile

- **Viewport:** `export const viewport` w [layout.tsx](src/app/layout.tsx) (`width: device-width, initialScale: 1, maximumScale: 5`). PL layout dziedziczy z root.
- **Breakpointy:** `md:` (768px) Navbar, 900px HowItWorks (3 kroki z connectorami), 768px pozostałe gridy.
  Navbar przeszedł z `sm:` na `md:` przy dodaniu 5. pozycji („API"): przy 640px logo + 4 linki + CTA + badge
  języka nie mieściły się w 64px i CTA („Zrób audyt" / „Run audit") łamał się na dwie linie. Dodając kolejną
  pozycję do menu **zmierz** wysokość `.nav-cta` — zawijanie nie powoduje przewijania strony, więc nie rzuca się w oczy.
- **Navbar:** hamburger + panel, auto-close, full-width CTA. `.nav-cta` ma `min-height: 44px` (touch target tablet/mobile).
- **Hero button:** `min-height: 44`, bez `whiteSpace: nowrap` (uniknięcie overflow <360px). Input+button stack na <580px.
- **Gridy responsive:** dims 3→2→1, ba 2→1, feat 2→1, howitworks 5→1 (≤900px), problem/forwho 3→1.
- **Section padding mobile:** globalna reguła w [globals.css](src/app/globals.css) - sekcje z inline `padding: 90px 0` → `padding: 48px 0 !important` na ≤640px (overrides przez attribute selector `section[style*="padding: 90px 0"]`).
- **FAQ button:** `minHeight: 44` (touch target).
- **Solution card:** 80%→100% na mobile, score font 40→32px, **radar ukryty na mobile** (`.sol-radar-wrap { display: none }` na <=768px - widoczny w Hero, nie powtarza się).
- **TechLogos:** Gemini, Bright Data, Jina AI, DataForSEO
