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
  /** H1 = title. Ta sama zasada co przy wymiarach. */
  heading: string;
  title: string;
  description: string;
  lead: string;
  /** Pasek meta pod H1: koszt, wejscie, wynik. */
  chips: string[];
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
