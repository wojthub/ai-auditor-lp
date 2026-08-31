'use client';

import { motion } from 'framer-motion';
import CqsScoreCard from '@/components/CqsScoreCard';
import HeroBackdrop from '@/components/HeroBackdrop';

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

const NUM_COLORS = ['#e07a4a', '#0b7983', '#c47a2a'];

// Names and order follow `dim.*` + DIMENSION_ORDER (RadarChart) in the app — after purchase the
// user sees exactly these labels in the report. `slug` must exist in src/data/dimensions-en.ts.
const DIMS = [
  {
    num: '01',
    id: 'CSI Alignment',
    slug: 'csi-alignment',
    label: 'CSI Alignment',
    body: 'Does your content answer what users are really looking for? AI does not cite pages that miss the query intent - even if they contain the keyword. Alignment with Central Search Intent (CSI) measures how precisely your article matches the expected answer type: definition, comparison, instruction, or recommendation.',
  },
  {
    num: '02',
    id: 'Density',
    slug: 'information-density',
    label: 'Information Density',
    body: 'Information density says how many facts, data points and concrete statements a single paragraph contains. Low-density content is filler - AI skips it. The dimension rewards every sentence that adds something new and lowers the score of text that repeats the same idea in different words.',
  },
  {
    num: '03',
    id: 'EAV',
    slug: 'knowledge-graph-eav',
    label: 'Knowledge Graph',
    body: 'Content builds a network of related concepts: entities, their attributes and values. The denser and more coherent the graph, the easier it is for AI to recognize the content as a credible source in the field. Knowledge Graph checks whether your texts build knowledge or merely mention concepts.',
  },
  {
    num: '04',
    id: 'BLUF',
    slug: 'bluf',
    label: 'BLUF',
    body: 'AI models prefer content that delivers the answer at the start of a section. BLUF measures how quickly your content gets to the point - and whether it does so in every section, not only the first.',
  },
  {
    num: '05',
    id: 'Chunk',
    slug: 'chunk-optimization',
    label: 'Chunk Optimization',
    body: 'AI retrieves self-contained fragments - sections that can be understood without the full article context. Chunk Optimization measures how many citation-ready units your page contains and whether they run to the length that suits this content type.',
  },
  {
    num: '06',
    id: 'CoR',
    slug: 'cost-of-retrieval',
    label: 'Cost of Retrieval',
    body: 'Cost of Retrieval measures how much effort it takes to pull a concrete answer off the page. Heading hierarchy, tables, lists and emphasis lower that cost; a wall of text raises it. With comparable content, the model picks the source that is cheaper to handle.',
  },
  {
    num: '07',
    id: 'TF-IDF',
    slug: 'tf-idf',
    label: 'TF-IDF',
    body: 'TF-IDF compares your page terminology with the vocabulary of the Top 10. A missing specialist term usually means a missing angle, so CitationOne shows which concepts you skip and in what context competitors use them.',
  },
  {
    num: '08',
    id: 'SRL',
    slug: 'semantic-roles',
    label: 'Semantic Roles',
    body: 'Semantic Roles check whether the main topic of the page performs the action in your sentences or merely receives it. The active voice gives the model the complete set of information “who - does what - to what”; the passive voice leaves a gap in that structure.',
  },
  {
    num: '09',
    id: 'Fan-Out',
    slug: 'query-fan-out',
    label: 'Fan-Out & AIO Coverage',
    body: 'A single user query decomposes into a dozen or so side questions that AI resolves in the background. Fan-Out & AIO Coverage analyses how many of those questions your content answers, because citations are won on the side questions.',
  },
  {
    num: '10',
    id: 'Effort',
    slug: 'effort-score',
    label: 'Effort Score',
    body: 'Effort Score is an algorithmic checklist of page completeness: length against competitors, visual material, tables, lists, heading hierarchy, table of contents and a visible update date.',
  },
];

// Outside the ten dimensions: E-E-A-T has its own section below, Information Gain is an
// informational metric (it does not enter the final score) — hence both sit beside the grid.
const EXTRA = [
  {
    slug: 'e-e-a-t',
    label: 'E-E-A-T',
    body: 'E-E-A-T covers experience, expertise, authoritativeness and trust - four separately scored components, computed from signals present in the content and in the page code.',
  },
  {
    slug: 'information-gain',
    label: 'Information Gain',
    body: 'Information Gain measures how much your content adds over the Top 10. It is a strategic metric: it shows where to build an advantage and does not affect the final score.',
  },
];

const EEAT = [
  { letter: 'E', label: 'Experience', desc: 'Does the text show evidence of hands-on familiarity with the topic?' },
  { letter: 'E', label: 'Expertise', desc: 'How deep is the substantive analysis?' },
  { letter: 'A', label: 'Authoritativeness', desc: 'Is your brand a recognized source in the niche?' },
  { letter: 'T', label: 'Trustworthiness', desc: 'Are data and sources presented transparently?' },
];

