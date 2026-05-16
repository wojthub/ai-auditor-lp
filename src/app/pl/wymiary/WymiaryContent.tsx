'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };
}

const NUM_COLORS = ['#e07a4a', '#0b7983', '#c47a2a'];

const DIMS = [
  {
    num: '01',
    id: 'CSI Alignment',
    label: 'Zgodność z intencją',
    body: 'Czy treść odpowiada na to, czego naprawdę szuka użytkownik? AI nie cytuje stron, które mijają się z intencją zapytania - nawet jeśli zawierają słowo kluczowe. CSI Alignment mierzy, jak dokładnie Twój artykuł dopasowuje się do oczekiwanego typu odpowiedzi: definicji, porównania, instrukcji lub rekomendacji.',
  },
  {
    num: '02',
    id: 'D1',
    label: 'Gęstość informacji',
    body: 'Ile faktów, danych i konkretnych stwierdzeń zawiera jeden akapit. Treści o niskiej gęstości informacji są wypełniaczem - AI je pomija. Ten wymiar nagradza każde zdanie, które wnosi coś nowego, i karze tekst, który powtarza to samo innymi słowami.',
  },
  {
    num: '03',
    id: 'BLUF',
    label: 'BLUF (Odpowiedź na początku)',
    body: 'AI modele preferują treści, które podają główną odpowiedź w pierwszym akapicie. BLUF mierzy, jak szybko Twoja treść dochodzi do sedna.',
  },
  {
    num: '04',
    id: 'EAV',
    label: 'Graf wiedzy (EAV)',
    body: 'Treść buduje sieć powiązanych pojęć: podmiotów (Entity), atrybutów (Attribute) i wartości (Value). Im gęstszy i spójniejszy graf, tym łatwiej AI rozpoznaje treść jako wiarygodne źródło w danej domenie. Ten wymiar sprawdza, czy teksty tworzą wiedzę - a nie tylko ją wspominają.',
  },
  {
    num: '05',
    id: 'Chunki',
    label: 'Chunki informacyjne',
    body: 'AI "wycina" z treści samodzielne fragmenty - zdania lub akapity, które można zrozumieć bez kontekstu całego artykułu. Ten wymiar mierzy, ile takich gotowych do cytowania jednostek zawiera Twoja strona. Im więcej wyraźnych chunków, tym wyższe szanse na pojawienie się w AI Overview lub odpowiedzi asystenta.',
  },
  {
    num: '06',
    id: 'Ekstrakcja',
    label: 'Koszt ekstrakcji (Zwięzłość)',
    body: 'Ile wysiłku musi włożyć model, żeby wydobyć z Twojej treści konkretną odpowiedź. Długie zdania, nadmiarowe wstępy i zbędne zastrzeżenia podnoszą koszt ekstrakcji. Niski wynik w tym wymiarze oznacza, że AI wybierze konkurenta, który napisał to samo krócej.',
  },
  {
    num: '07',
    id: 'Information Gain',
    label: 'Information Gain (Unikalność)',
    body: 'Czy Twoja treść wnosi coś, czego nie ma na pozostałych 10 stronach w top10? Information Gain mierzy różnicę między tym, co piszesz, a tym, co jest już ogólnie dostępne. Ten wskaźnik jest podnoszony przez unikalne dane, własne obserwacje i nieoczywiste wnioski.',
  },
  {
    num: '08',
    id: 'Query Fan-out',
    label: 'Pokrycie AI Overview (Query Fan-out)',
    body: 'Jedno zapytanie użytkownika generuje dziesiątki powiązanych pytań, które AI rozwiązuje w tle. Ten wymiar sprawdza, ile z tych pytań satelitarnych odpowiada dana treść. Szersze pokrycie tematu = wyższe prawdopodobieństwo, że fragment Twojej strony pojawi się w syntetycznej odpowiedzi.',
  },
  {
    num: '09',
    id: 'SRL',
    label: 'Logika ról semantycznych (SRL)',
    body: 'Logika ról semantycznych ocenia, czy treść ma wyraźną strukturę: podmiot, działanie, efekt. Im precyzyjniejszy język, tym łatwiej modelowi wyciąć i zacytować dokładnie ten fragment, który pasuje do odpowiedzi.',
  },
  {
    num: '10',
    id: 'TF-IDF',
    label: 'TF-IDF (Benchmark SERP)',
    body: 'Klasyczny wskaźnik statystyczny porównujący częstotliwość słów w tekście do norm dla danego zapytania w top10 SERP. Zbyt niski wynik - temat potraktowany powierzchownie. Zbyt wysoki - sygnał upychania słów kluczowych. CitationOne wskazuje dokładnie, które terminy są niedoreprezentowane względem konkurencji.',
  },
];

