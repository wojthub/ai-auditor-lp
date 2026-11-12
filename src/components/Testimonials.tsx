'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchTestimonials, testimonialsFor, type Testimonial } from '@/lib/testimonials';

/**
 * Karuzela opinii zaraz pod hero strony głównej (PL i EN - jeden komponent, różni się tylko copy).
 * Treść, zdjęcia, kolejność i włącznik sekcji są w panelu admina aplikacji (`/admin/lp`), opis
 * przepływu danych w `src/lib/testimonials.ts`. Bez opinii w danym języku sekcja się nie renderuje.
 *
 * Karuzela to przewijany poziomo pas z `scroll-snap` (swipe na telefonie działa natywnie),
 * strzałki i kropki przewijają o jedną kartę. Autoodtwarzanie co 7 s tylko, gdy sekcja jest na
 * ekranie; zatrzymuje się na stałe po pierwszej interakcji i nie działa przy reduced motion.
 * Gdy wszystkie karty mieszczą się naraz, strzałki znikają, a karty są wyśrodkowane.
 */

const ACCENT = '#0b7983';
const AUTOPLAY_MS = 7000;
const MAX_DOTS = 7;

const COPY = {
  pl: {
    label: 'Opinie',
    title: 'Co mówią o CitationOne',
    region: 'Opinie użytkowników',
    prev: 'Poprzednia opinia',
    next: 'Następna opinia',
    slide: (i: number, n: number) => `Opinia ${i} z ${n}`,
    goTo: (i: number) => `Przejdź do opinii ${i}`,
    profile: (name: string) => `Profil: ${name}`,
    more: 'Czytaj dalej',
    less: 'Zwiń',
  },
  en: {
    label: 'Testimonials',
    title: 'What people say about CitationOne',
    region: 'User testimonials',
    prev: 'Previous testimonial',
    next: 'Next testimonial',
    slide: (i: number, n: number) => `Testimonial ${i} of ${n}`,
    goTo: (i: number) => `Go to testimonial ${i}`,
    profile: (name: string) => `Profile: ${name}`,
    more: 'Read more',
    less: 'Show less',
  },
} as const;

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

/**
 * Zdjęcie autora w kółku. Panel zapisuje kwadrat 240 px, ale `object-fit: cover` i stały rozmiar
 * trzymają kółko także dla zdjęcia w innych proporcjach. Gdy obrazek się nie wczyta (błąd
 * aplikacji, usunięte zdjęcie), zamiast ikonki zepsutego obrazka pokazujemy inicjały.
 */
function Avatar({ src, name }: { src: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // Obrazek z HTML builda mógł się wywalić przed hydratacją - wtedy onError już nie przyjdzie.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);
  if (!src || failed) {
    return (
      <span className="tst-avatar tst-initials" aria-hidden>
        {initials(name)}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={src} alt="" width={38} height={38} loading="lazy" decoding="async" className="tst-avatar" onError={() => setFailed(true)} />
  );
}

/**
 * Treść opinii przycięta do 5 linii. Bez tego jedna długa opinia rozciąga wszystkie karty w rzędzie
 * i krótkie mają pół karty pustego miejsca. Przycisk pojawia się tylko, gdy tekst faktycznie się
 * nie mieści - sprawdzane po układzie i przy każdej zmianie szerokości.
 */
function ClampText({ text, more, less }: { text: string; more: string; less: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || open) return;
    const check = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, open]);

  return (
    <>
      <p ref={ref} className={`tst-text${open ? '' : ' is-clamped'}`}>
        {text}
      </p>
      {(overflows || open) && (
        <button type="button" className="tst-more" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? less : more}
        </button>
      )}
    </>
  );
}

