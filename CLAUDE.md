# CLAUDE.md — CitationOne LP

## Opis projektu

Landing page dla narzędzia **CitationOne** (`citationone.com`) — webapp do audytu contentu pod kątem AI Search (ChatGPT, Perplexity, Google AI Overview, Bing Copilot).

**Cel LP:** konwersja na logowanie/rejestrację (`/login`) lub zakup pakietu audytów.

**Języki:** EN (domyślny, root `/`) + PL (`/pl`). Osobne komponenty per język w `src/components/` (PL) i `src/components/en/` (EN).

**Powiązane repo:** aplikacja główna w `../ai-auditor/` — specyfikacja w `spec/` (patrz `ai-auditor/CLAUDE.md`).

---

## Stack technologiczny

- **Framework:** Next.js 15 (App Router, static export `output: 'export'`)
- **Runtime:** React 19, TypeScript strict
- **Styling:** Tailwind CSS 4 — CSS-first config przez `@theme inline` w `src/app/globals.css`. **Brak pliku `tailwind.config.js`.**
- **Animacje:** Framer Motion (`motion`, `AnimatePresence`)
- **Font:** Inter (Google Fonts, `variable: --font-inter`, subsets: latin + latin-ext)
- **Icons:** inline SVG (nie ma biblioteki ikon — wszystkie ikony to JSX SVG)
- **Dev server:** `npm run dev` → domyślnie port 3000 (fallback na 3001 jeśli zajęty)

---

## Struktura projektu

```
ai-auditor-lp-clone/
├── CLAUDE.md
├── package.json
├── tsconfig.json
├── next.config.ts               # output: 'export' (static)
├── public/
│   └── _redirects               # 301 redirecty (Vercel/Netlify)
├── spec/                        # Specyfikacja aplikacji głównej (read-only)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (lang="en"), metadata EN, hreflang
│   │   ├── page.tsx             # EN homepage (root /)
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
│   │   └── pl/                  # Wersja PL
│   │       ├── layout.tsx       # PL layout (lang="pl", metadata PL, hreflang)
│   │       ├── page.tsx         # PL homepage (/pl)
│   │       ├── jak-to-dziala/   # PL "Jak to działa?" (/pl/jak-to-dziala)
│   │       │   ├── page.tsx
│   │       │   └── PageContent.tsx
│   │       ├── cennik/          # PL "Cennik" (/pl/cennik)
│   │       │   ├── page.tsx
│   │       │   └── PricingContent.tsx
│   │       └── wymiary/         # PL "Wymiary" (/pl/wymiary)
│   │           ├── page.tsx
│   │           └── WymiaryContent.tsx
│   └── components/
│       ├── Navbar.tsx           # PL Navbar — switcher EN → /
│       ├── Hero.tsx
│       ├── TechLogos.tsx
│       ├── Problem.tsx
│       ├── Solution.tsx
│       ├── HowItWorks.tsx
│       ├── Features.tsx         # 5 sekcji PL (wymiary, benchmark, before/after, eksport, quick wins)
│       ├── BrandMorph.tsx      # Shared — animowane logo CitatioNone→CitationOne (typing effect)
│       ├── ForWho.tsx
│       ├── ClosingCta.tsx
│       ├── RadarIllustration.tsx # PL etykiety
│       ├── Footer.tsx           # PL Footer — linki /pl/*
│       ├── CtaSection.tsx
│       ├── SocialProof.tsx      # UKRYTA
│       ├── Pricing.tsx          # UKRYTA
│       ├── ReportExample.tsx    # UKRYTA
│       ├── FAQ.tsx              # UKRYTA
│       └── en/                  # EN komponenty
│           ├── NavbarEN.tsx     # EN Navbar — switcher PL → /pl
│           ├── HeroEN.tsx
│           ├── TechLogosEN.tsx
│           ├── ProblemEN.tsx
│           ├── SolutionEN.tsx
│           ├── HowItWorksEN.tsx
│           ├── FeaturesEN.tsx
│           ├── ForWhoEN.tsx
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

### PL (katalog /pl)

| URL | Komponent | Title |
|-----|-----------|-------|
| `/pl` | PL HP (komponenty PL) | Audyt treści pod AI Search - CitationOne |
| `/pl/jak-to-dziala` | PageContent PL | Jak działa CitationOne? - CitationOne |
| `/pl/cennik` | PricingContent PL | Cennik - CitationOne |
| `/pl/wymiary` | WymiaryContent PL | 10 wymiarów jakości treści + E-E-A-T - CitationOne |

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
Navbar → Hero → TechLogos → Problem → Solution → HowItWorks → Features (5 sekcji) → ForWho → ClosingCta → Footer
```

