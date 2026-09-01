import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import PageContentEN from './PageContentEN';

export const metadata: Metadata = {
  title: 'How does CitationOne work?',
  description:
    'Paste a URL, get 10 quality dimensions scored against the Top 10 SERP and ChatGPT citations, with Before/After fixes, a knowledge graph and PDF export. Full audit in 5 minutes.',
  openGraph: {
    title: 'How does CitationOne work? 10 AI Search audit dimensions',
    description: 'Paste URL → AI analyzes 10 dimensions → get Before/After report with a Google + ChatGPT competitor analysis. 5 minutes.',
  },
  alternates: alternatesFor('/how-it-works'),
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
