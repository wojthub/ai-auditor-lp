/**
 * Rejestr wpisow bloga - JEDNO ZRODLO metadanych (tytul, opis, daty, slugi obu jezykow).
 * Tresc wpisu lezy osobno w `content/blog/<lang>/<slug>.md` i czyta ja wylacznie serwer
 * (`src/lib/blog.ts`) w czasie builda.
 *
 * Rejestr jest w TS, a nie we frontmatterze plikow .md, bo pary slugow PL/EN potrzebuje tez
 * przelacznik jezyka w Navbarze (komponent kliencki) - ten nie ma dostepu do systemu plikow.
 *
 * Nowy wpis = obiekt tutaj + plik .md dla kazdego jezyka, w ktorym istnieje. Wpis moze miec
 * tylko jedna wersje jezykowa: wtedy nie dostaje hreflanga, a przelacznik prowadzi na indeks
 * bloga w drugim jezyku.
 */

export type BlogLang = 'pl' | 'en';

export interface BlogPostLang {
  /** Slug URL-a w jezyku wpisu: PL po polsku bez znakow diakrytycznych (z fraza glowna), EN po angielsku. */
  slug: string;
  /** H1 i <title>. Sufiks marki dokleja template layoutu. */
  title: string;
  /** Meta description i lead na liscie wpisow. 140-160 znakow. */
  description: string;
}

export interface BlogPost {
  /** Wewnetrzny identyfikator pary - nie trafia do URL-a. */
  id: string;
  /** Data publikacji, YYYY-MM-DD. */
  date: string;
  /** Data ostatniej istotnej aktualizacji tresci, YYYY-MM-DD. */
  updated?: string;
  pl?: BlogPostLang;
  en?: BlogPostLang;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'jak-zaktualizowac-stary-artykul',
    date: '2026-11-09',
    pl: {
      slug: 'jak-zaktualizowac-stary-artykul',
      title: 'Jak zaktualizować stary artykuł pod SEO i AI?',
      description:
        'Jak zaktualizować stary artykuł na blogu, żeby wrócił do Google i trafił do odpowiedzi AI? 9 kroków, zasada zmiany daty i przykład przed i po.',
    },
  },
  {
    id: 'jak-pisac-tresci-pod-ai',
    date: '2026-11-06',
    pl: {
      slug: 'jak-pisac-tresci-pod-ai',
      title: 'Jak pisać treści, które cytuje AI? 10 zasad',
      description:
        'Jak pisać treści pod AI, żeby ChatGPT i AI Overviews je cytowały? 10 zasad z przykładami przed i po, oparte na badaniu GEO i wytycznych Google.',
    },
  },
  {
    id: 'jak-pojawic-sie-w-ai-overviews',
    date: '2026-11-10',
    pl: {
      slug: 'jak-pojawic-sie-w-ai-overviews',
      title: 'Jak pojawić się w AI Overviews? Poradnik dla stron',
      description:
        'Jak trafić do AI Overviews w Google? 7 kroków, nowe ustawienie w Search Console i dane z 996 polskich SERP-ów o tym, jak pozycja wpływa na cytowania.',
    },
  },
  {
    id: 'jak-byc-widocznym-w-chatgpt',
    date: '2026-11-04',
    pl: {
      slug: 'jak-byc-widocznym-w-chatgpt',
      title: 'Jak być widocznym w ChatGPT? Poradnik krok po kroku',
      description:
        'Jak sprawić, żeby ChatGPT cytował Twoją stronę i polecał firmę? 7 kroków opartych na dokumentacji OpenAI - roboty, indeks, treść, wzmianki i pomiar.',
    },
  },
  {
    id: 'co-to-jest-geo',
    date: '2026-11-02',
    pl: {
      slug: 'co-to-jest-geo',
      title: 'Co to jest GEO? Definicja i różnice względem SEO',
      description:
        'GEO to optymalizacja treści pod cytowania w odpowiedziach AI. Zobacz, skąd wziął się termin, czym GEO różni się od SEO i od czego zacząć w praktyce.',
    },
  },
];

/** Wpisy danego jezyka, od najnowszego. */
export function blogPostsFor(lang: BlogLang): (BlogPost & { t: BlogPostLang })[] {
  return BLOG_POSTS.filter((p) => p[lang])
    .map((p) => ({ ...p, t: p[lang] as BlogPostLang }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function blogPostBySlug(lang: BlogLang, slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p[lang]?.slug === slug);
}

/** Pary slugow dla przelacznika jezyka, hreflangow i sitemapy - tylko wpisy z obiema wersjami. */
export const BLOG_SLUG_PAIRS: { en: string; pl: string }[] = BLOG_POSTS.filter((p) => p.pl && p.en).map((p) => ({
  en: (p.en as BlogPostLang).slug,
  pl: (p.pl as BlogPostLang).slug,
}));

/**
 * Czy jezyk ma choc jeden wpis. Regula: bez wpisow NIE linkujemy bloga w menu ani w stopce
 * (pusta lista wyglada na porzucony dzial). Link pojawia sie sam po dodaniu pierwszego wpisu.
 */
export const HAS_BLOG_POSTS: Record<BlogLang, boolean> = {
  pl: BLOG_POSTS.some((p) => p.pl),
  en: BLOG_POSTS.some((p) => p.en),
};
