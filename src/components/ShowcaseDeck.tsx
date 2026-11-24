'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  /** Przycisk lupy na ekranie i etykieta okna powiekszenia. */
  zoomLabel: string;
  closeLabel: string;
  /**
   * Interaktywny raport zamiast zrzutow (od 2026-11-24): ramka z `/share/<token>/embed`
   * (raport z linku w `/admin/lp`). Zrzuty zostaja pod spodem jako pierwszy obraz strony (LCP)
   * i jako zapas: ramka wchodzi dopiero po sygnale `EMBED_READY` z aplikacji. Na telefonie
   * ramka jest zablokowana do pierwszego dotkniecia (`touchActive`), zeby nie lapala przewijania strony.
   */
  live?: {
    /** Adres ramki; `null` = jeszcze nie znamy linku z panelu albo link nie jest `/share/…`. */
    embedUrl: string | null;
    /** Zwykly link publiczny - „Otworz w nowej karcie”. */
    reportUrl: string;
    title: string;
    caption: string;
    openLabel: string;
    /** Telefon: napis na zablokowanej ramce („Dotknij, aby przegladac”). */
    tapLabel: string;
    /** Odpowiedz panelu jeszcze nie przyszla (adres ramki nieznany). */
    pending: boolean;
    /** Plakietka nad urzadzeniem, gdy raport dziala („Interaktywny raport”). */
    badge: string;
    /** Napis na szkielecie, zanim raport sie wczyta (desktop). */
    loadingLabel: string;
  };
};

/** Ta sama wartosc co w aplikacji: `src/app/share/[token]/EmbedReady.tsx`. */
const EMBED_READY = 'citationone:embed-ready';
/** Szerokosc, w ktorej raport renderuje sie w mockupie telefonu (uklad mobilny panelu). */
const PHONE_FRAME_WIDTH = 390;
/** Brak sygnalu z ramki po tym czasie = wracaja zrzuty (desktop pokazuje do tego czasu szkielet). */
const LIVE_TIMEOUT_MS = 15000;

/** Zrzut slajdu w <picture>: wariant mobilny (media), WebP dla desktopu, PNG jako fallback. */
function SlidePicture({ slide, imgProps }: { slide: ShowcaseSlide; imgProps: React.ImgHTMLAttributes<HTMLImageElement> }) {
  return (
    <>
      <source media={MOBILE_QUERY} type="image/webp" srcSet={slide.mobileSrc.replace(/.png$/, '.webp')} />
      <source media={MOBILE_QUERY} srcSet={slide.mobileSrc} />
      <source type="image/webp" srcSet={slide.src.replace(/.png$/, '.webp')} />
      <img src={slide.src} alt={slide.alt} {...imgProps} />
    </>
  );
}

/**
 * Ekran mockupu: kilka zrzutow panelu przewijanych strzalkami, kreskami pozycji i swipem.
 * Slajd zmienia sie WYLACZNIE na ruch uzytkownika - zadnego autoodtwarzania (decyzja
 * z 2026-09-08). Wspoldzielony przez `Showcase` (PL) i `ShowcaseEN` - same slajdy
 * i etykiety ida propem, tak jak w `DimensionPage`.
 */
