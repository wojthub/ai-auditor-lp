import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApiContent from './ApiContent';

export const metadata: Metadata = {
  title: 'API CitationOne - audyty AI Search przez REST',
  description:
    'Uruchamiaj audyty CitationOne programatycznie i pobieraj wynik jako JSON. Klucze API, model asynchroniczny, zlecenia masowe, dokumentacja także w Markdown.',
  openGraph: {
    title: 'API CitationOne - audyty AI Search przez REST',
    description:
      'REST + JSON, klucz API, zlecenia masowe, publiczne linki do raportów. 1 audyt = 1 kredyt. Dokumentacja również jako Markdown dla agentów.',
  },
  alternates: alternatesFor('/pl/api'),
};

export default function ApiPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ApiContent />
      <Footer />
    </main>
  );
}
