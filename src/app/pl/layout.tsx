import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Narzędzie GEO - audyt treści pod AI Search - CitationOne',
    // Marka TYLKO na stronie glownej (w `default`) — patrz nota w src/app/layout.tsx.
    template: '%s',
  },
  description:
    'Sprawdź, czy ChatGPT, Perplexity i Google AI Overview zacytują Twoją treść. 10 wymiarów, benchmark SERP, gotowe poprawki Przed i Po. Raport w 5 minut.',
  openGraph: {
    title: 'CitationOne - Audyt treści pod AI Search',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 10 wymiarów, benchmark SERP, rekomendacje Przed i Po. Raport w 5 minut.',
    url: 'https://citationone.com/pl',
    siteName: 'CitationOne',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CitationOne - Audyt treści pod AI Search',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 10 wymiarów, benchmark SERP, rekomendacje Przed i Po. Raport w 5 minut.',
  },
  alternates: {
    languages: {
      'en': 'https://citationone.com',
      'pl': 'https://citationone.com/pl',
    },
  },
};

export default function PlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="pl">{children}</div>;
}
