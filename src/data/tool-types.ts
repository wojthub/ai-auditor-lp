/**
 * Wspolne typy podstron narzedzi — analogicznie do dimension-types.ts.
 *
 * Narzedzia to NIE wymiary audytu: kazde jest osobnym zadaniem (job) w aplikacji, kosztuje
 * kredyt i ma wlasne wejscie (sitemapa albo lista fraz). Dlatego wlasny szablon: zamiast
 * „co podnosi/obniza wynik" mamy kroki dzialania, konfiguracje, wynik i limity.
 */

import type { DimTable, DimFaq } from './dimension-types';

export type { DimTable, DimFaq };

export interface ToolStep {
  title: string;
  desc: string;
}

export interface ToolData {
  slug: string;
  /** Nazwa narzedzia — jak w sidebarze aplikacji. */
  name: string;
  /**
   * H1 = title. Ta sama zasada co przy wymiarach, ale TU jest to fraza sprzedazowa
   * („Narzedzie do ..."), nie pytanie — hero ma zlapac intencje transakcyjna i dac CTA.
   * Pytanie definicyjne przenieslismy nizej, do `defHeading` (H2).
   */
  heading: string;
  title: string;
  description: string;
  /** Krotki lead sprzedazowy pod H1 (co dostaje user), nie definicja. */
  lead: string;
  /** Pasek meta pod H1: koszt, wejscie, wynik. */
  chips: string[];
  /** Pytanie definicyjne — pierwsza sekcja tresci, H2 („Czym jest ...?"). */
  defHeading: string;
  def: string[];
  whyHeading: string;
  why: string[];
  stepsHeading: string;
  steps: ToolStep[];
  /** Opcjonalna tabela parametrow, ktore user ustawia przed startem. */
  configTable?: DimTable;
  outputHeading: string;
  output: string[];
  /** Limity, koszt, zwroty kredytu — uczciwie, bo to pytania przed zakupem. */
  limitsHeading: string;
  limits: string[];
  faq: DimFaq[];
  related: { slug: string; name: string; desc: string }[];
  /** Sciezka narzedzia w aplikacji (deep link CTA). */
  appPath: string;
}

export interface ToolStrings {
  basePath: string;
  breadcrumbRoot: string;
  breadcrumbAria: string;
  /** Nota pod CTA w hero — zamiast obietnicy „za darmo", ktorej narzedzia nie maja. */
  heroNote: string;
  tocAria: string;
  /** Spis tresci w hero. Kolejnosc MUSI odpowiadac kolejnosci sekcji w ToolPage. */
  toc: { id: string; label: string }[];
  labelDefinition: string;
  labelWhy: string;
  labelHow: string;
  labelOutput: string;
  labelLimits: string;
  labelQuestions: string;
  labelRelated: string;
  faqHeading: string;
  relatedHeading: string;
  allTools: string;
  cta: string;
  ctaSuffix: string;
  appUrl: string;
}

/** Pary slugow PL ↔ EN — jedyne zrodlo hreflangow i sitemapy dla narzedzi. */
export const TOOL_SLUG_PAIRS: { pl: string; en: string }[] = [
  { pl: 'klasteryzacja', en: 'keyword-clustering' },
  { pl: 'pruning', en: 'content-pruning' },
  { pl: 'analiza-schema', en: 'schema-gaps' },
  { pl: 'linki-wewnetrzne', en: 'internal-linking' },
];

export function toolEnSlugForPl(pl: string): string | undefined {
  return TOOL_SLUG_PAIRS.find((p) => p.pl === pl)?.en;
}

export function toolPlSlugForEn(en: string): string | undefined {
  return TOOL_SLUG_PAIRS.find((p) => p.en === en)?.pl;
}

export const TOOL_STRINGS_PL: ToolStrings = {
  basePath: '/pl/narzedzia',
  breadcrumbRoot: 'Narzędzia',
  breadcrumbAria: 'Ścieżka nawigacji',
  heroNote: 'Bez abonamentu - płacisz kredytem za analizę.',
  tocAria: 'Na tej stronie',
  toc: [
    { id: 'czym-to-jest', label: 'Czym to jest?' },
    { id: 'po-co', label: 'Po co to?' },
    { id: 'jak-dziala', label: 'Jak działa?' },
    { id: 'wynik', label: 'Co dostajesz?' },
    { id: 'koszt', label: 'Ile kosztuje?' },
    { id: 'faq', label: 'FAQ' },
  ],
  labelDefinition: 'Definicja',
  labelWhy: 'Po co to',
  labelHow: 'Jak działa',
  labelOutput: 'Wynik',
  labelLimits: 'Koszt',
  labelQuestions: 'Pytania',
  labelRelated: 'Powiązane',
  faqHeading: 'Najczęstsze pytania',
  relatedHeading: 'Pozostałe narzędzia',
  allTools: 'Wszystkie narzędzia',
  cta: 'Uruchom narzędzie',
  ctaSuffix: 'lang=pl',
  appUrl: 'https://app.citationone.com',
};

export const TOOL_STRINGS_EN: ToolStrings = {
  basePath: '/tools',
  breadcrumbRoot: 'Tools',
  breadcrumbAria: 'Breadcrumb',
  heroNote: 'No subscription - you pay one credit per run.',
  tocAria: 'On this page',
  toc: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'why', label: 'Why it matters' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'what-you-get', label: 'What you get' },
    { id: 'cost', label: 'What it costs' },
    { id: 'faq', label: 'FAQ' },
  ],
  labelDefinition: 'Definition',
  labelWhy: 'Why',
  labelHow: 'How it works',
  labelOutput: 'Output',
  labelLimits: 'Cost',
  labelQuestions: 'Questions',
  labelRelated: 'Related',
  faqHeading: 'Frequently asked questions',
  relatedHeading: 'Other tools',
  allTools: 'All tools',
  cta: 'Open the tool',
  ctaSuffix: 'lang=en',
  appUrl: 'https://app.citationone.com',
};