export default function DimensionsContent() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #eceff3', position: 'relative', overflow: 'hidden' }}>
        <HeroBackdrop />
        <div style={{ maxWidth: 800, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>10 dimensions</span>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
            </div>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 22,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              10 Content Quality Dimensions + E-E-A-T
            </h1>
            <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.7, maxWidth: 680, margin: '0 auto 36px' }}>
              The models behind ChatGPT and Google AI Overview evaluate content algorithmically. CitationOne translates those processes into 10 measurable dimensions that make up your Content Quality Score (CQS).
            </p>

            {/* CQS box */}
            <div className="cqs-box" style={{
              background: '#f8fafb',
              border: '1px solid #dfe1e7',
              borderRadius: 12,
              padding: '28px 32px',
              textAlign: 'left',
              maxWidth: 760,
              margin: '0 auto',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 16, height: 2, background: ACCENT, borderRadius: 1 }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What is CQS?</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                  Content Quality Score
                </h3>
                <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.7, margin: 0 }}>
                  CQS on a 0–100 scale shows how your content performs against the Top 10 across the parameters that matter for AI Search. Each of the 10 dimensions carries its own weight in the result.
                </p>
              </div>
              <CqsScoreCard badge="WARNING" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIMS LIST */}
      <section style={{ background: '#f8fafb', padding: '90px 0' }}>
        <div style={{ maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dimensions</span>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 700,
              color: '#0d0d12',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: 0,
            }}>
              What exactly does the algorithm measure?
            </h2>
          </motion.div>

          <div className="dims-list-grid">
            {DIMS.map((dim, i) => (
              <motion.a
                key={dim.id}
                href={`/dimensions/${dim.slug}`}
                {...fadeUp(i * 0.03)}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dfe1e7',
                  borderRadius: 10,
                  padding: '26px 24px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  color: NUM_COLORS[i % 3],
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 18,
                }}>
                  {dim.num}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: 0 }}>
                    {dim.label}
                  </h3>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    {dim.id}
                  </span>
                </div>
                <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 14px' }}>{dim.body}</p>
                <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginTop: 'auto' }}>
                  How we measure it →
                </span>
              </motion.a>
            ))}
          </div>

          {/* Outside the ten: E-E-A-T + Information Gain */}
          <motion.div {...fadeUp(0.1)} style={{ marginTop: 44 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 6px' }}>
              Beyond the ten dimensions
            </h3>
            <p style={{ fontSize: 14.5, color: '#666d80', lineHeight: 1.65, margin: '0 0 18px', maxWidth: 640 }}>
              Two analyses reported separately - E-E-A-T as the foundation of credibility, information gain as the measure of what you add over the Top 10.
            </p>
            <div className="dims-extra-grid">
              {EXTRA.map((item) => (
                <motion.a
                  key={item.slug}
                  href={`/dimensions/${item.slug}`}
                  whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #dfe1e7',
                    borderRadius: 10,
                    padding: '22px 24px',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', display: 'block', marginBottom: 8 }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, display: 'block', marginBottom: 12 }}>
                    {item.body}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}>How we measure it →</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* E-E-A-T */}
      <section style={{ background: '#ffffff', padding: '90px 0' }}>
        <div style={{ maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Foundation of credibility</span>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 700,
              color: '#0d0d12',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 14px',
            }}>
              E-E-A-T
            </h2>
            <p style={{ fontSize: 16, color: '#36394a', lineHeight: 1.72, maxWidth: 560, margin: 0 }}>
              AI algorithms reward signals of authenticity. CitationOne measures four of them:
            </p>
          </motion.div>

          <div className="eeat-grid">
            {EEAT.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.08)}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dfe1e7',
                  borderRadius: 10,
                  padding: '26px 22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                  fontWeight: 800,
                  color: NUM_COLORS[i % 3],
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 18,
                }}>
                  {item.letter}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                  {item.label}
                </h3>
                <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#ffffff', padding: '90px 0', borderTop: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
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
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', fontWeight: 500, color: '#36394a', letterSpacing: '-0.01em', lineHeight: 1.4, margin: '0 0 32px' }}>
              Check your content now - the first 3 audits are free.
            </p>
            <motion.a
              href={`${APP_URL}/login?lang=en`}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 36px', borderRadius: 8,
                background: '#0b7983',
                color: '#ffffff', fontWeight: 700, fontSize: 15,
                textDecoration: 'none', letterSpacing: '-0.01em',
                boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
              }}
            >
              Run audit
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <style>{`
        .cqs-box {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 28px;
          align-items: center;
        }
        @media (max-width: 720px) {
          .cqs-box { grid-template-columns: 1fr; gap: 20px; }
        }
        .dims-list-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .dims-extra-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .eeat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 860px) {
          .dims-list-grid { grid-template-columns: 1fr; }
          .dims-extra-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .eeat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .eeat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
