import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';

export const metadata: Metadata = {
  title: {
    default: 'Narzędzie do optymalizacji treści pod GEO - CitationOne',
    // Marka TYLKO na stronie glownej (w `default`) - patrz nota w src/app/layout.tsx.
    template: '%s',
  },
  description:
    'Sprawdź, czy ChatGPT, Perplexity i Google AI Overview zacytują Twoją treść. 11 wymiarów, benchmark SERP, gotowe poprawki Przed i Po. Raport w 5 minut.',
  openGraph: {
    title: 'CitationOne - Optymalizacja treści pod GEO',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 11 wymiarów, benchmark SERP, rekomendacje Przed i Po. Raport w 5 minut.',
    url: 'https://citationone.com/pl',
    siteName: 'CitationOne',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CitationOne - Optymalizacja treści pod GEO',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 11 wymiarów, benchmark SERP, rekomendacje Przed i Po. Raport w 5 minut.',
  },
  alternates: alternatesFor('/pl'),
};

export default function PlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="pl">{children}</div>;
}
