'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    icon: (
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    statement: 'Ranking w Google to dziś dopiero połowa sukcesu',
    body: 'ChatGPT, Perplexity i Google AI Overview wybierają źródła według własnych kryteriów – często zupełnie niezależnie od tego, jak wysoko rankuje Twoja podstrona czy ile linków do niej prowadzi.',
  },
  {
    icon: (
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    statement: 'Klasyczne narzędzia SEO nie widzą tego, co ocenia AI',
    body: 'Klasyczne narzędzia SEO nie powiedzą Ci, czy Twoja podstrona jest czytelna dla modeli językowych. AI ocenia strukturę odpowiedzi, gęstość informacji i konkretne dane, a nie tylko nasycenie słowami kluczowymi. Jeśli nie mierzysz tych parametrów, działasz po omacku.',
  },
  {
    icon: (
      <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    statement: 'Ręczna analiza to cały dzień żmudnej pracy',
    body: 'Ręczne zestawienie parametrów Twojej podstrony z TOP 10 konkurencji to dla eksperta cały dzień roboty. CitationOne automatyzuje ten proces, dostarczając precyzyjny benchmark i gotowe rekomendacje w czasie, gdy Ty parzysz kawę.',
  },
];

const closing = {
  statement: 'Działanie bez diagnozy to palenie budżetu',
  body: 'CitationOne precyzyjnie wskazuje, który wymiar obniża Twój Content Quality Score (CQS). Dowiedz się dokładnie, jakie zmiany na podstronie wprowadzić, by zacząć być widocznym dla algorytmów AI Search.',
};

export default function Problem() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)',
      padding: '90px 0',
      position: 'relative',
      overflow: 'hidden',
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

        {/* Nagłówek */}
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
            maxWidth: 620,
            margin: '0 auto',
          }}>
            Wysoka pozycja w Google nie oznacza cytowania przez AI
          </h2>
        </motion.div>

        {/* 3 karty */}
        <div className="problem-grid">
          {cards.map((p, i) => (
            <motion.div
              key={i}
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
                {p.icon}
              </div>
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

        {/* Zamknięcie sekcji — biały tekst poniżej kart na turkusowym tle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: 56,
            textAlign: 'center',
            maxWidth: 680,
            margin: '56px auto 0',
          }}
        >
          <h3 style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1.3,
            marginBottom: 14,
          }}>
            {closing.statement}
          </h3>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.72,
            margin: 0,
          }}>
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
