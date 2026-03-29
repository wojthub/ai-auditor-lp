const APP_URL = 'https://app.citationone.com';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #dfe1e7', padding: '36px 0', background: '#ffffff' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://app.citationone.com/logo.png" alt="CitationOne" style={{ height: 28 }} />
          </div>

          <div className="flex items-center gap-1">
            {[
              { href: '/jak-to-dziala', label: 'Jak to działa?' },
              { href: '/#dla-kogo', label: 'Dla kogo?' },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 14, color: '#818898', textDecoration: 'none', padding: '12px 14px', borderRadius: 5 }}>
                {l.label}
              </a>
            ))}
            <a href={`${APP_URL}/login`} style={{ fontSize: 14, color: '#0b7983', fontWeight: 600, textDecoration: 'none', padding: '12px 14px' }}>
              Zrób audyt →
            </a>
          </div>

          <span style={{ fontSize: 12.5, color: '#a4acb9' }}>
            &copy; {new Date().getFullYear()} CitationOne
          </span>
        </div>
      </div>
    </footer>
  );
}
