import type { Metadata } from 'next';

export const SITE_URL = 'https://citationone.com';

/**
 * Grafiki do udostepnien (1200x630, `public/og/`): logo, naglowek z hero i linijka o produkcie.
 * Bez nich Facebook, LinkedIn i komunikatory braly pierwszy obrazek ze strony - zrzut panelu,
 * nieczytelny w miniaturze. Zrodlo grafik: HTML wyrenderowany Puppeteerem (od 2026-10-30).
 */
const OG_IMAGES = {
  pl: { url: '/og/og-pl.png', alt: 'CitationOne - Zautomatyzuj optymalizację treści pod GEO' },
  en: { url: '/og/og-en.png', alt: 'CitationOne - Automate content optimization for GEO' },
} as const;

/**
 * Komplet `openGraph` + `twitter` dla strony. Next ZASTEPUJE obiekt `openGraph` z layoutu
 * zamiast go uzupelniac, wiec strona z wlasnym `openGraph` gubila `og:url`, `og:site_name`,
 * `og:locale`, `og:type` i grafike, a `twitter:title` pokazywal tytul strony glownej.
 * Kazda strona z wlasnym tytulem do udostepnien przechodzi przez ta funkcje.
 *
 * `path` jest wzgledny (`/pl/cennik`) albo pelny - wzgledny uzupelnia `metadataBase` z root layoutu.
 */
export function socialMeta({
  lang,
  path,
  title,
  description,
}: {
  lang: 'pl' | 'en';
  path: string;
  title: string;
  description: string;
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = { ...OG_IMAGES[lang], width: 1200, height: 630, type: 'image/png' };
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'CitationOne',
      locale: lang === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
