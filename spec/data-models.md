# Modele danych

> Czesc specyfikacji Smart Content Audit. Indeks: [CLAUDE.md](../CLAUDE.md)

## Typy TypeScript (`src/types/index.ts`)

```typescript
// --- Statusy ---

type AuditStatus = 'pending' | 'extracting' | 'benchmarking' | 'analyzing' | 'generating_report' | 'completed' | 'cancelled' | 'error';
type AuditMode = 'content-only' | 'full';
type DimensionStatus = 'pending' | 'running' | 'completed' | 'error';
type ScoreStatus = 'ok' | 'warn' | 'critical';
type Priority = 'critical' | 'high' | 'medium' | 'bonus';
type URRClass = 'UNIQUE' | 'ROOT' | 'RARE';
type EAVType = 'simple' | 'complex' | 'derived' | 'key' | 'multi';
type DimensionId = 'csiAlignment' | 'density' | 'eav' | 'bluf' | 'chunk' | 'cor' | 'tfidf' | 'srl' | 'urr' | 'queryFanout';
type PredicateCategory = 'transactional' | 'informational' | 'navigational' | 'commercial' | 'operational';

// --- Predykaty CSI ---

// 5 kategorii predykatow (z semantic-role-labels-parser):
// transactional: buying, booking, ordering
// informational: knowing, understanding, learning
// navigational: finding, locating, reaching
// commercial:   comparing, reviewing, evaluating
// operational:  using, managing, configuring

// --- SERP Consensus: analiza tresci ---

type AlignmentLevel = 'high' | 'partial' | 'low';
type ContentTypeConfidence = 'high' | 'medium' | 'low';
type DepthExpectation = 'shallow' | 'moderate' | 'deep';

interface SerpContentType {
  primary: string;               // "artykuł blogowy", "strona produktowa", "listing"
  secondary?: string;            // opcjonalny drugi typ (niejednoznaczny SERP)
  confidence: ContentTypeConfidence;
  explanation: string;
}

interface SerpContentFormat {
  dominant: string[];            // 1-3 formaty: "poradnik krok po kroku", "ranking"
  explanation: string;
}

interface SerpContentAngle {
  angle: string;                 // "kompletny poradnik", "szybka odpowiedź"
  depthExpectation: DepthExpectation;
  explanation: string;
}

interface SerpContentData {
  essentialDataPoints: string[];  // 3-8 konkretnych punktów danych
  formats: string[];              // "tabela", "wykres", "konkretne liczby"
  explanation: string;
}

interface SerpConsensus {
  centralEntity: string;
  sourceContext: string;
  centralSearchIntent: string;
  predicate: PredicateCategory;
  alignment: AlignmentLevel;           // obliczane server-side z WSZYSTKICH fieldAlignment
  alignmentExplanation: string;
  fieldAlignment: {
    centralEntity: AlignmentLevel;
    sourceContext: AlignmentLevel;
    centralSearchIntent: AlignmentLevel;
    predicate: AlignmentLevel;
    contentType?: AlignmentLevel;      // opcjonalne — porównanie artykuł vs SERP
    contentFormat?: AlignmentLevel;
    contentAngle?: AlignmentLevel;
  };
  serpThemes: string[];
  topPaaSignals: string[];
  // Analiza treści SERP (opcjonalne — backward compat)
  contentType?: SerpContentType;
  contentFormat?: SerpContentFormat;
  contentAngle?: SerpContentAngle;
  contentData?: SerpContentData;
  // Źródło — typ/format/perspektywa artykułu (określone przez AI)
  sourceContentType?: string;
  sourceContentFormat?: string[];
  sourceContentAngle?: string;
}

// --- Audyt ---

interface Audit {
  id: string;
  userId: string | null;         // FK -> users.id (NULL = stary audyt admina, sprzed systemu auth)
  createdAt: string;
  updatedAt: string;
  status: AuditStatus;
  mode: AuditMode;               // 'content-only' | 'full'
  // Input
  sourceUrl: string | null;
  sourceTitle: string;
  sourceDescription: string | null;   // meta description z HTML (extractDescription) (metadata.description || og:description)
  sourceContent: string;
  sourceWordCount: number;
  keyword: string | null;        // Slowo kluczowe (tryb Full: do SERP)
  // CSI
  centralEntity: string;
  sourceContext: string;
  centralSearchIntent: string;
  predicate: PredicateCategory;
  // Scores
  cqs: number | null;            // 0-100
  aiCitability: number | null;   // 0-10
  // Benchmark (tryb Full)
  benchmark: BenchmarkData | null;
  // Relacje
  dimensions: DimensionResult[];
  eeat: EEATResult | null;
  recommendations: Recommendation[];
  eavTriples: EAVTriple[];
  reportExtras: ReportExtras | null;
  serpConsensus: SerpConsensus | null;
}

// --- Report extras (generated in report phase) ---

interface ReportExtras {
  structure: StructureProposal;
  srlTransforms: SRLTransform[];
  eeatBlocks: EEATBlocks;
  tfidfMapping: TFIDFMapping[];
  titleDescription?: TitleDescriptionAnalysis;  // opcjonalne -- backward compat
}

interface TitleDescriptionAnalysis {
  currentTitle: string;
  currentDescription: string | null;
  recommendedTitle: string;
  recommendedDescription: string;
  titleAnalysis: string;               // 1-2 zdania: co jest dobrze/zle w tytule
  descriptionAnalysis: string;         // 1-2 zdania: co jest dobrze/zle w description
}

// --- Benchmark SERP (tryb Full) ---

interface BenchmarkData {
  keyword: string;
  serpOrganicCount: number;
  paa: string[];                 // People Also Ask
  related: string[];             // Related Searches
  competitors: CompetitorData[];
  eavMatrix: BenchmarkEAV[];
  gaps: BenchmarkGap[];
  contentFormats: ContentFormatIntelligence[];  // Content Format Intelligence
}

interface CompetitorData {
  position: number;
  url: string;
  domain: string;
  title: string;
  wordCount: number;
  // Opcjonalne — wypelniane po scoring (tryb Full, competitors z wystarczajaca trescia)
  estimatedCQS?: number;
  estimatedCitability?: number;
  qualitySummary?: string;
  topStrengths?: string[];
  topWeaknesses?: string[];
}

interface BenchmarkEAV {
  attribute: string;
  urrClass: URRClass;
  coverageCount: number;         // ile z 10 konkurentow pokrywa
  coverageTotal: number;
  inArticle: boolean;
  status: 'covered' | 'gap_p1' | 'gap_p2' | 'gap_p3' | 'gap_p4' | 'unique_opportunity';
}

interface BenchmarkGap {
  attribute: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  urrClass: URRClass;
  coverage: string;              // "7/10", "5/10"
  coverageCount?: number;        // numeryczna wartosc — do sortowania (P1->P4, potem coverageCount desc)
  action: string;                // "Dedykowana sekcja H2"
}

interface ContentFormatIntelligence {
  format: 'tables' | 'lists' | 'infographics' | 'bibliography' | 'videos' | 'faq';
  competitorCount: number;       // ilu z 10 konkurentow uzywa tego formatu
  competitorTotal: number;       // 10 (total analizowanych)
  inArticle: boolean;            // czy nasz artykul uzywa tego formatu
  status: 'covered' | 'gap';    // gap = konkurencja uzywa, my nie
}

// --- Query Fan-Out ---

type FanoutDecompositionType = 'semantic' | 'intent' | 'verification';
type FanoutGroundingTag = 'CONFIRMED' | 'PREDICTED' | 'SERP-ONLY';

interface FanoutSubQuery {
  subQuery: string;
  type: FanoutDecompositionType;
  grounding: FanoutGroundingTag | null;   // null w content-only
  mappedSection: string | null;           // tytul H2 lub null jesli uncovered
  covered: boolean;
}

interface FanoutCoverageStats {
  totalSubQueries: number;
  coveredCount: number;
  coveragePercent: number;
  confirmedCount: number;
  predictedCount: number;
  serpOnlyCount: number;
  uncoveredSubQueries: string[];
}

// --- Wymiary ---

interface DimensionResult {
  id: DimensionId;
  name: string;
  score: number;                 // 0-10
  status: ScoreStatus;
  summary: string;
  strengths: string[];
  problems: DimensionProblem[];
  rawResponse?: unknown;         // surowa odpowiedz AI (zapisywana w DB kolumna raw_response)
}

interface DimensionProblem {
  fragment: string;              // Cytat z tekstu (BEFORE)
  problem: string;               // Opis problemu
  suggestion: string;            // Sugestia poprawki (AFTER)
  impact: 'high' | 'medium' | 'low';
}

// --- EAV ---

interface EAVTriple {
  entity: string;
  attribute: string;
  value: string;
  eavType: EAVType;              // simple | complex | derived | key | multi
  urrClass: URRClass;            // UNIQUE | ROOT | RARE
  covered: boolean;
}

// --- EEAT ---

interface EEATResult {
  experience: EEATDimension;
  expertise: EEATDimension;
  authority: EEATDimension;
  trust: EEATDimension;
  average: number;
}

interface EEATDimension {
  score: number;
  presentSignals: string[];
  missingSignals: string[];
  suggestion: string;
}

// --- Rekomendacje ---

interface Recommendation {
  id: string;                    // generowane przez nanoid() przy zapisie do DB (nie AI-generated)
  priority: Priority;
  title: string;
  dimension: DimensionId | 'eeat';
  before: string;
  after: string;
  impact: string;
  estimatedCqsDelta: number;
}

// --- Struktura artykulu ---

interface StructureProposal {
  sections: ProposedSection[];
  blufs: { sectionTitle: string; suggestedBluf: string }[];
}

interface ProposedSection {
  level: 'h1' | 'h2' | 'h3';
  title: string;
  action: 'ok' | 'change' | 'new';
  reason: string | null;
  children: ProposedSection[];
}

// --- Wizard ---

interface WizardState {
  step: 1 | 2 | 3 | 4;
  inputMode: 'url' | 'text';
  auditMode: AuditMode;         // 'content-only' | 'full'
  url: string;
  text: string;
  keyword: string;               // Slowo kluczowe (tryb Full: do SERP)
  extractedContent: string | null;
  extractedTitle: string | null;
  extractedDescription: string | null;  // meta description z HTML (extractDescription)
  csi: {
    centralEntity: string;
    sourceContext: string;
    centralSearchIntent: string;
    predicate: PredicateCategory;
  } | null;
  csiConfirmed: boolean;
  auditId: string | null;
  dimensionProgress: Record<DimensionId | 'eeat', DimensionStatus>;
  benchmarkProgress: DimensionStatus; // tryb Full: status benchmarku
  reportProgress: DimensionStatus;    // status generowania raportu
  cancelled: boolean;                 // audyt przerwany przez uzytkownika
  completed: boolean;
  serpConsensus: SerpConsensus | null;  // walidacja CSI wobec konsensusu SERP
}

// --- Wizard Prefill (re-run audytu) ---

interface WizardPrefill {
  sourceUrl: string | null;
  keyword: string | null;
  mode: AuditMode;
  csi: CSI;  // CE, SC, CSI, Predicate z poprzedniego audytu
}
```

