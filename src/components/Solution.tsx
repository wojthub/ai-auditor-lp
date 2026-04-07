'use client';

import { motion } from 'framer-motion';
import RadarIllustration from './RadarIllustration';

const ACCENT = '#0b7983';
const APP_URL = 'https://app.citationone.com';

export default function Solution() {
  return (
    <section style={{ background: '#ffffff', padding: '98px 0' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Copy block - centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}
        >
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#818898',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 14,
          }}>
            CitationOne
          </p>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 600,
            color: '#0d0d12',
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            marginBottom: 20,
          }}>
            Narzędzie, które mierzy to,{' '}
            <span style={{ color: ACCENT }}>co AI naprawdę ocenia</span>
          </h2>
          <p style={{
            fontSize: 16,
            color: '#666d80',
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            CitationOne analizuje 10 wymiarów jakości treści i porównuje
            Twój artykuł z top&nbsp;10 SERP. Otrzymujesz spriorytetyzowane rekomendacje
            Before/After – całość jest gotowa w mniej niż 3 minuty.
          </p>

          <motion.a
            href={`${APP_URL}/login?lang=pl`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 8,
              background: ACCENT,
              color: '#ffffff',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Zrób audyt
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Score card + radar - centered, 80% width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="sol-card-wrapper"
        >
          <div className="sol-card">
            {/* Score boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 2 }}>
              {/* CQS */}
              <div className="sol-score-box" style={{ background: 'rgba(202,138,4,0.06)', borderLeft: '3px solid #CA8A04', borderRadius: 8, padding: '12px 14px', position: 'relative', cursor: 'default', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p className="sol-score-label" style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>CQS</p>
                  <span className="sol-score-badge" style={{ fontSize: 9, fontWeight: 700, color: '#CA8A04', background: 'rgba(202,138,4,0.12)', border: '1px solid rgba(202,138,4,0.25)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>UWAGA</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="sol-score-num" style={{ fontSize: 40, fontWeight: 700, color: '#CA8A04', lineHeight: 1, letterSpacing: '-0.04em' }}>78</span>
                  <span style={{ fontSize: 14, color: '#a4acb9', fontWeight: 500 }}>/ 100</span>
                </div>
                <div className="sol-score-tooltip">
                  <strong>Content Quality Score</strong> - zagregowana ocena jakości treści (0-100) obliczana z 10 wymiarów AI Search. Im wyższy wynik, tym większa szansa na cytowanie przez modele językowe.
                </div>
              </div>
              {/* Citability */}
              <div className="sol-score-box" style={{ background: 'rgba(220,38,38,0.06)', borderLeft: '3px solid #DC2626', borderRadius: 8, padding: '12px 14px', position: 'relative', cursor: 'default', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p className="sol-score-label" style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Citability</p>
                  <span className="sol-score-badge" style={{ fontSize: 9, fontWeight: 700, color: '#DC2626', background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>KRYTYCZNY</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="sol-score-num" style={{ fontSize: 40, fontWeight: 700, color: '#DC2626', lineHeight: 1, letterSpacing: '-0.04em' }}>4.9</span>
                  <span style={{ fontSize: 14, color: '#a4acb9', fontWeight: 500 }}>/ 10</span>
                </div>
                <div className="sol-score-tooltip">
                  <strong>AI Citability Score</strong> - prawdopodobieństwo, że ChatGPT, Perplexity lub Google AI Overview zacytuje Twoją treść (0-10). Uwzględnia strukturę BLUF, gęstość informacji i pokrycie sub-zapytań.
                </div>
              </div>
            </div>

            <div className="sol-radar-wrap" style={{ borderTop: '1px solid #eceff3', margin: '18px 0 0' }}>
              <div style={{ paddingTop: 18, display: 'flex', justifyContent: 'center' }}>
                <RadarIllustration maxWidth={460} />
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        .sol-card-wrapper { width: 80%; margin: 0 auto; }
        .sol-card {
          background: #ffffff;
          border: 1px solid #dfe1e7;
          border-radius: 12px;
          padding: 28px 28px 24px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .sol-card-wrapper { width: 100%; }
          .sol-card { padding: 18px 14px 16px; }
          .sol-score-box { padding: 10px 10px !important; }
          .sol-score-box .sol-score-num { font-size: 32px !important; }
          .sol-score-box .sol-score-badge { font-size: 8px !important; padding: 2px 5px !important; }
          .sol-score-box .sol-score-label { font-size: 10px !important; }
          .sol-radar-wrap { display: none; }
        }
        .sol-score-box { transition: box-shadow 0.15s ease; }
        .sol-score-tooltip {
          display: none;
          position: absolute;
          left: 0; right: 0; top: 100%;
          margin-top: 6px;
          background: #0d0d12;
          color: #e5e7eb;
          font-size: 12px;
          line-height: 1.55;
          padding: 10px 12px;
          border-radius: 6px;
          z-index: 10;
          pointer-events: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
        }
        .sol-score-tooltip strong { color: #ffffff; }
        .sol-score-box:hover .sol-score-tooltip { display: block; }
      `}</style>
    </section>
  );
}
