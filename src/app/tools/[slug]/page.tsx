import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import ToolPage from '@/components/ToolPage';
import { TOOLS_EN, toolSlugsEn } from '@/data/tools-en';
import { TOOL_STRINGS_EN, toolPlSlugForEn } from '@/data/tool-types';

// Static export: generujemy wylacznie slugi z danych.
export const dynamicParams = false;

const SITE = 'https://citationone.com';

export function generateStaticParams() {
  return toolSlugsEn().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_EN[slug];
  if (!tool) return {};
  const pl = toolPlSlugForEn(tool.slug);

  return {
    title: tool.title,
    description: tool.description,
    openGraph: {
      title: `${tool.title} | CitationOne`,
      description: tool.description,
      url: `${SITE}/tools/${tool.slug}`,
    },
    alternates: {
      canonical: `${SITE}/tools/${tool.slug}`,
      languages: pl
        ? { en: `${SITE}/tools/${tool.slug}`, pl: `${SITE}/pl/narzedzia/${pl}`, 'x-default': `${SITE}/tools/${tool.slug}` }
        : undefined,
    },
  };
}

function buildJsonLd(tool: (typeof TOOLS_EN)[string]) {
  const url = `${SITE}/tools/${tool.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CitationOne', item: SITE },
          { '@type': 'ListItem', position: 2, name: tool.name, item: url },
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

export default async function ToolSlugPageEN({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS_EN[slug];
  if (!tool) notFound();

  const all = toolSlugsEn().map((s) => ({ slug: s, name: TOOLS_EN[s].name }));

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(tool)) }} />
      <NavbarEN />
      <ToolPage tool={tool} all={all} t={TOOL_STRINGS_EN} />
      <FooterEN />
    </main>
  );
}
