'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citabilityscore.com';

const steps = [
  {
    number: '1',
    title: 'Wklej URL artykułu',
    description:
      'Podajesz adres strony i słowo kluczowe. Narzędzie samo pobiera treść i dane SERP - żadnych ręcznych copy-paste.',
    accent: '#0b7983',
    icon: (
      // globe-alt - URL / web address
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'AI analizuje treść',
    description:
      '10 równoległych wywołań AI: 9 wymiarów jakości, benchmark top 10 SERP, pokrycie AI Overview i analiza grafu wiedzy.',
    accent: '#0b7983',
    icon: (
      // sparkles - AI magic
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Odbierasz gotowy raport',
    description:
      'Content Quality Score, wykres radarowy, priorytetyzowane rekomendacje BEFORE/AFTER, benchmark SERP. Eksport PDF i Markdown.',
    accent: '#0b7983',
    icon: (
      // document-check - gotowy raport
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
      </svg>
    ),
  },
];

function StepConnector() {
  return (
    <div className="step-connector" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
      <div style={{ width: 32, height: 2, background: '#0b7983', borderRadius: '2px 0 0 2px' }} />
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" style={{ marginLeft: -1 }}>
        <path d="M1 1l8 7-8 7" stroke="#0b7983" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="jak-dziala" style={{ background: '#f8fafb', padding: '58px 0' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 600,
              color: '#0d0d12',
              letterSpacing: '-0.025em',
            }}
          >
            Jak to działa?
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="howitworks-grid">
          {steps.map((step, i) => (
            <>
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(11,121,131,0.1)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.13 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dfe1e7',
                  borderRadius: 8,
                  padding: '32px 28px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.accent,
                    background: 'rgba(11,121,131,0.06)',
                    border: '1px solid rgba(11,121,131,0.18)',
                    marginBottom: 24,
                    marginTop: 4,
                  }}
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: '#0d0d12',
                    marginBottom: 10,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: '#36394a', lineHeight: 1.65 }}>
                  {step.description}
                </p>
              </motion.div>

              {/* Connector (between cards, not after last) */}
              {i < steps.length - 1 && (
                <motion.div
                  key={`connector-${i}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.13 + 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <StepConnector />
                </motion.div>
              )}
            </>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <motion.a
            href={`${APP_URL}/login`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 28px',
              borderRadius: 8,
              background: '#0b7983',
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

      </div>

      <style>{`
        .howitworks-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 0 16px;
          align-items: stretch;
        }
        .step-connector {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .howitworks-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .step-connector {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
