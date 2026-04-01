const APP_URL = 'https://app.citationone.com';

export default function FooterEN() {
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
              { href: '/how-it-works', label: 'How it works' },
              { href: '/#who-is-it-for', label: 'Who is it for?' },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 14, color: '#818898', textDecoration: 'none', padding: '12px 14px', borderRadius: 5 }}>
                {l.label}
              </a>
            ))}
            <a href={`${APP_URL}/login?lang=en`} style={{ fontSize: 14, color: '#0b7983', fontWeight: 600, textDecoration: 'none', padding: '12px 14px' }}>
              Run audit →
            </a>
          </div>

          <div className="flex items-center gap-1" style={{ fontSize: 12.5, color: '#a4acb9' }}>
            <span>&copy; {new Date().getFullYear()} CitationOne</span>
            <span style={{ margin: '0 4px' }}>·</span>
            <a href={`${APP_URL}/privacy-policy`} style={{ color: '#a4acb9', textDecoration: 'none', padding: '4px 0' }}>Privacy Policy</a>
            <span style={{ margin: '0 4px' }}>·</span>
            <a href={`${APP_URL}/terms`} style={{ color: '#a4acb9', textDecoration: 'none', padding: '4px 0' }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
