import type { Metadata } from 'next';
import { blogPostBySlug, blogPostsFor, type BlogLang, type BlogPost, type BlogPostLang } from '@/data/blog';
import { BLOG_COPY, AUTHOR_URL } from '@/components/BlogCopy';
import { alternatesFor, SITE } from '@/lib/languageSwitch';
import { socialMeta } from '@/lib/socialMeta';
import { renderPost, assertBlogRegistry, type RenderedPost } from '@/lib/blog';
import type { BlogListItem } from '@/components/BlogIndex';

// Wspolna logika stron bloga (metadane, JSON-LD, dane listy) dla obu jezykow - strony w app/
// zostaja cienkie i rozni je tylko Navbar/Footer.

const INDEX_META = {
  pl: {
    title: 'Blog - poradniki GEO i SEO',
    description:
      'Poradniki o pisaniu i porządkowaniu treści pod GEO i SEO: jak zwiększyć szansę na cytowanie w ChatGPT, Google AI Overviews i AI Mode.',
  },
  en: {
    title: 'Blog - GEO and SEO guides',
    description:
      'Guides on writing and structuring content for GEO and SEO: how to raise the chance of being cited in ChatGPT, Google AI Overviews and AI Mode.',
  },
} as const;

export function blogIndexMetadata(lang: BlogLang): Metadata {
  const m = INDEX_META[lang];
  const path = BLOG_COPY[lang].base;
  return {
    title: m.title,
    description: m.description,
    ...socialMeta({ lang, path, title: `${m.title} | CitationOne`, description: m.description }),
    alternates: alternatesFor(path),
  };
}

export async function blogListItems(lang: BlogLang): Promise<BlogListItem[]> {
  assertBlogRegistry();
  return Promise.all(
    blogPostsFor(lang).map(async (p) => ({ ...p, readingMinutes: (await renderPost(lang, p.t.slug)).readingMinutes })),
  );
}

export const BLOG_PLACEHOLDER_SLUG = '__empty';

export function blogStaticParams(lang: BlogLang) {
  assertBlogRegistry();
  const slugs = blogPostsFor(lang).map((p) => ({ slug: p.t.slug }));
  // Static export odrzuca segment [slug] bez zadnej sciezki ("missing generateStaticParams()").
  // Dopoki jezyk nie ma wpisu, generujemy jedna zaslepke: strona wola notFound(), wiec dostaje
  // tresc 404 z noindex, nie trafia do sitemapy ani na liste i nikt do niej nie linkuje.
  return slugs.length > 0 ? slugs : [{ slug: BLOG_PLACEHOLDER_SLUG }];
}

function postUrl(lang: BlogLang, slug: string) {
  return `${SITE}${BLOG_COPY[lang].base}/${slug}`;
}

export function blogPostMetadata(lang: BlogLang, slug: string): Metadata {
  const post = blogPostBySlug(lang, slug);
  const t = post?.[lang];
  if (!post || !t) return {};
  const other: BlogLang = lang === 'pl' ? 'en' : 'pl';
  const url = postUrl(lang, slug);
  const pair = post[other];
  const social = socialMeta({ lang, path: url, title: `${t.title} | CitationOne`, description: t.description });
  const enUrl = lang === 'en' ? url : pair ? postUrl('en', pair.slug) : undefined;
  return {
    title: t.title,
    description: t.description,
    ...social,
    openGraph: {
      ...social.openGraph,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [AUTHOR_URL],
    },
    alternates: {
      canonical: url,
      // Wpis bez tlumaczenia nie emituje hreflanga - wskazanie na indeks drugiego jezyka byloby nieprawdziwe.
      languages: pair
        ? { [lang]: url, [other]: postUrl(other, pair.slug), 'x-default': enUrl as string }
        : undefined,
    },
  };
}

export function blogPostData(lang: BlogLang, slug: string): { post: BlogPost; t: BlogPostLang } | undefined {
  const post = blogPostBySlug(lang, slug);
  const t = post?.[lang];
  return post && t ? { post, t } : undefined;
}

/** Do 3 innych wpisow tego jezyka, od najnowszego. */
export function moreBlogPosts(lang: BlogLang, slug: string) {
  return blogPostsFor(lang)
    .filter((p) => p.t.slug !== slug)
    .slice(0, 3)
    .map((p) => ({ slug: p.t.slug, title: p.t.title }));
}

// ---------- Schema.org ----------
// Jeden graf z wezlami o stalych @id: wydawca, serwis i autor sa zdefiniowane raz i wskazywane
// referencja z artykulu, strony i bloga. sameAs autora = LinkedIn, wydawcy = profile firmy.

const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;
const PERSON_ID = `${SITE}/#wojciech-wladzinski-ulatowski`;

