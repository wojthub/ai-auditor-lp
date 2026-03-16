'use client';

import { motion } from 'framer-motion';
import RadarIllustration from './RadarIllustration';

const APP_URL = 'https://app.smartcontentaudit.com';

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.14 }} />
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      <div className="relative" style={{ maxWidth: 1024, margin: '0 auto', padding: '72px 24px 88px' }}>
        <div className="hero-grid">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.56vw, 3.6rem)', fontWeight: 700,
              lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: 20,
              display: 'inline-block',
              background: 'linear-gradient(135deg, #0b7983 0%, #0b9aa6 45%, #0d0d12 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Audytuj treść<br />
              pod kątem<br />
              AI Search
            </h1>

            <p style={{ fontSize: 17, color: '#36394a', fontWeight: 400, lineHeight: 1.6, margin: '0 0 36px' }}>
              Sprawdź, czy Twój content jest cytowalny przez ChatGPT, Perplexity i Google AI Overview.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <motion.a
                href={`${APP_URL}/login`}
                className="inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '11px 22px', borderRadius: 8, background: '#0b7983',
                  color: '#ffffff', fontWeight: 600, fontSize: 14,
                  textDecoration: 'none', letterSpacing: '-0.01em', border: '1px solid #097380',
                }}
              >
                Rozpocznij
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
              <motion.a
                href="#przyklad-raportu"
                className="inline-flex items-center justify-center"
                whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '11px 22px', borderRadius: 8, background: '#ffffff',
                  color: '#1a1b25', fontWeight: 500, fontSize: 14,
                  border: '1px solid #dfe1e7', textDecoration: 'none', letterSpacing: '-0.01em',
                }}
              >
                Zobacz przykładowy raport
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT - floating report card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}
          >
            <div
              style={{
                background: '#ffffff', border: '1px solid #dfe1e7',
                borderRadius: 10, padding: '24px 24px 20px',
                width: '100%', maxWidth: 420,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 2 }}>
                {/* Left: CQS */}
                <div style={{ background: 'rgba(202,138,4,0.06)', borderLeft: '3px solid #CA8A04', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                      CQS
                    </p>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#CA8A04', background: 'rgba(202,138,4,0.12)', border: '1px solid rgba(202,138,4,0.25)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.06em' }}>UWAGA</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 700, color: '#CA8A04', lineHeight: 1, letterSpacing: '-0.04em' }}>78</span>
                    <span style={{ fontSize: 14, color: '#a4acb9', fontWeight: 500 }}>/ 100</span>
                  </div>
                </div>
                {/* Right: Citability */}
                <div style={{ background: 'rgba(220,38,38,0.06)', borderLeft: '3px solid #DC2626', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                      Citability
                    </p>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#DC2626', background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.06em' }}>KRYTYCZNY</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 700, color: '#DC2626', lineHeight: 1, letterSpacing: '-0.04em' }}>4.9</span>
                    <span style={{ fontSize: 14, color: '#a4acb9', fontWeight: 500 }}>/ 10</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eceff3', margin: '14px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                <RadarIllustration maxWidth={320} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
}
