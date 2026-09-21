'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import BrandMorph from './BrandMorph';
import { enCounterpart } from '@/lib/languageSwitch';
import { APP_URL } from '@/lib/appUrl';

/** Menu „Narzedzia" - same narzedzia dodatkowe, osobne od audytu tresci (AUDIT_MENU). */
const TOOLS_MENU: { href: string; label: string; desc: string }[] = [
  { href: '/pl/narzedzia/klasteryzacja', label: 'Klasteryzacja słów kluczowych', desc: 'Przypisz słowa kluczowe do stron docelowych' },
  { href: '/pl/narzedzia/pruning', label: 'Content Pruning i kanibalizacja', desc: 'Strony rozmywające temat i walczące o tę samą frazę' },
  { href: '/pl/narzedzia/analiza-schema', label: 'Analiza schema.org', desc: 'Uzupełnij brakujące znaczniki w kodzie' },
  { href: '/pl/narzedzia/linki-wewnetrzne', label: 'Linki wewnętrzne', desc: 'Zobacz, który akapit gdzie podlinkować' },
];

/** Menu „Audyt tresci" - jeden produkt z trzech stron: mechanizm, kryteria, skala. */
const AUDIT_MENU: { href: string; label: string; desc: string }[] = [
  { href: '/pl/jak-to-dziala', label: 'Jak działa audytor?', desc: 'Droga od adresu URL do gotowych poprawek' },
  { href: '/pl/wymiary', label: 'Wymiary oceny', desc: '10 kryteriów, które decydują o cytowaniu przez AI' },
  { href: '/pl#masowy-audyt', label: 'Audyt masowy', desc: 'Cały serwis w jednym przebiegu' },
  // API v1 obsluguje WYLACZNIE audyty (/audits, /audits/bulk, /me) - zadne z narzedzi nie ma
  // endpointu, wiec to czwarte wejscie do tego samego produktu, nie osobna pozycja paska.
  { href: '/pl/api', label: 'API', desc: 'Zlecanie audytów przez REST i JSON' },
];

