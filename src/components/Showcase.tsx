'use client';

import ShowcaseDeck, { type ShowcaseSlide } from './ShowcaseDeck';
import { REPORT_URL_FALLBACK, toEmbedUrl, useReportUrlState } from '@/lib/useReportUrl';

/** Trzy ekrany panelu w kolejnosci pracy: wynik → zalecenia → gotowa tresc. */
const SLIDES: ShowcaseSlide[] = [
  {
    src: '/dashboard-preview-pl.png',
    mobileSrc: '/dashboard-preview-pl-mobile.png',
    alt: 'Panel CitationOne - Content Quality Score i profil 11 wymiarów',
    label: 'Podsumowanie',
  },
  {
    src: '/dashboard-recommendations-pl.png',
    mobileSrc: '/dashboard-recommendations-pl-mobile.png',
    alt: 'Panel CitationOne - lista zaleceń z porównaniem przed i po',
    label: 'Rekomendacje',
  },
  {
    src: '/dashboard-apply-pl.png',
    mobileSrc: '/dashboard-apply-pl-mobile.png',
    alt: 'Panel CitationOne - treść z wdrożonymi zaleceniami i zmianami tagów',
    label: 'Wdrożenie w treść',
  },
];

export default function Showcase() {
  // Raport z linku w /admin/lp (ten sam co „Zobacz przykładowy raport”). Ramke ladujemy dopiero po odpowiedzi
  // panelu - inaczej najpierw ladowalby sie raport z wartosci domyslnej, a zaraz potem drugi.
  const report = useReportUrlState(REPORT_URL_FALLBACK.pl, 'pl');
  // Tlo (siatka kropek + graf) i gradient daje HeroBand - ta sekcja musi zostac
  // przezroczysta, inaczej zaslonilaby wspolna warstwe tla.
  return (
    <section className="showcase-section" style={{ position: 'relative', overflow: 'hidden', padding: '76px 0 96px' }}>

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
        {/* Wchodzimy od „Podsumowania” (od 2026-11-10, wczesniej od „Rekomendacji”) - pierwszy ekran
            w kolejnosci pracy; Rekomendacje i Wdrozenie zostaja na wyciagniecie strzalki. */}
        <ShowcaseDeck
          slides={SLIDES}
          startIndex={0}
          regionLabel="Ekrany panelu CitationOne"
          prevLabel="Poprzedni ekran"
          nextLabel="Następny ekran"
          zoomLabel="Powiększ ekran"
          closeLabel="Zamknij powiększenie"
          live={{
            embedUrl: report.settled ? toEmbedUrl(report.url) : null,
            reportUrl: report.url,
            title: 'Przykładowy raport CitationOne',
            caption: 'Przykładowy raport - przełączaj zakładki i przewijaj',
            openLabel: 'Otwórz w nowej karcie',
            tapLabel: 'Dotknij, aby przeglądać',
            pending: !report.settled,
            badge: 'Interaktywny raport',
            loadingLabel: 'Wczytywanie raportu…',
          }}
        />
      </div>
    </section>
  );
}
