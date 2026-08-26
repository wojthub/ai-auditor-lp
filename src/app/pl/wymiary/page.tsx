import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WymiaryContent from './WymiaryContent';

export const metadata: Metadata = {
  title: '10 wymiarów jakości treści + E-E-A-T',
  description:
    '10 wymiarów, które CitationOne ocenia w każdym raporcie – co modele AI biorą pod uwagę w treści i co realnie decyduje o cytowaniu przez ChatGPT i AI Overview.',
  openGraph: {
    title: '10 wymiarów jakości treści + E-E-A-T | CitationOne',
    description: 'Poznaj standard oceny CitationOne – 10 wymiarów AI Citability + E-E-A-T przekładające algorytmy LLM na proste wytyczne redakcyjne.',
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
