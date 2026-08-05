// Google Tag Manager dataLayer types
interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

interface Window {
  dataLayer?: DataLayerEvent[];
}
