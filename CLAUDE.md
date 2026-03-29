# CLAUDE.md — CitationOne LP

## Opis projektu

Landing page dla narzędzia **CitationOne** (`citationone.com`) — webapp do audytu contentu pod kątem AI Search (ChatGPT, Perplexity, Google AI Overview, Bing Copilot).

**Cel LP:** konwersja na rejestrację konta (`/register`) lub zakup pakietu audytów.

**Język:** polski (PL). Wszystkie teksty i komunikacja z użytkownikiem w języku polskim. Nazwy wymiarów w UI po polsku (patrz sekcja "Wymiary").

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
ai-auditor-lp-clone/
├── CLAUDE.md                    # Ten plik
├── package.json
├── tsconfig.json
├── next.config.ts
├── spec/                        # Specyfikacja aplikacji głównej (read-only dla LP)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, metadata, Inter font
│   │   ├── page.tsx             # Główna strona — składa sekcje w kolejności
│   │   ├── globals.css          # Tailwind + tokeny kolorów + animacje
│   │   └── jak-to-dziala/       # Podstrona "Jak to działa?"
│   │       ├── page.tsx         # Server Component wrapper
│   │       └── PageContent.tsx  # Client Component — pełna treść strony
│   └── components/
│       ├── Navbar.tsx           # Client Component — hamburger mobile
│       ├── Hero.tsx
│       ├── TechLogos.tsx        # Loga technologii (Gemini, Bright Data, Next.js)
│       ├── Problem.tsx
│       ├── Solution.tsx         # Bridge problem→produkt, RadarIllustration
│       ├── HowItWorks.tsx
│       ├── Features.tsx         # 4 sekcje: Wymiary, Benchmark, Before/After, Eksport
│       ├── ForWho.tsx           # 3 grupy docelowe
│       ├── ClosingCta.tsx
│       ├── RadarIllustration.tsx # Shared — używany w Hero i Solution
│       ├── Footer.tsx
│       ├── CtaSection.tsx       # Reusable CTA section
│       ├── SocialProof.tsx      # UKRYTA (ławka rezerwowa)
│       ├── Pricing.tsx          # UKRYTA (ławka rezerwowa)
│       ├── ReportExample.tsx    # UKRYTA (ławka rezerwowa)
│       └── FAQ.tsx              # UKRYTA (ławka rezerwowa)
```

---

## Strony

### HP (`page.tsx`)

```
Navbar → Hero → TechLogos → Problem → Solution → HowItWorks → Features → ForWho → ClosingCta → Footer
```

**Logika kolejności (AIDA + marketing psychology):**
1. **Hero** — hak, CTA, uwaga
2. **TechLogos** — wiarygodność technologiczna
3. **Problem** — agitacja bólu (3 kafle + zamknięcie jako akapit)
4. **Solution** — CitationOne jako odpowiedź na problem
5. **HowItWorks** — redukcja lęku przed złożonością ("to tylko 3 kroki") + CTA
6. **Features** — budowanie pożądania (deep-dive: wymiary, benchmark, before/after, eksport)
7. **ForWho** — self-identyfikacja ("to jest właśnie dla mnie")
8. **ClosingCta** — ostatni impuls dla tych co przewinęli do końca
9. **Footer**

### Jak to działa (`/jak-to-dziala`)

Osobna podstrona z pełnym opisem narzędzia: 3 kroki, CQS + Citability, 10 wymiarów (karty z medium + expert opisem), Benchmark SERP, Before/After, AI Overview Coverage, Graf wiedzy, Eksport, CTA.

---

## Sekcje ukryte (ławka rezerwowa)

Gotowe komponenty, **wykluczone z `page.tsx`** na start serwisu. Aby włączyć — odkomentować import i JSX w `page.tsx`.

| Komponent | Plik | Zawartość | Gdzie wstawić |
|-----------|------|-----------|---------------|
| `SocialProof` | `src/components/SocialProof.tsx` | Stats bar (4 liczby) + 3 testimoniale | Po `Features`, przed `ForWho` |
| `ReportExample` | `src/components/ReportExample.tsx` | Przykład raportu | Po `Features`, przed `ForWho` |
| `Pricing` | `src/components/Pricing.tsx` | 3 pakiety cenowe (490 / 890 / 1590 zł) | Po `ForWho`, przed `ClosingCta` |
| `FAQ` | `src/components/FAQ.tsx` | Akordeon z 5 pytaniami | Po `Pricing`, przed `ClosingCta` |

---

## Wymiary — nazwy PL

Wszystkie nazwy wymiarów w UI, RadarIllustration, Features, FAQ i stronie /jak-to-dziala po polsku:

| ID | Label PL (UI) | Opis |
|----|---------------|------|
| CSI-A | Zgodność z intencją | Dopasowanie do intencji wyszukiwania |
| D1 | Gęstość informacji | Stosunek faktów do "puchu" |
| D2 | Graf wiedzy | Struktura encja-atrybut-wartość (EAV) |
| D3 | BLUF | Odpowiedź na początku sekcji |
| D4 | Autonomiczność sekcji / Chunki | Jakość podziału na fragmenty RAG |
| D5 | Koszt ekstrakcji | Łatwość pobrania informacji przez AI |
| D6 | TF-IDF | Nasycenie terminologią branżową |
| D7 | Role semantyczne | Perspektywa narracyjna (CE jako podmiot) |
| D8 | Pokrycie AI Overview | Pokrycie sub-zapytań i AI Overview |
| D9 | Wysiłek redakcyjny | Struktura, formatowanie, multimedia |
| EEAT | E-E-A-T | Doświadczenie, ekspertyza, autorytet |

**RadarIllustration** używa skróconych etykiet: Intencja, Gęstość, Graf, BLUF, Chunki, Ekstrakcja, TF-IDF, Role, AIO, Wysiłek.

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

- **Logotyp PNG:** zaciągany z `https://app.citationone.com/logo.png` — używany w Navbar (height 36px) i Footer (height 28px)
- **Favicon SVG:** `src/app/icon.svg` — teal speedometer z cudzysłowem

