# CLAUDE.md - CitationOne LP

## Opis projektu

Landing page dla narzędzia **CitationOne** (`citationone.com`) - webapp do audytu contentu pod kątem GEO, czyli widoczności w odpowiedziach AI (ChatGPT, Perplexity, Google AI Overview, Bing Copilot).

**Terminologia w copy (od 2026-09-17):** wszędzie **GEO**, nigdy „AI Search" - zamiana objęła teksty, metadane, `src/data/*` i ilustracje w obu językach. GEO nazywa **sposób optymalizacji** („audyt GEO", „wytyczne dla GEO", „w GEO liczy się…" - tak jak mówi się „w SEO"). Tam, gdzie zdanie wskazuje **miejsce**, w którym zdobywa się ruch albo cytowania, stoi „odpowiedzi AI" / „AI answers" („Pozyskaj ruch z odpowiedzi AI", „Widoczność w odpowiedziach AI"). Nowe copy trzyma ten podział - „ruch z GEO" i „cytowanie w GEO" to błąd.

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

**Build pobiera changelog z aplikacji** (od 2026-11-10): `/changelog`, `/pl/changelog` i `/knowledge/log.md`
czytają `https://app.citationone.com/api/public/changelog` w czasie builda, a błąd pobrania **przerywa build**.
Bez sieci albo przed wdrożeniem endpointu podmień adres: `CHANGELOG_ENDPOINT=http://localhost:3000/api/public/changelog npm run build`
(lokalna aplikacja) albo dowolny serwer zwracający `{ "entries": [...] }`.

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
│   │   ├── sitemap.ts           # out/sitemap.xml (48 URL-i bez wpisów bloga + hreflangi); wymaga dynamic='force-static'
│   │   ├── robots.ts            # out/robots.txt — wskazuje sitemapę
│   │   ├── llms.txt/route.ts    # out/llms.txt (llmstxt.org) - treść z lib/knowledge.ts
│   │   ├── knowledge/[...path]/route.ts # out/knowledge/**.md - paczka Open Knowledge Format v0.2
│   │   ├── tools/[slug]/        # 4 podstrony narzędzi EN — hub /tools usunięty 2026-08-24
│   │   ├── (en)/api/            # EN "API" (/api) — grupa routingu, NIE `src/app/api/`
│   │   │   ├── page.tsx         #   (patrz nota "Zakladka API" nizej)
│   │   │   └── ApiContentEN.tsx
│   │   ├── (en)/affiliate/      # EN "Referral program" (/affiliate)
│   │   ├── (en)/changelog/      # EN "Changelog" (/changelog) - ChangelogPage + lib/changelog.ts
│   │   ├── blog/                # EN blog: page.tsx (/blog) + [slug]/page.tsx (/blog/<slug>)
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
│   │       ├── affiliate/       # PL "Program poleceń" (/pl/affiliate)
│   │       ├── changelog/       # PL "Nowości" (/pl/changelog)
│   │       ├── blog/            # PL blog: /pl/blog + /pl/blog/<slug>
│   │       └── api/             # PL "API" (/pl/api)
│   │           ├── page.tsx
│   │           └── ApiContent.tsx
│   ├── lib/
│   │   ├── languageSwitch.ts    # STATIC_PAIRS: pary EN<->PL dla przełącznika, hreflangów i sitemapy
│   │   ├── lpSettings.ts        # fetchLpSettings - runtime z app /api/public/lp-links (raport, liczby, pasek)
│   │   ├── changelog.ts         # getChangelog - build-time z app /api/public/changelog
│   │   ├── knowledge.ts         # llms.txt + paczka OKF (/knowledge) z src/data/* i changelogu
│   │   ├── blog.ts              # Markdown wpisu -> HTML przy buildzie (marked), spis treści, czas czytania
│   │   ├── blogSeo.ts           # metadane, JSON-LD, generateStaticParams stron bloga (oba języki)
│   │   ├── socialMeta.ts        # OG/Twitter dla każdej strony
│   │   └── appUrl.ts, attribution.ts, track.ts, reveal.ts, useReportUrl.ts, useTypewriterPlaceholder.ts
│   ├── data/                    # Treść podstron (czyste dane, zero JSX)
│   │   ├── dimension-types.ts   # Typy + STRINGS_PL/STRINGS_EN + DIMENSION_SLUG_PAIRS (hreflang)
│   │   ├── dimensions-pl.ts     # 12 wymiarów PL
│   │   ├── dimensions-en.ts     # 12 wymiarów EN (lustro)
│   │   ├── tool-types.ts        # Typy narzędzi + TOOL_STRINGS_* + TOOL_SLUG_PAIRS
│   │   ├── tools-pl.ts          # 4 narzędzia PL
│   │   ├── tools-en.ts          # 4 narzędzia EN (lustro)
│   │   └── blog.ts              # Rejestr wpisów bloga: daty, slugi i tytuły PL/EN, BLOG_SLUG_PAIRS
│   └── components/
│       ├── NoticeBar.tsx        # Shared - pasek komunikatu nad navbarem, treść z panelu /admin/lp
│       ├── ChangelogPage.tsx    # Shared - lista zmian (/changelog i /pl/changelog)
│       ├── McpContent.tsx       # Shared - podstrona serwera MCP (/mcp i /pl/mcp), komponent serwerowy
│       ├── BlogIndex.tsx        # Shared - lista wpisów bloga
│       ├── BlogPostView.tsx     # Shared - wpis bloga + style treści (.blog-prose)
│       ├── BlogCopy.ts          # Etykiety szablonów bloga PL/EN, autor, formatDate
│       ├── BlogStickyCta.tsx    # CTA podążające: karta sticky (≥1180 px) i belka na dole (<1180 px)
│       ├── DimensionPage.tsx    # Shared - szablon podstrony wymiaru (PL i EN przez prop `t`)
│       ├── ToolPage.tsx         # Shared - szablon podstrony narzędzia
│       ├── Navbar.tsx           # PL Navbar - switcher EN → /
│       ├── Hero.tsx
│       ├── TechLogos.tsx
│       ├── Showcase.tsx         # Mockup panelu (sam mockup, bez copy) - na HP
│       ├── ShowcaseDeck.tsx     # Shared - karuzela 3 ekranow panelu (strzalki + kreski + swipe + powiekszenie po kliku)
│       ├── StatsBand.tsx        # Shared (prop `lang`) - pas 3 liczb social proof, na HP pod Showcase
│       ├── Testimonials.tsx     # Shared (prop `lang`) - karuzela opinii zaraz pod HeroBand, treść z panelu /admin/lp
│       ├── CqsScoreCard.tsx     # Shared - kafelek CQS (Problem na HP + /pl/wymiary i /dimensions)
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
| `/` | EN HP (komponenty EN) | GEO Content Audit Tool - CitationOne |
| `/how-it-works` | PageContentEN | How does CitationOne work? |
| `/pricing` | PricingContentEN | Pricing |
| `/dimensions` | DimensionsContent | 10 content quality dimensions + E-E-A-T |
| `/dimensions/[slug]` | DimensionPage + dimensions-en.ts | H1 = title, np. `What is BLUF in SEO and GEO?` |
| `/tools/[slug]` | ToolPage + tools-en.ts | H1 = title, fraza sprzedażowa `… tool for SEO`, np. `Keyword clustering tool for SEO` |
| `/api` | ApiContentEN | CitationOne API - audyty GEO przez REST |
| `/affiliate` | AffiliateContentEN | CitationOne referral program - 10% on every order |
| `/changelog` | ChangelogPage (`lang="en"`) | CitationOne changelog - what is new in the GEO audit |
| `/mcp` | McpContent (`lang="en"`) | CitationOne MCP server - GEO audits in Claude and Cursor |
| `/blog` | BlogIndex (`lang="en"`) | Blog - GEO and SEO guides |
| `/blog/[slug]` | BlogPostView + data/blog.ts + content/blog/en/*.md | H1 = `title` z rejestru |
| `/llms.txt` | route handler + lib/knowledge.ts | - (plik tekstowy dla agentów AI) |
| `/knowledge/*.md` | route handler + lib/knowledge.ts | - (paczka OKF, 23 pliki) |

### PL (katalog /pl)

| URL | Komponent | Title |
|-----|-----------|-------|
| `/pl` | PL HP (komponenty PL) | Narzędzie GEO do audytu treści - CitationOne (jedyna strona z marką w title) |
| `/pl/jak-to-dziala` | PageContent PL | Jak działa CitationOne? |
| `/pl/cennik` | PricingContent PL | Cennik |
| `/pl/wymiary` | WymiaryContent PL | 10 wymiarów jakości treści + E-E-A-T |
| `/pl/wymiary/[slug]` | DimensionPage + dimensions-pl.ts | H1 = title, np. `Czym jest BLUF w SEO i GEO?` |
| `/pl/narzedzia/[slug]` | ToolPage + tools-pl.ts | H1 = title, fraza sprzedażowa `Narzędzie do … dla SEO`, np. `Narzędzie do klasteryzacji słów kluczowych dla SEO` |
| `/pl/api` | ApiContent PL | API CitationOne - audyty GEO przez REST |
| `/pl/affiliate` | AffiliateContent PL | Program poleceń CitationOne - 10% prowizji od każdego zamówienia |
| `/pl/changelog` | ChangelogPage (`lang="pl"`) | Nowości w CitationOne - changelog audytu GEO |
| `/pl/mcp` | McpContent (`lang="pl"`) | Serwer MCP CitationOne - audyty GEO w Claude i Cursorze |
| `/pl/blog` | BlogIndex (`lang="pl"`) | Blog - poradniki GEO i SEO |
| `/pl/blog/[slug]` | BlogPostView + data/blog.ts + content/blog/pl/*.md | H1 = `title` z rejestru |

Nowa statyczna podstrona = para w `STATIC_PAIRS` ([src/lib/languageSwitch.ts](src/lib/languageSwitch.ts)):
z niej biorą się przełącznik języka, hreflangi (`alternatesFor`) i wpis w sitemapie.

### Zakładka API (`/api` i `/pl/api`)

Podstrona dla programistów: opis publicznego API v1 aplikacji + dwa wyjścia dokumentacji —
`https://app.citationone.com/api-docs` (HTML) i `https://app.citationone.com/api-docs.md`
(`text/markdown` dla agentów AI). Oba adresy są **publiczne** (`PUBLIC_PATHS` w middleware głównej
apki) i powstają z jednego źródła `lib/api/docs-content.ts` — kontrakt opisany w
`../ai-auditor/spec/public-api.md`. Linki: Navbar (w rozwijanym menu „Audyt treści", desktop
i mobile — API zleca wyłącznie audyty) i Footer, w obu językach.

⚠️ **Gotcha — EN wersja NIE może leżeć w `src/app/api/`.** Next traktuje ten katalog jak API routes
i przy `output: 'export'` build wywala się na `PageNotFoundError: Cannot find module for page:
/_document` (etap „Collecting page data"). Strona leży więc w grupie routingu
[src/app/(en)/api/](<src/app/(en)/api/page.tsx>) — URL pozostaje `/api`. PL (`/pl/api`) problemu nie ma.

**Dokumentacja jest po angielsku** (od `v1.2`, 2026-08-14 — wcześniej PL). Strona PL ma o tym jedno
zdanie w sekcji o wersji Markdown; strona EN nie potrzebuje żadnej adnotacji.

Siatka cech na LP odwzorowuje kontrakt z `../ai-auditor/src/lib/api/version.ts` — przy bumpie
`API_VERSION` **sprawdź, czy nie doszła funkcja warta karty**. Stan na 2026-09-10 (`v1.2`): dziesięć
kart pokrywa klucz + zakresy (`403 insufficient_scope`), pracę w tle, webhooki, audyt treści podanej
wprost, pełne DTO, zlecenia masowe, tag `project` z listą i filtrami (`GET /projects`, `?project`,
`?status`, `?domain`, `createdAfter`/`createdBefore`), udostępnianie z wygasaniem i rozliczenie
w kredytach. Świadomie bez karty: `Idempotency-Key`, nagłówki `X-RateLimit-*`, `GET /me` — to
szczegóły dla kogoś, kto już czyta dokumentację, nie argumenty sprzed decyzji.

**Limitów liczbowych na tej stronie NIE publikujemy** (ta sama zasada co na podstronach narzędzi):
cap 50 URL-i w paczce i zakres 50–200 000 znaków treści zeszły 2026-09-10. Obie liczby żyją w kodzie
(`MAX_URLS`, `MIN_CONTENT_LEN`/`MAX_CONTENT_LEN`) i w dokumentacji API, więc LP tylko powtarzała je
z opóźnieniem — a przed zakupem nikt nie decyduje na ich podstawie.

Numeru wersji celowo NIE ma w copy: LP jest statyczne i zwietrzałoby przy pierwszym
bumpie; w pasku bloku kodu jest `api/v1`, czyli prefiks ścieżki, który zmienia się tylko przy zmianie łamiącej.

### Zakładka MCP (`/mcp` i `/pl/mcp`, od 2026-11-11)

Podstrona serwera MCP aplikacji (`app.citationone.com/api/mcp`, Streamable HTTP, ten sam klucz API i kredyty) - [McpContent.tsx](src/components/McpContent.tsx), jeden komponent serwerowy dla obu języków, bez framer-motion (pojawianie przez `reveal`). Sekcje: hero z CTA (instrukcja `/api-docs#mcp` + rejestracja), przykładowa rozmowa z wywołaniami narzędzi, konfiguracja dla Claude Code / Cursor / Claude Desktop, tabela 4 narzędzi (`start_audit`, `get_audit`, `list_audits`, `get_credits`) z odpowiednikami w REST, karty zasad, CTA i link do `/api`. **Fakty z `../ai-auditor/spec/public-api.md` §17 i sekcji `mcp` w `lib/api/docs-content.ts`** - nowe narzędzie po stronie aplikacji (etap 5: `apply_recommendations`, `share_audit`, `detect_keyword`, OAuth) = aktualizacja `TOOLS`/`SETUP` w komponencie. **Sekcja skilla** (`#skill`, link w hero): skill Claude z aplikacji (`../ai-auditor/public/skills/citationone/SKILL.md`, publiczny pod `app.citationone.com/skills/citationone/SKILL.md` dzięki `/skills` w `PUBLIC_PATHS` middleware) - lista tego, co robi (streszczenie pliku: potwierdzenie kosztu, kontrola niedawnego audytu, wynik na tle top 10 z progiem 5 pkt, lista priorytetów dla klienta, przed/po, szablon podsumowania), polecenie instalacji `curl`, instrukcja dla claude.ai i przycisk pobrania. Zmiana treści skilla = aktualizacja `skillItems`. **Przykładowa rozmowa jest animowana** ([McpChatDemo.tsx](src/components/McpChatDemo.tsx), jedyny kliencki kawałek strony): start po wjechaniu w widok, wiadomość użytkownika pisze się znak po znaku, chipy narzędzi ze spinnerem przechodzą w ptaszek, a potem pojawia się odpowiedź. Cała treść jest w HTML od początku i chowa się przez `opacity`/`visibility`, więc wysokość pudełka jest stała (zmierzone: ±2 px). Bez JS (`<noscript>`) i przy `prefers-reduced-motion` widać całość od razu. **Nie obiecywać na LP (stan 2026-11-11):** logowania kontem bez kopiowania klucza (OAuth), wpisu w katalogu konektorów Claude/ChatGPT, „Wdrożenia w treść” ani linków publicznych przez MCP. Limitów liczbowych (3 audyty naraz, 20 startów/min) nie publikujemy - ta sama zasada co na `/api`. Skill nie działa w Cursorze (tam sam MCP). Klucz API: w panelu **Ustawienia → API** (`/developers`). Linki: menu „Audyt treści” (pod API), stopka („MCP”), wzajemne linki `/api` ↔ `/mcp`, `llms.txt` (sekcja API). Skill jest też w `llms.txt`. Slug `mcp` jest taki sam w obu językach (nazwa własna).

### Navbar — wejścia do aplikacji

**Stan obecny (sprawdzony w kodzie 2026-11-10)** - dwa wejścia zamiast jednego „Zrób audyt":

| | Desktop | Mobile |
|-|---------|--------|
| Pasek | „Zaloguj się" / „Log in" (`/login`) + wypełniony „Wypróbuj za darmo" / „Try for free" (`/register`) | tekstowy link „Wypróbuj za darmo" / „Try for free" (`/register`) obok hamburgera |
| Menu | — | na dole: wypełniony „Wypróbuj za darmo" (`/register`), pod nim „Zaloguj się" (`/login`) |

Adresy: `APP_URL/login?lang={pl|en}` i `APP_URL/register?lang={pl|en}`. Powód zmiany jest w komentarzu
w `Navbar.tsx`: wracający użytkownik nie miał gdzie kliknąć, a nowy nie widział, że start jest darmowy.

Rozwijane menu „Audyt treści" (`AUDIT_MENU`, desktop i mobile): Jak działa audytor?, Wymiary oceny,
Audyt masowy, API, **Serwer MCP** (od 2026-11-11), **Nowości / Changelog** (od 2026-11-10). Za menu „Cennik” stoi zwykły link **„Blog”** (desktop i mobile).
Stopka linkuje te same podstrony oprócz changelogu (zdjęty ze stopki 2026-11-10 na prośbę usera) i ma „Blog”.
**Reguła: bez wpisów w danym języku NIE ma linku „Blog”** - ani w menu (desktop i mobile), ani w stopce, a lista tego języka wypada z sitemapy. Steruje tym `HAS_BLOG_POSTS` w [src/data/blog.ts](src/data/blog.ts), więc link pojawia się sam po dodaniu pierwszego wpisu (stan 2026-11-10: PL ma wpisy, EN jeszcze nie).
**Link „Blog” na pasku znika między 820 a 869 px** (`.nav-blog`): w PL zawijał przyciski konta do dwóch linii (64 px) od 820 do 849 px.

Notatki poniżej opisują wcześniejszy etap („Zrób audyt" → `/login`) i zostają jako historia decyzji.

- **Etykieta to „Zrób audyt", nie „Zaloguj" (2026-09-16).** Nawigacja nie oferuje osobnego wejścia
  do logowania: adres jest ten sam, a wracający użytkownik i tak trafia na ekran, który go zaloguje.
  Wcześniej menu mobile miało dwa przyciski („Załóż darmowe konto" + ghost „Logowanie") — zostały
  zastąpione jednym wypełnionym CTA, a styl `.nav-mobile-cta-ghost` usunięty jako martwy.

- **Link na mobile jest TEKSTOWY, nie wypełnionym przyciskiem** (decyzja z 2026-09-08): nad zgięciem
  stoi już „Zrób audyt" przy inpucie i prowadzi pod ten sam `/login`; drugi przycisk w akcencie
  rozmywałby hierarchię. Kupuje jedno: użytkownik nie musi otwierać hamburgera i przewijać
  pod pozycje menu. Rejestrację obsługują hero i nota pod inputem.
- **Kontener `.nav-mobile-right` musi mieć własną regułę w `@media (max-width: 819px)`** — próg paska
  jest szerszy niż Tailwindowe `md` (768 px), więc samo `md:hidden` gasiłoby go w przedziale 768–819 px,
  dokładnie tak jak wcześniej trzeba było ratować `.nav-burger`.
- Miejsca starcza: przy 320 px między logo (w szczycie animacji „CitationNone?") a linkiem zostaje
  ~30 px luzu; link ma `white-space: nowrap` i 44 px pola trafienia.

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
- **Udostępnienia (OG/Twitter) - ZAWSZE przez `socialMeta()`** z [lib/socialMeta.ts](src/lib/socialMeta.ts) (od 2026-10-30): `...socialMeta({ lang, path, title, description })` w `metadata`/`generateMetadata` każdej strony z własnym tytułem do udostępnień. Next **zastępuje** obiekt `openGraph` z layoutu zamiast go uzupełniać - goły `openGraph: { title, description }` na podstronie gubił `og:url`, `og:site_name`, `og:locale`, `og:type` i grafikę, a `twitter:title` pokazywał tytuł strony głównej. Grafiki 1200×630: `public/og/og-pl.png` i `og-en.png` (logo z aplikacji, nagłówek z hero, linijka o produkcie; wyrenderowane z HTML Puppeteerem). `metadataBase` w root layoucie zamienia ścieżki względne w pełne adresy. Po zmianie grafiki odśwież podgląd w Facebook Sharing Debugger (cache Facebooka trzyma starą miniaturę).

### Kolejność sekcji HP (identyczna EN i PL)

```
Navbar → Hero → Showcase → StatsBand → Problem → HowItWorks → BulkAudit → TechLogos → DimensionsTeaser → ReportSection → ForWho → FAQ → AuthorSection → ClosingCta → Footer

**BulkAudit stoi zaraz po HowItWorks** (przeniesiony z pozycji 8 dnia 2026-09-20): skala jest częścią odpowiedzi na „jak to działa", a nie dodatkiem na końcu strony. Hero i krok 01 obiecują trzy wejścia (link, lista URL-i, sitemapa) plus API, więc sekcja o audycie masowym musi stać tam, gdzie czytelnik o nie pyta.
```

Pliki: PL [page.tsx](src/app/pl/page.tsx), EN [page.tsx](src/app/page.tsx) (komponenty EN w `src/components/en/*EN.tsx`).

**Showcase** ([Showcase.tsx](src/components/Showcase.tsx) / [en/ShowcaseEN.tsx](src/components/en/ShowcaseEN.tsx)) - mockup panelu w ramce urządzenia (cienki bezel, metaliczna krawędź, połysk), wygaszany przez `maskImage` **tylko na ostatnich 8% wysokości** (od 2026-09-19; wcześniej 40% → 76% zjadało połowę zrzutu). Bez copy/CTA. Umieszczony zaraz po Hero - górny kawałek mockupu widoczny above the fold (Showcase `padding: 76px 0 96px`; górne 76px zeszło było na 26px, gdy adnotacja stała NAD urządzeniem i dziura pod Hero robiła się za duża — po przeniesieniu pastylki pod ekran wróciło na 76px; Hero zredukowany: bez `minHeight`/flex-center, `padding: 40px 24px 28px`). Mockup wjeżdża od dołu po 0,3 s (od 2026-10-18; wcześniej 1 s) - animacją CSS (`deck-rise` w `ShowcaseDeck`), nie framer-motion; patrz „Wydajność na telefonie” niżej.

Na ekranie leżą **trzy slajdy** (od 2026-09-04) w kolejności pracy z audytem: Podsumowanie → Rekomendacje → Wdrożenie w treść. Karuzelę trzyma wspólny [ShowcaseDeck.tsx](src/components/ShowcaseDeck.tsx) - `Showcase`/`ShowcaseEN` podają mu tylko slajdy i etykiety (ten sam wzorzec co `DimensionPage` z propem `t`). Slajd zmienia się **wyłącznie na ruch użytkownika** - autoodtwarzania nie ma (usunięte 2026-09-08 wraz z pauzą na hover i obsługą `prefers-reduced-motion`, bo nie było już czego pauzować). Wejście otwiera się na **Podsumowaniu** (`startIndex={0}` podawany z `Showcase`/`ShowcaseEN`; od 2026-11-10, wcześniej `1` = Rekomendacje). Sterowanie: **strzałki** na ekranie, **kreski pozycji** w adnotacji i swipe/drag; pigułek z nazwami zakładek świadomie nie ma (decyzja z 2026-09-04). Talia się nie zapętla - strzałka na krańcu gaśnie (`opacity: 0` + `pointer-events: none`). **Powiększenie** (od 2026-11-10): klik w zrzut albo lupa w prawym górnym rogu ekranu otwiera okno z ostrym zrzutem bieżącego slajdu (portal do `body`, bez przechylenia 3D i filtrów mockupu, które rozmywają tekst; szerokość najwyżej naturalne 1520 px). Klik po przeciągnięciu taśmy nie otwiera okna (flaga z `onDragStart`). W oknie strzałki i klawisze ←/→, Esc, klik w tło, pułapka fokusu; na telefonie zrzut mobilny na pełną szerokość z przewijaniem w pionie.

- **Na telefonie (`MOBILE_QUERY` = `max-width: 640px`) karuzela pokazuje osobne, pionowe zrzuty** (od 2026-09-19): desktopowy zrzut 1900 px zmniejszony do ~300 px dawał tekst wielkości ~2 px. Każdy slajd ma `mobileSrc` podawany przez `<picture><source media>` - pliki `public/dashboard-{preview,recommendations,apply}{,-pl}-mobile.{webp,png}`, 780×1440 (390×720 @2x). PNG z paletą przez `sharp` (~50-90 KB); obok WebP **near-lossless** (`sharp().webp({ nearLossless: true, quality: 60 })`, piksel w piksel jak PNG, 10-40% lżejszy, od 2026-10-18). Zwykły stratny WebP wychodzi na tych zrzutach CIĘŻSZY od PNG z paletą. Ramka przechodzi w telefon (`.deck-device` max 300 px, większe promienie, ekran `aspect-ratio: 390 / 720`) - proporcja ekranu **musi** zgadzać się z plikiem, bo `object-fit: cover` przytnie tekst. Ten sam próg siedzi w `<source media>` i w CSS - rozjazd dałby pionowy zrzut w poziomej ramce. Preload dociąga wariant, który `<picture>` faktycznie pokaże (`matchMedia`).
  - **Jak zrobiono zrzuty mobilne:** Puppeteer (jest w `node_modules` LP) na publicznym raporcie `/share/…` (te same linki co `REPORT_URL_FALLBACK`), viewport 390×720 @2x. Kadry: Podsumowanie od karty CQS, Rekomendacje od nagłówka „WAŻNE (n)" (pierwsza karta z Przed/Po), Wdrożenie - legenda nad podglądem, a **iframe podglądu przewinięty do pierwszego bloku `.ins`** (w EN treść zaczyna się od nawigacji serwisu źródłowego). Pływający przełącznik „Pokaż PRZED/PO" siedzi w iframe - ukryty przed zrzutem. Strona raportu ma `scroll-behavior: smooth`, więc przewijanie musi iść z `behavior: 'instant'`.
  - **Na telefonie bez przechylenia 3D** (`--deck-tilt: 0deg` w media query zamiast 5deg): przechylenie rozmywało drobny tekst zrzutu.
  - **Strzałki na telefonie siedzą w pastylce pod urządzeniem** (`.deck-caption-arrow`, 36 px), a te na ekranie są ukryte - na wąskim zrzucie zasłaniały treść (np. etykietę „PRZED"). Wyłączona strzałka w pastylce ma `visibility: hidden`, nie `display: none`, żeby pastylka nie zmieniała szerokości na krańcach talii.
- **Pod urządzeniem stoi adnotacja** (przeniesiona spod Hero 2026-09-08) - kropka + nazwa widocznej zakładki (crossfade przez `AnimatePresence`) + trzy kreski pozycji + licznik `1/3`. Kreski **przeskakują wprost na wybrany slajd**: każda to `button` z `aria-label` równym nazwie zakładki, a pole trafienia (19 px) robi `padding` przycisku, nie sam 3-pikselowy pasek - dzięki temu wysokość pastylki się nie zmienia. Pudełko etykiety ma stałą wysokość, inaczej crossfade podskakuje.
- **Pastylka potrzebuje `position: relative` + `z-index: 1`.** Urządzenie ma `transform` i `filter`, więc tworzy kontekst układania i maluje się NAD zwykłymi blokami w przepływie - bez tego adnotacja przeniesiona pod mockup po prostu znika za nim, mimo że jest dalej w DOM. Od 2026-09-19 stoi **pod** urządzeniem (`marginBottom: 18` zamiast ujemnego marginesu): ekran jest widoczny w całości, więc pastylka nachodząca na niego zasłaniałaby treść zrzutu.
- **Pozycję taśmy trzyma `useMotionValue` + własne `animate()`, nigdy prop `animate={{ x }}`.** Przy propie framer po puszczeniu myszy ściąga taśmę do `dragConstraints` i - gdy indeks się NIE zmienił - nic jej stamtąd nie zabiera, bo React nie przerenderował: krótkie szarpnięcie na slajdzie 2 przerzucało widok na slajd 1, a adnotacja dalej pokazywała „2". Dlatego `onDragEnd` snapuje **zawsze**, także poniżej progu (`else go(index)`).
- **Strzałki centruje `margin-top: -19px`, NIGDY `transform: translateY(-50%)`.** W [globals.css](src/app/globals.css) siedzi globalne `button:active { transform: scale(0.97) }` - nadpisuje cały `transform`, więc strzałka centrowana transformem zjeżdżała na czas kliknięcia o pół swojej wysokości w dół. Własne wciśnięcie (`.deck-arrow:active`) jest wyłącznie skalą, bez składowej pionowej. Ta sama pułapka czeka każdy inny element pozycjonowany transformem, jeśli jest `<button>`.
- **Strzałki mają `onMouseDown={(e) => e.preventDefault()}`** - bez tego klik nadaje im focus, a przeglądarka dociąga zafokusowany przycisk do widoku. Tabem nadal się na nie wchodzi.
- **Przesunięcie liczymy w pikselach, nie w procentach** - szerokość ekranu mierzy `ResizeObserver` (a nie `getBoundingClientRect`, który przy `rotateX(5deg)` zwraca szerokość *rzutowaną*, o ~2% większą). `drag` operuje na pikselach i mieszanie jednostek na tej samej wartości `x` szarpie slajdem.
- **Do pierwszego pomiaru szerokości slajd startowy ustawia CSS `translate: -100% 0`** (osobna właściwość, nie gryzie się z `x`). Bez tego HTML pokazywał slajd pierwszy, a startowy - element LCP na telefonie - wjeżdżał dopiero po hydracji. Pierwszy pomiar zdejmuje `translate` w `useLayoutEffect`, żeby nie mignął slajd pierwszy.
- **Slajdy poza startowym są `loading="lazy"`, ale dociągane w `requestIdleCallback`** - lazy startuje dopiero, gdy obrazek wjeżdża w widok, więc bez tego pierwsze przełączenie pokazywałoby pusty ekran.
- **Ekran ma sztywne `aspectRatio: 1900 / 962`** - inaczej zmiana slajdu przesuwałaby sekcje poniżej. Wszystkie zrzuty są przycięte do tego rozmiaru; nowy slajd musi trzymać tę proporcję.
- Zrzuty desktopowe: `public/dashboard-preview{,-pl}.{webp,png}` (Podsumowanie), `dashboard-recommendations{,-pl}`, `dashboard-apply{,-pl}` - PL i EN osobno, **1520×770** (ekran ma 980 px, więc to ~1,55× i zapas na zmianę szerokości). Surowy zrzut z Windowsa waży ~500 KB, więc przepuszczaj go przez `sharp({ palette: true })`; docelowo WebP q82 (~60-95 KB) + PNG z paletą jako fallback (~110-150 KB).
- **Rozmiar pliku to nie jest tu główny koszt - liczy się pamięć po dekompresji** (2026-09-20). Trzy zrzuty 1900×962 trzymane naraz w DOM to ~88 MB tekstur (7,3 MP × 4 B każdy); po zejściu do 1520×770 jest ~13 MB. Na obciążonej przeglądarce to właśnie ten rachunek szarpie przewijaniem, a nie 150 KB transferu. Pomiar: `performance.getEntriesByType('resource')` dla transferu i `naturalWidth × naturalHeight × 4` dla pamięci. Profilowanie efektów sekcji (drop-shadow, maska, backdrop-filter, tło hero) przy 4× throttlingu CPU **nie pokazało winowajcy** - różnice mieściły się w szumie, więc nie wycinaj ich „na wszelki wypadek".
- Hover-zoom całego urządzenia **zniknął** wraz z karuzelą - zoom pod kursorem kłócił się z klikaniem strzałek na ekranie.

**StatsBand** ([StatsBand.tsx](src/components/StatsBand.tsx), wspólny dla PL i EN przez prop `lang`) - pas trzech liczb social proof pod `HeroBand` (pokaz 3 ekranów panelu; między nimi karuzela opinii, gdy jest włączona), przed sekcją Problem: użytkownicy / wykonane audyty / przeanalizowane strony. Liczby **ustawia admin w aplikacji** (zakładka admina `/admin/lp`, klucze `LP_STAT_USERS` / `LP_STAT_AUDITS` / `LP_STAT_PAGES`), LP dociąga je przez `fetchLpSettings`. `FALLBACK` w komponencie to wartości wypalone w HTML. Wartość z panelu to cyfry z opcjonalnym `+`; separatory tysięcy (PL twarda spacja, EN przecinek) i polską formę liczebnika (1 / 2-4 / 5+, przy `+` zawsze dopełniacz) dokłada komponent.

- **Liczby mają gradient** (`#1a3a4a → #0b7983 → #0b9aa6` przez `background-clip: text`), ten sam co „CitationOne" w sekcji Problem. Napis musi być `inline-block`: przy `display: block` tło rozciąga się na całą kolumnę i krótka liczba dostaje wyłącznie ciemny początek gradientu.
- **Dane idą tym samym zapytaniem co link przykładowego raportu** - `fetchLpSettings` ([src/lib/lpSettings.ts](src/lib/lpSettings.ts)) trzyma obietnicę na poziomie modułu, więc sekcje na jednej stronie nie dublują ruchu. Odpowiedź jest cache'owana przez CDN (`s-maxage=300`), więc zmiana z panelu wchodzi na stronę do 5 minut.

**Testimonials** ([Testimonials.tsx](src/components/Testimonials.tsx), dane w [src/lib/testimonials.ts](src/lib/testimonials.ts)) - karuzela opinii **zaraz pod `HeroBand`**, przed `StatsBand`, na `/` i `/pl`. Opinie (imię i nazwisko, stanowisko, treść, zdjęcie, opcjonalny link do profilu, wersja PL / EN / obie), ich kolejność, ukrywanie pojedynczych i **włącznik całej sekcji** są w panelu aplikacji: `/admin/lp`, karta „Opinie na citationone.com” (w ai-auditor: `lib/lp-testimonials.ts`, klucze `LP_TESTIMONIALS` + `LP_TESTIMONIALS_ENABLED`). Źródło: `app.citationone.com/api/public/testimonials`, zdjęcia z `/api/public/testimonials/photo/[id]?v=<skrót>`.
- **Dane idą dwiema drogami.** Strona główna jest `async` i pobiera opinie **w czasie builda** (`getTestimonialsAtBuild`, `cache: 'force-cache'` - `no-store` wywala static export), więc są w HTML: bez skoku układu i widoczne dla robotów. Błąd pobrania przy buildzie **nie przerywa builda**: strona powstaje bez opinii, a dociąga je przeglądarka. W przeglądarce `fetchTestimonials` czyta aktualny stan, więc nowa opinia albo wyłączenie sekcji wchodzi bez przebudowy (do 5 min cache CDN). Odpowiedź `enabled: false` chowa sekcję, a błąd endpointu zostawia opinie z builda. Zdjęcie przyjmujemy tylko z adresu endpointu aplikacji.
- **Bez opinii w danym języku sekcja się nie renderuje.** Wyjątek: w `npm run dev` przy pustej odpowiedzi strona pokazuje `DEV_SAMPLES` (przykładowe opinie do podglądu wyglądu). Pobierania w przeglądarce w dev nie ma, bo serwer i tak pobiera opinie przy każdym odświeżeniu. Build produkcyjny przykładów nie zawiera. `TESTIMONIALS_ENDPOINT` w env podmienia adres tylko dla builda. Lokalnie podgląd daje mock serwera (adres zdjęć musi mieć origin endpointu). Przy `NEXT_DIST_DIR=.next-build` eksport ląduje w `.next-build/`, nie w `out/`.
- **Karuzela:** poziomy pas z `scroll-snap`, swipe natywny. Strzałki (ukryte <640 px) i kropki przewijają o jedną kartę. Widać 3 karty od 1024 px, 2 od 641 px i 86% szerokości na telefonie, z podglądem następnej. Gdy wszystkie karty się mieszczą, strzałek nie ma, a karty są wyśrodkowane. Autoodtwarzanie co 7 s tylko, gdy sekcja jest na ekranie; zatrzymuje się na stałe po pierwszej interakcji, a przy `prefers-reduced-motion` nie startuje.
- **Treść jest przycięta do 5 linii** (karty mają być niskie - prośba 2026-11-12; cudzysłów siedzi jako znaczek na górnej krawędzi karty, nie w osobnym wierszu) z przyciskiem „Czytaj dalej” (pokazuje się tylko, gdy tekst się nie mieści). Bez tego jedna długa opinia rozciągała wszystkie karty w rzędzie. Akapity robi `white-space: pre-line` (pusta linia z panelu), a nie osobne `<p>`, bo line-clamp działa na jeden blok.
- **Zdjęcia:** panel sam przycina każde zdjęcie do kwadratu 240 px WebP. Bierze pod uwagę obrót EXIF z telefonu, przy pionowym zdjęciu kadruje wyżej (twarz) i zmniejsza krokami po maks. 2x, żeby krawędzie nie były poszarpane. LP pokazuje zdjęcie w kółku 38 px (`object-fit: cover`). Gdy obrazek się nie wczyta, pokazuje inicjały zamiast ikonki zepsutego obrazka; sprawdza też obrazek, który wywalił się przed hydratacją.
- **Bez schema `Review`/`AggregateRating`** - Google nie pokazuje opinii wystawionych sobie przez firmę na własnej stronie.

**Problem** ([Problem.tsx](src/components/Problem.tsx) / [en/ProblemEN.tsx](src/components/en/ProblemEN.tsx)) - „Jak AI ocenia Twoje treści?" / „How does AI rate your content?". Układ 2-kolumnowy (stack <768px, kolumny wyśrodkowane w pionie): lewa = label „Problem" + h2 + **kafelek CQS**, prawa = akapit. Nagłówek jest w skali `clamp(1.75rem, 3.4vw, 2.25rem)` - większy rozmiar rozpychał lewą kolumnę i kafelek wypadał poniżej akapitu. Kafelek to [CqsScoreCard.tsx](src/components/CqsScoreCard.tsx) z propem `compact` (niższe paddingi, wynik 30px zamiast 36px) i stopką: `avgLabel` („Średnia TOP 10: 40") + `link` „Zobacz konkurentów" → `/login`, bo listy konkurentów na LP nie ma i widać ją dopiero w raporcie. Bez `avgLabel`/`link` karta renderuje się jak na `/pl/wymiary` i `/dimensions`. Badge to `ŚREDNI` / `AVERAGE` - ta sama skala co `scoreStatus.warn` w aplikacji (dawne „UWAGA" czytało się jak ostrzeżenie systemowe). Niżej osobna sekcja z animacją `WordCycle` („CitatioNone?" → „CitationOne") i CTA.

**ReportSection** ([ReportSection.tsx](src/components/ReportSection.tsx) / [en/ReportSectionEN.tsx](src/components/en/ReportSectionEN.tsx)) - "Dane gotowe do wdrożenia". Układ 2-kolumnowy (stack <900px): lewa = label + h2 + opis + 3 punkty (Raport PDF / Audyt Schema / Historia rewizji) + CTA "Zobacz przykładowy raport"/"View sample report" (otwiera udostępniony raport online w nowej karcie, `target="_blank"`); prawa = podgląd raportu w papierowej ramce (cień, połysk, zanikanie ku dołowi przez `maskImage`, perspektywa, hover-zoom), też klikalny → raport. Linki **ustawia admin w aplikacji**, nie kod: `useReportUrl` ([src/lib/useReportUrl.ts](src/lib/useReportUrl.ts)) dociąga je w runtime z `app.citationone.com/api/public/lp-links` (przez współdzielone `fetchLpSettings` z [src/lib/lpSettings.ts](src/lib/lpSettings.ts) - jedno zapytanie na odsłonę dla wszystkich sekcji) (w aplikacji: zakładka admina `/admin/lp`, klucze `LP_REPORT_URL_PL` / `LP_REPORT_URL_EN`). Stałe `REPORT_URL_FALLBACK` w obu komponentach to wartość domyślna wypalona w HTML — zostaje, gdy aplikacja nie odpowie, pole jest puste albo odpowiedź nie wygląda jak link `…/share/…`. **LP jest statyczne, więc panelu logowania tu nie postawimy** — `citationone.com/admin` to 301 do panelu aplikacji (`public/_redirects`). Podgląd: `public/report-preview.png` (screenshot udostępnionego raportu web - score'y, profil 10 wymiarów, Quick Wins).

**NoticeBar** ([NoticeBar.tsx](src/components/NoticeBar.tsx)) - pasek komunikatu nad navbarem PL i EN (wywołanie w `Navbar.tsx` i `en/NavbarEN.tsx`). Treść **ustawia admin w aplikacji** (`/admin/lp`, karta „Pasek komunikatu na citationone.com”, klucze `LP_NOTICE_TEXT_PL/EN`, opcjonalnie `LP_NOTICE_LINK_PL/EN` i `LP_NOTICE_LINK_LABEL_PL/EN`), strona czyta ją z pola `notice` w `lp-links` przez `fetchLpSettings`. Pasek idzie na stronę tylko przy zaznaczonym checkboxie „Pokazuj pasek na stronie” (`LP_NOTICE_ENABLED`; odznaczenie zostawia treść). Pusty tekst = brak paska w tym języku. **Celowo bez fallbacku w kodzie** - przy błędzie endpointu pasek się nie pokazuje, zamiast pokazać nieaktualny komunikat. Pasek pojawia się po odpowiedzi i przesuwa stronę w dół o swoją wysokość. Komponent zostaje w kodzie na stałe; wyłączenie paska = odznaczenie checkboxa w panelu.

**Changelog** (`/changelog` i `/pl/changelog`, wspólny komponent [ChangelogPage.tsx](src/components/ChangelogPage.tsx), dane z [src/lib/changelog.ts](src/lib/changelog.ts)) - lista zmian produktu pogrupowana po miesiącach, z kotwicą na każdy wpis. Wpisy pochodzą z changelogu aplikacji przez `app.citationone.com/api/public/changelog` i są pobierane **w czasie builda**, więc lądują w statycznym HTML. Nowy wpis w aplikacji pojawia się na LP dopiero po deployu aplikacji i **ponownym buildzie LP**. Błąd pobrania przerywa build, żeby nie opublikować pustej strony. Zakres wpisów (od 2026-06-01) wyznacza aplikacja. Pauzy „—” ze starszych wpisów zamieniamy przy pobraniu na dywiz. Lokalnie adres podmienia `CHANGELOG_ENDPOINT`. Link w menu „Audyt treści” (w stopce już go nie ma), para w `STATIC_PAIRS`.

**Blog** (`/blog`, `/pl/blog`, od 2026-11-10) - poradniki pisane w Markdownie w repo i renderowane **przy buildzie**, więc cała treść jest w statycznym HTML.
- **Nowy wpis = dwa kroki:** obiekt w rejestrze [src/data/blog.ts](src/data/blog.ts) (`id`, `date`, opcjonalnie `updated`, a dla każdego języka `slug`, `title`, `description`) + plik `content/blog/<pl|en>/<slug>.md` dla każdego języka. Sam plik .md bez wpisu w rejestrze nie trafi na stronę. Metadane siedzą w TS, a nie we frontmatterze, bo pary slugów potrzebuje przełącznik języka w kliencie.
- **Plik .md zaczyna się od leadu, bez `#` H1** - H1 i opis pod nim daje szablon z rejestru (`#` w treści i tak schodzi do H2). H2 dostają kotwice bez polskich znaków (duplikaty: `-2`), a od 3 H2 pojawia się spis treści - **zwinięty domyślnie** (`<details class="blog-toc">`, bez JS, licznik sekcji w nagłówku).
- **Ramka „najważniejsze informacje” z żarówką** (`.blog-key`) powstaje sama z akapitu kończącego się dwukropkiem i zaczynającego od „Najważniejsze…”, „Kluczowe…”, „W skrócie…”, „Key takeaways…”, „Key points…” itp. (`KEY_LEAD` w `lib/blog.ts`), jeśli zaraz pod nim stoi lista. Tak pisze skill `lp-article`, więc artykuły nie potrzebują składni. Ramka w dowolnym innym miejscu: `> [!KEY] Opcjonalny tytuł` + treść cytatu (bez tytułu: „Najważniejsze informacje” / „Key takeaways”).
- **Obsługiwane formaty (GFM, `marked`):** nagłówki H2-H4, listy (zagnieżdżone, numerowane, zadania `- [x]`), cytaty, tabele z wyrównaniem, kod inline i bloki, obrazy (`loading=lazy`, pliki w `public/`), przekreślenie, linia pozioma, a jako surowy HTML `<figure>`/`<figcaption>`, `<iframe>`/`<video>` (zawsze 16:9 na szerokość kolumny), `<details>`, `<mark>`, `<kbd>`. Linki zewnętrzne dostają `target=_blank` + `noopener`. HTML z Markdowna **nie jest sanitizowany** - treść pisze zespół w repo.
- **Responsywność (zmierzona 320/375/820/1440 px):** brak przewijania strony w poziomie. Szeroka tabela przewija się we własnym pudełku `.blog-table`, długie adresy łamią się (`overflow-wrap: anywhere` w akapitach, `break-word` w komórkach - `anywhere` w tabeli rwał nagłówki w pół słowa). Na telefonie blok kodu idzie od krawędzi do krawędzi.
- **Build pilnuje:** brak pliku .md dla wpisu z rejestru, em dash w treści albo metadanych, zła data, zdublowany lub niepoprawny slug - każdy z tych błędów przerywa build z komunikatem.
- **CTA podążające na każdym wpisie** ([BlogStickyCta.tsx](src/components/BlogStickyCta.tsx)): od 1180 px układ dwukolumnowy (treść 740 px + karta 260 px z `position: sticky`, top 96 px), poniżej belka przyklejona do dołu ekranu (safe-area iOS, przycisk 44 px). Belka wjeżdża po przewinięciu nagłówka wpisu (`#blog-article-head`) i chowa się, gdy na ekran wchodzi końcowe CTA (`#blog-end-cta`), więc nie dubluje go i nie zasłania stopki. Kliknięcia liczy globalny `RegisterClickTracker` jako `register_click` - w `link_classes` widać `blog-side-cta` albo `blog-bar-cta`. **Pułapka:** `overflow-x: hidden` na html/body (globals.css) wyłącza `sticky`, dlatego strona wpisu nadpisuje go na `overflow-x: clip` (tylko tam; reszta LP bez zmian).
- **Wpis tylko w jednym języku** jest dozwolony: nie emituje hreflanga, a przełącznik języka prowadzi na listę wpisów drugiego języka (`plCounterpart`/`enCounterpart`). Pary obu wersji (`BLOG_SLUG_PAIRS`) zasilają przełącznik, hreflangi i sitemapę. Slugi po angielsku także w PL (zasada nowych route'ów).
- **Pusty język:** static export odrzuca `[slug]` bez ścieżek, więc `blogStaticParams` generuje wtedy zaślepkę `__empty` (404 z `noindex`, poza sitemapą i listą). Znika sama przy pierwszym wpisie.
- **Schema (jeden `@graph`, `lib/blogSeo.ts`):** `Organization` (`/#organization`, logo, `sameAs` LinkedIn + Facebook firmy), `WebSite`, `Person` autora (`/#wojciech-wladzinski-ulatowski`, zdjęcie, `worksFor`, **`sameAs` = LinkedIn**), `Blog`, a na wpisie `WebPage` + `BreadcrumbList` + `BlogPosting` (`wordCount`, `timeRequired`, daty, `workTranslation` do drugiej wersji językowej). Lista to `CollectionPage` + `Blog` z `blogPost`. Węzły wskazują się przez `@id`. JSON-LD idzie przez `jsonLdHtml` (`<` → `<`). Do tego `og:type=article` z datami i autor w nagłówku wpisu. Wpisy trafiają do sitemapy (`lastModified` = `updated` albo `date`) i do sekcji „Blog” w `llms.txt` (EN + wpisy tylko po polsku). Na końcu wpisu stoi CTA rejestracji i do 3 innych wpisów.

**llms.txt i paczka wiedzy OKF** ([src/lib/knowledge.ts](src/lib/knowledge.ts), route handlery `src/app/llms.txt/route.ts` i `src/app/knowledge/[...path]/route.ts`, od 2026-11-10) - `/llms.txt` w formacie llmstxt.org i paczka w Open Knowledge Format v0.2 pod `/knowledge/` (`index.md` z `okf_version`, `product.md`, `api.md`, `mcp.md` (serwer MCP i skill - fakty z `../ai-auditor/spec/public-api.md` §17, przy zmianie narzedzi aktualizuj razem z `McpContent.tsx`), `dimensions/*.md`, `tools/*.md`, `log.md` z changelogu). Oba generują się **przy buildzie** z `src/data/*` i changelogu aplikacji, więc nowy wymiar, narzędzie albo wpis changelogu trafia do nich sam. Paczka jest po angielsku; `llms.txt` wskazuje też wersję PL. Fakty produktu (opis, cennik, przykładowy raport) siedzą w stałej `PRODUCT` w `knowledge.ts` - przy zmianie cennika popraw je tam. Nagłówki `Content-Type` z `charset=utf-8` ustawia `vercel.json`. OKF nie definiuje sposobu odkrywania paczki na stronie, dlatego prowadzi do niej `llms.txt`. **Zweryfikowane z kodem aplikacji (2026-11-10), trzymaj się tego w tekstach dla agentów:** CQS to średnia ważona 10 wymiarów **plus E-E-A-T (waga 0,05) i metadanych** (title + meta description) - `calculateCQS` w `../ai-auditor/src/lib/scoring.ts`, wagi zależne od profilu typu treści. Information Gain jest poza wynikiem. Na żywo audyt sprawdza cytowania w AI Overviews, ChatGPT i AI Mode - **Perplexity nie jest odpytywane**, więc pisz „szacuje szansę cytowania”, a nie „sprawdza, czy Perplexity cytuje”. Każde narzędzie i każde „Wdrożenie w treść” kosztuje 1 kredyt (`decrementAuditCredits`), nowe konto ma 3 kredyty. Znaczniki HTML w opisach changelogu (`<script>`) `codeTags` owija w kod inline, inaczej renderer Markdowna by je ukrył.

**AuthorSection** ([AuthorSection.tsx](src/components/AuthorSection.tsx) / [en/AuthorSectionEN.tsx](src/components/en/AuthorSectionEN.tsx)) - karta autora: zdjęcie z lewej (kolumna 208px, na mobile pełna szerokość na górze) + treść z prawej (label "O autorze"/"About the author", nazwisko **Wojciech Władziński-Ulatowski**, rola "Twórca CitationOne"/"Creator of CitationOne", bio, przycisk LinkedIn w accentcie). Zdjęcie: `public/author.jpg` (B&W, wyszywane logo usunięte z koszuli).

> Uwaga: na HP nie ma sekcji `Solution` ani `Features` (komponenty istnieją w repo, ale są nieużywane na HP).

### Kolejność sekcji /how-it-works i /pl/jak-to-dziala

```
Navbar → 3 kroki → CQS → 10 wymiarów → Benchmark → Before/After → AI Overview → Graf wiedzy → Eksport → Quick Wins → Schema.org Audit → Information Gain → CTA → Footer
```

Schema.org Audit i Information Gain tylko na podstronach (nie na HP).

---

## Sekcje ukryte (ławka rezerwowa, tylko PL)

| Komponent | Zawartość | Gdzie wstawić |
|-----------|-----------|---------------|
| `SocialProof` | Stats bar + testimoniale | **NIE włączać w obecnej formie** (patrz niżej) |
| `ReportExample` | Przykład raportu | Po Features, przed ForWho |
| `Pricing` | 3 pakiety cenowe | Po ForWho, przed ClosingCta |
| `FAQ` | Akordeon 5 pytań | Po Pricing, przed ClosingCta |

**`SocialProof` ma wymyślone opinie** („Marcin K., właściciel agencji SEO" i dwie kolejne, z gwiazdkami i liczbami typu „z 6 godzin do 20 minut"). Publikacja nieprawdziwych opinii łamie dyrektywę Omnibus i ustawę o przeciwdziałaniu nieuczciwym praktykom rynkowym (UOKiK karze za to), więc sekcję wolno włączyć dopiero po podmianie cytatów na prawdziwe, za zgodą autorów. Liczbowy dowód bez tego ryzyka daje `StatsBand` na HP.

---

## Wymiary

### PL (komponenty w `src/components/`)

| ID | Label PL | Radar PL |
|----|----------|----------|
| CSI-A | Zgodność z intencją | Intencja |
| D1 | Gęstość informacji | Gęstość |
| D2 | Graf wiedzy | Graf |
| D3 | BLUF | BLUF |
| D4 | Samodzielność sekcji | Sekcje |
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
| 05 | Chunk Optimization | Samodzielność sekcji | `chunk-optimization` | `optymalizacja-chunkow` (slug historyczny, zostaje - zmiana nazwy 2026-09-18 bez przekierowan) |
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
  menu „Narzędzia" w Navbarze — jego trigger to `<button>`, nie link, bo nie ma dokąd prowadzić
  (inaczej niż trigger „Audytu treści", który jest linkiem na `/pl/jak-to-dziala`).
  Nawigację między narzędziami przejmuje lista pigułek („Wszystkie narzędzia") na dole każdej
  podstrony, a breadcrumb ma nieklikalny korzeń. `TOOL_STRINGS_*.basePath` ZOSTAJE — napędza
  linki do rodzeństwa, nie do huba. Audyt treści ma własne menu „Audyt treści", więc
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

### Parametry kampanii w linkach do aplikacji (od 2026-10-12)

Wejście z reklamy niesie `fbclid` i UTM-y, a linki do aplikacji były gołe, więc atrybucja urywała się na granicy domen. [attribution.ts](src/lib/attribution.ts) zapamiętuje parametry wejścia w `sessionStorage` (przeżywają przejścia między podstronami LP), a [AttributionCarrier.tsx](src/components/AttributionCarrier.tsx) w root layoucie dokleja je do każdego linku zaczynającego się od `APP_URL` - jeden nasłuch na dokument, tak jak `RegisterClickTracker`. Formularz w hero dokleja je w `trackThenNavigate`.

- **Lista parametrów jest zamknięta** (`ATTRIBUTION_PARAMS`): UTM-y, `fbclid`, `gclid`, `gbraid`, `wbraid`, `msclkid`. Nic innego z adresu nie przechodzi dalej - w szczególności żadne dane osobowe.
- **Przenosimy zawsze, niezależnie od zgody na cookies** (decyzja z 2026-10-12). Aplikacja zapisuje `fbclid` w ciasteczku `_fbc` (`../ai-auditor/src/lib/meta-click.ts`).
- **Adres poprawiamy przy `pointerdown`, nie dopiero na `click`** - inaczej otwarcie w nowej karcie środkowym przyciskiem albo z menu kontekstowego szłoby bez parametrów.
- **Doklejamy tekstem, nie przez `URL.searchParams.set`** - ten przepisuje całe query i zakodowałby `:` i `/` w `audit-url`.
- W statycznym HTML linki zostają gołe; parametry pojawiają się dopiero po interakcji, więc roboty i podgląd źródła ich nie widzą.
- **Znacznik `lp_rc=1` (od 2026-10-14, TYMCZASOWE - do końca bieżącej kampanii Meta optymalizowanej na `register_click`).** Tag Meta na landingu czeka na zgodę marketingową w Cookiebot, więc bez niej `register_click` nie docierał do Mety. Link do `/register` dostaje wtedy `lp_rc=1` (`LANDING_REGISTER_FLAG`, stan zgody z `window.Cookiebot.consent.marketing`), a aplikacja wysyła `register_click` sama (`../ai-auditor/src/components/auth/LandingRegisterClick.tsx`) i usuwa znacznik z adresu. Przy zgodzie znacznika nie ma - każde kliknięcie trafia do Mety raz. Świadoma decyzja właściciela. Po kampanii usunąć w obu repo.

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
- **Nota pod inputem jest wejściem do rejestracji** (od 2026-09-08): „**Odbierz 3 darmowe audyty** po
  rejestracji. Bez podpinania karty." / „**Get 3 free audits** after signing up. No card required.".
  Podlinkowany jest sam początek zdania (klasa `.hero-note-link`), cel to `APP_URL/login?lang={pl|en}`
  — ten sam ekran co CTA w navbarze, bo aplikacja nie ma osobnego `/register`; konto powstaje przy
  pierwszym logowaniu kodem albo Google. Poprzednie „Pełny raport w 5 minut" zeszło: brak karty
  i moment przyznania audytów to realne pytania sprzed rejestracji.
- **Pigułka źródeł danych** ([HeroSources.tsx](src/components/HeroSources.tsx), od 2026-11-13) - ostatni element hero, tuż nad ekranem panelu: „Na podstawie realnych danych konkurencji w Google, AIO / AI Mode i ChatGPT” / „Based on real competitor data from…”. Kolejność (ChatGPT na końcu), skrót „AIO” i brak logotypów to decyzje usera. Na telefonie bez kropki, wyśrodkowana, 2 linie przy 375 px.
- **Hero na telefonie (≤580 px, 2026-11-13):** H1 `clamp(1.95rem, 9.2vw, 2.4rem)`, podtytuł 15,5 px, ciaśniejsze odstępy, a Showcase ma na ≤640 px `padding-top: 36px` (`.showcase-section` w globals.css, desktop 76 px). Efekt: przy 375×760 górna krawędź mockupu wchodzi nad zgięcie (~635 px). **Pole i przycisk mają tam 16 px** - przy mniejszym foncie iOS Safari przybliża stronę po kliknięciu w pole. Ikonka prezentu w nocie jest `inline` (przy flexie odklejała się od dwuwierszowego tekstu).
- **Ikony silników AI** w podtytule: `public/logos/{chatgpt,perplexity,google}.webp` (48px, ~1-2 KB),
  serwowane lokalnie — **nie hotlinkujemy** faviconów (`chatgpt.com/favicon.ico` zwraca 403 dla nie-przeglądarki,
  a każdy odwiedzający wysyłałby request do OpenAI/Perplexity/Google). Klasa `.hero-brand` (inline-flex +
  `white-space: nowrap`) trzyma ikonę przy nazwie, żeby nie rozjechały się na osobne wiersze.

### Cennik (Hero CTA caption + /pricing + /pl/cennik)

- Cena: **€2.00 / audyt** (pay-as-you-go, brak abonamentów).
- Pod CTA w Hero: ikona prezentu (teal) + "Pierwsze 3 audyty są darmowe." / "First 3 audits are free."

### SEO - title template i FAQ schema

- Root layout i PL layout mają `title.template: '%s'` (sprawdzone 2026-11-11) - **marki NIE dokleja nic**. Strona, która chce mieć „CitationOne” w `<title>`, wpisuje ją sama (np. `/pl/api`, `/mcp`); tytuły wpisów bloga i podstron wymiarów są bez marki. `openGraph.title` jest standalone.
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
- **hreflangi i canonical idą z tej samej mapy** (naprawione 2026-08-26): `alternatesFor(path)`
  w [languageSwitch.ts](src/lib/languageSwitch.ts) zwraca self-canonical + `en`/`pl`/`x-default`.
  Layouty deklarują parę stron głównych, a Next **dziedziczy metadane w dół drzewa** — dlatego
  każda statyczna podstrona musi wołać `alternatesFor` sama; bez tego mówiła Google'owi, że jej
  odpowiednikiem w drugim języku jest HP. Rodziny `[slug]` liczą pary z własnych słowników
  (`DIMENSION_SLUG_PAIRS`, `TOOL_SLUG_PAIRS`) i **bez pary nie emitują hreflanga wcale** — celowo,
  bo fallback na HP byłby wskazaniem nieprawdziwym, gorszym niż brak. `x-default` = wersja EN
  (ta z roota). `sitemap.ts` buduje listę stron statycznych z `STATIC_PAIRS`, więc trzecia kopia
  adresów zniknęła — zostaje sama mapa priorytetów.
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

- **Logotyp w stopce:** lokalny `public/logo-footer.webp` (wysokość 56 px = 2× wyświetlanej 28 px, ~11 KB) zamiast `https://app.citationone.com/logo.png` (32 KB, osobne połączenie z drugą domeną; od 2026-10-18). Navbar ma animowany napis `BrandMorph`.
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
- **Myslnik: ZAWSZE dywiz `-`, NIGDY em dash `—`.** Dotyczy calego repo: copy na stronach, metadane,
  etykiety menu, komentarze w kodzie. Ujednolicone 2026-09-14 (175 wystapien w ~45 plikach).
  Kontrola przed commitem: `grep -r "—" src/` ma zwracac pusto. Znaki `–` w zakresach liczbowych
  (`0–100`, `200–500`) zostaly nietkniete - jesli maja tez pojsc na `-`, to osobna decyzja.

## Wydajność na telefonie (2026-10-18)

Pomiar: Lighthouse mobile (dławienie 4G + 4× CPU) na zbudowanym eksporcie, zewnętrzne skrypty zablokowane, mediana z 3 przebiegów, czasy obserwowane. LCP `/pl` 5,4 s → 2,9 s, `/` 5,4 s → 2,8 s, waga 771 → 509 KB. Na produkcji dochodzą GTM, GA4 i Cookiebot (~520 KB, ~3 s CPU) - tag Google Ads wstrzymany w GTM 2026-10-18.

- **Elementem LCP na telefonie jest zrzut panelu w mockupie, nie nagłówek** (H1 ma gradient z przezroczystym wypełnieniem tekstu). Plik pobiera się w ~60 ms - liczy się, kiedy zostaje pokazany.
- **Animacje wejścia powyżej linii zgięcia robi CSS, nie framer-motion** (`.hero-rise` w globals.css, `deck-rise` w `ShowcaseDeck`). Animacja z JS rusza dopiero po hydracji, która na telefonie blokuje wątek na kilka sekund - gotowy HTML i obrazek czekały na nią z `opacity: 0`.
- **Slajd startowy talii musi być widoczny już w HTML-u** (`translate` do pierwszego pomiaru, patrz Showcase). To była główna przyczyna: zamiana animacji na CSS bez tej poprawki nie zmieniła LCP.
- Wjazd mockupu skrócony 2026-10-18: opóźnienie 0,3 s + 0,8 s animacji (było 1 s + 0,9 s).
- **Obrazy:** WebP dla zrzutów mobilnych (near-lossless), logotypy w `public/logos/*.webp` w 2× wyświetlanej wysokości (Gemini PNG ważył 103 KB przy 24 px), `report-preview.webp`; obrazy poniżej zgięcia `loading="lazy"`. Wszystkie logotypy są WebP (od 2026-11-03, także `dataforseo-logo.webp`, choć wyszedł o ~0,7 KB cięższy od PNG - jeden format).
- **Pojawianie przy przewijaniu robi CSS** (od 2026-10-18): klasa `reveal` + `revealStyle({ y, duration, delay, scale })` z [lib/reveal.ts](src/lib/reveal.ts), a jeden [RevealObserver](src/components/RevealObserver.tsx) w root layoucie dokleja `is-visible` (IntersectionObserver, raz, margines -60 px, ponowny skan po zmianie ścieżki). Przesunięcie i skala idą przez osobne właściwości `translate`/`scale`, więc `transform` zostaje wolny dla efektów najechania. Najechanie: `.card-lift` (karta w górę + cień) i `.btn-pop` (przycisk-link 1.03/0.97) w globals.css. Bez JS `.reveal` odsłania reguła w `<noscript>` layoutu.
- **Sekcje HP bez własnego stanu są komponentami serwerowymi** (PL i EN): Problem, HowItWorks, BulkAudit, TechLogos, DimensionsTeaser, ForWho, FAQ, AuthorSection, ClosingCta. Interaktywne kawałki wydzielone: [WordCycle](src/components/WordCycle.tsx) (napis w Problem), [FAQItem](src/components/FAQItem.tsx) (akordeon). Klienckie zostają StatsBand (pobiera liczby) i ReportSection (link z ustawień). Nowa sekcja: **nie** `motion.div whileInView`, tylko `className="reveal"` + `revealStyle`. **Pułapka:** `RevealObserver` skanuje dokument tylko po montażu i zmianie ścieżki - `.reveal` w treści dorenderowanej później po stronie klienta (warunek, stan, fetch) nigdy nie dostanie `is-visible` i zostanie niewidoczny. Tam animuj inaczej albo dołóż `MutationObserver`.
- Efekt: kod strony `/pl` 13,8 → 6,6 kB, TBT EN ~960 → ~630 ms; na PL zmiana w szumie pomiaru. Pełnostronicowy zrzut przed/po identyczny.
- **Zostaje do zrobienia:** framer-motion nadal ładuje się na HP (chunk ~37 KB, ~1-2 s pracy wątku przy 4× CPU) przez `ShowcaseDeck` (drag, podpis), `HeroNodes`, `WordCycle`, `FAQItem` i przycisk w Hero. Usunięcie go z tych pięciu miejsc to następny krok. Około 1,8 s „Layout" rozkłada się na całą stronę - eksperyment z wyłączaniem HeroNodes, filtrów, maski, siatki kropek, BrandMorph i animacji nie wskazał jednego winowajcy.
- **Jak mierzyć:** `NEXT_DIST_DIR=.next-build npm run build` zapisuje eksport do `.next-build/`, NIE do `out/` - serwuj ten katalog. Symulowane LCP Lighthouse (Lantern) słabo oddaje tę zmianę; patrz `observedLargestContentfulPaint` w `audits.metrics`.

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
- **Kolejność menu** (2026-08-26, PL i EN): **Audyt treści ▾** → **Narzędzia ▾** → Cennik.
  Dwie grupy dzielą menu wzdłuż tego, czym rzeczy są: pierwsza to JEDEN produkt opisany z trzech stron
  (mechanizm → kryteria → skala), druga to katalog osobnych narzędzi. Płaska lista z 2026-08 (Jak działa
  audytor? → Audyt masowy → Cennik → Inne narzędzia → API) mieszała te porządki, stawiała kotwicę HP
  w randze podstrony i **nie miała żadnego wejścia do huba wymiarów** — `/pl/wymiary` wisiało wyłącznie
  na linkach w treści. „Inne narzędzia" definiowały się przez odróżnienie od czegoś, czego w menu nie było.
- **Navbar — menu „Audyt treści":** `AUDIT_MENU` w `Navbar.tsx` / `en/NavbarEN.tsx` — „Jak działa
  audytor?" (`/pl/jak-to-dziala`), „Wymiary oceny" (`/pl/wymiary`), „Audyt masowy", **API**.
  API siedzi tu, a nie na pasku, bo publiczne API v1 obsługuje **wyłącznie audyty**
  (`/audits`, `/audits/bulk`, `/audits/{id}/share`, `/audits/{id}/apply`, `/keywords/detect`, `/me`, `/projects`, `/credits/usage`) — żadne
  z czterech narzędzi nie ma endpointu. To czwarty sposób dostępu do tego samego produktu.
  Gdyby API kiedyś objęło narzędzia, ta pozycja wraca na pasek. Trigger to
  **`<a href>` na `/pl/jak-to-dziala`**, nie `<button>`: najważniejsza podstrona nie może zniknąć za
  rozwinięciem, stąd wyjątkowa reguła `a.nav-dd-trigger { cursor: pointer }` obok bazowego
  `cursor: default` przycisku narzędzi. **Audyt masowy nie ma własnej podstrony** — link to kotwica
  `/pl#masowy-audyt` (`/#bulk-audit`), zawsze pełną ścieżką, bo nawigacja działa też na podstronach.
- **Navbar — menu „Narzędzia":** desktop ma rozwijaną listę (`TOOLS_MENU`), otwieraną **czystym CSS-em**
  (`:hover` + `:focus-within`), więc działa przed hydratacją i dla klawiatury. W liście są 4 narzędzia;
  audyt treści ma własne menu, a Content Pruning i kanibalizacja to jedna pozycja (jedno zadanie, dwie
  zakładki wyniku). Trigger to `<button>`, nie link — huba narzędzi nie ma, więc nie ma dokąd prowadzić.
  `key` w mapowaniu idzie po `label`, nie po `href`. Na mobile obie tablice renderują się jako rozwijane
  grupy (stany `auditOpen` i `toolsOpen`) — inaczej menu otwierałoby się na kilkanaście pozycji.
- **Navbar:** hamburger + panel, auto-close, full-width CTA. `.nav-cta` ma `min-height: 44px` (touch target tablet/mobile).
- **Hero button:** `min-height: 44`, bez `whiteSpace: nowrap` (uniknięcie overflow <360px). Input+button stack na <580px.
- **Gridy responsive:** dims 3→2→1, ba 2→1, feat 2→1, howitworks 5→1 (≤900px), problem/forwho 3→1.
- **Section padding mobile:** globalna reguła w [globals.css](src/app/globals.css) - sekcje z inline `padding: 90px 0` → `padding: 48px 0 !important` na ≤640px (overrides przez attribute selector `section[style*="padding: 90px 0"]`).
- **FAQ button:** `minHeight: 44` (touch target).
- **Solution card:** 80%→100% na mobile, score font 40→32px, **radar ukryty na mobile** (`.sol-radar-wrap { display: none }` na <=768px - widoczny w Hero, nie powtarza się).
- **TechLogos:** Gemini, Bright Data, Jina AI, DataForSEO
