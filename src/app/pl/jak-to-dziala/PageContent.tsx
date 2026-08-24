'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroBackdrop from '@/components/HeroBackdrop';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';
// Kolory numerow kafelkow — te same co na hubie wymiarow (WymiaryContent / DimensionsContent).
const NUM_COLORS = ['#e07a4a', '#0b7983', '#c47a2a'];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{children}</span>
      <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
    </div>
  );
}

/* ── Visual: Benchmark SERP ───────────────────────────────────────────── */
// Panel Top 10 SERP z aplikacji w wersji na LP — te same kolumny i ten sam sposob
// kolorowania wynikow, zeby user rozpoznal ekran, ktory zobaczy po zakupie.
// Domeny neutralne: nie pokazujemy realnych klientow ani realnej konkurencji.
const SERP_HEAD = { phrase: 'ranking słuchawek bezprzewodowych' };
const SERP_LABELS = ['POZ.', 'URL', 'SŁOWA', 'CQS', 'CIT.'];
const SERP_STATS = [
  { value: '47', label: 'Śr. CQS SERP' },
  { value: '4.7', label: 'Śr. Citability' },
  { value: '2091', label: 'Śr. słów' },
];
const SERP_ROWS = [
  { pos: '1', url: 'konkurent-a.pl/ranking-sluchawek', words: '2708', cqs: 73, cit: 7.1 },
  { pos: '2', url: 'konkurent-b.pl/sluchawki-douszne', words: '3792', cqs: 69, cit: 6.7 },
  { pos: '4', url: 'konkurent-c.pl/kategoria/audio', words: '283', cqs: 19, cit: 2.2 },
  { pos: '6', url: 'konkurent-d.pl/porady/sluchawki', words: '3029', cqs: 70, cit: 6.8 },
  { pos: '★', url: 'twojastrona.pl/blog/ranking-2026', words: '5634', cqs: 70, cit: 6.8, mine: true },
];
function BenchmarkVisual() {
  // Progi kolorow 1:1 z raportem: ponizej 60 CQS / 6.0 CIT czerwony, wyzej bursztyn.
  const pill = (ok: boolean) => ({
    fontSize: 11.5, fontWeight: 700, borderRadius: 5, padding: '2px 8px', justifySelf: 'end',
    color: ok ? '#CA8A04' : '#DC2626',
    background: ok ? 'rgba(202,138,4,0.10)' : 'rgba(220,38,38,0.10)',
  });
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '18px 18px 10px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0d0d12' }}>Top 10 SERP</span>
        <span style={{ fontSize: 12, color: '#818898' }}>dla frazy &bdquo;{SERP_HEAD.phrase}&rdquo;</span>
      </div>

      <div style={{ display: 'flex', gap: 22, marginBottom: 18, flexWrap: 'wrap' }}>
        {SERP_STATS.map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0d0d12', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#818898', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '26px 1fr 46px 40px 36px', gap: 8, paddingBottom: 8, borderBottom: '1px solid #eceff3' }}>
        {SERP_LABELS.map((h, i) => (
          <span key={h} style={{ fontSize: 10, fontWeight: 600, color: '#a4acb9', letterSpacing: '0.06em', textAlign: i > 1 ? 'right' : 'left' }}>{h}</span>
        ))}
      </div>

      {SERP_ROWS.map((row, i) => (
        <motion.div
          key={row.url}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
          style={{
            display: 'grid', gridTemplateColumns: '26px 1fr 46px 40px 36px', gap: 8,
            alignItems: 'center', padding: '9px 0',
            borderBottom: i === SERP_ROWS.length - 1 ? 'none' : '1px solid #f4f6f8',
            background: row.mine ? 'rgba(11,121,131,0.05)' : 'transparent',
            borderTop: row.mine ? '1px solid rgba(11,121,131,0.25)' : undefined,
          }}
        >
          <span style={{ fontSize: 12, color: row.mine ? ACCENT : '#a4acb9', fontWeight: row.mine ? 700 : 400 }}>{row.pos}</span>
          <span style={{
            fontSize: 12, color: row.mine ? ACCENT : '#36394a', fontWeight: row.mine ? 600 : 400,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{row.url}</span>
          <span style={{ fontSize: 11.5, color: '#818898', textAlign: 'right' }}>{row.words}</span>
          <span style={pill(row.cqs >= 60)}>{row.cqs}</span>
          <span style={pill(row.cit >= 6)}>{row.cit}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Visual: Przed i Po ─────────────────────────────────────────────── */
function BeforeAfterVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: 'rgba(185,28,28,0.04)', border: '1px solid #dfe1e7', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#B91C1C', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>Przed</span>
          <p style={{ fontSize: 12.5, color: '#818898', lineHeight: 1.6, margin: 0, textDecoration: 'line-through' }}>
            Optymalizacja pod AI jest ważna, ponieważ modele językowe dobierają treści według własnych kryteriów.
          </p>
        </div>
        <div style={{ background: 'rgba(21,128,61,0.04)', border: '1px solid #dfe1e7', borderRadius: 8, padding: '16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>Po</span>
          <p style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: ACCENT }}>CitationOne</strong> mierzy <Link href="/pl/wymiary" style={{ color: ACCENT, textDecoration: 'underline', textUnderlineOffset: 2 }}>10 wymiarów cytowania przez AI</Link> - z szacowanym wpływem każdego na CQS i konkretną poprawką do wklejenia.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { label: 'KRYTYCZNY', color: '#DC2626', bg: 'rgba(220,38,38,0.1)', border: 'rgba(220,38,38,0.3)' },
          { label: 'WYSOKI', color: '#CA8A04', bg: 'rgba(202,138,4,0.1)', border: 'rgba(202,138,4,0.3)' },
          { label: 'ŚREDNI', color: '#16A34A', bg: 'rgba(22,163,74,0.1)', border: 'rgba(22,163,74,0.3)' },
        ].map(p => (
          <span key={p.label} style={{ fontSize: 10, fontWeight: 700, color: p.color, background: p.bg, border: `1px solid ${p.border}`, borderRadius: 4, padding: '4px 10px', letterSpacing: '0.06em' }}>{p.label}</span>
        ))}
        <span style={{ fontSize: 11.5, color: '#a4acb9' }}>priorytet + szacowany wpływ na CQS per rekomendacja</span>
      </div>
    </div>
  );
}

/* ── Visual: AI Overview ──────────────────────────────────────────────── */
const AIO_ITEMS = [
  { q: 'co to jest audyt AI Search', covered: true },
  { q: 'jak działa AI Overview Google', covered: true },
  { q: 'jakie metryki mierzy audyt AI', covered: false },
  { q: 'różnica SEO vs AI Search', covered: false },
  { q: 'jak poprawić citability score', covered: true },
];
function AIOverviewVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src="/logos/google.png"
          alt=""
          aria-hidden
          width={18}
          height={18}
          style={{ width: 18, height: 18, display: 'block', flexShrink: 0 }}
        />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#0d0d12' }}>AI Overview - dekompozycja syntezy</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, padding: '2px 7px' }}>3/5</span>
          <span style={{ fontSize: 10, color: '#a4acb9' }}>pokrytych</span>
        </div>
      </div>
      <div style={{ padding: '8px 0' }}>
        {AIO_ITEMS.map((sq) => (
          <div key={sq.q} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: sq.covered ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.07)', border: `1px solid ${sq.covered ? 'rgba(22,163,74,0.25)' : 'rgba(220,38,38,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {sq.covered
                ? <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" /></svg>
              }
            </div>
            <span style={{ fontSize: 12, color: sq.covered ? '#36394a' : '#a4acb9', lineHeight: 1.4 }}>{sq.q}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: sq.covered ? '#16A34A' : '#DC2626', background: sq.covered ? 'rgba(22,163,74,0.07)' : 'rgba(220,38,38,0.07)', borderRadius: 4, padding: '2px 7px', flexShrink: 0 }}>
              {sq.covered ? 'pokryte' : 'luka'}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 18px', borderTop: '1px solid #eceff3', background: '#f8fafb' }}>
        <p style={{ fontSize: 11, color: '#818898', margin: 0 }}>2 luki - raport wskazuje co napisać, żeby pokryć brakujące sub-zapytania</p>
      </div>
    </div>
  );
}

