import type { BlogLang } from '@/data/blog';

/**
 * Wykresy z danymi we wpisach bloga - JEDNO ZRODLO liczb na wykresach.
 *
 * We wpisie Markdown wstawiasz sam znacznik w osobnym akapicie:
 *   <figure data-chart="aio-pozycja"></figure>
 * a `src/lib/blog.ts` zamienia go przy buildzie na wykres SVG osadzony w HTML (liczby i podpisy
 * sa tekstem, ktory czytaja wyszukiwarki i roboty AI) z podpowiedzia po najechaniu na slupek.
 * Nieznane id przerywa build.
 *
 * Aktualizacja danych: zmien `values` (i `asOf`/podpisy z liczebnoscia proby). Liczby w PROZIE
 * artykulow trzeba poprawic osobno - grep po starej wartosci w `content/blog/`.
 * Schematy bez danych (drzewa decyzji, procesy) zostaja jako pliki SVG w `public/blog/`.
 */

type L = Record<BlogLang, string>;

/** Kolor slupka: marka, jasny turkus, szary punkt odniesienia, pomarancz dla wyniku ujemnego. */
export type ChartTone = 'accent' | 'light' | 'gray' | 'warn';

interface ChartBase {
  title: L;
  subtitle: L;
  /** Opis dla czytnikow ekranu - pelne dane jednym zdaniem. */
  summary: L;
  caption: L;
  /** Ile miejsc po przecinku pokazywac. */
  decimals: number;
  /** Sufiks wartosci, np. '%'. */
  unit?: string;
}

export interface ColumnChart extends ChartBase {
  type: 'columns';
  categories: string[];
  /** Podpis kategorii w podpowiedzi, np. „Pozycja” -> „Pozycja 3: 49,0%”. */
  categoryLabel: L;
  axisLabel: L;
  values: number[];
  max: number;
  ticks: number[];
  /** Pasmo zakresu kategorii [od, do] (indeksy), z podpisem. */
  band?: { from: number; to: number; label: L };
}

export interface BarChart extends ChartBase {
  type: 'bars';
  labels: Record<BlogLang, string[]>;
  values: number[];
  tones: ChartTone[];
  max: number;
  ticks: number[];
  /** Pionowa linia odniesienia (np. poziom tekstu bez zmian). */
  reference?: { value: number; label: L };
  legend?: { tone: ChartTone; label: L };
  /** Kafelki z liczbami pod wykresem. */
  tiles?: { value: L; label: L }[];
}

export interface MatrixChart extends ChartBase {
  type: 'matrix';
  labels: Record<BlogLang, string[]>;
  /** Symetryczna macierz; przekatna ignorowana. */
  cells: number[][];
  max: number;
  /** Indeksy wierszy tworzacych klaster (ciagly zakres) - obrys na macierzy. */
  cluster?: { from: number; to: number; label: L };
  legendLabel: L;
  unitWord: { one: L; few: L; many: L };
}

export type BlogChart = ColumnChart | BarChart | MatrixChart;

const AIO_SAMPLE = { pl: '1131 polskich SERP-ów z audytów CitationOne, stan na 25.11.2026', en: '1,131 Polish results pages from CitationOne audits, as of 2026-11-25' };
const AUDIT_SAMPLE = { pl: '4740 audytów polskich stron', en: '4,740 audits of Polish pages' };

