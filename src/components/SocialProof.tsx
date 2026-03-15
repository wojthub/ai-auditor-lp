'use client';

import { motion } from 'framer-motion';

const ACCENT = '#0b7983';

/* ─── Stats ─────────────────────────────────────────── */
const STATS = [
  { value: '9', label: 'wymiarów AI Search\nw jednym raporcie' },
  { value: '< 15', label: 'minut od URL\ndo gotowego raportu' },
  { value: '10', label: 'artykułów SERP\nw benchmarku' },
  { value: '2', label: 'formaty eksportu\nPDF i Markdown' },
];

/* ─── Testimonials ───────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: 'Dodaliśmy audyty AI Search do oferty bez zatrudniania nowego analityka. Raport wychodzi gotowy — wysyłamy klientowi bez edycji. Czas realizacji zlecenia z 6 godzin do 20 minut.',
    name: 'Marcin K.',
    role: 'Właściciel agencji SEO · Warszawa',
    initials: 'MK',
  },
  {
    quote: 'Dostawałam to samo co robiłam ręcznie przez kilka godzin — w 15 minut. CQS, benchmark, rekomendacje Before/After. Teraz skupiam się na strategii, nie na zbieraniu liczb.',
    name: 'Anna W.',
    role: 'Senior SEO Specialist · agencja e-commerce',
    initials: 'AW',
  },
  {
    quote: 'Sprzedaję audyty AI Search jako osobną usługę — to konkretna pozycja na fakturze, którą klienci rozumieją i chcą kupować. Bez subskrypcji, pakiet rozliczyłem w 3 tygodnie.',
    name: 'Tomasz R.',
    role: 'Freelancer SEO · 12 lat w branży',
    initials: 'TR',
  },
];

function StarRow() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={ACCENT}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section style={{ background: '#ffffff', padding: '58px 0' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: '#dfe1e7',
            border: '1px solid #dfe1e7',
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 72,
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: '#f8fafb',
              padding: '28px 24px',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: ACCENT,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {s.value}
              </p>
              <p style={{
                fontSize: 12,
                color: '#818898',
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Opinie
          </p>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 600,
            color: '#0d0d12',
            letterSpacing: '-0.025em',
          }}>
            Co mówią specjaliści SEO
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: '#f8fafb',
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '28px 28px 24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <StarRow />
              <p style={{
                fontSize: 14.5,
                color: '#36394a',
                lineHeight: 1.7,
                flex: 1,
                marginBottom: 24,
                fontStyle: 'italic',
              }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(11,121,131,0.1)',
                  border: '1.5px solid rgba(11,121,131,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT }}>{t.initials}</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: 11.5, color: '#818898', margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