/* ── Visual: Knowledge Graph ─────────────────────────────────────────── */
const EAV_ENTITIES = [
  { entity: 'AI Search', attr: 'algorytm', value: 'modele językowe', type: 'Podstawa' },
  { entity: 'BLUF', attr: 'definicja', value: 'Bottom Line Up Front', type: 'Wyróżnik' },
  { entity: 'ChatGPT', attr: 'typ', value: 'model językowy', type: 'Podstawa' },
  { entity: 'CQS', attr: 'zakres', value: '0–100', type: 'Wyróżnik' },
  { entity: 'Google AIO', attr: 'źródło', value: 'grounding w SERP', type: 'Rzadki' },
];
const TYPE_STYLES: Record<string, { color: string; bg: string }> = {
  'Wyróżnik': { color: ACCENT, bg: 'rgba(11,121,131,0.08)' },
  'Podstawa': { color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
  'Rzadki': { color: '#ca8a04', bg: 'rgba(202,138,4,0.08)' },
};
function KnowledgeGraphVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #dfe1e7', display: 'flex', gap: 8 }}>
        {Object.entries(TYPE_STYLES).map(([type, s]) => (
          <span key={type} style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.05em' }}>{type}</span>
        ))}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ background: '#f8fafb' }}>
            {['Encja', 'Atrybut', 'Wartość', 'Typ'].map(h => (
              <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {EAV_ENTITIES.map((e, i) => {
            const s = TYPE_STYLES[e.type];
            return (
              <tr key={i} style={{ borderTop: '1px solid #eceff3' }}>
                <td style={{ padding: '9px 14px', color: '#0d0d12', fontWeight: 500 }}>{e.entity}</td>
                <td style={{ padding: '9px 14px', color: '#818898' }}>{e.attr}</td>
                <td style={{ padding: '9px 14px', color: '#36394a' }}>{e.value}</td>
                <td style={{ padding: '9px 14px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 4, padding: '2px 7px' }}>{e.type}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Visual: Export ───────────────────────────────────────────────────── */
const REPORT_ITEMS = [
  'Content Quality Score (0–100) z rozbiciem na wymiary',
  'AI Citability Score (0–10)',
  'Wykres radarowy 10 wymiarów',
  'Analiza konkurencji - tabela porównawcza Top 10 SERP',
  'Rekomendacje Przed i Po z priorytetami',
  'Graf wiedzy i tabela encji EAV',
  'AI Overview Coverage i analiza sub-zapytań',
  'Podsumowanie wykonawcze gotowe do wysyłki',
];
function ExportVisual() {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 40, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: 0 }}>Raport AI Search Audit</p>
          <p style={{ fontSize: 11, color: '#a4acb9', margin: 0 }}>example-article.com · słowo kluczowe: audyt SEO</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['PDF', 'MD'].map(fmt => (
            <span key={fmt} style={{ fontSize: 10, fontWeight: 700, color: ACCENT, background: 'rgba(11,121,131,0.08)', border: '1px solid rgba(11,121,131,0.2)', borderRadius: 4, padding: '3px 8px' }}>{fmt}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '8px 0' }}>
        {REPORT_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 20px' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="7" cy="7" r="7" fill="rgba(11,121,131,0.1)" />
              <path d="M4 7l2 2 4-4" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 12.5, color: '#36394a', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Dimensions data ──────────────────────────────────────────────────── */
const DIMS = [
  {
    num: '01', id: 'CSI Alignment', slug: 'zgodnosc-z-csi', label: 'Zgodność z CSI',
    medium: 'Sprawdza czy artykuł odpowiada na dokładnie to pytanie, które zadał użytkownik - nie podobne, lecz dokładnie to.',
    expert: 'Walidacja Central Entity, Search Context, Predicate. BLUF check w lead, EAV coverage, chunk validation per H2 (200-500 słów, autonomia, CE min 2×). W trybie Full: gap analysis P1-P4 vs benchmark SERP.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></svg>,
  },
  {
    num: '02', id: 'Density', slug: 'gestosc-informacji', label: 'Gęstość informacji',
    medium: 'Mierzy ile faktów jest w artykule. Ogólniki i puste zdania zaniżają wynik - konkretne dane i liczby go podnoszą.',
    expert: 'Score = (zdania_faktyczne / wszystkie) × 10. Kary: słowa modalne (-0.5), puste frazy (-1.0), przymiotniki ocenne. Bonusy: konkretne liczby (+1.0), encje (+0.5), wartości EAV (+1.0).',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 10h14M3 14h10M3 18h7" /></svg>,
  },
  {
    num: '03', id: 'EAV', slug: 'graf-wiedzy', label: 'Graf wiedzy',
    medium: 'AI widzi artykuł jako sieć faktów: Encja - Atrybut - Wartość. Im kompletniejsza sieć, tym większa szansa na cytowanie.',
    expert: 'Ekstrakcja trójek Entity-Attribute-Value. W trybie Full: algorytmiczna klasyfikacja URR (UNIQUE poniżej 30% / ROOT powyżej 70% / RARE 30-69%) na podstawie eavMatrix z benchmarku SERP.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v3M12 10l-5 7M12 10l5 7" /></svg>,
  },
  {
    num: '04', id: 'BLUF', slug: 'bluf', label: 'BLUF',
    medium: 'Modele AI faworyzują artykuły, które podają odpowiedź na początku każdej sekcji. Nie na końcu, nie po wstępie - na samym początku.',
    expert: 'Bottom Line Up Front: odpowiedź w pierwszych 50 słowach każdej H2. Struktura: Odpowiedź - Dowód - Kontekst. Chunki z BLUF cytowane ~62% jako główne źródło w badaniach RAG.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h10M4 14h12M4 18h7" /><path d="M20 14v6M17 17l3-3 3 3" /></svg>,
  },
  {
    num: '05', id: 'Chunk', slug: 'optymalizacja-chunkow', label: 'Optymalizacja chunków',
    medium: 'Systemy AI dzielą artykuły na kawałki przed analizą. Każdy kawałek powinien mieć sens bez czytania całości - być autonomiczny.',
    expert: 'Autonomiczność sekcji dla RAG (Retrieval-Augmented Generation). Optymalna długość 200-500 słów per H2. Kryteria: brak zaimków odsyłających, CE min 2× per sekcja, brak "jak wspomniano wyżej".',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>,
  },
  {
    num: '06', id: 'CoR', slug: 'koszt-pozyskania', label: 'Koszt pozyskania',
    medium: 'Im trudniej AI znaleźć informację w tekście, tym mniejsza szansa na cytowanie. Nagłówki, listy i tabele zmniejszają ten koszt.',
    expert: 'System punktowy (max 10): hierarchia H1-H2-H3 (+2), tabele (+2), listy (+1), pogrubienia kluczowych faktów (+1), TL;DR (+1), brak ścian tekstu powyżej 300 słów (+1), brak ogólnikowych wstępów (+1).',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7a4 4 0 010-8h2M15 7h2a4 4 0 010 8h-2M9 12h6" /></svg>,
  },
  {
    num: '07', id: 'TF-IDF', slug: 'tf-idf', label: 'TF-IDF',
    medium: 'Sprawdza czy artykuł używa terminologii branżowej. Brak specjalistycznych pojęć sygnalizuje AI: "ten autor nie zna tematu głęboko".',
    expert: 'Score = (high_idf_terms_present / oczekiwane) × 10. HIGH IDF: terminy specjalistyczne, wielowyrazowe frazy branżowe. W trybie Full: realne dane z korpusu 10 konkurentów SERP (computeTermStats).',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35M8 11h6M8 8h4" /></svg>,
  },
  {
    num: '08', id: 'SRL', slug: 'role-semantyczne', label: 'Role semantyczne',
    medium: 'AI lepiej przyswaja wiedzę, gdy temat artykułu jest aktywnym bohaterem zdań - nie pasywnym obiektem opisywanym przez innych.',
    expert: 'SRL: Central Entity jako Agent (podmiot aktywny) w ponad 70% zdań. Score = (ΣAgent×1.0 + ΣPatient×0.5) / max. Transformacje CE Patient - CE Agent w rekomendacjach.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>,
  },
  {
    num: '09', id: 'Fan-Out', slug: 'pokrycie-fan-out', label: 'Pokrycie Fan-Out i AIO',
    medium: 'Każde zapytanie to de facto kilka pod-pytań naraz. Sprawdzamy ile z nich obsługuje artykuł - bo AI używa właśnie tych pod-pytań do syntezy.',
    expert: 'Dekompozycja CSI na 5-10 sub-queries (semantic/intent/verification). Tryb Full: grounding wobec PAA/Related Searches - tagi CONFIRMED/OVERVIEW/PREDICTED/SERP-ONLY. Malus -1 za niepokryte SERP-ONLY.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v4M8 12l-4 4M16 12l4 4M12 8l-4 4h8l-4-4" /></svg>,
  },
  {
    num: '10', id: 'Effort', slug: 'effort-score', label: 'Effort Score',
    medium: 'Mierzy widoczny wysiłek redakcyjny: długość artykułu, zdjęcia, wideo, tabele i schema FAQ. Modele AI preferują treści dopracowane - nie pisane na szybko.',
    expert: 'Deterministyczny scoring na podstawie htmlMetrics z crawlera: wordCount (próg ≥1500), imageCount, videoCount, hasFaqSchema, hasTableOfContents. Brak wywołania Gemini - metryki algorytmiczne z analizy struktury. Waga 0.06 w CQS.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 4-8" /></svg>,
  },
  {
    num: '', id: 'E-E-A-T', slug: 'e-e-a-t', label: 'E-E-A-T',
    medium: 'Google i modele AI ufają treściom stojącym za prawdziwym ekspertem z doświadczeniem. Raport mierzy konkretne sygnały tego zaufania.',
    expert: 'Experience: personal story, case study, screenshots. Expertise: cytaty z badań, terminologia (+2). Authority: bio autora z kwalifikacjami (+3), afiliacja instytucjonalna (+2). Trust: disclaimer, data aktualizacji, kontakt do autora.',
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  },
];

/* ── Main page ────────────────────────────────────────────────────────── */
export default function PageContent() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #eceff3', position: 'relative', overflow: 'hidden' }}>
        <HeroBackdrop />
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Jak to działa?</span>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            </div>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.85vw, 3.9rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 22,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              Poznaj mechanizm, który otwiera drzwi do AI Search
            </h1>
            <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 36px' }}>
              Zobacz, jak w mniej niż 5 minut CitationOne prześwietla Twój tekst i zamienia skomplikowaną analizę algorytmiczną w proste wytyczne dla redakcji. Bez skomplikowanej integracji, bez zmian w kodzie Twojej strony.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { text: 'Pełny raport w ~5 minut' },
                { text: '10 wymiarów + E-E-A-T' },
                { text: 'Analiza konkurencji' },
                { text: 'Przed i Po z gotowymi poprawkami' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 8, fontSize: 13, color: '#36394a' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 KROKI */}
      <section style={{ background: '#f8fafb', padding: '90px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>3 kroki</span>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', margin: 0 }}>
              Od wklejenia tekstu do gotowych wytycznych w 5 minut
            </h2>
          </motion.div>
          <div className="steps-grid">
            {[
              {
                n: '01', color: '#e07a4a',
                title: 'Wprowadzasz dane',
                body: 'Podajesz link do opublikowanego już artykułu lub wklejasz roboczą wersję tekstu, którą dopiero planujesz dodać na stronę. Wpisujesz słowo kluczowe, na które chcesz zdobyć cytowanie w AI Search.',
              },
              {
                n: '02', color: '#0b7983',
                title: 'Algorytm analizuje konkurencję z Top 10 SERP',
                body: 'W mniej niż 5 minut system CitationOne pobiera i analizuje Twoją treść. W tym samym czasie bada 10 najlepiej rankujących stron konkurencji. Narzędzie porównuje Twój materiał z liderami rynku pod kątem 10 wymiarów jakości oraz sygnałów E-E-A-T.',
              },
              {
                n: '03', color: '#c47a2a',
                title: 'Odbierasz gotową listę rekomendacji Przed i Po',
                body: 'System generuje kompletny raport. Nie dostajesz ogólnych porad, ale precyzyjny plan działania. Narzędzie wskazuje konkretne akapity do poprawy i podaje gotowe wytyczne strukturalne dla Twoich redaktorów.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                {...fadeUp(i * 0.13)}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  color: step.color,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 20,
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0d0d12', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: 10 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: '#36394a', lineHeight: 1.65, margin: 0 }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 WYMIARÓW */}
      <section style={{ background: '#ffffff', padding: '90px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>10 wymiarów + E-E-A-T</span>
              <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Co dokładnie analizuje narzędzie?
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
              Każdy wymiar to osobne wywołanie AI z dedykowanym promptem - osobny wynik 0-10, osobne problemy i osobne rekomendacje.
            </p>
          </motion.div>
          <div className="dims-grid">
            {DIMS.map((dim, i) => (
              <motion.a
                key={dim.id}
                href={`/pl/wymiary/${dim.slug}`}
                {...fadeUp(i * 0.04)}
                whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.07)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                style={{
                  background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10,
                  padding: '22px 22px 20px', display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start', textDecoration: 'none',
                }}
              >
                {dim.num && (
                  <div style={{
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: NUM_COLORS[i % 3],
                    letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 18,
                  }}>
                    {dim.num}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: 0 }}>{dim.label}</h3>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#a4acb9', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{dim.id}</span>
                </div>
                <p style={{ fontSize: 13.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 14px' }}>{dim.medium}</p>
                <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginTop: 'auto' }}>Jak to liczymy →</span>
              </motion.a>
            ))}
          </div>

          {/* Wejscie do podstron wymiarow — po usunieciu „Wymiary" z gornej nawigacji to
              glowna sciezka do nich z tresci. */}
          <motion.div {...fadeUp(0.1)} style={{ textAlign: 'center', marginTop: 36 }}>
            <a
              href="/pl/wymiary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 15, fontWeight: 600, color: '#0b7983', textDecoration: 'none',
                border: '1px solid #dfe1e7', borderRadius: 8, padding: '12px 24px', minHeight: 44,
              }}
            >
              Poznaj wszystkie wymiary - definicje i sposób liczenia
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* BENCHMARK SERP */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Analiza konkurencji</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Zobacz, czy i dlaczego odstajesz od liderów
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                CitationOne automatycznie pobiera i analizuje 10 najlepiej rankujących podstron dla wybranego słowa kluczowego. Zestawiamy Twoją treść z realną konkurencją, aby precyzyjnie wskazać lukę optymalizacyjną.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Porównanie tabelaryczne CQS dla każdej analizowanej podstrony.', 'Identyfikacja liderów oraz słabych punktów w aktualnym SERP', 'Analiza struktury i formatu najlepiej ocenianych treści.'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#36394a', lineHeight: 1.65 }}>
                    <span style={{ width: 14, height: 2, background: ACCENT, flexShrink: 0, marginTop: 9, borderRadius: 1 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}><BenchmarkVisual /></motion.div>
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 40 }}>
            <SectionLabel>Rekomendacje Przed i Po</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Konkretne rekomendacje z mierzalnym wpływem na CQS
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 600, lineHeight: 1.65, margin: '0 0 4px' }}>
              Zapomnij o ogólnych wskazówkach. CitationOne wskazuje precyzyjne fragmenty treści wymagające optymalizacji i dostarcza gotowe wersje „Przed i Po". Widzisz szacowany wzrost wyniku dla każdej zmiany, dzięki czemu wdrażasz tylko te poprawki, które najskuteczniej budują Twój autorytet w AI Search.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}><BeforeAfterVisual /></motion.div>
        </div>
      </section>

      {/* AI OVERVIEW COVERAGE */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid feat-grid-reverse">
            <motion.div {...fadeUp(0.1)}><AIOverviewVisual /></motion.div>
            <motion.div {...fadeUp()}>
              <SectionLabel>AI Overview Coverage</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Google AI Overview to synteza wielu pod-pytań
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                AI Overview nie cytuje jednego artykułu - syntetyzuje odpowiedzi na kilkanaście powiązanych pod-pytań naraz. Narzędzie rozkłada tę syntezę i wskazuje, które pod-pytania Twoja treść pokrywa, a przez które luki AI Cię pomija.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Dekompozycja syntezy AI Overview na sub-zapytania', 'Mapa pokrycia: które sub-zapytania obsługujesz', 'Rekomendacje uzupełnienia luk z konkretną treścią'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#36394a', lineHeight: 1.65 }}>
                    <span style={{ width: 14, height: 2, background: ACCENT, flexShrink: 0, marginTop: 9, borderRadius: 1 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GRAF WIEDZY */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Graf wiedzy (EAV)</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                AI widzi encje - nie tylko słowa kluczowe
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                Modele językowe budują reprezentację wiedzy na podstawie faktów - encji i ich atrybutów. Raport mapuje te relacje i pokazuje które fakty wyróżniają Cię na tle konkurencji (<strong>Wyróżnik</strong>), które są must-have (<strong>Podstawa</strong>) i których Ci brakuje.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Pełna tabela encji z klasyfikacją Wyróżnik/Podstawa/Rzadki', 'Mapa pokrycia: pokryte / luka / unikalne', 'Interaktywny graf wiedzy w aplikacji'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#36394a', lineHeight: 1.65 }}>
                    <span style={{ width: 14, height: 2, background: ACCENT, flexShrink: 0, marginTop: 9, borderRadius: 1 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)}><KnowledgeGraphVisual /></motion.div>
          </div>
        </div>
      </section>

      {/* EKSPORT */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid feat-grid-reverse">
            <motion.div {...fadeUp(0.1)}><ExportVisual /></motion.div>
            <motion.div {...fadeUp()}>
              <SectionLabel>Eksport raportu</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Narzędzie stworzone z myślą o płynnej pracy zespołu
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 4px' }}>
                Wyniki każdego audytu możesz natychmiast pobrać i wdrożyć. <strong>Raport PDF</strong> - czytelne, pozbawione technicznego żargonu podsumowanie gotowe do wysyłki do klienta. <strong>Plik Markdown</strong> - gotowy zestaw wytycznych strukturalnych dla copywriterów i redaktorów. <strong>Plan „Quick Wins"</strong> - wyselekcjonowana lista poprawek, które skokowo podniosą jakość contentu w oczach AI.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { fmt: 'PDF', desc: 'Gotowy do wysyłki', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
                  { fmt: 'Markdown', desc: 'Do dokumentacji', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
                ].map(f => (
                  <div key={f.fmt} style={{ flex: 1, background: '#f8fafb', border: '1px solid #dfe1e7', borderRadius: 8, padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{f.icon}</div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0d0d12', margin: '0 0 2px' }}>{f.fmt}</p>
                    <p style={{ fontSize: 11.5, color: '#818898', margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUICK WINS */}
      <section style={{ background: '#f8fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 36 }}>
            <SectionLabel>Quick Wins</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Szybkie poprawki - od razu po audycie
            </h2>
            <p style={{ fontSize: 16, color: '#666d80', maxWidth: 640, lineHeight: 1.65 }}>
              Do 7 gotowych poprawek wygenerowanych algorytmicznie (bez dodatkowego wywołania AI). Każda z badge'em źródła i linkiem do wymiaru, który ją wykrył. Wiesz co poprawić zanim przeczytasz cały raport.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {[
              { badge: 'Effort', color: '#CA8A04', text: 'Dodaj tabelę porównawczą - konkurencja używa w 7/10 artykułach' },
              { badge: 'Title', color: '#0891b2', text: 'Skróć title do 60 znaków (obecnie 78)' },
              { badge: 'EEAT', color: '#7c3aed', text: 'Dodaj datę aktualizacji i bio autora' },
              { badge: 'Fan-Out', color: ACCENT, text: 'Pokryj sub-zapytanie "jak mierzyć efekty"' },
              { badge: 'Schema', color: '#DC2626', text: 'Dodaj schema FAQPage - masz sekcję FAQ' },
              { badge: 'TF-IDF', color: '#CA8A04', text: 'Dodaj brakujące terminy: "konwersja", "retencja"' },
            ].map((qw) => (
              <div key={qw.text} style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: qw.color, background: `${qw.color}15`, border: `1px solid ${qw.color}30`, borderRadius: 4, padding: '3px 8px', flexShrink: 0, whiteSpace: 'nowrap' }}>{qw.badge}</span>
                <span style={{ fontSize: 13, color: '#36394a', lineHeight: 1.5 }}>{qw.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SCHEMA.ORG AUDIT */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
          <div className="feat-grid">
            <motion.div {...fadeUp()}>
              <SectionLabel>Schema.org</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 16 }}>
                Audyt danych strukturalnych
              </h2>
              <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, marginBottom: 16 }}>
                Algorytmiczna analiza schema.org JSON-LD (0 wywołań AI). Wykrywa ~14 typów schematów, sprawdza kompletność pól i wskazuje brakujące wymagane schematy z priorytetem.
              </p>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65 }}>
                Article, FAQPage, Product, HowTo, Review, BreadcrumbList, WebPage, Organization, Person, AggregateRating - każdy z listą wymaganych i rekomendowanych pól. Status: obecny / niekompletny / brakujący. Kwalifikacja do Google Rich Result.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.12)}>
              <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #dfe1e7', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#0d0d12' }}>Schema.org Audit</span>
                </div>
                {[
                  { type: 'Article', status: 'incomplete', missing: 'dateModified, author.url' },
                  { type: 'FAQPage', status: 'missing', missing: 'cały schemat' },
                  { type: 'BreadcrumbList', status: 'present', missing: '' },
                  { type: 'WebPage', status: 'missing', missing: 'cały schemat' },
                  { type: 'Organization', status: 'present', missing: '' },
                ].map((s) => {
                  const c = s.status === 'present' ? '#16A34A' : s.status === 'incomplete' ? '#CA8A04' : '#DC2626';
                  const l = s.status === 'present' ? 'OK' : s.status === 'incomplete' ? 'Niekompletny' : 'Brak';
                  return (
                    <div key={s.type} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', borderBottom: '1px solid #f0f0f3' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#0d0d12', width: 120, flexShrink: 0 }}>{s.type}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: c, background: `${c}12`, border: `1px solid ${c}25`, borderRadius: 4, padding: '2px 7px' }}>{l}</span>
                      {s.missing && s.status !== 'present' && <span style={{ fontSize: 11, color: '#a4acb9', marginLeft: 'auto' }}>{s.missing}</span>}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#ffffff', padding: '90px 0', borderTop: '1px solid #eceff3' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
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
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
              fontWeight: 500,
              color: '#36394a',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              marginBottom: 24,
            }}>
              Sprawdź swoje teksty już teraz.
            </p>
            <p style={{ fontSize: 17, color: '#666d80', lineHeight: 1.68, maxWidth: 480, margin: '0 auto 36px' }}>
              Dołącz do zespołów, które już teraz optymalizują treści pod kątem AI Search.
            </p>
            <motion.a
              href={`${APP_URL}/login?lang=pl`}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '15px 36px',
                borderRadius: 8,
                background: '#0b7983',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
              }}
            >
              Zrób audyt
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
            <p style={{ fontSize: 13, color: '#a4acb9', marginTop: 16 }}>
              Pierwsze 3 audyty są całkowicie darmowe. Rejestracja zajmie Ci mniej niż minutę.
            </p>
          </motion.div>
        </div>
      </section>

      <style>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .dims-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .feat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .feat-grid-reverse > *:first-child { order: 1; }
        .feat-grid-reverse > *:last-child  { order: 0; }
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr; gap: 14px; }
          .dims-grid  { grid-template-columns: 1fr; }
          .feat-grid  { grid-template-columns: 1fr; gap: 36px; }
          .feat-grid-reverse > * { order: unset !important; }
        }
      `}</style>
    </div>
  );
}
