/**
 * Wspolne typy podstron wymiarow — uzywane przez dimensions-pl.ts i dimensions-en.ts.
 * Szablon (`DimensionPage.tsx`) importuje WYLACZNIE stad, zeby nie byl zwiazany z jednym jezykiem.
 */

export interface DimTable {
  caption?: string;
  head: [string, string];
  rows: [string, string][];
}

export interface DimFaq {
  q: string;
  a: string;
}

/** Przyklad „przed → po". Tylko tam, gdzie poprawka jest widoczna w jednym akapicie. */
export interface DimBeforeAfter {
  intro: string;
  before: string;
  after: string;
}

export interface DimensionData {
  slug: string;
  /** Nazwa wymiaru — dokladnie jak `dim.*` w translations.ts aplikacji. Breadcrumb, karty, linki. */
  name: string;
  /** H1 strony. MUSI byc identyczny z `title` — inaczej SERP obiecuje co innego, niz widzi klikajacy. */
  heading: string;
  /** <title> podstrony = `heading`. Sufiks marki dokleja template z layoutu. */
  title: string;
  description: string;
  lead: string;
  /** Pasek meta pod H1: skala, sposob pomiaru, dane wejsciowe. */
  /** NIEUZYWANE od 2026-08-21 — chipsy zniknely z hero, pole czeka na decyzje o usunieciu. */
  chips: string[];
  /**
   * Naglowek sekcji „dlaczego". Pelne zdanie, NIE sklejka z `name` — w PL rodzaj gramatyczny
   * zalezy od nazwy wymiaru (zgodnosc jest wazna, graf wazny, pokrycie wazne).
   */
  whyHeading: string;
  why: string[];
  /** Naglowek sekcji „jak liczymy". Tez pelne zdanie — w PL wymaga biernika nazwy wymiaru. */
  howHeading: string;
  how: {
    intro: string[];
    tables: DimTable[];
  };
  raises: string[];
  lowers: string[];
  /** Opcjonalna tabela "zamiast → napisz" pod lista czynnikow. */
  swapTable?: DimTable;
  swapNote?: string;
  report: string[];
  /** Pytania, ktore ludzie realnie zadaja — zamykaja tez wlasny Fan-Out tej podstrony. */
  faq: DimFaq[];
  beforeAfter?: DimBeforeAfter;
  related: { slug: string; name: string; desc: string }[];
}

/** Etykiety szablonu — jedyne teksty, ktore nie pochodza z danych wymiaru. */
export interface DimensionStrings {
  /** Prefiks sciezki: '/pl/wymiary' albo '/dimensions'. */
  basePath: string;
  breadcrumbRoot: string;
  breadcrumbAria: string;
  tocAria: string;
  toc: { id: string; label: string }[];
  labelContext: string;
  labelMethod: string;
  labelFactors: string;
  labelPractice: string;
  labelQuestions: string;
  labelRelated: string;
  factorsHeading: string;
  reportHeading: string;
  faqHeading: string;
  relatedHeading: string;
  raisesLabel: string;
  lowersLabel: string;
  beforeLabel: string;
  afterLabel: string;
  allDimensions: string;
  cta: string;
  ctaHref: string;
}

/**
 * Pary slugow PL ↔ EN — jedno zrodlo dla hreflangow po obu stronach.
 * Dodajac wymiar, dopisz pare TUTAJ, inaczej strona zostanie bez alternatywnej wersji.
 */
export const DIMENSION_SLUG_PAIRS: { pl: string; en: string }[] = [
  { pl: 'zgodnosc-z-csi', en: 'csi-alignment' },
  { pl: 'gestosc-informacji', en: 'information-density' },
  { pl: 'graf-wiedzy', en: 'knowledge-graph-eav' },
  { pl: 'bluf', en: 'bluf' },
  { pl: 'optymalizacja-chunkow', en: 'chunk-optimization' },
  { pl: 'koszt-pozyskania', en: 'cost-of-retrieval' },
  { pl: 'tf-idf', en: 'tf-idf' },
  { pl: 'role-semantyczne', en: 'semantic-roles' },
  { pl: 'pokrycie-fan-out', en: 'query-fan-out' },
  { pl: 'effort-score', en: 'effort-score' },
  { pl: 'e-e-a-t', en: 'e-e-a-t' },
  { pl: 'wartosc-dodana', en: 'information-gain' },
];

export function enSlugForPl(pl: string): string | undefined {
  return DIMENSION_SLUG_PAIRS.find((p) => p.pl === pl)?.en;
}

export function plSlugForEn(en: string): string | undefined {
  return DIMENSION_SLUG_PAIRS.find((p) => p.en === en)?.pl;
}

export const STRINGS_PL: DimensionStrings = {
  basePath: '/pl/wymiary',
  breadcrumbRoot: 'Wymiary',
  breadcrumbAria: 'Ścieżka nawigacji',
  tocAria: 'Na tej stronie',
  // Etykiety w formie pytania dostaja pytajnik (PL); „W raporcie" i „FAQ" pytaniami nie sa.
  toc: [
    { id: 'dlaczego', label: 'Dlaczego to ważne?' },
    { id: 'jak-liczymy', label: 'Jak liczymy?' },
    { id: 'czynniki', label: 'Co podnosi i obniża?' },
    { id: 'raport', label: 'W raporcie' },
    { id: 'faq', label: 'FAQ' },
  ],
  labelContext: 'Kontekst',
  labelMethod: 'Metoda',
  labelFactors: 'Czynniki',
  labelPractice: 'W praktyce',
  labelQuestions: 'Pytania',
  labelRelated: 'Powiązane',
  factorsHeading: 'Co podnosi, a co obniża wynik?',
  reportHeading: 'Co zobaczysz w raporcie?',
  faqHeading: 'Najczęstsze pytania',
  relatedHeading: 'Powiązane wymiary',
  raisesLabel: 'Podnosi',
  lowersLabel: 'Obniża',
  beforeLabel: 'Przed',
  afterLabel: 'Po',
  allDimensions: 'Wszystkie wymiary',
  cta: 'Zbadaj swoją stronę',
  ctaHref: 'https://app.citationone.com/login?lang=pl',
};

export const STRINGS_EN: DimensionStrings = {
  basePath: '/dimensions',
  breadcrumbRoot: 'Dimensions',
  breadcrumbAria: 'Breadcrumb',
  tocAria: 'On this page',
  // Kotwice po angielsku — sekcje na stronie biora id wlasnie stad (patrz DimensionPage).
  toc: [
    { id: 'why-it-matters', label: 'Why it matters' },
    { id: 'how-we-measure-it', label: 'How we measure it' },
    { id: 'what-helps-and-hurts', label: 'What helps and hurts' },
    { id: 'in-the-report', label: 'In the report' },
    { id: 'faq', label: 'FAQ' },
  ],
  labelContext: 'Context',
  labelMethod: 'Method',
  labelFactors: 'Factors',
  labelPractice: 'In practice',
  labelQuestions: 'Questions',
  labelRelated: 'Related',
  factorsHeading: 'What raises and what lowers the score?',
  reportHeading: 'What will you see in the report?',
  faqHeading: 'Frequently asked questions',
  relatedHeading: 'Related dimensions',
  raisesLabel: 'Raises',
  lowersLabel: 'Lowers',
  beforeLabel: 'Before',
  afterLabel: 'After',
  allDimensions: 'All dimensions',
  cta: 'Audit your page',
  ctaHref: 'https://app.citationone.com/login?lang=en',
};
