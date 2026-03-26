# CLAUDE.md — CitabilityScore LP

## Opis projektu

Landing page dla narzędzia **CitabilityScore** (`citabilityscore.com`) — webapp do audytu contentu pod kątem AI Search (ChatGPT, Perplexity, Google AI Overview, Bing Copilot).

**Cel LP:** konwersja na rejestrację konta (`/register`) lub zakup pakietu audytów.

**Język:** polski (PL). Wszystkie teksty i komunikacja z użytkownikiem w języku polskim.

**Powiązane repo:** aplikacja główna znajduje się w `../ai-auditor/` — specyfikacja w `spec/` (patrz `ai-auditor/CLAUDE.md`).

---

## Stack technologiczny

- **Framework:** Next.js 15 (App Router, SSR)
- **Runtime:** React 19, TypeScript strict
- **Styling:** Tailwind CSS 4 — CSS-first config przez `@theme inline` w `src/app/globals.css`. **Brak pliku `tailwind.config.js`.**
- **Animacje:** Framer Motion (`motion`, `AnimatePresence`)
- **Font:** Inter (Google Fonts, `variable: --font-inter`, subsets: latin + latin-ext)
- **Icons:** inline SVG (nie ma biblioteki ikon — wszystkie ikony to JSX SVG)
- **Dev server:** `npm run dev` → domyślnie port 3000 (fallback na 3001 jeśli zajęty)

---

## Struktura projektu

```
ai-auditor-lp-main/
├── CLAUDE.md                    # Ten plik
├── package.json
├── tsconfig.json
├── next.config.ts
├── spec/                        # Specyfikacja aplikacji głównej (read-only dla LP)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, metadata, Inter font
│   │   ├── page.tsx             # Główna strona — składa sekcje w kolejności
│   │   └── globals.css          # Tailwind + tokeny kolorów + animacje
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── Problem.tsx
│       ├── Solution.tsx         # NOWY — bridge problem→produkt
│       ├── HowItWorks.tsx
│       ├── Features.tsx
│       ├── ReportExample.tsx
│       ├── ForWho.tsx
│       ├── ClosingCta.tsx
│       ├── RadarIllustration.tsx  # Shared — używany w Hero i Solution
│       ├── SocialProof.tsx      # UKRYTA (ławka rezerwowa)
│       ├── Pricing.tsx          # UKRYTA (ławka rezerwowa)
│       └── FAQ.tsx              # UKRYTA (ławka rezerwowa)
```

---

## Kolejność sekcji (page.tsx)

### Aktywne (na starcie serwisu)

```
Navbar → Hero → Problem → Solution → HowItWorks → Features → ReportExample → ForWho → ClosingCta → Footer
```

**Logika kolejności (AIDA + marketing psychology):**
1. **Hero** — hak, CTA, uwaga
2. **Problem** — agitacja bólu (3 kafle + zamknięcie jako akapit)
3. **Solution** — CitabilityScore jako odpowiedź na problem
4. **HowItWorks** — redukcja lęku przed złożonością ("to tylko 3 kroki") + CTA
5. **Features** — budowanie pożądania (deep-dive dla zdecydowanych)
6. **ReportExample** — namacalny output ("oto co dokładnie dostaniesz")
7. **ForWho** — self-identyfikacja ("to jest właśnie dla mnie")
8. **ClosingCta** — ostatni impuls dla tych co przewinęli do końca
9. **Footer**

---

## Sekcje ukryte (ławka rezerwowa)

Gotowe komponenty, **wykluczone z `page.tsx`** na start serwisu. Aby włączyć — odkomentować import i JSX w `page.tsx`.

| Komponent | Plik | Zawartość | Gdzie wstawić |
|-----------|------|-----------|---------------|
| `SocialProof` | `src/components/SocialProof.tsx` | Stats bar (4 liczby) + 3 testimoniale | Po `Features`, przed `ReportExample` |
| `Pricing` | `src/components/Pricing.tsx` | 3 pakiety cenowe (490 / 890 / 1590 zł) | Po `ForWho`, przed `ClosingCta` |
| `FAQ` | `src/components/FAQ.tsx` | Akordeon z 5 pytaniami | Po `Pricing`, przed `ClosingCta` |

**Aby włączyć sekcję**, odkomentować w `page.tsx`:
```tsx
// import SocialProof from '@/components/SocialProof';
// import Pricing from '@/components/Pricing';
// import FAQ from '@/components/FAQ';
```
i odpowiadające tagi JSX w `<main>`.

