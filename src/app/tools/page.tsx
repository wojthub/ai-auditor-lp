import type { Metadata } from 'next';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import ToolsHub from '@/components/ToolsHub';
import { TOOLS_EN, toolSlugsEn } from '@/data/tools-en';
import { TOOL_STRINGS_EN } from '@/data/tool-types';

const SITE = 'https://citationone.com';

export const metadata: Metadata = {
  title: 'SEO and GEO tools in CitationOne',
  description:
    'Keyword clustering, content pruning, schema.org analysis and internal linking - four tools that run on a sitemap or a keyword list, each for 1 credit.',
  openGraph: {
    title: 'SEO and GEO tools in CitationOne',
    description: 'Clustering, pruning, schema.org, internal linking - each tool for 1 credit.',
    url: `${SITE}/tools`,
  },
  alternates: {
    canonical: `${SITE}/tools`,
    languages: { en: `${SITE}/tools`, pl: `${SITE}/pl/narzedzia` },
  },
};

export default function ToolsPage() {
  const tools = toolSlugsEn().map((s) => TOOLS_EN[s]);

  return (
    <main className="min-h-screen">
      <NavbarEN />
      <ToolsHub
        tools={tools}
        t={TOOL_STRINGS_EN}
        s={{
          label: 'Tools',
          h1: 'SEO and GEO tools in CitationOne',
          lead: 'The audit scores one page. These four tools work across an entire site or a keyword list - planning content, flagging pages to prune, finding structured data gaps and proposing internal links. Each costs 1 credit, the same as a single audit.',
          cardCta: 'How it works →',
          bulkTitle: 'Bulk audit',
          bulkDesc: 'A full audit of many URLs at once - from a list or a sitemap, running in the background, with a folder of individual reports at the end.',
          bulkHref: '/#bulk-audit',
          bulkCta: 'See how it works →',
        }}
      />
      <FooterEN />
    </main>
  );
}
