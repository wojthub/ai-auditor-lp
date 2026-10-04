/**
 * Zdarzenia landinga wysylane do GTM przez `dataLayer`. Tagi (GA4, Meta) podpina sie w GTM
 * pod nazwe zdarzenia - kod nie zna dostawcow.
 */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * Zdarzenie tuz przed przejsciem na inna domene. Przejscie czeka na `eventCallback` z GTM,
 * zeby tagi zdazyly wyjsc, zanim przegladarka porzuci strone. Gdy GTM sie nie zaladowal
 * (adblock, brak zgody na skrypt), callback nigdy nie przyjdzie - wtedy przechodzimy od razu,
 * a timeout pilnuje przypadku, w ktorym GTM jest, ale tag sie zawiesil.
 */
export function trackThenNavigate(event: string, params: Record<string, unknown>, href: string) {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    window.location.href = href;
  };
  const gtmLoaded = 'google_tag_manager' in window;
  trackEvent(event, gtmLoaded ? { ...params, eventCallback: go, eventTimeout: 800 } : params);
  if (gtmLoaded) setTimeout(go, 1000);
  else go();
}
