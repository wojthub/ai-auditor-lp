'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SCORE_SETS = [
  [8, 7, 9, 6, 8, 7, 5, 8, 7],
  [5, 9, 6, 9, 5, 8, 8, 6, 9],
  [9, 6, 8, 5, 9, 6, 7, 9, 6],
  [7, 8, 5, 8, 7, 9, 9, 7, 8],
];

const LABELS = [
  {
    short: 'CSI',
    def: 'CSI Alignment - zgodność treści z centralnym zapytaniem wyszukiwania. Ocenia, czy artykuł odpowiada dokładnie na to, czego szuka użytkownik.',
  },
  {
    short: 'Gęstość',
    def: 'Gęstość informacji - stosunek konkretnych faktów i liczb do "puchu". Im więcej weryfikowalnych twierdzeń, tym wyższy wynik.',
  },
  {
    short: 'Graf',
    def: 'Graf wiedzy - kompletność struktury encja–atrybut–wartość (EAV). Mierzy, jak dokładnie artykuł opisuje kluczowe obiekty i ich cechy.',
  },
  {
    short: 'BLUF',
    def: 'Bottom Line Up Front - czy odpowiedź pojawia się w pierwszych zdaniach każdej sekcji. Systemy RAG preferują treści z odpowiedzią na początku.',
  },
  {
    short: 'Chunk',
    def: 'Chunk Optimization - autonomiczność sekcji. Każdy rozdział powinien być zrozumiały bez kontekstu reszty artykułu (optimum: 200–500 słów).',
  },
  {
    short: 'CoR',
    def: 'Cost of Retrieval - łatwość ekstrakcji informacji. Ocenia strukturę nagłówków, tabele, listy i pogrubienia ułatwiające AI pobieranie faktów.',
  },
  {
    short: 'TF-IDF',
    def: 'TF-IDF - nasycenie terminologią branżową. Porównuje słownictwo artykułu z top 10 SERP - im więcej specjalistycznych fraz, tym wyższy wynik.',
  },
  {
    short: 'SRL',
    def: 'Semantic Role Labels - perspektywa narracyjna. Mierzy, czy centralna encja (produkt/usługa) pełni rolę aktywnego podmiotu w zdaniach.',
  },
  {
    short: 'Fan-Out',
    def: 'Fan-Out i AI Overview - pokrycie sub-zapytań. Sprawdza, czy artykuł odpowiada na wszystkie pytania poboczne generowane przez AI wokół głównego tematu.',
  },
];

export default function RadarIllustration({ maxWidth = 220 }: { maxWidth?: number }) {
  const cx = 150, cy = 150, r = 96, axes = 9;
  const [scoreIdx, setScoreIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setScoreIdx(i => (i + 1) % SCORE_SETS.length), 2400);
    return () => clearInterval(id);
  }, []);

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / axes - Math.PI / 2;
    const dist = (value / 10) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const scores = SCORE_SETS[scoreIdx];
  const dataPoints = scores.map((s, i) => getPoint(i, s));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + 'Z';

  // Precompute label positions as % of 300×300 viewBox for tooltip placement
  const labelPositions = LABELS.map((_, i) => {
    const p = getPoint(i, 13);
    return { xPct: (p.x / 300) * 100, yPct: (p.y / 300) * 100 };
  });

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth }}>
      <svg viewBox="0 0 300 300" className="w-full">
        {/* Grid rings */}
        {[2, 4, 6, 8, 10].map((level) => {
          const pts = Array.from({ length: axes }, (_, i) => getPoint(i, level));
          return (
            <path key={level}
              d={pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + 'Z'}
              fill="none" stroke="#eceff3" strokeWidth="1" />
          );
        })}
        {/* Axis lines */}
        {Array.from({ length: axes }, (_, i) => {
          const p = getPoint(i, 10);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#eceff3" strokeWidth="1" />;
        })}
        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="rgba(11,121,131,0.08)"
          stroke="#0b7983"
          strokeWidth="1.5"
          animate={{ d: dataPath }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
        {/* Data points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i} r="3" fill="#0b7983"
            animate={{ cx: p.x, cy: p.y }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        ))}
        {/* Labels - styled like 78/100: dark, bold Inter */}
        {LABELS.map((label, i) => {
          const p = getPoint(i, 13);
          const isHovered = hoveredIdx === i;
          return (
            <text
              key={i}
              x={p.x} y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isHovered ? '#0b7983' : '#0d0d12'}
              fontSize="9.5"
              fontWeight="700"
              fontFamily="Inter,system-ui,sans-serif"
              style={{ cursor: 'default', transition: 'fill 0.15s' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {label.short}
            </text>
          );
        })}
      </svg>

      {/* Tooltip bubble */}
      {hoveredIdx !== null && (() => {
        const { xPct, yPct } = labelPositions[hoveredIdx];
        // Determine placement: show above if label is in bottom half, else below
        // Shift left if label is in right half, else shift right
        const isBottomHalf = yPct > 55;
        const isRightHalf = xPct > 60;
        const isLeftHalf = xPct < 40;

        const translateX = isRightHalf ? '-100%' : isLeftHalf ? '0%' : '-50%';
        const translateY = isBottomHalf ? 'calc(-100% - 6px)' : '8px';

        return (
          <div
            style={{
              position: 'absolute',
              left: `${xPct}%`,
              top: `${yPct}%`,
              transform: `translate(${translateX}, ${translateY})`,
              background: '#0b7983',
              color: '#ffffff',
              fontSize: 11,
              fontFamily: 'Inter,system-ui,sans-serif',
              lineHeight: 1.55,
              borderRadius: 7,
              padding: '8px 11px',
              width: 170,
              pointerEvents: 'none',
              zIndex: 20,
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            }}
          >
            {LABELS[hoveredIdx].def}
          </div>
        );
      })()}
    </div>
  );
}
