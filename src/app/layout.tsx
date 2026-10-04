import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { alternatesFor } from '@/lib/languageSwitch';
import RegisterClickTracker from '@/components/RegisterClickTracker';
import './globals.css';

const GTM_ID = 'GTM-M64KFHFS';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#085C62',
};

export const metadata: Metadata = {
  title: {
    default: 'GEO Content Audit Tool - CitationOne',
    // Marka TYLKO na stronie glownej (w `default`) - podstrony maja wlasny, pelny tytul
    // i sufiks tylko zjadalby znaki w SERP.
    template: '%s',
  },
  description:
    'Check whether ChatGPT, Perplexity and Google AI Overview will cite your content. 11 dimensions, SERP benchmark, Before/After fixes. Report in 5 minutes.',
  openGraph: {
    title: 'CitationOne - GEO Content Audit',
    description: 'Check if AI will cite your content. 11 dimensions, SERP benchmark, Before/After recommendations. Report in 5 minutes.',
    url: 'https://citationone.com',
    siteName: 'CitationOne',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CitationOne - GEO Content Audit',
    description: 'Check if AI will cite your content. 11 dimensions, SERP benchmark, Before/After recommendations. Report in 5 minutes.',
  },
  alternates: alternatesFor('/'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
      <body className="min-h-screen overflow-x-hidden" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <RegisterClickTracker />
        {children}
      </body>
    </html>
  );
}
