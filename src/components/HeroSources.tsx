/**
 * Pigułka zamykająca hero, tuż nad ekranem panelu (PL i EN): audyt porównuje stronę z realnymi
 * danymi konkurencji z Google, AIO / AI Mode i ChatGPT.
 * Sam tekst, bez logotypów (decyzja 2026-11-13).
 */
const COPY = {
  pl: { lead: 'Na podstawie realnych danych konkurencji w', and: 'i' },
  en: { lead: 'Based on real competitor data from', and: 'and' },
} as const;

export default function HeroSources({ lang }: { lang: 'pl' | 'en' }) {
  const c = COPY[lang];
  return (
    <p className="hero-sources">
      <span className="hero-sources-dot" aria-hidden />
      <span>
        {c.lead} <span className="hero-sources-strong">Google</span>,{' '}
        <span className="hero-sources-strong">AIO / AI Mode</span> {c.and}{' '}
        <span className="hero-sources-strong">ChatGPT</span>
      </span>
      <style>{`
        .hero-sources {
          display: inline-flex; align-items: center; gap: 8px;
          margin: 0 auto; padding: 6px 14px 6px 12px;
          font-size: 13px; line-height: 1.5; color: #36394a;
          background: rgba(255,255,255,0.85); border: 1px solid #d7ecee; border-radius: 999px;
          box-shadow: 0 4px 14px -10px rgba(11,121,131,0.45);
          text-wrap: balance;
        }
        .hero-sources-dot { width: 7px; height: 7px; border-radius: 50%; background: #0b7983; flex-shrink: 0; box-shadow: 0 0 0 3px rgba(11,121,131,0.15); }
        .hero-sources-strong { font-weight: 600; color: #0d0d12; white-space: nowrap; }
        @media (max-width: 480px) {
          .hero-sources { display: block; border-radius: 14px; padding: 7px 12px; font-size: 12.5px; text-align: center; }
          .hero-sources-dot { display: none; }
        }
      `}</style>
    </p>
  );
}
