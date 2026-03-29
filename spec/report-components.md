# Raport i komponenty UI

> Czesc specyfikacji CitationOne. Indeks: [CLAUDE.md](../CLAUDE.md)

## Format raportu (eksport Markdown)

Rekomendacje generowane algorytmicznie przez `recommendation-builder.ts` (z wymiarow, 0 Gemini calls). Extras raportu (struktura, BLUF, SRL, EEAT, TF-IDF, Title/Desc, AIO) generowane przez `report-generation.ts` (7 zadan). Eksport z `/audyt/[id]/eksport`:

```markdown
# Audyt semantyczny: [tytul / URL]
Data: [data] | Audytor: CitationOne
Profil audytu: **[Listing / Katalog]** - wagi i kryteria dostosowane do typu treści  ← tylko dla non-article

---

## 1. Executive Summary

**Content Quality Score: XX/100**
**AI Citability Score: X/10**
**Profil:** [Listing / Katalog]  ← tylko dla non-article

| Wymiar | Score | Status | Top Problem |
|--------|-------|--------|-------------|
| CSI Alignment | X/10 | ok/warn/critical | ... |
| CSI (kompozyt) | X/10 | ok/warn/critical | ... |
| Cost of Retrieval | X/10 | ... | ... |
| Information Density | X/10 | ... | ... |
| SRL Salience | X/10 | ... | ... |
| TF-IDF Quality | X/10 | ... | ... |
| E-E-A-T: Experience | X/10 | ... | ... |
| E-E-A-T: Expertise | X/10 | ... | ... |
| E-E-A-T: Authority | X/10 | ... | ... |
| E-E-A-T: Trust | X/10 | ... | ... |

CQS = (CSI-A x 0.13 + Fan-Out x 0.13 + EAV x 0.13 + Density x 0.11 + BLUF x 0.11 + SRL x 0.09 + Chunk x 0.07 + CoR x 0.06 + TF-IDF x 0.06 + Effort x 0.06 + EEAT x 0.05) x 10
CSI = (CSI Alignment + BLUF + Chunk + URR + Query Fan-Out) / 5

## 2. Diagnoza

### 2.1 CSI & Pokrycie tematyczne
- CSI (inferowane): CE, SC, Predicate
- EAV Coverage: X/Y atrybutow pokrytych (Z%)
- Tryb Full: walidacja SERP (PAA, gaps P1-P4)

### 2.2 Jakosc tresci (per wymiar: score, top problem, BEFORE/AFTER)

### 2.3 E-E-A-T (per wymiar: score, obecne sygnaly, brakujace)
- Tryb Full: porownanie z Top 3 SERP (tabela sygnalow)

### 2.4 Benchmark vs SERP (tylko tryb Full)
- Pelna tabela EAV: atrybut, Klasyfikacja, freq SERP, nasz artykul, status
- Content Format Intelligence: tabele/listy/infografiki/bibliografia -- freq vs nasz

## 3. Action Plan
- Docelowa struktura H1/H2/H3 — PELNA (WSZYSTKIE istniejace naglowki + nowe). [OK] sekcje bez zmian, [ZMIEN] z originalTitle + nowy title, [NOWA] do dodania. Generowana na podstawie: chunk optimization + gaps z benchmarku + sub-zapytania Fan-Out (POKRYTE/NIEPOKRYTE → niepokryte = [NOWA] sekcja) + twierdzenia AI Overview (niepokryte → [NOWA] lub [ZMIEN])
- BLUF per H2 z BEFORE/AFTER (currentBluf + suggestedBluf per kazda sekcja H2 — wymuszane w prompcie)
- Rekomendacje (z recommendation-builder, nie z report prompt): KRYTYCZNE / WYSOKIE / SREDNIE z BEFORE/AFTER + clientWhy (💡) + impact (oba widoczne)
- Luki terminologiczne TF-IDF z docelowymi sekcjami H2 (dane z termStats.missingFromSource — spojne z wymiarem TF-IDF; fallback na tfidfMapping dla starych audytow)
- Transformacje SRL (CE Patient -> Agent)
- EEAT bloki do wdrozenia
- Tryb Full: gaps P1-P4 z danymi SERP, Content Format recommendations
- Checklist z szacowanym +CQS per akcja

## 13. Title & Meta Description
- Obecny title (z dlugoscia w znakach) + analiza SEO
- Rekomendowany title (z dlugoscia)
- Obecna meta description (lub "(brak)") + analiza SEO
- Rekomendowana meta description (z dlugoscia)
```

### SerpConsensusPanel (w AuditReport — tab Podsumowanie)

Panel "Walidacja SERP" renderowany jesli `audit.serpConsensus` istnieje:

- **Badge zgodnosci:** "Wysoka zgodność" (zielony) / "Częściowa zgodność" (żółty) / "Niska zgodność" (czerwony) — obliczana server-side ze średniej 7 pól fieldAlignment
- **Explanation:** 2-3 zdania wyjaśniające zgodność
- **Tabela porównawcza 7 wierszy:**