---

## Branding i design system

### Kolory (globals.css `@theme inline`)

| Token | Wartość | Użycie |
|-------|---------|--------|
| `--color-accent` | `#0b7983` | Teal — primary, CTA, akcenty |
| `--color-accent-hover` | `#097380` | Hover przycisku |
| `--color-accent-light` | `#e6f5f6` | Jasne tło teal |
| `--color-accent-muted` | `#b2dfe3` | Miękkie obramowania teal |
| `--color-background` | `#ffffff` | Tło strony |
| `--color-surface` | `#f8fafb` | Tło sekcji (chłodna szarość) |
| `--color-border` | `#dfe1e7` | Obramowania |
| `--color-foreground` | `#0d0d12` | Główny kolor tekstu |
| `--color-muted-foreground` | `#666d80` | Sekundarny tekst |
| `--color-subtle` | `#818898` | Trzeciorzędny tekst |
| `--color-faint` | `#a4acb9` | Najsłabszy tekst, labele |

### Kolory statusów

| Status | Label | Hex | Użycie |
|--------|-------|-----|--------|
| OK (8-10) | `OK` | `#16A34A` (zielony) | Score >= 8, badge sukcesu |
| UWAGA (5-7) | `UWAGA` | `#CA8A04` (żółty) | Score 5-7, badge ostrzeżenia |
| KRYTYCZNY (0-4) | `KRYTYCZNY` | `#DC2626` (czerwony) | Score < 5, badge krytyczny |

### Kolory pokrycia

| Badge | Hex | Użycie |
|-------|-----|--------|
| pokryte | `#16A34A` (zielony) | Pokryte sub-zapytania, encje obecne |
| luka | `#DC2626` (czerwony) | Brakujące sub-zapytania, luki treściowe |
| unikalne | `#0b7983` (accent teal) | Wyróżniające elementy |

### URR (klasyfikacja atrybutów)

| Klasa | Label PL | Hex | Tło |
|-------|----------|-----|-----|
| UNIQUE | Wyróżnik | `#0b7983` (accent teal) | `rgba(11,121,131,0.08)` |
| ROOT | Podstawa | `#0891b2` (cyan) | `rgba(8,145,178,0.08)` |
| RARE | Rzadki | `#CA8A04` (żółty) | `rgba(202,138,4,0.08)` |

### Logo

- **Logotyp PNG:** `public/logo.png` — pełny logotyp CitabilityScore (speedometer + tekst), używany w Navbar (height 28px) i Footer (height 22px)
- **Favicon SVG:** `src/app/icon.svg` — teal speedometer z cudzysłowem (identyczny jak w ai-auditor)

### Typografia

- Nagłówki sekcji: `clamp(1.6rem, 3.5vw, 2.2rem)`, `fontWeight: 600`, `letterSpacing: -0.025em`
- H1 Hero: `clamp(2rem, 3.8vw, 3rem)`, `fontWeight: 700`, `letterSpacing: -0.03em`
- Etykiety sekcji (`SectionLabel`): `fontSize: 11`, `fontWeight: 600`, `textTransform: uppercase`, `letterSpacing: 0.08em`, kolor `#818898`
- Body: 14–17px, `color: #36394a` lub `#666d80`, `lineHeight: 1.65–1.7`

### Spacing sekcji

- Standardowy padding: `padding: '58px 0'` (zredukowany o 40% z 96px)
- Max-width kontenera: `1024px`
- Tła sekcji alternują: `#f8fafb` / `#ffffff`

### Animacje (Framer Motion)

Helper `fadeUp(delay?)` używany w Features:
```tsx
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
  };
}
```

Karty w Problem: `whileInView` z `delay: i * 0.09`.
Hero floating card: `animate={{ y: [0, -8, 0] }}`, `duration: 4, repeat: Infinity`.

---

## Komponenty — szczegóły

### Navbar

- Server Component (brak `'use client'`)
- Sticky, `backdrop-filter: blur(16px)`, border-bottom, height `64px`, maxWidth `1024`
- Logo: `<img src="/logo.png" height={28} />` (logotyp CitabilityScore)
- Linki: Jak działa (`#jak-dziala`), Dla kogo (`#dla-kogo`)
- Jeden CTA: "Rozpocznij" → `APP_URL/login` (teal `#0b7983`, hover `#097380`)

