/**
 * Podglad wyniku analizy schema.org — replika zakladki „Podsumowanie" z aplikacji:
 * pasek licznikow, kafle pokrycia typow i lista najczestszych problemow.
 *
 * Etykiety odpowiadaja kluczom `schemaGaps.*` w translations.ts aplikacji, zeby user
 * po zakupie widzial te same nazwy. Liczby sa przykladowe (udana analiza calej sitemapy).
 */

const ACCENT = '#0b7983';
const MUTED = '#64748B';
const SUCCESS = '#15803d';
const DANGER = '#B91C1C';
const WARNING = '#CA8A04';

interface Coverage { type: string; count: number; percent: number }
interface Issue { type: string; status: 'missing' | 'incomplete'; pages: number }

interface Copy {
  analyzed: string;
  withSchema: string;
  withoutSchema: string;
  exportCsv: string;
  tabs: [string, string];
  coverageHeading: string;
  issuesHeading: string;
  statusLabels: { missing: string; incomplete: string };
  pagesWord: (n: number) => string;
  coverage: Coverage[];
  issues: Issue[];
}

const COVERAGE: Coverage[] = [
  { type: 'Organization', count: 184, percent: 100 },
  { type: 'BreadcrumbList', count: 171, percent: 93 },
  { type: 'WebSite', count: 92, percent: 50 },
  { type: 'Product', count: 64, percent: 35 },
  { type: 'FAQPage', count: 28, percent: 15 },
  { type: 'BlogPosting', count: 21, percent: 11 },
];

const ISSUES: Issue[] = [
  { type: 'WebPage', status: 'missing', pages: 96 },
  { type: 'CollectionPage', status: 'missing', pages: 41 },
  { type: 'Article', status: 'missing', pages: 33 },
  { type: 'ItemList', status: 'missing', pages: 22 },
  { type: 'Organization', status: 'incomplete', pages: 18 },
  { type: 'Product', status: 'incomplete', pages: 12 },
];

const COPY: Record<'pl' | 'en', Copy> = {
  pl: {
    analyzed: '184 przeanalizowane strony',
    withSchema: '171 ze schema',
    withoutSchema: '13 bez schema',
    exportCsv: 'Eksport CSV',
    tabs: ['Podsumowanie', 'Strony'],
    coverageHeading: 'Pokrycie typów schema',
    issuesHeading: 'Najczęstsze problemy',
    statusLabels: { missing: 'brak', incomplete: 'niekompletny' },
    pagesWord: (n) => `${n} stron`,
    coverage: COVERAGE,
    issues: ISSUES,
  },
  en: {
    analyzed: '184 pages analyzed',
    withSchema: '171 with schema',
    withoutSchema: '13 without schema',
    exportCsv: 'Export CSV',
    tabs: ['Summary', 'Pages'],
    coverageHeading: 'Schema type coverage',
    issuesHeading: 'Top issues',
    statusLabels: { missing: 'missing', incomplete: 'incomplete' },
    pagesWord: (n) => `${n} pages`,
    coverage: COVERAGE,
    issues: ISSUES,
  },
};

const STATUS_STYLE = {
  missing: { color: DANGER, bg: 'rgba(185, 28, 28, 0.08)' },
  incomplete: { color: WARNING, bg: 'rgba(202, 138, 4, 0.1)' },
} as const;

export default function SchemaPreview({ lang = 'pl' }: { lang?: 'pl' | 'en' }) {
  const c = COPY[lang];

  return (
    <div style={{ marginTop: 26 }}>
      {/* Licznik + eksport */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <span style={{ fontSize: 13.5, color: '#0d0d12', fontWeight: 600 }}>
          {c.analyzed}
          <span style={{ color: MUTED, fontWeight: 400 }}> / 192 </span>
          <span style={{ color: SUCCESS, fontWeight: 500 }}>{c.withSchema}</span>
          <span style={{ color: MUTED, fontWeight: 400 }}> · </span>
          <span style={{ color: DANGER, fontWeight: 500 }}>{c.withoutSchema}</span>
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600,
          color: '#36394a', border: '1px solid #dfe1e7', borderRadius: 8, padding: '6px 12px', background: '#ffffff',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#36394a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          {c.exportCsv}
        </span>
      </div>

      {/* Zakladki */}
      <div style={{ display: 'flex', gap: 22, borderBottom: '1px solid #dfe1e7', marginBottom: 20, overflowX: 'auto' }}>
        {c.tabs.map((tab, i) => (
          <span key={tab} style={{
            fontSize: 14, fontWeight: i === 0 ? 600 : 500, padding: '0 0 10px',
            color: i === 0 ? ACCENT : MUTED,
            borderBottom: i === 0 ? `2px solid ${ACCENT}` : '2px solid transparent',
            marginBottom: -1,
          }}>
            {tab}
          </span>
        ))}
      </div>

      {/* Pokrycie typow */}
      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.01em', margin: '0 0 10px' }}>
        {c.coverageHeading}
      </h4>
      <div className="schema-coverage-grid">
        {c.coverage.map((item) => (
          <div key={item.type} style={{
            background: '#f8fafb', border: '1px solid #eceff3', borderRadius: 10,
            padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
          }}>
            <span style={{ fontSize: 13.5, color: '#0d0d12', fontWeight: 500 }}>{item.type}</span>
            <span style={{ fontSize: 12.5, color: MUTED, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
              {item.count} ({item.percent}%)
            </span>
          </div>
        ))}
      </div>

      {/* Najczestsze problemy */}
      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.01em', margin: '24px 0 10px' }}>
        {c.issuesHeading}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {c.issues.map((issue) => {
          const s = STATUS_STYLE[issue.status];
          return (
            <div key={`${issue.type}-${issue.status}`} style={{
              border: '1px solid #dfe1e7', borderRadius: 10, background: '#ffffff',
              display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', flexWrap: 'wrap',
            }}>
              <span style={{
                fontSize: 11, fontWeight: 600, color: s.color, background: s.bg,
                borderRadius: 6, padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {c.statusLabels[issue.status]}
              </span>
              <span style={{ fontSize: 14, color: '#0d0d12', fontWeight: 500 }}>{issue.type}</span>
              <span style={{ marginLeft: 'auto', fontSize: 13, color: MUTED, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                {c.pagesWord(issue.pages)}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        .schema-coverage-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 760px) {
          .schema-coverage-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 440px) {
          .schema-coverage-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
