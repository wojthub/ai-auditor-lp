'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Napis "CitatioNone?" -> "CitationOne" w sekcji Problem (PL i EN - ten sam napis).
 * Wydzielony z `Problem`/`ProblemEN`, zeby reszta sekcji byla komponentem serwerowym
 * i nie hydratowala sie na telefonie (od 2026-10-18).
 */
const STAGES = [
  { none: true },
  { none: false },
];
const PAUSES = [1800, 3000];

export default function WordCycle() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % STAGES.length), PAUSES[idx]);
    return () => clearTimeout(t);
  }, [idx]);

  const stage = STAGES[idx];

  return (
    <div style={{
      position: 'relative',
      height: '1.15em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {stage.none ? (
            <>
              <span style={{ color: '#0d0d12' }}>Citatio</span>
              <span style={{ color: '#a4acb9' }}>None?</span>
            </>
          ) : (
            <span style={{
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              CitationOne
            </span>
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
