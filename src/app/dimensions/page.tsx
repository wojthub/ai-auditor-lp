import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import DimensionsContent from './DimensionsContent';

export const metadata: Metadata = {
  title: '10 content quality dimensions + E-E-A-T',
  description:
    'The 10 dimensions CitationOne scores in every report - what AI models weigh in your content and what actually drives citations in ChatGPT and AI Overview.',
  openGraph: {
    title: '10 content quality dimensions + E-E-A-T | CitationOne',
    description: 'See the CitationOne scoring standard - 10 AI Citability dimensions + E-E-A-T that translate LLM algorithms into simple editorial guidelines.',
  },
  alternates: alternatesFor('/dimensions'),
};

export default function DimensionsPage() {
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <DimensionsContent />
      <FooterEN />
    </main>
  );
}
