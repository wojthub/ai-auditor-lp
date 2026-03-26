const APP_URL = 'https://app.citabilityscore.com';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #dfe1e7', padding: '36px 0', background: '#ffffff' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="CitabilityScore" style={{ height: 22 }} />
          </div>

          <div className="flex items-center gap-1">
            {[
              { href: '#jak-dziala', label: 'Jak działa?' },
              { href: '#features', label: 'Funkcje' },
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
            &copy; {new Date().getFullYear()} CitabilityScore
          </span>
        </div>
      </div>
    </footer>
  );
}
