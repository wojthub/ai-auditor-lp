'use client';

import { motion } from 'framer-motion';
import HeroNodes from '../HeroNodes';

export default function ShowcaseEN() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #ffffff 0%, #f4f7f8 100%)', padding: '76px 0 96px' }}>
      {/* Tlo z hero przechodzi tu dalej: siatka kropek i graf wezlow wygaszane ku dolowi. */}
      <div
        aria-hidden
        className="dot-grid"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 460, opacity: 0.14,
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 88%)',
          maskImage: 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 88%)',
        }}
      />
      <HeroNodes vbHeight={460} height={460} tail />

      {/* soft accent glow behind the device */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 240,
          left: '50%',
          width: 980,
          maxWidth: '120%',
          height: 520,
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at center, rgba(11,121,131,0.10) 0%, rgba(11,121,131,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Device mockup - thin bezel, fades to transparent toward the bottom */}
        <div style={{ perspective: '2000px', marginBottom: 'clamp(-150px, -14vw, -52px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 5 }}
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: '50% 0%',
              maxWidth: 980,
              margin: '0 auto',
              filter: 'drop-shadow(-18px 26px 44px rgba(13,13,18,0.2))',
            }}
          >
            <div style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 76%)',
              maskImage: 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 76%)',
            }}>
              {/* metallic outer rim */}
              <div style={{
                background: 'linear-gradient(135deg, #edeff2 0%, #b4b7bd 40%, #d6d8dc 68%, #a6a9af 100%)',
                borderRadius: 30,
                padding: 4,
              }}>
                {/* dark bezel */}
                <div style={{ background: '#0b0b0d', borderRadius: 26, padding: 12 }}>
                  {/* screen */}
                  <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                    <img
                      src="/dashboard-preview.png"
                      alt="CitationOne dashboard - Content Quality Score, AI Citability Score and the 10-dimension profile"
                      style={{ display: 'block', width: '100%', height: 'auto' }}
                    />
                    {/* screen gloss */}
                    <div aria-hidden style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      background: 'linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 16%, rgba(255,255,255,0) 36%)',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
