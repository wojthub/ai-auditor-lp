'use client';

import { motion } from 'framer-motion';

const ACCENT = '#0b7983';

const audiences = [
  {
    title: 'Właściciel agencji SEO',
    description:
      'Nowa usługa, którą możesz oferować klientom — zanim zrobi to konkurencja. Raport wychodzi z narzędzia gotowy, bez angażowania teamu przy każdym zleceniu.',
    highlights: ['Nowa usługa bez dodatkowego etatu', 'Raport gotowy do wysłania bez edycji', 'Pakiet bez subskrypcji, na fakturę'],
    icon: (
      // briefcase
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <path d="M2 12h9m11 0h-4" />
      </svg>
    ),
  },
  {
    title: 'Specjalista / ekspert SEO',
    description:
      'Ręczna analiza 9 wymiarów i benchmark 10 konkurentów SERP to godziny pracy. Narzędzie dostarcza liczby i rekomendacje — ty interpretujesz i budujesz strategię.',
    highlights: ['CQS i AI Citability Score per wymiar', 'Benchmark top 10 SERP automatycznie', 'SERP + AI Overview w jednym raporcie'],
    icon: (
      // magnifying glass with lines
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 11h6M8 8h4" />
      </svg>
    ),
  },
  {
    title: 'Freelancer SEO',
    description:
      'Każda godzina się liczy. Audyt jako osobna usługa — bez subskrypcji, na fakturę. Obsługujesz więcej klientów bez zwiększania nakładu pracy.',
    highlights: ['Skalujesz się bez zatrudniania', 'Sprzedajesz audyty jako usługę', 'Pakiet bez limitu czasowego'],
    icon: (
      // laptop
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

export default function ForWho() {
  return (
    <section id="dla-kogo" style={{ background: '#f8fafb', padding: '58px 0' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Dla kogo
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em' }}>
            Narzędzie dla profesjonalistów SEO
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
                width: 44,
                height: 44,
                borderRadius: 8,
                background: 'rgba(11,121,131,0.06)',
                border: '1px solid rgba(11,121,131,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
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

              <p style={{
                fontSize: 14,
                color: '#666d80',
                lineHeight: 1.7,
                marginBottom: 20,
                flex: 1,
              }}>
                {a.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {a.highlights.map((h) => (
                  <span key={h} style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: ACCENT,
                    background: 'rgba(11,121,131,0.06)',
                    border: '1px solid rgba(11,121,131,0.18)',
                    borderRadius: 4,
                    padding: '4px 10px',
                  }}>
                    {h}
                  </span>
                ))}
              </div>
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
