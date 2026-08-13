'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';
const DOCS_URL = `${APP_URL}/api-docs`;
const DOCS_MD_URL = `${APP_URL}/api-docs.md`;
const ACCENT = '#0b7983';

const FEATURES = [
  {
    title: 'Klucz API zamiast logowania',
    body: 'Nagłówek Authorization: Bearer. Klucz tworzysz i cofasz w panelu, pokazywany jest raz - w bazie trzymamy wyłącznie jego hash.',
  },
  {
    title: 'Model asynchroniczny',
    body: 'POST zwraca 202 z identyfikatorem zadania i nie blokuje połączenia. Audyt liczy się w tle, wynik odbierasz przez GET.',
  },
  {
    title: 'Pełny wynik jako JSON',
    body: 'CQS, AI Citability, 10 wymiarów z problemami, E-E-A-T, rekomendacje Przed i Po, benchmark SERP i pokrycie Fan-Out.',
  },
  {
    title: 'Zlecenia masowe',
    body: 'Do 50 adresów jednym żądaniem. Kolejka po stronie serwera, jedno zbiorcze zapytanie o dane fraz, status i anulowanie paczki.',
  },
  {
    title: 'Publiczny link do raportu',
    body: 'Opcjonalnie audyt dostaje adres read-only, który wyślesz klientowi bez zakładania mu konta. Z terminem ważności albo bezterminowo.',
  },
  {
    title: 'Rozliczenie w kredytach',
    body: 'Jeden audyt z API kosztuje 1 kredyt - dokładnie tyle samo, co audyt zlecony w panelu. Bez osobnego abonamentu na API.',
  },
];

const CODE_SAMPLE = `# 1. Zleć audyt
curl -X POST https://app.citationone.com/api/v1/audits \\
  -H "Authorization: Bearer co_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "url": "https://example.com/artykul", "keyword": "fraza kluczowa" }'

# 202 { "id": "job_V1StGXR8", "status": "queued" }

# 2. Odbierz wynik
curl https://app.citationone.com/api/v1/audits/job_V1StGXR8 \\
  -H "Authorization: Bearer co_live_..."`;

export default function ApiContent() {
  return (
    <section style={{ background: '#ffffff', padding: '44px 0 96px' }}>
      <div style={{ maxWidth: 840, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#818898',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            display: 'block', marginBottom: 14,
          }}>
            Dla programistów i agencji
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 22,
            background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>
            API CitationOne
          </h1>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, maxWidth: 560, margin: '0 auto' }}>
            Uruchamiaj audyty programatycznie i pobieraj wynik jako JSON. Ten sam silnik,
            który liczy raporty w panelu - tylko wpięty w Twój workflow, CMS albo dashboard klienta.
          </p>
        </motion.div>

        {/* CTA - docs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="api-cta-row"
        >
          <motion.a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '15px 32px',
              minHeight: 44,
              borderRadius: 8,
              background: ACCENT,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
            }}
          >
            Dokumentacja API
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>

          <motion.a
            href={DOCS_MD_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '15px 32px',
              minHeight: 44,
              borderRadius: 8,
              background: '#ffffff',
              border: '1px solid #dfe1e7',
              color: '#0d0d12',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            Wersja Markdown dla agentów
          </motion.a>
        </motion.div>

        {/* Code sample */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 48,
            border: '1px solid #dfe1e7',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#0d1117',
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 18px', borderBottom: '1px solid #1f2630',
          }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a4250' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a4250' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a4250' }} />
            <span style={{ fontSize: 12, color: '#7d8695', marginLeft: 6, letterSpacing: '0.02em' }}>
              REST · JSON · api/v1
            </span>
          </div>
          <pre style={{
            margin: 0,
            padding: '20px 18px',
            overflowX: 'auto',
            fontSize: 12.5,
            lineHeight: 1.75,
            color: '#c9d3e0',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          }}>
            <code>{CODE_SAMPLE}</code>
          </pre>
        </motion.div>

        {/* Features grid */}
        <div className="api-features">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '22px 20px',
                background: '#ffffff',
              }}
            >
              <h3 style={{
                fontSize: 15.5, fontWeight: 700, color: '#0d0d12',
                letterSpacing: '-0.015em', marginBottom: 8,
              }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65, margin: 0 }}>
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Agents / markdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 48,
            border: `1px solid rgba(11,121,131,0.28)`,
            borderRadius: 12,
            padding: '28px 26px',
            background: 'rgba(11,121,131,0.04)',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 12,
          }}>
            Dokumentacja czytelna dla agentów AI
          </h2>
          <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.7, marginBottom: 16 }}>
            Ta sama dokumentacja jest wystawiona jako czysty Markdown pod adresem{' '}
            <a href={DOCS_MD_URL} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, fontWeight: 600 }}>
              /api-docs.md
            </a>
            . Wskaż ten adres asystentowi (Claude, ChatGPT, Cursor), a dostanie kontrakt API bez
            zdzierania layoutu ze strony HTML - z zachowanymi tabelami i blokami kodu. Obie wersje
            powstają z jednego źródła, więc nie da się ich rozjechać.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '9px 14px', borderRadius: 7,
            background: '#ffffff', border: '1px solid #dfe1e7',
            fontSize: 13,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            color: '#36394a',
            maxWidth: '100%',
            overflowX: 'auto',
          }}>
            {DOCS_MD_URL}
          </div>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginTop: 52 }}
        >
          <p style={{ fontSize: 15, color: '#666d80', lineHeight: 1.7, marginBottom: 20 }}>
            Klucze API tworzysz w panelu, w zakładce dla programistów.
            Pierwsze 3 audyty są darmowe - również przez API.
          </p>
          <motion.a
            href={`${APP_URL}/login?lang=pl`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '15px 36px',
              minHeight: 44,
              borderRadius: 8,
              background: ACCENT,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
            }}
          >
            Utwórz klucz API
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>

      </div>

      <style>{`
        .api-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .api-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 48px;
        }
        @media (max-width: 768px) {
          .api-features { grid-template-columns: 1fr; }
        }
        @media (max-width: 580px) {
          .api-cta-row > a { width: 100%; }
        }
      `}</style>
    </section>
  );
}
