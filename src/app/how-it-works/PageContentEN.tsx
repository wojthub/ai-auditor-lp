'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroBackdrop from '@/components/HeroBackdrop';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';
// Kolory numerow kafelkow — te same co na hubie wymiarow (WymiaryContent / DimensionsContent).
const NUM_COLORS = ['#e07a4a', '#0b7983', '#c47a2a'];

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

/* ── Visual: Competition (Google + ChatGPT) ───────────────────────────── */
// The „Competition" block from the app, trimmed for the LP — it carries TWO sources:
// the Google Top 10 SERP and the citations from ChatGPT's answer to the same phrase,
// hence a source heading above each part (1:1 with the report). Same columns and the same
// score coloring, so the user recognizes the screen they get after purchase.
// Neutral domains: we never show real clients or real competitors.
const SERP_HEAD = { phrase: 'best wireless earbuds' };
const SERP_LABELS = ['POS.', 'URL', 'WORDS', 'CQS'];
const SERP_STATS = [
  { value: '47', label: 'Avg. SERP CQS' },
  { value: '2091', label: 'Avg. words' },
];
// ChatGPT section: status on one line + the pages the model cited. A citation (a link
// in the answer) and a mention (the brand name in the text) are TWO independent signals.
const LLM_STATUS = [
  { label: 'Your page', value: 'cited', ok: true },
  { label: 'Brand mention', value: 'present', ok: true },
];
const LLM_SOURCES = ['competitor-a.com/best-earbuds', 'yoursite.com/blog/best-earbuds-2026', 'competitor-e.com/earbuds-test'];
const SERP_ROWS = [
  { pos: '1', url: 'competitor-a.com/best-earbuds', words: '2708', cqs: 73 },
  { pos: '2', url: 'competitor-b.com/wireless-earbuds', words: '3792', cqs: 69 },
  { pos: '4', url: 'competitor-c.com/category/audio', words: '283', cqs: 19 },
  { pos: '6', url: 'competitor-d.com/guides/earbuds', words: '3029', cqs: 70 },
  { pos: '★', url: 'yoursite.com/blog/best-earbuds-2026', words: '5634', cqs: 70, mine: true },
];
// Source heading inside the „Competition" block — one source, one heading.
// Icon 1:1 with the Hero and AIOverviewVisual: a file from public/logos, empty alt +
// aria-hidden, because the provider name sits right next to it in the text.
function SourceHeading({ logo, children }: { logo: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
      <img src={logo} alt="" aria-hidden width={16} height={16} style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: '#36394a', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{children}</span>
    </div>
  );
}
function BenchmarkVisual() {
  // Prog koloru 1:1 z raportem: ponizej 60 CQS czerwony, wyzej bursztyn.
  const pill = (ok: boolean) => ({
    fontSize: 11.5, fontWeight: 700, borderRadius: 5, padding: '2px 8px', justifySelf: 'end',
    color: ok ? '#CA8A04' : '#DC2626',
    background: ok ? 'rgba(202,138,4,0.10)' : 'rgba(220,38,38,0.10)',
  });
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '18px 18px 10px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0d0d12' }}>Competition</span>
        <span style={{ fontSize: 12, color: '#818898' }}>for &bdquo;{SERP_HEAD.phrase}&rdquo;</span>
      </div>

      <SourceHeading logo="/logos/google.png">Google &middot; Top 10 SERP</SourceHeading>

      <div style={{ display: 'flex', gap: 22, marginBottom: 18, flexWrap: 'wrap' }}>
        {SERP_STATS.map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0d0d12', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#818898', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '26px 1fr 46px 40px', gap: 8, paddingBottom: 8, borderBottom: '1px solid #eceff3' }}>
        {SERP_LABELS.map((h, i) => (
          <span key={h} style={{ fontSize: 10, fontWeight: 600, color: '#a4acb9', letterSpacing: '0.06em', textAlign: i > 1 ? 'right' : 'left' }}>{h}</span>
        ))}
      </div>

      {SERP_ROWS.map((row, i) => (
        <motion.div
          key={row.url}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
          style={{
            display: 'grid', gridTemplateColumns: '26px 1fr 46px 40px', gap: 8,
            alignItems: 'center', padding: '9px 0',
            borderBottom: i === SERP_ROWS.length - 1 ? 'none' : '1px solid #f4f6f8',
            background: row.mine ? 'rgba(11,121,131,0.05)' : 'transparent',
            borderTop: row.mine ? '1px solid rgba(11,121,131,0.25)' : undefined,
          }}
        >
          <span style={{ fontSize: 12, color: row.mine ? ACCENT : '#a4acb9', fontWeight: row.mine ? 700 : 400 }}>{row.pos}</span>
          <span style={{
            fontSize: 12, color: row.mine ? ACCENT : '#36394a', fontWeight: row.mine ? 600 : 400,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{row.url}</span>
          <span style={{ fontSize: 11.5, color: '#818898', textAlign: 'right' }}>{row.words}</span>
          <span style={pill(row.cqs >= 60)}>{row.cqs}</span>
        </motion.div>
      ))}

      <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid #eceff3' }}>
        <SourceHeading logo="/logos/chatgpt.png">ChatGPT</SourceHeading>

        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 14 }}>
          {LLM_STATUS.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 13, fontWeight: 700, color: s.ok ? ACCENT : '#DC2626', lineHeight: 1.2 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#818898', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 10, fontWeight: 600, color: '#a4acb9', letterSpacing: '0.06em', marginBottom: 6 }}>SOURCES IN THE ANSWER</div>
        {LLM_SOURCES.map((src, i) => {
          const mine = src.startsWith('yoursite.com');
          return (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0',
                borderBottom: i === LLM_SOURCES.length - 1 ? 'none' : '1px solid #f4f6f8',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: mine ? ACCENT : '#a4acb9', flexShrink: 0 }} />
              <span style={{
                fontSize: 12, color: mine ? ACCENT : '#36394a', fontWeight: mine ? 600 : 400,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{src}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Visual: Before / After ─────────────────────────────────────────────── */
function BeforeAfterVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: 'rgba(185,28,28,0.04)', border: '1px solid #dfe1e7', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#B91C1C', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>Before</span>
          <p style={{ fontSize: 12.5, color: '#818898', lineHeight: 1.6, margin: 0, textDecoration: 'line-through' }}>
            AI optimization is important because language models pick content based on their own criteria.
          </p>
        </div>
        <div style={{ background: 'rgba(21,128,61,0.04)', border: '1px solid #dfe1e7', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>After</span>
          <p style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: ACCENT }}>CitationOne</strong> measures <Link href="/dimensions" style={{ color: ACCENT, textDecoration: 'underline', textUnderlineOffset: 2 }}>10 AI citation dimensions</Link> - each with estimated CQS impact and a specific fix ready to paste.
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
  { q: 'how to improve your Content Quality Score', covered: true },
];
function AIOverviewVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src="/logos/google.png"
          alt=""
          aria-hidden
          width={18}
          height={18}
          style={{ width: 18, height: 18, display: 'block', flexShrink: 0 }}
        />
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
  'Radar chart of 10 dimensions',
  'Competitor analysis - Google Top 10 SERP and ChatGPT citations',
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
    num: '01', id: 'CSI Alignment', slug: 'csi-alignment', label: 'CSI Alignment',
    medium: 'Checks whether the article answers exactly the question the user asked - not a similar one, but exactly that one.',
  },
  {
    num: '02', id: 'Density', slug: 'information-density', label: 'Information Density',
    medium: 'Measures how many facts are in the article. Generalities and empty sentences lower the score - concrete data and numbers raise it.',
  },
  {
    num: '03', id: 'EAV', slug: 'knowledge-graph-eav', label: 'Knowledge Graph',
    medium: 'AI sees the article as a network of facts: Entity - Attribute - Value. The more complete the network, the higher the chance of citation.',
  },
  {
    num: '04', id: 'BLUF', slug: 'bluf', label: 'BLUF',
    medium: 'AI models favor articles that give the answer at the beginning of every section. Not at the end, not after an intro - right at the start.',
  },
  {
    num: '05', id: 'Chunk', slug: 'chunk-optimization', label: 'Chunk Optimization',
    medium: 'AI systems split articles into chunks before analysis. Each chunk should make sense without reading the whole article - it should be autonomous.',
  },
  {
    num: '06', id: 'CoR', slug: 'cost-of-retrieval', label: 'Cost of Retrieval',
    medium: 'The harder it is for AI to find information in the text, the lower the chance of citation. Headings, lists and tables reduce this cost.',
  },
  {
    num: '07', id: 'TF-IDF', slug: 'tf-idf', label: 'TF-IDF',
    medium: 'Checks whether the article uses domain terminology. Lack of specialized terms signals to AI: "this author doesn\'t know the topic deeply".',
  },
  {
    num: '08', id: 'SRL', slug: 'semantic-roles', label: 'Semantic Roles',
    medium: 'AI absorbs knowledge better when the article topic is an active subject in sentences - not a passive object described by others.',
  },
  {
    num: '09', id: 'Fan-Out', slug: 'query-fan-out', label: 'Fan-Out & AIO Coverage',
    medium: 'Each query is effectively several sub-queries at once. We check how many your article covers - because AI uses exactly those sub-queries for synthesis.',
  },
  {
    num: '10', id: 'Effort', slug: 'effort-score', label: 'Effort Score',
    medium: 'Measures visible editorial effort: article length, images, video, tables and FAQ schema. AI models prefer polished content - not quick drafts.',
  },
  {
    num: '', id: 'E-E-A-T', slug: 'e-e-a-t', label: 'E-E-A-T',
    medium: 'Google and AI models trust content backed by a real expert with experience. The report measures specific trust signals.',
  },
];

/* ── Main page ────────────────────────────────────────────────────────── */
export default function PageContentEN() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #eceff3', position: 'relative', overflow: 'hidden' }}>
        <HeroBackdrop />
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center', position: 'relative' }}>
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
              See how, in under 5 minutes, CitationOne scans your text and turns complex algorithmic analysis into clear editorial guidelines. No complex integration, no changes to your site&apos;s code.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { text: 'Full report in ~5 minutes' },
                { text: '10 dimensions + E-E-A-T' },
                { text: 'Competitor analysis' },
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
              From pasted text to ready guidelines in 5 minutes
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
                title: 'The algorithm analyzes your competition in Google and ChatGPT',
                body: 'In under 5 minutes CitationOne fetches and analyzes your content. At the same time it inspects the 10 top-ranking competitor pages and asks ChatGPT about the same phrase to see which sources the model names. The tool compares your material with the market leaders across 10 quality dimensions and E-E-A-T signals.',
              },
              {
                n: '03', color: '#c47a2a',
                title: 'Receive a ready Before / After list',
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
              Each dimension is scored on its own - separate 0-10 score, separate problems and separate recommendations.
            </p>
          </motion.div>
          <div className="dims-grid">
            {DIMS.map((dim, i) => (
              <motion.a
                key={dim.id}
                href={`/dimensions/${dim.slug}`}
                {...fadeUp(i * 0.04)}
                whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{
                  background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10,
                  padding: '22px 22px 20px', display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start', textDecoration: 'none',
                }}
              >
                {dim.num && (
                  <div style={{
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: NUM_COLORS[i % 3],
                    letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 18,
                  }}>
                    {dim.num}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: 0 }}>{dim.label}</h3>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{dim.id}</span>
                </div>
                <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 14px' }}>{dim.medium}</p>
                <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginTop: 'auto' }}>How we measure it →</span>
              </motion.a>
            ))}
          </div>

          {/* Entry point to the dimension subpages — with „Dimensions" gone from the top nav,
              this is the main path to them from the content. */}
          <motion.div {...fadeUp(0.1)} style={{ textAlign: 'center', marginTop: 36 }}>
            <a
              href="/dimensions"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 15, fontWeight: 600, color: '#0b7983', textDecoration: 'none',
                border: '1px solid #dfe1e7', borderRadius: 8, padding: '12px 24px', minHeight: 44,
              }}
            >
              Explore all dimensions - definitions and how each is scored
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* BENCHMARK SERP */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Competitor analysis</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                See whether - and why - you fall behind the leaders
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                CitationOne queries two independent sources about your phrase. From Google it fetches and analyzes the 10 top-ranking pages; ChatGPT it asks about that same phrase, checking whether your page shows up in the answer. You see the optimization gap against real competition in search and in AI Search at once.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Tabular CQS comparison for every analyzed page', 'Identify leaders and weak spots in the current SERP', "ChatGPT's answer to your phrase: whether you are cited and mentioned, and which pages the model gave as sources", 'Analysis of structure and format of the top-rated content'].map(item => (
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
              Up to 7 ready-made fixes generated algorithmically. Each with a source badge and a link to the dimension that detected it. You know what to fix before you read the full report.
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
                Algorithmic analysis of schema.org JSON-LD. Detects 31 schema types, checks field completeness and flags missing required schemas with priority.
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
