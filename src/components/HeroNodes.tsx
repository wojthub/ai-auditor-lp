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
  [1090, 70, 1130, 165],
  [1130, 165, 1020, 250],
  [1020, 250, 1150, 355],
  [1020, 250, 1010, 435],
  [1150, 355, 1010, 435],
];

const NODES: Array<[number, number, number]> = [
  [150, 60, 2.5],
  [90, 170, 3.5],
  [200, 250, 4.5],
  [70, 330, 3],
  [240, 410, 2.5],
  [1090, 70, 2.5],
  [1130, 165, 3],
  [1020, 250, 4.5],
  [1150, 355, 3.5],
  [1010, 435, 2.5],
];

// vbHeight splaszcza uklad pod nizsze naglowki podstron. Bez tego preserveAspectRatio="slice"
// przycina graf tak mocno, ze wieksza czesc chowa sie pod nawigacja.
// `tail` = kontynuacja tla w kolejnej sekcji: maska wygasza tylko dol, gora ma sie
// zlewac z hero, zeby przejscie miedzy sekcjami bylo niewidoczne.
export default function HeroNodes({ vbHeight = 520, height, tail }: { vbHeight?: number; height?: number; tail?: boolean }) {
  const sy = (y: number) => +(y * vbHeight / 520).toFixed(1);

  return (
    <motion.svg
      className={tail ? 'hero-nodes hero-nodes-tail' : 'hero-nodes'}
      style={height ? { height, bottom: 'auto' } : undefined}
      viewBox={`0 0 1200 ${vbHeight}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {EDGES.map(([x1, y1, x2, y2], i) => (
        <line
          key={`e${i}`}
          x1={x1} y1={sy(y1)} x2={x2} y2={sy(y2)}
          className="hero-node-edge"
        />
      ))}

      {NODES.map(([cx, cy, r], i) => (
        <circle
          key={`n${i}`}
          cx={cx} cy={sy(cy)} r={r}
          className="hero-node"
        />
      ))}
    </motion.svg>
  );
}
