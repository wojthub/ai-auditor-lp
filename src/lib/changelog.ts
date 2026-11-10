/**
 * Changelog dla podstron `/changelog` i `/pl/changelog`.
 *
 * Źródłem jest changelog aplikacji (`ai-auditor/src/lib/changelog.ts`), wystawiony przez
 * `app.citationone.com/api/public/changelog`. LP pobiera go W CZASIE BUILDA, więc wpisy są
 * w statycznym HTML. Nowy wpis pojawia się na LP dopiero po wdrożeniu aplikacji i ponownym
 * zbudowaniu LP.
 *
 * Błąd pobrania PRZERYWA build: lepiej nie wdrożyć LP niż opublikować pustą stronę nowości.
 * `CHANGELOG_ENDPOINT` w env podmienia adres (np. lokalna aplikacja przy testach).
 */

const ENDPOINT = process.env.CHANGELOG_ENDPOINT || 'https://app.citationone.com/api/public/changelog';

export type ChangelogTag = 'feature' | 'improvement' | 'fix';

export interface ChangelogEntry {
  date: string;
  tag: ChangelogTag;
  title: { pl: string; en: string };
  description: { pl: string; en: string };
}

const TAGS: readonly string[] = ['feature', 'improvement', 'fix'];

function isText(v: unknown): v is { pl: string; en: string } {
  return !!v && typeof v === 'object' && typeof (v as { pl?: unknown }).pl === 'string' && typeof (v as { en?: unknown }).en === 'string';
}

function isEntry(v: unknown): v is ChangelogEntry {
  if (!v || typeof v !== 'object') return false;
  const e = v as Record<string, unknown>;
  return (
    typeof e.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(e.date) &&
    typeof e.tag === 'string' &&
    TAGS.includes(e.tag) &&
    isText(e.title) &&
    isText(e.description)
  );
}

/** Na stronie piszemy dywiz zamiast pauzy - starsze wpisy aplikacji mają jeszcze „—”. */
function dashes(s: string): string {
  return s.replace(/—/g, '-');
}

let pending: Promise<ChangelogEntry[]> | null = null;

/** Wpisy od najnowszego. Wynik jest współdzielony przez obie podstrony jednego builda. */
export function getChangelog(): Promise<ChangelogEntry[]> {
  if (!pending) pending = load();
  return pending;
}

async function load(): Promise<ChangelogEntry[]> {
  const res = await fetch(ENDPOINT, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Changelog: ${ENDPOINT} odpowiedział ${res.status}`);
  const data: unknown = await res.json();
  const raw = (data as { entries?: unknown })?.entries;
  if (!Array.isArray(raw) || raw.length === 0) throw new Error('Changelog: odpowiedź bez wpisów');
  const valid = raw.filter(isEntry);
  // Zmieniony ksztalt wpisow po stronie aplikacji odfiltrowalby wszystko - wtedy tez stop,
  // zamiast pustej strony.
  if (valid.length === 0) throw new Error('Changelog: żaden wpis nie ma oczekiwanego kształtu');
  if (valid.length < raw.length) console.warn(`Changelog: pominięto ${raw.length - valid.length} wpisów o złym kształcie`);
  return valid.map((e) => ({
    date: e.date,
    tag: e.tag,
    title: { pl: dashes(e.title.pl), en: dashes(e.title.en) },
    description: { pl: dashes(e.description.pl), en: dashes(e.description.en) },
  }));
}
