import HeroBackdrop from '@/components/HeroBackdrop';
import { APP_URL } from '@/lib/appUrl';
import type { ChangelogEntry, ChangelogTag } from '@/lib/changelog';

// Shared - podstrona changelogu PL (/pl/changelog) i EN (/changelog). Komponent serwerowy:
// wpisy przychodza z builda (`getChangelog`), wiec cala lista jest w statycznym HTML.

const ACCENT = '#0b7983';

const COPY = {
  pl: {
    label: 'Nowości',
    h1: 'Co nowego w CitationOne',
    lead: 'Nowe funkcje, ulepszenia i poprawki w audycie treści i narzędziach CitationOne - od najnowszej zmiany.',
    tags: { feature: 'Nowość', improvement: 'Ulepszenie', fix: 'Poprawka' } as Record<ChangelogTag, string>,
    cta: 'Zrób darmowy audyt',
    locale: 'pl-PL',
  },
  en: {
    label: 'Changelog',
    h1: "What's new in CitationOne",
    lead: 'New features, improvements and fixes across the CitationOne content audit and tools - newest change first.',
    tags: { feature: 'New', improvement: 'Improvement', fix: 'Fix' } as Record<ChangelogTag, string>,
    cta: 'Run a free audit',
    locale: 'en-US',
  },
} as const;

const TAG_COLORS: Record<ChangelogTag, { bg: string; fg: string }> = {
  feature: { bg: '#e6f4f5', fg: '#085C62' },
  improvement: { bg: '#eef0f6', fg: '#3b4256' },
  fix: { bg: '#fdf1e7', fg: '#8a4b12' },
};

/** Data z YYYY-MM-DD bez strefy czasowej - inaczej build w UTC-x cofnalby dzien. */
function parts(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function groupByMonth(entries: ChangelogEntry[]) {
  const groups: { key: string; items: ChangelogEntry[] }[] = [];
  for (const e of entries) {
    const key = e.date.slice(0, 7);
    const last = groups[groups.length - 1];
    if (last?.key === key) last.items.push(e);
    else groups.push({ key, items: [e] });
  }
  return groups;
}

export default function ChangelogPage({ entries, lang }: { entries: ChangelogEntry[]; lang: 'pl' | 'en' }) {
  const c = COPY[lang];
  const monthFmt = new Intl.DateTimeFormat(c.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const dayFmt = new Intl.DateTimeFormat(c.locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  // Kilka wpisow z tego samego dnia dostaje kolejne kotwice: 2026-09-29, 2026-09-29-2.
  const seen = new Map<string, number>();
  const anchor = (date: string) => {
    const n = (seen.get(date) ?? 0) + 1;
    seen.set(date, n);
    return n === 1 ? date : `${date}-${n}`;
  };

  return (
    <section style={{ background: '#ffffff', padding: '44px 0 96px', position: 'relative', overflow: 'hidden' }}>
      <HeroBackdrop />
      <div style={{ maxWidth: 760, margin: '0 auto', paddingLeft: 16, paddingRight: 16, position: 'relative' }}>
        <header style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#818898', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
            {c.label}
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 22,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
          >
            {c.h1}
          </h1>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, maxWidth: 580, margin: '0 auto 24px' }}>{c.lead}</p>
          <a
            href={`${APP_URL}/register?lang=${lang}`}
            style={{ display: 'inline-block', background: ACCENT, color: '#ffffff', fontWeight: 600, fontSize: 15, padding: '12px 22px', borderRadius: 8, textDecoration: 'none' }}
          >
            {c.cta} →
          </a>
        </header>

        {groupByMonth(entries).map((group) => (
          <div key={group.key} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: '#818898', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px', paddingBottom: 8, borderBottom: '1px solid #e7e9ef' }}>
              {monthFmt.format(parts(`${group.key}-01`))}
            </h2>
            {group.items.map((e) => {
              const id = anchor(e.date);
              const color = TAG_COLORS[e.tag];
              return (
                <article key={id} id={id} style={{ padding: '18px 0 22px', borderBottom: '1px solid #f0f1f5', scrollMarginTop: 88 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                    <time dateTime={e.date} style={{ fontSize: 13, color: '#666d80' }}>{dayFmt.format(parts(e.date))}</time>
                    <span style={{ fontSize: 11.5, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: color.bg, color: color.fg }}>
                      {c.tags[e.tag]}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: '#1a1d29', lineHeight: 1.35, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                    <a href={`#${id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{e.title[lang]}</a>
                  </h3>
                  <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: 0 }}>{e.description[lang]}</p>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
