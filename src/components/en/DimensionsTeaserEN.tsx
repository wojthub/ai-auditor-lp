'use client';

import { motion } from 'framer-motion';
import RadarIllustrationEN from './RadarIllustrationEN';

function BenchmarkBar({ label, value, max, color, bold }: {
  label: string; value: number; max: number; color: string; bold?: boolean;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: bold ? '#0d0d12' : '#666d80', fontWeight: bold ? 700 : 400 }}>{label}</span>
        <span style={{ fontSize: 13, color: bold ? '#0d0d12' : '#a4acb9', fontWeight: bold ? 700 : 400 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: '#eceff3', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

const scoreCards = [
  {
    scale: 'SCALE 0 – 10',
    title: 'AI Citability Score',
    desc: 'The probability that AI engines will cite your text in a response to the user.',
    score: 4.9,
    max: 10,
    color: '#B91C1C',
    rows: [
      { label: 'Low threshold', value: 2.1, bold: false },
      { label: 'Your score', value: 4.9, bold: true },
      { label: 'SERP leader', value: 8.3, bold: false },
    ],
  },
  {
    scale: 'SCALE 0 – 100',
    title: 'CQS · Content Quality Score',
    desc: 'Sum of points across 10 quality dimensions + E-E-A-T benchmarked against the SERP Top 10 competition.',
    score: 78,
    max: 100,
    color: '#CA8A04',
    rows: [
      { label: 'SERP average', value: 42, bold: false },
      { label: 'Your score', value: 78, bold: true },
      { label: 'SERP leader', value: 91, bold: false },
    ],
  },
];

export default function DimensionsTeaserEN() {
  return (
    <section style={{ background: '#f8fafb', padding: '90px 0' }}>
      <div style={{ maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Section label + h2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 40 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dimensions</span>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            color: '#0d0d12',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            margin: 0,
          }}>
            How does AI evaluate your content?
          </h2>
        </motion.div>

        {/* Row 1: paragraph + radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="dims-top-grid"
          style={{ marginBottom: 20 }}
        >
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.75, margin: 0 }}>
            CitationOne analyzes content across 10 quality dimensions - the same parameters language models use when selecting answer sources. Each dimension is measured separately and compared with direct competitors from the SERP Top 10.
          </p>

          <div style={{
            background: '#ffffff',
            border: '1px solid #dfe1e7',
            borderRadius: 14,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <RadarIllustrationEN maxWidth={320} />
          </div>
        </motion.div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 56 }}
        >
          <a href="/dimensions" style={{
            fontSize: 14,
            color: '#0b7983',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}>
            See the full breakdown of all content quality dimensions →
          </a>
        </motion.div>

        {/* Copy - indicators intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <h3 style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
            fontWeight: 700,
            color: '#0d0d12',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            marginBottom: 12,
          }}>
            Objective content evaluation expressed in numbers
          </h3>
          <p style={{ fontSize: 16, color: '#36394a', lineHeight: 1.72, margin: '0 0 14px' }}>
            The analysis translates into two precise indicators:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Content Quality Score', rest: '- aggregates all dimensions into a single number.' },
              { label: 'AI Citability Score', rest: '- measures the probability that ChatGPT, Perplexity and Google AI Overview will cite your content as a source.' },
            ].map(item => (
              <li key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 16, color: '#36394a', lineHeight: 1.65 }}>
                <span style={{ width: 16, height: 2, background: '#0b7983', flexShrink: 0, marginTop: 11, borderRadius: 1 }} />
                <span><strong style={{ color: '#0d0d12' }}>{item.label}</strong> {item.rest}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Score cards */}
        <div className="dims-cards-grid">
          {scoreCards.map((card, ci) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: ci * 0.1 }}
              style={{
                background: '#ffffff',
                border: '1px solid #dfe1e7',
                borderRadius: 14,
                padding: '24px 26px 26px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: 11, fontWeight: 500,
                  color: '#818898',
                  border: '1px solid #dfe1e7',
                  borderRadius: 100,
                  padding: '3px 10px',
                  letterSpacing: '0.04em',
                }}>
                  {card.scale}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 700, color: card.color, lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {card.score}
                  </span>
                  <span style={{ fontSize: 13, color: '#a4acb9', fontWeight: 500 }}>/ {card.max}</span>
                </div>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 6px' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: 13, color: '#666d80', lineHeight: 1.55, margin: '0 0 18px' }}>
                {card.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {card.rows.map(row => (
                  <BenchmarkBar
                    key={row.label}
                    label={row.label}
                    value={row.value}
                    max={card.max}
                    color={row.bold ? card.color : '#dde1e8'}
                    bold={row.bold}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .dims-top-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;
        }
        .dims-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 860px) {
          .dims-top-grid { grid-template-columns: 1fr; gap: 24px; }
          .dims-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
