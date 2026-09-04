'use client';

import ShowcaseDeck, { type ShowcaseSlide } from './ShowcaseDeck';

/** Trzy ekrany panelu w kolejnosci pracy: wynik → zalecenia → gotowa tresc. */
const SLIDES: ShowcaseSlide[] = [
  {
    src: '/dashboard-preview-pl.png',
    alt: 'Panel CitationOne - Content Quality Score i profil 10 wymiarów',
    label: 'Podsumowanie',
  },
  {
    src: '/dashboard-recommendations-pl.png',
    alt: 'Panel CitationOne - lista zaleceń z porównaniem przed i po',
    label: 'Rekomendacje',
  },
  {
    src: '/dashboard-apply-pl.png',
    alt: 'Panel CitationOne - treść z wdrożonymi zaleceniami i zmianami tagów',
    label: 'Wdrożenie w treść',
  },
];

export default function Showcase() {
  // Tlo (siatka kropek + graf) i gradient daje HeroBand — ta sekcja musi zostac
  // przezroczysta, inaczej zaslonilaby wspolna warstwe tla.
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '76px 0 96px' }}>

      {/* miękka poświata akcentu za urządzeniem */}
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
        <ShowcaseDeck
          slides={SLIDES}
          regionLabel="Ekrany panelu CitationOne"
          prevLabel="Poprzedni ekran"
          nextLabel="Następny ekran"
        />
      </div>
    </section>
  );
}
