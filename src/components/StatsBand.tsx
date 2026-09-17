'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchLpSettings } from '@/lib/lpSettings';

/**
 * Pas liczb social proof pod pokazem panelu (PL i EN - jeden komponent, bo różni się tylko copy).
 *
 * Liczby ustawia admin w aplikacji (`/ustawienia`, klucze `LP_STAT_USERS` / `LP_STAT_AUDITS` /
 * `LP_STAT_PAGES`), a LP dociąga je w runtime przez `fetchLpSettings`. `FALLBACK` to wartości
 * wypalone w HTML: widać je przed odpowiedzią aplikacji i zostają, gdy jej zabraknie.
 * Wartość to cyfry z opcjonalnym „+” - separatory tysięcy i polską formę liczebnika dokłada
 * dopiero ten komponent, więc w panelu wpisuje się gołą liczbę.
 */

type StatKey = 'users' | 'audits' | 'pages';

const FALLBACK: Record<StatKey, string> = {
  users: '600',
  audits: '5000+',
  pages: '40000',
};

const VALUE_RE = /^\d{1,9}\+?$/;

/** Formy PL: [1, 2-4, 5+]. Każda etykieta ma przymiotnik zgodny z rzeczownikiem. */
const LABELS: Record<'pl' | 'en', Record<StatKey, string[]>> = {
  pl: {
    users: ['użytkownik', 'użytkownicy', 'użytkowników'],
    audits: ['wykonany audyt', 'wykonane audyty', 'wykonanych audytów'],
    pages: ['przeanalizowana strona', 'przeanalizowane strony', 'przeanalizowanych stron'],
  },
  en: {
    users: ['user', 'users', 'users'],
    audits: ['audit completed', 'audits completed', 'audits completed'],
    pages: ['page analyzed', 'pages analyzed', 'pages analyzed'],
  },
};

const ORDER: StatKey[] = ['users', 'audits', 'pages'];

/**
 * „5000+” → „5 000+” (PL, twarda spacja) / „5,000+” (EN).
 * Przy „+” liczba oznacza „ponad”, więc etykieta idzie w dopełniaczu (forma 5+) niezależnie od końcówki.
 */
function present(raw: string, lang: 'pl' | 'en', forms: string[]): { value: string; label: string } {
  const plus = raw.endsWith('+');
  const n = parseInt(raw, 10);
  const value = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'pl' ? ' ' : ',') + (plus ? '+' : '');
  let form = 2;
  if (!plus) {
    if (n === 1) form = 0;
    else if (lang === 'en') form = 1;
    else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) form = 1;
  }
  return { value, label: forms[form] };
}

export default function StatsBand({ lang }: { lang: 'pl' | 'en' }) {
  const [stats, setStats] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchLpSettings().then((data) => {
      if (cancelled || !data?.stats) return;
      const next = { ...FALLBACK };
      for (const key of ORDER) {
        const v = data.stats[key];
        if (typeof v === 'string' && VALUE_RE.test(v)) next[key] = v;
      }
      setStats(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section style={{ background: '#ffffff', padding: '56px 0', borderBottom: '1px solid #eceff3' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="stats-band"
        >
          {ORDER.map((key) => {
            const { value, label } = present(stats[key], lang, LABELS[lang][key]);
            return (
              <li key={key} className="stats-band-item">
                {/* Ten sam gradient co „CitationOne” w sekcji Problem. `inline-block`, bo przy `block`
                    tło rozciąga się na całą kolumnę i krótka liczba dostaje tylko ciemny początek. */}
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 'clamp(2.25rem, 5vw, 3rem)',
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: '#0b7983',
                    letterSpacing: '-0.035em',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {value}
                </span>
                <span style={{ display: 'block', marginTop: 10, fontSize: 15, color: '#666d80', lineHeight: 1.4 }}>
                  {label}
                </span>
              </li>
            );
          })}
        </motion.ul>
      </div>

      <style>{`
        .stats-band {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .stats-band-item {
          text-align: center;
          padding: 4px 16px;
        }
        .stats-band-item + .stats-band-item {
          border-left: 1px solid #dfe1e7;
        }
        @media (max-width: 640px) {
          .stats-band { grid-template-columns: 1fr; }
          .stats-band-item { padding: 20px 0; }
          .stats-band-item + .stats-band-item { border-left: 0; border-top: 1px solid #dfe1e7; }
        }
      `}</style>
    </section>
  );
}
