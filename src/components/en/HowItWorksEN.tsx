'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';

const steps = [
  {
    number: '01',
    numberColor: '#e07a4a',
    title: 'Paste a link or text',
    description:
      'Enter a sitemap link, a page URL or content you are about to publish. The tool requires no integration or configuration.',
  },
  {
    number: '02',
    numberColor: '#0b7983',
    title: 'Algorithm runs the audit',
    description:
      'In less than 3 minutes the system checks your content against direct competitors from the search engine. It analyzes text against the parameters language models use to select answer sources.',
  },
  {
    number: '03',
    numberColor: '#c47a2a',
    title: 'Implement ready guidelines',
    description:
      'You receive a clear report with a specific list of changes. Instead of generic advice you get precise instructions on what to fix in the structure and composition of your text so AI starts citing it.',
  },
];

function StepConnector() {
  return (
    <div className="step-connector">
      <div style={{ width: 28, height: 2, background: 'rgba(11,121,131,0.2)', borderRadius: '2px 0 0 2px' }} />
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" style={{ marginLeft: -1 }}>
        <path d="M1 1l8 7-8 7" stroke="rgba(11,121,131,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function HowItWorksEN() {
  return (
    <section id="how-it-works" style={{ background: '#ffffff', padding: '90px 0' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>How it works</span>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
          </div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            color: '#0d0d12',
            letterSpacing: '-0.03em',
            marginBottom: 14,
          }}>
            How it works
          </h2>
          <p style={{ fontSize: 16, color: '#666d80', lineHeight: 1.65, margin: '0 auto', maxWidth: 520 }}>
            See how CitationOne turns complex algorithmic analysis into ready-made guidelines:
          </p>
        </motion.div>

        <div className="howitworks-grid">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.13 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dfe1e7',
                  borderRadius: 12,
                  padding: '28px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  height: '100%',
                }}
              >
                <div style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  color: step.numberColor,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 20,
                }}>
                  {step.number}
                </div>

                <h3 style={{
                  fontSize: 17, fontWeight: 600,
                  color: '#0d0d12',
                  letterSpacing: '-0.02em', lineHeight: 1.3,
                  marginBottom: 10,
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: '#36394a', lineHeight: 1.65, margin: 0 }}>
                  {step.description}
                </p>
              </motion.div>

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

        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <motion.a
            href={`${APP_URL}/login?lang=en`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '15px 36px', borderRadius: 8,
              background: '#0b7983', color: '#ffffff',
              fontWeight: 700, fontSize: 15,
              textDecoration: 'none', letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
            }}
          >
            Generate report in 3 minutes
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </div>
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
        @media (max-width: 900px) {
          .howitworks-grid { grid-template-columns: 1fr; gap: 12px; }
          .step-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