| Pole | Źródło (treść) | Konsensus SERP |
|------|-------------------|----------------|
| [dot] Główna encja (CE) | audit.centralEntity | consensus.centralEntity |
| [dot] Kontekst (SC) | audit.sourceContext | consensus.sourceContext |
| [dot] Intencja (CSI) | audit.centralSearchIntent | consensus.centralSearchIntent |
| [dot] Predykat | audit.predicate | consensus.predicate |
| [dot] Typ | consensus.sourceContentType | consensus.contentType.primary |
| [dot] Format | consensus.sourceContentFormat[] | consensus.contentFormat.dominant[] |
| [dot] Perspektywa | consensus.sourceContentAngle | consensus.contentAngle.angle |

- **Alignment dots** (zielony=high, żółty=partial, czerwony=low) przy każdym wierszu
- **Kluczowe dane** (poza tabelą): lista `contentData.essentialDataPoints` + tagi formatów
- **Tematy SERP:** tagi z `serpThemes`
- **Sygnały PAA:** lista z `topPaaSignals`
- Backward compat: stare audyty bez contentType/Format/Angle — te wiersze nie renderowane

## Komponenty -- szczegoly

### Executive Summary + Profil (w SummaryTab)

Połączony box pod ScoreCards, widoczny gdy są rekomendacje LUB profil non-article:
- Liczba problemów critical+high (polska odmiana: 1 "problem", 2-4 "problemy", 5+ "problemów")
- Najważniejsza zmiana (pierwszy critical, fallback na pierwszy rec)
- Badge profilu typu treści (tylko non-article): "Profil audytu: **Listing / Katalog** - wagi i kryteria dostosowane do typu treści"

### Wpływ jakości na pozycję (w Top 10 SERP)

4. metryka benchmarkowa obok Śr. CQS, Śr. Citability, Śr. słów:
- Spearman rank correlation (odporny na male probki i outliery, w przeciwienstwie do Pearsona)
- Dual signal: srednia dwoch korelacji — CQS↔position + Citability↔position — stabilniejszy sygnal niz sam CQS
- `impact = Math.round(Math.max(0, -avgR) * 100)` (ujemna korelacja = pozytywny wplyw)
- Floor 10%: jesli surowa wartosc >=5% (korelacja istnieje), wynik podnoszony do minimum 10% — redukuje czeste 0% przy malych probach
- Min 3 scored competitors wymagane, inaczej "-"
- Kolorowanie: zielony ≥50% (silny wpływ), żółty ≥30% (umiarkowany), szary <30% (słaby)
- InfoHint z glossary key `cqsImpact`

### ScoreCard

Duzy numer (CQS 0-100 lub Citability 0-10). Tlo karty kolorowane wg statusu (ok/warn/critical). Opcjonalny `hintKey` prop — InfoHint tooltip.

### RadarChart

Recharts `RadarChart` z 9 osiami. Staly porzadek osi. Wypelnienie kolorem wg sredniej. Custom tooltips z nazwa wymiaru i score. **Etykiety osi** (`CustomAxisTick`) z rozbudowanym HTML tooltip (po najechaniu na nazwe wymiaru pojawia sie overlay z pelnym opisem z glossary: term, short, detail, actionable tip). `DIM_GLOSSARY_KEYS` mapuje dimId na glossary key. Auto-placement (gora/dol) + clamping do kontenera. Fallback: SVG `<title>` z `DIMENSION_DESCRIPTIONS`.

### BeforeAfter

Dwa bloki side-by-side:
- **BEFORE** -- `bg-danger/10`, border `danger`, cytat z tresci
- **AFTER** -- `bg-success/10`, border `success`, sugestia poprawki

### DimensionDetail

Rozwiniety widok wymiaru. Zawiera:
- Score + status badge
- Lista mocnych stron
- Problemy z BeforeAfter per problem
- Dane dodatkowe zalezne od wymiaru:
  - CSI-A: Pokrycie encji (tabela pokrytych + luk P1-P4 sortowanych wg priorytetu + coverageCount desc) + Macierz EAV (tagi) — sorting w orchestratorze + UI-side sort dla starych audytow (tryb Full)
  - Graf wiedzy (EAV): KnowledgeGraph (interaktywny graf) + EAVTable (trójki z badge: pokryte/unikalne/luka) + Macierz EAV (tagi pokrycia) + Formaty treści
  - Chunk: ChunkMap z dlugosciami sekcji
  - SRL: Tabela instancji SRL z BEFORE/AFTER transformacjami
  - Fan-Out i AIO: Tabela sub-zapytan z typem (semantic/intent/verification), grounding tag (CONFIRMED/OVERVIEW/PREDICTED/SERP-ONLY), mapowana sekcja H2, status pokrycia. InfoHint na wszystkich kolumnach naglowkowych (Sub-zapytanie, Typ, Sekcja, Status, Grounding). Coverage stats (tagi z liczbami). Lista niepokrytych sub-zapytan (czerwony callout). AiOverviewCoverageCard (karta pokrycia AI Overview — przeniesiona z Summary tab). Ta sama tabela z InfoHint wyswietlana w 3 miejscach: SummaryTab (karta Pokrycie Fan-Out), RecommendationsTab, DimensionDetail (queryFanout).

