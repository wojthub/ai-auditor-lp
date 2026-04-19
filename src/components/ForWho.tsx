'use client';

import { motion } from 'framer-motion';


const audiences = [
  {
    title: 'Specjalista SEO',
    highlights: ['10 wymiarów cytowania z osobnym wynikiem 0-10', 'Benchmark top 10 SERP - widzisz lukę do lidera', 'Przed i Po z szacowanym wpływem na CQS'],
    icon: (
      // magnifying glass with lines
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 11h6M8 8h4" />
      </svg>
    ),
  },
  {
    title: 'Marketer / Content Manager',
    highlights: ['Zrozumiałe wyniki bez wiedzy technicznej', 'Gotowe rekomendacje co zmienić w treści', 'Raport w PDF do wysłania zespołowi'],
    icon: (
      // megaphone / bullhorn
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
        <path d="M22 8c0-1.1-.2-2.15-.56-3.12" />
      </svg>
    ),
  },
  {
    title: 'Agencja / Freelancer',
    highlights: ['Nowa usługa w ofercie - bez dodatkowego etatu', 'Raport gotowy do wysłania klientowi', 'Pakiet bez subskrypcji, na fakturę'],
    icon: (
      // briefcase
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <path d="M2 12h9m11 0h-4" />
      </svg>
    ),
  },
];

export default function ForWho() {
  return (
    <section id="dla-kogo" style={{
      background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)',
      padding: '90px 0',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    }}>
      {/* Dekoracyjne cudzysłowy */}
      <span aria-hidden style={{
        position: 'absolute', top: 36, left: 52,
        fontSize: 200, lineHeight: 1, fontWeight: 400,
        color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif',
        userSelect: 'none', pointerEvents: 'none',
      }}>{'\u201C'}</span>
      <span aria-hidden style={{
        position: 'absolute', bottom: 36, right: 52,
        fontSize: 200, lineHeight: 1, fontWeight: 400,
        color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif',
        userSelect: 'none', pointerEvents: 'none',
      }}>{'\u201D'}</span>

      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Dla kogo
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.025em' }}>
            Nie musisz być ekspertem, żeby audytować jak ekspert
          </h2>
        </motion.div>

        {/* 3-column cards */}
        <div className="forwho-grid">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(11,121,131,0.1)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: '#ffffff',
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Icon container */}
              <div style={{
                width: 88,
                height: 88,
                borderRadius: 16,
                background: '#0b7983',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                color: '#ffffff',
              }}>
                {a.icon}
              </div>

              <h3 style={{
                fontSize: 17,
                fontWeight: 600,
                color: '#0d0d12',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: 12,
              }}>
                {a.title}
              </h3>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {a.highlights.map((h) => (
                  <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#36394a', lineHeight: 1.4 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0b7983', flexShrink: 0 }} />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .forwho-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .forwho-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
