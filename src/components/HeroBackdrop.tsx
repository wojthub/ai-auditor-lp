import HeroNodes from './HeroNodes';

// Tlo naglowka podstrony: siatka kropek + graf wezlow (ten sam, co na stronie glownej).
//
// Warstwa ma stala wysokosc zamiast `inset: 0`, bo czesc podstron (cennik, API) to jedna
// sekcja obejmujaca cala strone — rozciagniecie tla na jej wysokosc rozdmuchaloby graf
// przez preserveAspectRatio="slice".
//
// Sekcja, w ktorej to osadzasz, musi miec `position: relative` i `overflow: hidden`,
// a jej kontener tresci `position: relative` — inaczej tresc wyladuje POD tlem.
export default function HeroBackdrop({ height = 340 }: { height?: number }) {
  return (
    <>
      <div
        aria-hidden
        className="dot-grid"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height, opacity: 0.14 }}
      />
      <HeroNodes vbHeight={height} height={height} />
    </>
  );
}
