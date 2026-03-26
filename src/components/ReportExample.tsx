'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citabilityscore.com';

export default function ReportExample() {
  return (
    <section
      id="przyklad-raportu"
      style={{ background: '#0b7983', padding: '58px 0' }}
    >
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontSize: 11, fontWeight: 600,
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16,
          }}>
            Przykładowy raport
          </p>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: 20,
            maxWidth: 600,
            margin: '0 auto 20px',
          }}>
            Zobacz przykładowy raport
          </h2>

          <p style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.72)',
            maxWidth: 520,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            W mniej niż 3 minuty otrzymujesz gotowy raport. Dokument nie wymaga edycji - możesz go wysłać do klienta lub od razu rozpocząć prace optymalizacyjne.
          </p>

          <motion.a
            href={`${APP_URL}/login`}
            className="inline-flex items-center justify-center gap-2"
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
              borderRadius: 8,
              background: '#ffffff',
              color: '#0b7983',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Pobierz przykładowy raport
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
