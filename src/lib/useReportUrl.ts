'use client';

import { useEffect, useState } from 'react';
import { fetchLpSettings } from './lpSettings';

/**
 * Adres przykładowego raportu, edytowalny z panelu admina aplikacji.
 *
 * LP jest statyczne (`output: 'export'`), więc link wbudowany w HTML jest wartością domyślną,
 * a właściwą wersję dociągamy w runtime przez `fetchLpSettings` (klucze ustawień
 * `LP_REPORT_URL_PL` / `LP_REPORT_URL_EN`). Gdy aplikacja nie odpowie, pole jest puste albo
 * odpowiedź wygląda inaczej niż link do udostępnionego raportu - zostaje `fallback`, czyli
 * przycisk nigdy nie prowadzi donikąd.
 */

const SHARE_PREFIX = 'https://app.citationone.com/share/';

export function useReportUrl(fallback: string, lang: 'pl' | 'en'): string {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    fetchLpSettings().then((data) => {
      if (cancelled || !data) return;
      const value = lang === 'pl' ? data.reportUrlPl : data.reportUrlEn;
      if (typeof value === 'string' && value.startsWith(SHARE_PREFIX)) setUrl(value);
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return url;
}
