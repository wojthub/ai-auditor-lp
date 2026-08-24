'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';

/**
 * Bulk Audit — HP section (EN mirror of ../BulkAudit.tsx).
 * Facts per ../../ai-auditor/spec/bulk-audit.md: max 50 URLs, auto keyword + CSI,
 * free crawl/preview, 1 credit per confirmed URL, background queue, result = folder of
 * individual audits. The AGGREGATE report is deferred (Phase 3) — not promised here.
 */

const cards = [
  {
    title: 'A URL list or a sitemap',
    desc: 'Paste your addresses in a single job, or point us at your sitemap and we will pull the pages from it.',
  },
  {
    title: 'Keywords without the manual work',
    desc: 'We detect the keyword for every address automatically and infer its search intent. You can also supply your own phrases and correct them in the preview.',
  },
  {
    title: 'You pay only after confirming',
    desc: 'Crawling and the preview are free. You see the list of pages, untick the ones to skip, and only then a credit is charged per audited address.',
  },
  {
    title: 'The queue runs in the background',
    desc: 'Audits run in the background, even if you close the tab. When you come back to the panel, a separate report is waiting for every address.',
  },
];

export default function BulkAuditEN() {
  return (
    <section id="bulk-audit" style={{ background: '#f8fafb', padding: '90px 0' }}>
      <div style={{ maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Section label + h2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bulk audit</span>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            color: '#0d0d12',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}>
            Audit a whole site section, not a single page
          </h2>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>
            Bulk audit analyses a whole list of addresses in one job. Every address gets a full report
            with the Top 10 SERP benchmark, so a single run shows you an entire section of the site.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="bulk-cards-grid">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                background: '#ffffff',
                border: '1px solid #dfe1e7',
                borderRadius: 14,
                padding: '22px 24px 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: 'rgba(11,121,131,0.1)', color: '#0b7983',
                  fontSize: 12, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', lineHeight: 1.25, margin: 0 }}>
                  {card.title}
                </h3>
              </div>
              <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA + API note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18 }}
        >
          <motion.a
            href={`${APP_URL}/bulk-audit?new=1`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
              borderRadius: 8,
              background: '#0b7983',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              minHeight: 44,
            }}
          >
            Run a bulk audit
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Two ways to scale — the panel for people, the API for systems. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: 44, paddingTop: 36, borderTop: '1px solid #dfe1e7' }}
        >
          <h3 style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 700, color: '#0d0d12',
            letterSpacing: '-0.025em', lineHeight: 1.25, margin: '0 0 12px',
          }}>
            Bulk audit or the API
          </h3>
          <p style={{ fontSize: 16, color: '#36394a', lineHeight: 1.72, margin: '0 0 24px', maxWidth: 720 }}>
            At hundreds of URLs - a site migration, a full blog review, several clients at once - you
            need a mode where auditing stops being a task and becomes a process.
          </p>

          <div className="bulk-scale-grid">
            <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 14, padding: '24px 26px' }}>
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: ACCENT, textTransform: 'uppercase',
                letterSpacing: '0.08em', display: 'block', marginBottom: 10,
              }}>
                From the panel
              </span>
              <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                Bulk audit
              </h4>
              <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 14px' }}>
                Paste a list of URLs or a sitemap and close the tab. Audits run in the background, and the
                panel holds a separate report for every page. No integration, no code.
              </p>
              <span style={{ fontSize: 13.5, color: '#666d80', lineHeight: 1.6 }}>
                For editorial teams and agencies.
              </span>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 14, padding: '24px 26px' }}>
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: ACCENT, textTransform: 'uppercase',
                letterSpacing: '0.08em', display: 'block', marginBottom: 10,
              }}>
                Through the API
              </span>
              <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                Auditing inside your own process
              </h4>
              <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 14px' }}>
                Queue audits from your own system and receive the result as JSON over a webhook, with no
                polling. Content can be checked before it ships, straight from your CMS or pipeline.
              </p>
              <a href="/api" style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT, textDecoration: 'none' }}>
                See the API documentation →
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        .bulk-scale-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bulk-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 860px) {
          .bulk-cards-grid { grid-template-columns: 1fr; }
          .bulk-scale-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
