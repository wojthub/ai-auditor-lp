// Dekoracyjna warstwa tla hero: wezly polaczone cienkimi liniami — nawiazanie do grafu
// wiedzy (encja-atrybut-wartosc), ktory audyt mierzy. Wspolna dla PL i EN.
//
// Wszystko jest czystym SVG + CSS (zero JS w runtime), wiec nie ma kosztu hydracji.
// Wezly siedza WYLACZNIE przy krawedziach — srodek (240-960 w ukladzie viewBox) zostaje
// pusty pod naglowek i formularz.

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

// Krawedzie, po ktorych biegnie impuls — po jednej z kazdej strony.
const PULSE_PATHS = [
  'M150,60 L90,170 L200,250 L70,330 L240,410',
  'M1090,70 L1130,165 L1020,250 L1150,355 L1010,435',
];

export default function HeroNodes() {
  return (
    <svg
      className="hero-nodes"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
    >
      {EDGES.map(([x1, y1, x2, y2], i) => (
        <line
          key={`e${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          className="hero-node-edge"
          style={{ animationDelay: `${i * 0.55}s` }}
        />
      ))}

      {PULSE_PATHS.map((d, i) => (
        <g key={`p${i}`}>
          <path d={d} className="hero-node-trace" style={{ animationDelay: `${i * 3.5}s` }} />
        </g>
      ))}

      {NODES.map(([cx, cy, r], i) => (
        <circle
          key={`n${i}`}
          cx={cx} cy={cy} r={r}
          className="hero-node"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
    </svg>
  );
}
