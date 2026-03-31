'use client';

import { motion } from 'framer-motion';

const logos = [
  { src: '/logos/Gemini_language_model_logo.png', alt: 'Google Gemini', height: 24 },
  { src: '/logos/Bright_Data.svg.png', alt: 'Bright Data', height: 38 },
  { src: '/logos/Nextjs-logo.svg.png', alt: 'Next.js', height: 18 },
];

export default function TechLogosEN() {
  return (
    <section style={{ background: '#ffffff', padding: '28px 0 36px', borderBottom: '1px solid #eceff3' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}
        >
          <span style={{ fontSize: 11, fontWeight: 500, color: '#a4acb9', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Built with
          </span>
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              style={{
                height: logo.height, width: 'auto', objectFit: 'contain',
                filter: 'grayscale(100%)', opacity: 0.4,
                transition: 'filter 0.2s ease, opacity 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.4'; }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
