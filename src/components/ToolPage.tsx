'use client';

import { motion } from 'framer-motion';
import type { ToolData, ToolStrings, DimTable } from '@/data/tool-types';

const ACCENT = '#0b7983';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {children}
      </span>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#0d0d12',
      letterSpacing: '-0.03em', lineHeight: 1.2, margin: '0 0 18px',
    }}>
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 16.5, color: '#36394a', lineHeight: 1.75, margin: '0 0 16px' }}>{children}</p>;
}

/** Ta sama tabela co na podstronach wymiarow — scroll wewnatrz, strona sie nie rozjezdza. */
function DataTable({ table }: { table: DimTable }) {
  return (
    <div style={{ marginTop: 8 }}>
      {table.caption && (
        <p style={{ fontSize: 14, color: '#666d80', margin: '0 0 10px', fontWeight: 500 }}>{table.caption}</p>
      )}
      <div style={{ overflowX: 'auto', border: '1px solid #dfe1e7', borderRadius: 10, background: '#ffffff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 460 }}>
          <thead>
            <tr>
              {table.head.map((h) => (
                <th key={h} style={{
                  textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#818898',
                  textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 16px',
                  borderBottom: '1px solid #dfe1e7', background: '#f8fafb', whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={row[0]}>
                <td style={{
                  fontSize: 14.5, fontWeight: 600, color: '#0d0d12', lineHeight: 1.5, padding: '13px 16px',
                  verticalAlign: 'top', borderTop: i === 0 ? 'none' : '1px solid #eceff3', whiteSpace: 'nowrap',
                }}>
                  {row[0]}
                </td>
                <td style={{
                  fontSize: 14.5, color: '#36394a', lineHeight: 1.6, padding: '13px 16px',
                  verticalAlign: 'top', borderTop: i === 0 ? 'none' : '1px solid #eceff3',
                }}>
                  {row[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ToolPage({ tool, all, t }: {
  tool: ToolData;
  all: { slug: string; name: string }[];
  t: ToolStrings;
}) {
  const ctaHref = `${t.appUrl}${tool.appPath}`;
  // Kotwice sekcji ida z `t.toc`, wiec strona EN ma angielskie id, a PL polskie.
  const sectionId = (i: number) => t.toc[i].id;

  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '56px 0 52px', borderBottom: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            <nav aria-label={t.breadcrumbAria} style={{ fontSize: 13, color: '#818898', marginBottom: 20 }}>
              <a href={t.basePath} style={{ color: '#818898', textDecoration: 'none' }}>{t.breadcrumbRoot}</a>
              <span style={{ margin: '0 7px', color: '#c3c9d3' }}>›</span>
              <span style={{ color: '#36394a' }}>{tool.name}</span>
            </nav>

            <h1 style={{
              fontSize: 'clamp(2.1rem, 4.5vw, 3rem)', fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1.12, margin: '0 0 20px',
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'inline-block',
            }}>
              {tool.heading}
            </h1>

            <p style={{ fontSize: 17.5, color: '#36394a', lineHeight: 1.72, margin: '0 0 24px' }}>{tool.lead}</p>

            {/* CTA od razu w hero — intencja na tych stronach jest transakcyjna. */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginBottom: 26 }}>
              <motion.a
                href={ctaHref}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px',
                  borderRadius: 8, background: ACCENT, color: '#ffffff', fontWeight: 700, fontSize: 15,
                  textDecoration: 'none', letterSpacing: '-0.01em',
                  boxShadow: '0 4px 20px rgba(11,121,131,0.25)', minHeight: 44,
                }}
              >
                {t.cta}
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
              <span style={{ fontSize: 14, color: '#666d80', lineHeight: 1.6 }}>{t.heroNote}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tool.chips.map((chip) => (
                <span key={chip} style={{
                  fontSize: 12.5, color: '#36394a', background: '#f8fafb',
                  border: '1px solid #dfe1e7', borderRadius: 100, padding: '5px 13px', lineHeight: 1.5,
                }}>
                  {chip}
                </span>
              ))}
            </div>

            {/* Spis tresci — ten sam wzorzec co na podstronach wymiarow. */}
            <nav aria-label={t.tocAria} style={{
              marginTop: 26, paddingTop: 20, borderTop: '1px solid #eceff3',
              display: 'flex', flexWrap: 'wrap', gap: '8px 18px',
            }}>
              {t.toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} style={{
                  fontSize: 13.5, color: ACCENT, textDecoration: 'none', fontWeight: 500,
                }}>
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      {/* CZYM JEST */}
      <section id={sectionId(0)} style={{ background: '#ffffff', padding: '64px 0 68px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelDefinition}</SectionLabel>
            <H2>{tool.defHeading}</H2>
            {tool.def.map((p) => <Para key={p.slice(0, 24)}>{p}</Para>)}
          </motion.div>
        </div>
      </section>

      {/* PO CO */}
      <section id={sectionId(1)} style={{ background: '#f8fafb', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelWhy}</SectionLabel>
            <H2>{tool.whyHeading}</H2>
            {tool.why.map((p) => <Para key={p.slice(0, 24)}>{p}</Para>)}
          </motion.div>
        </div>
      </section>

      {/* JAK DZIALA */}
      <section id={sectionId(2)} style={{ background: '#ffffff', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelHow}</SectionLabel>
            <H2>{tool.stepsHeading}</H2>

            <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 8px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {tool.steps.map((step, i) => (
                <li key={step.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(11,121,131,0.1)', color: ACCENT,
                    fontSize: 12.5, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '2px 0 5px' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {tool.configTable && <DataTable table={tool.configTable} />}
          </motion.div>
        </div>
      </section>

      {/* WYNIK */}
      <section id={sectionId(3)} style={{ background: '#f8fafb', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelOutput}</SectionLabel>
            <H2>{tool.outputHeading}</H2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {tool.output.map((item) => (
                <li key={item.slice(0, 24)} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 15.5, color: '#36394a', lineHeight: 1.7 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 5 }}>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* KOSZT I LIMITY */}
      <section id={sectionId(4)} style={{ background: '#ffffff', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelLimits}</SectionLabel>
            <H2>{tool.limitsHeading}</H2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {tool.limits.map((item) => (
                <li key={item.slice(0, 24)} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 15.5, color: '#36394a', lineHeight: 1.7 }}>
                  <span style={{ width: 16, height: 2, background: ACCENT, flexShrink: 0, marginTop: 12, borderRadius: 1 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id={sectionId(5)} style={{ background: '#f8fafb', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelQuestions}</SectionLabel>
            <H2>{t.faqHeading}</H2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {tool.faq.map((item) => (
                <div key={item.q} style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 12, padding: '20px 24px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                    {item.q}
                  </h3>
                  <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* POWIAZANE + CTA */}
      <section style={{ background: '#ffffff', padding: '72px 0 88px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelRelated}</SectionLabel>
            <H2>{t.relatedHeading}</H2>

            <div className="tool-related-grid">
              {tool.related.map((rel) => (
                <a key={rel.slug} href={`${t.basePath}/${rel.slug}`} style={{
                  background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 12,
                  padding: '20px 22px', display: 'block', textDecoration: 'none',
                }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', display: 'block', marginBottom: 6 }}>
                    {rel.name}
                  </span>
                  <span style={{ fontSize: 14, color: '#666d80', lineHeight: 1.55, display: 'block' }}>{rel.desc}</span>
                </a>
              ))}
            </div>

            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #dfe1e7' }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>
                {t.allTools}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {all.map((item) => {
                  const current = item.slug === tool.slug;
                  const base: React.CSSProperties = {
                    fontSize: 13.5, borderRadius: 100, padding: '7px 15px', lineHeight: 1.5,
                    border: '1px solid #dfe1e7', textDecoration: 'none', display: 'inline-block',
                  };
                  return current
                    ? <span key={item.slug} style={{ ...base, background: ACCENT, borderColor: ACCENT, color: '#ffffff', fontWeight: 600 }}>{item.name}</span>
                    : <a key={item.slug} href={`${t.basePath}/${item.slug}`} style={{ ...base, background: '#ffffff', color: '#36394a' }}>{item.name}</a>;
                })}
              </div>
            </div>

            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <motion.a
                href={ctaHref}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 36px',
                  borderRadius: 8, background: ACCENT, color: '#ffffff', fontWeight: 700, fontSize: 15,
                  textDecoration: 'none', letterSpacing: '-0.01em',
                  boxShadow: '0 4px 20px rgba(11,121,131,0.25)', minHeight: 44,
                }}
              >
                {t.cta}
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .tool-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 760px) {
          .tool-related-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