const EEAT = [
  { letter: 'E', label: 'Experience', desc: 'Czy tekst zawiera dowody praktycznego obcowania z tematem?' },
  { letter: 'E', label: 'Expertise', desc: 'Jak głęboka jest analiza merytoryczna?' },
  { letter: 'A', label: 'Authoritativeness', desc: 'Czy Twoja marka jest rozpoznawalnym źródłem w niszy?' },
  { letter: 'T', label: 'Trustworthiness', desc: 'Czy dane i źródła są podane transparentnie?' },
];

export default function WymiaryContent() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>10 wymiarów</span>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
            </div>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 22,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              10 Wymiarów Jakości Treści
            </h1>
            <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.7, maxWidth: 680, margin: '0 auto 36px' }}>
              Modele językowe LLM (jak te napędzające ChatGPT czy Google AI Overview) nie czytają tekstów w sposób tradycyjny. Korzystają z algorytmów do matematycznej oceny przydatności i wiarygodności treści. CitationOne przekłada te procesy na 10 mierzalnych wymiarów, które składają się na Twój Content Quality Score (CQS).
            </p>

            {/* CQS box */}
            <div style={{
              background: '#f8fafb',
              border: '1px solid #dfe1e7',
              borderRadius: 12,
              padding: '28px 32px',
              textAlign: 'left',
              maxWidth: 640,
              margin: '0 auto',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 16, height: 2, background: ACCENT, borderRadius: 1 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Czym jest CQS?</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                Content Quality Score
              </h3>
              <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.7, margin: 0 }}>
                CQS to wskaźnik w skali 0-100, który określa, jak dobrze Twój content wypada na tle top 10 wyników z wyszukiwarki pod kątem parametrów istotnych dla AI Search. Każdy z 10 wymiarów ma przypisaną wagę, co pozwala na precyzyjną ocenę Twojej szansy na cytowanie.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIMS LIST */}
      <section style={{ background: '#f8fafb', padding: '90px 0' }}>
        <div style={{ maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Wymiary</span>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 700,
              color: '#0d0d12',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: 0,
            }}>
              Co dokładnie mierzy algorytm?
            </h2>
          </motion.div>

          <div className="dims-list-grid">
            {DIMS.map((dim, i) => (
              <motion.div
                key={dim.id}
                {...fadeUp(i * 0.03)}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dfe1e7',
                  borderRadius: 10,
                  padding: '26px 24px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  color: NUM_COLORS[i % 3],
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 18,
                }}>
                  {dim.num}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: 0 }}>
                    {dim.label}
                  </h3>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    {dim.id}
                  </span>
                </div>
                <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>{dim.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* E-E-A-T */}
      <section style={{ background: '#ffffff', padding: '90px 0' }}>
        <div style={{ maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fundament wiarygodności</span>
              <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 1 }} />
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 700,
              color: '#0d0d12',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 14px',
            }}>
              E-E-A-T
            </h2>
            <p style={{ fontSize: 16, color: '#36394a', lineHeight: 1.72, maxWidth: 560, margin: 0 }}>
              Algorytmy AI premiują sygnały autentyczności. CitationOne mierzy cztery z nich:
            </p>
          </motion.div>

          <div className="eeat-grid">
            {EEAT.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.08)}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dfe1e7',
                  borderRadius: 10,
                  padding: '26px 22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                  fontWeight: 800,
                  color: NUM_COLORS[i % 3],
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 18,
                }}>
                  {item.letter}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                  {item.label}
                </h3>
                <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#ffffff', padding: '90px 0', borderTop: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
          <motion.div {...fadeUp()}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 10,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              Pozyskaj ruch z AI Search.
            </h2>
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', fontWeight: 500, color: '#36394a', letterSpacing: '-0.01em', lineHeight: 1.4, margin: '0 0 32px' }}>
              Sprawdź swoje teksty już teraz - pierwsze 3 audyty za darmo.
            </p>
            <motion.a
              href={`${APP_URL}/login?lang=pl`}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 36px', borderRadius: 8,
                background: '#0b7983',
                color: '#ffffff', fontWeight: 700, fontSize: 15,
                textDecoration: 'none', letterSpacing: '-0.01em',
                boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
              }}
            >
              Zrób audyt
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <style>{`
        .dims-list-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .eeat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 860px) {
          .dims-list-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .eeat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .eeat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
