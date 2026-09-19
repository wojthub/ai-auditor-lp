'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion';

const SPRING = { type: 'spring', stiffness: 210, damping: 30, mass: 0.9 } as const;

export type ShowcaseSlide = {
  src: string;
  alt: string;
  /** Nazwa zakladki panelu widocznej na slajdzie - ida do adnotacji nad urzadzeniem. */
  label: string;
  /**
   * Pionowy zrzut tej samej zakladki w szerokosci telefonu (780x1440, czyli 390x720 @2x),
   * podawany do MOBILE_QUERY. Desktopowy zrzut 1900 px zmniejszony do ~300 px dawal tekst
   * wielkosci 2 px - nieczytelny. Zrzuty mobilne robione z publicznego raportu /share/.
   */
  mobileSrc: string;
};

/** Ten sam prog w <source media> i w CSS ekranu - rozjazd dalby pionowy zrzut w poziomej ramce. */
const MOBILE_QUERY = '(max-width: 640px)';

type Props = {
  slides: ShowcaseSlide[];
  /** Slajd pokazywany po wejsciu na strone; reszta czeka na ruch uzytkownika. */
  startIndex?: number;
  /** Etykiety dostepnosci - jedyne miejsce, w ktorym ten komponent rozroznia jezyki. */
  regionLabel: string;
  prevLabel: string;
  nextLabel: string;
};

/**
 * Ekran mockupu: kilka zrzutow panelu przewijanych strzalkami, kreskami pozycji i swipem.
 * Slajd zmienia sie WYLACZNIE na ruch uzytkownika - zadnego autoodtwarzania (decyzja
 * z 2026-09-08). Wspoldzielony przez `Showcase` (PL) i `ShowcaseEN` - same slajdy
 * i etykiety ida propem, tak jak w `DimensionPage`.
 */
