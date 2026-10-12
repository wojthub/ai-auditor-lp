import { APP_URL } from '@/lib/appUrl';

/**
 * Parametry kampanii i identyfikatory klikniecia reklamy, ktore landing przenosi do aplikacji.
 *
 * Landing stoi na `citationone.com`, aplikacja na `app.citationone.com`, a linki miedzy nimi
 * byly gole (`/login?lang=pl`), wiec wejscie z reklamy tracilo po drodze `fbclid` i UTM-y.
 * Narzedzia pomiarowe w aplikacji widzialy wtedy rejestracje jako ruch z landinga, bez kampanii.
 *
 * Lista jest zamknieta: przenosimy tylko to, co sluzy atrybucji. Zadnych danych osobowych -
 * adres strony czytaja narzedzia pomiarowe i logi.
 */
export const ATTRIBUTION_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'fbclid',
  'gclid',
  'gbraid',
  'wbraid',
  'msclkid',
] as const;

const STORAGE_KEY = 'co_attribution';
const MAX_VALUE_LENGTH = 500;

type Attribution = Partial<Record<(typeof ATTRIBUTION_PARAMS)[number], string>>;

/** Parametry z podanego query (`location.search`). Pusty obiekt = wejscie bez kampanii. */
export function readAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  for (const name of ATTRIBUTION_PARAMS) {
    const value = params.get(name);
    if (value && value.length <= MAX_VALUE_LENGTH) found[name] = value;
  }
  return found;
}

/**
 * Zapamietuje parametry wejscia na czas sesji karty. Bez tego gubilyby sie po pierwszym
 * przejsciu miedzy podstronami landinga, bo linki wewnetrzne ich nie niosa.
 *
 * Nowe wejscie z parametrami nadpisuje CALY zestaw: mieszanka `utm_source` z jednej kampanii
 * i `fbclid` z drugiej dawalaby atrybucje, ktorej nigdy nie bylo.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  const found = readAttribution(window.location.search);
  if (Object.keys(found).length === 0) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Tryb prywatny albo zablokowane dane witryny - link z biezacej strony i tak dostanie
    // parametry z adresu (patrz `currentAttribution`).
  }
}

function currentAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  const fromUrl = readAttribution(window.location.search);
  if (Object.keys(fromUrl).length > 0) return fromUrl;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    // Przez `readAttribution`, zeby wartosc ze schowka przeszla te sama liste i limit dlugosci.
    return raw ? readAttribution(new URLSearchParams(JSON.parse(raw) as Record<string, string>).toString()) : {};
  } catch {
    return {};
  }
}

/**
 * Dokleja parametry wejscia do adresu prowadzacego do aplikacji. Inne adresy zwraca bez zmian.
 *
 * Dokleja TEKSTEM, nie przez `URL.searchParams.set`: ten przepisuje cale query od nowa
 * i zakodowalby `:` oraz `/` w `audit-url`, ktore formularz w hero celowo zostawia czytelne.
 * Parametr obecny juz w adresie zostaje nietkniety, wiec wywolanie mozna powtarzac.
 */
export function withAttribution(href: string, attribution: Attribution = currentAttribution()): string {
  if (!href.startsWith(APP_URL)) return href;
  let existing: URLSearchParams;
  try {
    existing = new URL(href).searchParams;
  } catch {
    return href;
  }
  const extra = ATTRIBUTION_PARAMS.filter((name) => attribution[name] && !existing.has(name)).map(
    (name) => `${name}=${encodeURIComponent(attribution[name] as string)}`,
  );
  if (extra.length === 0) return href;
  const hashAt = href.indexOf('#');
  const base = hashAt === -1 ? href : href.slice(0, hashAt);
  const hash = hashAt === -1 ? '' : href.slice(hashAt);
  return `${base}${base.includes('?') ? '&' : '?'}${extra.join('&')}${hash}`;
}
