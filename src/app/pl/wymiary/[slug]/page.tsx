import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DimensionPage from '@/components/DimensionPage';
import { DIMENSIONS_PL, dimensionSlugsPl } from '@/data/dimensions-pl';
import { STRINGS_PL, enSlugForPl } from '@/data/dimension-types';

// Static export: generujemy wylacznie slugi z danych, nic poza lista nie istnieje.
export const dynamicParams = false;

const SITE = 'https://citationone.com';

export function generateStaticParams() {
  return dimensionSlugsPl().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dim = DIMENSIONS_PL[slug];
  if (!dim) return {};
  const en = enSlugForPl(dim.slug);

  return {
    title: dim.title,
    description: dim.description,
    openGraph: {
      title: `${dim.title} | CitationOne`,
      description: dim.description,
      url: `${SITE}/pl/wymiary/${dim.slug}`,
    },
    alternates: {
      canonical: `${SITE}/pl/wymiary/${dim.slug}`,
      // hreflang dziala tylko wtedy, gdy WSKAZUJE na istniejaca strone — stad para ze slownika.
      languages: en
        ? { pl: `${SITE}/pl/wymiary/${dim.slug}`, en: `${SITE}/dimensions/${en}`, 'x-default': `${SITE}/dimensions/${en}` }
        : undefined,
    },
  };
}

/**
 * JSON-LD: okruszki (breadcrumb mamy tez wizualnie), definicja pojecia i FAQ.
 * Jeden graf zamiast trzech osobnych blokow — mniej szumu w <head>.
 */
function buildJsonLd(dim: (typeof DIMENSIONS_PL)[string]) {
  const url = `${SITE}/pl/wymiary/${dim.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CitationOne', item: `${SITE}/pl` },
          { '@type': 'ListItem', position: 2, name: 'Wymiary', item: `${SITE}/pl/wymiary` },
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
          name: 'Wymiary jakości treści CitationOne',
          url: `${SITE}/pl/wymiary`,
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

export default async function DimensionSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dim = DIMENSIONS_PL[slug];
  if (!dim) notFound();

  const all = dimensionSlugsPl().map((s) => ({ slug: s, name: DIMENSIONS_PL[s].name }));

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(dim)) }}
      />
      <Navbar />
      <DimensionPage dim={dim} known={dimensionSlugsPl()} all={all} t={STRINGS_PL} />
      <Footer />
    </main>
  );
}
