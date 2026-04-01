import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Audyt treści pod AI Search',
    template: '%s - CitationOne',
  },
  description:
    'Sprawdź, czy ChatGPT, Perplexity i Google AI Overview zacytują Twoją treść. 10 wymiarów analizy, benchmark top 10 SERP, rekomendacje Before/After z gotowymi poprawkami. Raport w 3 minuty.',
  openGraph: {
    title: 'CitationOne - Audyt treści pod AI Search',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 10 wymiarów, benchmark SERP, rekomendacje Before/After. Raport w 3 minuty.',
    url: 'https://citationone.com/pl',
    siteName: 'CitationOne',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CitationOne - Audyt treści pod AI Search',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 10 wymiarów, benchmark SERP, rekomendacje Before/After. Raport w 3 minuty.',
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
