import HeroNodes from './HeroNodes';

/**
 * Wspolne tlo dla hero i sekcji z mockupem.
 *
 * Wczesniej kazda z tych sekcji miala wlasna warstwe tla i linie grafu urywaly sie
 * na granicy miedzy nimi. Tutaj obie sekcje siedza w jednym kontenerze i dostaja
 * JEDNA siatke kropek oraz JEDEN graf rozciagniety na cale pasmo — przejscia nie widac.
 *
 * Gradient tla tez przeniesiony tutaj: `Hero` i `Showcase` musza miec przezroczyste
 * sekcje, inaczej ich wlasne tlo zasloni warstwe grafu.
 */
export default function HeroBand({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 52%, #f4f7f8 100%)',
    }}>
      {/* z-index jawnie: tlo pod trescia, bo mockup laptopa ma wlasny stacking context
          (perspective + drop-shadow) i bez tego linie potrafia przejsc PO ekranie. */}
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.14, zIndex: 0 }} aria-hidden />
      <HeroNodes vbHeight={900} band />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
