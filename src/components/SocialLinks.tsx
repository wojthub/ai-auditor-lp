/**
 * Profile CitationOne w social media - ikony w stopce (PL i EN przez prop `lang`).
 *
 * Ikony sa inline SVG, tak jak reszta ikon na LP (nie ma tu biblioteki ikon). Kolor bierze
 * `currentColor`, wiec hover zmienia go jednym miejscem. Linki wychodza poza serwis, wiec maja
 * `target="_blank"` + `rel="noopener noreferrer"`; etykieta `aria-label` jest po to, ze sama
 * ikona nie ma tekstu do odczytania.
 */

const PROFILES = [
  {
    name: 'Facebook',
    // Polska etykieta wymaga miejscownika („na Facebooku"), wiec forma stoi osobno.
    labelPl: 'na Facebooku',
    href: 'https://www.facebook.com/profile.php?id=61591623376464',
    // Prostokat z wycieta litera „f" - jeden `path` z `fill-rule`, bez zaleznosci.
    path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z',
  },
  {
    name: 'LinkedIn',
    labelPl: 'na LinkedInie',
    href: 'https://www.linkedin.com/company/citationone/',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  },
];

export default function SocialLinks({ lang }: { lang: 'pl' | 'en' }) {
  return (
    <div className="flex items-center" style={{ gap: 2 }}>
      {PROFILES.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === 'pl' ? `CitationOne ${p.labelPl}` : `CitationOne on ${p.name}`}
          className="social-link"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d={p.path} />
          </svg>
        </a>
      ))}

      <style>{`
        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          /* 36 px pola trafienia przy 17 px ikonie - w stopce stoja obok siebie dwa cele dotykowe. */
          width: 36px;
          height: 36px;
          border-radius: 6px;
          color: #a4acb9;
          transition: color 0.16s ease, background 0.16s ease;
        }
        .social-link:hover { color: #0b7983; background: #f2f5f6; }
      `}</style>
    </div>
  );
}
