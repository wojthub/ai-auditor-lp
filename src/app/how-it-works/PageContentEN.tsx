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
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{children}</span>
      <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
    </div>
  );
}

/* ── Score cards: CQS + Citability ───── */
function BenchmarkBar({ label, value, max, color, bold }: {
  label: string; value: number; max: number; color: string; bold?: boolean;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: bold ? '#0d0d12' : '#666d80', fontWeight: bold ? 700 : 400 }}>{label}</span>
        <span style={{ fontSize: 13, color: bold ? '#0d0d12' : '#a4acb9', fontWeight: bold ? 700 : 400 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: '#eceff3', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

const SCORE_CARDS = [
  {
    scale: 'SCALE 0 – 10',
    title: 'AI Citability Score',
    desc: 'The probability that AI engines will cite your text in the answer they show the user.',
    score: 4.9, max: 10, color: '#B91C1C',
    rows: [
      { label: 'Low threshold', value: 2.1, bold: false },
      { label: 'Your score', value: 4.9, bold: true },
      { label: 'SERP leader', value: 8.3, bold: false },
    ],
  },
  {
    scale: 'SCALE 0 – 100',
    title: 'CQS · Content Quality Score',
    desc: 'Aggregated score across 10 quality dimensions + E-E-A-T, benchmarked against the Top 10 SERP competition.',
    score: 78, max: 100, color: '#CA8A04',
    rows: [
      { label: 'SERP average', value: 42, bold: false },
      { label: 'Your score', value: 78, bold: true },
      { label: 'SERP leader', value: 91, bold: false },
    ],
  },
];

/* ── Visual: Benchmark SERP ───────────────────────────────────────────── */
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
        <p style={{ fontSize: 12, color: ACCENT, margin: 0, fontWeight: 500 }}>↑ 16 pts to leader position - the report shows exactly what to change</p>
      </div>
    </div>
  );
}

/* ── Visual: Before / After ─────────────────────────────────────────────── */
function BeforeAfterVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>Before</span>
          <p style={{ fontSize: 12.5, color: '#9ca3af', lineHeight: 1.6, margin: 0, textDecoration: 'line-through' }}>
            AI optimization is important because language models pick content based on their own criteria.
          </p>
        </div>
        <div style={{ background: 'rgba(11,121,131,0.04)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>After</span>
          <p style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: ACCENT }}>CitationOne</strong> measures 10 AI citation dimensions - each with estimated CQS impact and a specific fix ready to paste.
          </p>
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

/* ── Visual: AI Overview ──────────────────────────────────────────────── */
const AIO_ITEMS = [
  { q: 'what is an AI Search audit', covered: true },
  { q: 'how does Google AI Overview work', covered: true },
  { q: 'what metrics does an AI audit measure', covered: false },
  { q: 'SEO vs AI Search difference', covered: false },
  { q: 'how to improve citability score', covered: true },
];
function AIOverviewVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: 4, background: 'linear-gradient(135deg, #4285f4, #34a853)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>G</span>
        </div>
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
              {sq.covered
                ? <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" /></svg>
              }
            </div>
            <span style={{ fontSize: 12, color: sq.covered ? '#36394a' : '#a4acb9', lineHeight: 1.4 }}>{sq.q}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: sq.covered ? '#16A34A' : '#DC2626', background: sq.covered ? 'rgba(22,163,74,0.07)' : 'rgba(220,38,38,0.07)', borderRadius: 4, padding: '2px 7px', flexShrink: 0 }}>
              {sq.covered ? 'covered' : 'gap'}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 18px', borderTop: '1px solid #eceff3', background: '#f8fafb' }}>
        <p style={{ fontSize: 11, color: '#818898', margin: 0 }}>2 gaps - the report tells you what to write to cover the missing sub-queries</p>
      </div>
    </div>
  );
}

