import type { MetadataRoute } from 'next';
import { dimensionSlugsPl } from '@/data/dimensions-pl';
import { dimensionSlugsEn } from '@/data/dimensions-en';
import { enSlugForPl } from '@/data/dimension-types';

// Wymagane przy output: 'export' — bez tego build przerywa sie na kolekcji danych trasy.
export const dynamic = 'force-static';

const SITE = 'https://citationone.com';

/**
 * Sitemap dla static exportu — Next generuje z tego `out/sitemap.xml` w czasie builda.
 *
 * Podstrony wymiarow ciagniemy z danych, a NIE z recznej listy: dopisanie wymiaru ma
 * automatycznie trafic do mapy. `alternates.languages` dokleja <xhtml:link hreflang>,
 * czyli to samo powiazanie PL↔EN, ktore siedzi w <head> obu stron.
 */

/** Strony statyczne: [sciezka EN, sciezka PL] — para napedza hreflangi w mapie. */
const STATIC_PAGES: { en: string; pl: string; priority: number }[] = [
  { en: '/', pl: '/pl', priority: 1 },
  { en: '/how-it-works', pl: '/pl/jak-to-dziala', priority: 0.8 },
  { en: '/dimensions', pl: '/pl/wymiary', priority: 0.8 },
  { en: '/pricing', pl: '/pl/cennik', priority: 0.8 },
  { en: '/api', pl: '/pl/api', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.flatMap((page) => {
    const languages = { en: `${SITE}${page.en}`, pl: `${SITE}${page.pl}` };
    return [
      { url: `${SITE}${page.en}`, lastModified, priority: page.priority, alternates: { languages } },
      { url: `${SITE}${page.pl}`, lastModified, priority: page.priority, alternates: { languages } },
    ];
  });

  const dimensionEntries: MetadataRoute.Sitemap = dimensionSlugsPl().flatMap((pl) => {
    const en = enSlugForPl(pl);
    // Wymiar bez pary w slowniku trafia do mapy bez hreflanga zamiast wypasc z niej calkiem.
    if (!en) return [{ url: `${SITE}/pl/wymiary/${pl}`, lastModified, priority: 0.7 }];

    const languages = { en: `${SITE}/dimensions/${en}`, pl: `${SITE}/pl/wymiary/${pl}` };
    return [
      { url: `${SITE}/dimensions/${en}`, lastModified, priority: 0.7, alternates: { languages } },
      { url: `${SITE}/pl/wymiary/${pl}`, lastModified, priority: 0.7, alternates: { languages } },
    ];
  });

  // Strona EN bez odpowiednika PL nie istnieje dzisiaj, ale gdyby powstala — nie zgub jej.
  const orphanEn: MetadataRoute.Sitemap = dimensionSlugsEn()
    .filter((en) => !dimensionSlugsPl().some((pl) => enSlugForPl(pl) === en))
    .map((en) => ({ url: `${SITE}/dimensions/${en}`, lastModified, priority: 0.7 }));

  return [...staticEntries, ...dimensionEntries, ...orphanEn];
}