### Typografia

- Nagłówki sekcji: `clamp(1.6rem, 3.5vw, 2.2rem)`, `fontWeight: 600`, `letterSpacing: -0.025em`
- H1 Hero: `clamp(2.4rem, 4.56vw, 3.6rem)`, `fontWeight: 700`, `letterSpacing: -0.03em`
- Etykiety sekcji (`SectionLabel`): `fontSize: 11`, `fontWeight: 600`, `textTransform: uppercase`, `letterSpacing: 0.08em`, kolor `#818898`
- Body: 14-17px, `color: #36394a` lub `#666d80`, `lineHeight: 1.65-1.7`
- Navbar linki: `fontSize: 15px`, `fontWeight: 500`
- Navbar CTA: `fontSize: 15px`, `fontWeight: 600`, `padding: 10px 20px`

### Spacing sekcji

- Standardowy padding: `padding: '58px 0'`
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

---

## Komponenty — szczegóły

### Navbar

- **Client Component** (`'use client'`, `useState` dla mobile menu)
- Sticky, `backdrop-filter: blur(16px)`, border-bottom, height `64px`, maxWidth `1024`
- Logo: `<img src="https://app.citationone.com/logo.png" height={36} />`
- Desktop (`sm:flex`): linki "Jak to działa?" (`/jak-to-dziala`), "Dla kogo?" (`#dla-kogo`) + CTA "Zrób audyt" → `APP_URL/login`
- **Mobile (`<sm`):** hamburger 44x44px, panel z linkami + full-width CTA. Auto-close po kliknięciu linku.
- Touch targets: CTA desktop `padding: 10px 20px` (~44px), mobile linki `padding: 14px 0` (~48px), mobile CTA `padding: 14px 20px`

### Hero

- `'use client'` — animacje, `RadarIllustration` (shared)
- 2-column grid (`.hero-grid`, gap 72px): lewa — copy, prawa — karta z radarem
- H1: teal + gradient tekst, `clamp(2.4rem, 4.56vw, 3.6rem)`
- CTA: "Zrób audyt →" (primary teal, `padding: 14px 28px`, fontSize 15)
- Karta prawa: CQS 78/100 + Citability 4.9/10 z tooltipami, `RadarIllustration` (maxWidth 320)
- Responsive: 1 kolumna na <=768px

### Problem

- Sekcja turkusowa (gradient teal), `clipPath` skos, cudzysłowy dekoracyjne
- 3 kafle + zamknięcie, responsive 1 kolumna na <=768px

### Solution

- Centered layout: copy + CTA + karta z CQS/Citability + `RadarIllustration` (maxWidth 460)
- H2: "Narzędzie, które mierzy to, co AI naprawdę ocenia"
- CTA: "Zrób audyt →", `padding: 14px 28px`
- RadarIllustration z ikonami info (i) przy etykietach wskaźników — podpowiadają tooltip na hover