/* ── Visual: Knowledge Graph ─────────────────────────────────────────── */
const EAV_ENTITIES = [
  { entity: 'AI Search', attr: 'algorithm', value: 'language models', type: 'Root' },
  { entity: 'BLUF', attr: 'definition', value: 'Bottom Line Up Front', type: 'Unique' },
  { entity: 'ChatGPT', attr: 'type', value: 'language model', type: 'Root' },
  { entity: 'CQS', attr: 'range', value: '0–100', type: 'Unique' },
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
        {Object.entries(TYPE_STYLES).map(([type, s]) => (
          <span key={type} style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.05em' }}>{type}</span>
        ))}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ background: '#f8fafb' }}>
            {['Entity', 'Attribute', 'Value', 'Type'].map(h => (
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
  'Content Quality Score (0–100) with dimension breakdown',
  'AI Citability Score (0–10)',
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
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: 0 }}>AI Search Audit Report</p>
          <p style={{ fontSize: 11, color: '#a4acb9', margin: 0 }}>example-article.com · keyword: AI audit</p>
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
    id: 'CSI-A', label: 'Intent Alignment',
    medium: 'Checks whether the article answers exactly the question the user asked - not a similar one, but exactly that one.',
  },
  {
    id: 'D1', label: 'Info Density',
    medium: 'Measures how many facts are in the article. Generalities and empty sentences lower the score - concrete data and numbers raise it.',
  },
  {
    id: 'D2', label: 'Knowledge Graph',
    medium: 'AI sees the article as a network of facts: Entity - Attribute - Value. The more complete the network, the higher the chance of citation.',
  },
  {
    id: 'D3', label: 'BLUF',
    medium: 'AI models favor articles that give the answer at the beginning of every section. Not at the end, not after an intro - right at the start.',
  },
  {
    id: 'D4', label: 'Chunks',
    medium: 'AI systems split articles into chunks before analysis. Each chunk should make sense without reading the whole article - it should be autonomous.',
  },
  {
    id: 'D5', label: 'Cost of Retrieval',
    medium: 'The harder it is for AI to find information in the text, the lower the chance of citation. Headings, lists and tables reduce this cost.',
  },
  {
    id: 'D6', label: 'TF-IDF',
    medium: 'Checks whether the article uses domain terminology. Lack of specialized terms signals to AI: "this author doesn\'t know the topic deeply".',
  },
  {
    id: 'D7', label: 'Semantic Roles',
    medium: 'AI absorbs knowledge better when the article topic is an active subject in sentences - not a passive object described by others.',
  },
  {
    id: 'D8', label: 'AIO Coverage',
    medium: 'Each query is effectively several sub-queries at once. We check how many your article covers - because AI uses exactly those sub-queries for synthesis.',
  },
  {
    id: 'D9', label: 'Editorial Effort',
    medium: 'Measures visible editorial effort: article length, images, video, tables and FAQ schema. AI models prefer polished content - not quick drafts.',
  },
  {
    id: 'E-E-A-T', label: 'E-E-A-T',
    medium: 'Google and AI models trust content backed by a real expert with experience. The report measures specific trust signals.',
  },
];

