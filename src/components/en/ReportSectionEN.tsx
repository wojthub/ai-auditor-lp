'use client';

import { motion } from 'framer-motion';
import { useReportUrl } from '@/lib/useReportUrl';

/** Default - the live value comes from the admin panel through useReportUrl. */
const REPORT_URL_FALLBACK = 'https://app.citationone.com/share/BDBhqK8ZvffG9-rKXPNCeUTW?lang=en';

const items = [
  {
    number: '01',
    label: 'Before / After fixes',
    desc: 'the rewritten text itself, not advice - each with an estimated Content Quality Score (CQS) gain.',
    color: '#e07a4a',
  },
  {
    number: '02',
    label: 'Applied to your content',
    desc: 'tick the recommendations you want and the tool writes them into your text, returning a version ready to paste into the CMS.',
    color: '#0b7983',
  },
  {
    number: '03',
    label: 'Revision History',
    desc: 'every version of the text is kept, so you can see what changed in each pass.',
    color: '#c47a2a',
  },
];

export default function ReportSectionEN() {
  const reportUrl = useReportUrl(REPORT_URL_FALLBACK, 'en');
  return (
    <section style={{ background: '#ffffff', padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="report-grid" style={{ maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative', zIndex: 1 }}>

        {/* Left column - copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sample report</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 600,
            color: '#0d0d12',
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            marginBottom: 14,
          }}>
            Data ready to implement
          </h2>
          <p style={{ fontSize: 16, color: '#666d80', lineHeight: 1.7, margin: '0 0 32px' }}>
            As an outcome of the audit you receive an interactive online report plus PDF and Markdown files you can hand straight to your team, manager or client.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
            {items.map((item) => (
              <div key={item.number} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: item.color,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.3,
                  flexShrink: 0,
                  width: 26,
                }}>
                  {item.number}
                </span>
                <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: '#0d0d12', fontWeight: 700 }}>{item.label}</strong> - {item.desc}
                </p>
              </div>
            ))}
          </div>

          <motion.a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              padding: '13px 22px',
              borderRadius: 9,
              background: '#0b7983',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View sample report
          </motion.a>
        </motion.div>

        {/* Right column - report preview */}
        <div className="report-preview-col" style={{ perspective: '2000px' }}>
          {/* soft accent glow */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '8%',
              right: '-6%',
              width: 420,
              maxWidth: '90%',
              height: 420,
              background: 'radial-gradient(ellipse at center, rgba(11,121,131,0.10) 0%, rgba(11,121,131,0) 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <motion.a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open sample report"
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 4 }}
            whileHover={{ scale: 1.025 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'block',
              position: 'relative',
              zIndex: 1,
              transformOrigin: '50% 0%',
              maxWidth: 600,
              margin: '0 auto',
              cursor: 'pointer',
              filter: 'drop-shadow(-14px 22px 40px rgba(13,13,18,0.18))',
            }}
          >
            <div style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, transparent 99%)',
              maskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, transparent 99%)',
            }}>
              {/* paper frame */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f3f5f7 100%)',
                border: '1px solid #e3e6ea',
                borderRadius: 14,
                padding: 10,
              }}>
                <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(13,13,18,0.04)' }}>
                  <img
                    src="/report-preview-en.png"
                    alt="Sample CitationOne report - Content Quality Score, AI Citability Score, 10-dimension profile and Quick Wins"
                    style={{ display: 'block', width: '100%', height: 'auto' }}
                  />
                  {/* gloss */}
                  <div aria-hidden style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(118deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 14%, rgba(255,255,255,0) 34%)',
                  }} />
                </div>
              </div>
            </div>
          </motion.a>
        </div>

      </div>

      <style>{`
        .report-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 56px;
          align-items: center;
        }
        .report-preview-col { position: relative; }
        @media (max-width: 900px) {
          .report-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}
