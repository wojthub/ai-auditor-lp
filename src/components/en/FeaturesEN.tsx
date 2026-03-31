'use client';

import { motion } from 'framer-motion';

const ACCENT = '#0b7983';

function SectionLabel({ children }: { children: string }) {
  return <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>{children}</p>;
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };
}

const DIMS = [
  { name: 'Intent Alignment', score: 8.1, desc: 'Match with search intent' },
  { name: 'Info Density', score: 7.4, desc: 'Facts-to-filler ratio' },
  { name: 'BLUF', score: 9.0, desc: 'Key answer upfront in each section' },
  { name: 'Knowledge Graph', score: 6.8, desc: 'Entity-attribute-value coverage' },
  { name: 'Chunks', score: 7.9, desc: 'Section autonomy for RAG' },
  { name: 'Cost of Retrieval', score: 3.8, desc: 'Ease of AI information extraction' },
  { name: 'TF-IDF', score: 7.2, desc: 'Domain terminology saturation' },
  { name: 'AIO Coverage', score: 8.3, desc: 'AI Overview sub-query coverage' },
  { name: 'Editorial Effort', score: 5.1, desc: 'Structure, media, formatting' },
  { name: 'E-E-A-T', score: 6.5, desc: 'Experience, expertise, authority' },
];

function DimensionsVisual() {
  return (
    <div className="dims-grid">
      {DIMS.map((d) => {
        const pct = (d.score / 10) * 100;
        const color = d.score >= 7 ? '#16A34A' : d.score >= 5 ? '#CA8A04' : '#DC2626';
        return (
          <motion.div key={d.name} {...fadeUp(0.05)} style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 8, padding: '14px 14px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0d0d12' }}>{d.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color }}>{d.score}</span>
            </div>
            <div style={{ height: 3, background: '#eceff3', borderRadius: 2, marginBottom: 8, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} style={{ height: '100%', background: color, borderRadius: 2 }} />
            </div>
            <p style={{ fontSize: 11, color: '#a4acb9', margin: 0, lineHeight: 1.4 }}>{d.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

const SERP_DATA = [
  { label: 'Your article', score: 72, highlight: true },
  { label: 'Competitor #1', score: 88 },
  { label: 'Competitor #2', score: 81 },
  { label: 'Competitor #3', score: 76 },
  { label: 'Competitor #4', score: 65 },
  { label: 'Competitor #5', score: 58 },
];

function BenchmarkVisual() {
  const max = 100;
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '24px 24px 20px' }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>Content Quality Score - SERP comparison</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SERP_DATA.map((row, i) => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: row.highlight ? ACCENT : '#818898', fontWeight: row.highlight ? 700 : 400, width: 110, flexShrink: 0 }}>{row.label}</span>
            <div style={{ flex: 1, height: 8, background: '#f0f9fa', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${(row.score / max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }} style={{ height: '100%', background: row.highlight ? ACCENT : '#dfe1e7', borderRadius: 4 }} />
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
      <div className="ba-grid">
        <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>Before</span>
          <p style={{ fontSize: 12.5, color: '#9ca3af', lineHeight: 1.6, margin: 0, textDecoration: 'line-through' }}>
            SEO optimization is important for every website because it helps increase visibility in search engines.
          </p>
        </div>
        <div style={{ background: 'rgba(11,121,131,0.04)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>After</span>
          <p style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: ACCENT }}>AI Search audit</strong> measures 10 citation dimensions used by language models - each with estimated CQS impact and a specific fix.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[
          { label: 'OK', bg: 'rgba(22,163,74,0.1)', color: '#16A34A' },
          { label: 'WARNING', bg: 'rgba(202,138,4,0.1)', color: '#CA8A04' },
          { label: 'CRITICAL', bg: 'rgba(220,38,38,0.1)', color: '#DC2626' },
        ].map(p => (
          <span key={p.label} style={{ fontSize: 10, fontWeight: 700, color: p.color, background: p.bg, border: `1px solid ${p.color}30`, borderRadius: 4, padding: '4px 10px', letterSpacing: '0.06em' }}>{p.label}</span>
        ))}
        <span style={{ fontSize: 11.5, color: '#a4acb9', alignSelf: 'center' }}>- each recommendation has priority and estimated CQS impact</span>
      </div>
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
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 20px' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="7" cy="7" r="7" fill="rgba(11,121,131,0.1)" /><path d="M4 7l2 2 4-4" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesEN() {
  return (
    <div id="features">
      <section style={{ background: '#f8fafb', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionLabel>10 analysis dimensions</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>10 dimensions - each measured separately</h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>10 AI citation criteria - each with a separate score 0-10. Only their combination gives the full picture: which content AI likes to cite and which it ignores - and why.</p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}><DimensionsVisual /></motion.div>
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>SERP Benchmark</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>See exactly where you fall behind competition</h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 24 }}>The tool automatically fetches and analyzes 10 top-ranking articles for your keyword. Your content score lands against real competition - you see the gap and the starting point for optimization.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['CQS per article - tabular comparison', 'Identify SERP leaders and weak spots', 'Format, length and structure of competitors'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#36394a' }}><span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>→</span>{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}><BenchmarkVisual /></motion.div>
          </div>
        </div>
      </section>

      <section style={{ background: '#f8fafb', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 44 }}>
            <SectionLabel>Recommendations</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>Not "what to fix" - but "how to fix it"</h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 560, lineHeight: 1.65 }}>Each recommendation contains a fragment from the original article, a ready-made fix and estimated CQS increase. Zero guesswork - you know what to paste.</p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}><BeforeAfterVisual /></motion.div>
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: '58px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Report export</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>Report ready to send to your client</h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 24 }}>PDF designed for client presentation - no additional editing needed. Markdown format for project documentation or further processing.</p>
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
            <motion.div {...fadeUp(0.12)}><ExportVisual /></motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .dims-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .feat-grid-reverse > *:first-child { order: 1; }
        .feat-grid-reverse > *:last-child  { order: 0; }
        @media (max-width: 768px) {
          .dims-grid { grid-template-columns: repeat(2, 1fr); }
          .ba-grid { grid-template-columns: 1fr; }
          .feat-grid { grid-template-columns: 1fr; gap: 36px; }
          .feat-grid-reverse > * { order: unset !important; }
        }
        @media (max-width: 420px) { .dims-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
