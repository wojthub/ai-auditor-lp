import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import PageContentEN from './PageContentEN';
import { socialMeta } from '@/lib/socialMeta';

export const metadata: Metadata = {
  title: 'How does CitationOne work?',
  description:
    'Paste a URL, get 11 quality dimensions scored against the Top 10 SERP plus ChatGPT and Google AI Mode citations, with Before/After fixes, a knowledge graph and export via a public link or Markdown. Full audit in 5 minutes.',
  ...socialMeta({
    lang: 'en',
    path: '/how-it-works',
    title: 'How does CitationOne work? 11 GEO audit dimensions',
    description: 'Paste URL → AI analyzes 11 dimensions → get Before/After report with a Google, ChatGPT and Google AI Mode competitor analysis. 5 minutes.',
  }),
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
