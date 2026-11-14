import { APP_URL } from '@/lib/appUrl';

/**
 * Checki pod formularzem hero (PL i EN, od 2026-11-13). Zastąpiły dwa osobne wiersze: notę
 * „Odbierz 3 darmowe audyty na start. Bez podpinania karty.” i pigułkę źródeł danych.
 * Pierwszy check jest jednocześnie wejściem do rejestracji (ten sam ekran co CTA w navbarze;
 * klik łapie RegisterClickTracker po adresie). Czwarty check prowadzi do podstron API i MCP. Desktop: siatka 2x2, telefon: kolumna.
 */
const COPY = {
  pl: {
    free: '3 darmowe audyty na start',
    card: 'Bez podpinania karty',
    data: <>Na bazie konkurencji z <b>Google</b>, <b>AIO</b> i <b>ChatGPT</b></>,
    api: 'Dostęp przez',
    and: 'i',
    apiHref: '/pl/api',
    mcpHref: '/pl/mcp',
  },
  en: {
    free: '3 free audits to start',
    card: 'No card required',
    data: <>Based on competitors in <b>Google</b>, <b>AIO</b> and <b>ChatGPT</b></>,
    api: 'Access via',
    and: 'and',
    apiHref: '/api',
    mcpHref: '/mcp',
  },
} as const;

function Check() {
  return (
    <svg className="hc-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="#e3f3f4" />
      <path d="M4.6 8.3l2.2 2.2 4.6-4.8" fill="none" stroke="#0b7983" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroChecks({ lang }: { lang: 'pl' | 'en' }) {
  const c = COPY[lang];
  return (
    <ul className="hero-checks">
      <li>
        <Check />
        <a href={`${APP_URL}/register?lang=${lang}`} className="hc-link">{c.free}</a>
      </li>
      <li><Check />{c.card}</li>
      <li><Check /><span>{c.data}</span></li>
      <li>
        <Check />
        <span>{c.api} <a href={c.apiHref} className="hc-link">API</a> {c.and} <a href={c.mcpHref} className="hc-link">MCP</a></span>
      </li>
      <style>{`
        .hero-checks {
          display: grid; grid-template-columns: repeat(2, auto); justify-content: center; gap: 8px 28px; text-align: left;
          margin: 16px auto 0; padding: 0; list-style: none;
          font-size: 13.5px; line-height: 1.45; color: #4a4e5e;
        }
        .hero-checks li { display: flex; align-items: center; gap: 7px; }
        .hero-checks b { font-weight: 600; color: #0d0d12; white-space: nowrap; }
        .hc-icon { flex-shrink: 0; }
        .hc-link {
          color: #0b7983; font-weight: 600;
          text-decoration: underline; text-underline-offset: 2px; text-decoration-thickness: 1px;
          text-decoration-color: rgba(11,121,131,0.35); transition: text-decoration-color 0.16s ease;
        }
        /* Pole dotyku: krotkie linki (API, MCP) mialy 16 px wysokosci. Padding z ujemnym marginesem
           powieksza obszar klikniecia bez zmiany ukladu. */
        .hc-link { padding: 5px 2px; margin: -5px -2px; }
        .hc-link:hover { text-decoration-color: #0b7983; opacity: 1; }
        @media (max-width: 580px) {
          .hero-checks { grid-template-columns: auto; width: fit-content; max-width: 100%; gap: 7px; margin-top: 14px; }
          .hero-checks li { align-items: flex-start; }
          .hc-icon { margin-top: 1px; }
        }
      `}</style>
    </ul>
  );
}
