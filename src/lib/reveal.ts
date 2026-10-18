import type { CSSProperties } from 'react';

/**
 * Pojawianie sie sekcji przy przewijaniu - CSS zamiast framer-motion (od 2026-10-18).
 *
 * Element dostaje klase `reveal` i zmienne z tej funkcji, a `RevealObserver` w root layoucie
 * dokleja mu `is-visible`, gdy wjedzie w widok. Przejscie robi CSS z globals.css. Dzieki temu
 * sekcje bez wlasnego stanu sa komponentami serwerowymi i nie hydratuja sie na telefonie -
 * kazdy `motion.div` z `whileInView` to byl osobny komponent kliencki z wlasnym obserwatorem.
 *
 * Zwraca tylko zmienne rozne od domyslnych z CSS (y 20 px, 0,6 s, bez opoznienia, skala 1).
 */
export function revealStyle({
  y,
  duration,
  delay,
  scale,
}: { y?: number; duration?: number; delay?: number; scale?: number } = {}): CSSProperties {
  const vars: Record<string, string> = {};
  if (y !== undefined && y !== 20) vars['--reveal-y'] = `${y}px`;
  if (duration !== undefined && duration !== 0.6) vars['--reveal-duration'] = `${duration}s`;
  if (delay) vars['--reveal-delay'] = `${Math.round(delay * 1000)}ms`;
  if (scale !== undefined && scale !== 1) vars['--reveal-scale'] = String(scale);
  return vars as CSSProperties;
}
