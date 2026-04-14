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
  return <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>{children}</p>;
}

/* ── Visuals ─────────────────────────────────────────────────────── */

function ScoresVisual() {
  const rows = [
    { label: 'Intent Alignment', weight: '×0.25', score: 8.4 },
    { label: 'E-E-A-T', weight: '×0.20', score: 7.1 },
    { label: 'Cost of Retrieval', weight: '×0.20', score: 9.0 },
    { label: 'Info Density', weight: '×0.15', score: 6.8 },
    { label: 'TF-IDF', weight: '×0.10', score: 7.5 },
    { label: 'Semantic Roles', weight: '×0.10', score: 5.2 },
  ];
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '28px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
        {[
          { label: 'CQS', score: '84', unit: '/100', color: '#16A34A', badge: 'OK', badgeBg: 'rgba(22,163,74,0.12)', badgeBorder: 'rgba(22,163,74,0.25)' },
          { label: 'Citability', score: '6.4', unit: '/10', color: '#CA8A04', badge: 'WARNING', badgeBg: 'rgba(202,138,4,0.12)', badgeBorder: 'rgba(202,138,4,0.25)' },
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
        <p style={{ fontSize: 10, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>CQS components</p>
        {rows.map((item) => {
          const color = item.score >= 7 ? '#16A34A' : item.score >= 5 ? '#CA8A04' : '#DC2626';
          return (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
              <span style={{ fontSize: 11.5, color: '#36394a', flex: 1 }}>{item.label}</span>
              <span style={{ fontSize: 10, color: '#a4acb9', width: 32, textAlign: 'right' }}>{item.weight}</span>
              <div style={{ width: 64, height: 4, background: '#eceff3', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.score / 10) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ height: '100%', background: color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color, width: 24, textAlign: 'right' }}>{item.score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SERP_ROWS = [
  { label: 'Your article', score: 72, highlight: true },
  { label: 'Competitor #1', score: 88 },
  { label: 'Competitor #2', score: 81 },
  { label: 'Competitor #3', score: 76 },
  { label: 'Competitor #4', score: 65 },
  { label: 'Competitor #5', score: 58 },
];

function BenchmarkVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '24px 24px 20px' }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 18px' }}>CQS - top 10 SERP comparison</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SERP_ROWS.map((row, i) => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: row.highlight ? ACCENT : '#818898', fontWeight: row.highlight ? 700 : 400, width: 110, flexShrink: 0 }}>{row.label}</span>
            <div style={{ flex: 1, height: 8, background: '#f0f9fa', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${row.score}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }} style={{ height: '100%', background: row.highlight ? ACCENT : '#dfe1e7', borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: row.highlight ? ACCENT : '#818898', width: 28, textAlign: 'right' }}>{row.score}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, padding: '10px 14px', background: 'rgba(11,121,131,0.06)', borderRadius: 6, border: '1px solid rgba(11,121,131,0.15)' }}>
        <p style={{ fontSize: 12, color: ACCENT, margin: 0, fontWeight: 500 }}>↑ 16 pts to leader position - report shows exactly what to change</p>
      </div>
    </div>
  );
}

function BeforeAfterVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>Before</span>
          <p style={{ fontSize: 12.5, color: '#9ca3af', lineHeight: 1.6, margin: 0, textDecoration: 'line-through' }}>AI optimization is important because language models select content based on their own criteria.</p>
        </div>
        <div style={{ background: 'rgba(11,121,131,0.04)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>After</span>
          <p style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.6, margin: 0 }}><strong style={{ color: ACCENT }}>CitationOne</strong> measures 10 AI citation dimensions - with estimated impact on CQS and a specific fix to paste.</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { label: 'CRITICAL', color: '#DC2626', bg: 'rgba(220,38,38,0.1)', border: 'rgba(220,38,38,0.3)' },
          { label: 'HIGH', color: '#CA8A04', bg: 'rgba(202,138,4,0.1)', border: 'rgba(202,138,4,0.3)' },
          { label: 'MEDIUM', color: '#16A34A', bg: 'rgba(22,163,74,0.1)', border: 'rgba(22,163,74,0.3)' },
        ].map(p => (
          <span key={p.label} style={{ fontSize: 10, fontWeight: 700, color: p.color, background: p.bg, border: `1px solid ${p.border}`, borderRadius: 4, padding: '4px 10px', letterSpacing: '0.06em' }}>{p.label}</span>
        ))}
        <span style={{ fontSize: 11.5, color: '#a4acb9' }}>priority + estimated CQS impact per recommendation</span>
      </div>
    </div>
  );
}

