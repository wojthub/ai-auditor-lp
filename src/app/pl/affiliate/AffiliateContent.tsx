'use client';

import { motion } from 'framer-motion';
import HeroBackdrop from '@/components/HeroBackdrop';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';

// Liczby MUSZA zgadzac sie z ustawieniami programu w aplikacji (`AFFILIATE_COMMISSION_BPS`,
// okno atrybucji w middleware). Zmiana stawki w panelu admina NIE aktualizuje tej strony -
// po kazdej takiej zmianie popraw tu recznie stawke i przyklady wyliczen.
const COMMISSION_PCT = 10;
const COOKIE_DAYS = 30;

const STEPS = [
  {
    n: '01',
    title: 'Odbierasz swój link',
    body: 'Każde konto CitationOne ma własny link polecający - znajdziesz go w panelu, w sekcji programu poleceń. Jest aktywny od pierwszego logowania, dla każdego konta.',
  },
  {
    n: '02',
    title: 'Dzielisz się nim',
    body: 'Wpis na blogu, szkolenie, newsletter, rekomendacja dla klienta agencji. Link prowadzi na stronę logowania, a Twój kod zostaje zapamiętany na komputerze odbiorcy.',
  },
  {
    n: '03',
    title: 'Zarabiasz na każdej płatności',
    body: `Gdy polecona osoba założy konto i kupi kredyty, dopisujemy Ci ${COMMISSION_PCT}% wartości zamówienia. To dotyczy także jej kolejnych zakupów, nie tylko pierwszego.`,
  },
];

const TERMS = [
  {
    title: `Prowizja ${COMMISSION_PCT}% od każdego zamówienia`,
    body: 'Liczona od kwoty netto zamówienia, czyli od tego, co faktycznie zostaje po odjęciu podatku i po uwzględnieniu rabatu. Rozliczenie w euro.',
  },
  {
    title: 'Prowizja od kolejnych zamówień',
    body: 'Polecona osoba wraca po kolejne kredyty? Prowizja nalicza się przy każdym jej zamówieniu w okresie naliczania przypisanym do polecenia, a nie wyłącznie przy pierwszym zakupie.',
  },
  {
    title: `Zapamiętanie kliknięcia na ${COOKIE_DAYS} dni`,
    body: `Od kliknięcia w link masz ${COOKIE_DAYS} dni na to, by odbiorca założył konto. Liczy się pierwsze wejście: kolejny link od kogoś innego nie podmieni Twojego kodu.`,
  },
  {
    title: "Przypisanie zostaje przy Tobie",
    body: "Po rejestracji polecona osoba jest przypisana do Twojego konta - jej późniejsze wejścia z cudzego linku tego nie zmieniają.",
  },
  {
    title: 'Wypłata przelewem albo kredyty',
    body: 'Zatwierdzone saldo możesz zamówić do wypłaty albo wymienić na kredyty audytowe i wykorzystać je u siebie. Wybór należy do Ciebie przy każdym rozliczeniu.',
  },
  {
    title: 'Przejrzysta historia',
    body: 'W panelu widzisz listę poleconych osób ze statusem, każdą naliczoną prowizję i jej etap rozliczenia. Adresy e-mail poleconych pozostają zamaskowane.',
  },
];

const AUDIENCE = [
  {
    title: 'Agencje SEO i contentowe',
    body: 'Audyt jest częścią Twojej oferty, a klient i tak kupuje kredyty na własne konto. Prowizja wraca do agencji przy każdym jego doładowaniu.',
  },
  {
    title: 'Konsultanci i freelancerzy',
    body: 'Rekomendujesz narzędzie przy okazji projektu albo strategii treści. Klient płaci za siebie, a Ty zarabiasz na rekomendacji, którą i tak byś wystawił.',
  },
  {
    title: 'Twórcy i szkoleniowcy',
    body: 'Newsletter o GEO, kurs, webinar, wpis porównujący narzędzia. Link w materiale pracuje długo po publikacji.',
  },
];