/* ── Main page ────────────────────────────────────────────────────────── */
export default function PageContentEN() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>How it works</span>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            </div>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.85vw, 3.9rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 22,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              Discover the mechanism that opens the door to AI Search
            </h1>
            <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 36px' }}>
              See how, in under 3 minutes, CitationOne scans your text and turns complex algorithmic analysis into clear editorial guidelines. No complex integration, no changes to your site&apos;s code.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { text: 'Full report in ~3 minutes' },
                { text: '10 dimensions + E-E-A-T' },
                { text: 'Top 10 SERP benchmark' },
                { text: 'Before/After with ready fixes' },
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

      {/* 3 STEPS */}
      <section style={{ background: '#f8fafb', padding: '90px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>3 steps</span>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', margin: 0 }}>
              From pasted text to ready guidelines in 180 seconds
            </h2>
          </motion.div>
          <div className="steps-grid">
            {[
              {
                n: '01', color: '#e07a4a',
                title: 'Enter your data',
                body: 'Paste a link to an already published article or a draft you plan to add to the site. Type in the keyword you want to win citations for in AI Search.',
              },
              {
                n: '02', color: '#0b7983',
                title: 'The algorithm runs a Top 10 SERP benchmark',
                body: 'In under 3 minutes CitationOne fetches and analyzes your content. At the same time it inspects the 10 top-ranking competitor pages. The tool compares your material with the market leaders across 10 quality dimensions and E-E-A-T signals.',
              },
              {
                n: '03', color: '#c47a2a',
                title: 'Receive a ready "Quick Wins" list',
                body: 'The system generates a complete report. You don\'t get generic advice - you get a precise action plan. The tool points to specific paragraphs to fix and gives ready structural guidelines for your editors.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                {...fadeUp(i * 0.13)}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  color: step.color,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 20,
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: 10 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: '#36394a', lineHeight: 1.65, margin: 0 }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CQS + CITABILITY */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 40, maxWidth: 760 }}>
            <SectionLabel>Main scores</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
              Hard data that translates into citations
            </h2>
            <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 16px' }}>
              Your CitationOne report isn&apos;t based on guesswork. The audit result comes as two precise indicators: <strong>CQS (0–100)</strong> - a mathematical sum of points across 10 quality dimensions, and <strong>AI Citability Score (0–10)</strong> - a direct measure of the probability that AI will pick your page as an authoritative source.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Each of 10 dimensions with a separate 0-10 score', 'Status at a glance: OK / WARNING / CRITICAL', 'Your score compared with top 10 SERP'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#36394a', lineHeight: 1.65 }}>
                  <span style={{ width: 14, height: 2, background: ACCENT, flexShrink: 0, marginTop: 9, borderRadius: 1 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="scores-cards-grid">
            {SCORE_CARDS.map((card, ci) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: ci * 0.1 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dfe1e7',
                  borderRadius: 14,
                  padding: '24px 26px 26px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 11, fontWeight: 500,
                    color: '#818898',
                    border: '1px solid #dfe1e7',
                    borderRadius: 100,
                    padding: '3px 10px',
                    letterSpacing: '0.04em',
                  }}>
                    {card.scale}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                    <span style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 700, color: card.color, lineHeight: 1, letterSpacing: '-0.04em' }}>
                      {card.score}
                    </span>
                    <span style={{ fontSize: 13, color: '#a4acb9', fontWeight: 500 }}>/ {card.max}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 6px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 13, color: '#666d80', lineHeight: 1.55, margin: '0 0 18px' }}>
                  {card.desc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {card.rows.map(row => (
                    <BenchmarkBar
                      key={row.label}
                      label={row.label}
                      value={row.value}
                      max={card.max}
                      color={row.bold ? card.color : '#dde1e8'}
                      bold={row.bold}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 DIMENSIONS */}
      <section style={{ background: '#ffffff', padding: '90px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>10 dimensions + E-E-A-T</span>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              What exactly does the tool analyze?
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
              Each dimension is a separate AI call with a dedicated prompt - separate 0-10 score, separate problems and separate recommendations.
            </p>
          </motion.div>
          <div className="dims-grid">
            {DIMS.map((dim, i) => (
              <motion.div
                key={dim.id}
                {...fadeUp(i * 0.04)}
                whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '22px 22px 20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: 0 }}>{dim.label}</h3>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{dim.id}</span>
                </div>
                <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>{dim.medium}</p>
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
              <SectionLabel>SERP Benchmark</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                See whether - and why - you fall behind the leaders
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                CitationOne automatically fetches and analyzes the 10 top-ranking pages for your chosen keyword. We benchmark your content against real competition so we can pinpoint the exact optimization gap.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Tabular CQS comparison for every analyzed page', 'Identify leaders and weak spots in the current SERP', 'Analysis of structure and format of the top-rated content'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#36394a', lineHeight: 1.65 }}>
                    <span style={{ width: 14, height: 2, background: ACCENT, flexShrink: 0, marginTop: 9, borderRadius: 1 }} />
                    <span>{item}</span>
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
            <SectionLabel>Before / After recommendations</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Concrete recommendations with measurable CQS impact
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 600, lineHeight: 1.65, margin: '0 0 4px' }}>
              Forget vague tips. CitationOne points to the exact content fragments that need optimization and provides ready &ldquo;Before / After&rdquo; versions. You see the estimated score uplift for each change, so you only roll out the fixes that build your authority in AI Search the fastest.
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
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Google AI Overview is a synthesis of many sub-queries
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                AI Overview doesn&apos;t cite one article - it synthesizes answers to a dozen related sub-queries at once. The tool decomposes that synthesis and shows which sub-queries your content covers, and which gaps cause AI to skip you.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['AI Overview synthesis decomposed into sub-queries', 'Coverage map: which sub-queries you handle', 'Recommendations to fill the gaps with specific content'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#36394a', lineHeight: 1.65 }}>
                    <span style={{ width: 14, height: 2, background: ACCENT, flexShrink: 0, marginTop: 9, borderRadius: 1 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE GRAPH */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Knowledge Graph (EAV)</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                AI sees entities - not just keywords
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                Language models build a knowledge representation from facts - entities and their attributes. The report maps these relationships and shows which facts set you apart from the competition (<strong>Unique</strong>), which are must-have (<strong>Root</strong>) and which you&apos;re missing.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Full entity table with Unique / Root / Rare classification', 'Coverage map: covered / gap / unique', 'Interactive knowledge graph in the app'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#36394a', lineHeight: 1.65 }}>
                    <span style={{ width: 14, height: 2, background: ACCENT, flexShrink: 0, marginTop: 9, borderRadius: 1 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}><KnowledgeGraphVisual /></motion.div>
          </div>
        </div>
      </section>

      {/* EXPORT */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid feat-grid-reverse">
            <motion.div {...fadeUp(0.1)}><ExportVisual /></motion.div>
            <motion.div {...fadeUp()}>
              <SectionLabel>Report export</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                A tool built for smooth team workflows
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                You can download and ship every audit instantly. <strong>PDF Report</strong> - a readable, jargon-free summary ready to send to your client. <strong>Markdown file</strong> - a ready set of structural guidelines for copywriters and editors. <strong>&ldquo;Quick Wins&rdquo; plan</strong> - a curated list of fixes that will lift content quality in AI&apos;s eyes in one go.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { fmt: 'PDF', desc: 'Ready to send', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
                  { fmt: 'Markdown', desc: 'For documentation', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
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

      {/* QUICK WINS */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 36 }}>
            <SectionLabel>Quick Wins</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Instant fixes - right after the audit
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 640, lineHeight: 1.65 }}>
              Up to 7 ready-made fixes generated algorithmically (no extra AI calls). Each with a source badge and a link to the dimension that detected it. You know what to fix before you read the full report.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {[
              { badge: 'Effort', color: '#CA8A04', text: 'Add a comparison table - competitors use one in 7/10 articles' },
              { badge: 'Title', color: '#0891b2', text: 'Shorten the title to 60 characters (currently 78)' },
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
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Structured data audit
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 16 }}>
                Algorithmic analysis of schema.org JSON-LD (0 AI calls). Detects ~14 schema types, checks field completeness and flags missing required schemas with priority.
              </p>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65 }}>
                Article, FAQPage, Product, HowTo, Review, BreadcrumbList, WebPage, Organization, Person, AggregateRating - each with its list of required and recommended fields. Status: present / incomplete / missing. Google Rich Result eligibility.
              </p>
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
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                How much unique value does your content bring?
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 16 }}>
                Information Gain measures content uniqueness vs SERP competition. It doesn&apos;t affect CQS - it&apos;s purely an informational metric. Extracts 10-20 factual claims and compares them with competitor content (token overlap).
              </p>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65 }}>
                IG Score (0-100) is made up of 4 components: claim uniqueness (40%), unique EAV triples (30%), unique TF-IDF terms (20%) and format advantage (10%). Each claim marked with a unique or common badge.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#ffffff', padding: '90px 0', borderTop: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div {...fadeUp()}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 10,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              Get traffic from AI Search.
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
              fontWeight: 500,
              color: '#36394a',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              marginBottom: 24,
            }}>
              Check your content now.
            </p>
            <p style={{ fontSize: 17, color: '#666d80', lineHeight: 1.68, maxWidth: 480, margin: '0 auto 36px' }}>
              Join the teams already optimizing content for AI Search.
            </p>
            <motion.a
              href={`${APP_URL}/login?lang=en`}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '15px 36px',
                borderRadius: 8,
                background: '#0b7983',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
              }}
            >
              Run audit
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
            <p style={{ fontSize: 13, color: '#a4acb9', marginTop: 16 }}>
              The first 3 audits are completely free. Sign-up takes less than a minute.
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
        .scores-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .feat-grid-reverse > *:first-child { order: 1; }
        .feat-grid-reverse > *:last-child  { order: 0; }
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr; gap: 14px; }
          .dims-grid  { grid-template-columns: 1fr; }
          .feat-grid  { grid-template-columns: 1fr; gap: 36px; }
          .feat-grid-reverse > * { order: unset !important; }
          .scores-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
