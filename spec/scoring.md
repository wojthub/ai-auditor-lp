# Scoring

> Czesc specyfikacji CitationOne. Indeks: [CLAUDE.md](../CLAUDE.md)

## Content Quality Score (CQS) -- formula

Plaski system wag (suma = 1.0), bez grupowania. Kazdy wymiar 0-10, CQS normalizowany do **0-100**.

```
CQS = (CSI-A x 0.13 + QueryFanout x 0.13 + EAV x 0.13 + Density x 0.11
     + BLUF x 0.11 + SRL x 0.09 + Chunk x 0.07 + CoR x 0.06
     + TF-IDF x 0.06 + Effort x 0.06 + EEAT x 0.05) x 10
```

| Tier | Wymiar | Waga | Uzasadnienie |
|------|--------|------|-------------|
| 1 — Intent & Coverage | CSI Alignment | 0.13 | Zgodnosc z intencja wyszukiwania |
| 1 — Intent & Coverage | Fan-Out i AIO | 0.13 | Pokrycie sub-zapytan AI Search + AI Overview |
| 1 — Intent & Coverage | EAV | 0.13 | Trojki Entity-Attribute-Value + Klasyfikacja (algorytmiczna, wewnetrznie URR) |
| 2 — AI Extractability | Density | 0.11 | Stosunek faktow do wypelniacza |
| 2 — AI Extractability | BLUF | 0.11 | Odpowiedz na poczatku sekcji |
| 2 — Supporting | SRL | 0.09 | Role semantyczne |
| 3 — Completeness | Chunk | 0.07 | Autonomicznosc sekcji H2/H3 |
| 3 — Completeness | CoR | 0.06 | Koszt dotarcia do informacji |
| 3 — Completeness | TF-IDF | 0.06 | Pokrycie kluczowych terminow (tylko bigramy+) |
| 3 — Completeness | Effort Score | 0.06 | Wysilek on-site: dlugosc, obrazki, wideo, tabele, schema |
| 4 — Supporting | E-E-A-T | 0.05 | Doswiadczenie, ekspertyza, autorytet, zaufanie |

### Dynamiczne wagi per typ tresci

Wagi powyzej to **domyslne** (profil `article`). Dla innych typow tresci (listing, product, faq, landing, comparison, encyclopedia, tool) wagi sa dostosowane — np. FAQ ma Fan-Out 0.21 (vs 0.14 dla artykulu), tool ma Fan-Out 0.25. Profil rozpoznawany z `serpConsensus.contentType.primary` przez `resolveProfile()` w `lib/content-type-profiles.ts`.

`calculateCQS(dimensions, eeat, weights?)` i `calculateCitability(dimensions, weights?)` przyjmuja opcjonalne `WeightSet`/`CitabilityWeightSet`. Brak wag = stale domyslne.

### Dynamiczne wagi E-E-A-T sub-wymiarow

EEAT average w CQS nie jest prosta srednia (E+E+A+T)/4, lecz **wazona srednia** z `profile.eeatWeights` (`EEATWeights`, suma=1.0). Przeliczana w orchestratorze przed scoringiem.

Domyslne (article): rowne 0.25 kazdemu sub-wymiarowi.

| Profil | Experience | Expertise | Authority | Trust |
|--------|-----------|-----------|-----------|-------|
| article | 0.25 | 0.25 | 0.25 | 0.25 |
| listing | 0.25 | 0.15 | 0.10 | **0.50** |
| product | 0.30 | 0.25 | 0.10 | **0.35** |
| comparison | 0.30 | 0.30 | 0.10 | 0.30 |
| faq | 0.15 | **0.35** | 0.15 | **0.35** |
| landing | 0.30 | 0.15 | 0.20 | **0.35** |
| encyclopedia | 0.10 | **0.40** | **0.30** | 0.20 |
| tool | 0.10 | **0.35** | 0.15 | **0.40** |

Prompt EEAT (`eeat-evaluation.ts`) ma tez wbudowane tabele sygnalow per typ — Gemini ocenia na podstawie sygnalow dopasowanych do typu tresci (np. listing Trust: "aktualne ceny", "Dyrektywa Omnibus" zamiast "disclaimer artykul informacyjny").

## AI Citability Score (0-10)

```
Citability = BLUF x 0.25 + Density x 0.20 + Chunk x 0.15 + CoR x 0.15
           + TF-IDF x 0.10 + QueryFanout x 0.10 + EAV x 0.05
```

