# Pipeline Cache

> Czesc specyfikacji CitationOne. Indeks: [CLAUDE.md](../CLAUDE.md)

Kazdy etap pipeline'u zapisuje swoj output jako JSON na filesystem. Cel: **debug i inspekcja** surowych wynikow (jakosc promptow, analiza bledow, porownanie miedzy audytami).

## Zasady

- **Fire-and-forget** -- zapis cache nie blokuje pipeline'u (async, bez await w critical path)
- **Bledy cache nie przerywaja audytu** -- try/catch wokol kazdego zapisu, log warning
- **Czytelny JSON** -- `JSON.stringify(data, null, 2)` z metadanymi (`_timestamp`, `_durationMs`, `_model`, `_tokensUsed`)
- **Shared cache** -- Bright Data (crawl + SERP) wspoldzielone miedzy audytami po URL/keyword hash (oszczednosc API)
- **Vercel:** filesystem read-only -- cache writes fail silently (fire-and-forget). Cache popup zwraca null na produkcji. Lokalnie (localhost) dziala normalnie
- **TTL** -- shared crawl: 24h, shared SERP: 1h (konfigurowalne)
- **gitignore** -- caly katalog `cache/` w `.gitignore`

## Modul `lib/cache.ts`

```typescript
import { createHash } from 'crypto';
import { mkdir, readFile, writeFile, stat } from 'fs/promises';
import path from 'path';

const CACHE_DIR = process.env.CACHE_DIR || path.join(process.cwd(), 'cache');

const DEFAULT_TTL: Record<string, number> = {
  crawl: 24 * 60 * 60 * 1000,   // 24h
  serp:  1 * 60 * 60 * 1000,    // 1h
};

// --- Hash ---

function hashKey(input: string): string {
  return createHash('sha256').update(input).digest('hex').slice(0, 16);
}

// --- Shared cache (crawl, serp) ---

async function writeSharedCache(type: 'crawl' | 'serp', key: string, data: unknown): Promise<void> {
  const dir = path.join(CACHE_DIR, 'shared', type);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${hashKey(key)}.json`);
  const payload = { _key: key, _cachedAt: new Date().toISOString(), ...data };
  await writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
}

async function readSharedCache<T>(type: 'crawl' | 'serp', key: string, maxAgeMs?: number): Promise<T | null> {
  const filePath = path.join(CACHE_DIR, 'shared', type, `${hashKey(key)}.json`);
  try {
    const fileStat = await stat(filePath);
    const age = Date.now() - fileStat.mtimeMs;
    const ttl = maxAgeMs ?? DEFAULT_TTL[type] ?? Infinity;
    if (age > ttl) return null;  // expired
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;  // file not found
  }
}

// --- Per-audit cache ---

async function writeStageCache(auditId: string, stage: string, data: unknown, meta?: StageMeta): Promise<void> {
  const dir = path.join(CACHE_DIR, 'audits', auditId);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${stage}.json`);
  const payload = {
    _stage: stage,
    _timestamp: new Date().toISOString(),
    _durationMs: meta?.durationMs ?? null,
    _model: meta?.model ?? null,
    _tokensUsed: meta?.tokensUsed ?? null,
    ...data,
  };
  await writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
}

async function writeDimensionCache(auditId: string, dimensionId: string, data: unknown, meta?: StageMeta): Promise<void> {
  const dir = path.join(CACHE_DIR, 'audits', auditId, '06_dimensions');
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${dimensionId}.json`);
  const payload = {
    _dimensionId: dimensionId,
    _timestamp: new Date().toISOString(),
    _durationMs: meta?.durationMs ?? null,
    _model: meta?.model ?? null,
    _tokensUsed: meta?.tokensUsed ?? null,
    ...data,
  };
  await writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
}

async function writeAuditMeta(auditId: string, meta: AuditCacheMeta): Promise<void> {
  const dir = path.join(CACHE_DIR, 'audits', auditId);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, '_meta.json');
  await writeFile(filePath, JSON.stringify(meta, null, 2), 'utf-8');
}

