'use client';

import { motion } from 'framer-motion';

const ACCENT = '#0b7983';

/* ─── helpers ─────────────────────────────────────── */
function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
      {children}
    </p>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  };
}

/* ─── 1. 9 wymiarów ───────────────────────────────── */
const DIMS = [
  { name: 'CSI Alignment', score: 8.1, desc: 'Dopasowanie do intencji wyszukiwania' },
  { name: 'Info Density', score: 7.4, desc: 'Gęstość i kompletność informacji' },
  { name: 'BLUF', score: 9.0, desc: 'Najważniejsza odpowiedź na początku' },
  { name: 'EAV', score: 6.8, desc: 'Encje, atrybuty i wartości' },
  { name: 'Chunk Optim.', score: 7.9, desc: 'Jakość podziału na fragmenty' },
  { name: 'Cost of Retrieval', score: 3.8, desc: 'Koszt pobrania informacji przez AI' },
  { name: 'TF-IDF', score: 7.2, desc: 'Słowa kluczowe i kontekst semantyczny' },
  { name: 'Fan-Out / AIO', score: 8.3, desc: 'Pokrycie sub-zapytań i AI Overview' },
  { name: 'E-E-A-T', score: 6.5, desc: 'Doświadczenie, ekspertyza, autorytet' },
];

function DimensionsVisual() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
      {DIMS.map((d) => {
        const pct = (d.score / 10) * 100;
        const color = d.score >= 7 ? '#16A34A' : d.score >= 5 ? '#CA8A04' : '#DC2626';
        return (
          <motion.div key={d.name} {...fadeUp(0.05)}
            style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 8, padding: '14px 14px 12px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0d0d12' }}>{d.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color }}>{d.score}</span>
            </div>
            <div style={{ height: 3, background: '#eceff3', borderRadius: 2, marginBottom: 8, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                style={{ height: '100%', background: color, borderRadius: 2 }}
              />
            </div>
            <p style={{ fontSize: 11, color: '#a4acb9', margin: 0, lineHeight: 1.4 }}>{d.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── 2. Benchmark SERP ───────────────────────────── */
const SERP_DATA = [
  { label: 'Twój artykuł', score: 72, highlight: true },
  { label: 'Konkurent #1', score: 88 },
  { label: 'Konkurent #2', score: 81 },
  { label: 'Konkurent #3', score: 76 },
  { label: 'Konkurent #4', score: 65 },
  { label: 'Konkurent #5', score: 58 },
];

function BenchmarkVisual() {
  const max = 100;
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '24px 24px 20px' }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>
        Content Quality Score - porównanie SERP
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SERP_DATA.map((row, i) => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontSize: 12, color: row.highlight ? ACCENT : '#818898',
              fontWeight: row.highlight ? 700 : 400, width: 110, flexShrink: 0,
            }}>
              {row.label}
            </span>
            <div style={{ flex: 1, height: 8, background: '#f0f9fa', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(row.score / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                style={{ height: '100%', background: row.highlight ? ACCENT : '#dfe1e7', borderRadius: 4 }}
              />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: row.highlight ? ACCENT : '#818898', width: 28, textAlign: 'right' }}>
              {row.score}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, padding: '10px 14px', background: 'rgba(11,121,131,0.06)', borderRadius: 6, border: '1px solid rgba(11,121,131,0.15)' }}>
        <p style={{ fontSize: 12, color: ACCENT, margin: 0, fontWeight: 500 }}>
          ↑ 16 pkt do pozycji lidera - raport wskazuje dokładnie co zmienić
        </p>
      </div>
    </div>
  );
}

/* ─── 3. Before / After ───────────────────────────── */
function BeforeAfterVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Before */}
        <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 8, padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Przed</span>
          </div>
          <p style={{ fontSize: 12.5, color: '#9ca3af', lineHeight: 1.6, margin: 0, textDecoration: 'line-through' }}>
            Optymalizacja SEO jest ważna dla każdej strony internetowej, ponieważ pozwala zwiększyć widoczność w wyszukiwarkach.
          </p>
        </div>
        {/* After */}
        <div style={{ background: 'rgba(11,121,131,0.04)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 8, padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Po</span>
          </div>
          <p style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: ACCENT }}>Audyt AI Search</strong> mierzy 9 wymiarów cytowania przez modele językowe - każdy z szacowanym wpływem na CQS i konkretną poprawką.
          </p>
        </div>
      </div>
      {/* Priority badges */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[
          { label: 'OK', bg: 'rgba(22,163,74,0.1)', color: '#16A34A' },
          { label: 'UWAGA', bg: 'rgba(202,138,4,0.1)', color: '#CA8A04' },
          { label: 'KRYTYCZNY', bg: 'rgba(220,38,38,0.1)', color: '#DC2626' },
        ].map(p => (
          <span key={p.label} style={{ fontSize: 10, fontWeight: 700, color: p.color, background: p.bg, border: `1px solid ${p.color}30`, borderRadius: 4, padding: '4px 10px', letterSpacing: '0.06em' }}>
            {p.label}
          </span>
        ))}
        <span style={{ fontSize: 11.5, color: '#a4acb9', alignSelf: 'center' }}>- każda rekomendacja ma priorytet i estymowany wpływ na CQS</span>
      </div>
    </div>
  );
}