export default function ShowcaseDeck({ slides, startIndex = 0, regionLabel, prevLabel, nextLabel }: Props) {
  const [index, setIndex] = useState(startIndex);
  const count = slides.length;

  // Na telefonie bez przechylenia 3D: rotateX rasteryzuje zrzut pod katem i rozmywa drobny
  // tekst, ktory na waskim ekranie i tak jest na granicy czytelnosci. SSR renderuje wariant
  // desktopowy, telefon przelacza sie po mount.
  const [flat, setFlat] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => setFlat(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const tilt = flat ? 0 : 5;

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
  // puszczeniu myszy sciaga tasme do `dragConstraints` i - gdy indeks sie NIE zmienil -
  // nic juz jej stamtad nie zabiera: krotki drag na slajdzie 2 przerzucal widok na slajd 1.
  // Snap robimy wiec sami, po kazdym przeciagnieciu.
  const x = useMotionValue(0);
  const settle = (next: number) => {
    setIndex(next);
    animate(x, -next * width, SPRING);
  };
  // Talia sie nie zapetla: strzalki i swipe zatrzymuja sie na koncach, zeby przeciagniecie
  // nie teleportowalo uzytkownika z ostatniego ekranu na pierwszy.
  const go = (next: number) => settle(Math.min(count - 1, Math.max(0, next)));

  // Zmiana szerokosci (obrot telefonu, resize okna) przelicza pozycje bez animacji -
  // stary offset w px wskazywalby po zmianie na srodek sasiedniego slajdu.
  const lastWidth = useRef(0);
  useEffect(() => {
    if (width === lastWidth.current) return;
    lastWidth.current = width;
    x.set(-index * width);
  }, [width, index, x]);

  // Slajdy poza startowym maja `loading="lazy"` (nie blokuja pierwszego renderu), ale
  // dociagamy je zaraz po bezczynnosci - inaczej pierwsze przelaczenie pokazywaloby pusty
  // ekran, bo lazy startuje dopiero, gdy obrazek wjezdza w widok.
  useEffect(() => {
    // Dociagamy wariant, ktory <picture> faktycznie pokaze - inaczej telefon pobieralby desktopowe PNG na darmo.
    const preload = () => {
      const mobile = window.matchMedia(MOBILE_QUERY).matches;
      slides.forEach((s, i) => { if (i !== startIndex) new Image().src = mobile ? s.mobileSrc : s.src; });
    };
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload);
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(preload, 1500);
    return () => window.clearTimeout(id);
  }, [slides, startIndex]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={regionLabel}
    >
      {/* Pod urzadzeniem stoi adnotacja, juz nie nachodzi na ekran: od 2026-09-19 ekran jest widoczny
          w calosci (wygaszanie tylko na ostatnich ~8%), wiec pastylka zaslanialaby tresc zrzutu. */}
      <div style={{ perspective: '2000px', marginBottom: 18 }}>
        <motion.div
          className="deck-device"
          initial={{ opacity: 0, y: 80, rotateX: tilt }}
          animate={{ opacity: 1, y: 0, rotateX: tilt }}
          transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: '50% 0%',
            margin: '0 auto',
            filter: 'drop-shadow(-18px 26px 44px rgba(13,13,18,0.2))',
          }}
        >
          {/* Wygaszenie tylko na samym dole - wczesniej (40% → 76%) zjadalo polowe zrzutu. */}
          <div style={{
            WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 92%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, #000 0%, #000 92%, transparent 100%)',
          }}>
            {/* metaliczna krawędź */}
            <div className="deck-edge" style={{
              background: 'linear-gradient(135deg, #edeff2 0%, #b4b7bd 40%, #d6d8dc 68%, #a6a9af 100%)',
              padding: 4,
            }}>
              {/* ciemny bezel */}
              <div className="deck-bezel" style={{ background: '#0b0b0d' }}>
                {/* ekran - sztywna proporcja (w CSS nizej, osobna dla mobile), zeby zmiana slajdu
                    nie przesuwala sekcji nizej */}
                <div ref={screenRef} className="deck-screen" style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#f7f8fa',
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
                    onDragEnd={(_, info) => {
                      // Kazde puszczenie konczy sie snapem - takze ponizej progu, zeby tasma
                      // nie zostawala miedzy slajdami.
                      if (info.offset.x < -60 || info.velocity.x < -420) go(index + 1);
                      else if (info.offset.x > 60 || info.velocity.x > 420) go(index - 1);
                      else go(index);
                    }}
                  >
                    {slides.map((slide, i) => (
                      <picture key={slide.src} style={{ flex: '0 0 100%', width: '100%', height: '100%', display: 'block' }}>
                        <source media={MOBILE_QUERY} srcSet={slide.mobileSrc} />
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          draggable={false}
                          loading={i === startIndex ? 'eager' : 'lazy'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            display: 'block',
                            userSelect: 'none',
                          }}
                        />
                      </picture>
                    ))}
                  </motion.div>

                  {/* połysk ekranu */}
                  <div aria-hidden style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 16%, rgba(255,255,255,0) 36%)',
                  }} />

                  {/* Strzalki lezą na ekranie, nie pod nim - dol mockupu zjada maska gradientu. */}
                  <button
                    type="button"
                    className="deck-arrow deck-arrow-prev"
                    onMouseDown={(e) => e.preventDefault()}
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
                    onMouseDown={(e) => e.preventDefault()}
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

      {/* Adnotacja: nazwa widocznego ekranu + pozycja w talii. Kreski przeskakuja wprost
          na wybrany slajd - sa przyciskami, wiec maja etykiety i wlasne pole trafienia. */}
      <div className="deck-caption">
        {/* Na telefonie strzalki siedza tutaj, a nie na ekranie - na waskim zrzucie zaslanialy tresc. */}
        <button
          type="button"
          className="deck-caption-arrow"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label={prevLabel}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="deck-caption-dot" aria-hidden />
        <span className="deck-caption-text">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={slides[index].label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {slides[index].label}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="deck-caption-steps">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className="deck-step-btn"
              onClick={() => go(i)}
              onMouseDown={(e) => e.preventDefault()}
              aria-label={slide.label}
              aria-current={i === index ? 'true' : undefined}
            >
              {/* Kreska ma 3 px, wiec pole trafienia daje `padding` przycisku, nie ona sama. */}
              <span className={i === index ? 'deck-step deck-step-on' : 'deck-step'} />
            </button>
          ))}
        </span>
        {/* Licznik czyta glosno to samo, co kreski pokazuja wzrokiem. */}
        <span className="deck-caption-count">{index + 1}/{count}</span>
        <button
          type="button"
          className="deck-caption-arrow"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => go(index + 1)}
          disabled={index === count - 1}
          aria-label={nextLabel}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <style>{`
        /* Desktop: laptopowy ekran z poziomym zrzutem. Mobile: waska ramka telefonu z pionowym
           zrzutem - proporcja ekranu MUSI zgadzac sie z plikiem, inaczej object-fit przytnie tekst. */
        .deck-device { max-width: 980px; }
        .deck-edge { border-radius: 30px; }
        .deck-bezel { border-radius: 26px; padding: 12px; }
        .deck-screen { border-radius: 16px; aspect-ratio: 1900 / 962; }
        @media ${MOBILE_QUERY} {
          .deck-device { max-width: 300px; }
          .deck-edge { border-radius: 40px; }
          .deck-bezel { border-radius: 36px; padding: 8px; }
          .deck-screen { border-radius: 29px; aspect-ratio: 390 / 720; }
        }
        .deck-caption {
          /* Urzadzenie ma transform + filter, wiec tworzy kontekst ukladania i maluje sie NAD
             zwyklymi blokami w przeplywie - bez tego pastylka chowa sie pod mockupem. */
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
          max-width: 100%;
          margin: 0 auto;
          padding: 7px 14px 7px 12px;
          border: 1px solid #e4e7ec;
          border-radius: 999px;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 13.5px;
          letter-spacing: -0.015em;
          color: #36394a;
        }
        .deck-caption-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #0b7983;
          box-shadow: 0 0 0 3px rgba(11,121,131,0.14);
          flex: none;
        }
        /* Etykieta zmienia sie z crossfade, wiec jej pudelko musi miec stala wysokosc -
           inaczej pasek podskakuje w trakcie przejscia. */
        .deck-caption-text {
          position: relative;
          display: block;
          height: 19px;
          line-height: 19px;
          font-weight: 600;
          white-space: nowrap;
        }
        .deck-caption-text > span {
          display: block;
        }
        .deck-caption-text > span:not(:first-child) {
          position: absolute;
          inset: 0;
        }
        .deck-caption-steps {
          display: flex;
          align-items: center;
          margin-left: 2px;
        }
        /* Przycisk jest przezroczysta ramka wokol kreski: 19 px wysokosci pola trafienia
           przy 3 px widocznego paska, bez zmiany wysokosci calej pastylki. */
        .deck-step-btn {
          appearance: none;
          border: none;
          background: none;
          padding: 8px 2px;
          margin: 0;
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: 0;
        }
        .deck-step-btn:hover .deck-step { background: #a4acb9; }
        .deck-step-btn:hover .deck-step-on { background: #097380; }
        .deck-step {
          width: 8px;
          height: 3px;
          border-radius: 999px;
          background: #d4d8e0;
          transition: width 0.24s ease, background 0.24s ease;
        }
        .deck-step-on {
          width: 18px;
          background: #0b7983;
        }
        .deck-caption-count {
          font-size: 12px;
          font-variant-numeric: tabular-nums;
          color: #97a0af;
        }
        .deck-arrow {
          position: absolute;
          /* Wysrodkowanie idzie przez margin-top, NIE translateY(-50%): globalne
             button:active { transform: scale(0.97) } z globals.css nadpisalo transform
             i strzalka na czas kliku zjezdzala o pol swojej wysokosci w dol. */
          top: 50%;
          margin-top: -19px;
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
          /* Strzalki sa jedyna widoczna kontrolka, wiec stoja na ekranie od razu - takze na
             dotyku, gdzie sam swipe niczego o sobie nie mowi. Pod kursorem tylko mocnieja. */
          opacity: 0.92;
          transition: opacity 0.18s ease, background 0.16s ease, color 0.16s ease;
        }
        .deck-arrow:hover { opacity: 1; background: #ffffff; color: #0b7983; }
        /* Na krancach taliii strzalka gasnie zamiast zostawac martwym kolkiem. */
        .deck-arrow:disabled { opacity: 0; pointer-events: none; }
        .deck-arrow-prev { left: 14px; }
        .deck-arrow-next { right: 14px; }
        /* Wlasne wcisniecie - czysta skala, bez skladowej pionowej. */
        .deck-arrow:active { transform: scale(0.94); }
        /* Strzalki w pastylce: tylko na telefonie. Wylaczona strzalka zostaje w ukladzie
           (visibility), zeby pastylka nie zmieniala szerokosci na krancach talii. */
        .deck-caption-arrow { display: none; }
        @media ${MOBILE_QUERY} {
          .deck-arrow { display: none; }
          .deck-caption { gap: 8px; padding: 4px 6px; }
          .deck-caption-arrow {
            appearance: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            margin: 0;
            padding: 0;
            border: none;
            border-radius: 999px;
            background: transparent;
            color: #36394a;
            cursor: pointer;
          }
          .deck-caption-arrow:active { background: rgba(11,121,131,0.1); color: #0b7983; }
          .deck-caption-arrow:disabled { visibility: hidden; }
        }
      `}</style>
    </div>
  );
}
