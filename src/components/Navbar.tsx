const APP_URL = 'https://app.citabilityscore.com';

export default function Navbar() {
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
        <a href="/" className="flex items-center" style={{ textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="CitabilityScore" style={{ height: 36 }} />
        </a>

        {/* Nav links */}
        <div className="hidden sm:flex items-center">
          <a href="#jak-dziala" className="nav-link">Jak to działa?</a>
          <a href="#dla-kogo" className="nav-link">Dla kogo?</a>

          <a href={`${APP_URL}/login`} className="nav-cta">Rozpocznij</a>
        </div>
      </div>

      <style>{`
        .nav-link {
          font-size: 13.5px;
          font-weight: 500;
          color: #666d80;
          text-decoration: none;
          padding: 5px 11px;
          border-radius: 6px;
          transition: color 0.14s ease, background 0.14s ease;
          letter-spacing: -0.01em;
        }
        .nav-link:hover {
          color: #0d0d12;
          background: #f6f8fa;
          opacity: 1;
        }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          padding: 7px 16px;
          border-radius: 6px;
          background: #0b7983;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
          letter-spacing: -0.01em;
          transition: background 0.14s ease;
        }
        .nav-cta:hover {
          background: #097380;
          opacity: 1;
        }
      `}</style>
    </nav>
  );
}
