import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Jak działa CitationOne?',
  description:
    'Wklej URL, a dostaniesz 10 wymiarów jakości ocenionych wobec Top 10 SERP: poprawki Przed i Po, graf wiedzy, eksport PDF. Pełny audyt w 5 minut.',
  openGraph: {
    title: 'Jak działa CitationOne? 10 wymiarów audytu AI Search',
    description: 'Wklej URL → AI analizuje 10 wymiarów → odbierasz raport Przed i Po z benchmarkiem SERP. 5 minut.',
  },
  alternates: alternatesFor('/pl/jak-to-dziala'),
};

export default function JakToDzialaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
