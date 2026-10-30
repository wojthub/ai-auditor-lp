import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageContent from './PageContent';
import { socialMeta } from '@/lib/socialMeta';

export const metadata: Metadata = {
  title: 'Jak działa CitationOne?',
  description:
    'Wklej URL, a dostaniesz 11 wymiarów jakości ocenionych wobec Top 10 SERP oraz cytowań ChatGPT i Google AI Mode: poprawki Przed i Po, graf wiedzy, eksport przez publiczny link i Markdown. Pełny audyt w 5 minut.',
  ...socialMeta({
    lang: 'pl',
    path: '/pl/jak-to-dziala',
    title: 'Jak działa CitationOne? 11 wymiarów audytu GEO',
    description: 'Wklej URL → AI analizuje 11 wymiarów → odbierasz raport Przed i Po z analizą konkurencji w Google, ChatGPT i Google AI Mode. 5 minut.',
  }),
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
