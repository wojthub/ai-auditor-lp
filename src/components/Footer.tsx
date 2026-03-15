const APP_URL = 'https://app.smartcontentaudit.com';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #dfe1e7', padding: '36px 0', background: '#ffffff' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="8" fill="#0b7983"/>
              <text x="16" y="23" textAnchor="middle" fontFamily="system-ui,sans-serif" fontWeight="700" fontSize="15" fill="#FFFFFF">AI</text>
            </svg>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.02em' }}>
              Smart Content Audit
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[
              { href: '#jak-dziala', label: 'Jak działa' },
              { href: '#features', label: 'Funkcje' },
              { href: '#cennik', label: 'Cennik' },
              { href: '#faq', label: 'FAQ' },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 13.5, color: '#818898', textDecoration: 'none', padding: '4px 10px', borderRadius: 5 }}>
                {l.label}
              </a>
            ))}
            <a href={APP_URL} style={{ fontSize: 13.5, color: '#0b7983', fontWeight: 600, textDecoration: 'none', padding: '4px 10px' }}>
              Aplikacja →
            </a>
          </div>

          <span style={{ fontSize: 12.5, color: '#a4acb9' }}>
            &copy; {new Date().getFullYear()} Smart Content Audit
          </span>
        </div>
      </div>
    </footer>
  );
}