### Hero

- `'use client'` — animacje, `RadarIllustration` (shared)
- 2-column grid (`.hero-grid`, gap 72px): lewa — copy, prawa — karta z radarem (bez animacji pływania)
- H1: gradient tekstu (`display: inline-block`, `linear-gradient(135deg, #0b7983 0%, #0b9aa6 45%, #0d0d12 100%)`), `WebkitTextFillColor: transparent`, `backgroundClip: text`. Font `clamp(2.4rem, 4.56vw, 3.6rem)` (+20% vs default). Tekst: `"Audytuj treść / pod kątem AI Search"` (bez spanu — cały nagłówek objęty gradientem)
- 3 bullet points z ikonami w kształcie rombu (diament teal):
  1. "Sprawdź, czy Twój content jest cytowalny przez ChatGPT, Perplexity i Google AI Overview."
  2. "9 wymiarów analizy."
  3. "Konkretne rekomendacje."
- CTAs: "Rozpocznij →" (primary teal) + "Zobacz przykładowy raport" (ghost, href `#przyklad-raportu`)
- Karta prawa:
  - Górna sekcja: 2-column grid — lewa: label `CQS` + score `78/100` (fontSize 40), prawa: label `Citability AI` + score `7.2/10` (fontSize 40), oddzielone pionową linią `#eceff3`
  - `RadarIllustration` (9 osi, animowana, `maxWidth={320}`)
  - Brak animacji pływania (`animate={{ y }}` usunięte — zwykły `div`)
- Responsive: `@media (max-width: 768px)` → 1 kolumna, gap 40px

### Problem

- Tło: `#f8fafb`
- Nagłówek i zamknięcie wyśrodkowane
- H2: "Wysoka pozycja w Google nie oznacza cytowania przez AI"
- 3 kafle w rzędzie (punkty 01–03): `grid-template-columns: repeat(3, 1fr)`, `gap: 16px`
- Karty: białe, `border: 1px solid #dfe1e7`, `borderRadius: 10`, `padding: 32px 28px`, stagger `i * 0.09`
- Punkt 04 jako zamknięcie sekcji — swobodny blok `h3` + `p` wyśrodkowany, styl jak nagłówek sekcji

### Solution

- Tło: `#ffffff`
- Mały label: "CitabilityScore" (uppercase, `#818898`)
- H2: "Narzędzie, które mierzy to, " + teal span "co AI naprawdę ocenia"
- Akapit: jedno zdanie opisujące produkt
- CTA: "Rozpocznij →" → `APP_URL/register`
- Prawa kolumna: `RadarIllustration` (maxWidth 260) na tle `#f8fafb` z border

### HowItWorks

- Tło: `#f8fafb`, `id="jak-dziala"`
- Tylko H2 "Jak to działa?" — bez label i akapitu
- 3 kroki z ikonami Material Design w kontenerach 44×44 (teal bg/border):
  - Krok 1: `globe-alt` (URL)
  - Krok 2: `sparkles` (AI)
  - Krok 3: `document-check` (raport)
- Connectors (strzałki teal) między kartami, ukryte na mobile
- `whileHover={{ y: -4 }}` na kartach, `whileHover={{ scale: 1.12, rotate: 5 }}` na ikonach
- CTA "Rozpocznij →" wyśrodkowany pod kartami (`marginTop: 48`)

### Features

- `'use client'` — Framer Motion
- 6 osobnych `<section>` wewnątrz `<div id="features">`, tła alternują `#f8fafb`/`#ffffff`
- Helper komponent `SectionLabel` + helper funkcja `fadeUp(delay)`
- CSS klasy: `.feat-grid` (1fr 1fr, gap 64px), `.feat-grid-reverse` (order swap), responsive → 1 kolumna ≤768px

**Sekcje Features:**

1. **9 wymiarów** (`#f8fafb`) — nagłówek centered + 3×3 grid kart z animowanymi progress barami. Dane w `DIMS[]`.
2. **Benchmark SERP** (`#ffffff`) — `.feat-grid`: tekst left + `BenchmarkVisual` right.
3. **Before/After** (`#f8fafb`) — nagłówek + `BeforeAfterVisual`: 2-col (szare "Przed" / teal "Po") + priority badges.
4. **AI Overview Coverage** (`#ffffff`) — lista 5 sub-zapytań z "pokryte/brak". H2: "Czy Twoja treść pokrywa syntezę AI Overview?" — chodzi o pokrycie sub-zapytań syntezy AIO, **nie** o cytowanie artykułu.
5. **Graf wiedzy** (`#f8fafb`) — `KnowledgeGraphVisual`: tabela EAV z badge'ami UNIQUE/ROOT/RARE.
6. **Eksport PDF** (`#ffffff`) — ikony Material Design (document-text dla PDF, code-bracket dla Markdown). Brak emoji.

