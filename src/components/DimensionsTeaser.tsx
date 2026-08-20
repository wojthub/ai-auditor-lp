'use client';

import { motion } from 'framer-motion';
import RadarIllustration from './RadarIllustration';



export default function DimensionsTeaser() {
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
            <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Wymiary</span>
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
            Jak AI ocenia Twój content?
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
            CitationOne analizuje treść przez pryzmat 10 wymiarów jakości - tych samych parametrów, które modele językowe biorą pod uwagę wybierając źródła odpowiedzi. Każdy wymiar jest mierzony osobno i porównywany z bezpośrednią konkurencją z Top 10 SERP.
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
            <RadarIllustration maxWidth={320} />
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
          <a href="/pl/wymiary" style={{
            fontSize: 14,
            color: '#0b7983',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}>
            Zobacz pełne omówienie wszystkich wymiarów jakości treści →
          </a>
        </motion.div>

      </div>

      <style>{`
        .dims-top-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .dims-top-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </section>
  );
}
