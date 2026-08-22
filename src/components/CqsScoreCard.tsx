/**
 * Replika kafelka CQS z raportu w aplikacji (ScoreCard + Badge, status `warn`).
 *
 * Kolory i proporcje sa przepisane z ai-auditor: --color-warning #CA8A04,
 * --color-muted-foreground #64748B, tlo warning/5, ramka warning/30, badge warning/15.
 * Zamiast zrzutu ekranu — wektor, wiec zostaje ostry w kazdej rozdzielczosci i wazy zero.
 */

const WARNING = '#CA8A04';
const MUTED = '#64748B';

export default function CqsScoreCard({
  score = 56,
  maxScore = 100,
  badge = 'UWAGA',
  label = 'Content Quality Score',
}: {
  score?: number;
  maxScore?: number;
  badge?: string;
  label?: string;
}) {
  return (
    <div
      style={{
        background: 'rgba(202, 138, 4, 0.05)',
        border: '1px solid rgba(202, 138, 4, 0.3)',
        borderRadius: 12,
        padding: '20px 22px',
        minWidth: 232,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: MUTED, marginBottom: 12 }}>
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth={2} aria-hidden="true" style={{ flexShrink: 0, opacity: 0.8 }}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
        </svg>
      </span>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: WARNING, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{score}</span>
          <span style={{ fontSize: 18, color: MUTED }}>/ {maxScore}</span>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            color: WARNING,
            background: 'rgba(202, 138, 4, 0.15)',
            border: '1px solid rgba(202, 138, 4, 0.3)',
            borderRadius: 6,
            whiteSpace: 'nowrap',
          }}
        >
          {badge}
        </span>
      </div>
    </div>
  );
}
