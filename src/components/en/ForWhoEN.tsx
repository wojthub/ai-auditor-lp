'use client';

import { motion } from 'framer-motion';

const audiences = [
  {
    tag: 'SEO Specialist',
    title: 'SEO Specialist',
    color: '#e07a4a',
    colorBg: 'rgba(224,122,74,0.11)',
    highlights: [
      'Access to hard analytical data.',
      'Precise benchmark against the top 10 SERP results.',
      'A concrete CQS metric that simplifies strategy planning.',
    ],
  },
  {
    tag: 'Marketer · Content Manager',
    title: 'Marketer & Content Manager',
    color: '#0b7983',
    colorBg: 'rgba(11,121,131,0.10)',
    highlights: [
      'Clear PDF reports you can hand straight to editors and copywriters.',
      'Markdown reports ready to share with editors and copywriters.',
      'A clear action plan and confidence that your content budget delivers ROI.',
    ],
  },
  {
    tag: 'Agency · Freelancer',
    title: 'Agency & Freelancer',
    color: '#c47a2a',
    colorBg: 'rgba(196,122,42,0.11)',
    highlights: [
      'A new service in your portfolio that sets you apart from competitors.',
      'A ready, professional client-facing report generated with one click.',
      'Budget flexibility - buy audits one at a time. First 3 audits are free.',
    ],
  },
];

export default function ForWhoEN() {
  return (
    <section id="who-is-it-for" style={{ background: '#ffffff', padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Who is it for</span>
          <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
        </div>

        {/* 2-col header */}
        <div className="forwho-header-grid" style={{ marginBottom: 56 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 700,
              color: '#0d0d12',
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            AI Search visibility<br />for every team
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontSize: 17,
              color: '#36394a',
              lineHeight: 1.72,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Whether you plan strategy, write content or serve clients - CitationOne gives you a hard benchmark to act on.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="forwho-grid">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: '#ffffff',
                border: '1px solid #dfe1e7',
                borderRadius: 12,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Audience tag */}
              <div style={{ marginBottom: 24, position: 'relative', zIndex: 1 }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: 11, fontWeight: 700,
                  color: a.color,
                  background: a.colorBg,
                  border: `1px solid ${a.color}33`,
                  borderRadius: 100,
                  padding: '4px 14px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  {a.tag}
                </span>
              </div>

              <h3 style={{
                fontSize: 20, fontWeight: 700,
                color: '#0d0d12',
                letterSpacing: '-0.025em', lineHeight: 1.25,
                marginBottom: 24,
                position: 'relative', zIndex: 1,
              }}>
                {a.title}
              </h3>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1 }}>
                {a.highlights.map((h) => (
                  <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: '#36394a', lineHeight: 1.55 }}>
                    <span style={{ width: 16, height: 2, background: a.color, flexShrink: 0, marginTop: 9, borderRadius: 1 }} />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .forwho-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .forwho-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .forwho-grid { grid-template-columns: 1fr 1fr; }
          .forwho-header-grid { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 600px) {
          .forwho-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
