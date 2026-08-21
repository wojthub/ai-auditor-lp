'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import BrandMorph from '../BrandMorph';
import { plCounterpart } from '@/lib/languageSwitch';

const APP_URL = 'https://app.citationone.com';

/**
 * „Tools" menu — mirror of ../Navbar.tsx. The auditor sits on top and deliberately has NO tool
 * subpage of its own: it is the core product, so it points at the description of how it works.
 */
const TOOLS_MENU: { href: string; label: string; desc: string }[] = [
  { href: '/how-it-works', label: 'Content auditor', desc: 'Score a page and get ready fixes' },
  { href: '/tools/keyword-clustering', label: 'Keyword Clustering', desc: 'Map keywords to their target pages' },
  { href: '/tools/content-pruning', label: 'Content Pruning', desc: 'Cut pages that blur your site topic' },
  // Cannibalisation is the second tab of the same job (pruning) — separate entry, same URL.
  { href: '/tools/content-pruning', label: 'Keyword Cannibalisation', desc: 'Spot pages fighting for the same query' },
  { href: '/tools/schema-gaps', label: 'Schema Gaps', desc: 'Fill the missing markup in your code' },
  { href: '/tools/internal-linking', label: 'Internal Linking', desc: 'See which paragraph should link where' },
];

export default function NavbarEN() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
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
        className="flex items-center justify-between"
        style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, height: 64 }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center" style={{ textDecoration: 'none', fontSize: 22 }}>
          <BrandMorph />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          <a href="/how-it-works" className="nav-link">How it works</a>
          {/* Tools + dropdown (hover and :focus-within — no JS, works straight after SSR) */}
          <div className="nav-dd">
            <a href="/tools" className="nav-link nav-dd-trigger">
              Tools
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
            <div className="nav-dd-menu">
              <div className="nav-dd-card">
                {TOOLS_MENU.map((item, i) => (
                  <a key={item.label} href={item.href} className={i === 0 ? 'nav-dd-item nav-dd-item-first' : 'nav-dd-item'}>
                    <span className="nav-dd-label">{item.label}</span>
                    <span className="nav-dd-desc">{item.desc}</span>
                  </a>
                ))}
                <a href="/tools" className="nav-dd-all">All tools →</a>
              </div>
            </div>
          </div>
          <a href="/pricing" className="nav-link">Pricing</a>
          <a href="/api" className="nav-link">API</a>
          <a href={`${APP_URL}/login?lang=en`} className="nav-cta">Run audit</a>
          <a href={plHref} className="nav-lang" title="Wersja polska">PL</a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center"
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

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: '1px solid #eceff3',
            background: '#ffffff',
            padding: '12px 24px 20px',
          }}
        >
          <a href="/how-it-works" onClick={() => setMobileOpen(false)} className="nav-mobile-link">
            How it works
          </a>
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
              <a href="/tools" onClick={() => setMobileOpen(false)} className="nav-mobile-sublink">
                All tools
              </a>
            </div>
          )}
          <a href="/pricing" onClick={() => setMobileOpen(false)} className="nav-mobile-link">
            Pricing
          </a>
          <a href="/api" onClick={() => setMobileOpen(false)} className="nav-mobile-link">
            API
          </a>
          <a href={plHref} onClick={() => setMobileOpen(false)} className="nav-mobile-link">
            PL - Wersja polska
          </a>
          <a href={`${APP_URL}/login?lang=en`} onClick={() => setMobileOpen(false)} className="nav-mobile-cta">
            Run audit
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
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
        .nav-dd-item-first {
          border-bottom: 1px solid #eceff3;
          border-radius: 8px 8px 0 0;
          margin-bottom: 4px;
          padding-bottom: 11px;
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
        .nav-dd-all {
          display: block;
          padding: 10px 12px 6px;
          font-size: 13px;
          font-weight: 600;
          color: #0b7983;
          text-decoration: none;
          border-top: 1px solid #eceff3;
          margin-top: 4px;
        }
        /* Podwojna klasa — .nav-mobile-link jest nizej w arkuszu i inaczej nadpisalby display */
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
      `}</style>
    </nav>
  );
}