export const BLOG_CHARTS: Record<string, BlogChart> = {
  'aio-pozycja': {
    type: 'columns',
    title: { pl: 'Pozycja w TOP 10 a cytowanie w AI Overview', en: 'Top 10 position vs AI Overview citation' },
    subtitle: AIO_SAMPLE,
    summary: {
      pl: 'Wykres słupkowy: odsetek SERP-ów, w których strona z danej pozycji była cytowana w AI Overview. Pozycja 1 - 62,0%, 2 - 55,9%, 3 - 49,0%, 4 - 43,9%, 5 - 36,8%, 6 - 35,7%, 7 - 33,9%, 8 - 29,7%, 9 - 28,4%, 10 - 27,0%.',
      en: 'Bar chart of the share of results pages in which the page in a given position was cited in the AI Overview. Position 1 62.0%, 2 55.9%, 3 49.0%, 4 43.9%, 5 36.8%, 6 35.7%, 7 33.9%, 8 29.7%, 9 28.4%, 10 27.0%.',
    },
    caption: {
      pl: 'Szansa na cytowanie spada najszybciej w pierwszej piątce. Źródło: analiza 1131 polskich SERP-ów z audytów CitationOne, stan na 25.11.2026.',
      en: 'The chance of being cited drops fastest within the top 5. Source: analysis of 1,131 Polish search results pages from CitationOne audits, as of 2026-11-25.',
    },
    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    categoryLabel: { pl: 'Pozycja', en: 'Position' },
    axisLabel: { pl: 'pozycja w wynikach organicznych', en: 'position in organic results' },
    values: [62.0, 55.9, 49.0, 43.9, 36.8, 35.7, 33.9, 29.7, 28.4, 27.0],
    decimals: 1,
    unit: '%',
    max: 70,
    ticks: [0, 20, 40, 60],
    band: { from: 5, to: 9, label: { pl: 'pozycje 6-10: pasmo ~27-36%', en: 'positions 6-10: ~27-36%' } },
  },

  'audyt-wymiary': {
    type: 'bars',
    title: { pl: 'Które cechy treści wypadają najsłabiej?', en: 'Which content qualities score lowest?' },
    subtitle: { pl: `Średnia ocena wymiaru w skali 0-10, ${AUDIT_SAMPLE.pl}`, en: `Average dimension score on a 0-10 scale, ${AUDIT_SAMPLE.en}` },
    summary: {
      pl: 'Wykres słupkowy średnich ocen wymiarów w 4740 polskich audytach, skala 0-10. Samodzielność sekcji 5,13, graf wiedzy 5,21, koszt pozyskania 5,40, BLUF 5,50, gęstość informacji 5,81, pokrycie Fan-Out 5,83, Effort Score 5,93, TF-IDF 6,14, role semantyczne 6,20, zgodność z CSI 6,45.',
      en: 'Bar chart of average dimension scores in 4,740 Polish audits, on a 0-10 scale. Chunk optimization 5.13, knowledge graph 5.21, cost of retrieval 5.40, BLUF 5.50, information density 5.81, fan-out coverage 5.83, effort score 5.93, TF-IDF 6.14, semantic roles 6.20, CSI alignment 6.45.',
    },
    caption: {
      pl: 'Najsłabiej wypadają cechy, które decydują o cytowaniu fragmentu przez AI. Źródło: 4740 audytów polskich stron w CitationOne.',
      en: 'The weakest qualities are the ones that decide whether AI cites a passage. Source: 4,740 audits of Polish pages in CitationOne.',
    },
    labels: {
      pl: ['Samodzielność sekcji', 'Graf wiedzy', 'Koszt pozyskania', 'BLUF', 'Gęstość informacji', 'Pokrycie Fan-Out', 'Effort Score', 'TF-IDF', 'Role semantyczne', 'Zgodność z CSI'],
      en: ['Chunk optimization', 'Knowledge graph', 'Cost of retrieval', 'BLUF', 'Information density', 'Fan-out coverage', 'Effort score', 'TF-IDF', 'Semantic roles', 'CSI alignment'],
    },
    values: [5.13, 5.21, 5.4, 5.5, 5.81, 5.83, 5.93, 6.14, 6.2, 6.45],
    tones: ['accent', 'accent', 'accent', 'accent', 'light', 'light', 'light', 'light', 'light', 'light'],
    decimals: 2,
    max: 10,
    ticks: [0, 5, 10],
    legend: { tone: 'accent', label: { pl: 'cztery najsłabsze wymiary', en: 'four weakest dimensions' } },
  },

  'badanie-geo': {
    type: 'bars',
    title: { pl: 'Które zmiany w treści zwiększają widoczność w AI?', en: 'Which content changes raise AI visibility?' },
    subtitle: { pl: 'Badanie GEO (Princeton, KDD 2024), wynik widoczności w odpowiedzi AI', en: 'GEO study (Princeton, KDD 2024), visibility score in the AI answer' },
    summary: {
      pl: 'Wykres słupkowy z badania GEO: wynik widoczności w odpowiedzi AI po dodaniu cytatów 27,8, statystyk 25,9 i odwołań do źródeł 24,9, wobec 19,5 dla tekstu bez zmian i 17,8 po upychaniu słów kluczowych.',
      en: 'Bar chart from the GEO study. Visibility score in the AI answer after adding quotations 27.8, statistics 25.9 and source citations 24.9, against 19.5 for unchanged text and 17.8 after keyword stuffing.',
    },
    caption: {
      pl: 'Cytaty, statystyki i źródła podnoszą widoczność, a upychanie słów kluczowych ją obniża. Źródło: Aggarwal i in., GEO - Generative Engine Optimization, KDD 2024.',
      en: 'Quotations, statistics and sources raise visibility, while keyword stuffing lowers it. Source: Aggarwal et al., GEO - Generative Engine Optimization, KDD 2024.',
    },
    labels: {
      pl: ['Dodanie cytatów', 'Dodanie statystyk', 'Dodanie odwołań do źródeł', 'Tekst bez zmian', 'Upychanie słów kluczowych'],
      en: ['Adding quotations', 'Adding statistics', 'Citing sources', 'Unchanged text', 'Keyword stuffing'],
    },
    values: [27.8, 25.9, 24.9, 19.5, 17.8],
    tones: ['accent', 'accent', 'accent', 'gray', 'warn'],
    decimals: 1,
    max: 30,
    ticks: [0, 10, 20, 30],
    reference: { value: 19.5, label: { pl: 'poziom tekstu bez zmian', en: 'unchanged text level' } },
  },

  'klasteryzacja-pl': {
    type: 'matrix',
    title: { pl: 'Ile wyników Google mają wspólnych frazy?', en: 'How many Google results do keywords share?' },
    subtitle: { pl: 'Wspólne adresy w TOP 5, frazy „pompa ciepła …”, Polska, listopad 2026', en: 'Shared URLs in the top 5, "pompa ciepła …" keywords, Poland, November 2026' },
    summary: {
      pl: 'Macierz wspólnych wyników w TOP 5 dla 8 fraz o pompach ciepła. Pompa ciepła cena i ile kosztuje pompa ciepła mają 3 wspólne wyniki, ile kosztuje pompa ciepła i koszt montażu 4, cena i koszt montażu 2, czy pompa ciepła się opłaca i opinie 1, pozostałe pary 0.',
      en: 'Matrix of shared top 5 results for 8 Polish heat pump keywords.',
    },
    caption: {
      pl: 'Trzy frazy o koszcie tworzą klaster, a pozostałe pięć wymaga osobnych tekstów. Źródło: wyniki Google dla Polski pobrane w listopadzie 2026, analiza CitationOne.',
      en: 'Source: Google results for Poland pulled in November 2026, CitationOne analysis.',
    },
    labels: {
      pl: ['cena', 'ile kosztuje', 'koszt montażu', 'czy się opłaca', 'opinie', 'powietrze-woda', 'do starego domu', 'z fotowoltaiką'],
      en: ['cena', 'ile kosztuje', 'koszt montażu', 'czy się opłaca', 'opinie', 'powietrze-woda', 'do starego domu', 'z fotowoltaiką'],
    },
    cells: [
      [0, 3, 2, 0, 0, 0, 0, 0],
      [3, 0, 4, 0, 0, 0, 0, 0],
      [2, 4, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    decimals: 0,
    max: 4,
    cluster: { from: 0, to: 2, label: { pl: 'klaster kosztów', en: 'cost cluster' } },
    legendLabel: { pl: 'wspólne wyniki:', en: 'shared results:' },
    unitWord: { one: { pl: 'wspólny wynik', en: 'shared result' }, few: { pl: 'wspólne wyniki', en: 'shared results' }, many: { pl: 'wspólnych wyników', en: 'shared results' } },
  },

  'klasteryzacja-en': {
    type: 'matrix',
    title: { pl: 'Ile wyników Google mają wspólnych frazy?', en: 'How many Google results do keywords share?' },
    subtitle: { pl: 'Wspólne adresy w TOP 5, frazy „heat pump …”, USA, listopad 2026', en: 'Shared URLs in the top 5, "heat pump …" keywords, United States, November 2026' },
    summary: {
      pl: 'Macierz wspólnych wyników w TOP 5 dla 8 angielskich fraz o pompach ciepła.',
      en: 'Matrix of shared top 5 results for 8 heat pump keywords. Price and how much does it cost share 3 results, price and installation cost 3, how much does it cost and installation cost 2, is it worth it and reviews 2, is it worth it and for old house 1, reviews and for old house 1, and all other pairs 0.',
    },
    caption: {
      pl: 'Źródło: wyniki Google dla USA pobrane w listopadzie 2026, analiza CitationOne.',
      en: 'Three cost keywords form a cluster, while the other five need separate articles. Source: US Google results pulled in November 2026, CitationOne analysis.',
    },
    labels: {
      pl: ['price', 'how much does it cost', 'installation cost', 'is it worth it', 'reviews', 'air to water', 'for old house', 'with solar panels'],
      en: ['price', 'how much does it cost', 'installation cost', 'is it worth it', 'reviews', 'air to water', 'for old house', 'with solar panels'],
    },
    cells: [
      [0, 3, 3, 0, 0, 0, 0, 0],
      [3, 0, 2, 0, 0, 0, 0, 0],
      [3, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 1, 0],
      [0, 0, 0, 2, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    decimals: 0,
    max: 4,
    cluster: { from: 0, to: 2, label: { pl: 'klaster kosztów', en: 'cost cluster' } },
    legendLabel: { pl: 'wspólne wyniki:', en: 'shared results:' },
    unitWord: { one: { pl: 'wspólny wynik', en: 'shared result' }, few: { pl: 'wspólne wyniki', en: 'shared results' }, many: { pl: 'wspólnych wyników', en: 'shared results' } },
  },

  'ai-wspolne-zrodla': {
    type: 'bars',
    title: { pl: 'Ile wspólnych źródeł mają platformy AI?', en: 'How many sources do AI platforms share?' },
    subtitle: { pl: 'Średni odsetek wspólnych domen w źródłach odpowiedzi na tę samą frazę', en: 'Average share of common domains among sources for the same query' },
    summary: {
      pl: 'Wykres słupkowy średniego odsetka wspólnych domen w źródłach odpowiedzi AI dla tej samej frazy. AI Overviews i AI Mode 23,3%, AI Mode i ChatGPT 5,9%, AI Overviews i ChatGPT 5,5%. 81% domen pojawia się tylko na jednej platformie, 2,3% na wszystkich trzech.',
      en: 'Bar chart of the average share of common domains among AI answer sources for the same query. AI Overviews and AI Mode 23.3%, AI Mode and ChatGPT 5.9%, AI Overviews and ChatGPT 5.5%. 81% of domains appear on only one platform, 2.3% on all three.',
    },
    caption: {
      pl: 'ChatGPT i Google cytują prawie zupełnie inne strony. Źródło: analiza 366 polskich fraz z audytów CitationOne, 28.10-25.11.2026.',
      en: 'ChatGPT and Google cite almost entirely different pages. Source: analysis of 366 Polish queries from CitationOne audits, 2026-10-28 to 2026-11-25.',
    },
    labels: {
      pl: ['AI Overviews i AI Mode', 'AI Mode i ChatGPT', 'AI Overviews i ChatGPT'],
      en: ['AI Overviews and AI Mode', 'AI Mode and ChatGPT', 'AI Overviews and ChatGPT'],
    },
    values: [23.3, 5.9, 5.5],
    tones: ['accent', 'warn', 'warn'],
    decimals: 1,
    unit: '%',
    max: 30,
    ticks: [0, 10, 20, 30],
    tiles: [
      { value: { pl: '81%', en: '81%' }, label: { pl: 'domen cytuje tylko jedna z trzech platform', en: 'of domains are cited by only one of three platforms' } },
      { value: { pl: '2,3%', en: '2.3%' }, label: { pl: 'domen cytują wszystkie trzy platformy', en: 'of domains are cited by all three platforms' } },
    ],
  },
};
