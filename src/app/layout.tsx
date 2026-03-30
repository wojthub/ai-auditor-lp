import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const GTM_ID = 'GTM-M64KFHFS';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Audyt treści pod AI Search - CitationOne',
    template: '%s - CitationOne',
  },
  description:
    'Sprawdź, czy ChatGPT, Perplexity i Google AI Overview zacytują Twoją treść. 10 wymiarów analizy, benchmark top 10 SERP, rekomendacje Before/After z gotowymi poprawkami. Raport w 3 minuty.',
  openGraph: {
    title: 'CitationOne - Audyt treści pod AI Search',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 10 wymiarów, benchmark SERP, rekomendacje Before/After. Raport w 3 minuty.',
    url: 'https://citationone.com',
    siteName: 'CitationOne',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CitationOne - Audyt treści pod AI Search',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 10 wymiarów, benchmark SERP, rekomendacje Before/After. Raport w 3 minuty.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