Uwzglednia: BLUF w H1/H2, gestosc informacji, autonomicznosc chunkow, koszt ekstrakcji, pokrycie terminow, pokrycie sub-zapytan AI Search, trojki EAV. Wagi jak wyzej sa domyslne (article) — inne profile maja inne proporcje.

## Competitor scoring (uproszczony)

1 call Gemini per competitor (temperature 0) z rubricem punktowym. Wymiary i wagi identyczne z source scoring (1:1):

**CQS rubric (max 100):** CSI-A 13 + Density 11 + BLUF 11 + EAV 13 + Chunk 7 + CoR 6 + TF-IDF 6 + **Fan-Out 13** + SRL 9 + Effort 6 + EEAT 5 = 100

**Citability rubric (max 10):** BLUF 1.8 + Density 1.4 + Chunk 1.0 + CoR 1.0 + TF-IDF 0.7 + **Fan-Out 1.8** + EAV 1.2 + Effort 1.1 = 10

**Stabilizacja wynikow:**
- Temperature 0 (zamiast 0.3) — eliminuje losowość
- Algorytmiczne metryki z `analyzeContentStructure()` wstrzyknięte do prompta (liczba słów, zdań, nagłówków, ściany tekstu, FAQ itp.)
- htmlMetrics z crawlera (imageCount, videoCount, hasFaqSchema, hasTableOfContents)
- Profil typu treści z SERP consensus (non-article: dostosowane kryteria)
- **Rozszerzona baza algorytmiczna (65% algo + 35% Gemini):** `computeAlgorithmicCompetitorScore()` w `content-structure.ts` — max 33.5 pkt (bylo 24.5): CoR 7 + Chunk 5 + Effort 6 + BLUF 4 + Density 3 + **SRL proxy 2** + **EEAT signals 3** + **TF-IDF proxy 2** + **Fan-Out proxy 2**. Nowy opcjonalny param `extras?: { content?, centralEntity?, tfidfCoveredRatio?, serpQuestions? }`. `scoreCompetitors()` przyjmuje `serpData?: { paa: string[]; related: string[] }`. Citability deterministyczna porcja: ~4.3/10 (bylo ~2.9/10). Blending: `finalCQS = round(0.65 * algoCQS + 0.35 * geminiCQS)`

**Znane ograniczenia vs source scoring:**
- Source: 10 osobnych call Gemini (głęboka analiza per wymiar) vs competitor: 1 call (rubric w jednym prompcie)
- Source EAV: korekta algorytmiczna 40%AI/60%coverage — competitor nie ma (brak benchmarku "sam do siebie")
- Source: grounding (weryfikacja cytatów) — competitor nie generuje cytatów
- Source: post-processing nadpisuje metryki Gemini — competitor ma metryki w prompcie ale bez korekty po odpowiedzi

**Walidacja wag:** `validateWeights()` w `scoring.ts` loguje warning gdy suma wag ≠ 1.0 lub wartość poza [0,1].

## Interpretacja CQS

| CQS    | Interpretacja              | Akcja                         |
|--------|---------------------------|-------------------------------|
| 80-100 | Gotowa do publikacji      | Drobne szlify                 |
| 60-79  | Wymaga poprawek           | Popraw top 3 rekomendacje     |
| 40-59  | Wymaga znaczacych zmian   | Popraw top 5 + rozszerz       |
| 0-39   | Zalecane przepisanie      | Zacznij od nowa z briefem     |

## Priorytetyzacja rekomendacji

Rekomendacje generowane algorytmicznie z wymiarow przez `buildRecommendationsFromDimensions()` w `lib/ai/recommendation-builder.ts` (0 Gemini calls). Priorytet obliczany z impact + waga CQS wymiaru. `estimatedCqsDelta` algorytmiczny. Fuzzy dedup (token overlap >=80%). Cap 20. Brakujace sygnaly EEAT jako bonus recs.

```
Priorytet = Impact x (1 / Effort)
```

| Impact  | Effort  | Priorytet        | Przyklad                      |
|---------|---------|-----------------|-------------------------------|
| Wysoki  | Niski   | **KRYTYCZNE**   | Dodanie BLUF (5 min)          |
| Wysoki  | Sredni  | **WYSOKIE**     | Przeksztalcenie CE na Agenta  |
| Wysoki  | Wysoki  | **SREDNIE**     | Dopisanie brakujacej sekcji   |
| Niski   | Niski   | **BONUS**       | Poprawienie pogrubien         |
