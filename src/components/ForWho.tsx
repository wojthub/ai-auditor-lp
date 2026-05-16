'use client';

import { motion } from 'framer-motion';

const audiences = [
  {
    tag: 'Specjalista SEO',
    title: 'Specjalista SEO',
    color: '#e07a4a',
    colorBg: 'rgba(224,122,74,0.11)',
    blobFill: '#e07a4a',
    blobPath: 'M 45 12 C 95 -15 185 10 195 70 C 205 130 155 185 90 185 C 25 185 -15 130 5 70 C 25 10 -5 39 45 12 Z',
    highlights: [
      'Dostęp do twardych danych analitycznych.',
      'Precyzyjny benchmark z top 10 wynikami SERP.',
      'Konkretny wskaźnik CQS ułatwiający planowanie strategii.',
    ],
  },
  {
    tag: 'Marketer · Content Manager',
    title: 'Marketer i Content Manager',
    color: '#0b7983',
    colorBg: 'rgba(11,121,131,0.10)',
    blobFill: '#0b7983',
    blobPath: 'M 40 18 C 92 -10 188 15 195 78 C 202 141 148 190 85 188 C 22 186 -12 128 8 68 C 28 8 -12 46 40 18 Z',
    highlights: [
      'Czytelne raporty PDF, które możesz natychmiast przekazać redaktorom i copywriterom.',
      'Raporty w formacie Markdown gotowe do przekazania redaktorom i copywriterom.',
      'Jasny plan działania i pewność, że budżet na content przynosi zwrot.',
    ],
  },
  {
    tag: 'Agencja · Freelancer',
    title: 'Agencja i Freelancer',
    color: '#c47a2a',
    colorBg: 'rgba(196,122,42,0.11)',
    blobFill: '#c47a2a',
    blobPath: 'M 50 10 C 100 -18 190 8 198 72 C 206 136 152 188 88 186 C 24 184 -14 126 6 66 C 26 6 0 38 50 10 Z',
    highlights: [
      'Nowa usługa w Twoim portfolio, która wyróżni Cię na tle konkurencji.',
      'Gotowy, profesjonalny raport dla klienta generowany jednym kliknięciem.',
      'Elastyczność budżetowa - wykupujesz audyty pojedynczo. Pierwsze 3 audyty są darmowe.',
    ],
  },
];

export default function ForWho() {
  return (
    <section id="dla-kogo" style={{ background: '#ffffff', padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dla kogo</span>
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
            Widoczność w AI Search<br />w zasięgu każdego zespołu
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
            Niezależnie czy planujesz strategię, piszesz treści, czy obsługujesz klientów - CitationOne daje twardy benchmark, na którym możesz działać.
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
