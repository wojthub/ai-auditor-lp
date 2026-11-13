'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTypewriterPlaceholder } from '@/lib/useTypewriterPlaceholder';
import { APP_URL } from '@/lib/appUrl';
import HeroChecks from '@/components/HeroChecks';
import { trackEvent, trackThenNavigate } from '@/lib/track';

// Neutral placeholder domain - we never point at a real client.
// All variants share the same start, so the typewriter only erases the tail.
const URL_EXAMPLES = [
  'yoursite.com/blog/guide',
  'yoursite.com/services/content-audit',
  'yoursite.com/product/product-name',
  'yoursite.com/category/rankings',
];


export default function HeroEN() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const typed = useTypewriterPlaceholder(URL_EXAMPLES, !url);

  const normalizeUrl = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return '';
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const isValidUrl = (raw: string) => {
    try {
      const u = new URL(normalizeUrl(raw));
      return (u.protocol === 'http:' || u.protocol === 'https:') && !!u.hostname && u.hostname.includes('.');
    } catch {
      return false;
    }
  };

  // Tlo (siatka kropek + graf wezlow) daje HeroBand - wspolnie z sekcja mockupu,
  // zeby linie nie urywaly sie na granicy sekcji.
  return (
    <section className="relative">
      <div className="relative hero-inner" style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 28px', textAlign: 'center', width: '100%' }}>
        {/* Wjazd robi CSS (`.hero-rise` w globals.css): animacja z framer-motion startowala dopiero
            po hydracji i do tego czasu naglowek byl w HTML-u, ale niewidoczny. */}
        <div className="hero-rise">
          <h1 className="hero-h1" style={{ marginBottom: 28 }}>
            <span className="hero-title" style={{
              display: 'block',
              fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.03em',
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Automate content optimization for GEO
            </span>
            <span className="hero-sub" style={{
              display: 'block',
              fontSize: 17, fontWeight: 400,
              lineHeight: 1.6, color: '#36394a',
              maxWidth: 640, margin: '14px auto 0',
            }}>
              Paste a link, a list of URLs or a sitemap and get “Before and After” recommendations so that <span className="hero-brand"><img src="/logos/chatgpt.webp" alt="" aria-hidden width={16} height={16} />ChatGPT,</span> <span className="hero-brand"><img src="/logos/perplexity.webp" alt="" aria-hidden width={16} height={16} />Perplexity</span> and <span className="hero-brand"><img src="/logos/google.webp" alt="" aria-hidden width={16} height={16} />Google</span> AI Overview cite your content.
            </span>
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!url.trim()) {
                setError('Please enter a URL.');
                return;
              }
              if (!isValidUrl(url)) {
                setError('Please enter a valid URL (e.g. https://example.com/page).');
                return;
              }
              const normalized = normalizeUrl(url);
              const encoded = encodeURIComponent(normalized).replace(/%3A/gi, ':').replace(/%2F/gi, '/');
              // Formularz tez prowadzi do rejestracji, wiec liczy sie razem z linkami (te lapie RegisterClickTracker).
              trackEvent('register_click', { link_text: 'Run audit', link_classes: 'hero-form', page_path: window.location.pathname });
              trackThenNavigate('hero_audit_submit', { lang: 'en' }, `${APP_URL}/register?lang=en&audit-url=${encoded}`);
            }}
            style={{ maxWidth: 580, margin: '0 auto' }}
            noValidate
          >
            <div className="hero-input-row">
              <input
                type="text"
                value={url}
                onChange={(e) => { setUrl(e.target.value); if (error) setError(''); }}
                placeholder={typed ? `Paste a link, e.g. ${typed}` : 'Paste your page URL...'}
                aria-invalid={!!error}
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: '8px 0 0 8px',
                  border: '1.5px solid #dfe1e7',
                  borderRight: 'none',
                  fontSize: 15,
                  color: '#0d0d12',
                  outline: 'none',
                  background: '#ffffff',
                  minWidth: 0,
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 24px',
                  borderRadius: '0 8px 8px 0',
                  background: '#0b7983',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: 15,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  minHeight: 44,
                }}
              >
                Run audit →
              </motion.button>
            </div>
            {error && (
              <p role="alert" style={{ fontSize: 13, color: '#B91C1C', margin: '10px 0 0', textAlign: 'left' }}>
                {error}
              </p>
            )}
          </form>

          <HeroChecks lang="en" />
        </div>
      </div>

      <style>{`
        /* Naglowek dzieli sie na rowne wiersze zamiast zostawiac samotne ostatnie slowo. Od 960px
           wychodzi poza kolumne 720px, zeby przy pelnym rozmiarze fontu miescil sie w dwoch wierszach. */
        .hero-title { text-wrap: balance; }
        @media (min-width: 960px) {
          .hero-title { margin-inline: -90px; }
        }
        .hero-input-row { display: flex; }
        .hero-input-row input:focus { border-color: #0b7983; border-right: none; }
        /* Telefon (2026-11-13): mniejszy H1 i podtytul, ciasniejsze odstepy - ekran panelu ma wejsc
           blizej zgiecia. Pole i przycisk maja 16 px, bo przy mniejszym foncie iOS Safari
           przybliza strone po kliknieciu w pole. */
        @media (max-width: 580px) {
          .hero-inner { padding: 24px 20px 12px !important; }
          .hero-h1 { margin-bottom: 18px !important; }
          .hero-title { font-size: clamp(1.8rem, 8.2vw, 2.15rem) !important; }
          .hero-sub { font-size: 15.5px !important; line-height: 1.55 !important; margin-top: 10px !important; }
          .hero-input-row input, .hero-input-row button { font-size: 16px !important; }
          .hero-input-row input { padding-left: 14px !important; padding-right: 14px !important; }
        }
        @media (max-width: 580px) {
          .hero-input-row { flex-direction: column; gap: 8px; }
          .hero-input-row input { border-radius: 8px !important; border-right: 1.5px solid #dfe1e7 !important; }
          .hero-input-row button { border-radius: 8px !important; }
        }
      `}</style>
    </section>
  );
}
