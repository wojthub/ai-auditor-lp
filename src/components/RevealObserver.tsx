'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Jeden obserwator dla wszystkich elementow `.reveal` na stronie - patrz `lib/reveal.ts`.
 *
 * Skanuje dokument po kazdej zmianie sciezki, bo nawigacja kliencka podmienia tresc bez
 * przeladowania. Element raz pokazany zostaje pokazany (jak `viewport={{ once: true }}`).
 * Margines -60 px od dolu: sekcja zaczyna wjezdzac, gdy jest juz troche nad krawedzia ekranu.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const show = (el: Element) => el.classList.add('is-visible');
    const pending = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      pending.forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