### ChunkMap

Drzewo struktury H1/H2/H3 z dwoma tabami (widoczne gdy sa zmiany):

**Tab "Aktualna":**
- `[OK]` -- zielony badge, oryginalny tytul
- `[ZMIEN]` -- zolty badge, oryginalny tytul (`originalTitle`) + `→ nowy tytul` pod spodem + powod
- `[NOWA]` -- niebieski badge + uzasadnienie

**Tab "Po poprawieniu":**
- Czysta docelowa struktura -- same naglowki H1/H2/H3 bez badge'ow i adnotacji (uzywa `title` = docelowy tytul)

Taby nie pojawiaja sie gdy wszystko jest `[OK]`. `ProposedSection.originalTitle` (opcjonalne) -- oryginalny tytul sekcji z tresci, tylko dla `action='change'`. Backward compat: stare audyty bez `originalTitle` -- `change` sekcje w "Aktualna" pokazuja `title`.

### TitleDescriptionCard

Karta "Title & Meta Description" w Summary tab (renderowana tylko jesli `reportExtras.titleDescription` istnieje):

- **Title section:**
  - Current title: `bg-muted`, `font-mono`, badge dlugosci (zielony 30-60 zn., zolty 1-29 lub 61-70, czerwony >70 lub 0)
  - Analiza AI: `text-sm text-muted-foreground` miedzy blokami
  - Recommended title: `bg-success/5`, `border-success/20`, `font-mono`, badge dlugosci
- **Meta Description section:**
  - Current description: `bg-muted`, `font-mono`, badge dlugosci (zielony 70-155 zn., zolty 1-69 lub 156-200, czerwony >200 lub brak)
  - Analiza AI
  - Recommended description: `bg-success/5`, `border-success/20`, `font-mono`, badge dlugosci
- Backward compat: stare audyty bez `titleDescription` — karta nie renderowana
- Kryteria SEO best practices (title: 55-60 zn., keyword na poczatku, CE w tytule; desc: do 155 zn., active voice, CTA)

### ExportTab

Zakladka "Eksport" w raporcie audytu. Dwa stany:

**Przed generowaniem raportu:** 3 przyciski:
- "Generuj raport Markdown" — POST `/api/audit/[id]/report`, wynik w state `markdown`
- "Pobierz .pdf" — client-side `html2pdf.js` + `buildExportHTML()`
- "Brief do klienta" — generuje podglad markdown pod przyciskami, potem "Kopiuj do schowka"

**Po wygenerowaniu raportu:** 4 przyciski + podglad raportu:
- "Pobierz .md", "Pobierz .pdf", "Kopiuj do schowka" (pelny raport), "Brief do klienta"
- `<pre>` z markdownem (max-h-600, overflow-y-auto)
- Brief do klienta renderowany pod podgladem raportu (jesli wygenerowany)

**"Brief do klienta"** — `buildClientBriefMarkdown(audit)`:
- CQS + Citability w naglowku
- Rekomendacje w formacie klienta: 📍 Gdzie (section) + ✏️ Co zrobic (actionType + after) + 💡 Dlaczego (clientWhy)
- Docelowa struktura z emoji (✅/✏️/➕)
- Przeznaczenie: wyslanie do klienta/copywritera jako brief do wdrozenia
- Generowane client-side bez API call (dane z `audit.recommendations` + `audit.reportExtras`)

### Pola rekomendacji (brief do klienta)

Rekomendacje generowane algorytmicznie z wymiarow przez `buildRecommendationsFromDimensions()` w `recommendation-builder.ts` (0 Gemini calls). `DimensionProblem` rozszerzony o 4 opcjonalne pola (`title`, `section`, `actionType`, `clientWhy`) generowane przez kazdy prompt wymiaru.

Każda rekomendacja ma 3 opcjonalne pola (backward compat — stare audyty = undefined → fallback):
- `section` — nazwa sekcji H2 (lub "Lead", "Meta description", "Title tag", "Nowa sekcja"). Wyświetlane: UI (pod tytułem), markdown (📍 Sekcja), PDF (· sekcja), brief (📍 Gdzie)
- `actionType` — "zamień" | "dodaj" | "usuń" | "przenieś" | "rozszerz". Wyświetlane: UI (badge accent), markdown (Akcja), PDF (· akcja), brief (emoji)
- `clientWhy` — uzasadnienie w języku klienta bez żargonu SEO/AI. Wyświetlane: UI (💡 accent, zamiast impact), markdown (💡), PDF (💡 accent), brief (💡 Dlaczego). Fallback: `impact`
