'use client';

import { motion } from 'framer-motion';
import type { DimensionData, DimTable, DimensionStrings, DimRecommendation } from '@/data/dimension-types';
import HeroBackdrop from './HeroBackdrop';

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
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 700,
      color: '#0d0d12',
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
      margin: '0 0 18px',
    }}>
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 16.5, color: '#36394a', lineHeight: 1.75, margin: '0 0 16px' }}>
      {children}
    </p>
  );
}

/** Tabela w kontenerze ze scrollem — na waskim ekranie przewija sie sama, strona nie. */
function DataTable({ table }: { table: DimTable }) {
  return (
    <div style={{ marginBottom: 22 }}>
      {table.caption && (
        <p style={{ fontSize: 14, color: '#666d80', margin: '0 0 10px', fontWeight: 500 }}>{table.caption}</p>
      )}
      <div style={{ overflowX: 'auto', border: '1px solid #dfe1e7', borderRadius: 10, background: '#ffffff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 460 }}>
          <thead>
            <tr>
              {table.head.map((h) => (
                <th key={h} style={{
                  textAlign: 'left',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#818898',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '12px 16px',
                  borderBottom: '1px solid #dfe1e7',
                  background: '#f8fafb',
                  whiteSpace: 'nowrap',
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
                  fontSize: 14.5, fontWeight: 600, color: '#0d0d12', lineHeight: 1.5,
                  padding: '13px 16px', verticalAlign: 'top',
                  borderTop: i === 0 ? 'none' : '1px solid #eceff3',
                  whiteSpace: 'nowrap',
                }}>
                  {row[0]}
                </td>
                <td style={{
                  fontSize: 14.5, color: '#36394a', lineHeight: 1.6,
                  padding: '13px 16px', verticalAlign: 'top',
                  borderTop: i === 0 ? 'none' : '1px solid #eceff3',
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

function FactorList({ items, tone }: { items: string[]; tone: 'up' | 'down' }) {
  const color = tone === 'up' ? '#15803d' : '#B91C1C';
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item) => (
        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: '#36394a', lineHeight: 1.6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
            {tone === 'up'
              ? <path d="M5 13l4 4L19 7" />
              : <path d="M18 6L6 18M6 6l12 12" />}
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Przykladowe rekomendacje — uklad 1:1 z raportem w aplikacji: zdanie o problemie,
 * pod nim karty PRZED (czerwona) i PO (zielona). Zeby user rozpoznal to, co kupuje.
 */
function Recommendations({ items, t }: { items: DimRecommendation[]; t: DimensionStrings }) {
  return (
    <div style={{ marginTop: 34 }}>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 6px' }}>
        {t.recommendationsHeading}
      </h3>
      <p style={{ fontSize: 13.5, color: '#818898', margin: '0 0 22px' }}>{t.recommendationsNote}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {items.map((rec) => (
          <div key={rec.problem}>
            <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.65, margin: '0 0 12px' }}>
              <span style={{ fontWeight: 600, color: '#B91C1C' }}>{t.problemLabel}: </span>
              {rec.problem}
            </p>
            <div className="dim-ba-grid">
              {([
                { label: t.beforeLabel, text: rec.before, color: '#B91C1C', bg: 'rgba(185,28,28,0.04)' },
                { label: t.afterLabel, text: rec.after, color: '#15803d', bg: 'rgba(21,128,61,0.04)' },
              ] as const).map((col) => (
                <div key={col.label} style={{
                  border: '1px solid #dfe1e7', borderRadius: 12, padding: '18px 20px', background: col.bg,
                }}>
                  <span style={{
                    fontSize: 10.5, fontWeight: 700, color: col.color, textTransform: 'uppercase',
                    letterSpacing: '0.08em', display: 'block', marginBottom: 10,
                  }}>
                    {col.label}
                  </span>
                  <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.7, margin: 0 }}>{col.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DimensionPage({ dim, known, all, t }: {
  dim: DimensionData;
  known: string[];
  all: { slug: string; name: string }[];
  t: DimensionStrings;
}) {
  // Kotwice sekcji ida z `t.toc` — dzieki temu strona EN ma angielskie #why-it-matters,
  // a nie polskie #dlaczego. Kolejnosc w `toc` MUSI odpowiadac kolejnosci sekcji nizej.
  const sectionId = (i: number) => t.toc[i].id;

  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '56px 0 52px', borderBottom: '1px solid #eceff3', position: 'relative', overflow: 'hidden' }}>
        <HeroBackdrop />
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            {/* Breadcrumb */}
            <nav aria-label={t.breadcrumbAria} style={{ fontSize: 13, color: '#818898', marginBottom: 20 }}>
              <a href={t.basePath} style={{ color: '#818898', textDecoration: 'none' }}>{t.breadcrumbRoot}</a>
              <span style={{ margin: '0 7px', color: '#c3c9d3' }}>›</span>
              <span style={{ color: '#36394a' }}>{dim.name}</span>
            </nav>

            <h1 style={{
              fontSize: 'clamp(2.1rem, 4.5vw, 3rem)', fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1.12, margin: '0 0 20px',
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              {dim.heading}
            </h1>

            <p style={{ fontSize: 17.5, color: '#36394a', lineHeight: 1.72, margin: '0 0 24px' }}>
              {dim.lead}
            </p>

            {/*
              Chipsow (skala / metoda / wejscie) w hero NIE renderujemy — decyzja z 2026-08-21,
              ta sama co przy narzedziach. Skala i metoda sa opisane w sekcji „Jak liczymy".
              Pole `dim.chips` zostaje w danych, ale nie ma juz zadnego konsumenta.
            */}

            {/* Spis tresci — ten sam zabieg, ktory zalecamy w wymiarze „koszt pozyskania". */}
            <nav aria-label={t.tocAria} style={{
              marginTop: 4, paddingTop: 20, borderTop: '1px solid #eceff3',
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

      {/* DLACZEGO */}
      <section id={sectionId(0)} style={{ background: '#f8fafb', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelContext}</SectionLabel>
            <H2>{dim.whyHeading}</H2>
            {dim.why.map((p) => <Para key={p.slice(0, 24)}>{p}</Para>)}
          </motion.div>
        </div>
      </section>

      {/* W RAPORCIE — stoi jako druga sekcja: dowod przed metodologia */}
      <section id={sectionId(1)} style={{ background: '#ffffff', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelPractice}</SectionLabel>
            <H2>{t.reportHeading}</H2>
            {dim.report.map((p) => <Para key={p.slice(0, 24)}>{p}</Para>)}
            {dim.recommendations && dim.recommendations.length > 0 && (
              <Recommendations items={dim.recommendations} t={t} />
            )}
          </motion.div>
        </div>
      </section>

      {/* JAK JEST LICZONY */}
      <section id={sectionId(2)} style={{ background: '#f8fafb', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelMethod}</SectionLabel>
            <H2>{dim.howHeading}</H2>
            {dim.how.intro.map((p) => <Para key={p.slice(0, 24)}>{p}</Para>)}
            {dim.how.tables.map((table) => <DataTable key={table.head.join()} table={table} />)}
          </motion.div>
        </div>
      </section>

      {/* CZYNNIKI */}
      <section id={sectionId(3)} style={{ background: '#ffffff', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelFactors}</SectionLabel>
            <H2>{t.factorsHeading}</H2>

            <div className="dim-factors-grid">
              <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 12, padding: '22px 24px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#15803d', letterSpacing: '-0.01em', margin: '0 0 14px' }}>{t.raisesLabel}</h3>
                <FactorList items={dim.raises} tone="up" />
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 12, padding: '22px 24px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#B91C1C', letterSpacing: '-0.01em', margin: '0 0 14px' }}>{t.lowersLabel}</h3>
                <FactorList items={dim.lowers} tone="down" />
              </div>
            </div>

            {dim.swapTable && (
              <div style={{ marginTop: 28 }}>
                <DataTable table={dim.swapTable} />
                {dim.swapNote && (
                  <p style={{ fontSize: 15, color: '#666d80', lineHeight: 1.7, margin: 0 }}>{dim.swapNote}</p>
                )}
              </div>
            )}

          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id={sectionId(4)} style={{ background: '#f8fafb', padding: '72px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelQuestions}</SectionLabel>
            <H2>{t.faqHeading}</H2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {dim.faq.map((item) => (
                <div key={item.q} style={{
                  background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 12, padding: '20px 24px',
                }}>
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
      <section style={{ background: '#f8fafb', padding: '72px 0 88px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()}>
            <SectionLabel>{t.labelRelated}</SectionLabel>
            <H2>{t.relatedHeading}</H2>

            <div className="dim-related-grid">
              {dim.related.map((rel) => {
                const isLink = known.includes(rel.slug);
                const inner = (
                  <>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', display: 'block', marginBottom: 6 }}>
                      {rel.name}
                    </span>
                    <span style={{ fontSize: 14, color: '#666d80', lineHeight: 1.55, display: 'block' }}>
                      {rel.desc}
                    </span>
                  </>
                );
                const boxStyle: React.CSSProperties = {
                  background: '#ffffff',
                  border: '1px solid #dfe1e7',
                  borderRadius: 12,
                  padding: '20px 22px',
                  display: 'block',
                  textDecoration: 'none',
                };
                // Strony jeszcze nienapisane renderujemy jako karty bez linku — zamiast 404.
                return isLink
                  ? <a key={rel.slug} href={`${t.basePath}/${rel.slug}`} style={boxStyle}>{inner}</a>
                  : <div key={rel.slug} style={boxStyle}>{inner}</div>;
              })}
            </div>

            {/* Pelna nawigacja — bez tego kazda podstrona jest slepym zaulkiem poza trzema sasiadami. */}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #dfe1e7' }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>
                {t.allDimensions}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {all.map((item) => {
                  const current = item.slug === dim.slug;
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
                href={t.ctaHref}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '15px 36px',
                  borderRadius: 8,
                  background: ACCENT,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
                  minHeight: 44,
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
        .dim-factors-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .dim-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .dim-ba-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 760px) {
          .dim-factors-grid { grid-template-columns: 1fr; }
          .dim-related-grid { grid-template-columns: 1fr; }
          .dim-ba-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