/** Menu „Cennik" - zasady platnosci obok programu polecen, czyli drugiej strony tego samego tematu. */
const PRICING_MENU: { href: string; label: string; desc: string }[] = [
  { href: '/pl/cennik', label: 'Cennik', desc: '3 darmowe audyty, potem 2 EUR za audyt' },
  { href: '/pl/affiliate', label: 'Program poleceń', desc: 'Prowizja 10% od zamówień poleconych osób' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  // Przelacznik prowadzi na ANGIELSKI ODPOWIEDNIK biezacej podstrony, nie na strone glowna.
  const enHref = enCounterpart(usePathname());

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #dfe1e7',
      }}
    >
      <div
        className="flex items-center justify-between nav-row"
        style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, height: 64 }}
      >
        {/* Logo */}
        <a href="/pl" className="flex items-center nav-logo" style={{ textDecoration: 'none', fontSize: 22 }}>
          <BrandMorph />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center nav-desktop">
          {/* Audyt tresci - trigger jest LINKIEM na /pl/jak-to-dziala, zeby glowna podstrona nie
              zniknela za rozwinieciem. „Audyt masowy" to kotwica na HP (pelna sciezka, bo menu
              jest tez na podstronach). */}
          <div className="nav-dd">
            <a href="/pl/jak-to-dziala" className="nav-link nav-dd-trigger" aria-haspopup="true">
              Audyt treści
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
            <div className="nav-dd-menu">
              <div className="nav-dd-card">
                {AUDIT_MENU.map((item) => (
                  <a key={item.label} href={item.href} className="nav-dd-item">
                    <span className="nav-dd-label">{item.label}</span>
                    <span className="nav-dd-desc">{item.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Narzedzia + rozwijane menu (hover i :focus-within - bez JS, dziala od razu po SSR) */}
          <div className="nav-dd">
            <button type="button" className="nav-link nav-dd-trigger" aria-haspopup="true">
              Narzędzia
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="nav-dd-menu">
              <div className="nav-dd-card">
                {TOOLS_MENU.map((item) => (
                  <a key={item.label} href={item.href} className="nav-dd-item">
                    <span className="nav-dd-label">{item.label}</span>
                    <span className="nav-dd-desc">{item.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Cennik - trigger jest LINKIEM na /pl/cennik, tak jak „Audyt tresci”: sama podstrona
              cennika zostaje osiagalna jednym klikiem, mimo ze pozycja ma rozwiniecie. */}
          <div className="nav-dd">
            <a href="/pl/cennik" className="nav-link nav-dd-trigger" aria-haspopup="true">
              Cennik
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
            <div className="nav-dd-menu">
              <div className="nav-dd-card">
                {PRICING_MENU.map((item) => (
                  <a key={item.label} href={item.href} className="nav-dd-item">
                    <span className="nav-dd-label">{item.label}</span>
                    <span className="nav-dd-desc">{item.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* DWA wejscia zamiast jednego „Zrob audyt": wracajacy uzytkownik szukal logowania i
              nie mial gdzie kliknac, a nowy nie widzial, ze start jest darmowy. Kreska oddziela
              nawigacje po tresci od akcji konta. „Zrob audyt" znika stad swiadomie - prowadzil
              pod ten sam adres co rejestracja, a glowne CTA zostaje w hero, przy polu z URL-em. */}
          <span aria-hidden className="nav-sep" />
          <a href={`${APP_URL}/login?lang=pl`} className="nav-login">Zaloguj się</a>
          <a href={`${APP_URL}/register?lang=pl`} className="nav-cta">Wypróbuj za darmo</a>
          <a href={enHref} className="nav-lang" title="English version">EN</a>
        </div>

        {/* Prawa strona paska na mobile: szybkie wejscie do audytu + hamburger.
            Link jest TEKSTOWY, nie wypelnionym przyciskiem - nad zgiecciem stoi juz CTA przy
            inpucie hero i prowadzi pod ten sam `/register`; drugi przycisk w akcencie
            rozmywalby hierarchie. Logowanie siedzi w rozwinietym menu. */}
        <div className="md:hidden flex items-center nav-mobile-right">
          <a href={`${APP_URL}/register?lang=pl`} className="nav-mobile-login">Wypróbuj za darmo</a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center nav-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
            style={{
              width: 44,
              height: 44,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 6,
              padding: 0,
            }}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d0d12" strokeWidth={2} strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d0d12" strokeWidth={2} strokeLinecap="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="md:hidden nav-mobile-panel"
          style={{
            borderTop: '1px solid #eceff3',
            background: '#ffffff',
            padding: '12px 24px 20px',
          }}
        >
          {/* Audyt tresci: wiersz rozwijany; pierwsza pozycja to pelna podstrona „Jak dziala audytor?". */}
          <button
            type="button"
            onClick={() => setAuditOpen(!auditOpen)}
            aria-expanded={auditOpen}
            className="nav-mobile-link nav-mobile-toggle"
          >
            Audyt treści
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden
              style={{ transform: auditOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.16s ease' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {auditOpen && (
            <div className="nav-mobile-sub">
              {AUDIT_MENU.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="nav-mobile-sublink">
                  {item.label}
                </a>
              ))}
            </div>
          )}
          {/* Narzedzia: wiersz rozwijany, zeby menu mobilne nie urraslo o 7 pozycji na starcie */}
          <button
            type="button"
            onClick={() => setToolsOpen(!toolsOpen)}
            aria-expanded={toolsOpen}
            className="nav-mobile-link nav-mobile-toggle"
          >
            Narzędzia
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden
              style={{ transform: toolsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.16s ease' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {toolsOpen && (
            <div className="nav-mobile-sub">
              {TOOLS_MENU.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="nav-mobile-sublink">
                  {item.label}
                </a>
              ))}
            </div>
          )}
          {/* Cennik: wiersz rozwijany - pierwsza pozycja to pelna podstrona cennika. */}
          <button
            type="button"
            onClick={() => setPricingOpen(!pricingOpen)}
            aria-expanded={pricingOpen}
            className="nav-mobile-link nav-mobile-toggle"
          >
            Cennik
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden
              style={{ transform: pricingOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.16s ease' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {pricingOpen && (
            <div className="nav-mobile-sub">
              {PRICING_MENU.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="nav-mobile-sublink">
                  {item.label}
                </a>
              ))}
            </div>
          )}
          <a href={enHref} onClick={() => setMobileOpen(false)} className="nav-mobile-link">
            EN - English version
          </a>
          {/* Oba wejscia na DOLE menu, w zasiegu kciuka: najpierw to dla nowych, pod nim logowanie. */}
          <a
            href={`${APP_URL}/register?lang=pl`}
            onClick={() => setMobileOpen(false)}
            className="nav-mobile-cta"
          >
            Wypróbuj za darmo
          </a>
          <a
            href={`${APP_URL}/login?lang=pl`}
            onClick={() => setMobileOpen(false)}
            className="nav-mobile-secondary"
          >
            Zaloguj się
          </a>
        </div>
      )}

      <style>{`
        .nav-link {
          font-size: 15px;
          font-weight: 500;
          color: #36394a;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 6px;
          transition: color 0.14s ease;
          letter-spacing: -0.015em;
        }
        .nav-link:hover {
          color: #0b7983;
          opacity: 1;
        }
        .nav-dd {
          position: relative;
        }
        .nav-dd-trigger {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          font-family: inherit;
          line-height: inherit;
          cursor: default;
        }
        /* Trigger „Audytu tresci" jest linkiem - inaczej niz przycisk narzedzi ma dokad prowadzic. */
        a.nav-dd-trigger {
          cursor: pointer;
        }
        .nav-dd-menu {
          position: absolute;
          top: 100%;
          left: 0;
          padding-top: 10px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-4px);
          transition: opacity 0.14s ease, transform 0.14s ease, visibility 0.14s;
        }
        .nav-dd:hover .nav-dd-menu,
        .nav-dd:focus-within .nav-dd-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .nav-dd-card {
          width: 292px;
          background: #ffffff;
          border: 1px solid #dfe1e7;
          border-radius: 12px;
          box-shadow: 0 12px 32px rgba(13,13,18,0.10);
          padding: 6px;
        }
        .nav-dd-item {
          display: block;
          padding: 9px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.14s ease;
        }
        .nav-dd-item:hover {
          background: #f8fafb;
          opacity: 1;
        }
        .nav-dd-label {
          display: block;
          font-size: 14.5px;
          font-weight: 600;
          color: #0d0d12;
          letter-spacing: -0.015em;
        }
        .nav-dd-desc {
          display: block;
          font-size: 11.5px;
          color: #818898;
          line-height: 1.45;
          margin-top: 2px;
        }
        /* Podwojna klasa - .nav-mobile-link jest nizej w arkuszu i inaczej nadpisalby display */
        .nav-mobile-link.nav-mobile-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          border-bottom: 1px solid #eceff3;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }
        .nav-mobile-sub {
          padding: 4px 0 8px 14px;
          border-bottom: 1px solid #eceff3;
        }
        .nav-mobile-sublink {
          display: block;
          font-size: 15px;
          color: #666d80;
          text-decoration: none;
          padding: 10px 0;
          letter-spacing: -0.015em;
        }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          padding: 11px 20px;
          min-height: 44px;
          border-radius: 6px;
          background: #0b7983;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          margin-left: 8px;
          letter-spacing: -0.015em;
          transition: background 0.14s ease;
        }
        .nav-cta:hover {
          background: #097380;
          opacity: 1;
        }
        /* Kreska miedzy nawigacja po tresci a akcjami konta - bez niej piec pozycji w rzedzie
           czyta sie jak jedno menu, a „Zaloguj sie" gubi sie miedzy „Cennik" a przyciskiem. */
        .nav-sep {
          width: 1px;
          height: 24px;
          background: #dfe1e7;
          margin: 0 10px 0 14px;
        }
        /* Drugorzedne wejscie: ta sama wysokosc co CTA, ale obrys zamiast wypelnienia. */
        .nav-login {
          display: inline-flex;
          align-items: center;
          padding: 10px 18px;
          min-height: 44px;
          border-radius: 6px;
          border: 1px solid #0b7983;
          background: #ffffff;
          color: #0b7983;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: -0.015em;
          transition: background 0.14s ease;
        }
        .nav-login:hover {
          background: #eaf4f5;
          opacity: 1;
        }
        .nav-lang {
          font-size: 13px;
          font-weight: 600;
          color: #a4acb9;
          text-decoration: none;
          padding: 5px 10px;
          margin-left: 4px;
          border-radius: 4px;
          border: 1px solid #dfe1e7;
          letter-spacing: 0.02em;
          transition: color 0.14s ease, border-color 0.14s ease;
        }
        .nav-lang:hover {
          color: #0b7983;
          border-color: #0b7983;
        }
        .nav-mobile-link {
          display: block;
          font-size: 16px;
          font-weight: 500;
          color: #36394a;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid #eceff3;
          letter-spacing: -0.015em;
        }
        .nav-mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-top: 12px;
          padding: 14px 20px;
          border-radius: 8px;
          background: #0b7983;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: -0.015em;
        }
        /* Logowanie pod CTA: obrys, ta sama wysokosc - wracajacy uzytkownik ma je znalezc
           w menu, a nie tylko na pasku. */
        .nav-mobile-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 10px;
          padding: 14px 20px;
          border-radius: 8px;
          border: 1px solid #0b7983;
          background: #ffffff;
          color: #0b7983;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: -0.015em;
        }
        @media (min-width: 820px) and (max-width: 1023px) {
          .nav-link { padding: 6px 7px; font-size: 14px; }
          .nav-cta { padding: 11px 13px; font-size: 14px; }
          .nav-login { padding: 10px 12px; font-size: 14px; }
          .nav-sep { margin: 0 6px 0 10px; }
          .nav-lang { margin-left: 6px; }
        }
        /* Link „zaloguj" przy hamburgerze: bez tla i ramki, 44 px pola trafienia. */
        .nav-mobile-login {
          display: inline-flex;
          align-items: center;
          height: 44px;
          padding: 0 10px;
          font-size: 15px;
          font-weight: 600;
          color: #0b7983;
          text-decoration: none;
          letter-spacing: -0.015em;
          white-space: nowrap;
        }
        .nav-mobile-login:hover { opacity: 1; color: #097380; }
        @media (max-width: 819px) {
          .nav-desktop { display: none !important; }
          /* Prog paska jest szerszy niz Tailwindowe md, wiec kontener tez musi go znac. */
          .nav-mobile-right { display: flex !important; }
          .nav-burger { display: inline-flex !important; }
          .nav-mobile-panel { display: block !important; }
        }
        /* Na waskim ekranie trzy elementy nie mieszcza sie w 64 px wysokosci paska: logo ma
           STALA szerokosc (rezerwacja pod animacje pisania), a CTA urioslo z „Zrob audyt" do
           „Wyprobuj za darmo". Bez tego hamburger byl wypychany poza krawedz i znikal.
           Hamburger nigdy sie nie kurczy - to jedyne wejscie do menu. */
        .nav-burger { flex-shrink: 0; }
        @media (max-width: 480px) {
          .nav-row { padding-left: 16px !important; padding-right: 16px !important; }
          .nav-logo { font-size: 18px !important; }
          .nav-mobile-login { font-size: 13px; padding: 0 6px; }
        }
        @media (max-width: 360px) {
          .nav-logo { font-size: 16px !important; }
          .nav-mobile-login { font-size: 12px; padding: 0 4px; }
        }
      `}</style>
    </nav>
  );
}