export default function Testimonials({ lang, initial }: { lang: 'pl' | 'en'; initial: readonly Testimonial[] }) {
  const c = COPY[lang];
  const [items, setItems] = useState(() => testimonialsFor(initial, lang));
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [nav, setNav] = useState({ scrollable: false, atStart: true, atEnd: false, index: 0, pages: 1 });
  const stopped = useRef(false);
  const hovering = useRef(false);
  const onScreen = useRef(false);

  useEffect(() => {
    let alive = true;
    fetchTestimonials().then((data) => {
      if (alive && data) setItems(testimonialsFor(data.items, lang));
    });
    return () => {
      alive = false;
    };
  }, [lang]);

  /** Szerokość kroku = karta + odstęp. Liczona z DOM, bo zależy od progu szerokości ekranu. */
  const step = useCallback(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.offsetWidth + gap;
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const s = step() || 1;
    const perView = Math.max(1, Math.round((track.clientWidth + 1) / s));
    const pages = Math.max(1, track.children.length - perView + 1);
    const atEnd = track.scrollLeft >= max - 2;
    setNav({
      scrollable: max > 2,
      atStart: track.scrollLeft <= 2,
      atEnd,
      // Na końcu pasa ostatnia karta nie dojeżdża do lewej krawędzi, więc samo zaokrąglenie
      // potrafi zostawić podświetloną przedostatnią kropkę.
      index: atEnd ? pages - 1 : Math.min(pages - 1, Math.round(track.scrollLeft / s)),
      pages,
    });
  }, [step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => {
      track.removeEventListener('scroll', onScroll);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [measure, items]);

  const scrollToIndex = useCallback(
    (i: number) => {
      trackRef.current?.scrollTo({ left: i * step(), behavior: 'smooth' });
    },
    [step],
  );

  const go = (dir: -1 | 1) => {
    stopped.current = true;
    trackRef.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });
  };

  // Autoodtwarzanie: na końcu wraca do pierwszej karty.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(([e]) => {
      onScreen.current = e.isIntersecting;
    }, { threshold: 0.4 });
    io.observe(section);
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || stopped.current || hovering.current || !onScreen.current || document.hidden) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 2) return;
      if (track.scrollLeft >= max - 2) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: step(), behavior: 'smooth' });
    }, AUTOPLAY_MS);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [step, items]);

  if (items.length === 0) return null;

  const stop = () => {
    stopped.current = true;
  };

  return (
    <section
      ref={sectionRef}
      className="tst"
      aria-roledescription="carousel"
      aria-label={c.region}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      onFocus={stop}
      onPointerDown={stop}
      onTouchStart={stop}
      onWheel={(e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop();
      }}
    >
      <div className="tst-wrap">
        <div className="tst-head">
          <div>
            <div className="tst-label">
              <span className="tst-label-bar" />
              <span>{c.label}</span>
            </div>
            <h2 className="tst-title">{c.title}</h2>
          </div>
          {nav.scrollable && (
            <div className="tst-arrows">
              <button type="button" className="tst-arrow" onClick={() => go(-1)} disabled={nav.atStart} aria-label={c.prev}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button type="button" className="tst-arrow" onClick={() => go(1)} disabled={nav.atEnd} aria-label={c.next}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div ref={trackRef} className={`tst-track${nav.scrollable ? '' : ' is-static'}`} tabIndex={nav.scrollable ? 0 : -1}>
          {items.map((t, i) => (
            <figure key={t.id} className="tst-card" role="group" aria-roledescription="slide" aria-label={c.slide(i + 1, items.length)}>
              <svg className="tst-quote" width="26" height="22" viewBox="0 0 24 24" fill={ACCENT} aria-hidden>
                <path d="M9.5 6C6.5 6.6 4 9.2 4 12.9V18h6v-6H7.1c.2-1.9 1.4-3.3 3.1-3.8L9.5 6zm10 0c-3 .6-5.5 3.2-5.5 6.9V18h6v-6h-2.9c.2-1.9 1.4-3.3 3.1-3.8L19.5 6z" />
              </svg>
              <blockquote className="tst-quote-body">
                <ClampText text={t.text} more={c.more} less={c.less} />
              </blockquote>
              <figcaption className="tst-author">
                <Avatar src={t.photo} name={t.name} />
                <span className="tst-who">
                  <span className="tst-name">{t.name}</span>
                  {t.role && <span className="tst-role">{t.role}</span>}
                </span>
                {t.url && (
                  <a href={t.url} target="_blank" rel="noopener noreferrer nofollow" className="tst-profile" aria-label={c.profile(t.name)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
                    </svg>
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {nav.scrollable && nav.pages > 1 && (
          // Do MAX_DOTS kropki, powyżej licznik „3 / 12” - 20 kropek nie mieści się w szerokości telefonu.
          nav.pages <= MAX_DOTS ? (
            <div className="tst-dots">
              {Array.from({ length: nav.pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`tst-dot${i === nav.index ? ' is-on' : ''}`}
                  aria-label={c.goTo(i + 1)}
                  aria-current={i === nav.index ? 'true' : undefined}
                  onClick={() => {
                    stop();
                    scrollToIndex(i);
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="tst-count" aria-hidden>
              {nav.index + 1} / {nav.pages}
            </p>
          )
        )}
      </div>

      <style>{`
        .tst { background: #f7f9fa; padding: 52px 0 44px; border-bottom: 1px solid #eceff3; }
        .tst-wrap { max-width: 1024px; margin: 0 auto; padding: 0 24px; }
        .tst-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
        .tst-label { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 11px; font-weight: 600; color: #818898; text-transform: uppercase; letter-spacing: 0.08em; }
        .tst-label-bar { width: 20px; height: 2px; background: ${ACCENT}; border-radius: 1px; }
        .tst-title { margin: 0; font-size: clamp(1.6rem, 3.6vw, 2.1rem); font-weight: 700; color: #0d0d12; letter-spacing: -0.03em; line-height: 1.2; }
        .tst-arrows { display: flex; gap: 8px; flex-shrink: 0; }
        .tst-arrow { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #dfe1e7; background: #fff; color: #0d0d12; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.15s, color 0.15s, opacity 0.15s; }
        .tst-arrow:hover:not(:disabled) { border-color: ${ACCENT}; color: ${ACCENT}; }
        .tst-arrow:disabled { opacity: 0.35; cursor: default; }
        .tst-track { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -webkit-overflow-scrolling: touch; padding: 12px 2px 8px; margin: 0 -2px; overscroll-behavior-x: contain; }
        .tst-track::-webkit-scrollbar { display: none; }
        .tst-track.is-static { justify-content: center; }
        .tst-track:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 4px; border-radius: 12px; }
        .tst-card { position: relative; flex: 0 0 calc((100% - 40px) / 3); scroll-snap-align: start; margin: 0; display: flex; flex-direction: column; background: #fff; border: 1px solid #dfe1e7; border-radius: 14px; padding: 18px 18px 14px; box-shadow: 0 6px 20px -16px rgba(13,13,18,0.25); min-width: 0; }
        @media (max-width: 1023px) { .tst-card { flex-basis: calc((100% - 20px) / 2); } }
        @media (max-width: 640px) {
          .tst { padding: 40px 0 32px; }
          .tst-wrap { padding: 0 16px; }
          .tst-arrows { display: none; }
          .tst-card { flex-basis: 86%; padding: 16px 16px 12px; }
          .tst-track { gap: 12px; }
          .tst-track.is-static .tst-card { flex-basis: 100%; }
        }
        /* Cudzysłów jako znaczek na górnej krawędzi karty - nie zajmuje osobnego wiersza. */
        .tst-quote { position: absolute; top: -11px; left: 16px; width: 26px; height: 22px; padding: 3px 4px; background: linear-gradient(#f7f9fa 50%, #fff 50%); }
        .tst-quote-body { margin: 0 0 12px; }
        /* pre-line: pusta linia z panelu = odstęp akapitu, a całość to jeden blok, który da się przyciąć. */
        .tst-text { margin: 0; font-size: 14.5px; line-height: 1.55; color: #36394a; overflow-wrap: anywhere; white-space: pre-line; }
        .tst-text.is-clamped { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5; line-clamp: 5; overflow: hidden; }
        .tst-more { margin-top: 2px; padding: 2px 0; border: 0; background: none; color: ${ACCENT}; font-size: 14px; font-weight: 600; cursor: pointer; }
        .tst-more:hover { text-decoration: underline; }
        .tst-author { margin-top: auto; display: flex; align-items: center; gap: 10px; padding-top: 10px; border-top: 1px solid #eceff3; min-width: 0; }
        .tst-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: #eef1f4; }
        .tst-initials { display: inline-flex; align-items: center; justify-content: center; background: #e6f3f4; color: ${ACCENT}; font-weight: 700; font-size: 13px; }
        .tst-who { display: flex; flex-direction: column; min-width: 0; flex: 1; }
        .tst-name { font-size: 14px; font-weight: 700; color: #0d0d12; line-height: 1.3; overflow-wrap: anywhere; }
        .tst-role { font-size: 12.5px; color: #666d80; line-height: 1.35; margin-top: 1px; overflow-wrap: anywhere; }
        .tst-profile { flex-shrink: 0; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; color: #818898; }
        .tst-profile:hover { color: ${ACCENT}; background: #f0f8f9; }
        .tst-dots { display: flex; justify-content: center; gap: 4px; margin-top: 8px; }
        .tst-dot { width: 24px; height: 24px; border: 0; background: none; padding: 0; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
        .tst-dot::after { content: ''; width: 8px; height: 8px; border-radius: 4px; background: #c9ced6; transition: width 0.2s, background 0.2s; }
        .tst-dot.is-on::after { width: 20px; background: ${ACCENT}; }
        .tst-count { margin: 10px 0 0; text-align: center; font-size: 13px; font-weight: 600; color: #818898; font-variant-numeric: tabular-nums; }
        @media (prefers-reduced-motion: reduce) { .tst-dot::after, .tst-arrow { transition: none; } }
      `}</style>
    </section>
  );
}
