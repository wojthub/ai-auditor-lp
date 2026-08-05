// Google Tag Manager dataLayer types
interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

interface Window {
  dataLayer?: DataLayerEvent[];
  // Meta Pixel
  fbq?: (...args: unknown[]) => void;
  _fbq?: unknown;
}
