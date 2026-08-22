/**
 * Podglad wyniku pruningu — replika ekranu z aplikacji: box tematyczny serwisu,
 * przelacznik trzech zakladek, lista kandydatow do przyciecia i grupy kanibalizacji.
 *
 * Adresy sa na domenie example.com (RFC 2606), tytuly generyczne — podglad pokazuje
 * format wyniku, nie cudzy audyt.
 */

const MUTED = '#64748B';
const DANGER = '#B91C1C';
const WARNING = '#CA8A04';

interface Row { url: string; title: string; score: string }

interface Copy {
  mainTopicLabel: string;
  mainTopic: string;
  sideTopicsLabel: string;
  sideTopics: string;
  tabs: [string, string, string];
  exportCsv: string;
  pruningNote: string;
  colUrl: string;
  colTitle: string;
  colDeviation: string;
  colSimilarity: string;
  rows: Row[];
  cannibalHeading: string;
  cannibalNote: string;
  groupLabel: (n: number, pages: number) => string;
  openGroup: { n: number; pages: number; score: string; rows: Row[] };
  collapsedGroups: { n: number; pages: number; score: string }[];
}

const COPY: Record<'pl' | 'en', Copy> = {
  pl: {
    mainTopicLabel: 'Główny temat serwisu',
    mainTopic: 'kredyt hipoteczny, zdolność kredytowa, kredyt gotówkowy (161 stron)',
    sideTopicsLabel: 'Tematy poboczne',
    sideTopics: 'podatek od najmu, wynajem mieszkania (14) · koszt budowy domu, poduszka finansowa (10) · nadpłacanie kredytu, harmonogram spłat (7)',
    tabs: ['Content Pruning (20)', 'Kanibalizacja (14)', 'Analiza AI (6)'],
    exportCsv: 'Eksport CSV',
    pruningNote: 'To kandydaci do pruningu — strony, których treść tematycznie odbiega od głównego tematu serwisu. Rozważ usunięcie, przekierowanie 301 na pasujący artykuł albo przebudowę treści.',
    colUrl: 'URL',
    colTitle: 'Tytuł',
    colDeviation: 'Score odbiegania',
    colSimilarity: 'Score podobieństwa',
    rows: [
      { url: 'example.com/blog/raport-rynku-nieruchomosci', title: 'Raport rynku nieruchomości 2026', score: '0.257' },
      { url: 'example.com/blog/konferencja-branzowa-2026', title: 'Konferencja branżowa 2026 – relacja', score: '0.240' },
      { url: 'example.com/blog/koszt-ksiegi-wieczystej', title: 'Ile kosztuje założenie księgi wieczystej', score: '0.234' },
      { url: 'example.com/blog/finansowanie-aut-w-leasingu', title: 'Zmiany w finansowaniu aut w leasingu', score: '0.220' },
      { url: 'example.com/blog/mieszkanie-do-sprzedazy', title: 'Jak przygotować mieszkanie do sprzedaży', score: '0.206' },
    ],
    cannibalHeading: 'Kanibalizacja',
    cannibalNote: 'Strony w jednej grupie konkurują o tę samą intencję — wysokie podobieństwo oznacza, że wyszukiwarka nie wie, którą pokazać. Wybierz najmocniejszą, scal pozostałe albo zróżnicuj je na osobne podtematy.',
    // 2-4 -> „strony", reszta -> „stron" (5 stron, 22 strony, 25 stron).
    groupLabel: (n, pages) => {
      const rest = pages % 10;
      const teen = pages % 100 >= 12 && pages % 100 <= 14;
      const word = !teen && rest >= 2 && rest <= 4 ? 'strony' : 'stron';
      return `Grupa ${n} (${pages} ${word})`;
    },
    openGroup: {
      n: 2,
      pages: 3,
      score: '0.914',
      rows: [
        { url: 'example.com/blog/kredyt-na-dowod', title: 'Kredyt na dowód bez umowy o pracę', score: '0.914' },
        { url: 'example.com/blog/kredyt-na-oswiadczenie', title: 'Kredyt dla firm na oświadczenie', score: '0.901' },
        { url: 'example.com/blog/pozyczka-bez-zaswiadczen', title: 'Pożyczka bez zaświadczeń o dochodach', score: '0.880' },
      ],
    },
    collapsedGroups: [
      { n: 3, pages: 4, score: '0.987' },
      { n: 5, pages: 3, score: '0.919' },
    ],
  },
  en: {
    mainTopicLabel: 'Main site topic',
    mainTopic: 'mortgage, creditworthiness, personal loan (161 pages)',
    sideTopicsLabel: 'Side topics',
    sideTopics: 'rental income tax, letting a flat (14) · cost of building a house, emergency fund (10) · overpaying a loan, repayment schedule (7)',
    tabs: ['Content Pruning (20)', 'Cannibalization (14)', 'AI analysis (6)'],
    exportCsv: 'Export CSV',
    pruningNote: 'These are pruning candidates — pages whose topic drifts away from the main topic of the site. Consider removing them, redirecting with a 301 to a matching article, or rebuilding the content.',
    colUrl: 'URL',
    colTitle: 'Title',
    colDeviation: 'Deviation score',
    colSimilarity: 'Similarity score',
    rows: [
      { url: 'example.com/blog/property-market-report', title: 'Property market report 2026', score: '0.257' },
      { url: 'example.com/blog/industry-conference-2026', title: 'Industry conference 2026 – recap', score: '0.240' },
      { url: 'example.com/blog/land-registry-cost', title: 'How much a land registry entry costs', score: '0.234' },
      { url: 'example.com/blog/car-leasing-changes', title: 'Changes in car leasing finance', score: '0.220' },
      { url: 'example.com/blog/flat-ready-to-sell', title: 'How to get a flat ready to sell', score: '0.206' },
    ],
    cannibalHeading: 'Cannibalization',
    cannibalNote: 'Pages in one group compete for the same intent — a high similarity means the search engine cannot tell which one to show. Pick the strongest, merge the rest, or split them into separate subtopics.',
    groupLabel: (n, pages) => `Group ${n} (${pages} pages)`,
    openGroup: {
      n: 2,
      pages: 3,
      score: '0.914',
      rows: [
        { url: 'example.com/blog/loan-without-employment', title: 'Loan without an employment contract', score: '0.914' },
        { url: 'example.com/blog/self-employed-loan', title: 'Loan for a self-employed borrower', score: '0.901' },
        { url: 'example.com/blog/loan-without-proof-of-income', title: 'Loan without proof of income', score: '0.880' },
      ],
    },
    collapsedGroups: [
      { n: 3, pages: 4, score: '0.987' },
      { n: 5, pages: 3, score: '0.919' },
    ],
  },
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none' }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ScoreTable({ rows, colUrl, colTitle, colScore, scoreColor }: {
  rows: Row[]; colUrl: string; colTitle: string; colScore: string; scoreColor: string;
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: 480 }}>
        <thead>
          <tr>
            {[colUrl, colTitle, colScore].map((h, i) => (
              <th key={h} style={{
                width: ['39%', '41%', '20%'][i],
                textAlign: i === 2 ? 'right' : 'left', fontSize: 11.5, fontWeight: 500, color: MUTED,
                padding: '9px 12px', borderBottom: '1px solid #eceff3', background: '#f8fafb',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.url}>
              <td style={{
                fontSize: 13.5, color: '#0b7983', padding: '11px 12px', borderBottom: '1px solid #f2f4f7',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {r.url}
              </td>
              <td style={{
                fontSize: 13.5, color: '#36394a', padding: '11px 12px', borderBottom: '1px solid #f2f4f7',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {r.title}
              </td>
              <td style={{
                fontSize: 13.5, color: scoreColor, padding: '11px 12px', textAlign: 'right',
                borderBottom: '1px solid #f2f4f7', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
              }}>
                {r.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PruningPreview({ lang = 'pl' }: { lang?: 'pl' | 'en' }) {
  const c = COPY[lang];

  return (
    <div style={{ marginTop: 26 }}>
      {/* Temat serwisu */}
      <div style={{ background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 12, padding: '14px 16px', marginBottom: 12 }}>
        <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: '#0d0d12' }}>{c.mainTopicLabel}:</strong> {c.mainTopic}
        </p>
        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, margin: '6px 0 0' }}>
          <strong style={{ color: '#36394a' }}>{c.sideTopicsLabel}:</strong> {c.sideTopics}
        </p>
      </div>

      {/* Zakladki */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {c.tabs.map((tab, i) => (
          <span key={tab} style={{
            fontSize: 12.5, fontWeight: 600, borderRadius: 8, padding: '7px 13px',
            color: i === 0 ? '#ffffff' : MUTED,
            background: i === 0 ? '#0b7983' : '#f1f5f9',
          }}>
            {tab}
          </span>
        ))}
      </div>

      <p style={{
        fontSize: 13.5, color: '#36394a', lineHeight: 1.6, margin: '0 0 12px',
        background: 'rgba(11, 121, 131, 0.06)', borderRadius: 10, padding: '12px 14px',
      }}>
        {c.pruningNote}
      </p>

      <div style={{ border: '1px solid #dfe1e7', borderRadius: 12, background: '#ffffff', overflow: 'hidden' }}>
        <ScoreTable rows={c.rows} colUrl={c.colUrl} colTitle={c.colTitle} colScore={c.colDeviation} scoreColor={DANGER} />
      </div>

      {/* Kanibalizacja */}
      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.01em', margin: '26px 0 8px' }}>
        {c.cannibalHeading}
      </h4>
      <p style={{
        fontSize: 13.5, color: '#36394a', lineHeight: 1.6, margin: '0 0 12px',
        background: 'rgba(202, 138, 4, 0.08)', borderRadius: 10, padding: '12px 14px',
      }}>
        {c.cannibalNote}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ border: '1px solid #dfe1e7', borderRadius: 12, background: '#ffffff', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 16px' }}>
            <Chevron open />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.01em' }}>
              {c.groupLabel(c.openGroup.n, c.openGroup.pages)}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 13, color: WARNING, fontVariantNumeric: 'tabular-nums' }}>
              {c.openGroup.score}
            </span>
          </div>
          <ScoreTable rows={c.openGroup.rows} colUrl={c.colUrl} colTitle={c.colTitle} colScore={c.colSimilarity} scoreColor={WARNING} />
        </div>

        {c.collapsedGroups.map((g) => (
          <div key={g.n} style={{
            border: '1px solid #dfe1e7', borderRadius: 12, background: '#ffffff',
            display: 'flex', alignItems: 'center', gap: 8, padding: '13px 16px',
          }}>
            <Chevron open={false} />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.01em' }}>
              {c.groupLabel(g.n, g.pages)}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 13, color: WARNING, fontVariantNumeric: 'tabular-nums' }}>{g.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
