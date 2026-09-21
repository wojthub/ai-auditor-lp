'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import BrandMorph from '../BrandMorph';
import { plCounterpart } from '@/lib/languageSwitch';
import { APP_URL } from '@/lib/appUrl';

/** „Tools" menu - mirror of ../Navbar.tsx. Add-on tools only, separate from the content audit (AUDIT_MENU). */
const TOOLS_MENU: { href: string; label: string; desc: string }[] = [
  { href: '/tools/keyword-clustering', label: 'Keyword Clustering', desc: 'Map keywords to their target pages' },
  { href: '/tools/content-pruning', label: 'Content Pruning & Cannibalisation', desc: 'Pages that blur your topic or fight for one query' },
  { href: '/tools/schema-gaps', label: 'Schema Gaps', desc: 'Fill the missing markup in your code' },
  { href: '/tools/internal-linking', label: 'Internal Linking', desc: 'See which paragraph should link where' },
];

/** „Content audit" menu - mirror of ../Navbar.tsx: one product from three angles. */
const AUDIT_MENU: { href: string; label: string; desc: string }[] = [
  { href: '/how-it-works', label: 'How the auditor works', desc: 'From a URL to ready-to-paste fixes' },
  { href: '/dimensions', label: 'Scoring dimensions', desc: 'The 10 criteria behind AI citations' },
  { href: '/#bulk-audit', label: 'Bulk audit', desc: 'Your whole site in a single run' },
  // API v1 covers audits ONLY (/audits, /audits/bulk, /me) - none of the tools has an endpoint,
  // so this is a fourth way into the same product, not a separate top-level entry.
  { href: '/api', label: 'API', desc: 'Run audits over REST and JSON' },
];

/** „Pricing" menu - mirror of ../Navbar.tsx. Payment terms next to the referral program. */
const PRICING_MENU: { href: string; label: string; desc: string }[] = [
  { href: '/pricing', label: 'Pricing', desc: '3 free audits, then EUR 2 per audit' },
  { href: '/affiliate', label: 'Referral program', desc: '10% commission on your referrals’ orders' },
];

export default function NavbarEN() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  // Przelacznik prowadzi na POLSKI ODPOWIEDNIK biezacej podstrony, nie na strone glowna.
  const plHref = plCounterpart(usePathname());

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
        <a href="/" className="flex items-center nav-logo" style={{ textDecoration: 'none', fontSize: 22 }}>
          <BrandMorph />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center nav-desktop">
          {/* Content audit - the trigger is a LINK to /how-it-works so the main page does not
              disappear behind the dropdown. „Bulk audit" is a homepage anchor (absolute path: the
              nav also runs on subpages). */}
          <div className="nav-dd">
            <a href="/how-it-works" className="nav-link nav-dd-trigger" aria-haspopup="true">
              Content audit
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
          {/* Tools + dropdown (hover and :focus-within - no JS, works straight after SSR) */}
          <div className="nav-dd">
            <button type="button" className="nav-link nav-dd-trigger" aria-haspopup="true">
              Tools
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
          {/* Pricing - the trigger is a LINK to /pricing, like „Content audit”: the pricing page
              itself stays one click away even though the item now has a dropdown. */}
          <div className="nav-dd">
            <a href="/pricing" className="nav-link nav-dd-trigger" aria-haspopup="true">
              Pricing
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
          {/* TWO entries instead of one "Run audit": a returning user had nowhere to click,
              and a new one could not see that the start is free. The rule separates content
              navigation from account actions. The main CTA stays in the hero, by the URL field. */}
          <span aria-hidden className="nav-sep" />
          <a href={`${APP_URL}/login?lang=en`} className="nav-login">Log in</a>
          <a href={`${APP_URL}/register?lang=en`} className="nav-cta">Try for free</a>
          <a href={plHref} className="nav-lang" title="Wersja polska">PL</a>
        </div>

        {/* Mobile bar, right side: a fast way into an audit + the burger.
            A plain TEXT link, not a filled button - the hero CTA above the fold already points
            at the same `/register`, and a second accent button would blur the hierarchy.
            Logging in lives in the expanded menu. */}
        <div className="md:hidden flex items-center nav-mobile-right">
          <a href={`${APP_URL}/register?lang=en`} className="nav-mobile-login">Try for free</a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center nav-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
          {/* Content audit: collapsible row; the first item is the full „How the auditor works" page. */}
          <button
            type="button"
            onClick={() => setAuditOpen(!auditOpen)}
            aria-expanded={auditOpen}
            className="nav-mobile-link nav-mobile-toggle"
          >
            Content audit
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
          {/* Tools: collapsible row, so the mobile menu does not open 7 items tall */}
          <button
            type="button"
            onClick={() => setToolsOpen(!toolsOpen)}
            aria-expanded={toolsOpen}
            className="nav-mobile-link nav-mobile-toggle"
          >
            Tools
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
          {/* Pricing: collapsible row - the first entry is the full pricing page. */}
          <button
            type="button"
            onClick={() => setPricingOpen(!pricingOpen)}
            aria-expanded={pricingOpen}
            className="nav-mobile-link nav-mobile-toggle"
          >
            Pricing
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
          <a href={plHref} onClick={() => setMobileOpen(false)} className="nav-mobile-link">
            PL - Wersja polska
          </a>
          {/* Both entries at the BOTTOM of the menu, within thumb reach. */}
          <a href={`${APP_URL}/register?lang=en`} onClick={() => setMobileOpen(false)} className="nav-mobile-cta">
            Try for free
          </a>
          <a href={`${APP_URL}/login?lang=en`} onClick={() => setMobileOpen(false)} className="nav-mobile-secondary">
            Log in
          </a>
        </div>
      )}

      <style>{`
        .nav-link {
          font-size: 15px;
          font-weight: 500;
          color: #666d80;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 6px;
          transition: color 0.14s ease, background 0.14s ease;
          letter-spacing: -0.01em;
        }
        .nav-link:hover {
          color: #0d0d12;
          background: #f6f8fa;
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
        /* The „Content audit" trigger is a link - unlike the tools button it has somewhere to go. */
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
          margin-left: 6px;
          letter-spacing: -0.01em;
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
          padding: 6px 10px;
          margin-left: 4px;
          border-radius: 4px;
          border: 1px solid #dfe1e7;
          transition: color 0.14s ease, border-color 0.14s ease;
        }
        .nav-lang:hover {
          color: #0d0d12;
          border-color: #818898;
        }
        .nav-mobile-link {
          display: block;
          font-size: 16px;
          font-weight: 500;
          color: #36394a;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid #eceff3;
          letter-spacing: -0.01em;
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
          letter-spacing: -0.01em;
        }
        /* Log in under the CTA: outlined, same height - a returning user should find it in the
           menu, not only in the bar. */
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
        /* On a narrow screen the three items do not fit the 64 px bar: the logo has a FIXED
           width (reserved for the typing animation) and the CTA grew from "Run audit" to
           "Try for free". Without this the burger was pushed past the edge and disappeared.
           The burger never shrinks - it is the only way into the menu. */
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
