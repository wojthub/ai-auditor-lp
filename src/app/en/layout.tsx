import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'AI Search Content Audit',
    template: '%s - CitationOne',
  },
  description:
    'Check if ChatGPT, Perplexity and Google AI Overview will cite your content. 10 analysis dimensions, top 10 SERP benchmark, Before/After recommendations. Report in 3 minutes.',
  openGraph: {
    title: 'CitationOne - AI Search Content Audit',
    description: 'Check if AI will cite your content. 10 dimensions, SERP benchmark, Before/After recommendations. Report in 3 minutes.',
    url: 'https://citationone.com/en',
    siteName: 'CitationOne',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CitationOne - AI Search Content Audit',
    description: 'Check if AI will cite your content. 10 dimensions, SERP benchmark, Before/After recommendations. Report in 3 minutes.',
  },
  alternates: {
    languages: {
      'pl': 'https://citationone.com',
      'en': 'https://citationone.com/en',
    },
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="en">{children}</div>;
}
