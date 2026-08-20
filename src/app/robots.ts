import type { MetadataRoute } from 'next';

// Wymagane przy output: 'export' — bez tego build przerywa sie na kolekcji danych trasy.
export const dynamic = 'force-static';

/** Wskazuje sitemape — bez tego wpisu roboty musza ja odgadnac. Static export → out/robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://citationone.com/sitemap.xml',
    host: 'https://citationone.com',
  };
}