### HowItWorks

- Sekcja turkusowa, `clipPath`, 3 kroki z connectorami
- Krok 1: Wklej URL, Krok 2: AI analizuje (wymiary PL), Krok 3: Odbierasz raport (focus na Before/After + eksport)
- CTA: "Zrób audyt →" odwrócone kolory (biały na teal), `padding: 14px 28px`

### Features

- **4 sekcje** (usunięte AI Overview Coverage i Graf wiedzy z HP):
  1. **10 wymiarów** (`#f8fafb`) — nazwy PL, responsive grid (3col → 2col → 1col)
  2. **Benchmark SERP** (`#ffffff`) — `.feat-grid`
  3. **Before/After** (`#f8fafb`) — responsive grid (2col → 1col na mobile)
  4. **Eksport PDF** (`#ffffff`) — PDF + Markdown

### ForWho

- Sekcja turkusowa, 3 karty:
  - **Specjalista SEO** — 10 wymiarów, benchmark, Before/After z wpływem na CQS
  - **Marketer / Content Manager** — zrozumiałe wyniki bez wiedzy technicznej, gotowe rekomendacje, PDF do zespołu
  - **Agencja / Freelancer** — nowa usługa, raport gotowy do wysłania, pakiet na fakturę
- H2: "Nie musisz być ekspertem, żeby audytować jak ekspert"

### ClosingCta

- Tło: `#ffffff`, border-top
- H2 + gradient CTA "Zrób audyt →" → `APP_URL/login`

### Footer

- Server Component, logo CitationOne + linki: "Jak to działa?" (`/jak-to-dziala`), "Dla kogo?" (`/#dla-kogo`), "Zrób audyt →" (`APP_URL/login`)
- Touch targets: `padding: 12px 14px` (~44px)

---

## USP i messaging

**3 kluczowe USP:**
1. Raport z rekomendacjami Before/After — dosłowny cytat + gotowa poprawka z szacowanym wpływem na wynik
2. 10 wymiarów AI Search po polsku + E-E-A-T, benchmark top 10 SERP
3. Rzetelna analiza ręczna = godziny eksperckiej pracy → w narzędziu <3 minuty

**Grupy docelowe:**
- Specjaliści SEO
- Marketerzy / Content Managerowie (nie muszą być ekspertami)
- Agencje i freelancerzy SEO

---

## APP_URL

```ts
const APP_URL = 'https://app.citationone.com';
```

Zdefiniowany lokalnie w każdym komponencie który linkuje do aplikacji. Linki:
- Logowanie / CTA: `APP_URL/login`
- Rejestracja: `APP_URL/register`

---

## Konwencje kodowania

- Wszystkie style inline (`style={{ }}`) — brak CSS modules, brak zewnętrznych klas Tailwind poza układem
- Tailwind używany tylko do klas układu: `flex`, `items-center`, `gap-*`, `hidden sm:flex`, `w-full`, `relative`, `overflow-hidden`, itp.
- Responsywność przez `<style>` tag z `@media` w komponentach używających custom grid
- Ikony: JSX SVG inline, `fill="none"`, `viewBox="0 0 24 24"`, `strokeWidth={1.0}` (ikony w sekcjach turkusowych), `strokeWidth={1.8}` (inne karty) lub `{2.5}` (przyciski)
- `'use client'` — wszystkie komponenty z animacjami Framer Motion, `useState` lub event handlers
- Brak emoji w UI
- `RadarIllustration` — shared component, 10 osi, etykiety PL z ikonami info (i). Hover tooltip z definicją wskaźnika (teal `#0b7983`). Używany w Hero (`maxWidth={320}`) i Solution (`maxWidth={460}`).

## RWD / Mobile

- **Breakpoint:** `sm:` (640px) dla Navbar, `768px` (`@media`) dla gridów
- **Navbar mobile:** hamburger + panel, auto-close, full-width CTA
- **Touch targets:** min 44px na wszystkich CTA i linkach nawigacyjnych
- **Gridy:** `.dims-grid` (3→2→1col), `.ba-grid` (2→1col), `.feat-grid` (2→1col), `.problem-grid` / `.forwho-grid` / `.howitworks-grid` (3→1col)
- **Hero CTA:** `padding: 14px 28px` (~48px height)
