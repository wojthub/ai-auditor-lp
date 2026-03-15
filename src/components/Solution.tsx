'use client';

import { motion } from 'framer-motion';
import RadarIllustration from './RadarIllustration';

const ACCENT = '#0b7983';
const APP_URL = 'https://app.smartcontentaudit.com';

export default function Solution() {
  return (
    <section style={{ background: '#ffffff', padding: '58px 0' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        <div className="solution-grid">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#818898',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 14,
            }}>
              Smart Content Audit
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
              maxWidth: 420,
            }}>
              Smart Content Audit analizuje 9 wymiarów jakości treści i porównuje
              Twój artykuł z top&nbsp;10 SERP. Otrzymujesz spriorytetyzowane rekomendacje
              Before/After – całość jest gotowa w mniej niż 3 minuty.
            </p>

            <motion.a
              href={`${APP_URL}/register`}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 32,
                padding: '12px 28px',
                borderRadius: 8,
                background: ACCENT,
                color: '#ffffff',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              Rozpocznij
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafb',
              border: '1px solid #dfe1e7',
              borderRadius: 12,
              padding: '32px',
            }}
          >
            <RadarIllustration maxWidth={260} />
          </motion.div>

        </div>

      </div>

      <style>{`
        .solution-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .solution-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
}