async function readStageCache<T>(auditId: string, stage: string): Promise<T | null> {
  const filePath = path.join(CACHE_DIR, 'audits', auditId, `${stage}.json`);
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function readDimensionCache<T>(auditId: string, dimensionId: string): Promise<T | null> {
  const filePath = path.join(CACHE_DIR, 'audits', auditId, '06_dimensions', `${dimensionId}.json`);
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// --- Typy ---

interface StageMeta {
  durationMs: number;
  model?: string;          // model Gemini API (np. gemini-3-flash-preview) -- z getLastCallMeta()
  tokensUsed?: number;     // totalTokenCount z response.usageMetadata -- z getLastCallMeta()
}
// Orchestrator odczytuje getLastCallMeta() z client.ts po kazdym callClaudeJSON
// i przekazuje do writeDimensionCache/writeStageCache.
// Dla benchmarku: suma tokenow ze wszystkich callek EAV (agregowana w extractBenchmarkData).

interface AuditCacheMeta {
  auditId: string;
  mode: AuditMode;
  createdAt: string;
  sourceUrl: string | null;
  keyword: string | null;
  stages: {
    stage: string;
    status: 'completed' | 'error' | 'warning';
    timestamp: string;
    durationMs: number;
    error?: string;        // komunikat bledu jesli status = 'error' lub 'warning'
  }[];
  totalDurationMs: number;
}
```

## Tabela etapow z plikami cache

| # | Etap | Plik cache (per audit) | Shared cache | Zawartosc JSON |
|---|------|----------------------|--------------|----------------|
| 1 | Extract | `01_extract.json` | `shared/crawl/{urlHash}.json` | url, title, content (markdown), wordCount |
| 2 | CSI | `02_csi.json` | -- | CE, SC, CSI, predicate, raw Claude response |
| 3 | SERP | `03_serp.json` | `shared/serp/{keywordHash}.json` | keyword, organic[], paa[], related[] |
| 4 | Competitors | `04_competitors.json` | `shared/crawl/{urlHash}.json` x10 | count, competitors[] (per: position, url, domain, title, wordCount) |
| 5 | Benchmark | `05_benchmark.json` | -- | eavMatrix[], gaps[], competitors[], contentFormats[] |
| 6 | Dimensions | `06_dimensions/{id}.json` x11 | -- | score, summary, strengths[], problems[], raw Claude response |
| 7 | Scoring | `07_scoring.json` | -- | cqs, aiCitability, dimensionScores (per wymiar), eeatAverage |
| 8 | Report | `08_report.json` | -- | recommendations[], structure, blufs[], srlTransforms[], eeatBlocks |

Etapy 3-5 zapisywane tylko w trybie Full.

## Integracja z orchestrator.ts

```typescript
// W orchestrator.ts -- przyklad integracji cache z pipeline'em

async function runAudit(auditId: string, input: AuditInput): Promise<void> {
  const startTime = Date.now();
  const stageLog: AuditCacheMeta['stages'] = [];

  // --- Etap 1: Extract (fire-and-forget, dane juz pobrane przez wizard) ---
  writeStageCache(auditId, '01_extract', {
    url: input.sourceUrl,
    title: input.sourceTitle,
    wordCount: input.sourceWordCount,
    content: input.sourceContent,       // pelna tresc Markdown
  }).catch(console.warn);
  stageLog.push({ stage: '01_extract', status: 'completed', timestamp: new Date().toISOString(), durationMs: 0 });

  // --- Etap 2: CSI ---
  writeStageCache(auditId, '02_csi', input.csi).catch(console.warn);
  stageLog.push({ stage: '02_csi', status: 'completed', timestamp: new Date().toISOString(), durationMs: 0 });

  // --- Etap 3-5: Benchmark (tryb Full) ---
  if (input.mode === 'full') {
    // runBenchmark() filtruje source URL z listy konkurentow
    // SERP + crawl + benchmark -- zapisywane w odpowiednich krokach (03_serp, 04_competitors, 05_benchmark)
  }

  // --- Etap 6: Dimensions (sekwencyjnie, jeden po drugim) ---
  for (const dimId of dimensionIds) {
    await checkCancelled(auditId);
    const t = Date.now();
    try {
      const raw = await callClaudeJSON(prompt);
      const meta = getLastCallMeta();
      const result = parseDimensionResponse(dimId, raw);
      result.rawResponse = raw;           // zachowaj surowa odpowiedz AI
      writeDimensionCache(auditId, dimId, raw, { durationMs: Date.now() - t, model: meta?.model, tokensUsed: meta?.tokensUsed }).catch(console.warn);
      await saveDimensionResults(auditId, [result]);
      // Wykrycie pustej odpowiedzi AI (score=0, brak summary) -> status 'warning'
      const isEmpty = result.score === 0 && !result.summary;
      stageLog.push({ stage: `06_dimensions/${dimId}`, status: isEmpty ? 'warning' : 'completed', ... });
    } catch (err) {
      // Fallback: score=0, pusta odpowiedz -> status 'error' w stageLog
      const fallback = parseDimensionResponse(dimId, {});
      await saveDimensionResults(auditId, [fallback]);
      stageLog.push({ stage: `06_dimensions/${dimId}`, status: 'error', error: err.message, ... });
    }
  }

  // --- Etap 7: Scoring ---
  const scores = calculateScores(dimensionResults, eeatResult);
  writeStageCache(auditId, '07_scoring', scores).catch(console.warn);
  stageLog.push({ stage: '07_scoring', status: 'completed', ... });

  // --- Etap 8: Report (niezalezny zapis rekomendacji i extras) ---
  try {
    const report = await generateReport(...);
    // Osobne try/catch -- blad jednego nie blokuje drugiego
    try { await saveRecommendations(auditId, report.recommendations); } catch { ... }
    try { await saveReportExtras(auditId, { structure, srlTransforms, eeatBlocks, tfidfMapping }); } catch { ... }
    writeStageCache(auditId, '08_report', report).catch(console.warn);
    stageLog.push({ stage: '08_report', status: 'completed', ... });
  } catch (err) {
    stageLog.push({ stage: '08_report', status: 'error', ... });
  }

  // --- Meta ---
  writeAuditMeta(auditId, {
    auditId, mode: input.mode, createdAt: new Date().toISOString(),
    sourceUrl: input.sourceUrl, keyword: input.keyword,
    stages: stageLog, totalDurationMs: Date.now() - startTime,
  }).catch(console.warn);
}
```

## Shared cache -- logika lookup

```typescript
// W lib/services/crawler.ts
async function crawlUrl(url: string, keyword?: string): Promise<CrawlResult> {
  const cached = await readSharedCache<CrawlResult>('crawl', url);
  if (cached) return cached;

  const result = await fetchWithRetry(url, keyword);  // Bright Data Web Unlocker
  writeSharedCache('crawl', url, result).catch(console.warn);
  return result;
}

// W lib/services/dataforseo.ts (nazwa legacy — pod spodem Bright Data SERP API)
async function searchSerp(keyword: string): Promise<SerpResult> {
  const cached = await readSharedCache<SerpResult>('serp', keyword);
  if (cached) return cached;

  const result = await fetchFromBrightData(keyword);  // Bright Data SERP API
  writeSharedCache('serp', keyword, result).catch(console.warn);
  return result;
}
```
