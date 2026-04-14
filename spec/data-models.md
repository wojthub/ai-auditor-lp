# Modele danych

> Czesc specyfikacji CitationOne. Indeks: [CLAUDE.md](../CLAUDE.md)

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
  sourceLanguage: string | null; // ISO 639-1 (np. 'pl', 'en') — NULL = stary audyt (domyslnie pl)
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
  contentTypeProfile: string | null;  // ID profilu z content-type-profiles.ts (np. 'article', 'listing', 'faq')
  project: string | null;             // tag projektu/klienta (max 50 zn.)
  shareToken: string | null;          // token publicznego linku (nanoid 24 zn.)
}

// --- Report extras (generated in report phase) ---

interface ReportExtras {
  structure: StructureProposal;
  srlTransforms: SRLTransform[];
  eeatBlocks: EEATBlocks;
  tfidfMapping: TFIDFMapping[];  // puste [] w nowych audytach (TF-IDF mapping usuniety z report prompt). Konsumenci uzywaja rawResponse.missingTerms jako PRIMARY source, tfidfMapping jako fallback dla starych audytow
  titleDescription?: TitleDescriptionAnalysis;  // opcjonalne -- backward compat
  schemaAudit?: SchemaRecommendation[];         // opcjonalne -- audyt schema.org JSON-LD (algorytmiczny, backward compat)
}

// --- Schema Auditor (algorytmiczny, 0 Gemini calls) ---

interface ExtractedSchema {
  type: string;               // np. "Article", "FAQPage", "BreadcrumbList"
  properties: string[];       // wykryte wlasciwosci w JSON-LD (np. ["name", "author", "datePublished"])
  raw?: unknown;              // surowy obiekt JSON-LD (opcjonalny, do debugowania)
}

interface SchemaRecommendation {
  type: string;               // typ schema.org (np. "Article", "FAQPage")
  label: { pl: string; en: string };  // czytelna nazwa PL/EN
  status: 'present' | 'incomplete' | 'missing';
  priority: 'required' | 'recommended';
  presentProperties: string[];      // wlasciwosci juz obecne w JSON-LD
  missingRequired: string[];        // brakujace wymagane pola
  missingRecommended: string[];     // brakujace rekomendowane pola
  googleRichResult: boolean;        // czy typ kwalifikuje sie do Google Rich Results
}

// HtmlMetrics rozszerzony o schemas:
// interface HtmlMetrics {
//   ...istniejace pola...
//   schemas?: ExtractedSchema[];    // JSON-LD bloki wyekstrahowane z HTML (obsluguje @graph z WordPress Yoast/RankMath)
// }

// ReportBlockType rozszerzony o 'schemaAudit':
// type ReportBlockType = ... | 'schemaAudit';

// --- Quick Wins (algorytmiczne, 0 Gemini calls) ---

interface QuickWin {
  id: string;
  title: string;
  description: string;
  source: string;           // badge zrodla: 'effort' | 'title' | 'eeat' | 'tfidf' | 'fanout' | 'bluf' | 'chunk'
  targetDimId: string;      // DimensionId do nawigacji
}

// --- EEAT Pre-detection (algorytmiczne, 0 Gemini calls) ---

