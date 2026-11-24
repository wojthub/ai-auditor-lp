'use client';

import ShowcaseDeck, { type ShowcaseSlide } from '../ShowcaseDeck';
import { REPORT_URL_FALLBACK, toEmbedUrl, useReportUrlState } from '@/lib/useReportUrl';

/** Three panel screens in working order: score → recommendations → ready copy. */
const SLIDES: ShowcaseSlide[] = [
  {
    src: '/dashboard-preview.png',
    mobileSrc: '/dashboard-preview-mobile.png',
    alt: 'CitationOne dashboard - Content Quality Score and the 11-dimension profile',
    label: 'Summary',
  },
  {
    src: '/dashboard-recommendations.png',
    mobileSrc: '/dashboard-recommendations-mobile.png',
    alt: 'CitationOne dashboard - recommendation list with before and after comparison',
    label: 'Recommendations',
  },
  {
    src: '/dashboard-apply.png',
    mobileSrc: '/dashboard-apply-mobile.png',
    alt: 'CitationOne dashboard - content with applied recommendations and tag changes',
    label: 'Apply to content',
  },
];

export default function ShowcaseEN() {
  // Raport z linku w /admin/lp (ten sam co „View sample report”). Ramke ladujemy dopiero po odpowiedzi
  // panelu - inaczej najpierw ladowalby sie raport z wartosci domyslnej, a zaraz potem drugi.
  const report = useReportUrlState(REPORT_URL_FALLBACK.en, 'en');
  // Tlo (siatka kropek + graf) i gradient daje HeroBand - ta sekcja musi zostac
  // przezroczysta, inaczej zaslonilaby wspolna warstwe tla.
  return (
    <section className="showcase-section" style={{ position: 'relative', overflow: 'hidden', padding: '76px 0 96px' }}>

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
        {/* Opens on “Summary” (since 2026-11-10, previously “Recommendations”) - first screen in the work order. */}
        <ShowcaseDeck
          slides={SLIDES}
          startIndex={0}
          regionLabel="CitationOne panel screens"
          prevLabel="Previous screen"
          nextLabel="Next screen"
          zoomLabel="Enlarge screen"
          closeLabel="Close enlarged view"
          live={{
            embedUrl: report.settled ? toEmbedUrl(report.url) : null,
            reportUrl: report.url,
            title: 'Sample CitationOne report',
            caption: 'Sample report - switch tabs and scroll',
            openLabel: 'Open in a new tab',
            tapLabel: 'Tap to explore',
            pending: !report.settled,
            badge: 'Interactive report',
            loadingLabel: 'Loading report…',
          }}
        />
      </div>
    </section>
  );
}
