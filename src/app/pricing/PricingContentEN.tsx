'use client';

import { motion } from 'framer-motion';
import HeroBackdrop from '@/components/HeroBackdrop';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';

export default function PricingContentEN() {
  return (
    <section style={{ background: '#ffffff', padding: '44px 0 96px', position: 'relative', overflow: 'hidden' }}>
      <HeroBackdrop />
      <div style={{ maxWidth: 720, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative' }}>

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

        {/* Volume bonus - tiers mirror CREDIT_BONUS_TIERS in the app */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 20,
            border: '1px solid #dfe1e7',
            borderRadius: 12,
            padding: '28px 28px 24px',
            background: '#f8fafb',
          }}
        >
          <h2 style={{
            fontSize: 18, fontWeight: 700, color: '#0d0d12',
            letterSpacing: '-0.02em', margin: '0 0 6px', textAlign: 'center',
          }}>
            Buy more, get extra credits
          </h2>
          <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 20px', textAlign: 'center' }}>
            The bonus is added automatically at checkout. 1 credit = 1 audit.
          </p>

          <div className="bonus-tiers">
            {[
              { credits: 100, percent: 10, effective: '€1.82' },
              { credits: 200, percent: 20, effective: '€1.67' },
              { credits: 300, percent: 30, effective: '€1.54' },
            ].map((tier) => (
              <div
                key={tier.credits}
                style={{
                  border: '1px solid #dfe1e7',
                  borderRadius: 10,
                  background: '#ffffff',
                  padding: '16px 12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.03em' }}>
                    {tier.credits}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#15803d' }}>
                    +{tier.percent}%
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: '#818898', marginTop: 6, lineHeight: 1.5 }}>
                  credits<br />
                  <span style={{ color: '#36394a' }}>{tier.effective} / audit</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

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
        .bonus-tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 640px) {
          .pricing-cards { grid-template-columns: 1fr; }
        }
        /* Three pills collapse to one column below ~500px — "300 +30%" needs
           roughly 100px on one line, so it breaks awkwardly when narrower. */
        @media (max-width: 500px) {
          .bonus-tiers { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
