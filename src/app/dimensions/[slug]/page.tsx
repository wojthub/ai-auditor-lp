import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import DimensionPage from '@/components/DimensionPage';
import { DIMENSIONS_EN, dimensionSlugsEn } from '@/data/dimensions-en';
import { STRINGS_EN, plSlugForEn } from '@/data/dimension-types';

// Static export: generujemy wylacznie slugi z danych, nic poza lista nie istnieje.
export const dynamicParams = false;

const SITE = 'https://citationone.com';

export function generateStaticParams() {
  return dimensionSlugsEn().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dim = DIMENSIONS_EN[slug];
  if (!dim) return {};
  const pl = plSlugForEn(dim.slug);

  return {
    title: dim.title,
    description: dim.description,
    openGraph: {
      title: `${dim.title} | CitationOne`,
      description: dim.description,
      url: `${SITE}/dimensions/${dim.slug}`,
    },
    alternates: {
      canonical: `${SITE}/dimensions/${dim.slug}`,
      // hreflang dziala tylko wtedy, gdy WSKAZUJE na istniejaca strone — stad para ze slownika.
      languages: pl ? { en: `${SITE}/dimensions/${dim.slug}`, pl: `${SITE}/pl/wymiary/${pl}` } : undefined,
    },
  };
}

/**
 * JSON-LD: okruszki (breadcrumb mamy tez wizualnie), definicja pojecia i FAQ.
 * Jeden graf zamiast trzech osobnych blokow — mniej szumu w <head>.
 */
function buildJsonLd(dim: (typeof DIMENSIONS_EN)[string]) {
  const url = `${SITE}/dimensions/${dim.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CitationOne', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Dimensions', item: `${SITE}/dimensions` },
          { '@type': 'ListItem', position: 3, name: dim.name, item: url },
        ],
      },
      {
        '@type': 'DefinedTerm',
        '@id': `${url}#term`,
        name: dim.name,
        description: dim.lead,
        url,
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          name: 'CitationOne content quality dimensions',
          url: `${SITE}/dimensions`,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: dim.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

export default async function DimensionSlugPageEN({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dim = DIMENSIONS_EN[slug];
  if (!dim) notFound();

  const all = dimensionSlugsEn().map((s) => ({ slug: s, name: DIMENSIONS_EN[s].name }));

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(dim)) }}
      />
      <NavbarEN />
      <DimensionPage dim={dim} known={dimensionSlugsEn()} all={all} t={STRINGS_EN} />
      <FooterEN />
    </main>
  );
}
