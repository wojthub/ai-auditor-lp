'use client';

import { motion } from 'framer-motion';
import RadarIllustration from './RadarIllustration';

export default function HeroVisual() {
  return (
    <section style={{ background: '#ffffff', paddingBottom: 64 }}>
      <div style={{ maxWidth: 540, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #dfe1e7',
              borderRadius: 10,
              padding: '24px 24px 20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 2 }}>
              {/* CQS */}
              <div className="score-box" style={{ background: 'rgba(202,138,4,0.06)', borderLeft: '3px solid #CA8A04', borderRadius: 8, padding: '12px 14px', position: 'relative', cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>CQS</p>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#CA8A04', background: 'rgba(202,138,4,0.12)', border: '1px solid rgba(202,138,4,0.25)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.06em' }}>UWAGA</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: '#CA8A04', lineHeight: 1, letterSpacing: '-0.04em' }}>78</span>
                  <span style={{ fontSize: 14, color: '#a4acb9', fontWeight: 500 }}>/ 100</span>
                </div>
                <div className="score-tooltip">
                  <strong>Content Quality Score</strong> - zagregowana ocena jakości treści (0-100) obliczana z 10 wymiarów AI Search. Im wyższy wynik, tym większa szansa na cytowanie przez modele językowe.
                </div>
              </div>
              {/* Citability */}
              <div className="score-box" style={{ background: 'rgba(220,38,38,0.06)', borderLeft: '3px solid #DC2626', borderRadius: 8, padding: '12px 14px', position: 'relative', cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Citability</p>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#DC2626', background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.06em' }}>KRYTYCZNY</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: '#DC2626', lineHeight: 1, letterSpacing: '-0.04em' }}>4.9</span>
                  <span style={{ fontSize: 14, color: '#a4acb9', fontWeight: 500 }}>/ 10</span>
                </div>
                <div className="score-tooltip">
                  <strong>AI Citability Score</strong> - prawdopodobieństwo, że ChatGPT, Perplexity lub Google AI Overview zacytuje Twoją treść (0-10). Uwzględnia strukturę BLUF, gęstość informacji i pokrycie sub-zapytań.
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #eceff3', margin: '14px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <RadarIllustration maxWidth={460} />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .score-tooltip {
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
        .score-tooltip strong { color: #ffffff; }
        .score-box:hover .score-tooltip { display: block; }
      `}</style>
    </section>
  );
}
