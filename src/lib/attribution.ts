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

/**
 * Znacznik "landing nie wyslal `register_click` do Mety". Dostaje go link do rejestracji, gdy
 * odwiedzajacy nie ma zgody marketingowej w Cookiebot: tag Meta na landingu czeka na te zgode,
 * wiec klikniecie z reklamy przepadalo w atrybucji kampanii. Aplikacja na `/register` widzi
 * znacznik, wysyla `register_click` sama (`../ai-auditor/src/lib/landing-register-click.ts`)
 * i usuwa go z adresu. Przy zgodzie znacznika nie ma - zdarzenie idzie z landingu, wiec kazde
 * klikniecie trafia do Mety dokladnie raz.
 *
 * Swiadoma decyzja z 2026-10-14: zdarzenie od osoby bez zgody marketingowej wychodzi do Mety
 * z aplikacji, razem z `fbc` z przeniesionego `fbclid`.
 *
 * TYMCZASOWE - na czas biezacej kampanii Meta optymalizowanej na `register_click`. Po jej
 * zakonczeniu do usuniecia razem z `LandingRegisterClick` w aplikacji.
 */
export const LANDING_REGISTER_FLAG = 'lp_rc';
const REGISTER_PREFIX = `${APP_URL}/register`;
const FLAG_PATTERN = new RegExp(`([?&])${LANDING_REGISTER_FLAG}=1(?:&|(?=#|$))`);

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
 *
 * Link do rejestracji dostaje tez `LANDING_REGISTER_FLAG`, gdy nie ma zgody marketingowej.
 * Znacznik jest liczony od nowa przy kazdym wywolaniu: kto zaakceptuje ciasteczka po pierwszym
 * nacisnieciu, kliknie juz link bez niego.
 */
export function withAttribution(
  href: string,
  attribution: Attribution = currentAttribution(),
  marketingConsent: boolean = hasMarketingConsent(),
): string {
  if (!href.startsWith(APP_URL)) return href;
  href = withoutRegisterFlag(href);
  let existing: URLSearchParams;
  try {
    existing = new URL(href).searchParams;
  } catch {
    return href;
  }
  const extra = ATTRIBUTION_PARAMS.filter((name) => attribution[name] && !existing.has(name)).map(
    (name) => `${name}=${encodeURIComponent(attribution[name] as string)}`,
  );
  if (href.startsWith(REGISTER_PREFIX) && !marketingConsent) extra.push(`${LANDING_REGISTER_FLAG}=1`);
  if (extra.length === 0) return href;
  const hashAt = href.indexOf('#');
  const base = hashAt === -1 ? href : href.slice(0, hashAt);
  const hash = hashAt === -1 ? '' : href.slice(hashAt);
  return `${base}${base.includes('?') ? '&' : '?'}${extra.join('&')}${hash}`;
}

/**
 * Zgoda marketingowa wedlug Cookiebot - ta sama, na ktora czeka tag Meta w GTM. Brak obiektu
 * (baner jeszcze sie nie zaladowal, adblock) liczy sie jak brak zgody: tag i tak nie strzelil.
 */
function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  const cookiebot = (window as { Cookiebot?: { consent?: { marketing?: boolean } } }).Cookiebot;
  return cookiebot?.consent?.marketing === true;
}

/** Adres bez `LANDING_REGISTER_FLAG`. Tekstowo, z tego samego powodu co doklejanie wyzej. */
function withoutRegisterFlag(href: string): string {
  if (!FLAG_PATTERN.test(href)) return href;
  return href.replace(FLAG_PATTERN, '$1').replace(/[?&](?=#|$)/, '');
}