interface PreDetectedSignals {
  experience: string[];     // wykryte sygnaly Experience
  expertise: string[];      // wykryte sygnaly Expertise
  authority: string[];      // wykryte sygnaly Authority
  trust: string[];          // wykryte sygnaly Trust
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
  // Domain-level backlinks (DataForSEO Backlinks Summary, opcjonalne)
  domainBacklinks?: number;
  domainReferringDomains?: number;
  domainRank?: number;              // 0-1000
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
type FanoutGroundingTag = 'CONFIRMED' | 'OVERVIEW' | 'PREDICTED' | 'SERP-ONLY';

interface FanoutSubQuery {
  subQuery: string;
  type: FanoutDecompositionType;
  grounding: FanoutGroundingTag | null;   // algorytmiczny (postProcessRawResponse), null w content-only
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

type RecommendationAction = 'zamień' | 'dodaj' | 'usuń' | 'przenieś' | 'rozszerz';

interface Recommendation {
  id: string;                    // generowane przez nanoid() przy zapisie do DB (nie AI-generated)
  priority: Priority;
  title: string;
  dimension: DimensionId | 'eeat' | 'aiOverview';
  before: string;
  after: string;
  impact: string;
  estimatedCqsDelta: number;
  beforeVerified?: boolean;      // grounding verification
  section?: string;              // nazwa sekcji H2 (lub "Lead", "Meta description", "Nowa sekcja")
  actionType?: RecommendationAction;  // typ akcji: zamień, dodaj, usuń, przenieś, rozszerz
  clientWhy?: string;            // uzasadnienie w języku klienta (bez żargonu SEO/AI)
}

// --- Struktura artykulu ---

interface StructureProposal {
  sections: ProposedSection[];
  blufs: { sectionTitle: string; suggestedBluf: string }[];
}

interface ProposedSection {
  level: 'h1' | 'h2' | 'h3';
  title: string;
  originalTitle?: string;          // oryginalny tytul sekcji z tresci (tylko dla action='change')
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
  sourceLanguage: string;          // ISO 639-1 (default 'pl'), auto-detected by Gemini
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
  sourceLanguage?: string;
  mode: AuditMode;
  csi: CSI;  // CE, SC, CSI, Predicate z poprzedniego audytu
}

// --- Klasteryzacja slow kluczowych ---

type ClusteringJobStatus = 'pending' | 'running' | 'completed' | 'error';

interface ClusteringConfig {
  clusterThreshold: number;   // 0.5-1.0, default 0.95 — cosine similarity threshold
  minClusterSize: number;     // 1-20, default 1 — minimalny rozmiar klastra
  maxKeywords: number;        // default 500 — cap keywords per job
  serpResults: number;        // 1-10, default 5 — top N organic results per keyword
}

const DEFAULT_CLUSTERING_CONFIG: ClusteringConfig = {
  clusterThreshold: 0.95,
  minClusterSize: 1,
  maxKeywords: 500,
  serpResults: 5,
};

interface ClusteredKeyword {
  keyword: string;
  volume?: number | null;
  clusterId: number;
}

interface ClusterResult {
  clusterId: number;
  label: string;              // Gemini-generated label
  intent: string;             // informational | transactional | navigational | commercial
  pillarSuggestion: string;   // suggested pillar page topic
  keywords: ClusteredKeyword[];
  totalVolume: number;
}

interface ClusteringJob {
  id: string;
  userId: string;
  name: string;
  status: ClusteringJobStatus;
  config: ClusteringConfig;
  keywords: string[];
  keywordCount: number;
  clusters: ClusterResult[] | null;
  clusterCount: number | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Content Pruning & Cannibalization ---

type PruningJobStatus = 'pending' | 'running' | 'completed' | 'error';

interface PruningConfig {
  pruningPercentile: number;        // 50-99, default 90 — percentile for pruning candidates
  cannibalizationThreshold: number; // 0.7-1.0, default 0.9 — cosine similarity threshold
}

const DEFAULT_PRUNING_CONFIG: PruningConfig = {
  pruningPercentile: 90,
  cannibalizationThreshold: 0.9,
};

interface PruningCandidate {
  url: string;
  title: string;
  deviationScore: number;     // cosine distance from main cluster centroid
  clusterLabel: string;
}

interface CannibalizationGroup {
  urls: string[];
  titles: string[];
  similarity: number;         // pairwise cosine similarity
}

interface PruningResults {
  topics: { topic: string; pageCount: number; keywords: string[] }[];
  pruningCandidates: PruningCandidate[];
  cannibalizationGroups: CannibalizationGroup[];
  geminiAnalysis?: {
    pruningRecommendations: { url: string; recommendation: string; contentType?: string }[];
    cannibalizationRecommendations: { urls: string[]; recommendation: string; intent?: string }[];
  };
}

interface PruningJob {
  id: string;
  userId: string;
  name: string;
  status: PruningJobStatus;
  progress: number;           // 0-100%
  config: PruningConfig;
  sitemapUrl: string;
  pageCount: number | null;
  results: PruningResults | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Schema Gaps (standalone narzedzie) ---

type SchemaJobStatus = 'pending' | 'running' | 'completed' | 'error';

interface SchemaPageResult {
  url: string;
  profile: string;                     // detected page profile (article/listing/product/faq/etc.)
  schemas: ExtractedSchema[];          // JSON-LD schemas found on page
  recommendations: SchemaRecommendation[]; // reuse from schema-catalog.ts
  hasIssues: boolean;                  // true jesli missing/incomplete schemas
}

interface SchemaSiteSummary {
  totalPages: number;
  successfulPages: number;             // pages fetched successfully
  successRate: number;                 // 0-100%
  totalIssues: number;                 // pages with missing/incomplete schemas
  missingSchemas: { type: string; count: number }[];  // most common missing schemas ranked
  profileDistribution: { profile: string; count: number }[]; // how many pages per profile
}

interface SchemaJobResults {
  summary: SchemaSiteSummary;
  pages: SchemaPageResult[];
}

interface SchemaJob {
  id: string;
  userId: string;
  name: string;
  status: SchemaJobStatus;
  progress: number;           // 0-100%
  sitemapUrl: string;
  pageCount: number | null;
  results: SchemaJobResults | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}
```

## Schema bazy danych (Drizzle ORM)

```
Tabele:
- audits            -- id, status, mode ('content-only' | 'full'), source_url, source_title,
                       source_description, source_content, source_word_count, keyword,
                       source_language (TEXT nullable, ISO 639-1, NULL=pl),
                       central_entity, source_context, central_search_intent, predicate,
                       cqs, ai_citability, report_extras (JSON), serp_consensus (JSON),
                       content_type_profile (TEXT nullable), error_message (TEXT nullable),
                       project (TEXT nullable), share_token (TEXT nullable), search_volume (INT nullable),
                       created_at, updated_at
- dimension_results -- id, audit_id (FK), dimension_id, score, summary, strengths (JSON),
                       problems (JSON), raw_response
- eeat_results      -- id, audit_id (FK), experience_score, experience_present (JSON),
                       experience_missing (JSON), experience_suggestion, [analogicznie dla
                       expertise, authority, trust], average
- recommendations   -- id, audit_id (FK), priority, title, dimension, before_text, after_text,
                       impact, estimated_cqs_delta, before_verified (BOOL nullable),
                       section (TEXT nullable), action_type (TEXT nullable), client_why (TEXT nullable)
- eav_triples       -- id, audit_id (FK), entity, attribute, value, eav_type, urr_class, covered
- benchmark_data    -- id, audit_id (FK), keyword, paa (JSON), related (JSON),
                       competitors (JSON), eav_matrix (JSON), gaps (JSON),
                       content_formats (JSON), term_stats (JSON)
- settings          -- key (PK), value, updated_at  (key-value store dla kredencjalow i konfiguracji)
- users             -- id (PK), email (UNIQUE), role ('admin' | 'user'), audit_credits (INT),
                       gemini_api_key (nullable -- per-user Gemini key),
                       marketing_consent (BOOLEAN default false), marketing_consent_at (TIMESTAMP nullable),
                       company_name (TEXT nullable), company_logo_url (TEXT nullable), created_at
- verification_codes -- id (PK), email, code (6 cyfr), expires_at (ISO +10 min),
                       used (BOOLEAN default false), created_at
- feedback          -- id, user_id (FK→cascade), type, message, page, created_at
- payments          -- id, user_id, email, ls_order_id (UNIQUE), ls_customer_id, variant_id,
                       credits_added, amount_cents, currency, status, created_at
- report_templates  -- id, user_id (FK→cascade), name, blocks (JSON), is_default (BOOL),
                       created_at, updated_at; index user_id
- clustering_jobs   -- id, user_id (FK→cascade), name, status, config (JSON), keywords (JSON),
                       keyword_count, clusters (JSON), cluster_count, error_message,
                       created_at, updated_at; index user_id + status
- pruning_jobs      -- id, user_id (FK→cascade), name, status, progress (INT default 0),
                       config (JSON), sitemap_url, page_count, results (JSON), error_message,
                       created_at, updated_at; index user_id + status
- schema_jobs       -- id, user_id (FK→cascade), name, status, progress (INT default 0),
                       sitemap_url, page_count, results (JSON), error_message,
                       created_at, updated_at; index user_id + status
```
