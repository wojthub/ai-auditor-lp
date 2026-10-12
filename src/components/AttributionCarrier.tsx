'use client';

import { useEffect } from 'react';
import { APP_URL } from '@/lib/appUrl';
import { captureAttribution, withAttribution } from '@/lib/attribution';

/**
 * Przenosi parametry kampanii (`fbclid`, UTM-y) z landinga do aplikacji - patrz `lib/attribution.ts`.
 *
 * Jeden nasluch na caly dokument, tak jak w `RegisterClickTracker`: linkow do aplikacji jest
 * ponad sto w kilkudziesieciu plikach i nowy przycisk dodany pozniej lapie sie sam. Adres
 * poprawiamy juz przy nacisnieciu (`pointerdown`), a nie dopiero na `click`, zeby objac takze
 * otwarcie w nowej karcie srodkowym przyciskiem i z menu kontekstowego. Formularz w hero nie
 * jest linkiem - dokleja parametry w `trackThenNavigate`.
 */
export default function AttributionCarrier() {
  useEffect(() => {
    captureAttribution();
    const decorate = (e: Event) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || !link.href.startsWith(APP_URL)) return;
      const next = withAttribution(link.href);
      if (next !== link.href) link.href = next;
    };
    // `keydown` obejmuje Enter na linku z fokusem, `click` - wywolania programowe.
    const events = ['pointerdown', 'keydown', 'click', 'auxclick', 'contextmenu'] as const;
    for (const name of events) document.addEventListener(name, decorate, true);
    return () => {
      for (const name of events) document.removeEventListener(name, decorate, true);
    };
  }, []);

  return null;
}