### ReportExample

- Tło: `#0b7983` (teal, sekcja odwrócona), `id="przyklad-raportu"`
- CTA: biały przycisk → `APP_URL/register`

### ForWho

- Tło: `#f8fafb`, `id="dla-kogo"`
- 3 karty w rzędzie: `grid-template-columns: repeat(3, 1fr)`, `gap: 16px`
- Ikony 28px w kontenerach 44×44 (teal bg/border), styl jak HowItWorks:
  - briefcase (Właściciel agencji), magnifier (Specjalista SEO), laptop (Freelancer)
- Każda karta: ikona + H3 + opis + highlight pills (teal)
- `whileHover={{ y: -4, boxShadow }}`

### SocialProof *(ukryta)*

- **Stats bar** — 4 liczby: "9 wymiarów", "< 15 minut", "10 artykułów SERP", "2 formaty eksportu"
- **Testimonials** — 3 karty: Marcin K. (agencja), Anna W. (SEO specialist), Tomasz R. (freelancer)

### Pricing *(ukryta)*

- 3 pakiety: 5 audytów (490 zł), 10 audytów (890 zł, "Polecany"), 20 audytów (1 590 zł)
- Wyróżniony pakiet: teal border, teal badge

### FAQ *(ukryta)*

- Akordeon z `useState` + `AnimatePresence`, 5 pytań

### ClosingCta

- Tło: `#0d0d12`
- H2 + teal CTA "Sprawdź swój artykuł" → `APP_URL/register`
- Trust signals: "Bez subskrypcji · Faktura VAT · Płatność przelewem"

### Footer

- Server Component, logotyp CitabilityScore (`<img src="/logo.png" height={22} />`) + linki nawigacyjne

---

## USP i messaging

**3 kluczowe USP:**
1. Raport mówi co zmienić w treści, żeby być cytowanym przez Google AI Overview, ChatGPT i Perplexity
2. 9 wymiarów AI Search (CQS, AI Citability, BLUF, EAV, Benchmark SERP, AIO Coverage, Graf wiedzy, Before/After, Eksport)
3. Rzetelna analiza ręczna = godziny eksperckiej pracy → w narzędziu nakład to <3 minuty

**Grupy docelowe:**
- Właściciele agencji SEO
- Specjaliści / eksperci SEO, pracownicy agencji
- Freelancerzy SEO

---

## APP_URL

```ts
const APP_URL = 'https://app.citabilityscore.com';
```

Zdefiniowany lokalnie w każdym komponencie który linkuje do aplikacji. Linki:
- Rejestracja: `APP_URL/register`
- Logowanie: `APP_URL/login`

---

## Konwencje kodowania

- Wszystkie style inline (`style={{ }}`) — brak CSS modules, brak zewnętrznych klas Tailwind poza układem
- Tailwind używany tylko do klas układu: `flex`, `items-center`, `gap-*`, `hidden sm:flex`, `w-full`, `relative`, `overflow-hidden`, itp.
- Responsywność przez `<style>` tag z `@media` w komponentach używających custom grid
- Ikony: JSX SVG inline, `fill="none"`, `viewBox="0 0 24 24"`, `strokeWidth={1.8}` (karty) lub `{2.5}` (przyciski)
- `'use client'` — wszystkie komponenty z animacjami Framer Motion lub `useState`
- Komponenty bez interaktywności (Navbar, Footer) — Server Components (brak `'use client'`)
- Brak emoji w UI
- `RadarIllustration` — shared component w `src/components/RadarIllustration.tsx`, używany w Hero (`maxWidth={320}`) i Solution (`maxWidth={260}`). Props: `maxWidth?: number`. Etykiety osi: `fontWeight="700"`, `fill="#0d0d12"` (styl jak score). Hover tooltips z definicjami wskaźników — tło `#0b7983` (teal), pozycjonowanie adaptacyjne (above/below w zależności od połowy SVG). Definicje w tablicy `LABELS[]` w języku polskim.
