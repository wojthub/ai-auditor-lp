'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.smartcontentaudit.com';

export default function CtaSection() {
  return (
    <section style={{ padding: '64px 0', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ borderRadius: 24, overflow: 'hidden' }}
        >
          <div
            style={{
              position: 'relative',
              background: '#0F172A',
              padding: '64px 32px',
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Green gradient accents */}
            <div
              style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 320,
                height: 320,
                background: 'rgba(21, 128, 61, 0.2)',
                borderRadius: '50%',
                filter: 'blur(56px)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 240,
                height: 240,
                background: 'rgba(21, 128, 61, 0.12)',
                borderRadius: '50%',
                filter: 'blur(48px)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative' }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#4ADE80',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 16,
                }}
              >
                Zacznij teraz
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  marginBottom: 16,
                }}
              >
                Mniej niż 3 minuty zamiast godzin eksperckiej pracy
              </h2>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.55)',
                  fontSize: 18,
                  maxWidth: 480,
                  margin: '0 auto 40px',
                  lineHeight: 1.6,
                }}
              >
                Wklejasz URL, dostajesz raport — co zmienić w treści, żeby cytowały Cię
                Google AI Overview, ChatGPT i Perplexity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3" style={{ justifyContent: 'center' }}>
                <a
                  href={APP_URL}
                  className="inline-flex items-center justify-center gap-2"
                  style={{
                    padding: '15px 32px',
                    borderRadius: 12,
                    background: '#0b7983',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 16,
                    textDecoration: 'none',
                  }}
                >
                  Zamów pakiet 5 audytów
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#przyklad-raportu"
                  className="inline-flex items-center justify-center"
                  style={{
                    padding: '15px 32px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: 16,
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    textDecoration: 'none',
                  }}
                >
                  Zobacz przykładowy raport
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
