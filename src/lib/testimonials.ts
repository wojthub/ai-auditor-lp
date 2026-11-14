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
 */

const PROD_ENDPOINT = 'https://app.citationone.com/api/public/testimonials';
const BUILD_ENDPOINT = process.env.TESTIMONIALS_ENDPOINT || PROD_ENDPOINT;
const TIMEOUT_MS = 6000;
const PROCESS_STAMP = Date.now().toString(36);

export type TestimonialLang = 'pl' | 'en' | 'all';

export interface Testimonial {
  id: string;
  lang: TestimonialLang;
  name: string;
  role: string;
  text: string;
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

const LANGS: readonly string[] = ['pl', 'en', 'all'];

function isHttps(v: string): boolean {
  if (/[\s\\\u0000-\u001f\u007f]/.test(v)) return false;
  try {
    return new URL(v).protocol === 'https:';
  } catch {
    return false;
  }
}

/** Odpowiedź jest niezaufana: bierzemy tylko poprawne wpisy, zdjęcie wyłącznie z endpointu aplikacji. */
export function parseTestimonialsPayload(raw: unknown, endpoint: string = PROD_ENDPOINT): TestimonialsPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const { enabled, items } = raw as Record<string, unknown>;
  if (typeof enabled !== 'boolean' || !Array.isArray(items)) return null;
  const photoPrefix = `${new URL(endpoint).origin}/api/public/testimonials/photo/`;
  const out: Testimonial[] = [];
  for (const v of items) {
    if (!v || typeof v !== 'object') continue;
    const t = v as Record<string, unknown>;
    if (typeof t.id !== 'string' || typeof t.name !== 'string' || typeof t.text !== 'string') continue;
    if (!t.name.trim() || !t.text.trim()) continue;
    out.push({
      id: t.id,
      lang: typeof t.lang === 'string' && LANGS.includes(t.lang) ? (t.lang as TestimonialLang) : 'all',
      name: t.name.trim(),
      role: typeof t.role === 'string' ? t.role.trim() : '',
      text: t.text.trim(),
      url: typeof t.url === 'string' && isHttps(t.url) ? t.url : null,
      siteUrl: typeof t.siteUrl === 'string' && isHttps(t.siteUrl) ? t.siteUrl : null,
      photo: typeof t.photo === 'string' && t.photo.startsWith(photoPrefix) ? t.photo : null,
    });
  }
  return { enabled, items: enabled ? out : [] };
}

export function testimonialsFor(items: readonly Testimonial[], lang: 'pl' | 'en'): Testimonial[] {
  return items.filter((t) => t.lang === lang || t.lang === 'all');
}

/**
 * Przykładowe opinie TYLKO dla `npm run dev` (podgląd wyglądu karuzeli). Pokazują się, gdy endpoint
 * nie dał żadnej opinii. Build produkcyjny ma `NODE_ENV=production`, więc nigdy nie trafiają na stronę.
 */
const DEV_SAMPLES: Testimonial[] = [
  {
    id: 'devsample1',
    lang: 'all',
    name: 'Anna Przykładowa',
    role: 'Head of SEO, Agencja Przykład',
    text: 'Raport pokazał dokładnie, których faktów brakuje w naszych opisach kategorii. Po wdrożeniu zmian strona zaczęła pojawiać się w odpowiedziach AI.\n\nNajbardziej cenię porównanie z top 10 - od razu widać, co mają konkurenci, a czego nie mamy my.',
    url: 'https://www.linkedin.com/in/example',
    siteUrl: 'https://example.org/',
    photo: null,
  },
  {
    id: 'devsample2',
    lang: 'pl',
    name: 'Jan Testowy',
    role: 'Właściciel, Sklep Testowy',
    text: 'Szybko i konkretnie. Lista rekomendacji od razu poszła do copywritera.',
    url: null,
    siteUrl: 'https://example.com/',
    photo: null,
  },
  {
    id: 'devsample3',
    lang: 'all',
    name: 'Ewa Demo',
    role: 'Content Lead',
    text: 'Sprawdzamy w CitationOne każdy nowy artykuł przed publikacją. Wynik CQS daje zespołowi jasny cel, a rekomendacje są gotowe do przekazania bez tłumaczenia.',
    url: null,
    siteUrl: null,
    photo: null,
  },
  {
    id: 'devsample4',
    lang: 'en',
    name: 'Sam Example',
    role: 'SEO Consultant',
    text: 'Clear, actionable recommendations. My clients finally understand why AI assistants skip their pages.',
    url: null,
    siteUrl: null,
    photo: null,
  },
  {
    id: 'devsample5',
    lang: 'all',
    name: 'Piotr Próbny',
    role: 'Specjalista SEO',
    text: 'Audyt pokazał, że nasze teksty odpowiadały na pytania dopiero w trzecim akapicie. Po przebudowie wstępów i dodaniu konkretnych danych liczbowych strona weszła do cytowań w AI Overviews dla kilku kluczowych fraz. Raport PDF przekazaliśmy klientowi bez żadnych poprawek, a historia rewizji pozwoliła pokazać postęp z miesiąca na miesiąc.',
    url: null,
    siteUrl: null,
    photo: null,
  },
];

/** Build: lista opinii widocznych na stronie (wszystkie języki) albo `[]` przy błędzie lub wyłączonej sekcji. */
export async function getTestimonialsAtBuild(): Promise<Testimonial[]> {
  const items = await loadAtBuild();
  return items.length === 0 && process.env.NODE_ENV === 'development' ? DEV_SAMPLES : items;
}

async function loadAtBuild(): Promise<Testimonial[]> {
  try {
    // `force-cache` jest wymagany przez static export, ale cache danych Next przeżywa między buildami
    // (lokalnie i na hostingu z cache `.next/cache`). Znacznik procesu w adresie = świeże opinie
    // w każdym buildzie (najwyżej jedno zapytanie na proces budujący strony).
    const url = `${BUILD_ENDPOINT}${BUILD_ENDPOINT.includes('?') ? '&' : '?'}build=${PROCESS_STAMP}`;
    const res = await fetch(url, { cache: 'force-cache', signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) {
      console.warn(`[testimonials] ${BUILD_ENDPOINT} odpowiedział ${res.status} - strona bez opinii w HTML`);
      return [];
    }
    return parseTestimonialsPayload(await res.json(), BUILD_ENDPOINT)?.items ?? [];
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