const FAQ = [
  {
    q: 'Kto może dołączyć do programu?',
    a: 'Każda osoba z kontem w CitationOne. Konto zakłada się za darmo i od razu ma własny link polecający - udział w programie zaczyna się razem z założeniem konta.',
  },
  {
    q: 'Od jakiej kwoty liczona jest prowizja?',
    a: `Od wartości netto zamówienia poleconej osoby, czyli po odjęciu podatku i po uwzględnieniu rabatu, jaki zastosowała przy zakupie. Stawka to ${COMMISSION_PCT}%, a rozliczenie prowadzimy w euro.`,
  },
  {
    q: 'Czy zarabiam też na kolejnych zakupach?',
    a: 'Tak. Prowizja nalicza się przy kolejnych zamówieniach poleconej osoby, nie tylko przy pierwszym - jedno skuteczne polecenie pracuje przez wiele zakupów. Okres naliczania dla danego polecenia jest ograniczony, a aktualne zasady znajdziesz w panelu, przy swoim saldzie.',
  },
  {
    q: 'Co się dzieje przy zwrocie zamówienia?',
    a: 'Prowizja, która nie została jeszcze rozliczona, zostaje cofnięta razem ze zwrotem. Kwoty już wypłacone lub zamienione na kredyty pozostają Twoje.',
  },
  {
    q: 'Jak odbieram pieniądze?',
    a: 'W panelu zamawiasz wypłatę zatwierdzonego salda albo wymieniasz je na kredyty audytowe. Aktualne warunki rozliczenia widzisz przy saldzie, razem z pełną historią prowizji.',
  },
  {
    q: 'Czy mogę polecić sam siebie?',
    a: 'Program obejmuje polecenia dla innych osób - własne konto zostaje poza rozliczeniem, a system rozpoznaje taką próbę automatycznie.',
  },
];

