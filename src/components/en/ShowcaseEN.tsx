'use client';

import ShowcaseDeck, { type ShowcaseSlide } from '../ShowcaseDeck';

/** Three panel screens in working order: score → recommendations → ready copy. */
const SLIDES: ShowcaseSlide[] = [
  {
    src: '/dashboard-preview.png',
    alt: 'CitationOne dashboard - Content Quality Score and the 10-dimension profile',
    label: 'Summary',
  },
  {
    src: '/dashboard-recommendations.png',
    alt: 'CitationOne dashboard - recommendation list with before and after comparison',
    label: 'Recommendations',
  },
  {
    src: '/dashboard-apply.png',
    alt: 'CitationOne dashboard - content with applied recommendations and tag changes',
    label: 'Apply to content',
  },
];

export default function ShowcaseEN() {
  // Tlo (siatka kropek + graf) i gradient daje HeroBand — ta sekcja musi zostac
  // przezroczysta, inaczej zaslonilaby wspolna warstwe tla.
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '26px 0 96px' }}>

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
        <ShowcaseDeck
          slides={SLIDES}
          regionLabel="CitationOne panel screens"
          prevLabel="Previous screen"
          nextLabel="Next screen"
        />
      </div>
    </section>
  );
}
