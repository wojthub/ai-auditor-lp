# Integracja ze skillami

> Czesc specyfikacji Smart Content Audit. Indeks: [CLAUDE.md](../CLAUDE.md)

Skille (`SKILL.md`) to szablony promptow -- NIE runtime libraries. Webapp implementuje logike opisana w skillach jako:

## 1. Prompty Gemini API (`lib/ai/prompts/*.ts`)

Kazdy plik eksportuje funkcje generujaca prompt na bazie tresci artykulu i CSI. Prompt zawiera reguly scoringu, format odpowiedzi (JSON schema), kryteria oceny z SKILL.md.

```typescript
// Przykladowa struktura lib/ai/prompts/information-density.ts

export function buildPrompt(content: string, csi: CSI): string {
  return `
    Jestes ekspertem AI Search audytorem. Analizujesz tresc pod katem Information Density.

    ## Kryteria
    Klasyfikuj kazde zdanie jako FAKT (weryfikowalna informacja) lub PUCH (ogolnik, filler).
    Score = (zdania faktyczne / wszystkie zdania) x 10

    Elementy obnizajace:
    - Slowa modalne ("moze", "powinien") -> -0.5
    - Puste frazesy ("Warto zaznaczyc, ze...") -> -1.0
    - Przymiotniki ocenne ("ogromne znaczenie") -> -0.5
    - Pytania retoryczne -> -0.5

    Elementy zwiekszajace:
    - Konkretne liczby -> +1.0
    - Nazwy wlasne i encje -> +0.5
    - Wartosci atrybutow EAV -> +1.0
    - Atomic claims -> +1.0

    ## Artykul do analizy:
    ${content}

    ## Kontekst CSI:
    CE: ${csi.centralEntity}
    SC: ${csi.sourceContext}
    CSI: ${csi.centralSearchIntent}

    Odpowiedz WYLACZNIE w formacie JSON:
    {
      "score": number,           // 0-10
      "totalSentences": number,
      "factSentences": number,
      "densityRatio": number,    // 0-1
      "problems": [
        {
          "fragment": "cytat z tekstu",
          "type": "modal | filler | adjective | rhetorical",
          "suggestion": "poprawiona wersja"
        }
      ],
      "strengths": ["mocna strona 1", "mocna strona 2"],
      "summary": "1-2 zdania podsumowania"
    }
  `;
}
```

## 2. Mapowanie skill -> prompt

| Skill SKILL.md                    | Prompt plik                     |
|-----------------------------------|---------------------------------|
| `csi-definition-helper`           | `csi-definition.ts`             |
| `csi-alignment-checker`           | `csi-alignment.ts`              |
| `information-density-checker`     | `information-density.ts`        |
| `eav-extractor`                   | `eav-extraction.ts`             |
| `bluf-generator` + `references/transformations.md` | `bluf-analysis.ts` |
| `chunk-optimizer`                 | `chunk-optimization.ts`         |
| `cost-of-retrieval-optimizer`     | `cost-of-retrieval.ts`          |
| `tfidf-analyzer`                  | `tfidf-analysis.ts`             |
| `semantic-role-labels-parser`     | `semantic-roles.ts`             |
| `attribute-classifier`            | `attribute-classifier.ts`       |
| `query-fanout`                    | `query-fanout.ts`               |
| `eeat-evaluator`                  | `eeat-evaluation.ts`            |
| `content-quality-scorer`          | (formuly scoringu w `lib/scoring.ts`) |
| `audit-report-generator`          | `report-generation.ts`          |
| *(brak skilla)*                   | `serp-consensus.ts`             |
| *(brak skilla)*                   | `competitor-scoring.ts`         |

## 3. Algorytmy scoringu (`lib/scoring.ts`)

Formuly CQS i AI Citability zaimplementowane w TypeScript (deterministyczne, nie przez AI):

```typescript
function calculateCQS(dimensions: DimensionResult[], eeat: EEATResult): number {
  const find = (id: string) => dimensions.find(d => d.id === id)?.score ?? 0;

  const csiAlignment = find('csiAlignment');
  const bluf = find('bluf');
  const chunk = find('chunk');
  const urr = find('urr');
  const hasQueryFanout = dimensions.some(d => d.id === 'queryFanout');
  const queryFanout = find('queryFanout');
  // CSI Group: /5 z queryFanout, /4 bez (backward compat)
  const csi = hasQueryFanout
    ? (csiAlignment + bluf + chunk + urr + queryFanout) / 5
    : (csiAlignment + bluf + chunk + urr) / 4;

  const cor = find('cor');
  const density = find('density');
  const srl = find('srl');
  const tfidf = find('tfidf');
  const eeatAvg = Number.isFinite(eeat.average) ? eeat.average : 0;

  return (csi * 0.25 + cor * 0.20 + density * 0.15 + srl * 0.10 + tfidf * 0.10 + eeatAvg * 0.20) * 10;
}

function calculateCitability(dimensions: DimensionResult[]): number {
  const find = (id: string) => dimensions.find(d => d.id === id)?.score ?? 0;

  const bluf = find('bluf');
  const density = find('density');
  const cor = find('cor');
  const tfidf = find('tfidf');
  const chunk = find('chunk');
  const hasQueryFanout = dimensions.some(d => d.id === 'queryFanout');
  const queryFanout = find('queryFanout');

  // Backward compat: stare audyty bez queryFanout uzywaja starych wag
  return hasQueryFanout
    ? bluf * 0.25 + density * 0.20 + cor * 0.20 + tfidf * 0.15 + chunk * 0.10 + queryFanout * 0.10
    : bluf * 0.30 + density * 0.25 + cor * 0.20 + tfidf * 0.15 + chunk * 0.10;
}

function getStatus(score: number): ScoreStatus {
  if (score >= 8) return 'ok';
  if (score >= 5) return 'warn';
  return 'critical';
}
```
