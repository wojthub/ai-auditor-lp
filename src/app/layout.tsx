import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Smart Content Audit — Audyt treści pod kątem AI Search',
  description:
    'Sprawdź, czy Twój content jest cytowalny przez ChatGPT, Perplexity i Google AI Overview. 9 wymiarów analizy, rekomendacje Before/After, benchmark SERP.',
  openGraph: {
    title: 'Smart Content Audit',
    description: 'Audytuj treść pod kątem AI Search. 9 wymiarów analizy, konkretne rekomendacje.',
    url: 'https://www.smartcontentaudit.com',
    siteName: 'Smart Content Audit',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Content Audit',
    description: 'Audytuj treść pod kątem AI Search. 9 wymiarów analizy, konkretne rekomendacje.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
