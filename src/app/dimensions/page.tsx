import type { Metadata } from 'next';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import DimensionsContent from './DimensionsContent';

export const metadata: Metadata = {
  title: '10 content quality dimensions + E-E-A-T',
  description:
    'Discover the 10 dimensions CitationOne analyzes in every report. Learn how AI evaluates your content and what drives citations in ChatGPT, Perplexity and Google AI Overview.',
  openGraph: {
    title: '10 content quality dimensions + E-E-A-T | CitationOne',
    description: 'See the CitationOne scoring standard - 10 AI Citability dimensions + E-E-A-T that translate LLM algorithms into simple editorial guidelines.',
  },
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
