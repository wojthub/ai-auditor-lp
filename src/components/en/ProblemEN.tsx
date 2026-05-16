'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';

const STAGES = [
  { none: true },
  { none: false },
];
const PAUSES = [1800, 3000];

function WordCycle() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % STAGES.length), PAUSES[idx]);
    return () => clearTimeout(t);
  }, [idx]);

  const stage = STAGES[idx];

  return (
    <div style={{
      position: 'relative',
      height: '1.15em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {stage.none ? (
            <>
              <span style={{ color: '#0d0d12' }}>Citatio</span>
              <span style={{ color: '#a4acb9' }}>None?</span>
            </>
          ) : (
            <span style={{
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              CitationOne
            </span>
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function ProblemEN() {
  return (
    <>
      {/* Section 1 - problem, 2-col layout */}
      <section style={{ background: '#ffffff', padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="problem-header-grid">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Problem</span>
                <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: 700,
                color: '#0d0d12',
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
                margin: 0,
              }}>
                Does AI see your content?
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, margin: 0 }}>
                A high Google ranking doesn&apos;t mean your brand exists for ChatGPT, Google AI Overview or Perplexity. Traditional SEO tools don&apos;t measure how artificial intelligence interprets content. Manual analysis takes hours.
              </p>
            </motion.div>
          </div>
        </div>

        <style>{`
          .problem-header-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
          }
          @media (max-width: 768px) {
            .problem-header-grid { grid-template-columns: 1fr; gap: 32px; }
          }
        `}</style>
      </section>

      {/* WordCycle standalone - centered, 3× size */}
      <section style={{ background: '#ffffff', padding: '48px 24px 56px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(2.88rem, 7.2vw, 5.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          <WordCycle />
        </motion.div>
      </section>

      {/* Section 2 - solution, centered single column */}
      <section style={{ background: '#ffffff', padding: '56px 0 90px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ fontSize: 18, color: '#36394a', lineHeight: 1.72, marginBottom: 36 }}>
              CitationOne analyzes your website for AI Search, helping you optimize for answers in LLMs. The tool delivers ready-made recommendations - specific changes that will make AI robots start selecting your page as the source of answers for users.
            </p>
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
      </section>
    </>
  );
}
