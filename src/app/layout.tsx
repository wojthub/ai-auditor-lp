import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const GTM_ID = 'GTM-M64KFHFS';
const FB_PIXEL_ID = '1707037183747597';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

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
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`,
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
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
