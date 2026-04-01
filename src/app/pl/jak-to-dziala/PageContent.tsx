'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14, margin: '0 0 14px' }}>
      {children}
    </p>
  );
}


/* ── Visual: CQS + Citability breakdown ──────────────────────────────── */
function ScoresVisual() {
  const rows = [
    { label: 'Zgodność z intencją', weight: '×0.25', score: 8.4 },
    { label: 'E-E-A-T', weight: '×0.20', score: 7.1 },
    { label: 'Koszt ekstrakcji', weight: '×0.20', score: 9.0 },
    { label: 'Gęstość informacji', weight: '×0.15', score: 6.8 },
    { label: 'TF-IDF', weight: '×0.10', score: 7.5 },
    { label: 'Role semantyczne', weight: '×0.10', score: 5.2 },
  ];
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '28px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
        {[
          { label: 'CQS', score: '84', unit: '/100', color: '#16A34A', badge: 'OK', badgeBg: 'rgba(22,163,74,0.12)', badgeBorder: 'rgba(22,163,74,0.25)' },
          { label: 'Citability', score: '6.4', unit: '/10', color: '#CA8A04', badge: 'UWAGA', badgeBg: 'rgba(202,138,4,0.12)', badgeBorder: 'rgba(202,138,4,0.25)' },
        ].map(item => (
          <div key={item.label} style={{ background: `${item.color}0f`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 16px' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px' }}>{item.label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: item.color, lineHeight: 1, letterSpacing: '-0.04em' }}>{item.score}</span>
              <span style={{ fontSize: 13, color: '#a4acb9', fontWeight: 500 }}>{item.unit}</span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: item.color, background: item.badgeBg, border: `1px solid ${item.badgeBorder}`, borderRadius: 4, padding: '2px 7px', letterSpacing: '0.06em' }}>{item.badge}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #eceff3', paddingTop: 16 }}>
        <p style={{ fontSize: 10, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>Składowe CQS</p>
        {rows.map((item) => {
          const color = item.score >= 7 ? '#16A34A' : item.score >= 5 ? '#CA8A04' : '#DC2626';
          return (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
              <span style={{ fontSize: 11.5, color: '#36394a', flex: 1 }}>{item.label}</span>
              <span style={{ fontSize: 10, color: '#a4acb9', width: 32, textAlign: 'right' }}>{item.weight}</span>
              <div style={{ width: 64, height: 4, background: '#eceff3', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${(item.score / 10) * 100}%` }}
                  viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', background: color, borderRadius: 2 }}
                />
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color, width: 24, textAlign: 'right' }}>{item.score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Visual: Benchmark SERP ───────────────────────────────────────────── */
const SERP_ROWS = [
  { label: 'Twój artykuł', score: 72, highlight: true },
  { label: 'Konkurent #1', score: 88 },
  { label: 'Konkurent #2', score: 81 },
  { label: 'Konkurent #3', score: 76 },
  { label: 'Konkurent #4', score: 65 },
  { label: 'Konkurent #5', score: 58 },
];
function BenchmarkVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '24px 24px 20px' }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 18px' }}>CQS - porównanie top 10 SERP</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SERP_ROWS.map((row, i) => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: row.highlight ? ACCENT : '#818898', fontWeight: row.highlight ? 700 : 400, width: 110, flexShrink: 0 }}>{row.label}</span>
            <div style={{ flex: 1, height: 8, background: '#f0f9fa', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }} whileInView={{ width: `${row.score}%` }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                style={{ height: '100%', background: row.highlight ? ACCENT : '#dfe1e7', borderRadius: 4 }}
              />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: row.highlight ? ACCENT : '#818898', width: 28, textAlign: 'right' }}>{row.score}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, padding: '10px 14px', background: 'rgba(11,121,131,0.06)', borderRadius: 6, border: '1px solid rgba(11,121,131,0.15)' }}>
        <p style={{ fontSize: 12, color: ACCENT, margin: 0, fontWeight: 500 }}>↑ 16 pkt do pozycji lidera - raport wskazuje dokładnie co zmienić</p>
      </div>
    </div>
  );
}

/* ── Visual: Before/After ─────────────────────────────────────────────── */
function BeforeAfterVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>Przed</span>
          <p style={{ fontSize: 12.5, color: '#9ca3af', lineHeight: 1.6, margin: 0, textDecoration: 'line-through' }}>
            Optymalizacja pod AI jest ważna, ponieważ modele językowe dobierają treści według własnych kryteriów.
          </p>
        </div>
        <div style={{ background: 'rgba(11,121,131,0.04)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>Po</span>
          <p style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: ACCENT }}>CitationOne</strong> mierzy 10 wymiarów cytowania przez AI - z szacowanym wpływem każdego na CQS i konkretną poprawką do wklejenia.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { label: 'KRYTYCZNY', color: '#DC2626', bg: 'rgba(220,38,38,0.1)', border: 'rgba(220,38,38,0.3)' },
          { label: 'WYSOKI', color: '#CA8A04', bg: 'rgba(202,138,4,0.1)', border: 'rgba(202,138,4,0.3)' },
          { label: 'ŚREDNI', color: '#16A34A', bg: 'rgba(22,163,74,0.1)', border: 'rgba(22,163,74,0.3)' },
        ].map(p => (
          <span key={p.label} style={{ fontSize: 10, fontWeight: 700, color: p.color, background: p.bg, border: `1px solid ${p.border}`, borderRadius: 4, padding: '4px 10px', letterSpacing: '0.06em' }}>{p.label}</span>
        ))}
        <span style={{ fontSize: 11.5, color: '#a4acb9' }}>priorytet + szacowany wpływ na CQS per rekomendacja</span>
      </div>
    </div>
  );
}

/* ── Visual: AI Overview ──────────────────────────────────────────────── */
const AIO_ITEMS = [
  { q: 'co to jest audyt AI Search', covered: true },
  { q: 'jak działa AI Overview Google', covered: true },
  { q: 'jakie metryki mierzy audyt AI', covered: false },
  { q: 'różnica SEO vs AI Search', covered: false },
  { q: 'jak poprawić citability score', covered: true },
];
function AIOverviewVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
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
      <div style={{ padding: '8px 0' }}>
        {AIO_ITEMS.map((sq) => (
          <div key={sq.q} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: sq.covered ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.07)', border: `1px solid ${sq.covered ? 'rgba(22,163,74,0.25)' : 'rgba(220,38,38,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {sq.covered
                ? <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" /></svg>
              }
            </div>
            <span style={{ fontSize: 12, color: sq.covered ? '#36394a' : '#a4acb9', lineHeight: 1.4 }}>{sq.q}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: sq.covered ? '#16A34A' : '#DC2626', background: sq.covered ? 'rgba(22,163,74,0.07)' : 'rgba(220,38,38,0.07)', borderRadius: 4, padding: '2px 7px', flexShrink: 0 }}>
              {sq.covered ? 'pokryte' : 'luka'}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 18px', borderTop: '1px solid #eceff3', background: '#f8fafb' }}>
        <p style={{ fontSize: 11, color: '#818898', margin: 0 }}>2 luki - raport wskazuje co napisać, żeby pokryć brakujące sub-zapytania</p>
      </div>
    </div>
  );
}

/* ── Visual: Knowledge Graph ─────────────────────────────────────────── */
const EAV_ENTITIES = [
  { entity: 'AI Search', attr: 'algorytm', value: 'modele językowe', type: 'Podstawa' },
  { entity: 'BLUF', attr: 'definicja', value: 'Bottom Line Up Front', type: 'Wyróżnik' },
  { entity: 'ChatGPT', attr: 'typ', value: 'model językowy', type: 'Podstawa' },
  { entity: 'CQS', attr: 'zakres', value: '0–100', type: 'Wyróżnik' },
  { entity: 'Google AIO', attr: 'źródło', value: 'grounding w SERP', type: 'Rzadki' },
];
const TYPE_STYLES: Record<string, { color: string; bg: string }> = {
  'Wyróżnik': { color: ACCENT, bg: 'rgba(11,121,131,0.08)' },
  'Podstawa': { color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
  'Rzadki': { color: '#ca8a04', bg: 'rgba(202,138,4,0.08)' },
};
function KnowledgeGraphVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #dfe1e7', display: 'flex', gap: 8 }}>
        {Object.entries(TYPE_STYLES).map(([type, s]) => (
          <span key={type} style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.05em' }}>{type}</span>
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
          {EAV_ENTITIES.map((e, i) => {
            const s = TYPE_STYLES[e.type];
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

/* ── Visual: Export ───────────────────────────────────────────────────── */
const REPORT_ITEMS = [
  'Content Quality Score (0–100) z rozbiciem na wymiary',
  'AI Citability Score (0–10)',
  'Wykres radarowy 10 wymiarów',
  'Benchmark top 10 SERP - tabela porównawcza',
  'Rekomendacje Before/After z priorytetami',
  'Graf wiedzy i tabela encji EAV',
  'AI Overview Coverage i analiza sub-zapytań',
  'Podsumowanie wykonawcze gotowe do wysyłki',
];
function ExportVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
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
      <div style={{ padding: '8px 0' }}>
        {REPORT_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 20px' }}>
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

/* ── Dimensions data ──────────────────────────────────────────────────── */
const DIMS = [
  {
    id: 'CSI-A', label: 'Zgodność z intencją',
    medium: 'Sprawdza czy artykuł odpowiada na dokładnie to pytanie, które zadał użytkownik - nie podobne, lecz dokładnie to.',
    expert: 'Walidacja Central Entity, Search Context, Predicate. BLUF check w lead, EAV coverage, chunk validation per H2 (200-500 słów, autonomia, CE min 2×). W trybie Full: gap analysis P1-P4 vs benchmark SERP.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></svg>,
  },
  {
    id: 'D1', label: 'Gęstość informacji',
    medium: 'Mierzy ile faktów jest w artykule. Ogólniki i puste zdania zaniżają wynik - konkretne dane i liczby go podnoszą.',
    expert: 'Score = (zdania_faktyczne / wszystkie) × 10. Kary: słowa modalne (-0.5), puste frazy (-1.0), przymiotniki ocenne. Bonusy: konkretne liczby (+1.0), encje (+0.5), wartości EAV (+1.0).',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 10h14M3 14h10M3 18h7" /></svg>,
  },
  {
    id: 'D2', label: 'EAV Structure',
    medium: 'AI widzi artykuł jako sieć faktów: Encja - Atrybut - Wartość. Im kompletniejsza sieć, tym większa szansa na cytowanie.',
    expert: 'Ekstrakcja trójek Entity-Attribute-Value. W trybie Full: algorytmiczna klasyfikacja URR (UNIQUE poniżej 30% / ROOT powyżej 70% / RARE 30-69%) na podstawie eavMatrix z benchmarku SERP.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v3M12 10l-5 7M12 10l5 7" /></svg>,
  },
  {
    id: 'D3', label: 'BLUF',
    medium: 'Modele AI faworyzują artykuły, które podają odpowiedź na początku każdej sekcji. Nie na końcu, nie po wstępie - na samym początku.',
    expert: 'Bottom Line Up Front: odpowiedź w pierwszych 50 słowach każdej H2. Struktura: Odpowiedź - Dowód - Kontekst. Chunki z BLUF cytowane ~62% jako główne źródło w badaniach RAG.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h10M4 14h12M4 18h7" /><path d="M20 14v6M17 17l3-3 3 3" /></svg>,
  },
  {
    id: 'D4', label: 'Autonomiczność sekcji',
    medium: 'Systemy AI dzielą artykuły na kawałki przed analizą. Każdy kawałek powinien mieć sens bez czytania całości - być autonomiczny.',
    expert: 'Autonomiczność sekcji dla RAG (Retrieval-Augmented Generation). Optymalna długość 200-500 słów per H2. Kryteria: brak zaimków odsyłających, CE min 2× per sekcja, brak "jak wspomniano wyżej".',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>,
  },
  {
    id: 'D5', label: 'Koszt ekstrakcji',
    medium: 'Im trudniej AI znaleźć informację w tekście, tym mniejsza szansa na cytowanie. Nagłówki, listy i tabele zmniejszają ten koszt.',
    expert: 'System punktowy (max 10): hierarchia H1-H2-H3 (+2), tabele (+2), listy (+1), pogrubienia kluczowych faktów (+1), TL;DR (+1), brak ścian tekstu powyżej 300 słów (+1), brak ogólnikowych wstępów (+1).',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7a4 4 0 010-8h2M15 7h2a4 4 0 010 8h-2M9 12h6" /></svg>,
  },
  {
    id: 'D6', label: 'TF-IDF',
    medium: 'Sprawdza czy artykuł używa terminologii branżowej. Brak specjalistycznych pojęć sygnalizuje AI: "ten autor nie zna tematu głęboko".',
    expert: 'Score = (high_idf_terms_present / oczekiwane) × 10. HIGH IDF: terminy specjalistyczne, wielowyrazowe frazy branżowe. W trybie Full: realne dane z korpusu 10 konkurentów SERP (computeTermStats).',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35M8 11h6M8 8h4" /></svg>,
  },
  {
    id: 'D7', label: 'Role semantyczne',
    medium: 'AI lepiej przyswaja wiedzę, gdy temat artykułu jest aktywnym bohaterem zdań - nie pasywnym obiektem opisywanym przez innych.',
    expert: 'SRL: Central Entity jako Agent (podmiot aktywny) w ponad 70% zdań. Score = (ΣAgent×1.0 + ΣPatient×0.5) / max. Transformacje CE Patient - CE Agent w rekomendacjach.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>,
  },
  {
    id: 'D8', label: 'Pokrycie AI Overview',
    medium: 'Każde zapytanie to de facto kilka pod-pytań naraz. Sprawdzamy ile z nich obsługuje artykuł - bo AI używa właśnie tych pod-pytań do syntezy.',
    expert: 'Dekompozycja CSI na 5-10 sub-queries (semantic/intent/verification). Tryb Full: grounding wobec PAA/Related Searches - tagi CONFIRMED/OVERVIEW/PREDICTED/SERP-ONLY. Malus -1 za niepokryte SERP-ONLY.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v4M8 12l-4 4M16 12l4 4M12 8l-4 4h8l-4-4" /></svg>,
  },
  {
    id: 'D9', label: 'Wysiłek redakcyjny',
    medium: 'Mierzy widoczny wysiłek redakcyjny: długość artykułu, zdjęcia, wideo, tabele i schema FAQ. Modele AI preferują treści dopracowane - nie pisane na szybko.',
    expert: 'Deterministyczny scoring na podstawie htmlMetrics z crawlera: wordCount (próg ≥1500), imageCount, videoCount, hasFaqSchema, hasTableOfContents. Brak wywołania Gemini - metryki algorytmiczne z analizy struktury. Waga 0.06 w CQS.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 4-8" /></svg>,
  },
  {
    id: 'E-E-A-T', label: 'E-E-A-T',
    medium: 'Google i modele AI ufają treściom stojącym za prawdziwym ekspertem z doświadczeniem. Raport mierzy konkretne sygnały tego zaufania.',
    expert: 'Experience: personal story, case study, screenshots. Expertise: cytaty z badań, terminologia (+2). Authority: bio autora z kwalifikacjami (+3), afiliacja instytucjonalna (+2). Trust: disclaimer, data aktualizacji, kontakt do autora.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  },
];

/* ── Main page ────────────────────────────────────────────────────────── */
export default function PageContent() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Jak to działa
            </p>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.85vw, 3.9rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 22, background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
              Jak działa CitationOne?
            </h1>
            <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 36px' }}>
              CitationOne analizuje artykuł i odpowiada na jedno pytanie: czy modele AI - ChatGPT, Perplexity i Google AI Overview - zacytują Twoją treść zamiast konkurencji. Rozkłada artykuł na 10 wymiarów jakości, porównuje z top 10 SERP i generuje priorytetyzowane rekomendacje z gotowymi poprawkami do wklejenia.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { text: 'Pełny raport w ~3 minuty' },
                { text: '10 wymiarów + E-E-A-T' },
                { text: 'Benchmark top 10 SERP' },
                { text: 'Before/After z gotowymi poprawkami' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 8, fontSize: 13, color: '#36394a' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 KROKI */}
      <section style={{
        background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)',
        padding: '120px 0',
        clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)',
        margin: '-28px 0',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <span aria-hidden style={{ position: 'absolute', top: 36, left: 52, fontSize: 200, lineHeight: 1, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201C'}</span>
        <span aria-hidden style={{ position: 'absolute', bottom: 36, right: 52, fontSize: 200, lineHeight: 1, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201D'}</span>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 2 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.025em', margin: 0 }}>
              3 kroki do raportu
            </h2>
          </motion.div>
          <div className="steps-grid">
            {[
              {
                n: '1', title: 'Wklej URL artykułu',
                body: 'Podajesz adres strony i słowo kluczowe. Narzędzie automatycznie pobiera treść - żadnych ręcznych copy-paste. Do wyboru: tryb Full (z benchmarkiem SERP, ~3 min) lub Content-only (szybszy, ~30-60 sek, bez danych konkurencji).',
                icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
              },
              {
                n: '2', title: 'AI analizuje równolegle',
                body: '10 równoległych wywołań AI jednocześnie: 9 wymiarów jakości + E-E-A-T, plus algorytmiczny wysiłek redakcyjny. W trybie Full narzędzie crawluje top 10 SERP, ekstrahuje encje z każdego artykułu i buduje benchmark konkurencji.',
                icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>,
              },
              {
                n: '3', title: 'Odbierasz gotowy raport',
                body: 'Raport zawiera priorytetyzowane rekomendacje Before/After - dosłowny cytat z artykułu i gotową wersję po poprawce z szacowanym wpływem na wynik. Całość eksportujesz jednym kliknięciem: PDF do wysłania klientowi, Markdown do dalszej pracy.',
                icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" /></svg>,
              },
            ].map((step, i) => (
              <motion.div key={step.n} {...fadeUp(i * 0.13)} style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  style={{ width: 88, height: 88, borderRadius: 16, background: '#0b7983', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: 24 }}
                >
                  {step.icon}
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#0b7983', background: 'rgba(11,121,131,0.1)', borderRadius: 4, padding: '2px 8px', letterSpacing: '0.05em' }}>KROK {step.n}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.02em', lineHeight: 1.3, margin: 0 }}>{step.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: '#36394a', lineHeight: 1.65, margin: 0 }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CQS + CITABILITY */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Wyniki główne</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Jeden wynik zamiast domysłów
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                <strong>CQS (0-100)</strong> to zagregowany wynik z 10 wymiarów - pokazuje, jak daleko Twoja treść jest od standardu, który AI chętnie cytuje. <strong>AI Citability (0-10)</strong> mierzy szansę, że model językowy wybierze właśnie Twoją stronę zamiast konkurencji.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Każdy z 10 wymiarów z osobnym wynikiem 0-10', 'Status na pierwszy rzut oka: OK / UWAGA / KRYTYCZNY', 'Porównanie Twojego wyniku z top 10 SERP'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>-</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}><ScoresVisual /></motion.div>
          </div>
        </div>
      </section>

      {/* 10 WYMIARÓW */}
      <section style={{
        background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)',
        padding: '120px 0',
        clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)',
        margin: '-28px 0',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <span aria-hidden style={{ position: 'absolute', top: 36, left: 52, fontSize: 200, lineHeight: 1, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201C'}</span>
        <span aria-hidden style={{ position: 'absolute', bottom: 36, right: 52, fontSize: 200, lineHeight: 1, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201D'}</span>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 2 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 14px' }}>10 wymiarów + E-E-A-T</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Co dokładnie analizuje narzędzie?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
              Każdy wymiar to osobne wywołanie AI z dedykowanym promptem - osobny wynik 0-10, osobne problemy i osobne rekomendacje.
            </p>
          </motion.div>
          <div className="dims-grid">
            {DIMS.map((dim, i) => (
              <motion.div
                key={dim.id}
                {...fadeUp(i * 0.04)}
                whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '20px 20px 18px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: '#0b7983', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: 10 }}>
                    {dim.icon}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#a4acb9', textTransform: 'uppercase' as const, letterSpacing: '0.08em', display: 'block' }}>{dim.id}</span>
                    <h3 style={{ fontSize: 13.5, fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.02em', margin: 0 }}>{dim.label}</h3>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: '#36394a', lineHeight: 1.6, margin: '0 0 8px' }}>{dim.medium}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENCHMARK SERP */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Benchmark SERP</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Widzisz gdzie dokładnie odstajesz od konkurencji
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                Narzędzie automatycznie pobiera i ocenia 10 artykułów, które teraz rankują na Twoje słowo kluczowe. Widzisz CQS każdego konkurenta i dokładną lukę do zamknięcia - bez ręcznego zbierania danych.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['CQS per artykuł - porównanie tabelaryczne', 'Identyfikacja liderów i słabych punktów SERP', 'Formaty treści konkurencji: tabele, FAQ, listy'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>-</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}><BenchmarkVisual /></motion.div>
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 40 }}>
            <SectionLabel>Rekomendacje Before/After</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Nie &ldquo;co poprawić&rdquo; - tylko &ldquo;jak poprawić&rdquo;
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 600, lineHeight: 1.65, margin: '0 0 4px' }}>
              Każda rekomendacja zawiera dosłowny cytat z artykułu i gotową wersję po poprawce. Zero interpretacji: wklejasz, nie piszesz od nowa. Każda z priorytetem i szacowanym wpływem na CQS.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}><BeforeAfterVisual /></motion.div>
        </div>
      </section>

      {/* AI OVERVIEW COVERAGE */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid feat-grid-reverse">
            <motion.div {...fadeUp(0.1)}><AIOverviewVisual /></motion.div>
            <motion.div {...fadeUp()}>
              <SectionLabel>AI Overview Coverage</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Google AI Overview to synteza wielu pod-pytań
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                AI Overview nie cytuje jednego artykułu - syntetyzuje odpowiedzi na kilkanaście powiązanych pod-pytań naraz. Narzędzie rozkłada tę syntezę i wskazuje, które pod-pytania Twoja treść pokrywa, a przez które luki AI Cię pomija.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Dekompozycja syntezy AI Overview na sub-zapytania', 'Mapa pokrycia: które sub-zapytania obsługujesz', 'Rekomendacje uzupełnienia luk z konkretną treścią'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>-</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GRAF WIEDZY */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Graf wiedzy (EAV)</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                AI widzi encje - nie tylko słowa kluczowe
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                Modele językowe budują reprezentację wiedzy na podstawie faktów - encji i ich atrybutów. Raport mapuje te relacje i pokazuje które fakty wyróżniają Cię na tle konkurencji (<strong>Wyróżnik</strong>), które są must-have (<strong>Podstawa</strong>) i których Ci brakuje.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Pełna tabela encji z klasyfikacją Wyróżnik/Podstawa/Rzadki', 'Mapa pokrycia: pokryte / luka / unikalne', 'Interaktywny graf wiedzy w aplikacji'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>-</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}><KnowledgeGraphVisual /></motion.div>
          </div>
        </div>
      </section>

      {/* EKSPORT */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid feat-grid-reverse">
            <motion.div {...fadeUp(0.1)}><ExportVisual /></motion.div>
            <motion.div {...fadeUp()}>
              <SectionLabel>Eksport raportu</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Raport gotowy do wysłania klientowi
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                PDF zaprojektowany do prezentacji - wszystkie sekcje raportu w czytelnym formacie bez dodatkowej edycji. Markdown do dokumentacji projektowej lub automatycznego przetwarzania.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { fmt: 'PDF', desc: 'Gotowy do wysyłki', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
                  { fmt: 'Markdown', desc: 'Do dokumentacji', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
                ].map(f => (
                  <div key={f.fmt} style={{ flex: 1, background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 8, padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{f.icon}</div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: '0 0 2px' }}>{f.fmt}</p>
                    <p style={{ fontSize: 11.5, color: '#818898', margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)', padding: '96px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div {...fadeUp()}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 18 }}>
              Sprawdź, czy Twoja treść<br />jest gotowa na AI Search.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 36 }}>
              Pierwszy audyt zajmuje ~3 minuty. Raport gotowy do wysłania klientowi od razu po zakończeniu.
            </p>
            <motion.a
              href={`${APP_URL}/login?lang=pl`}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 33px', borderRadius: 8, background: '#ffffff', color: '#0b7983', fontWeight: 700, fontSize: 16, textDecoration: 'none', letterSpacing: '-0.01em' }}
            >
              Zrób audyt
            </motion.a>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 18 }}>
              Bez subskrypcji · Faktura VAT · Płatność przelewem
            </p>
          </motion.div>
        </div>
      </section>

      <style>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .dims-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .feat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .feat-grid-reverse > *:first-child { order: 1; }
        .feat-grid-reverse > *:last-child  { order: 0; }
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr; gap: 14px; }
          .dims-grid  { grid-template-columns: 1fr; }
          .feat-grid  { grid-template-columns: 1fr; gap: 36px; }
          .feat-grid-reverse > * { order: unset !important; }
        }
      `}</style>
    </div>
  );
}
