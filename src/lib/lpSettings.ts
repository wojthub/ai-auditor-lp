/**
 * Wartości LP edytowalne z panelu admina aplikacji (`/ustawienia` → „Strona citationone.com”).
 *
 * LP jest statyczne (`output: 'export'`), więc wszystko, co ma się zmieniać bez przebudowy,
 * przychodzi w runtime z `app.citationone.com/api/public/lp-links`. Obietnica jest współdzielona
 * na poziomie modułu: kilka sekcji na jednej stronie (przykładowy raport, liczby social proof)
 * robi razem jedno zapytanie. Błąd, timeout albo CORS dają `null` - każdy konsument ma własny
 * fallback wypalony w HTML.
 */

const ENDPOINT = 'https://app.citationone.com/api/public/lp-links';
const TIMEOUT_MS = 4000;

export interface LpSettings {
  reportUrlPl?: unknown;
  reportUrlEn?: unknown;
  stats?: { users?: unknown; audits?: unknown; pages?: unknown };
}

let pending: Promise<LpSettings | null> | null = null;

export function fetchLpSettings(): Promise<LpSettings | null> {
  if (!pending) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    pending = fetch(ENDPOINT, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null)
      .finally(() => clearTimeout(timer));
  }
  return pending;
}
