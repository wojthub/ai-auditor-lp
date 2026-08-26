'use client';

import { useEffect, useState } from 'react';

/**
 * Adres przykładowego raportu, edytowalny z panelu admina aplikacji.
 *
 * LP jest statyczne (`output: 'export'`), więc link wbudowany w HTML jest wartością domyślną,
 * a właściwą wersję dociągamy w runtime z `app.citationone.com/api/public/lp-links`
 * (klucze ustawień `LP_REPORT_URL_PL` / `LP_REPORT_URL_EN`). Gdy aplikacja nie odpowie,
 * pole jest puste albo odpowiedź wygląda inaczej niż link do udostępnionego raportu —
 * zostaje `fallback`, czyli przycisk nigdy nie prowadzi donikąd.
 */

const ENDPOINT = 'https://app.citationone.com/api/public/lp-links';
const SHARE_PREFIX = 'https://app.citationone.com/share/';
const TIMEOUT_MS = 4000;

export function useReportUrl(fallback: string, lang: 'pl' | 'en'): string {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    fetch(ENDPOINT, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const value = lang === 'pl' ? data.reportUrlPl : data.reportUrlEn;
        if (typeof value === 'string' && value.startsWith(SHARE_PREFIX)) setUrl(value);
      })
      .catch(() => {
        // Brak sieci, timeout, CORS - zostaje fallback. Cisza jest tu zamierzona.
      })
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [lang]);

  return url;
}
