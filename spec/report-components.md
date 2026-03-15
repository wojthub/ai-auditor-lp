# Raport i komponenty UI

> Czesc specyfikacji Smart Content Audit. Indeks: [CLAUDE.md](../CLAUDE.md)

## Format raportu (eksport Markdown)

Raport generowany przez `report-generation.ts` i eksportowany z `/audyt/[id]/eksport`:

```markdown
# Audyt semantyczny: [tytul / URL]
Data: [data] | Audytor: AI SEO Content Auditor

---

## 1. Executive Summary

**Content Quality Score: XX/100**
**AI Citability Score: X/10**

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

CQS = (CSI x 0.25 + CoR x 0.20 + Density x 0.15 + SRL x 0.10 + TF-IDF x 0.10 + EEAT x 0.20) x 10
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
- Pelna tabela EAV: atrybut, URR, freq SERP, nasz artykul, status
- Content Format Intelligence: tabele/listy/infografiki/bibliografia -- freq vs nasz

## 3. Action Plan
- Docelowa struktura H1/H2/H3 z [OK]/[ZMIEN]/[NOWA]
- BLUF per H2
- Rekomendacje: KRYTYCZNE / WYSOKIE / SREDNIE z BEFORE/AFTER
- Brakujace terminy TF-IDF z mapowaniem do sekcji
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

| Pole | Źródło (artykuł) | Konsensus SERP |
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

### ScoreCard

Duzy numer (CQS 0-100 lub Citability 0-10). Tlo karty kolorowane wg statusu (ok/warn/critical). Ikona trendu.

### RadarChart

Recharts `RadarChart` z 9 osiami (CSI + D1-D8). Staly porzadek osi. Wypelnienie kolorem wg sredniej. Custom tooltips z nazwa wymiaru i score. **Etykiety osi** (`CustomAxisTick`) z natywnym SVG `<title>` -- po najechaniu kursorem wyswietla opis wymiaru (np. "CSI — dopasowanie do intencji wyszukiwania"). `DIMENSION_DESCRIPTIONS` mapuje ID wymiaru na opis.

### BeforeAfter

Dwa bloki side-by-side:
- **BEFORE** -- `bg-danger/10`, border `danger`, cytat z artykulu
- **AFTER** -- `bg-success/10`, border `success`, sugestia poprawki

### DimensionDetail

Rozwiniety widok wymiaru. Zawiera:
- Score + status badge
- Lista mocnych stron
- Problemy z BeforeAfter per problem
- Dane dodatkowe zalezne od wymiaru:
  - CSI-A: Pokrycie encji (tabela pokrytych + luk P1-P4 sortowanych wg priorytetu + coverageCount desc) + Macierz EAV (tagi) — sorting w orchestratorze + UI-side sort dla starych audytow (tryb Full)
  - D2 (Graf wiedzy/EAV): KnowledgeGraph (interaktywny graf) + EAVTable (trójki z badge: pokryte/unikalne/luka) + Macierz EAV (tagi pokrycia) + Formaty treści
  - D4 (Chunk): ChunkMap z dlugosciami sekcji
  - D7 (SRL): Tabela instancji SRL z BEFORE/AFTER transformacjami
  - D8 (Fan-Out i AIO): Tabela sub-zapytan z typem (semantic/intent/verification), grounding tag (CONFIRMED/OVERVIEW/PREDICTED/SERP-ONLY), mapowana sekcja H2, status pokrycia. Coverage stats (tagi z liczbami). Lista niepokrytych sub-zapytan (czerwony callout). AiOverviewCoverageCard (karta pokrycia AI Overview — przeniesiona z Summary tab).

### ChunkMap

Drzewo struktury H1/H2/H3 z oznaczeniami:
- `[OK]` -- zielony badge
- `[ZMIEN]` -- zolty badge + powod
- `[NOWA]` -- niebieski badge + uzasadnienie

Kazda sekcja pokazuje: dlugosc (slow), BLUF (tak/nie), autonomicznosc (tak/nie).

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
