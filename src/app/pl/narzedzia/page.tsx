import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsHub from '@/components/ToolsHub';
import { TOOLS_PL, toolSlugsPl } from '@/data/tools-pl';
import { TOOL_STRINGS_PL } from '@/data/tool-types';

const SITE = 'https://citationone.com';

export const metadata: Metadata = {
  title: 'Narzędzia SEO i GEO w CitationOne',
  description:
    'Klasteryzacja słów kluczowych, content pruning, analiza schema.org i linki wewnętrzne - cztery narzędzia działające na całym serwisie, każde za 1 kredyt.',
  openGraph: {
    title: 'Narzędzia SEO i GEO w CitationOne',
    description: 'Klasteryzacja, pruning, schema.org, linki wewnętrzne - każde narzędzie za 1 kredyt.',
    url: `${SITE}/pl/narzedzia`,
  },
  alternates: {
    canonical: `${SITE}/pl/narzedzia`,
    languages: { pl: `${SITE}/pl/narzedzia`, en: `${SITE}/tools` },
  },
};

export default function NarzedziaPage() {
  const tools = toolSlugsPl().map((s) => TOOLS_PL[s]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <ToolsHub
        tools={tools}
        t={TOOL_STRINGS_PL}
        s={{
          label: 'Narzędzia',
          h1: 'Narzędzia SEO i GEO w CitationOne',
          lead: 'Audyt ocenia jedną stronę. Te cztery narzędzia pracują na całym serwisie albo na liście fraz - planują treść, wskazują strony do przycięcia, znajdują luki w danych strukturalnych i proponują linkowanie wewnętrzne. Każde kosztuje 1 kredyt, tyle co pojedynczy audyt.',
          cardCta: 'Jak to działa →',
          bulkTitle: 'Masowy audyt',
          bulkDesc: 'Pełny audyt wielu adresów naraz - z listy URL-i albo z sitemapy, w tle, z folderem pojedynczych raportów na wyjściu.',
          bulkHref: '/pl#masowy-audyt',
          bulkCta: 'Zobacz, jak działa →',
        }}
      />
      <Footer />
    </main>
  );
}
