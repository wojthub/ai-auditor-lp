import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolPage from '@/components/ToolPage';
import { TOOLS_PL, toolSlugsPl } from '@/data/tools-pl';
import { TOOL_STRINGS_PL, toolEnSlugForPl } from '@/data/tool-types';

// Static export: generujemy wylacznie slugi z danych.
export const dynamicParams = false;

const SITE = 'https://citationone.com';

export function generateStaticParams() {
  return toolSlugsPl().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_PL[slug];
  if (!tool) return {};
  const en = toolEnSlugForPl(tool.slug);

  return {
    title: tool.title,
    description: tool.description,
    openGraph: {
      title: `${tool.title} | CitationOne`,
      description: tool.description,
      url: `${SITE}/pl/narzedzia/${tool.slug}`,
    },
    alternates: {
      canonical: `${SITE}/pl/narzedzia/${tool.slug}`,
      languages: en ? { pl: `${SITE}/pl/narzedzia/${tool.slug}`, en: `${SITE}/tools/${en}` } : undefined,
    },
  };
}

function buildJsonLd(tool: (typeof TOOLS_PL)[string]) {
  const url = `${SITE}/pl/narzedzia/${tool.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CitationOne', item: `${SITE}/pl` },
          { '@type': 'ListItem', position: 2, name: 'Narzędzia', item: `${SITE}/pl/narzedzia` },
          { '@type': 'ListItem', position: 3, name: tool.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: tool.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

export default async function ToolSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS_PL[slug];
  if (!tool) notFound();

  const all = toolSlugsPl().map((s) => ({ slug: s, name: TOOLS_PL[s].name }));

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(tool)) }} />
      <Navbar />
      <ToolPage tool={tool} all={all} t={TOOL_STRINGS_PL} />
      <Footer />
    </main>
  );
}
