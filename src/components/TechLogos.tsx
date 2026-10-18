import { revealStyle } from '@/lib/reveal';

const logos = [
  { src: '/logos/gemini.webp', alt: 'Google Gemini', height: 24 },
  { src: '/logos/bright-data.webp', alt: 'Bright Data', height: 38 },
  { src: '/logos/jina.webp', alt: 'Jina AI', height: 22 },
  { src: '/logos/dataforseo-logo.png', alt: 'DataForSEO', height: 22 },
];

export default function TechLogos() {
  return (
    <section style={{ background: '#ffffff', padding: '28px 0 36px', borderBottom: '1px solid #eceff3' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <div className="reveal"
          style={{ ...revealStyle({ y: 0, delay: 0.2 }), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}
        >
          <span style={{ fontSize: 11, fontWeight: 500, color: '#a4acb9', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Zbudowane z
          </span>
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="tech-logo"
              style={{ height: logo.height, width: 'auto', objectFit: 'contain' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
