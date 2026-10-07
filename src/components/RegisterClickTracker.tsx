'use client';

import { useEffect } from 'react';
import { APP_URL } from '@/lib/appUrl';
import { trackEvent } from '@/lib/track';

const REGISTER_PREFIX = `${APP_URL}/register`;

/**
 * Jeden nasluch na caly dokument zamiast `onClick` na kazdym CTA: linkow do rejestracji jest
 * kilkadziesiat w kilkunastu plikach (navbar, sekcje, podstrony PL i EN), a nowy przycisk
 * dodany pozniej lapie sie sam. Formularz w hero nie jest linkiem - wysyla `register_click` sam, obok `hero_audit_submit`.
 */
export default function RegisterClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || !link.href.startsWith(REGISTER_PREFIX)) return;
      trackEvent('register_click', {
        link_text: link.textContent?.trim() ?? '',
        link_classes: link.className,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
