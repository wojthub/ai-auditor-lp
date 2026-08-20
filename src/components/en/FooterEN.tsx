const APP_URL = 'https://app.citationone.com';

/**
 * EN footer. Two rows: LP navigation + legal links.
 *
 * Terms and the privacy policy live IN THE APP (`/terms`, `/privacy-policy`) — the LP links to
 * them instead of duplicating, so two diverging versions never appear.
 */

const NAV_LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/dimensions', label: 'Dimensions' },
  { href: '/tools', label: 'Tools' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/#who-is-it-for', label: 'Who is it for?' },
  { href: '/api', label: 'API' },
];

const LEGAL_LINKS = [
  { href: `${APP_URL}/terms`, label: 'Terms of Service' },
  { href: `${APP_URL}/privacy-policy`, label: 'Privacy Policy' },
];

export default function FooterEN() {
  return (
    <footer style={{ borderTop: '1px solid #dfe1e7', padding: '36px 0 28px', background: '#ffffff' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://app.citationone.com/logo.png" alt="CitationOne" style={{ height: 28 }} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 14, color: '#818898', textDecoration: 'none', padding: '12px 14px', borderRadius: 5 }}>
                {l.label}
              </a>
            ))}
            <a href={`${APP_URL}/login?lang=en`} style={{ fontSize: 14, color: '#0b7983', fontWeight: 600, textDecoration: 'none', padding: '12px 14px' }}>
              Run audit →
            </a>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #eceff3' }}
        >
          <span style={{ fontSize: 12.5, color: '#a4acb9' }}>
            &copy; {new Date().getFullYear()} CitationOne
          </span>

          <div className="flex items-center gap-1">
            {LEGAL_LINKS.map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 12.5, color: '#a4acb9', textDecoration: 'none', padding: '8px 10px' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
