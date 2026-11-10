import type { MetadataRoute } from 'next';
import { dimensionSlugsPl } from '@/data/dimensions-pl';
import { dimensionSlugsEn } from '@/data/dimensions-en';
import { enSlugForPl } from '@/data/dimension-types';
import { toolSlugsPl } from '@/data/tools-pl';
import { toolEnSlugForPl } from '@/data/tool-types';
import { STATIC_PAIRS } from '@/lib/languageSwitch';
import { BLOG_POSTS, HAS_BLOG_POSTS } from '@/data/blog';

// Wymagane przy output: 'export' - bez tego build przerywa sie na kolekcji danych trasy.
export const dynamic = 'force-static';

const SITE = 'https://citationone.com';

/**
 * Sitemap dla static exportu - Next generuje z tego `out/sitemap.xml` w czasie builda.
 *
 * Podstrony wymiarow ciagniemy z danych, a NIE z recznej listy: dopisanie wymiaru ma
 * automatycznie trafic do mapy. `alternates.languages` dokleja <xhtml:link hreflang>,
 * czyli to samo powiazanie PL↔EN, ktore siedzi w <head> obu stron.
 */

/**
 * Strony statyczne: pary bierzemy z `STATIC_PAIRS` (to samo zrodlo co przelacznik jezyka
 * i `alternatesFor`), tu dokladamy tylko priorytet. Wczesniej byla to trzecia kopia tej
 * samej listy adresow - nowa podstrona wypadala z mapy albo z hreflangow zaleznie od tego,
 * ktora liste ktos akurat zaktualizowal.
 */
const PRIORITY: Record<string, number> = { '/': 1, '/api': 0.6 };

const STATIC_PAGES = STATIC_PAIRS.map(([en, pl]) => ({ en, pl, priority: PRIORITY[en] ?? 0.8 }));

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

  const toolEntries: MetadataRoute.Sitemap = toolSlugsPl().flatMap((pl) => {
    const en = toolEnSlugForPl(pl);
    if (!en) return [{ url: `${SITE}/pl/narzedzia/${pl}`, lastModified, priority: 0.7 }];

    const languages = { en: `${SITE}/tools/${en}`, pl: `${SITE}/pl/narzedzia/${pl}` };
    return [
      { url: `${SITE}/tools/${en}`, lastModified, priority: 0.7, alternates: { languages } },
      { url: `${SITE}/pl/narzedzia/${pl}`, lastModified, priority: 0.7, alternates: { languages } },
    ];
  });

  // Strona EN bez odpowiednika PL nie istnieje dzisiaj, ale gdyby powstala - nie zgub jej.
  const orphanEn: MetadataRoute.Sitemap = dimensionSlugsEn()
    .filter((en) => !dimensionSlugsPl().some((pl) => enSlugForPl(pl) === en))
    .map((en) => ({ url: `${SITE}/dimensions/${en}`, lastModified, priority: 0.7 }));

  // Wpisy bloga: lastModified = data aktualizacji tresci, a nie data builda. Hreflang tylko dla par.
  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((p) => {
    const modified = new Date(`${p.updated ?? p.date}T00:00:00Z`);
    const en = p.en && `${SITE}/blog/${p.en.slug}`;
    const pl = p.pl && `${SITE}/pl/blog/${p.pl.slug}`;
    const alternates = en && pl ? { languages: { en, pl } } : undefined;
    return [en, pl].filter((u): u is string => !!u).map((url) => ({ url, lastModified: modified, priority: 0.6, alternates }));
  });

  // Lista bloga w jezyku bez wpisow nie ma linku w menu, wiec nie zglaszamy jej tez w mapie.
  const emptyBlog = new Set([!HAS_BLOG_POSTS.en && `${SITE}/blog`, !HAS_BLOG_POSTS.pl && `${SITE}/pl/blog`].filter(Boolean));
  const visibleStatic = staticEntries.filter((e) => !emptyBlog.has(e.url));

  return [...visibleStatic, ...dimensionEntries, ...toolEntries, ...orphanEn, ...blogEntries];
}