## Schema bazy danych (Drizzle ORM)

```
Tabele:
- audits            -- id, status, mode ('content-only' | 'full'), source_url, source_title,
                       source_description, source_content, source_word_count, keyword,
                       central_entity, source_context, central_search_intent, predicate,
                       cqs, ai_citability, report_extras (JSON), serp_consensus (JSON),
                       created_at, updated_at
- dimension_results -- id, audit_id (FK), dimension_id, score, summary, strengths (JSON),
                       problems (JSON), raw_response
- eeat_results      -- id, audit_id (FK), experience_score, experience_present (JSON),
                       experience_missing (JSON), experience_suggestion, [analogicznie dla
                       expertise, authority, trust], average
- recommendations   -- id, audit_id (FK), priority, title, dimension, before_text, after_text,
                       impact, estimated_cqs_delta
- eav_triples       -- id, audit_id (FK), entity, attribute, value, eav_type, urr_class, covered
- benchmark_data    -- id, audit_id (FK), keyword, paa (JSON), related (JSON),
                       competitors (JSON), eav_matrix (JSON), gaps (JSON),
                       content_formats (JSON), term_stats (JSON)
- settings          -- key (PK), value, updated_at  (key-value store dla kredencjalow i konfiguracji)
- users             -- id (PK), email (UNIQUE), role ('admin' | 'user'), audit_credits (INT),
                       gemini_api_key (nullable -- per-user Gemini key), created_at
- verification_codes -- id (PK), email, code (6 cyfr), expires_at (ISO +10 min),
                       used (BOOLEAN default false), created_at
```
