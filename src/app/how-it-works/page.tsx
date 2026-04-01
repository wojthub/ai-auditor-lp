import type { Metadata } from 'next';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import PageContentEN from './PageContentEN';

export const metadata: Metadata = {
  title: 'How does CitationOne work?',
  description:
    'Paste a URL, AI analyzes 10 content quality dimensions and benchmarks against top 10 SERP. Get a report with Before/After recommendations, knowledge graph and PDF export. Full audit in 3 minutes.',
  openGraph: {
    title: 'How does CitationOne work? 10 AI Search audit dimensions',
    description: 'Paste URL → AI analyzes 10 dimensions → get Before/After report with SERP benchmark. 3 minutes.',
  },
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <PageContentEN />
      <FooterEN />
    </main>
  );
}
