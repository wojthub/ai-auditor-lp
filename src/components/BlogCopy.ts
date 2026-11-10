import type { BlogLang } from '@/data/blog';

// Etykiety szablonow bloga - jedyne teksty, ktore nie pochodza z rejestru ani z plikow .md.
export const BLOG_COPY = {
  pl: {
    base: '/pl/blog',
    home: '/pl',
    label: 'Blog',
    h1: 'Poradniki GEO i SEO',
    lead: 'Praktyczne poradniki o tym, jak pisać i porządkować treści, żeby odpowiedzi AI i Google chętniej je cytowały.',
    empty: 'Pierwsze poradniki pojawią się tu wkrótce.',
    readMore: 'Czytaj poradnik',
    minutes: (n: number) => `${n} min czytania`,
    published: 'Opublikowano',
    updated: 'Zaktualizowano',
    toc: 'Spis treści',
    breadcrumbAria: 'Ścieżka nawigacji',
    author: 'Wojciech Władziński-Ulatowski',
    authorRole: 'Twórca CitationOne',
    ctaTitle: 'Sprawdź swoją stronę w audycie GEO',
    ctaText: 'CitationOne ocenia treść w 10 wymiarach, porównuje ją z top 10 Google i zwraca poprawki przed/po. Trzy pierwsze audyty są darmowe.',
    cta: 'Zrób darmowy audyt',
    sideText: 'Ocena treści w 10 wymiarach, porównanie z top 10 Google i poprawki przed/po. Trzy pierwsze audyty są darmowe.',
    barTitle: 'Audyt GEO Twojej strony',
    barSub: '3 pierwsze audyty za darmo',
    barCta: 'Zrób audyt',
    more: 'Więcej poradników',
    back: 'Wszystkie poradniki',
    locale: 'pl-PL',
  },
  en: {
    base: '/blog',
    home: '/',
    label: 'Blog',
    h1: 'GEO and SEO guides',
    lead: 'Practical guides on writing and structuring content so AI answers and Google are more likely to cite it.',
    empty: 'The first guides are coming soon.',
    readMore: 'Read the guide',
    minutes: (n: number) => `${n} min read`,
    published: 'Published',
    updated: 'Updated',
    toc: 'Contents',
    breadcrumbAria: 'Breadcrumb',
    author: 'Wojciech Władziński-Ulatowski',
    authorRole: 'Creator of CitationOne',
    ctaTitle: 'Check your page with a GEO audit',
    ctaText: 'CitationOne scores your content across 10 dimensions, compares it with the Google top 10 and returns before/after fixes. Your first three audits are free.',
    cta: 'Run a free audit',
    sideText: 'A content score across 10 dimensions, a comparison with the Google top 10 and before/after fixes. Your first three audits are free.',
    barTitle: 'GEO audit for your page',
    barSub: 'First 3 audits free',
    barCta: 'Run an audit',
    more: 'More guides',
    back: 'All guides',
    locale: 'en-US',
  },
} as const satisfies Record<BlogLang, unknown>;

export const AUTHOR_URL = 'https://www.linkedin.com/in/wojciech-wladzinski-ulatowski/';

/** Data z YYYY-MM-DD bez strefy czasowej - inaczej build w UTC-x cofnalby dzien. */
export function formatDate(date: string, lang: BlogLang): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Intl.DateTimeFormat(BLOG_COPY[lang].locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
