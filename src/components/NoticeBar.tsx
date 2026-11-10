'use client';

import { useEffect, useState } from 'react';
import { fetchLpSettings } from '@/lib/lpSettings';

/**
 * Pasek komunikatu nad navbarem. Treść wpisuje się w panelu admina aplikacji (`/admin/lp`, karta
 * „Pasek komunikatu na citationone.com”), a strona czyta ją w runtime z `/api/public/lp-links`
 * (pole `notice`, osobno PL i EN). Pusty tekst w panelu = brak paska w danym języku.
 *
 * Pasek NIE ma fallbacku w kodzie: komunikat jest z natury tymczasowy, więc przy błędzie albo
 * przekroczeniu czasu odpowiedzi lepiej nie pokazać nic niż nieaktualną treść. Koszt: pasek pojawia się
 * dopiero po odpowiedzi i przesuwa stronę w dół o swoją wysokość (endpoint jest w cache CDN,
 * więc zwykle to ułamek sekundy). Wywołanie siedzi w Navbar.tsx i NavbarEN.tsx.
 *
 * Link jest opcjonalny. Desktop: tekst + podkreślony link. Mobile: sam tekst, a przy linku cały
 * pasek jest linkiem (osobna etykieta zajmowałaby drugą linijkę). Adres spoza citationone.com
 * otwiera się w nowej karcie.
 *
 * Zamknięcie działa tylko do przeładowania strony. Zapamiętanie w localStorage chowałoby pasek
 * dopiero po hydratacji, czyli skok układu u każdego, kto go wcześniej zamknął.
 * Pasek NIE jest sticky - przewija się z treścią, a sticky navbar zostaje u góry jak dotąd.
 */
const COPY = {
  pl: { defaultLabel: 'Sprawdź', close: 'Zamknij komunikat', region: 'Komunikat' },
  en: { defaultLabel: 'Learn more', close: 'Close notice', region: 'Notice' },
} as const;

interface Notice {
  text: string;
  linkUrl: string | null;
  linkLabel: string | null;
}

/** Odpowiedź endpointu jest niezaufana - przyjmujemy tylko poprawny kształt i bezpieczny adres. */
function parseNotice(raw: unknown): Notice | null {
  if (!raw || typeof raw !== 'object') return null;
  const { text, linkUrl, linkLabel } = raw as Record<string, unknown>;
  if (typeof text !== 'string' || !text.trim()) return null;
  const url = typeof linkUrl === 'string' && isSafeHref(linkUrl) ? linkUrl : null;
  const label = typeof linkLabel === 'string' && linkLabel.trim() ? linkLabel.trim() : null;
  return { text: text.trim(), linkUrl: url, linkLabel: label };
}

/** Ta sama reguła co przy zapisie w panelu: `/\host` i `/<tab>/host` przeglądarka czyta jak `//host`. */
function isSafeHref(href: string): boolean {
  if (/[\s\\\u0000-\u001f\u007f]/.test(href)) return false;
  if (href.startsWith('/') && !href.startsWith('//')) return true;
  try {
    return new URL(href).protocol === 'https:';
  } catch {
    return false;
  }
}

function isExternal(href: string): boolean {
  if (href.startsWith('/')) return false;
  try {
    const host = new URL(href).hostname;
    return host !== 'citationone.com' && !host.endsWith('.citationone.com');
  } catch {
    return false;
  }
}

export default function NoticeBar({ lang }: { lang: 'pl' | 'en' }) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchLpSettings().then((s) => {
      if (alive) setNotice(parseNotice(s?.notice?.[lang]));
    });
    return () => {
      alive = false;
    };
  }, [lang]);

  if (!notice || !open) return null;
  const c = COPY[lang];
  const href = notice.linkUrl;
  const newTab = href && isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <div
      role="region"
      aria-label={c.region}
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
        {href ? (
          <>
            <span className="hidden md:inline">
              {notice.text}{' '}
              <a
                href={href}
                {...newTab}
                style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2, whiteSpace: 'nowrap' }}
              >
                {notice.linkLabel ?? c.defaultLabel} →
              </a>
            </span>
            <a href={href} {...newTab} className="md:hidden" style={{ color: '#ffffff', textDecoration: 'none' }}>
              {notice.text}
            </a>
          </>
        ) : (
          <span>{notice.text}</span>
        )}
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
