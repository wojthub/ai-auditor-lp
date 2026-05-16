'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';

export default function PricingContentEN() {
  return (
    <section style={{ background: '#ffffff', padding: '44px 0 96px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 22,
            background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>
            Pricing
          </h1>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, maxWidth: 480, margin: '0 auto' }}>
            CitationOne runs on a flexible{' '}
            <strong style={{ fontWeight: 700, color: '#0b7983' }}>Pay-as-you-go</strong> model.
            <br />
            No fixed monthly commitments. You only pay for real analysis.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="pricing-cards">

          {/* Left: Free */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              border: `2px solid ${ACCENT}`,
              borderRadius: 12,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(11,121,131,0.03)',
            }}
          >
            <span style={{
              fontSize: 10, fontWeight: 700, color: ACCENT,
              background: 'rgba(11,121,131,0.1)', borderRadius: 4,
              padding: '3px 10px', letterSpacing: '0.08em',
              alignSelf: 'flex-start', marginBottom: 20,
            }}>
              FREE START
            </span>

            <div style={{ marginBottom: 16 }}>
              <span style={{
                fontSize: 72, fontWeight: 700, color: ACCENT,
                lineHeight: 1, letterSpacing: '-0.05em', display: 'block',
              }}>3</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em' }}>
                free audits
              </span>
            </div>

            <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>
              The first 3 audits are free - test the full power of the algorithm at no cost.
            </p>
          </motion.div>

          {/* Right: Paid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              border: '1px solid #dfe1e7',
              borderRadius: 12,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
            }}
          >
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#818898',
              background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 4,
              padding: '3px 10px', letterSpacing: '0.08em',
              alignSelf: 'flex-start', marginBottom: 20,
            }}>
              FURTHER AUDITS
            </span>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{
                  fontSize: 56, fontWeight: 700, color: '#0d0d12',
                  lineHeight: 1, letterSpacing: '-0.04em',
                }}>€2.00</span>
                <span style={{ fontSize: 16, color: '#818898', fontWeight: 500 }}> / audit</span>
              </div>
            </div>

            <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>
              Price of each additional analysis - with no monthly fees.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginTop: 32 }}
        >
          <motion.a
            href={`${APP_URL}/login?lang=en`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '15px 36px',
              borderRadius: 8,
              background: '#0b7983',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
            }}
          >
            Run audit
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>

      </div>

      <style>{`
        .pricing-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 640px) {
          .pricing-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