export default function AffiliateContent() {
  return (
    <section style={{ background: '#ffffff', padding: '44px 0 96px', position: 'relative', overflow: 'hidden' }}>
      <HeroBackdrop />
      <div style={{ maxWidth: 840, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#818898',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            display: 'block', marginBottom: 14,
          }}>
            Program poleceń
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 22,
            background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>
            Zarabiaj {COMMISSION_PCT}% na poleceniach
          </h1>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, maxWidth: 580, margin: '0 auto' }}>
            Polecaj CitationOne klientom i czytelnikom, a przy każdym ich zamówieniu
            dopisujemy Ci {COMMISSION_PCT}% wartości. Link polecający czeka w Twoim panelu -
            program działa na każdym koncie od pierwszego dnia.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="aff-cta-row"
        >
          <motion.a
            href={`${APP_URL}/login?lang=pl`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '15px 32px',
              minHeight: 44,
              borderRadius: 8,
              background: ACCENT,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
            }}
          >
            Odbierz swój link polecający
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>

          <motion.a
            href="/pl/cennik"
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '15px 32px',
              minHeight: 44,
              borderRadius: 8,
              background: '#ffffff',
              border: '1px solid #dfe1e7',
              color: '#0d0d12',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Zobacz, za co płacą polecani
          </motion.a>
        </motion.div>

        {/* Trzy kroki */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em',
            marginTop: 56, marginBottom: 4, textAlign: 'center',
          }}
        >
          Jak to działa
        </motion.h2>
        <div className="aff-steps" style={{ marginTop: 24 }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '24px 20px',
                background: '#ffffff',
              }}
            >
              <span style={{
                fontSize: 12, fontWeight: 700, color: ACCENT,
                letterSpacing: '0.08em', display: 'block', marginBottom: 10,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              }}>
                {s.n}
              </span>
              <h3 style={{
                fontSize: 16, fontWeight: 700, color: "#0d0d12",
                letterSpacing: "-0.015em", marginBottom: 8,
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65, margin: 0 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Przyklad wyliczenia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 48,
            border: '1px solid rgba(11,121,131,0.28)',
            borderRadius: 12,
            padding: '28px 26px',
            background: 'rgba(11,121,131,0.04)',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14,
          }}>
            Ile to daje w praktyce
          </h2>
          <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.7, marginBottom: 20 }}>
            Audyt kosztuje 2 EUR, a większe pakiety schodzą niżej. Prowizja liczy się
            od kwoty netto, więc przy typowych zamówieniach wygląda to tak:
          </p>
          <div className="aff-calc">
            {[
              { label: 'Klient kupuje 25 kredytów', order: '50 EUR', gain: '≈ 5 EUR' },
              { label: 'Klient kupuje 100 kredytów', order: '182 EUR', gain: '≈ 18 EUR' },
              { label: 'Klient kupuje 300 kredytów', order: '462 EUR', gain: '≈ 46 EUR' },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                  gap: 12, flexWrap: 'wrap',
                  padding: '13px 16px', borderRadius: 8,
                  background: '#ffffff', border: '1px solid #dfe1e7',
                }}
              >
                <span style={{ fontSize: 14, color: '#36394a' }}>
                  {row.label}
                  <span style={{ color: '#a4acb9', marginLeft: 8, fontSize: 13 }}>{row.order}</span>
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, color: ACCENT }}>{row.gain}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#818898', lineHeight: 1.6, marginTop: 16, marginBottom: 0 }}>
            Kwoty przykładowe, zaokrąglone. Faktyczna prowizja liczy się od wartości netto
            konkretnego zamówienia i powtarza przy każdym kolejnym zakupie tej samej osoby.
          </p>
        </motion.div>

        {/* Warunki */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em',
            marginTop: 56, marginBottom: 6, textAlign: 'center',
          }}
        >
          Zasady programu
        </motion.h2>
        <p style={{
          fontSize: 14.5, color: '#666d80', lineHeight: 1.65,
          textAlign: 'center', maxWidth: 520, margin: '0 auto',
        }}>
          Sześć rzeczy, które warto znać przed pierwszym poleceniem.
        </p>

        <div className="aff-grid">
          {TERMS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '22px 20px',
                background: '#ffffff',
              }}
            >
              <h3 style={{
                fontSize: 15.5, fontWeight: 700, color: '#0d0d12',
                letterSpacing: '-0.015em', marginBottom: 8,
              }}>
                {t.title}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65, margin: 0 }}>
                {t.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dla kogo */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em',
            marginTop: 56, marginBottom: 24, textAlign: 'center',
          }}
        >
          Odbiorcy
        </motion.h2>

        <div className="aff-steps">
          {AUDIENCE.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '22px 20px',
                background: '#f8fafb',
              }}
            >
              <h3 style={{
                fontSize: 15.5, fontWeight: 700, color: '#0d0d12',
                letterSpacing: '-0.015em', marginBottom: 8,
              }}>
                {a.title}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65, margin: 0 }}>
                {a.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em',
            marginTop: 56, marginBottom: 24, textAlign: 'center',
          }}
        >
          Częste pytania
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQ.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="aff-faq"
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '16px 20px',
                background: '#ffffff',
              }}
            >
              <summary style={{
                fontSize: 15, fontWeight: 600, color: '#0d0d12',
                cursor: 'pointer', listStyle: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              }}>
                {item.q}
                <span aria-hidden style={{ color: ACCENT, fontSize: 18, lineHeight: 1, flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.7, margin: '12px 0 0' }}>
                {item.a}
              </p>
            </motion.details>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <p style={{ fontSize: 15, color: '#666d80', lineHeight: 1.7, marginBottom: 20 }}>
            Link polecający czeka w panelu, w sekcji programu poleceń.
            Konto zakładasz za darmo, a pierwsze 3 audyty są bez opłat.
          </p>
          <motion.a
            href={`${APP_URL}/login?lang=pl`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '15px 36px',
              minHeight: 44,
              borderRadius: 8,
              background: ACCENT,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
            }}
          >
            Zacznij polecać
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>

      </div>

      <style>{`
        .aff-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .aff-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .aff-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }
        .aff-calc {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .aff-faq summary::-webkit-details-marker { display: none; }
        .aff-faq[open] summary > span { transform: rotate(45deg); }
        .aff-faq summary > span { transition: transform 0.2s ease; }
        @media (max-width: 768px) {
          .aff-steps { grid-template-columns: 1fr; }
          .aff-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 580px) {
          .aff-cta-row > a { width: 100%; }
        }
      `}</style>
    </section>
  );
}
