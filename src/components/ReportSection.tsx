'use client';

import { motion } from 'framer-motion';

const items = [
  {
    number: '01',
    label: 'Raport PDF',
    desc: 'w dwóch wersjach - dla managera lub klienta.',
    iconBg: 'rgba(224,122,74,0.13)',
    iconColor: '#e07a4a',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#e07a4a" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: '02',
    label: 'Audyt Schema',
    desc: 'lista brakujących tagów strukturalnych, które ułatwiają pracę AI.',
    iconBg: 'rgba(11,121,131,0.12)',
    iconColor: '#0b7983',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#0b7983" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    number: '03',
    label: 'Historia rewizji',
    desc: 'śledzisz postępy po wprowadzeniu poprawek.',
    iconBg: 'rgba(196,122,42,0.12)',
    iconColor: '#c47a2a',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#c47a2a" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ReportSection() {
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
            Dane gotowe do wdrożenia
          </h2>
          <p style={{ fontSize: 16, color: '#666d80', lineHeight: 1.7, margin: 0 }}>
            Jako efekt audytu otrzymujesz przejrzysty plik PDF oraz dokument Markdown, które możesz natychmiast przekazać zespołowi, managerowi lub klientowi.
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
