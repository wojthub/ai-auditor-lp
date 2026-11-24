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

/**
 * Wartości domyślne wypalone w HTML - te same dla przycisku „Zobacz przykładowy raport”
 * (ReportSection) i interaktywnego raportu w ramce (Showcase).
 */
export const REPORT_URL_FALLBACK = {
  pl: 'https://app.citationone.com/share/AsJEcYwZUG2pzJfkebIyYSCR?lang=pl',
  en: 'https://app.citationone.com/share/BDBhqK8ZvffG9-rKXPNCeUTW?lang=en',
} as const;

/** Adres + informacja, czy odpowiedź panelu już przyszła (albo przepadła). */
export function useReportUrlState(fallback: string, lang: 'pl' | 'en'): { url: string; settled: boolean } {
  const [state, setState] = useState({ url: fallback, settled: false });

  useEffect(() => {
    let cancelled = false;
    fetchLpSettings().then((data) => {
      if (cancelled) return;
      const value = data ? (lang === 'pl' ? data.reportUrlPl : data.reportUrlEn) : null;
      const url = typeof value === 'string' && value.startsWith(SHARE_PREFIX) ? value : fallback;
      setState({ url, settled: true });
    });
    return () => {
      cancelled = true;
    };
  }, [fallback, lang]);

  return state;
}

export function useReportUrl(fallback: string, lang: 'pl' | 'en'): string {
  return useReportUrlState(fallback, lang).url;
}

const SHARE_PATH_RE = /^\/share\/([A-Za-z0-9_-]{24})\/?$/;

/**
 * Link publiczny raportu → jego wersja do ramki (`/share/<token>/embed`, z tym samym `?lang=`).
 * Aplikacja wpuszcza w ramkę wyłącznie tę ścieżkę. Coś innego niż link `/share/<token>` = `null`.
 */
export function toEmbedUrl(shareUrl: string): string | null {
  try {
    const u = new URL(shareUrl);
    const m = SHARE_PATH_RE.exec(u.pathname);
    if (!m || !shareUrl.startsWith(SHARE_PREFIX)) return null;
    u.pathname = `/share/${m[1]}/embed`;
    u.hash = '';
    // `npm run dev`: ramka z LOKALNEJ aplikacji (produkcja moze nie miec jeszcze `/embed`).
    // LP zajmuje port 3000, wiec aplikacja startuje zwykle na 3001; inny port - NEXT_PUBLIC_EMBED_ORIGIN.
    if (process.env.NODE_ENV === 'development') {
      const dev = new URL(process.env.NEXT_PUBLIC_EMBED_ORIGIN || 'http://localhost:3001');
      u.protocol = dev.protocol;
      u.host = dev.host;
    }
    return u.toString();
  } catch {
    return null;
  }
}
