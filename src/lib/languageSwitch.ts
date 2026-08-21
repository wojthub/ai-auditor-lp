// Pary odpowiadajacych sobie adresow EN <-> PL — JEDNO ZRODLO dla przelacznika jezyka
// w obu Navbarach. Dodajac nowa STATYCZNA podstrone dopisz tu jedna pare, inaczej przelacznik
// cicho wyrzuci uzytkownika na strone glowna zamiast na tlumaczenie tej samej tresci.
//
// Slugi PL sa historyczne (jak-to-dziala, cennik, wymiary); nowe route'y nazywamy po
// angielsku w obu jezykach (patrz `/api` i `/pl/api`), wiec dla nich para jest trywialna.
//
// Podstrony wymiarow i narzedzi maja rozne slugi w obu jezykach, wiec NIE dopisujemy ich tu
// recznie — pary generujemy z tych samych tablic, ktore zasilaja hreflangi i sitemape.
// Dzieki temu nowy wymiar/narzedzie dziala w przelaczniku od razu, bez drugiego wpisu.
import { DIMENSION_SLUG_PAIRS } from '@/data/dimension-types';
import { TOOL_SLUG_PAIRS } from '@/data/tool-types';

const STATIC_PAIRS: ReadonlyArray<readonly [en: string, pl: string]> = [
  ['/', '/pl'],
  ['/how-it-works', '/pl/jak-to-dziala'],
  ['/pricing', '/pl/cennik'],
  ['/dimensions', '/pl/wymiary'],
  ['/tools', '/pl/narzedzia'],
  ['/api', '/pl/api'],
];

const PAIRS: ReadonlyArray<readonly [en: string, pl: string]> = [
  ...STATIC_PAIRS,
  ...DIMENSION_SLUG_PAIRS.map(({ en, pl }) => [`/dimensions/${en}`, `/pl/wymiary/${pl}`] as const),
  ...TOOL_SLUG_PAIRS.map(({ en, pl }) => [`/tools/${en}`, `/pl/narzedzia/${pl}`] as const),
];

/** `/pricing` → `/pricing`, `/pricing/` → `/pricing`, `` → `/`. */
function normalize(pathname: string): string {
  const clean = (pathname || '/').split('?')[0].split('#')[0];
  const trimmed = clean.length > 1 ? clean.replace(/\/+$/, '') : clean;
  return trimmed || '/';
}

/** Adres PL odpowiadajacy biezacej stronie EN. Nieznana sciezka → `/pl`. */
export function plCounterpart(pathname: string): string {
  const path = normalize(pathname);
  return PAIRS.find(([en]) => en === path)?.[1] ?? '/pl';
}

/** Adres EN odpowiadajacy biezacej stronie PL. Nieznana sciezka → `/`. */
export function enCounterpart(pathname: string): string {
  const path = normalize(pathname);
  return PAIRS.find(([, pl]) => pl === path)?.[0] ?? '/';
}
