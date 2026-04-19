import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Jak działa CitationOne?',
  description:
    'Wklej URL, AI analizuje 10 wymiarów jakości treści i porównuje z top 10 SERP. Odbierasz raport z rekomendacjami Przed i Po, grafem wiedzy i eksportem PDF. Pełny audyt w 3 minuty.',
  openGraph: {
    title: 'Jak działa CitationOne? 10 wymiarów audytu AI Search',
    description: 'Wklej URL → AI analizuje 10 wymiarów → odbierasz raport Przed i Po z benchmarkiem SERP. 3 minuty.',
  },
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
