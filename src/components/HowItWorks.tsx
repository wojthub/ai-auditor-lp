'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';

const steps = [
  {
    number: '1',
    title: 'Wklej URL artykułu',
    description:
      'Podajesz adres strony i słowo kluczowe. Narzędzie samo pobiera treść i dane SERP - żadnych ręcznych copy-paste.',
    accent: '#0b7983',
    icon: (
      // link bar - URL / address bar
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'AI analizuje treść',
    description:
      '10 równoległych wywołań AI: zgodność z intencją, gęstość informacji, graf wiedzy, BLUF, chunki, koszt ekstrakcji, TF-IDF, role semantyczne, pokrycie AI Overview, wysiłek redakcyjny + E-E-A-T. W trybie Full: benchmark top 10 SERP.',
    accent: '#0b7983',
    icon: (
      // sparkles - AI magic
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Odbierasz gotowy raport',
    description:
      'Raport z rekomendacjami Before/After - dosłowny cytat z artykułu i gotowa poprawka z szacowanym wpływem na wynik. Eksport PDF lub Markdown jednym kliknięciem.',
    accent: '#0b7983',
    icon: (
      // document-check - gotowy raport
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}>
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
    <section id="jak-dziala" style={{
      background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)',
      padding: '90px 0',
      clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)',
      margin: '-28px 0',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    }}>
      {/* Dekoracyjne cudzysłowy */}
      <span aria-hidden style={{
        position: 'absolute', top: 36, left: 52,
        fontSize: 200, lineHeight: 1, fontWeight: 400,
        color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif',
        userSelect: 'none', pointerEvents: 'none',
      }}>{'\u201C'}</span>
      <span aria-hidden style={{
        position: 'absolute', bottom: 36, right: 52,
        fontSize: 200, lineHeight: 1, fontWeight: 400,
        color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif',
        userSelect: 'none', pointerEvents: 'none',
      }}>{'\u201D'}</span>

      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 2 }}>

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
              color: '#ffffff',
              letterSpacing: '-0.025em',
            }}
          >
            Jak to działa?
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="howitworks-grid">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <motion.div
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
                  whileHover={{ scale: 1.08, rotate: 4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    background: '#0b7983',
                    border: '1px solid rgba(255,255,255,0.2)',
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
            </Fragment>
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
            href={`${APP_URL}/login?lang=pl`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 8,
              background: '#ffffff',
              color: '#0b7983',
              border: '1px solid rgba(255,255,255,0.5)',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Zrób audyt
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
