import { existsSync } from 'node:fs';
import path from 'node:path';
import type { BlogLang } from '@/data/blog';

// Okladki wpisu z `node scripts/blog-covers.mjs` - jeden szablon, dwa warianty:
// - `<slug>.jpg` 1200x630 - og:image i JSON-LD (format wymagany przez Facebooka i LinkedIna),
// - `<slug>-baner.jpg` 1200x400 - grafika wiodaca na stronie wpisu i miniatura na liscie.
// Nazwy wyprowadzamy ze sluga, wiec rejestr nie potrzebuje osobnego pola. Brak pliku = `undefined`
// (og:image spada wtedy na ogolna grafike serwisu, a strona wpisu nie pokazuje okladki).

export const BLOG_COVER_OG = { width: 1200, height: 630 } as const;
export const BLOG_COVER_BANNER = { width: 1200, height: 400 } as const;

function existing(rel: string): string | undefined {
  return existsSync(path.join(process.cwd(), 'public', rel)) ? rel : undefined;
}

/** Wariant 1200x630 do udostepnien. */
export function blogCoverUrl(lang: BlogLang, slug: string): string | undefined {
  return existing(`/blog/${lang}/okladki/${slug}.jpg`);
}

/** Wariant 1200x400 na strone wpisu i liste. */
export function blogBannerUrl(lang: BlogLang, slug: string): string | undefined {
  return existing(`/blog/${lang}/okladki/${slug}-baner.jpg`);
}
