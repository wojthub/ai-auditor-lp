import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WymiaryContent from './WymiaryContent';

export const metadata: Metadata = {
  title: '11 wymiarów jakości treści',
  description:
    '11 wymiarów, które CitationOne ocenia w każdym raporcie - co modele AI biorą pod uwagę w treści i co realnie decyduje o cytowaniu przez ChatGPT i AI Overview.',
  openGraph: {
    title: '11 wymiarów jakości treści | CitationOne',
    description: 'Poznaj standard oceny CitationOne - 11 wymiarów cytowalności w odpowiedziach AI, z E-E-A-T włącznie, przekładających algorytmy LLM na proste wytyczne redakcyjne.',
  },
  alternates: alternatesFor('/pl/wymiary'),
};

export default function WymiaryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <WymiaryContent />
      <Footer />
    </main>
  );
}
