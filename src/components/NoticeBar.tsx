'use client';

import { useState } from 'react';
import { APP_URL } from '@/lib/appUrl';

/**
 * TYMCZASOWY pasek nad navbarem (od 2026-10-31): komunikat po naprawie danych SERP w aplikacji.
 * - wrzesien-pazdziernik 2026: Google zatruwal SERP-y dostawcom, audyt porownywal tresc z czolowka
 *   inna niz u uzytkownika - od 28.10 nowe zrodlo wynikow;
 * - 30.10: Google podmienil adresy w wynikach na posrednikow `google.com/goto`, audyty mialy 1-3
 *   konkurentow zamiast 8-10 - naprawione 30-31.10 (changelog aplikacji, wpis 2026-10-31).
 * Usunac po kilku tygodniach: wywolanie w Navbar.tsx i NavbarEN.tsx plus ten plik.
 *
 * Zamkniecie dziala tylko do przeladowania strony. Zapamietanie w localStorage chowaloby pasek
 * dopiero po hydratacji, czyli skok ukladu u kazdego, kto go wczesniej zamknal.
 * Pasek NIE jest sticky - przewija sie z trescia, a sticky navbar zostaje u gory jak dotad.
 */
const COPY = {
  pl: {
    text: 'Wyniki Google w audycie są znowu pełne i wiarygodne.',
    short: 'Wyniki Google znowu pełne i wiarygodne',
    cta: 'Zrób darmowy audyt',
    close: 'Zamknij komunikat',
  },
  en: {
    text: 'Google results in your audit are complete and reliable again.',
    short: 'Google results complete and reliable again',
    cta: 'Run a free audit',
    close: 'Close notice',
  },
} as const;

export default function NoticeBar({ lang }: { lang: 'pl' | 'en' }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const c = COPY[lang];

  return (
    <div
      role="region"
      aria-label={lang === 'pl' ? 'Komunikat' : 'Notice'}
      style={{ background: '#085C62', color: '#ffffff', fontSize: 13, lineHeight: 1.45 }}
    >
      <div
        style={{
          maxWidth: 1024,
          margin: '0 auto',
          padding: '8px 44px 8px 16px',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* Desktop: pelny tekst + CTA. Mobile: krotki tekst, caly jako link - bez osobnej linijki
            z CTA, bo „Wyprobuj za darmo” stoi tuz pod paskiem w navbarze. */}
        <span className="hidden md:inline">
          {c.text}{' '}
          <a
            href={`${APP_URL}/register?lang=${lang}`}
            style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2, whiteSpace: 'nowrap' }}
          >
            {c.cta} →
          </a>
        </span>
        <a
          href={`${APP_URL}/register?lang=${lang}`}
          className="md:hidden"
          style={{ color: '#ffffff', textDecoration: 'none' }}
        >
          {c.short}
        </a>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={c.close}
          style={{
            position: 'absolute',
            right: 4,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            opacity: 0.8,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
