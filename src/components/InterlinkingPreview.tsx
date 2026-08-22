/**
 * Podglad wyniku analizy linkow wewnetrznych — replika zakladki „Propozycje linkow"
 * z aplikacji: pasek statystyk, przelacznik zakladek i tabela zrodlo → anchor → cel.
 *
 * Etykiety odpowiadaja kluczom `interlinking.*` w translations.ts aplikacji.
 * Adresy na example.com (RFC 2606), tematyka generyczna — to format wyniku, nie czyjs audyt.
 */

const ACCENT = '#0b7983';
const MUTED = '#64748B';
const DANGER = '#B91C1C';

interface Row {
  sourceTitle: string;
  sourceUrl: string;
  anchor: string;
  targetTitle: string;
  targetUrl: string;
  score: string;
}

interface Copy {
  stats: { value: string; label: string; danger?: boolean }[];
  tabs: [string, string, string];
  colSource: string;
  colAnchor: string;
  colTarget: string;
  colScore: string;
  rows: Row[];
}

const COPY: Record<'pl' | 'en', Copy> = {
  pl: {
    stats: [
      { value: '55', label: 'propozycji linków' },
      { value: '71', label: 'stron' },
      { value: '45%', label: 'pokrycie' },
      { value: '0.8', label: 'śr. linków na stronę' },
      { value: '39', label: 'stron bez linków przychodzących', danger: true },
    ],
    tabs: ['Propozycje linków', 'Statystyki', 'Eksport'],
    colSource: 'Źródło',
    colAnchor: 'Anchor text',
    colTarget: 'Cel',
    colScore: 'Podobieństwo',
    rows: [
      {
        sourceTitle: 'Jak zainstalować przeglądarkę na komputerze',
        sourceUrl: 'example.com/jak-zainstalowac-przegladarke',
        anchor: 'zainstalować przeglądarkę',
        targetTitle: 'Jak zainstalować przeglądarkę w telefonie',
        targetUrl: 'example.com/przegladarka-w-telefonie',
        score: '0.84',
      },
      {
        sourceTitle: 'Jaka przeglądarka jest najlepsza?',
        sourceUrl: 'example.com/jaka-przegladarka-najlepsza',
        anchor: 'porównanie przeglądarek',
        targetTitle: 'Jakie są przeglądarki internetowe?',
        targetUrl: 'example.com/jakie-sa-przegladarki',
        score: '0.82',
      },
      {
        sourceTitle: 'Jakie są przeglądarki internetowe?',
        sourceUrl: 'example.com/jakie-sa-przegladarki',
        anchor: 'przeglądarki internetowej',
        targetTitle: 'Co to jest przeglądarka internetowa',
        targetUrl: 'example.com/co-to-jest-przegladarka',
        score: '0.82',
      },
      {
        sourceTitle: 'Jak ustawić domyślną przeglądarkę',
        sourceUrl: 'example.com/domyslna-przegladarka',
        anchor: 'ustawić domyślną',
        targetTitle: 'Jak ustawić wyszukiwarkę jako domyślną',
        targetUrl: 'example.com/domyslna-wyszukiwarka',
        score: '0.81',
      },
      {
        sourceTitle: 'Gdzie jest przeglądarka w telefonie?',
        sourceUrl: 'example.com/gdzie-jest-przegladarka',
        anchor: 'gdzie jest przeglądarka',
        targetTitle: 'Jak wyczyścić historię przeglądarki',
        targetUrl: 'example.com/wyczyscic-historie',
        score: '0.80',
      },
    ],
  },
  en: {
    stats: [
      { value: '55', label: 'link suggestions' },
      { value: '71', label: 'pages' },
      { value: '45%', label: 'coverage' },
      { value: '0.8', label: 'avg links per page' },
      { value: '39', label: 'pages without incoming links', danger: true },
    ],
    tabs: ['Link suggestions', 'Statistics', 'Export'],
    colSource: 'Source',
    colAnchor: 'Anchor text',
    colTarget: 'Target',
    colScore: 'Similarity',
    rows: [
      {
        sourceTitle: 'How to install a browser on a computer',
        sourceUrl: 'example.com/install-a-browser',
        anchor: 'install a browser',
        targetTitle: 'How to install a browser on a phone',
        targetUrl: 'example.com/browser-on-a-phone',
        score: '0.84',
      },
      {
        sourceTitle: 'Which browser is the best?',
        sourceUrl: 'example.com/best-browser',
        anchor: 'browser comparison',
        targetTitle: 'What are web browsers?',
        targetUrl: 'example.com/what-are-web-browsers',
        score: '0.82',
      },
      {
        sourceTitle: 'What are web browsers?',
        sourceUrl: 'example.com/what-are-web-browsers',
        anchor: 'a web browser',
        targetTitle: 'What a web browser actually is',
        targetUrl: 'example.com/what-a-browser-is',
        score: '0.82',
      },
      {
        sourceTitle: 'How to set a default browser',
        sourceUrl: 'example.com/default-browser',
        anchor: 'set as default',
        targetTitle: 'How to set a default search engine',
        targetUrl: 'example.com/default-search-engine',
        score: '0.81',
      },
      {
        sourceTitle: 'Where is the browser on a phone?',
        sourceUrl: 'example.com/where-is-the-browser',
        anchor: 'where the browser is',
        targetTitle: 'How to clear your browsing history',
        targetUrl: 'example.com/clear-browsing-history',
        score: '0.80',
      },
    ],
  },
};