const ORG_SAME_AS = ['https://www.linkedin.com/company/citationone/', 'https://www.facebook.com/profile.php?id=61591623376464'];

function inLanguage(lang: BlogLang) {
  return lang === 'pl' ? 'pl-PL' : 'en-US';
}

function homeUrl(lang: BlogLang) {
  return lang === 'pl' ? `${SITE}/pl` : SITE;
}

function blogId(lang: BlogLang) {
  return `${SITE}${BLOG_COPY[lang].base}#blog`;
}

/** Wydawca, serwis i autor - wspolne dla listy i wpisow. */
function entityNodes(lang: BlogLang) {
  const c = BLOG_COPY[lang];
  return [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'CitationOne',
      url: SITE,
      logo: { '@type': 'ImageObject', '@id': `${SITE}/#logo`, url: `${SITE}/logo.png`, width: 1000, height: 240, caption: 'CitationOne' },
      image: { '@id': `${SITE}/#logo` },
      founder: { '@id': PERSON_ID },
      sameAs: ORG_SAME_AS,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'CitationOne',
      url: SITE,
      publisher: { '@id': ORG_ID },
      inLanguage: ['en-US', 'pl-PL'],
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: c.author,
      givenName: 'Wojciech',
      familyName: 'Władziński-Ulatowski',
      jobTitle: c.authorRole,
      image: { '@type': 'ImageObject', url: `${SITE}/author.jpg` },
      url: AUTHOR_URL,
      worksFor: { '@id': ORG_ID },
      sameAs: [AUTHOR_URL],
    },
  ];
}

function blogNode(lang: BlogLang) {
  const c = BLOG_COPY[lang];
  return {
    '@type': 'Blog',
    '@id': blogId(lang),
    name: `CitationOne ${c.label} - ${c.h1}`,
    description: INDEX_META[lang].description,
    url: `${SITE}${c.base}`,
    inLanguage: inLanguage(lang),
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
  };
}

export function blogPostJsonLd(lang: BlogLang, post: BlogPost, t: BlogPostLang, rendered: RenderedPost) {
  const c = BLOG_COPY[lang];
  const url = postUrl(lang, t.slug);
  const image = { '@type': 'ImageObject', url: `${SITE}/og/og-${lang}.png`, width: 1200, height: 630 };
  const modified = post.updated ?? post.date;
  const other: BlogLang = lang === 'pl' ? 'en' : 'pl';
  const pair = post[other];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...entityNodes(lang),
      blogNode(lang),
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: t.title,
        description: t.description,
        inLanguage: inLanguage(lang),
        isPartOf: { '@id': WEBSITE_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        primaryImageOfPage: image,
        datePublished: post.date,
        dateModified: modified,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CitationOne', item: homeUrl(lang) },
          { '@type': 'ListItem', position: 2, name: c.label, item: `${SITE}${c.base}` },
          { '@type': 'ListItem', position: 3, name: t.title, item: url },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: t.title,
        description: t.description,
        url,
        mainEntityOfPage: { '@id': url },
        isPartOf: { '@id': blogId(lang) },
        inLanguage: inLanguage(lang),
        datePublished: post.date,
        dateModified: modified,
        image,
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID },
        wordCount: rendered.wordCount,
        timeRequired: `PT${rendered.readingMinutes}M`,
        // Druga wersja jezykowa tego samego wpisu (para z rejestru).
        ...(pair ? { workTranslation: { '@id': `${postUrl(other, pair.slug)}#article` } } : {}),
      },
    ],
  };
}

export function blogIndexJsonLd(lang: BlogLang, posts: BlogListItem[]) {
  const c = BLOG_COPY[lang];
  const url = `${SITE}${c.base}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...entityNodes(lang),
      {
        ...blogNode(lang),
        blogPost: posts.map((p) => ({ '@id': `${postUrl(lang, p.t.slug)}#article` })),
      },
      {
        '@type': 'CollectionPage',
        '@id': url,
        url,
        name: INDEX_META[lang].title,
        description: INDEX_META[lang].description,
        inLanguage: inLanguage(lang),
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': blogId(lang) },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CitationOne', item: homeUrl(lang) },
          { '@type': 'ListItem', position: 2, name: c.label, item: url },
        ],
      },
      ...posts.map((p) => {
        const pu = postUrl(lang, p.t.slug);
        return {
          '@type': 'BlogPosting',
          '@id': `${pu}#article`,
          headline: p.t.title,
          description: p.t.description,
          url: pu,
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
          inLanguage: inLanguage(lang),
          author: { '@id': PERSON_ID },
          publisher: { '@id': ORG_ID },
          image: `${SITE}/og/og-${lang}.png`,
        };
      }),
    ],
  };
}

/** JSON-LD do <script>: `<` jako \\u003c, zeby tytul z „</script>" nie zamknal znacznika. */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
