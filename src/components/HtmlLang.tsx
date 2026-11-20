'use client';

import { useEffect } from 'react';

/**
 * Ustawia `lang` na <html> po przejściu na stronę bez przeładowania (np. z `/` na `/pl` przez <Link>).
 * Root layout zostaje między stronami, więc jego `lang="en"` by się nie zmienił. Pierwsze wejście
 * na stronę /pl ma `lang="pl"` już w HTML (scripts/set-html-lang.mjs po buildzie).
 */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.lang;
    el.lang = lang;
    return () => {
      el.lang = prev === lang ? 'en' : prev;
    };
  }, [lang]);
  return null;
}
