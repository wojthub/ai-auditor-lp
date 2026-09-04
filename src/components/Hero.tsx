'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTypewriterPlaceholder } from '@/lib/useTypewriterPlaceholder';

const APP_URL = 'https://app.citationone.com';

// Neutralna, przykładowa domena — nie wskazujemy na żadnego realnego klienta.
// Wszystkie warianty zaczynają się tak samo, więc maszyna do pisania kasuje tylko końcówkę.
const URL_EXAMPLES = [
  'twojastrona.pl/blog/poradnik',
  'twojastrona.pl/uslugi/audyt-tresci',
  'twojastrona.pl/produkt/nazwa-produktu',
  'twojastrona.pl/kategoria/rankingi',
];


export default function Hero() {
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

  // Tlo (siatka kropek + graf wezlow) daje HeroBand — wspolnie z sekcja mockupu,
  // zeby linie nie urywaly sie na granicy sekcji.
  return (
    <section className="relative">
      <div className="relative" style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 28px', textAlign: 'center', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{ marginBottom: 32 }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.4rem, 4.56vw, 3.6rem)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.03em',
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Sprawdź swoje treści pod kątem AI Search
            </span>
            <span style={{
              display: 'block',
              fontSize: 17, fontWeight: 400,
              lineHeight: 1.6, color: '#36394a',
              maxWidth: 560, margin: '14px auto 0',
            }}>
              Badamy najważniejsze elementy treści, które decydują o cytowaniu przez AI. Zwiększ potencjał cytowania strony przez <span className="hero-brand"><img src="/logos/chatgpt.png" alt="" aria-hidden width={16} height={16} />ChatGPT</span>, <span className="hero-brand"><img src="/logos/perplexity.png" alt="" aria-hidden width={16} height={16} />Perplexity</span> i <span className="hero-brand"><img src="/logos/google.png" alt="" aria-hidden width={16} height={16} />Google</span> AI Overview.
            </span>
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!url.trim()) {
                setError('Podaj adres URL.');
                return;
              }
              if (!isValidUrl(url)) {
                setError('Podaj poprawny adres URL (np. https://example.com/strona).');
                return;
              }
              const normalized = normalizeUrl(url);
              const encoded = encodeURIComponent(normalized).replace(/%3A/gi, ':').replace(/%2F/gi, '/');
              window.location.href = `${APP_URL}/login?lang=pl&audit-url=${encoded}`;
            }}
            style={{ maxWidth: 580, margin: '0 auto' }}
            noValidate
          >
            <div className="hero-input-row">
              <input
                type="text"
                value={url}
                onChange={(e) => { setUrl(e.target.value); if (error) setError(''); }}
                placeholder={typed ? `Wklej link, np. ${typed}` : 'Wklej link do strony...'}
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
                Zrób audyt →
              </motion.button>
            </div>
            {error && (
              <p role="alert" style={{ fontSize: 13, color: '#B91C1C', margin: '10px 0 0', textAlign: 'left' }}>
                {error}
              </p>
            )}
          </form>

          <p style={{ fontSize: 13, color: '#818898', margin: '14px auto 0', lineHeight: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0b7983" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 100-5C13 2 12 7 12 7z" />
            </svg>
            Odbierz 3 darmowe audyty na start. Pełny raport w 5 minut.
          </p>
        </motion.div>
      </div>

      <style>{`
        .hero-input-row {
          display: flex;
        }
        .hero-input-row input:focus {
          border-color: #0b7983;
          border-right: none;
        }
        @media (max-width: 580px) {
          .hero-input-row { flex-direction: column; gap: 8px; }
          .hero-input-row input {
            border-radius: 8px !important;
            border-right: 1.5px solid #dfe1e7 !important;
          }
          .hero-input-row button {
            border-radius: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