const AIO_ITEMS = [
  { q: 'what is an AI Search audit', covered: true },
  { q: 'how does Google AI Overview work', covered: true },
  { q: 'what metrics does AI audit measure', covered: false },
  { q: 'SEO vs AI Search difference', covered: false },
  { q: 'how to improve citability score', covered: true },
];

function AIOverviewVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: 4, background: 'linear-gradient(135deg, #4285f4, #34a853)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>G</span></div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#0d0d12' }}>AI Overview - synthesis decomposition</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, padding: '2px 7px' }}>3/5</span>
          <span style={{ fontSize: 10, color: '#a4acb9' }}>covered</span>
        </div>
      </div>
      <div style={{ padding: '8px 0' }}>
        {AIO_ITEMS.map((sq) => (
          <div key={sq.q} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: sq.covered ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.07)', border: `1px solid ${sq.covered ? 'rgba(22,163,74,0.25)' : 'rgba(220,38,38,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {sq.covered ? <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" /></svg>}
            </div>
            <span style={{ fontSize: 12, color: sq.covered ? '#36394a' : '#a4acb9', lineHeight: 1.4 }}>{sq.q}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: sq.covered ? '#16A34A' : '#DC2626', background: sq.covered ? 'rgba(22,163,74,0.07)' : 'rgba(220,38,38,0.07)', borderRadius: 4, padding: '2px 7px', flexShrink: 0 }}>{sq.covered ? 'covered' : 'gap'}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 18px', borderTop: '1px solid #eceff3', background: '#f8fafb' }}>
        <p style={{ fontSize: 11, color: '#818898', margin: 0 }}>2 gaps - report tells you what to write to cover missing sub-queries</p>
      </div>
    </div>
  );
}

const EAV_ENTITIES = [
  { entity: 'AI Search', attr: 'algorithm', value: 'language models', type: 'Root' },
  { entity: 'BLUF', attr: 'definition', value: 'Bottom Line Up Front', type: 'Unique' },
  { entity: 'ChatGPT', attr: 'type', value: 'language model', type: 'Root' },
  { entity: 'CQS', attr: 'range', value: '0-100', type: 'Unique' },
  { entity: 'Google AIO', attr: 'source', value: 'SERP grounding', type: 'Rare' },
];
const TYPE_STYLES: Record<string, { color: string; bg: string }> = {
  'Unique': { color: ACCENT, bg: 'rgba(11,121,131,0.08)' },
  'Root': { color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
  'Rare': { color: '#ca8a04', bg: 'rgba(202,138,4,0.08)' },
};

function KnowledgeGraphVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #dfe1e7', display: 'flex', gap: 8 }}>
        {Object.entries(TYPE_STYLES).map(([type, s]) => (<span key={type} style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.05em' }}>{type}</span>))}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead><tr style={{ background: '#f8fafb' }}>{['Entity', 'Attribute', 'Value', 'Type'].map(h => (<th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>))}</tr></thead>
        <tbody>{EAV_ENTITIES.map((e, i) => { const s = TYPE_STYLES[e.type]; return (<tr key={i} style={{ borderTop: '1px solid #eceff3' }}><td style={{ padding: '9px 14px', color: '#0d0d12', fontWeight: 500 }}>{e.entity}</td><td style={{ padding: '9px 14px', color: '#818898' }}>{e.attr}</td><td style={{ padding: '9px 14px', color: '#36394a' }}>{e.value}</td><td style={{ padding: '9px 14px' }}><span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 4, padding: '2px 7px' }}>{e.type}</span></td></tr>); })}</tbody>
      </table>
    </div>
  );
}

const REPORT_ITEMS = [
  'Content Quality Score (0-100) with dimension breakdown',
  'AI Citability Score (0-10)',
  'Radar chart of 10 dimensions',
  'Top 10 SERP benchmark - comparison table',
  'Before/After recommendations with priorities',
  'Knowledge graph and EAV entity table',
  'AI Overview Coverage and sub-query analysis',
  'Executive summary ready to send',
];

function ExportVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 40, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
        </div>
        <div><p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: 0 }}>AI Search Audit Report</p><p style={{ fontSize: 11, color: '#a4acb9', margin: 0 }}>example-article.com · keyword: AI audit</p></div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>{['PDF', 'MD'].map(fmt => (<span key={fmt} style={{ fontSize: 10, fontWeight: 700, color: ACCENT, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, padding: '3px 8px' }}>{fmt}</span>))}</div>
      </div>
      <div style={{ padding: '8px 0' }}>{REPORT_ITEMS.map((item, i) => (<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 20px' }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="7" cy="7" r="7" fill="rgba(11,121,131,0.1)" /><path d="M4 7l2 2 4-4" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.5 }}>{item}</span></div>))}</div>
    </div>
  );
}

/* ── Dimensions ──────────────────────────────────────────────────── */
const DIMS = [
  { id: 'CSI-A', label: 'Intent Alignment', medium: 'Checks if the article answers exactly the question the user asked - not a similar one, but exactly that one.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></svg> },
  { id: 'D1', label: 'Information Density', medium: 'Measures how many facts are in the article. Generalities and empty sentences lower the score - concrete data and numbers raise it.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 10h14M3 14h10M3 18h7" /></svg> },
  { id: 'D2', label: 'Knowledge Graph', medium: 'AI sees articles as a network of facts: Entity - Attribute - Value. The more complete the network, the higher the chance of citation.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v3M12 10l-5 7M12 10l5 7" /></svg> },
  { id: 'D3', label: 'BLUF', medium: 'AI models favor articles that give the answer at the beginning of each section. Not at the end, not after an intro - right at the start.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h10M4 14h12M4 18h7" /><path d="M20 14v6M17 17l3-3 3 3" /></svg> },
  { id: 'D4', label: 'Chunk Optimization', medium: 'AI systems split articles into chunks before analysis. Each chunk should make sense without reading the whole article - be autonomous.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg> },
  { id: 'D5', label: 'Cost of Retrieval', medium: 'The harder it is for AI to find information in the text, the less likely it is to cite it. Headings, lists and tables reduce this cost.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7a4 4 0 010-8h2M15 7h2a4 4 0 010 8h-2M9 12h6" /></svg> },
  { id: 'D6', label: 'TF-IDF', medium: 'Checks if the article uses domain terminology. Lack of specialized terms signals AI: "this author does not know the topic deeply".', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35M8 11h6M8 8h4" /></svg> },
  { id: 'D7', label: 'Semantic Roles', medium: 'AI absorbs knowledge better when the article topic is an active subject in sentences - not a passive object described by others.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg> },
  { id: 'D8', label: 'AI Overview Coverage', medium: 'Each query is effectively several sub-queries at once. We check how many your article covers - because AI uses exactly those sub-queries for synthesis.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v4M8 12l-4 4M16 12l4 4M12 8l-4 4h8l-4-4" /></svg> },
  { id: 'D9', label: 'Editorial Effort', medium: 'Measures visible editorial effort: article length, images, video, tables and FAQ schema. AI models prefer polished content - not quick drafts.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 4-8" /></svg> },
  { id: 'E-E-A-T', label: 'E-E-A-T', medium: 'Google and AI models trust content backed by a real expert with experience. The report measures specific trust signals.', icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> },
];

/* ── Main ────────────────────────────────────────────────────────── */
export default function PageContentEN() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>How it works</p>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.85vw, 3.9rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 22, background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>How does CitationOne work?</h1>
            <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 36px' }}>CitationOne analyzes your article and answers one question: will AI models - ChatGPT, Perplexity and Google AI Overview - cite your content instead of the competition. It breaks the article into 10 quality dimensions, benchmarks against top 10 SERP and generates prioritized recommendations with ready-to-paste fixes.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Full report in ~3 minutes', '10 dimensions + E-E-A-T', 'Top 10 SERP benchmark', 'Before/After with ready fixes'].map((text) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 8, fontSize: 13, color: '#36394a' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />{text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 STEPS */}
      <section style={{ background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)', padding: '120px 0', clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)', margin: '-28px 0', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <span aria-hidden style={{ position: 'absolute', top: 36, left: 52, fontSize: 200, lineHeight: 1, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201C'}</span>
        <span aria-hidden style={{ position: 'absolute', bottom: 36, right: 52, fontSize: 200, lineHeight: 1, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201D'}</span>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 2 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.025em', margin: 0 }}>3 steps to your report</h2>
          </motion.div>
          <div className="steps-grid">
            {[
              { n: '1', title: 'Paste article URL', body: 'Enter the page address and keyword. The tool automatically fetches the content - no manual copy-paste. Choose: Full mode (with SERP benchmark, ~3 min) or Content-only (faster, ~30-60 sec, no competitor data).', icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg> },
              { n: '2', title: 'AI analyzes in parallel', body: '10 parallel AI calls simultaneously: 9 quality dimensions + E-E-A-T, plus algorithmic editorial effort score. In Full mode the tool crawls top 10 SERP, extracts entities from each article and builds a competition benchmark.', icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg> },
              { n: '3', title: 'Get your report', body: 'Report with prioritized Before/After recommendations - exact quote from your article and a ready-made fix with estimated score impact. Export to PDF for your client or Markdown for further work - one click.', icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.0}><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" /></svg> },
            ].map((step, i) => (
              <motion.div key={step.n} {...fadeUp(i * 0.13)} style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
                <motion.div whileHover={{ scale: 1.06, rotate: 3, transition: { type: 'spring', stiffness: 400, damping: 20 } }} style={{ width: 88, height: 88, borderRadius: 16, background: '#0b7983', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: 24 }}>{step.icon}</motion.div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#0b7983', background: 'rgba(11,121,131,0.1)', borderRadius: 4, padding: '2px 8px', letterSpacing: '0.05em' }}>STEP {step.n}</span>
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
              <SectionLabel>Main scores</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>One score instead of guesswork</h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}><strong>CQS (0-100)</strong> is an aggregated score from 10 dimensions - shows how far your content is from the standard AI likes to cite. <strong>AI Citability (0-10)</strong> measures the probability that a language model will choose your page over the competition.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Each of 10 dimensions with separate 0-10 score', 'Status at a glance: OK / WARNING / CRITICAL', 'Your score compared with top 10 SERP'].map(item => (<li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}><span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>-</span>{item}</li>))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}><ScoresVisual /></motion.div>
          </div>
        </div>
      </section>

      {/* 10 DIMENSIONS */}
      <section style={{ background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)', padding: '120px 0', clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)', margin: '-28px 0', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <span aria-hidden style={{ position: 'absolute', top: 36, left: 52, fontSize: 200, lineHeight: 1, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201C'}</span>
        <span aria-hidden style={{ position: 'absolute', bottom: 36, right: 52, fontSize: 200, lineHeight: 1, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none' }}>{'\u201D'}</span>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 2 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 14px' }}>10 dimensions + E-E-A-T</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: 14 }}>What exactly does the tool analyze?</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>Each dimension is a separate AI call with a dedicated prompt - separate 0-10 score, separate problems and separate recommendations.</p>
          </motion.div>
          <div className="dims-grid">
            {DIMS.map((dim, i) => (
              <motion.div key={dim.id} {...fadeUp(i * 0.04)} whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }} style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '20px 20px 18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: '#0b7983', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: 10 }}>{dim.icon}</div>
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

      {/* BENCHMARK */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}><div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}><div className="feat-grid"><motion.div {...fadeUp()}><SectionLabel>SERP Benchmark</SectionLabel><h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>See exactly where you fall behind</h2><p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>The tool automatically fetches and scores 10 articles currently ranking for your keyword. You see each competitor&#39;s CQS and the exact gap to close - no manual data collection.</p><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>{['CQS per article - tabular comparison', 'Identify SERP leaders and weak spots', 'Competitor content formats: tables, FAQ, lists'].map(item => (<li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}><span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>-</span>{item}</li>))}</ul></motion.div><motion.div {...fadeUp(0.12)}><BenchmarkVisual /></motion.div></div></div></section>

      {/* BEFORE/AFTER */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}><div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}><motion.div {...fadeUp()} style={{ marginBottom: 40 }}><SectionLabel>Before/After Recommendations</SectionLabel><h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>Not &ldquo;what to fix&rdquo; - but &ldquo;how to fix it&rdquo;</h2><p style={{ fontSize: 16, color: '#666d80', maxWidth: 600, lineHeight: 1.65, margin: '0 0 4px' }}>Each recommendation contains an exact quote from the article and a ready version after the fix. Zero interpretation: you paste, you don&#39;t rewrite. Each with priority and estimated CQS impact.</p></motion.div><motion.div {...fadeUp(0.1)}><BeforeAfterVisual /></motion.div></div></section>

      {/* AI OVERVIEW */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}><div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}><div className="feat-grid feat-grid-reverse"><motion.div {...fadeUp(0.1)}><AIOverviewVisual /></motion.div><motion.div {...fadeUp()}><SectionLabel>AI Overview Coverage</SectionLabel><h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>Google AI Overview is a synthesis of many sub-queries</h2><p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>AI Overview doesn&#39;t cite one article - it synthesizes answers to a dozen related sub-queries at once. The tool decomposes this synthesis and shows which sub-queries your content covers, and which gaps cause AI to skip you.</p><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>{['AI Overview synthesis decomposed into sub-queries', 'Coverage map: which sub-queries you handle', 'Recommendations to fill gaps with specific content'].map(item => (<li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}><span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>-</span>{item}</li>))}</ul></motion.div></div></div></section>

      {/* KNOWLEDGE GRAPH */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}><div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}><div className="feat-grid"><motion.div {...fadeUp()}><SectionLabel>Knowledge Graph (EAV)</SectionLabel><h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>AI sees entities - not just keywords</h2><p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>Language models build knowledge representation from facts - entities and their attributes. The report maps these relationships and shows which facts set you apart from competition (<strong>Unique</strong>), which are must-have (<strong>Root</strong>) and which you&#39;re missing.</p><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>{['Full entity table with Unique/Root/Rare classification', 'Coverage map: covered / gap / unique', 'Interactive knowledge graph in the app'].map(item => (<li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}><span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>-</span>{item}</li>))}</ul></motion.div><motion.div {...fadeUp(0.12)}><KnowledgeGraphVisual /></motion.div></div></div></section>

      {/* EXPORT */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}><div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}><div className="feat-grid feat-grid-reverse"><motion.div {...fadeUp(0.1)}><ExportVisual /></motion.div><motion.div {...fadeUp()}><SectionLabel>Report export</SectionLabel><h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>Report ready to send to your client</h2><p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>PDF designed for presentation - all report sections in readable format without additional editing. Markdown for project documentation or automated processing.</p><div style={{ display: 'flex', gap: 12 }}>{[{ fmt: 'PDF', desc: 'Ready to send', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> }, { fmt: 'Markdown', desc: 'For documentation', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> }].map(f => (<div key={f.fmt} style={{ flex: 1, background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 8, padding: '16px', textAlign: 'center' }}><div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{f.icon}</div><p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: '0 0 2px' }}>{f.fmt}</p><p style={{ fontSize: 11.5, color: '#818898', margin: 0 }}>{f.desc}</p></div>))}</div></motion.div></div></div></section>

      {/* QUICK WINS */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 36 }}>
            <SectionLabel>Quick Wins</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>Instant fixes - right after the audit</h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 640, lineHeight: 1.65 }}>Up to 7 ready-made fixes generated algorithmically (no extra AI calls). Each with a source badge and a link to the dimension that detected it. You know what to fix before reading the full report.</p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {[
              { badge: 'Effort', color: '#CA8A04', text: 'Add a comparison table - competitors use it in 7/10 articles' },
              { badge: 'Title', color: '#0891b2', text: 'Shorten title to 60 characters (currently 78)' },
              { badge: 'EEAT', color: '#7c3aed', text: 'Add last updated date and author bio' },
              { badge: 'Fan-Out', color: ACCENT, text: 'Cover sub-query "how to measure results"' },
              { badge: 'Schema', color: '#DC2626', text: 'Add FAQPage schema - you have a FAQ section' },
              { badge: 'TF-IDF', color: '#CA8A04', text: 'Add missing terms: "conversion", "retention"' },
            ].map((qw) => (
              <div key={qw.text} style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: qw.color, background: `${qw.color}15`, border: `1px solid ${qw.color}30`, borderRadius: 4, padding: '3px 8px', flexShrink: 0, whiteSpace: 'nowrap' }}>{qw.badge}</span>
                <span style={{ fontSize: 13, color: '#36394a', lineHeight: 1.5 }}>{qw.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SCHEMA.ORG AUDIT */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Schema.org</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>Structured data audit</h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 16 }}>Algorithmic analysis of schema.org JSON-LD (0 AI calls). Detects ~14 schema types, checks field completeness and flags missing required schemas with priority.</p>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65 }}>Article, FAQPage, Product, HowTo, Review, BreadcrumbList, WebPage, Organization, Person, AggregateRating - each with required and recommended fields. Status: present / incomplete / missing. Google Rich Result eligibility.</p>
            </motion.div>
            <motion.div {...fadeUp(0.12)}>
              <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#0d0d12' }}>Schema.org Audit</span>
                </div>
                {[
                  { type: 'Article', status: 'incomplete', missing: 'dateModified, author.url' },
                  { type: 'FAQPage', status: 'missing', missing: 'entire schema' },
                  { type: 'BreadcrumbList', status: 'present', missing: '' },
                  { type: 'WebPage', status: 'missing', missing: 'entire schema' },
                  { type: 'Organization', status: 'present', missing: '' },
                ].map((s) => {
                  const c = s.status === 'present' ? '#16A34A' : s.status === 'incomplete' ? '#CA8A04' : '#DC2626';
                  const l = s.status === 'present' ? 'OK' : s.status === 'incomplete' ? 'Incomplete' : 'Missing';
                  return (
                    <div key={s.type} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', borderBottom: '1px solid #f0f0f3' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#0d0d12', width: 120, flexShrink: 0 }}>{s.type}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: c, background: `${c}12`, border: `1px solid ${c}25`, borderRadius: 4, padding: '2px 7px' }}>{l}</span>
                      {s.missing && s.status !== 'present' && <span style={{ fontSize: 11, color: '#a4acb9', marginLeft: 'auto' }}>{s.missing}</span>}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INFORMATION GAIN */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid feat-grid-reverse">
            <motion.div {...fadeUp(0.12)}>
              <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '20px 18px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em' }}>IG Score</span>
                  <span style={{ fontSize: 28, fontWeight: 700, color: ACCENT, lineHeight: 1 }}>68</span>
                  <span style={{ fontSize: 13, color: '#a4acb9' }}>/ 100</span>
                </div>
                {[
                  { label: 'Unique claims', pct: 72, color: ACCENT },
                  { label: 'Unique EAV', pct: 61, color: '#0891b2' },
                  { label: 'Unique TF-IDF terms', pct: 55, color: '#CA8A04' },
                  { label: 'Format advantage', pct: 80, color: '#16A34A' },
                ].map((bar) => (
                  <div key={bar.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: '#818898' }}>{bar.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: bar.color }}>{bar.pct}%</span>
                    </div>
                    <div style={{ height: 4, background: '#eceff3', borderRadius: 2, overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ height: '100%', background: bar.color, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp()}>
              <SectionLabel>Information Gain</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>How much unique value does your content bring?</h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 16 }}>Information Gain measures content uniqueness vs SERP competition. Does not affect CQS - purely informational metric. Extracts 10-20 factual claims and compares with competitor content (token overlap).</p>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65 }}>IG Score (0-100) consists of 4 components: claim uniqueness (40%), unique EAV triples (30%), unique TF-IDF terms (20%) and format advantage (10%). Each claim marked with a unique or common badge.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0b7983 0%, #268f9a 100%)', padding: '96px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div {...fadeUp()}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 18 }}>Check if your content<br />is ready for AI Search.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 36 }}>First audit takes ~3 minutes. Report ready to send to your client right after completion.</p>
            <motion.a href={`${APP_URL}/login?lang=en`} whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 33px', borderRadius: 8, background: '#ffffff', color: '#0b7983', fontWeight: 700, fontSize: 16, textDecoration: 'none', letterSpacing: '-0.01em' }}>Run audit</motion.a>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 18 }}>No subscription · VAT invoice · Bank transfer</p>
          </motion.div>
        </div>
      </section>

      <style>{`
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .dims-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
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
