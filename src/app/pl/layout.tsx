import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Narzędzie GEO - audyt treści pod AI Search',
    template: '%s - CitationOne',
  },
  description:
    'Sprawdź, czy ChatGPT, Perplexity i Google AI Overview zacytują Twoją treść. 10 wymiarów analizy, benchmark top 10 SERP, rekomendacje Przed i Po z gotowymi poprawkami. Raport w 5 minut.',
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
