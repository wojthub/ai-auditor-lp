'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    num: '01',
    statement: 'Ranking in Google does not mean visibility in AI',
    body: 'ChatGPT, Perplexity and Google AI Overview select content based on their own criteria - independent of SERP position, PageRank or backlink count.',
  },
  {
    num: '02',
    statement: "You don't know what AI evaluates in your content",
    body: 'Language models cite articles based on their own criteria - answer structure, information completeness, data quality. Traditional SEO tools cannot show this.',
  },
  {
    num: '03',
    statement: 'Manual analysis takes hours of expert work',
    body: '10 quality dimensions, benchmark of 10 SERP competitors, AI Overview analysis - gathering all this manually is a full day of expert work.',
  },
];

const closing = {
  statement: "Without data you don't know where to start",
  body: "Optimization without diagnosis is shooting in the dark. You don't know which dimension is lowering your Content Quality Score (CQS) or what change to make first.",
};

export default function ProblemEN() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)',
      padding: '90px 0',
      clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)',
      margin: '-28px 0',
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
              <span style={{ display: 'block', fontSize: 48, fontWeight: 700, color: '#0b7983', letterSpacing: '-0.03em', marginBottom: 12, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {p.num}
              </span>
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
