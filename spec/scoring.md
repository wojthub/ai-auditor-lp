# Scoring

> Czesc specyfikacji Smart Content Audit. Indeks: [CLAUDE.md](../CLAUDE.md)

## Content Quality Score (CQS) -- formula

Plaski system wag (suma = 1.0), bez grupowania. Kazdy wymiar 0-10, CQS normalizowany do **0-100**.

```
CQS = (CSI-A x 0.15 + Density x 0.15 + BLUF x 0.14 + EAV x 0.15 + Chunk x 0.10
     + CoR x 0.08 + TF-IDF x 0.07 + QueryFanout x 0.07
     + EEAT x 0.05 + SRL x 0.04) x 10
```

| Tier | Wymiar | Waga | Uzasadnienie |
|------|--------|------|-------------|
| 1 — Intent & Quality | CSI Alignment | 0.15 | Zgodnosc z intencja wyszukiwania |
| 1 — Intent & Quality | Density | 0.15 | Stosunek faktow do wypelniacza |
| 2 — AI Extractability | BLUF | 0.14 | Odpowiedz na poczatku sekcji |
| 2 — AI Extractability | EAV | 0.15 | Trojki Entity-Attribute-Value + klasyfikacja URR (algorytmiczna) |
| 2 — AI Extractability | Chunk | 0.10 | Autonomicznosc sekcji H2/H3 |
| 3 — Completeness | CoR | 0.08 | Koszt dotarcia do informacji |
| 3 — Completeness | TF-IDF | 0.07 | Pokrycie kluczowych terminow |
| 3 — Completeness | Fan-Out i AIO | 0.07 | Pokrycie sub-zapytan AI Search + AI Overview |
| 4 — Supporting | E-E-A-T | 0.05 | Doswiadczenie, ekspertyza, autorytet, zaufanie |
| 4 — Supporting | SRL | 0.04 | Role semantyczne |

## AI Citability Score (0-10)

```
Citability = BLUF x 0.25 + Density x 0.20 + Chunk x 0.15 + CoR x 0.15
           + TF-IDF x 0.10 + QueryFanout x 0.10 + EAV x 0.05
```

Uwzglednia: BLUF w H1/H2, gestosc informacji, autonomicznosc chunkow, koszt ekstrakcji, pokrycie terminow, pokrycie sub-zapytan AI Search, trojki EAV.

## Interpretacja CQS

| CQS    | Interpretacja              | Akcja                         |
|--------|---------------------------|-------------------------------|
| 80-100 | Gotowa do publikacji      | Drobne szlify                 |
| 60-79  | Wymaga poprawek           | Popraw top 3 rekomendacje     |
| 40-59  | Wymaga znaczacych zmian   | Popraw top 5 + rozszerz       |
| 0-39   | Zalecane przepisanie      | Zacznij od nowa z briefem     |

## Priorytetyzacja rekomendacji

```
Priorytet = Impact x (1 / Effort)
```

| Impact  | Effort  | Priorytet        | Przyklad                      |
|---------|---------|-----------------|-------------------------------|
| Wysoki  | Niski   | **KRYTYCZNE**   | Dodanie BLUF (5 min)          |
| Wysoki  | Sredni  | **WYSOKIE**     | Przeksztalcenie CE na Agenta  |
| Wysoki  | Wysoki  | **SREDNIE**     | Dopisanie brakujacej sekcji   |
| Niski   | Niski   | **BONUS**       | Poprawienie pogrubien         |
