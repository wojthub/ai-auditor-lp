'use client';

import { motion } from 'framer-motion';

// Dekoracyjna warstwa tla: wezly polaczone cienkimi liniami — nawiazanie do grafu wiedzy
// (encja-atrybut-wartosc), ktory audyt mierzy. Wspolna dla PL i EN, dla hero i podstron.
//
// Wnetrze grafu jest STATYCZNE (linie i wezly maja docelowe wartosci w regule bazowej CSS).
// Jedyna animacja to jednorazowe wejscie calego <svg> przez Framer Motion — patrz komentarz
// nad sekcja `.hero-nodes` w globals.css: keyframes CSS na elementach SVG nie odmalowuja sie.
//
// Wezly siedza WYLACZNIE przy krawedziach; srodek (240-1010 w ukladzie viewBox) zostaje pusty
// pod naglowek i formularz.

const EDGES: Array<[number, number, number, number]> = [
  // lewa grupa
  [150, 60, 90, 170],
  [90, 170, 200, 250],
  [200, 250, 70, 330],
  [200, 250, 240, 410],
  [70, 330, 240, 410],
  // prawa grupa
  [1050, 70, 1110, 165],
  [1110, 165, 1000, 250],
  [1000, 250, 1130, 355],
  [1000, 250, 960, 435],
  [1130, 355, 960, 435],
];

const NODES: Array<[number, number, number]> = [
  [150, 60, 2.5],
  [90, 170, 3.5],
  [200, 250, 4.5],
  [70, 330, 3],
  [240, 410, 2.5],
  [1050, 70, 2.5],
  [1110, 165, 3],
  [1000, 250, 4.5],
  [1130, 355, 3.5],
  [960, 435, 2.5],
];

// vbHeight splaszcza uklad pod nizsze naglowki podstron. Bez tego preserveAspectRatio="slice"
// przycina graf tak mocno, ze wieksza czesc chowa sie pod nawigacja.
// `band` = warstwa rozciagnieta na hero + sekcje z mockupem (HeroBand): maska wygasza
// tylko sam dol pasma, zeby graf nie urywal sie na granicy sekcji.
export default function HeroNodes({ vbHeight = 520, height, band }: { vbHeight?: number; height?: number; band?: boolean }) {
  const sy = (y: number) => +(y * vbHeight / 520).toFixed(1);

  // Animacja odpala sie RAZ po otwarciu strony (initial/animate, nie whileInView)
  // i biegnie po liniach z gory na dol — opoznienie kazdej krawedzi zalezy od
  // wysokosci jej punktu poczatkowego, wiec caly graf rysuje sie jak fala.
  // Obie grupy (lewa i prawa) ruszaja rownoczesnie, bo maja te same zakresy Y.
  const Y_TOP = 60;
  const Y_BOTTOM = 435;
  const TRAVEL = 1.9;   // ile trwa przejscie fali od gory do dolu
  const START = 0.25;   // pauza, zanim fala ruszy
  const progress = (y: number) => (y - Y_TOP) / (Y_BOTTOM - Y_TOP);

  return (
    <motion.svg
      className={band ? 'hero-nodes hero-nodes-band' : 'hero-nodes'}
      style={height ? { height, bottom: 'auto' } : undefined}
      viewBox={`0 0 1200 ${vbHeight}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Kreska wjezdza wzdluz odcinka: skracamy stroke-dashoffset od dlugosci do zera.
          Dlugosc liczymy z geometrii, bo <line> nie ma getTotalLength przy SSR, a Motion
          ustawia to jako styl inline (patrz komentarz nad `.hero-nodes` w globals.css —
          keyframes CSS na dzieciach SVG w ogole sie nie odmalowuja). */}
      {EDGES.map(([x1, y1, x2, y2], i) => {
        const len = Math.hypot(x2 - x1, sy(y2) - sy(y1));
        return (
          <motion.line
            key={`e${i}`}
            x1={x1} y1={sy(y1)} x2={x2} y2={sy(y2)}
            className="hero-node-edge"
            strokeDasharray={len}
            initial={{ strokeDashoffset: len }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 0.75,
              delay: START + progress(y1) * TRAVEL,
              ease: 'linear',
            }}
          />
        );
      })}

      {/* Wezly zapalaja sie dokladnie wtedy, gdy dochodzi do nich fala. */}
      {NODES.map(([cx, cy, r], i) => (
        <motion.circle
          key={`n${i}`}
          cx={cx} cy={sy(cy)} r={r}
          className="hero-node"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.45,
            delay: START + progress(cy) * TRAVEL,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </motion.svg>
  );
}
