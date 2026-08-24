'use client';

import { motion } from 'framer-motion';
import type { ToolData, ToolStrings } from '@/data/tool-types';
import HeroBackdrop from './HeroBackdrop';

const ACCENT = '#0b7983';

export interface HubStrings {
  label: string;
  h1: string;
  lead: string;
  cardCta: string;
  /** Karta odsylajaca do masowego audytu, ktory ma sekcje na HP, a nie wlasna podstrone. */
  bulkTitle: string;
  bulkDesc: string;
  bulkHref: string;
  bulkCta: string;
}

export default function ToolsHub({ tools, t, s }: {
  tools: ToolData[];
  t: ToolStrings;
  s: HubStrings;
}) {
  return (
    <div>
      <section style={{ background: '#ffffff', padding: '56px 0 48px', borderBottom: '1px solid #eceff3', position: 'relative', overflow: 'hidden' }}>
        <HeroBackdrop />
        <div style={{ maxWidth: 900, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</span>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
            </div>
            <h1 style={{
              fontSize: 'clamp(2.1rem, 4.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em',
              lineHeight: 1.15, margin: '0 0 20px',
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'inline-block',
            }}>
              {s.h1}
            </h1>
            <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, maxWidth: 660, margin: '0 auto' }}>{s.lead}</p>
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#f8fafb', padding: '64px 0 88px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="tools-hub-grid">
            {tools.map((tool, i) => (
              <motion.a
                key={tool.slug}
                href={`${t.basePath}/${tool.slug}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{
                  background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 12,
                  padding: '24px 26px', display: 'flex', flexDirection: 'column', textDecoration: 'none',
                }}
              >
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                  {tool.name}
                </h2>
                <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 14px' }}>{tool.lead}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {tool.chips.slice(0, 2).map((chip) => (
                    <span key={chip} style={{
                      fontSize: 11.5, color: '#666d80', background: '#f8fafb',
                      border: '1px solid #dfe1e7', borderRadius: 100, padding: '4px 10px',
                    }}>
                      {chip}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginTop: 'auto' }}>{s.cardCta}</span>
              </motion.a>
            ))}
          </div>

          <motion.a
            href={s.bulkHref}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              marginTop: 16, background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 12,
              padding: '24px 26px', display: 'block', textDecoration: 'none',
            }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
              {s.bulkTitle}
            </h2>
            <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 12px' }}>{s.bulkDesc}</p>
            <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}>{s.bulkCta}</span>
          </motion.a>
        </div>
      </section>

      <style>{`
        .tools-hub-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 760px) {
          .tools-hub-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
