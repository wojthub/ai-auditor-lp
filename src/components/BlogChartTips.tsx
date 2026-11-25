'use client';

import { useEffect, useRef } from 'react';

// Podpowiedz nad slupkiem/komorka wykresu z `src/lib/blogCharts.ts` (elementy `.bc-mark[data-tip]`).
// Jedna delegacja zdarzen na dokument: najechanie myszka, fokus z klawiatury i dotkniecie na telefonie.
// Bez tego komponentu wykres nadal dziala - wartosci sa podpisane na stale, podpowiedz to dodatek.

export default function BlogChartTips() {
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tip = tipRef.current;
    if (!tip) return;
    let active: Element | null = null;

    const show = (el: Element) => {
      const label = el.getAttribute('data-tip');
      if (!label) return;
      active?.classList.remove('is-active');
      active = el;
      el.classList.add('is-active');
      tip.textContent = label;
      tip.style.opacity = '1';
      const box = (el.querySelector('.bc-fill') ?? el).getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const x = Math.min(Math.max(8, box.left + box.width / 2 - tw / 2), window.innerWidth - tw - 8);
      const above = box.top - th - 10;
      const y = above > 8 ? above : box.bottom + 10;
      tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
    };
    const hide = () => {
      active?.classList.remove('is-active');
      active = null;
      tip.style.opacity = '0';
    };
    const markOf = (t: EventTarget | null) => (t instanceof Element ? t.closest('.bc-mark') : null);

    const onOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const m = markOf(e.target);
      if (m) show(m);
      else if (active) hide();
    };
    const onDown = (e: PointerEvent) => {
      const m = markOf(e.target);
      if (m && e.pointerType === 'touch') show(m);
      else if (!m) hide();
    };
    const onFocus = (e: FocusEvent) => {
      const m = markOf(e.target);
      if (m) show(m);
    };
    const onBlur = (e: FocusEvent) => {
      if (markOf(e.target)) hide();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };

    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('focusout', onBlur);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', hide, { passive: true });
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('focusout', onBlur);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', hide);
    };
  }, []);

  return <div ref={tipRef} className="bc-tip" role="status" aria-live="polite" />;
}