Features HP: Wymiary, Benchmark SERP, Before/After, Eksport, Quick Wins

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

### Hero — input URL → audyt

- Input "Wklej link do strony..." (PL) / "Paste your page URL..." (EN) z walidacją URL po stronie klienta.
- `normalizeUrl`: trim + auto-prefix `https://` jeśli brak protokołu.
- `isValidUrl`: `new URL()` try/catch + protokół `http:`/`https:` + `hostname` musi zawierać `.`.
- Submit → `${APP_URL}/login?lang={pl|en}&audit-url={encoded}` gdzie `encoded = encodeURIComponent(normalized).replace(/%3A/gi, ':').replace(/%2F/gi, '/')` — `:` i `/` zostają nieencodowane w query (RFC 3986).
- Komunikaty błędów: "Podaj adres URL." / "Podaj poprawny adres URL (np. https://example.com/strona)." (PL); odpowiedniki EN.

### Cennik (Hero CTA caption + /pricing + /pl/cennik)

- Cena: **€2.00 / audyt** (pay-as-you-go, brak abonamentów).
- Pod CTA w Hero: ikona prezentu (teal) + "Pierwsze 3 audyty są darmowe." / "First 3 audits are free."

### SEO — title template i FAQ schema

- Root layout: `title.template: '%s - CitationOne'` (EN); PL layout ma własny template. **Strony `metadata.title` NIE dopisują " - CitationOne"** — template robi to automatycznie. Wyjątek: `openGraph.title` jest standalone i może zawierać brand.
- `FAQPage` JSON-LD schema renderowana w [FAQ.tsx](src/components/FAQ.tsx) i [FAQEN.tsx](src/components/en/FAQEN.tsx) — generowana z tablicy `faqs` (UI i structured data zawsze zsync).

### Language switcher

- **PL Navbar:** logo → `/pl`, badge `EN` → `/` (root = EN)
- **EN Navbar:** logo → `/`, badge `PL` → `/pl`
- CSS class `.nav-lang`: border badge, 13px, `#a4acb9`

---

## Branding i design system

### Kolory (globals.css `@theme inline`)

| Token | Wartość | Użycie |
|-------|---------|--------|
| `--color-accent` | `#0b7983` | Teal — primary, CTA, akcenty |
| `--color-accent-hover` | `#097380` | Hover przycisku |
| `--color-background` | `#ffffff` | Tło strony |
| `--color-surface` | `#f8fafb` | Tło sekcji |
| `--color-border` | `#dfe1e7` | Obramowania |
| `--color-foreground` | `#0d0d12` | Główny kolor tekstu |
| `--color-muted-foreground` | `#666d80` | Sekundarny tekst |
| `--color-subtle` | `#818898` | Trzeciorzędny tekst |
| `--color-faint` | `#a4acb9` | Najsłabszy tekst |

### Logo

- **Logotyp PNG:** `https://app.citationone.com/logo.png` — Navbar (36px), Footer (28px)
- **Favicon SVG:** `src/app/icon.svg`

### Typografia

- H1 Hero: `clamp(2.4rem, 4.56vw, 3.6rem)`, fontWeight 700
- H2 sekcji: `clamp(1.6rem, 3.5vw, 2.2rem)`, fontWeight 600
- SectionLabel: fontSize 11, uppercase, `#818898`
- Body: 14-17px, lineHeight 1.65-1.7
- Navbar: 15px/500 (linki), 15px/600 (CTA)

---

## Konwencje kodowania

- Style inline (`style={{ }}`) — Tailwind tylko do layout (`flex`, `items-center`, `hidden sm:flex`)
- Responsywność przez `<style>` tag z `@media` w komponentach
- Ikony: JSX SVG inline
- `'use client'` — komponenty z animacjami/state
- Brak emoji w UI
- `output: 'export'` — static export, brak middleware/server-side redirects. Redirecty przez `public/_redirects`

## RWD / Mobile

- **Breakpoint:** `sm:` (640px) Navbar, `768px` gridy
- **Navbar:** hamburger + panel, auto-close, full-width CTA, touch targets 44px+
- **Gridy responsive:** dims 3→2→1, ba 2→1, feat 2→1, problem/forwho/howitworks 3→1
- **Solution card:** 80%→100% na mobile, score font 40→32px, **radar ukryty na mobile** (`.sol-radar-wrap { display: none }` na <=768px — widoczny w Hero, nie powtarza się)
- **TechLogos:** Gemini, Bright Data, Jina AI, DataForSEO
