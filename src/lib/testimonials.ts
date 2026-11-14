/**
 * Opinie do karuzeli pod hero strony głównej (`Testimonials.tsx`, PL i EN).
 *
 * Źródło: panel admina aplikacji (`/admin/lp`, karta „Opinie na citationone.com”), wystawione przez
 * `app.citationone.com/api/public/testimonials`. Strona czyta je DWA razy:
 * - w czasie builda (`getTestimonialsAtBuild`) - opinie są w statycznym HTML, więc sekcja nie
 *   wskakuje po załadowaniu i widzą ją roboty. Błąd pobrania NIE przerywa builda (sekcja jest
 *   opcjonalna) - strona zbuduje się bez opinii, a dociągnie je przeglądarka;
 * - w przeglądarce (`fetchTestimonials`) - nowa opinia albo wyłączenie sekcji w panelu wchodzi
 *   bez przebudowy LP (do 5 minut przez cache CDN). Błąd = zostają opinie z builda.
 *
 * `TESTIMONIALS_ENDPOINT` w env podmienia adres TYLKO dla builda (np. lokalna aplikacja).
 * W `npm run dev` zapytanie idzie z `?preview=1`: widać dodane osoby, także gdy sekcja jest jeszcze
 * wyłączona w panelu. Build produkcyjny i przeglądarka respektują wyłącznik.
 */

const PROD_ENDPOINT = 'https://app.citationone.com/api/public/testimonials';
const BUILD_ENDPOINT = process.env.TESTIMONIALS_ENDPOINT || PROD_ENDPOINT;
const TIMEOUT_MS = 6000;
const PROCESS_STAMP = Date.now().toString(36);

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  /** Treść na stronę PL; pusta = opinii nie ma na `/pl`. */
  textPl: string;
  /** Treść na stronę EN; pusta = opinii nie ma na `/` (od 2026-11-14 - wcześniej jedno `text` + `lang`). */
  textEn: string;
  /** Profil autora (LinkedIn) - ikona obok nazwiska. */
  url: string | null;
  /** Strona firmy - link na linijce ze stanowiskiem i firmą. */
  siteUrl: string | null;
  /** Adres obrazka z endpointu aplikacji albo `null` (wtedy inicjały). */
  photo: string | null;
}

export interface TestimonialsPayload {
  enabled: boolean;
  items: Testimonial[];
}


function isHttps(v: string): boolean {
  if (/[\s\\\u0000-\u001f\u007f]/.test(v)) return false;
  try {
    return new URL(v).protocol === 'https:';
  } catch {
    return false;
  }
}

/** Odpowiedź jest niezaufana: bierzemy tylko poprawne wpisy, zdjęcie wyłącznie z endpointu aplikacji. */
export function parseTestimonialsPayload(raw: unknown, endpoint: string = PROD_ENDPOINT, preview = false): TestimonialsPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const { enabled, items } = raw as Record<string, unknown>;
  if (typeof enabled !== 'boolean' || !Array.isArray(items)) return null;
  const photoPrefix = `${new URL(endpoint).origin}/api/public/testimonials/photo/`;
  const out: Testimonial[] = [];
  for (const v of items) {
    if (!v || typeof v !== 'object') continue;
    const t = v as Record<string, unknown>;
    if (typeof t.id !== 'string' || typeof t.name !== 'string' || !t.name.trim()) continue;
    const str = (x: unknown) => (typeof x === 'string' ? x.trim() : '');
    let textPl = str(t.textPl);
    let textEn = str(t.textEn);
    if (typeof t.textPl !== 'string' && typeof t.textEn !== 'string') {
      // Aplikacja sprzed zakładek PL/EN: jedno `text` i `lang` mówiący, na której stronie je pokazać.
      const text = str(t.text);
      textPl = t.lang === 'en' ? '' : text;
      textEn = t.lang === 'pl' ? '' : text;
    }
    if (!textPl && !textEn) continue;
    out.push({
      id: t.id,
      name: t.name.trim(),
      role: typeof t.role === 'string' ? t.role.trim() : '',
      textPl,
      textEn,
      url: typeof t.url === 'string' && isHttps(t.url) ? t.url : null,
      siteUrl: typeof t.siteUrl === 'string' && isHttps(t.siteUrl) ? t.siteUrl : null,
      photo: typeof t.photo === 'string' && t.photo.startsWith(photoPrefix) ? t.photo : null,
    });
  }
  return { enabled, items: enabled || preview ? out : [] };
}

/** Opinia na danej stronie: treść w jej języku. Na `/` tylko opinie z wypełnioną wersją EN, na `/pl` - z PL. */
export type ShownTestimonial = Testimonial & { text: string };

export function testimonialsFor(items: readonly Testimonial[], lang: 'pl' | 'en'): ShownTestimonial[] {
  return items
    // Drugi język zerujemy, żeby nie jechał w danych strony (RSC payload) - i tak go tu nie pokazujemy.
    .map((t) => (lang === 'pl' ? { ...t, textEn: '', text: t.textPl } : { ...t, textPl: '', text: t.textEn }))
    .filter((t) => t.text);
}

/** Build: lista opinii widocznych na stronie (wszystkie języki) albo `[]` przy błędzie lub wyłączonej sekcji. */
export async function getTestimonialsAtBuild(): Promise<Testimonial[]> {
  const items = await loadAtBuild();
  return items;
}

async function loadAtBuild(): Promise<Testimonial[]> {
  try {
    // `force-cache` jest wymagany przez static export, ale cache danych Next przeżywa między buildami
    // (lokalnie i na hostingu z cache `.next/cache`). Znacznik procesu w adresie = świeże opinie
    // w każdym buildzie (najwyżej jedno zapytanie na proces budujący strony).
    // Lokalnie świeży znacznik przy każdym odświeżeniu - nowa osoba z panelu widać bez restartu `npm run dev`.
    const preview = process.env.NODE_ENV === 'development';
    const url = `${BUILD_ENDPOINT}${BUILD_ENDPOINT.includes('?') ? '&' : '?'}build=${preview ? Date.now().toString(36) : PROCESS_STAMP}${preview ? '&preview=1' : ''}`;
    const res = await fetch(url, { cache: 'force-cache', signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) {
      console.warn(`[testimonials] ${BUILD_ENDPOINT} odpowiedział ${res.status} - strona bez opinii w HTML`);
      return [];
    }
    return parseTestimonialsPayload(await res.json(), BUILD_ENDPOINT, preview)?.items ?? [];
  } catch (err) {
    console.warn('[testimonials] pobranie opinii przy buildzie nie wyszło - strona bez opinii w HTML:', err);
    return [];
  }
}

let pending: Promise<TestimonialsPayload | null> | null = null;

/** Przeglądarka: aktualny stan z panelu. `null` = błąd, zostaje to, co było w HTML. */
export function fetchTestimonials(): Promise<TestimonialsPayload | null> {
  // W `npm run dev` serwer pobiera opinie przy każdym odświeżeniu, więc drugie zapytanie jest zbędne
  // (i chowałoby przykładowe opinie, gdy produkcja ma sekcję wyłączoną).
  if (process.env.NODE_ENV === 'development') return Promise.resolve(null);
  if (!pending) {
    pending = fetch(PROD_ENDPOINT, { signal: AbortSignal.timeout(TIMEOUT_MS) })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => (data ? parseTestimonialsPayload(data) : null))
      .catch(() => null);
  }
  return pending;
}
