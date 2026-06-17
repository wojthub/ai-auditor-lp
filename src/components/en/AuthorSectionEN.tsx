'use client';

import { motion } from 'framer-motion';

const LINKEDIN_URL = 'https://www.linkedin.com/in/wojciech-wladzinski-ulatowski/';

export default function AuthorSectionEN() {
  return (
    <section style={{ background: '#f8fafb', padding: '72px 0', borderTop: '1px solid #eceff3' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        <motion.div
          className="author-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            background: '#ffffff',
            border: '1px solid #dfe1e7',
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          <div className="author-photo-col" style={{ width: 208, flexShrink: 0, background: '#eef1f4' }}>
            <img
              src="/author.jpg"
              alt="Wojciech Władziński-Ulatowski"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="author-body" style={{ flex: 1, padding: '40px 44px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>About the author</span>
            </div>

            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 4px' }}>
              Wojciech Władziński-Ulatowski
            </h3>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0b7983', margin: '0 0 18px' }}>
              Creator of CitationOne
            </p>
            <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.68, margin: '0 0 24px' }}>
              SEO expert with 15+ years of experience, specializing in organic growth for the financial industry. Currently leading SEO strategy and conversion at Lendi, with a proven track record of scaling brand in the most competitive YMYL niche.
            </p>

            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 8,
                background: '#0b7983',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
            </motion.a>
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .author-card { flex-direction: column; }
          .author-photo-col { width: 100%; height: 280px; }
          .author-body { padding: 28px 24px; }
        }
      `}</style>
    </section>
  );
}
