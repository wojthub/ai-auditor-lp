'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    num: '01',
    statement: 'Ranking w Google nie oznacza widoczności w AI',
    body: 'ChatGPT, Perplexity i Google AI Overview dobierają treści według własnych kryteriów - niezależnie od pozycji w SERP, PageRank czy liczby linków.',
  },
  {
    num: '02',
    statement: 'Nie wiesz, co AI ocenia w Twojej treści',
    body: 'Modele językowe cytują artykuły według własnych kryteriów - struktura odpowiedzi, kompletność informacji, jakość danych. Klasyczne narzędzia SEO tego nie pokażą.',
  },
  {
    num: '03',
    statement: 'Rzetelna analiza ręczna kosztuje godziny',
    body: '10 wymiarów jakości, benchmark 10 konkurentów SERP, analiza AI Overview - zebranie tego wszystkiego manualnie to pełny dzień eksperckiej pracy.',
  },
];

const closing = {
  statement: 'Bez danych nie wiesz od czego zacząć',
  body: 'Optymalizacja bez diagnozy to strzelanie na ślepo. Nie wiesz, który wymiar obniża Twój Content Quality Score (CQS) i jaką zmianę wprowadzić w pierwszej kolejności.',
};

export default function Problem() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)',
      padding: '90px 0',
      clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)',
      margin: '-28px 0',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    }}>
      {/* Dekoracyjne cudzysłowy - jedna para */}
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
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56, textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            maxWidth: 560,
            margin: '0 auto',
          }}>
            Wysoka pozycja w Google nie oznacza cytowania przez AI
          </h2>
        </motion.div>

        {/* 3-column cards */}
        <div className="problem-grid">
          {cards.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              style={{
                background: '#ffffff',
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '32px 28px',
              }}
            >
              <span style={{
                display: 'block',
                fontSize: 48,
                fontWeight: 700,
                color: '#0b7983',
                letterSpacing: '-0.03em',
                marginBottom: 12,
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {p.num}
              </span>
              <h3 style={{
                fontSize: 17,
                fontWeight: 600,
                color: '#0d0d12',
                letterSpacing: '-0.02em',
                lineHeight: 1.35,
                marginBottom: 12,
              }}>
                {p.statement}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.7, margin: 0 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing - zamknięcie sekcji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.27 }}
          style={{ marginTop: 56, textAlign: 'center' }}
        >
          <h3 style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            maxWidth: 560,
            margin: '0 auto 14px',
          }}>
            {closing.statement}
          </h3>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, maxWidth: 480, margin: '0 auto' }}>
            {closing.body}
          </p>
        </motion.div>

      </div>

      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .problem-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
