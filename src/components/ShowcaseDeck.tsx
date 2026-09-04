'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

const SPRING = { type: 'spring', stiffness: 210, damping: 30, mass: 0.9 } as const;

export type ShowcaseSlide = {
  src: string;
  alt: string;
  /** Etykieta pigulki nad urzadzeniem — nazwa zakladki panelu widocznej na slajdzie. */
  label: string;
};

type Props = {
  slides: ShowcaseSlide[];
  /** Etykiety dostepnosci — jedyne miejsce, w ktorym ten komponent rozroznia jezyki. */
  regionLabel: string;
  prevLabel: string;
  nextLabel: string;
};

/**
 * Ekran mockupu: kilka zrzutow panelu przewijanych pigulkami, strzalkami i swipem.
 * Wspoldzielony przez `Showcase` (PL) i `ShowcaseEN` — same slajdy i etykiety ida propem,
 * tak jak w `DimensionPage`. Autoodtwarzanie gasnie przy pierwszym ruchu uzytkownika,
 * zeby karuzela nie wyrywala mu slajdu sprzed oczu.
 */
export default function ShowcaseDeck({ slides, regionLabel, prevLabel, nextLabel }: Props) {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const count = slides.length;

  // Tasme przesuwamy w PIKSELACH, nie w procentach: `drag` liczy przesuniecie w px i mieszanie
  // jednostek na tej samej wartosci `x` potrafi szarpnac slajdem przy puszczeniu palca.
  const screenRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // `x` jest wlasna wartoscia ruchu, a nie propem `animate`, bo przy propie framer po
  // puszczeniu myszy sciaga tasme do `dragConstraints` i — gdy indeks sie NIE zmienil —
  // nic juz jej stamtad nie zabiera: krotki drag na slajdzie 2 przerzucal widok na slajd 1,
  // zostawiajac zapalona pigulke „2". Snap robimy wiec sami, po kazdym przeciagnieciu.
  const x = useMotionValue(0);
  const settle = (next: number) => {
    setIndex(next);
    animate(x, -next * width, SPRING);
  };
  // Ostatni slajd wraca na pierwszy tylko w autoodtwarzaniu; strzalki i swipe zatrzymuja sie
  // na koncach, zeby przeciagniecie nie teleportowalo uzytkownika przez cala talie.
  const go = (next: number) => {
    setAutoplay(false);
    settle(Math.min(count - 1, Math.max(0, next)));
  };

  // Zmiana szerokosci (obrot telefonu, resize okna) przelicza pozycje bez animacji —
  // stary offset w px wskazywalby po zmianie na srodek sasiedniego slajdu.
  const lastWidth = useRef(0);
  useEffect(() => {
    if (width === lastWidth.current) return;
    lastWidth.current = width;
    x.set(-index * width);
  }, [width, index, x]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAutoplay(false);
  }, []);

  // Slajdy 2+ maja `loading="lazy"` (nie blokuja pierwszego renderu), ale dociagamy je zaraz
  // po bezczynnosci — inaczej pierwsze przelaczenie pokazywaloby pusty ekran, bo lazy startuje
  // dopiero, gdy obrazek wjezdza w widok.
  useEffect(() => {
    const preload = () => slides.slice(1).forEach((s) => { new Image().src = s.src; });
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload);
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(preload, 1500);
    return () => window.clearTimeout(id);
  }, [slides]);

  useEffect(() => {
    if (!autoplay || hovering || count < 2) return;
    const id = window.setTimeout(() => settle((index + 1) % count), 5200);
    return () => window.clearTimeout(id);
  }, [autoplay, hovering, index, count, width]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Pigulki = spis tresci mockupu; klik przelacza slajd i wylacza autoodtwarzanie. */}
      <div className="deck-tabs">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(i)}
            className={`deck-tab${i === index ? ' deck-tab-active' : ''}`}
            aria-current={i === index ? 'true' : undefined}
          >
            {slide.label}
          </button>
        ))}
      </div>

      <div style={{ perspective: '2000px', marginBottom: 'clamp(-150px, -14vw, -52px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 5 }}
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
            {/* metaliczna krawędź */}
            <div style={{
              background: 'linear-gradient(135deg, #edeff2 0%, #b4b7bd 40%, #d6d8dc 68%, #a6a9af 100%)',
              borderRadius: 30,
              padding: 4,
            }}>
              {/* ciemny bezel */}
              <div style={{ background: '#0b0b0d', borderRadius: 26, padding: 12 }}>
                {/* ekran — sztywna proporcja, zeby zmiana slajdu nie przesuwala sekcji nizej */}
                <div ref={screenRef} style={{
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#f7f8fa',
                  aspectRatio: '1900 / 962',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
                }}>
                  {/* Tasma slajdow: przesuwana o -index*szerokosc ekranu, przeciagana palcem/myszka.
                      Wszystkie zrzuty siedza w DOM, wiec przejscie nie czeka na pobranie pliku. */}
                  <motion.div
                    style={{ display: 'flex', height: '100%', cursor: 'grab', x }}
                    drag={count > 1 ? 'x' : false}
                    dragConstraints={{ left: -(count - 1) * width, right: 0 }}
                    dragElastic={0.14}
                    dragMomentum={false}
                    whileDrag={{ cursor: 'grabbing' }}
                    onDragStart={() => setAutoplay(false)}
                    onDragEnd={(_, info) => {
                      // Kazde puszczenie konczy sie snapem — takze ponizej progu, zeby tasma
                      // nie zostawala miedzy slajdami.
                      if (info.offset.x < -60 || info.velocity.x < -420) go(index + 1);
                      else if (info.offset.x > 60 || info.velocity.x > 420) go(index - 1);
                      else go(index);
                    }}
                  >
                    {slides.map((slide, i) => (
                      <img
                        key={slide.src}
                        src={slide.src}
                        alt={slide.alt}
                        draggable={false}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        style={{
                          flex: '0 0 100%',
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          display: 'block',
                          userSelect: 'none',
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* połysk ekranu */}
                  <div aria-hidden style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 16%, rgba(255,255,255,0) 36%)',
                  }} />

                  {/* Strzalki lezą na ekranie, nie pod nim — dol mockupu zjada maska gradientu. */}
                  <button
                    type="button"
                    className="deck-arrow deck-arrow-prev"
                    onClick={() => go(index - 1)}
                    disabled={index === 0}
                    aria-label={prevLabel}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="deck-arrow deck-arrow-next"
                    onClick={() => go(index + 1)}
                    disabled={index === count - 1}
                    aria-label={nextLabel}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .deck-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          margin: 0 auto 22px;
          padding: 5px;
          width: fit-content;
          max-width: 100%;
          border: 1px solid #e4e7ec;
          border-radius: 999px;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .deck-tab {
          appearance: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.015em;
          color: #666d80;
          padding: 8px 16px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.16s ease, background 0.16s ease;
        }
        .deck-tab:hover { color: #0b7983; }
        .deck-tab-active,
        .deck-tab-active:hover {
          background: #0b7983;
          color: #ffffff;
          font-weight: 600;
        }
        .deck-arrow {
          position: absolute;
          top: 34%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(13,13,18,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.86);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: 0 6px 18px rgba(13,13,18,0.12);
          color: #36394a;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.18s ease, background 0.16s ease, color 0.16s ease;
        }
        .deck-arrow:hover { background: #ffffff; color: #0b7983; }
        .deck-arrow:disabled { cursor: default; color: #b6bcc8; }
        .deck-arrow-prev { left: 14px; }
        .deck-arrow-next { right: 14px; }
        /* Strzalki wychodza dopiero pod kursorem; na dotyku i tak rzadzi swipe. */
        [aria-roledescription='carousel']:hover .deck-arrow:not(:disabled),
        .deck-arrow:focus-visible { opacity: 1; }
        @media (hover: none) {
          .deck-arrow { display: none; }
        }
        @media (max-width: 560px) {
          .deck-tabs { gap: 2px; padding: 4px; }
          .deck-tab { font-size: 12.5px; padding: 7px 11px; }
        }
      `}</style>
    </div>
  );
}
