'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    icon: (
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    statement: 'Ranking in Google is only half the battle today',
    body: 'ChatGPT, Perplexity and Google AI Overview select sources by their own criteria - often completely independent of your SERP position or how many backlinks your page has.',
  },
  {
    icon: (
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    statement: "Traditional SEO tools can't see what AI evaluates",
    body: "Traditional SEO tools won't tell you whether your page is readable for language models. AI evaluates answer structure, information density and concrete data - not just keyword saturation. If you're not measuring these parameters, you're flying blind.",
  },
  {
    icon: (
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    statement: 'Manual analysis takes a full day of tedious work',
    body: 'Manually benchmarking your page against the TOP 10 competitors takes an expert a full working day. CitationOne automates the process, delivering a precise benchmark and ready-made recommendations while you make coffee.',
  },
];

const closing = {
  statement: 'Acting without diagnosis is burning your budget',
  body: 'CitationOne precisely identifies which dimension is lowering your Content Quality Score (CQS). Find out exactly what changes to make on your page to become visible to AI Search algorithms.',
};

export default function ProblemEN() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)',
      padding: '90px 0',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    }}>
      <span aria-hidden style={{ position: 'absolute', top: 36, left: 52, fontSize: 200, lineHeight: 1, fontWeight: 400, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201C'}</span>
      <span aria-hidden style={{ position: 'absolute', bottom: 36, right: 52, fontSize: 200, lineHeight: 1, fontWeight: 400, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201D'}</span>

      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 2 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56, textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', fontWeight: 600,
            color: '#ffffff', letterSpacing: '-0.025em', lineHeight: 1.25,
            maxWidth: 560, margin: '0 auto',
          }}>
            High Google ranking does not mean AI will cite you
          </h2>
        </motion.div>

        <div className="problem-grid">
          {cards.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '32px 28px' }}
            >
              <div style={{
                width: 88, height: 88, borderRadius: 16,
                background: '#0b7983', border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24, color: '#ffffff',
              }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.02em', lineHeight: 1.35, marginBottom: 12 }}>
                {p.statement}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.7, margin: 0 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.27 }}
          style={{ marginTop: 56, textAlign: 'center' }}
        >
          <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.025em', lineHeight: 1.25, maxWidth: 560, margin: '0 auto 14px' }}>
            {closing.statement}
          </h3>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, maxWidth: 480, margin: '0 auto' }}>
            {closing.body}
          </p>
        </motion.div>

      </div>

      <style>{`
        .problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 768px) { .problem-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
