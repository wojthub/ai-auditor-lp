'use client';

import { motion } from 'framer-motion';

const items = [
  {
    number: '01',
    label: 'PDF Report',
    desc: 'in two versions - for the manager or the client.',
    iconColor: '#e07a4a',
  },
  {
    number: '02',
    label: 'Schema Audit',
    desc: 'list of missing structural tags that make AI parsing easier.',
    iconColor: '#0b7983',
  },
  {
    number: '03',
    label: 'Revision History',
    desc: 'track your progress after applying corrections.',
    iconColor: '#c47a2a',
  },
];

export default function ReportSectionEN() {
  return (
    <section style={{ background: '#ffffff', padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56 }}
        >
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 600,
            color: '#0d0d12',
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            marginBottom: 12,
          }}>
            Data ready to implement
          </h2>
          <p style={{ fontSize: 16, color: '#666d80', lineHeight: 1.7, margin: 0 }}>
            As an outcome of the audit you receive a clear PDF file and a Markdown document you can hand straight to your team, manager or client.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              {i > 0 && <div style={{ height: 1, background: '#eceff3', margin: '0' }} />}
              <div className="report-row">
                {/* Number */}
                <div style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  color: item.iconColor,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  flexShrink: 0,
                }}>
                  {item.number}
                </div>

                {/* Label */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    fontWeight: 700,
                    color: '#0d0d12',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}>
                    {item.label}
                  </span>
                </div>

                {/* Description */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .report-row {
          display: grid;
          grid-template-columns: 100px 1fr 1fr;
          gap: 32px;
          align-items: center;
          padding: 36px 0;
        }
        @media (max-width: 768px) {
          .report-row {
            grid-template-columns: 72px 1fr;
            gap: 20px;
          }
          .report-row > div:last-child {
            grid-column: 2;
          }
        }
        @media (max-width: 480px) {
          .report-row { grid-template-columns: 1fr; }
          .report-row > div:last-child { grid-column: 1; }
        }
      `}</style>
    </section>
  );
}
