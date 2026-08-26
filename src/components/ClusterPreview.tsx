/**
 * Podglad wyniku klasteryzacji — replika listy klastrow z aplikacji (ClusterResults.tsx).
 *
 * Kolory intencji przepisane z INTENT_COLORS w aplikacji: commercial = warning #CA8A04,
 * transactional = success #16A34A, informational = accent #0b7983, navigational = muted.
 * Dane sa przykladowe i celowo bez nazw marek — pokazuja format, nie czyjs audyt.
 */

const MUTED = '#64748B';

type Intent = 'transactional' | 'commercial';

const INTENT_STYLE: Record<Intent, { color: string; bg: string }> = {
  transactional: { color: '#16A34A', bg: 'rgba(22, 163, 74, 0.1)' },
  commercial: { color: '#CA8A04', bg: 'rgba(202, 138, 4, 0.1)' },
};

interface Copy {
  summary: string;
  exportCsv: string;
  pillarLabel: string;
  keywordCol: string;
  volumeCol: string;
  intents: Record<Intent, string>;
  openCluster: { label: string; count: number; intent: Intent; volume: string; pillar: string };
  keywords: { phrase: string; volume: string }[];
  collapsed: { label: string; count: number; intent: Intent; volume: string }[];
}

const COPY: Record<'pl' | 'en', Copy> = {
  pl: {
    summary: '72 klastry · 81 słów kluczowych · Łączny wolumen: 139,5K',
    exportCsv: 'Eksport CSV',
    pillarLabel: 'Proponowany pillar',
    keywordCol: 'Słowo kluczowe',
    volumeCol: 'Wolumen',
    intents: { transactional: 'Transakcyjna', commercial: 'Komercyjna' },
    openCluster: {
      label: 'Kalkulator kredytu gotówkowego',
      count: 2,
      intent: 'transactional',
      volume: '44,4K',
      pillar: 'Kalkulator kredytu gotówkowego - oblicz ratę i całkowity koszt kredytu online',
    },
    keywords: [
      { phrase: 'kalkulator kredyt gotówkowy', volume: '22,2K' },
      { phrase: 'kalkulator kredytowy gotówkowy', volume: '22,2K' },
    ],
    collapsed: [
      { label: 'Oferty kredytów gotówkowych', count: 1, intent: 'commercial', volume: '40,5K' },
      { label: 'Kalkulator rat kredytu', count: 1, intent: 'transactional', volume: '14,8K' },
      { label: 'Ranking kredytów gotówkowych', count: 3, intent: 'commercial', volume: '10,8K' },
    ],
  },
  en: {
    summary: '72 clusters · 81 keywords · Total volume: 139.5K',
    exportCsv: 'Export CSV',
    pillarLabel: 'Suggested pillar',
    keywordCol: 'Keyword',
    volumeCol: 'Volume',
    intents: { transactional: 'Transactional', commercial: 'Commercial' },
    openCluster: {
      label: 'Personal loan calculator',
      count: 2,
      intent: 'transactional',
      volume: '44.4K',
      pillar: 'Personal loan calculator – work out your instalment and the total cost online',
    },
    keywords: [
      { phrase: 'personal loan calculator', volume: '22.2K' },
      { phrase: 'loan repayment calculator', volume: '22.2K' },
    ],
    collapsed: [
      { label: 'Personal loan offers', count: 1, intent: 'commercial', volume: '40.5K' },
      { label: 'Instalment calculator', count: 1, intent: 'transactional', volume: '14.8K' },
      { label: 'Personal loan ranking', count: 3, intent: 'commercial', volume: '10.8K' },
    ],
  },
};

function IntentBadge({ intent, label }: { intent: Intent; label: string }) {
  const s = INTENT_STYLE[intent];
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, color: s.color, background: s.bg,
      borderRadius: 100, padding: '2px 8px', whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none' }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function ClusterPreview({ lang = 'pl' }: { lang?: 'pl' | 'en' }) {
  const c = COPY[lang];

  return (
    <div style={{ marginTop: 26 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: MUTED }}>{c.summary}</span>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Klaster rozwiniety */}
        <div style={{ border: '1px solid #dfe1e7', borderRadius: 12, background: '#ffffff', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 16px', flexWrap: 'wrap' }}>
            <Chevron open />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.01em' }}>{c.openCluster.label}</span>
            <span style={{ fontSize: 13, color: MUTED }}>({c.openCluster.count})</span>
            <IntentBadge intent={c.openCluster.intent} label={c.intents[c.openCluster.intent]} />
            <span style={{ marginLeft: 'auto', fontSize: 13, color: MUTED, fontVariantNumeric: 'tabular-nums' }}>{c.openCluster.volume}</span>
          </div>

          <div style={{ padding: '10px 16px', background: 'rgba(11, 121, 131, 0.05)', borderTop: '1px solid #eceff3' }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {c.pillarLabel}
            </span>
            <p style={{ fontSize: 14, color: '#0d0d12', lineHeight: 1.5, margin: '4px 0 0' }}>{c.openCluster.pillar}</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 360 }}>
              <thead>
                <tr>
                  {[c.keywordCol, c.volumeCol].map((h, i) => (
                    <th key={h} style={{
                      textAlign: i === 0 ? 'left' : 'right', fontSize: 11.5, fontWeight: 500, color: MUTED,
                      padding: '9px 16px', borderTop: '1px solid #eceff3', borderBottom: '1px solid #eceff3',
                      background: '#f8fafb', whiteSpace: 'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.keywords.map((kw) => (
                  <tr key={kw.phrase}>
                    <td style={{ fontSize: 14, color: '#36394a', padding: '11px 16px', borderBottom: '1px solid #f2f4f7' }}>{kw.phrase}</td>
                    <td style={{
                      fontSize: 13.5, color: MUTED, padding: '11px 16px', textAlign: 'right',
                      borderBottom: '1px solid #f2f4f7', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
                    }}>
                      {kw.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Klastry zwiniete */}
        {c.collapsed.map((cl) => (
          <div key={cl.label} style={{
            border: '1px solid #dfe1e7', borderRadius: 12, background: '#ffffff',
            display: 'flex', alignItems: 'center', gap: 8, padding: '13px 16px', flexWrap: 'wrap',
          }}>
            <Chevron open={false} />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.01em' }}>{cl.label}</span>
            <span style={{ fontSize: 13, color: MUTED }}>({cl.count})</span>
            <IntentBadge intent={cl.intent} label={c.intents[cl.intent]} />
            <span style={{ marginLeft: 'auto', fontSize: 13, color: MUTED, fontVariantNumeric: 'tabular-nums' }}>{cl.volume}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
