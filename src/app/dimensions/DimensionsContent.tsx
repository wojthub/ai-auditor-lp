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

const NUM_COLORS = ['#e07a4a', '#0b7983', '#c47a2a'];

const DIMS = [
  {
    num: '01',
    id: 'CSI Alignment',
    label: 'Intent Alignment',
    body: 'Does your content answer what users are really looking for? AI does not cite pages that miss the query intent - even if they contain the keyword. CSI Alignment measures how precisely your article matches the expected answer type: definition, comparison, instruction, or recommendation.',
  },
  {
    num: '02',
    id: 'D1',
    label: 'Info Density',
    body: 'How many facts, data points and concrete statements a single paragraph contains. Low-density content is filler - AI skips it. This dimension rewards every sentence that adds something new and penalizes text that repeats the same idea in different words.',
  },
  {
    num: '03',
    id: 'BLUF',
    label: 'BLUF (Bottom Line Up Front)',
    body: 'AI models prefer content that delivers the main answer in the first paragraph. BLUF measures how quickly your content gets to the point.',
  },
  {
    num: '04',
    id: 'EAV',
    label: 'Knowledge Graph (EAV)',
    body: 'Content builds a network of related concepts: entities, attributes and values. The denser and more coherent the graph, the easier it is for AI to recognize the content as a credible source in the domain. This dimension checks whether your texts create knowledge - not just mention it.',
  },
  {
    num: '05',
    id: 'Chunks',
    label: 'Information Chunks',
    body: 'AI "extracts" self-contained fragments from content - sentences or paragraphs that can be understood without the full article context. This dimension measures how many such citation-ready units your page contains. The more distinct chunks, the higher the chance of appearing in AI Overview or an assistant answer.',
  },
  {
    num: '06',
    id: 'Cost of Retrieval',
    label: 'Cost of Retrieval (Conciseness)',
    body: 'How much effort the model has to spend to pull a concrete answer from your content. Long sentences, redundant intros and unnecessary disclaimers raise the cost of retrieval. A low score here means AI will pick a competitor who said the same thing in fewer words.',
  },
  {
    num: '07',
    id: 'Information Gain',
    label: 'Information Gain (Uniqueness)',
    body: 'Does your content add something the other 10 pages in the top 10 do not have? Information Gain measures the difference between what you write and what is already widely available. This metric is boosted by unique data, original observations and non-obvious conclusions.',
  },
  {
    num: '08',
    id: 'Query Fan-out',
    label: 'AIO Coverage (Query Fan-out)',
    body: 'A single user query generates dozens of related sub-questions that AI resolves in the background. This dimension checks how many of those satellite questions your content answers. Wider topic coverage = higher probability that a fragment of your page appears in the synthetic answer.',
  },
  {
    num: '09',
    id: 'SRL',
    label: 'Semantic Role Logic (SRL)',
    body: 'Semantic Role Logic evaluates whether the content has a clear structure: subject, action, effect. The more precise the language, the easier it is for the model to cut out and cite exactly the fragment that fits the answer.',
  },
  {
    num: '10',
    id: 'TF-IDF',
    label: 'TF-IDF (SERP Benchmark)',
    body: 'A classic statistical metric comparing word frequency in your text to norms for the given query in the top 10 SERP. Too low - the topic is treated superficially. Too high - a keyword-stuffing signal. CitationOne points to exactly which terms are underrepresented compared to competitors.',
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
      <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
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
              10 Content Quality Dimensions
            </h1>
            <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.7, maxWidth: 680, margin: '0 auto 36px' }}>
              Large language models (the ones powering ChatGPT or Google AI Overview) do not read texts the traditional way. They use algorithms to mathematically evaluate the usefulness and credibility of content. CitationOne translates those processes into 10 measurable dimensions that make up your Content Quality Score (CQS).
            </p>

            {/* CQS box */}
            <div style={{
              background: '#f8fafb',
              border: '1px solid #dfe1e7',
              borderRadius: 12,
              padding: '28px 32px',
              textAlign: 'left',
              maxWidth: 640,
              margin: '0 auto',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 16, height: 2, background: ACCENT, borderRadius: 1 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What is CQS?</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                Content Quality Score
              </h3>
              <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.7, margin: 0 }}>
                CQS is a 0-100 indicator that shows how well your content performs against the top 10 search results across parameters that matter for AI Search. Each of the 10 dimensions carries an assigned weight, allowing for a precise estimate of your chance of being cited.
              </p>
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
              <motion.div
                key={dim.id}
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
                <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>{dim.body}</p>
              </motion.div>
            ))}
          </div>
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
        .dims-list-grid {
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
