'use client';

import { useEffect, useState } from 'react';

// Efekt maszyny do pisania dla placeholdera inputa w hero (PL + EN).
// Pisze kolejny przyklad, przytrzymuje go, kasuje TYLKO do wspolnego prefiksu
// z nastepnym przykladem i pisze dalej — dzieki temu placeholder nigdy nie robi
// sie pusty i nie miga miedzy tekstem zachety a przykladem.
//
// Zwraca pusty string dopoki animacja sie nie zacznie, przy `prefers-reduced-motion: reduce`
// oraz gdy `enabled === false` (uzytkownik zaczal pisac) — komponent pokazuje wtedy
// statyczny placeholder. Pusty string na starcie chroni tez przed rozjazdem hydracji.

const TYPE_MS = 55;      // pisanie jednego znaku
const ERASE_MS = 28;     // kasowanie jednego znaku
const HOLD_MS = 2200;    // pauza na przeczytanie gotowego przykladu
const START_MS = 1400;   // opoznienie, zeby statyczny placeholder dalo sie przeczytac

function sharedPrefixLength(a: string, b: string) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

export function useTypewriterPlaceholder(examples: string[], enabled = true) {
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'typing' | 'holding' | 'erasing'>('idle');

  useEffect(() => {
    if (!enabled || examples.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const current = examples[idx];
    const next = examples[(idx + 1) % examples.length];
    // Podloga kasowania: wspolny poczatek obu adresow (np. "twojastrona.pl/").
    const floor = Math.max(1, sharedPrefixLength(current, next));

    let delay: number;
    let step: () => void;

    if (phase === 'idle') {
      delay = START_MS;
      step = () => setPhase('typing');
    } else if (phase === 'typing') {
      if (len >= current.length) {
        delay = HOLD_MS;
        step = () => setPhase('holding');
      } else {
        delay = TYPE_MS;
        step = () => setLen(l => l + 1);
      }
    } else if (phase === 'holding') {
      delay = 0;
      step = () => setPhase('erasing');
    } else {
      if (len <= floor) {
        delay = ERASE_MS;
        step = () => { setIdx(i => (i + 1) % examples.length); setPhase('typing'); };
      } else {
        delay = ERASE_MS;
        step = () => setLen(l => l - 1);
      }
    }

    const id = setTimeout(step, delay);
    return () => clearTimeout(id);
  }, [examples, enabled, idx, len, phase]);

  if (!enabled || phase === 'idle') return '';
  return examples[idx].slice(0, len);
}
