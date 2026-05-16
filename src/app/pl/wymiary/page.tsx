import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WymiaryContent from './WymiaryContent';

export const metadata: Metadata = {
  title: '10 wymiarów jakości treści + E-E-A-T',
  description:
    'Poznaj 10 wymiarów, które CitationOne analizuje w każdym raporcie. Dowiedz się, jak AI ocenia Twój content i co decyduje o cytowaniu przez ChatGPT, Perplexity i Google AI Overview.',
  openGraph: {
    title: '10 wymiarów jakości treści + E-E-A-T | CitationOne',
    description: 'Poznaj standard oceny CitationOne - 10 wymiarów AI Citability + E-E-A-T przekładające algorytmy LLM na proste wytyczne redakcyjne.',
  },
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