export default function ShowcaseDeck({ slides, startIndex = 0, regionLabel, prevLabel, nextLabel, zoomLabel, closeLabel, live }: Props) {
  const [index, setIndex] = useState(startIndex);
  const count = slides.length;

  // Ramka z raportem: montowana po zaladowaniu strony i w bezczynnosci, gdy sekcja jest blisko
  // widoku (nie konkuruje z hydracja LP), widoczna dopiero po sygnale z aplikacji. Do tego czasu
  // stoi talia zrzutow - ona jest elementem LCP.
  const embedUrl = live?.embedUrl ?? null;
  const [frameMounted, setFrameMounted] = useState(false);
  const [liveReady, setLiveReady] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // Telefon: ramka renderuje raport w szerokosci telefonu (`PHONE_FRAME_WIDTH`) przeskalowany do
  // ekranu mockupu i NIE lapie palca, dopoki ktos jej nie dotknie (`touchActive`) - inaczej
  // przewijanie strony utykaloby w raporcie. Po wyjezdzie sekcji z widoku blokada wraca.
  const [isMobile, setIsMobile] = useState(false);
  const [touchActive, setTouchActive] = useState(false);
  // Desktop: od pierwszego malowania stoi SZKIELET raportu zamiast zrzutu (zrzut, a po chwili inny
  // raport, wygladal jak podmiana ekranu). Zrzuty wracaja tylko, gdy raport sie nie wczyta.
  // Telefon zostaje przy zrzutach do czasu sygnalu - tam zrzut jest elementem LCP.
  const [liveFailed, setLiveFailed] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    setLiveReady(false);
    setFrameMounted(false);
    if (!embedUrl) return;
    // Desktop: ramka startuje od razu - uzytkownik i tak patrzy na szkielet, wiec kazda sekunda
    // czekania na `load` strony to sekunda dluzej przed raportem.
    if (!window.matchMedia(MOBILE_QUERY).matches) {
      setFrameMounted(true);
      return;
    }
    const el = screenRef.current;
    if (!el) return;
    // `cancelled` zamyka tez sciezke przez `load`: nasluch dopiety po sprzataniu efektu
    // (zmiana adresu, odmontowanie) zamontowalby ramke ze starym adresem.
    let cancelled = false;
    let idleId: number | undefined;
    let timerId: number | undefined;
    const mount = () => {
      if (cancelled) return;
      const run = () => { if (!cancelled) setFrameMounted(true); };
      if (typeof window.requestIdleCallback === 'function') idleId = window.requestIdleCallback(run, { timeout: 3000 });
      else timerId = window.setTimeout(run, 1200);
    };
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      if (document.readyState === 'complete') mount();
      else window.addEventListener('load', mount, { once: true });
    }, { rootMargin: '600px 0px' });
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      window.removeEventListener('load', mount);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [embedUrl]);
  useEffect(() => {
    if (!embedUrl || !frameMounted) return;
    const origin = new URL(embedUrl).origin;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== origin || e.source !== frameRef.current?.contentWindow) return;
      if ((e.data as { type?: unknown } | null)?.type === EMBED_READY) setLiveReady(true);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [embedUrl, frameMounted]);
  useEffect(() => {
    if (!touchActive) return;
    const el = screenRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.every((e) => !e.isIntersecting)) setTouchActive(false);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [touchActive]);
  const livePending = live?.pending ?? false;
  const hasLive = !!live;
  useEffect(() => {
    if (hasLive && !livePending && !embedUrl) setLiveFailed(true);
  }, [hasLive, livePending, embedUrl]);
  useEffect(() => {
    if (!frameMounted || liveReady) return;
    const t = window.setTimeout(() => setLiveFailed(true), LIVE_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [frameMounted, liveReady]);
  const frameLocked = isMobile && !touchActive;
  const waitingLive = hasLive && !liveReady && !liveFailed;

  // Powiekszenie: klik w zrzut otwiera okno z pelnym zrzutem biezacego slajdu. Klik po
  // przeciagnieciu NIE otwiera - przegladarka wysyla `click` takze po dragu tasmy.
  const [zoomed, setZoomed] = useState(false);
  const dragged = useRef(false);
  const zoomTrigger = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const openZoom = (trigger: HTMLElement) => {
    zoomTrigger.current = trigger;
    setZoomed(true);
  };
  const closeZoom = () => {
    setZoomed(false);
    zoomTrigger.current?.focus({ preventScroll: true });
  };

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
  // Layout effect, bo pierwszy pomiar zdejmuje pozycje startowa z CSS (`translate` nizej) -
  // `x` musi ja przejac przed malowaniem, inaczej mignalby slajd pierwszy.
  const lastWidth = useRef(0);
  useLayoutEffect(() => {
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
      const webp = document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp');
      slides.forEach((s, i) => {
        if (i === startIndex) return;
        const src = mobile ? s.mobileSrc : s.src;
        new Image().src = webp ? src.replace(/.png$/, '.webp') : src;
      });
    };
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload);
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(preload, 1500);
    return () => window.clearTimeout(id);
  }, [slides, startIndex]);

  // Okno powiekszenia: Esc zamyka, strzalki klawiatury przelaczaja slajd, strona pod spodem
  // sie nie przewija.
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeZoom();
      else if (e.key === 'ArrowLeft') go(index - 1);
      else if (e.key === 'ArrowRight') go(index + 1);
      else if (e.key === 'Tab') {
        // Fokus zostaje w oknie (aria-modal) - Tab nie ucieka do strony pod spodem.
        const items = [...(overlayRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? [])];
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !items.includes(active as HTMLButtonElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !items.includes(active as HTMLButtonElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // `go` i `closeZoom` sa tworzone na nowo co render; wystarczy aktualny `index`.
  }, [zoomed, index]);

  return (
    <div
      className={[hasLive && 'deck-has-live', waitingLive && 'deck-waiting-live'].filter(Boolean).join(' ') || undefined}
      role="group"
      aria-busy={waitingLive || undefined}
      aria-roledescription={liveReady ? undefined : 'carousel'}
      aria-label={liveReady && live ? live.title : regionLabel}
    >
      {/* Pod urzadzeniem stoi adnotacja, juz nie nachodzi na ekran: od 2026-09-19 ekran jest widoczny
          w calosci (wygaszanie tylko na ostatnich ~8%), wiec pastylka zaslanialaby tresc zrzutu. */}
      <div style={{ position: 'relative', perspective: '2000px', marginBottom: 18 }}>
        {/* Informacja, ze ekran jest prawdziwym raportem, a nie obrazkiem - dopiero gdy raport dziala. */}
        {liveReady && live && (
          <div className="deck-live-badge">
            <span className="deck-live-badge-dot" aria-hidden />
            {live.badge}
          </div>
        )}
        {/* Wjazd od dolu po 0,3 s robi CSS (`deck-rise` nizej), nie framer-motion: animacja z JS
            startowala dopiero po hydracji, a zrzut na ekranie jest najwiekszym elementem strony
            (LCP) - na telefonie czekal przez to ~4 s na pobrany juz plik. */}
        <div
          className={liveReady ? 'deck-device deck-device-live' : 'deck-device'}
          style={{
            transformOrigin: '50% 0%',
            margin: '0 auto',
            filter: 'drop-shadow(-18px 26px 44px rgba(13,13,18,0.2))',
          }}
        >
          {/* Wygaszenie tylko na samym dole - wczesniej (40% → 76%) zjadalo polowe zrzutu. */}
          <div style={liveReady ? undefined : {
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
                    className="deck-shots"
                    // Do pierwszego pomiaru szerokosci slajd startowy ustawia CSS w procentach. Bez tego
                    // HTML pokazywal slajd pierwszy, a startowy - element LCP - wjezdzal dopiero po
                    // hydracji. `translate` jest osobna wlasciwoscia, wiec nie gryzie sie z `x`.
                    style={{
                      display: 'flex',
                      height: '100%',
                      cursor: 'zoom-in',
                      x,
                      translate: width === 0 ? `${-startIndex * 100}% 0` : 'none',
                    }}
                    drag={count > 1 ? 'x' : false}
                    dragConstraints={{ left: -(count - 1) * width, right: 0 }}
                    dragElastic={0.14}
                    dragMomentum={false}
                    whileDrag={{ cursor: 'grabbing' }}
                    onPointerDown={() => { dragged.current = false; }}
                    onDragStart={() => { dragged.current = true; }}
                    onClick={(e) => {
                      if (dragged.current) return;
                      openZoom(e.currentTarget);
                    }}
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
                        {/* Kolejnosc jest znaczaca: najpierw warianty mobilne (media), potem WebP dla
                            desktopu, a <img> zostaje fallbackiem PNG. Zrzuty mobilne sa PNG z paleta -
                            zwykly WebP wychodzil na nich CIEZSZY (plaskie kolory), wiec ich WebP jest
                            near-lossless (piksel w piksel jak PNG, 10-40% lzejszy, od 2026-10-18). */}
                        <SlidePicture
                          slide={slide}
                          imgProps={{
                            draggable: false,
                            decoding: 'async',
                            loading: i === startIndex ? 'eager' : 'lazy',
                            fetchPriority: i === startIndex ? 'high' : 'auto',
                            style: {
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'top center',
                              display: 'block',
                              userSelect: 'none',
                            },
                          }}
                        />
                      </picture>
                    ))}
                  </motion.div>

                  {live && (
                    <div className="deck-skeleton" aria-hidden>
                      <span className="sk sk-title" />
                      <span className="sk sk-url" />
                      <div className="sk-row">
                        <span className="sk sk-tab" /><span className="sk sk-tab" /><span className="sk sk-tab" /><span className="sk sk-tab" />
                      </div>
                      <div className="sk-cards">
                        <span className="sk sk-card" /><span className="sk sk-card" />
                      </div>
                      <div className="sk-status"><span className="sk-spinner" />{live.loadingLabel}</div>
                    </div>
                  )}

                  {frameMounted && embedUrl && live && (
                    <iframe
                      ref={frameRef}
                      src={embedUrl}
                      title={live.title}
                      className={liveReady ? (frameLocked ? 'deck-live-frame deck-live-frame-on deck-live-frame-locked' : 'deck-live-frame deck-live-frame-on') : 'deck-live-frame'}
                      style={isMobile && width > 0 ? {
                        width: PHONE_FRAME_WIDTH,
                        height: `${100 * PHONE_FRAME_WIDTH / width}%`,
                        transform: `scale(${width / PHONE_FRAME_WIDTH})`,
                      } : undefined}
                      aria-hidden={liveReady ? undefined : true}
                      tabIndex={liveReady ? undefined : -1}
                      // Bez allow-top-navigation: klik w ramce nie wyprowadzi z LP; linki zewnetrzne
                      // otwieraja sie w nowej karcie (popups).
                      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  )}

                  {liveReady && live && frameLocked && (
                    <button type="button" className="deck-live-tap" onClick={() => setTouchActive(true)}>
                      <span className="deck-live-tap-pill">{live.tapLabel}</span>
                    </button>
                  )}

                  {/* połysk ekranu */}
                  <div aria-hidden style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 16%, rgba(255,255,255,0) 36%)',
                  }} />

                  {!liveReady && (<>
                  {/* Lupa: klawiaturowe (i widoczne) wejscie do powiekszenia - sam klik w zrzut
                      niczego o sobie nie mowi. */}
                  <button
                    type="button"
                    className="deck-zoom"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => openZoom(e.currentTarget)}
                    aria-label={zoomLabel}
                    aria-haspopup="dialog"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                    </svg>
                  </button>

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
                  </>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adnotacja: nazwa widocznego ekranu + pozycja w talii. Kreski przeskakuja wprost
          na wybrany slajd - sa przyciskami, wiec maja etykiety i wlasne pole trafienia. */}
      {liveReady && live ? (
        <div className="deck-caption deck-caption-live">
          <span className="deck-caption-dot" aria-hidden />
          <span className="deck-caption-live-text">{live.caption}</span>
          <a className="deck-caption-open" href={live.reportUrl} target="_blank" rel="noopener">
            {live.openLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      ) : (
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
      )}

      {/* Portal do <body>: urzadzenie ma `transform`, a pod nim `position: fixed` liczyloby sie
          od mockupu zamiast od okna. */}
      {zoomed && typeof document !== 'undefined' && createPortal(
        <div
          ref={overlayRef}
          className="deck-zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${zoomLabel}: ${slides[index].label}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeZoom(); }}
        >
          <button type="button" className="deck-zoom-close" onClick={closeZoom} aria-label={closeLabel} autoFocus>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <picture className="deck-zoom-picture" onClick={(e) => { if (e.target === e.currentTarget) closeZoom(); }}>
            <SlidePicture slide={slides[index]} imgProps={{ className: 'deck-zoom-img', decoding: 'async' }} />
          </picture>
          <div className="deck-zoom-bar">
            <button type="button" className="deck-zoom-nav" onClick={() => go(index - 1)} disabled={index === 0} aria-label={prevLabel}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="deck-zoom-label">{slides[index].label} <span className="deck-zoom-count">{index + 1}/{count}</span></span>
            <button type="button" className="deck-zoom-nav" onClick={() => go(index + 1)} disabled={index === count - 1} aria-label={nextLabel}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        /* Lupa w prawym gornym rogu ekranu; na telefonie tez widoczna (strzalki ekranu sa tam ukryte). */
        .deck-zoom {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 34px;
          height: 34px;
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
          cursor: zoom-in;
          opacity: 0.92;
          transition: opacity 0.18s ease, background 0.16s ease, color 0.16s ease;
        }
        .deck-zoom:hover { opacity: 1; background: #ffffff; color: #0b7983; }
        .deck-zoom-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(13,13,18,0.88);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 56px 16px 16px;
          animation: deck-zoom-in 0.18s ease-out;
        }
        @keyframes deck-zoom-in { from { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .deck-zoom-overlay { animation: none; } }
        .deck-zoom-picture {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
          max-width: 100%;
          flex: 1 1 auto;
        }
        .deck-zoom-img {
          display: block;
          /* Nie wiecej niz naturalna szerokosc zrzutu (1520 px) - rozciagniety obraz znow by sie rozmyl. */
          max-width: min(1520px, 100%);
          max-height: calc(100vh - 140px);
          max-height: calc(100dvh - 140px);
          width: auto;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.45);
          background: #f7f8fa;
        }
        .deck-zoom-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          color: #ffffff;
          cursor: pointer;
        }
        .deck-zoom-close:hover { background: rgba(255,255,255,0.22); }
        .deck-zoom-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
        }
        .deck-zoom-count { font-weight: 400; color: rgba(255,255,255,0.6); font-variant-numeric: tabular-nums; margin-left: 4px; }
        .deck-zoom-nav {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          color: #ffffff;
          cursor: pointer;
        }
        .deck-zoom-nav:hover { background: rgba(255,255,255,0.22); }
        .deck-zoom-nav:disabled { visibility: hidden; }
        /* Telefon: zrzut dopasowany do wysokosci bylby tej samej wielkosci co w mockupie. Dajemy
           pelna szerokosc i przewijanie w pionie - pasek ze strzalkami zostaje na dole okna. */
        @media ${MOBILE_QUERY} {
          .deck-zoom-overlay { justify-content: flex-start; overflow-y: auto; padding: 56px 12px 12px; }
          .deck-zoom-picture { flex: none; width: 100%; }
          .deck-zoom-img { width: 100%; max-width: 480px; max-height: none; }
          .deck-zoom-bar {
            position: sticky;
            bottom: 0;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(13,13,18,0.82);
          }
          .deck-zoom-close { position: fixed; }
        }

        /* Desktop: laptopowy ekran z poziomym zrzutem. Mobile: waska ramka telefonu z pionowym
           zrzutem - proporcja ekranu MUSI zgadzac sie z plikiem, inaczej object-fit przytnie tekst. */
        .deck-device {
          max-width: 980px;
          --deck-tilt: 5deg;
          transform: rotateX(var(--deck-tilt));
          animation: deck-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }
        @keyframes deck-rise {
          from { opacity: 0; transform: translateY(80px) rotateX(var(--deck-tilt)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .deck-device { animation: none; }
        }
        /* Raport na zywo: bez przechylenia 3D (rotateX rozmywa tekst i przesuwa pola klikniec). */
        .deck-device-live { --deck-tilt: 0deg; }
        /* Desktop z raportem na zywo: bez przechylenia od poczatku (szkielet -> raport bez ruchu
           urzadzenia), a do sygnalu z ramki zamiast zrzutow i kontrolek talii stoi szkielet. */
        .deck-skeleton { display: none; }
        @media (min-width: 641px) {
          .deck-has-live .deck-device { --deck-tilt: 0deg; }
          .deck-waiting-live .deck-shots,
          .deck-waiting-live .deck-zoom,
          .deck-waiting-live .deck-arrow,
          .deck-waiting-live .deck-caption { visibility: hidden; }
          .deck-waiting-live .deck-skeleton {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 26px 9% 0;
            background: #f7f8fa;
          }
        }
        .deck-skeleton .sk {
          display: block;
          border-radius: 8px;
          background: linear-gradient(90deg, #e9ecf1 0%, #f3f5f8 40%, #e9ecf1 80%) 0 0 / 300% 100%;
          animation: deck-sk 1.4s ease-in-out infinite;
        }
        @keyframes deck-sk { from { background-position: 100% 0; } to { background-position: 0 0; } }
        .deck-skeleton .sk-title { width: 46%; height: 18px; }
        .deck-skeleton .sk-url { width: 30%; height: 10px; }
        .deck-skeleton .sk-row { display: flex; gap: 8px; margin-top: 10px; }
        .deck-skeleton .sk-tab { width: 13%; height: 30px; }
        .deck-skeleton .sk-cards { display: flex; gap: 14px; margin-top: 6px; flex: 1; min-height: 0; }
        .deck-skeleton .sk-card { flex: 1; height: 100%; border-radius: 12px; }
        .deck-skeleton .sk-status {
          position: absolute;
          left: 50%;
          top: 50%;
          translate: -50% -50%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.92);
          box-shadow: 0 6px 18px rgba(13,13,18,0.1);
          font-size: 14px;
          font-weight: 600;
          color: #36394a;
          white-space: nowrap;
        }
        .deck-skeleton .sk-spinner {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          border: 2px solid rgba(11,121,131,0.2);
          border-top-color: #0b7983;
          animation: deck-spin 0.8s linear infinite;
        }
        @keyframes deck-spin { to { transform: rotate(360deg); } }
        /* Plakietka na gornej krawedzi urzadzenia. */
        .deck-live-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          z-index: 2;
          translate: -50% 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: #0b7983;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
          box-shadow: 0 8px 20px rgba(11,121,131,0.28);
          animation: deck-badge-in 0.35s ease-out;
        }
        @keyframes deck-badge-in { from { opacity: 0; translate: -50% 6px; } }
        .deck-live-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #7ff0c4;
          animation: deck-pulse 1.8s ease-out infinite;
        }
        @keyframes deck-pulse {
          from { box-shadow: 0 0 0 0 rgba(127,240,196,0.7); }
          to { box-shadow: 0 0 0 7px rgba(127,240,196,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .deck-skeleton .sk, .deck-skeleton .sk-spinner, .deck-live-badge, .deck-live-badge-dot { animation: none; }
        }
        /* Ramka renderuje raport w 125% szerokosci ekranu i zmniejsza go do 80% - panel widzi
           szerszy uklad (desktopowy), a na ekranie miesci sie wiecej tresci niz w skali 1:1. */
        .deck-live-frame {
          position: absolute;
          top: 0;
          left: 0;
          width: 125%;
          height: 125%;
          border: 0;
          transform: scale(0.8);
          transform-origin: 0 0;
          background: #f7f8fa;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .deck-live-frame-on { opacity: 1; pointer-events: auto; }
        .deck-live-frame-locked { pointer-events: none; }
        /* Zablokowana ramka na telefonie: przezroczysta warstwa przepuszcza przewijanie strony
           (touch-action), a dotkniecie odblokowuje raport. */
        .deck-live-tap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          touch-action: pan-y;
        }
        .deck-live-tap:active { transform: none; }
        .deck-live-tap-pill {
          padding: 9px 16px;
          border-radius: 999px;
          background: rgba(11,121,131,0.94);
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 8px 22px rgba(13,13,18,0.22);
        }
        .deck-caption-live { flex-wrap: wrap; justify-content: center; row-gap: 2px; }
        .deck-caption-live-text { font-weight: 600; }
        .deck-caption-open {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #0b7983;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }
        .deck-caption-open:hover { text-decoration: underline; }
        /* Telefon: o interakcji mowi pastylka na ekranie, wiec pod urzadzeniem zostaje sam link. */
        @media ${MOBILE_QUERY} {
          .deck-caption-live { padding: 8px 14px 8px 12px; }
          .deck-caption-live-text { display: none; }
        }
        .deck-edge { border-radius: 30px; }
        .deck-bezel { border-radius: 26px; padding: 12px; }
        .deck-screen { border-radius: 16px; aspect-ratio: 1900 / 962; }
        @media ${MOBILE_QUERY} {
          /* Na telefonie bez przechylenia 3D: rotateX rasteryzuje zrzut pod katem i rozmywa drobny
             tekst, ktory na waskim ekranie i tak jest na granicy czytelnosci. */
          .deck-device { max-width: 300px; --deck-tilt: 0deg; }
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
