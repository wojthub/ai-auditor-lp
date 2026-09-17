/**
 * Replika kafelka CQS z raportu w aplikacji (ScoreCard + Badge, status `warn`).
 *
 * Kolory i proporcje sa przepisane z ai-auditor: --color-warning #CA8A04,
 * --color-muted-foreground #64748B, tlo warning/5, ramka warning/30, badge warning/15.
 * Zamiast zrzutu ekranu - wektor, wiec zostaje ostry w kazdej rozdzielczosci i wazy zero.
 *
 * Stopka (`avgLabel` + `link`) odwzorowuje `CqsCardFooter` z AuditReport.tsx: srednia TOP 10
 * ustawia wynik w skali, odnosnik prowadzi dalej. Bez tych propsow karta renderuje sie
 * bez stopki, jak na /wymiary. Badge domyslnie „ŚREDNI" - ta sama skala co `scoreStatus.warn`.
 */

const WARNING = '#CA8A04';
const MUTED = '#64748B';
const ACCENT = '#0b7983';

export default function CqsScoreCard({
  score = 56,
  maxScore = 100,
  badge = 'ŚREDNI',
  label = 'Content Quality Score',
  avgLabel,
  link,
  compact = false,
}: {
  score?: number;
  maxScore?: number;
  badge?: string;
  label?: string;
  avgLabel?: string;
  link?: { href: string; label: string };
  /** Niższa wersja na LP, gdzie karta stoi obok akapitu i ma się z nim równać w pionie. */
  compact?: boolean;
}) {
  return (
    <div
      style={{
        background: 'rgba(202, 138, 4, 0.05)',
        border: '1px solid rgba(202, 138, 4, 0.3)',
        borderRadius: 12,
        padding: compact ? '14px 18px' : '20px 22px',
        minWidth: 232,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: MUTED, marginBottom: compact ? 8 : 12 }}>
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth={2} aria-hidden="true" style={{ flexShrink: 0, opacity: 0.8 }}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
        </svg>
      </span>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: compact ? 30 : 36, fontWeight: 700, color: WARNING, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{score}</span>
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
      {(avgLabel || link) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            flexWrap: 'wrap',
            marginTop: compact ? 12 : 16,
            paddingTop: compact ? 10 : 12,
            borderTop: '1px solid rgba(202, 138, 4, 0.15)',
            fontSize: 12,
          }}
        >
          {avgLabel ? <span style={{ color: MUTED, fontVariantNumeric: 'tabular-nums' }}>{avgLabel}</span> : <span />}
          {link && (
            <a href={link.href} style={{ color: ACCENT, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {link.label}
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
