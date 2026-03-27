'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';

export default function ClosingCta() {
  return (
    <section style={{ background: '#0b7983', padding: '58px 0' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Sprawdź, czy Twoja treść<br />
            jest gotowa na AI Search.
          </h2>

          <p style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.68,
            marginBottom: 36,
            maxWidth: 440,
            margin: '0 auto 36px',
          }}>
            Wklej URL artykułu i słowo kluczowe. Gotowy raport z rekomendacjami Before/After w mniej niż 3 minuty.
          </p>

          <motion.a
            href={`${APP_URL}/login`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              borderRadius: 8,
              background: '#ffffff',
              color: '#0b7983',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Rozpocznij
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>

        </motion.div>

      </div>
    </section>
  );
}
