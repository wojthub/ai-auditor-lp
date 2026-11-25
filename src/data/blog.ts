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
    id: 'dane-strukturalne',
    date: '2026-10-30',
    pl: {
      slug: 'dane-strukturalne',
      title: 'Dane strukturalne - które wdrożyć i co dają w AI',
      description:
        'Które dane strukturalne schema.org wdrożyć i co dają w AI? Typy dla każdego rodzaju strony, zmiany w wynikach rozszerzonych i jak znaleźć braki.',
    },
    en: {
      slug: 'schema-markup',
      title: 'Which Schema Markup to Use for SEO and AI Search',
      description:
        'Which schema markup to use for SEO and AI search, which rich results Google has phased out, and how to add JSON-LD and find gaps across your whole site.',
    },
  },
  {
    id: 'widocznosc-w-ai',
    date: '2026-11-17',
    pl: {
      slug: 'widocznosc-w-ai',
      title: 'Jak sprawdzić widoczność strony w AI?',
      description:
        'Jak sprawdzić widoczność w AI? Ręczne testy pytań, ruch z ChatGPT w GA4, raport AI Performance w Bing i logi serwera - co mierzy każda z tych metod.',
    },
    en: {
      slug: 'how-to-track-ai-visibility',
      title: 'How to Track AI Visibility Across Platforms',
      description:
        'How to track AI visibility with prompt tests, ChatGPT traffic in GA4, the AI Performance report in Bing and server logs, and what each method measures.',
    },
  },
  {
    id: 'linkowanie-wewnetrzne',
    date: '2026-11-16',
    pl: {
      slug: 'linkowanie-wewnetrzne',
      title: 'Linkowanie wewnętrzne - jak je zaplanować',
      description:
        'Jak zaplanować linkowanie wewnętrzne od klastra tematów, dobrać anchory zgodnie z wytycznymi Google i znaleźć strony, do których nie prowadzi link.',
    },
    en: {
      slug: 'internal-linking-strategy',
      title: 'How to Build an Internal Linking Strategy',
      description:
        'How to build an internal linking strategy from topic clusters, choose anchor text that follows Google guidelines and find orphan pages that no link reaches.',
    },
  },
  {
    id: 'audyt-tresci',
    date: '2026-11-05',
    pl: {
      slug: 'audyt-tresci',
      title: 'Audyt treści SEO i GEO - jak go zrobić krok po kroku',
      description:
        'Jak zrobić audyt treści pod Google i odpowiedzi AI? 7 kroków, checklista 10 obszarów i dane z 4740 polskich audytów o najczęstszych słabościach tekstów.',
    },
    en: {
      slug: 'content-audit',
      title: 'How to Do a Content Audit for SEO and AI Search?',
      description:
        'How to do a content audit for Google and AI answers. 7 steps, a 10-area checklist and data from 4,740 audits on the most common weaknesses of web content.',
    },
  },
  {
    id: 'content-pruning',
    date: '2026-11-03',
    pl: {
      slug: 'content-pruning',
      title: 'Content pruning - jak zrobić porządek w treściach',
      description:
        'Content pruning krok po kroku. Kiedy stronę zostawić, zaktualizować, połączyć albo usunąć, co Google mówi o budżecie indeksowania i jak wdrożyć 301 lub 410.',
    },
    en: {
      slug: 'content-pruning',
      title: 'Content Pruning - How to Clean Up Your Content',
      description:
        'Content pruning step by step. When to keep, update, merge or delete a page, what Google says about crawl budget and how to roll out a 301 redirect or a 410.',
    },
  },
  {
    id: 'kanibalizacja-slow-kluczowych',
    date: '2026-11-12',
    pl: {
      slug: 'kanibalizacja-slow-kluczowych',
      title: 'Kanibalizacja słów kluczowych - co to i jak ją naprawić',
      description:
        'Kanibalizacja słów kluczowych krok po kroku. Jak sprawdzić ją w Search Console, odróżnić od zdrowych wyników i wybrać naprawę - 301, scalenie albo canonical.',
    },
    en: {
      slug: 'keyword-cannibalization',
      title: 'Keyword Cannibalization - What It Is and How to Fix It',
      description:
        'Keyword cannibalization step by step. How to find it in Search Console, tell it apart from healthy results and choose a fix, like a 301, a merge or canonical.',
    },
  },
  {
    id: 'klasteryzacja-slow-kluczowych',
    date: '2026-11-13',
    pl: {
      slug: 'klasteryzacja-slow-kluczowych',
      title: 'Klasteryzacja słów kluczowych - jak zrobić plan treści',
      description:
        'Klasteryzacja słów kluczowych krok po kroku. Jak grupować frazy po wynikach Google, ustalić intencję i zamienić klastry w plan treści bez kanibalizacji.',
    },
    en: {
      slug: 'keyword-clustering',
      title: 'What Is Keyword Clustering and How to Do It?',
      description:
        'Keyword clustering step by step. How to group keywords by Google results, define search intent and turn clusters into a content plan without cannibalization.',
    },
  },
  {
    id: 'jak-zaktualizowac-stary-artykul',
    date: '2026-11-09',
    pl: {
      slug: 'jak-zaktualizowac-stary-artykul',
      title: 'Jak zaktualizować stary artykuł pod SEO i AI?',
      description:
        'Jak zaktualizować stary artykuł na blogu, żeby wrócił do Google i trafił do odpowiedzi AI? 9 kroków, zasada zmiany daty i przykład przed i po.',
    },
    en: {
      slug: 'how-to-update-old-blog-posts',
      title: 'How to Update Old Blog Posts for SEO and AI?',
      description:
        'How to update old blog posts so they climb back in Google and get cited in AI answers. 9 steps, a rule for changing the date and a before and after example.',
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
    en: {
      slug: 'how-to-write-content-for-ai-search',
      title: 'How to Write Content for AI Search? 10 Rules',
      description:
        'How to write content for AI search that ChatGPT and AI Overviews cite. 10 rules with before and after examples, based on the GEO study and Google guidelines.',
    },
  },
  {
    id: 'jak-pojawic-sie-w-ai-overviews',
    date: '2026-11-10',
    pl: {
      slug: 'jak-pojawic-sie-w-ai-overviews',
      title: 'Jak pojawić się w AI Overviews? Poradnik dla stron',
      description:
        'Jak trafić do AI Overviews w Google? 7 kroków, nowe ustawienie w Search Console i dane z 1131 polskich SERP-ów o tym, jak pozycja wpływa na cytowania.',
    },
    en: {
      slug: 'how-to-appear-in-ai-overviews',
      title: 'How to Appear in AI Overviews? A Guide for Websites',
      description:
        'How to appear in Google AI Overviews. 7 steps, the new Search Console setting and data from 1,131 results pages on how ranking affects AI Overview citations.',
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
    en: {
      slug: 'how-to-rank-in-chatgpt',
      title: 'How to Rank in ChatGPT? A Step-by-Step Guide',
      description:
        'How to rank in ChatGPT and get your business recommended. 7 steps based on OpenAI documentation, covering crawlers, indexing, content, mentions and tracking.',
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
    en: {
      slug: 'what-is-geo',
      title: 'What Is GEO? Generative Engine Optimization Explained',
      description:
        'GEO is optimizing content to get cited in AI answers. Learn where the term comes from, how GEO differs from SEO and what to do first, with data from the study.',
    },
  },
];

/**
 * „Najważniejsze artykuły” w panelu bocznym wpisu (pod karta CTA, od 1180 px). Kolejnosc = kolejnosc
 * na liscie. Id pary, wiec ta sama lista dziala w PL i EN; wpis bez wersji w danym jezyku i wpis
 * aktualnie czytany sa pomijane.
 */
export const FEATURED_POST_IDS: string[] = ['jak-pojawic-sie-w-ai-overviews', 'jak-byc-widocznym-w-chatgpt', 'jak-pisac-tresci-pod-ai'];

/** Wpisy danego jezyka, od najnowszego. */
export function blogPostsFor(lang: BlogLang): (BlogPost & { t: BlogPostLang })[] {
  return BLOG_POSTS.filter((p) => p[lang])
    .map((p) => ({ ...p, t: p[lang] as BlogPostLang }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Lista „Najważniejsze artykuły” dla danego jezyka, bez wpisu `excludeSlug`. */
export function featuredBlogPosts(lang: BlogLang, excludeSlug: string): { slug: string; title: string }[] {
  return FEATURED_POST_IDS.map((id) => BLOG_POSTS.find((p) => p.id === id)?.[lang])
    .filter((t): t is BlogPostLang => !!t && t.slug !== excludeSlug)
    .map((t) => ({ slug: t.slug, title: t.title }));
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