function Cell({ title, url }: { title: string; url: string }) {
  return (
    <div style={{ maxWidth: '100%' }}>
      <div style={{
        fontSize: 13.5, color: '#0d0d12', lineHeight: 1.4,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: 12, color: MUTED, lineHeight: 1.4, marginTop: 2,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {url}
      </div>
    </div>
  );
}

export default function InterlinkingPreview({ lang = 'pl' }: { lang?: 'pl' | 'en' }) {
  const c = COPY[lang];

  return (
    <div style={{ marginTop: 26 }}>
      {/* Pasek statystyk */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', marginBottom: 14 }}>
        {c.stats.map((s) => (
          <span key={s.label} style={{ fontSize: 13, color: MUTED }}>
            <strong style={{
              color: s.danger ? DANGER : '#0d0d12', fontWeight: 700, fontVariantNumeric: 'tabular-nums',
            }}>
              {s.value}
            </strong>{' '}
            {s.label}
          </span>
        ))}
      </div>

      {/* Zakladki — scroll w kontenerze, zeby na waskim ekranie nie rozpychaly strony */}
      <div style={{ display: 'flex', gap: 22, borderBottom: '1px solid #dfe1e7', marginBottom: 12, overflowX: 'auto' }}>
        {c.tabs.map((tab, i) => (
          <span key={tab} style={{
            fontSize: 14, fontWeight: i === 0 ? 600 : 500, padding: '0 0 10px',
            color: i === 0 ? ACCENT : MUTED,
            borderBottom: i === 0 ? `2px solid ${ACCENT}` : '2px solid transparent',
            marginBottom: -1, whiteSpace: 'nowrap',
          }}>
            {tab}
          </span>
        ))}
      </div>

      {/* Tabela propozycji */}
      <div style={{ overflowX: 'auto', border: '1px solid #dfe1e7', borderRadius: 12, background: '#ffffff' }}>
        {/* tableLayout: fixed + procentowe szerokosci — inaczej kolumny rozpychaja tabele
            ponad kontener i poziomy scroll pojawia sie takze na desktopie. */}
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: 560 }}>
          <thead>
            <tr>
              {/* Naglowki BEZ `whiteSpace: nowrap` — przy `table-layout: fixed` komorka, ktora
                  nie moze zawinac tekstu, nie da sie sciesnic do zadanej szerokosci i rozpycha
                  tabele ponad kontener (stad poziomy scroll takze na desktopie). */}
              {[c.colSource, c.colAnchor, c.colTarget, c.colScore].map((h, i) => (
                <th key={h} style={{
                  width: ['33%', '20%', '33%', '14%'][i],
                  textAlign: i === 3 ? 'right' : 'left', fontSize: 11.5, fontWeight: 500, color: MUTED,
                  padding: '11px 12px', borderBottom: '1px solid #eceff3', background: '#f8fafb',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((r) => (
              <tr key={`${r.sourceUrl}-${r.anchor}`}>
                <td style={{ padding: '12px 12px', borderBottom: '1px solid #f2f4f7', verticalAlign: 'top' }}>
                  <Cell title={r.sourceTitle} url={r.sourceUrl} />
                </td>
                <td style={{ padding: '12px 12px', borderBottom: '1px solid #f2f4f7', verticalAlign: 'top' }}>
                  <span style={{
                    display: 'inline-block', fontSize: 12.5, color: '#36394a', lineHeight: 1.4,
                    background: 'rgba(11, 121, 131, 0.08)', borderRadius: 6, padding: '4px 9px',
                  }}>
                    {r.anchor}
                  </span>
                </td>
                <td style={{ padding: '12px 12px', borderBottom: '1px solid #f2f4f7', verticalAlign: 'top' }}>
                  <Cell title={r.targetTitle} url={r.targetUrl} />
                </td>
                <td style={{
                  fontSize: 13.5, color: MUTED, padding: '12px 16px', textAlign: 'right', verticalAlign: 'top',
                  borderBottom: '1px solid #f2f4f7', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
                }}>
                  {r.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