/* ─── 4. AI Overview ──────────────────────────────── */
const AIO_SUBQUERIES = [
  { q: 'co to jest audyt AI Search', covered: true },
  { q: 'jak działa AI Overview Google', covered: true },
  { q: 'jakie metryki mierzy audyt AI', covered: false },
  { q: 'różnica SEO vs AI Search', covered: false },
  { q: 'jak poprawić citability score', covered: true },
];

function AIOverviewVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: 4, background: 'linear-gradient(135deg, #4285f4, #34a853)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>G</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#0d0d12' }}>AI Overview - dekompozycja syntezy</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, padding: '2px 7px' }}>3/5</span>
          <span style={{ fontSize: 10, color: '#a4acb9' }}>pokrytych</span>
        </div>
      </div>
      {/* Sub-queries */}
      <div style={{ padding: '8px 0' }}>
        {AIO_SUBQUERIES.map((sq) => (
          <div key={sq.q} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px' }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
              background: sq.covered ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.07)',
              border: `1px solid ${sq.covered ? 'rgba(22,163,74,0.25)' : 'rgba(220,38,38,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {sq.covered
                ? <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round"/></svg>
              }
            </div>
            <span style={{ fontSize: 12, color: sq.covered ? '#36394a' : '#a4acb9', lineHeight: 1.4 }}>{sq.q}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600,
              color: sq.covered ? '#16A34A' : '#DC2626',
              background: sq.covered ? 'rgba(22,163,74,0.07)' : 'rgba(220,38,38,0.07)',
              borderRadius: 4, padding: '2px 7px', flexShrink: 0,
            }}>
              {sq.covered ? 'pokryte' : 'luka'}
            </span>
          </div>
        ))}
      </div>
      {/* Footer hint */}
      <div style={{ padding: '10px 18px', borderTop: '1px solid #eceff3', background: '#f8fafb' }}>
        <p style={{ fontSize: 11, color: '#818898', margin: 0 }}>
          2 luki → raport zawiera rekomendację uzupełnienia treści
        </p>
      </div>
    </div>
  );
}

/* ─── 5. Graf wiedzy ──────────────────────────────── */
const ENTITIES = [
  { entity: 'AI Search', attr: 'algorytm', value: 'modele językowe', type: 'Podstawa' },
  { entity: 'BLUF', attr: 'definicja', value: 'Bottom Line Up Front', type: 'Wyróżnik' },
  { entity: 'ChatGPT', attr: 'typ', value: 'model językowy', type: 'Podstawa' },
  { entity: 'CQS', attr: 'zakres', value: '0–100', type: 'Wyróżnik' },
  { entity: 'Google AIO', attr: 'źródło', value: 'grounding w SERP', type: 'Rzadki' },
  { entity: 'Content audit', attr: 'narzędzie', value: 'Smart Content Audit', type: 'Wyróżnik' },
];

const TYPE_STYLE: Record<string, { color: string; bg: string }> = {
  'Wyróżnik': { color: ACCENT, bg: 'rgba(11,121,131,0.08)' },
  'Podstawa': { color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
  'Rzadki': { color: '#ca8a04', bg: 'rgba(202,138,4,0.08)' },
};

function KnowledgeGraphVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #dfe1e7', display: 'flex', gap: 8 }}>
        {Object.entries(TYPE_STYLE).map(([type, s]) => (
          <span key={type} style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.05em' }}>
            {type}
          </span>
        ))}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ background: '#f8fafb' }}>
            {['Encja', 'Atrybut', 'Wartość', 'Typ'].map(h => (
              <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ENTITIES.map((e, i) => {
            const s = TYPE_STYLE[e.type];
            return (
              <tr key={i} style={{ borderTop: '1px solid #eceff3' }}>
                <td style={{ padding: '9px 14px', color: '#0d0d12', fontWeight: 500 }}>{e.entity}</td>
                <td style={{ padding: '9px 14px', color: '#818898' }}>{e.attr}</td>
                <td style={{ padding: '9px 14px', color: '#36394a' }}>{e.value}</td>
                <td style={{ padding: '9px 14px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 4, padding: '2px 7px' }}>{e.type}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── 6. Eksport ──────────────────────────────────── */
const REPORT_ITEMS = [
  'Content Quality Score (0–100) z rozbiciem na wymiary',
  'AI Citability Score (0–10)',
  'Wykres radarowy 9 wymiarów',
  'Benchmark top 10 SERP - tabela porównawcza',
  'Rekomendacje Before/After z priorytetami',
  'Graf wiedzy i tabela encji EAV',
  'AI Overview Coverage i analiza sub-zapytań',
  'Podsumowanie wykonawcze gotowe do wysyłki',
];

function ExportVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      {/* Doc header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 40, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: 0 }}>Raport AI Search Audit</p>
          <p style={{ fontSize: 11, color: '#a4acb9', margin: 0 }}>example-article.com · słowo kluczowe: audyt SEO</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['PDF', 'MD'].map(fmt => (
            <span key={fmt} style={{ fontSize: 10, fontWeight: 700, color: ACCENT, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, padding: '3px 8px' }}>{fmt}</span>
          ))}
        </div>
      </div>
      {/* Items */}
      <div style={{ padding: '8px 0' }}>
        {REPORT_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 20px' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="7" cy="7" r="7" fill="rgba(11,121,131,0.1)" />
              <path d="M4 7l2 2 4-4" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────── */
export default function Features() {
  return (
    <div id="features">

      {/* 1 - 9 wymiarów */}
      <section style={{ background: '#f8fafb', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionLabel>9 wymiarów analizy</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Wymiary AI Search mierzone osobno
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
              9 kryteriów cytowania przez modele językowe - z konkretnym wynikiem 0–10, wzorcem punktacji i rankingiem ważności.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <DimensionsVisual />
          </motion.div>
        </div>
      </section>

      {/* 2 - Benchmark SERP */}
      <section style={{ background: '#ffffff', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Benchmark SERP</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Wiesz dokładnie, gdzie odstajesz od konkurencji
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 24 }}>
                Narzędzie automatycznie pobiera i analizuje 10 najwyżej rankujących artykułów dla danego słowa kluczowego. Wynik Twojego contentu trafia na tle realnej konkurencji - widać lukę i punkt wyjścia do optymalizacji.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['CQS per artykuł - porównanie tabelaryczne', 'Identyfikacja liderów i słabych punktów SERP', 'Format, długość i struktura konkurentów'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>→</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}>
              <BenchmarkVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 - Before/After */}
      <section style={{ background: '#f8fafb', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 44 }}>
            <SectionLabel>Rekomendacje</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Nie "co poprawić" - tylko "jak poprawić"
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 560, lineHeight: 1.65 }}>
              Każda rekomendacja zawiera fragment z oryginalnego artykułu, gotową poprawkę i szacowany przyrost CQS. Zero interpretacji - wiesz co wkleić.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <BeforeAfterVisual />
          </motion.div>
        </div>
      </section>

      {/* 4 - AI Overview */}
      <section style={{ background: '#ffffff', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid feat-grid-reverse">
            <motion.div {...fadeUp(0.1)}>
              <AIOverviewVisual />
            </motion.div>
            <motion.div {...fadeUp()}>
              <SectionLabel>AI Overview Coverage</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Czy Twoja treść pokrywa syntezę AI Overview?
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 24 }}>
                AI Overview to synteza odpowiedzi na kilkanaście sub-zapytań powiązanych z frazą. Narzędzie dekompozytuje tę syntezę i sprawdza, które sub-zapytania Twoja treść pokrywa - a gdzie są luki, przez które AI pomija Twoją stronę przy generowaniu odpowiedzi.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Dekompozycja AI Overview na sub-zapytania składowe', 'Mapa pokrycia - które sub-zapytania obsługuje Twoja treść', 'Wskazanie luk z rekomendacją uzupełnienia treści'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>→</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5 - Graf wiedzy */}
      <section style={{ background: '#f8fafb', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 44 }}>
            <SectionLabel>Graf wiedzy</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              AI widzi encje - nie tylko słowa kluczowe
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 560, lineHeight: 1.65 }}>
              Modele językowe budują reprezentację wiedzy na podstawie encji i ich atrybutów. Raport mapuje te relacje i klasyfikuje je jako Wyróżnik, Podstawa lub Rzadki - wskazując, które budują autorytet tematyczny.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <KnowledgeGraphVisual />
          </motion.div>
        </div>
      </section>

      {/* 6 - Eksport */}
      <section style={{ background: '#ffffff', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Eksport raportu</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Raport gotowy do wysłania klientowi
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 24 }}>
                PDF zaprojektowany z myślą o prezentacji klientowi - bez dodatkowej edycji. Format Markdown przydatny do dokumentacji projektowej lub dalszego przetwarzania.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  {
                    fmt: 'PDF', desc: 'Gotowy do wysyłki',
                    icon: (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    ),
                  },
                  {
                    fmt: 'Markdown', desc: 'Do dokumentacji',
                    icon: (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                    ),
                  },
                ].map(f => (
                  <div key={f.fmt} style={{ flex: 1, background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 8, padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{f.icon}</div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: '0 0 2px' }}>{f.fmt}</p>
                    <p style={{ fontSize: 11.5, color: '#818898', margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.12)}>
              <ExportVisual />
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .feat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .feat-grid-reverse > *:first-child { order: 1; }
        .feat-grid-reverse > *:last-child  { order: 0; }
        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: 1fr; gap: 36px; }
          .feat-grid-reverse > * { order: unset !important; }
        }
      `}</style>
    </div>
  );
}
