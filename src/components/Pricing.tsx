'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';

const included = [
  'Pełny audyt AI Search',
  'Content Quality Score (CQS 0–100)',
  'AI Citability Score (0–10)',
  'Analiza 10 wymiarów jakości',
  'Benchmark top 10 SERP',
  'Rekomendacje Before/After z priorytetami',
  'AI Overview Coverage',
  'Graf wiedzy i encje (EAV)',
  'Eksport PDF i Markdown',
  'Faktura VAT · Płatność przelewem',
];

const plans = [
  {
    name: '5 audytów',
    reports: 5,
    price: 490,
    perReport: 98,
    savings: null,
    badge: null,
    featured: false,
    cta: 'Zamów pakiet',
  },
  {
    name: '10 audytów',
    reports: 10,
    price: 890,
    perReport: 89,
    savings: 90,
    badge: 'Polecany',
    featured: true,
    cta: 'Zamów pakiet',
  },
  {
    name: '20 audytów',
    reports: 20,
    price: 1590,
    perReport: 79.5,
    savings: 370,
    badge: 'Najlepsza cena',
    featured: false,
    cta: 'Zamów pakiet',
  },
];

function CheckIcon() {
  return (
    <span
      style={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: '#e6f5f6',
        border: '1.5px solid #b2dfe3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 1,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2 2 4-4" stroke="#0b7983" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Pricing() {
  return (
    <section id="cennik" style={{ background: '#f8fafb', padding: '58px 0' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Cennik
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 600,
              color: '#0d0d12',
              letterSpacing: '-0.025em',
            }}
          >
            Płacisz za pakiet, nie subskrypcję
          </h2>
          <p style={{ marginTop: 14, color: '#666d80', fontSize: 17, maxWidth: 440, margin: '14px auto 0' }}>
            Bez automatycznych odnowień. Faktura VAT. Płatność przelewem.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -5,
                boxShadow: '0 10px 28px rgba(11,121,131,0.12)',
                transition: { type: 'spring', stiffness: 400, damping: 25 },
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: '#ffffff',
                border: plan.featured ? '1.5px solid #0b7983' : '1px solid #dfe1e7',
                borderRadius: 8,
                padding: '32px 28px 28px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: -13,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: plan.featured ? '#0b7983' : '#0d0d12',
                    color: '#ffffff',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    padding: '4px 14px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Name */}
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0d0d12', marginBottom: 4, letterSpacing: '-0.02em' }}>
                {plan.name}
              </h3>
              <p style={{ fontSize: 13, color: '#818898', marginBottom: 24 }}>
                {plan.reports} pełnych raportów AI Search
              </p>

              {/* Price */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#666d80' }}>zł</span>
                  <span style={{ fontSize: 13, color: '#818898' }}>netto</span>
                </div>
                <p style={{ fontSize: 13, color: '#666d80', marginTop: 6 }}>
                  {plan.perReport % 1 === 0 ? plan.perReport : plan.perReport.toFixed(1)} zł / raport
                  {plan.savings && (
                    <span style={{ marginLeft: 8, color: '#0b7983', fontWeight: 700 }}>
                      · oszczędzasz {plan.savings} zł
                    </span>
                  )}
                </p>
              </div>

              {/* CTA */}
              <a
                href={`${APP_URL}/login`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '11px 16px',
                  borderRadius: 6,
                  background: plan.featured ? '#0b7983' : '#0d0d12',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: 13.5,
                  textDecoration: 'none',
                  marginTop: 20,
                  marginBottom: 24,
                  letterSpacing: '-0.01em',
                }}
              >
                {plan.cta}
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              {/* Divider */}
              <div style={{ borderTop: '1px solid #dfe1e7', marginBottom: 20 }} />

              {/* Included */}
              <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                Każdy audyt zawiera
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span style={{ fontSize: 13, color: '#36394a', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 36, fontSize: 14, color: '#818898' }}
        >
          Potrzebujesz większego wolumenu? Napisz do nas - przygotujemy ofertę indywidualną.
        </motion.p>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
