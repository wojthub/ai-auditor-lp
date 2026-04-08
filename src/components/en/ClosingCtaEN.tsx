'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';

export default function ClosingCtaEN() {
  return (
    <section style={{ background: '#ffffff', padding: '58px 0', borderTop: '1px solid #eceff3' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
            Check if your content<br />
            is ready for AI Search.
          </h2>
          <p style={{ fontSize: 17, color: '#666d80', lineHeight: 1.68, marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
            Paste your article URL and keyword. Full report with Before/After recommendations in under 3 minutes.
          </p>
          <motion.a
            href={`${APP_URL}/login?lang=en`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 8, background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)', color: '#ffffff', fontWeight: 700, fontSize: 15, textDecoration: 'none', letterSpacing: '-0.01em' }}
          >
            Run audit
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </motion.a>
          <p style={{ fontSize: 13, color: '#a4acb9', marginTop: 16 }}>
            EUR 1.50 / audit
          </p>
          <p style={{ fontSize: 13, color: '#a4acb9', marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0b7983" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 100-5C13 2 12 7 12 7z" />
            </svg>
            Every new account receives 3 free audits.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
