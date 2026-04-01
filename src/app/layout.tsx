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
    default: 'AI Search Content Audit - CitationOne',
    template: '%s - CitationOne',
  },
  description:
    'Check if ChatGPT, Perplexity and Google AI Overview will cite your content. 10 analysis dimensions, top 10 SERP benchmark, Before/After recommendations. Report in 3 minutes.',
  openGraph: {
    title: 'CitationOne - AI Search Content Audit',
    description: 'Check if AI will cite your content. 10 dimensions, SERP benchmark, Before/After recommendations. Report in 3 minutes.',
    url: 'https://citationone.com',
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
      'en': 'https://citationone.com',
      'pl': 'https://citationone.com/pl',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          id="consentguards"
          src="https://consentguards.com/consent.min.js"
          data-key="d0d6f44f70371e68e6f1635e8888dececb9038fb4e24b2f05b41ffca0be453aa"
          strategy="afterInteractive"
        />
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
