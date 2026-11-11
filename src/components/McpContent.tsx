import HeroBackdrop from '@/components/HeroBackdrop';
import { APP_URL } from '@/lib/appUrl';
import { revealStyle } from '@/lib/reveal';
import McpChatDemo from '@/components/McpChatDemo';

// Shared - podstrona serwera MCP PL (/pl/mcp) i EN (/mcp). Komponent serwerowy: zero JS,
// pojawianie robi CSS (`reveal`). Fakty z ../ai-auditor/spec/public-api.md §17 i sekcji `mcp`
// w lib/api/docs-content.ts aplikacji - przy zmianie narzedzi zaktualizuj TOOLS.

const ACCENT = '#0b7983';
const SERVER_URL = 'https://app.citationone.com/api/mcp';
const DOCS_URL = `${APP_URL}/api-docs#mcp`;
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
// Skill dla Claude - plik publiczny aplikacji (public/skills/citationone/SKILL.md, `/skills` w PUBLIC_PATHS).
const SKILL_URL = `${APP_URL}/skills/citationone/SKILL.md`;
const SKILL_INSTALL = `mkdir -p ~/.claude/skills/citationone
curl -o ~/.claude/skills/citationone/SKILL.md \\
  ${SKILL_URL}`;

const SETUP = [
  {
    client: 'Claude Code',
    note: { pl: 'jedno polecenie w terminalu', en: 'one terminal command' },
    code: `claude mcp add --transport http citationone ${SERVER_URL} \\
  --header "Authorization: Bearer co_live_..."`,
  },
  {
    client: 'Cursor',
    note: { pl: '~/.cursor/mcp.json', en: '~/.cursor/mcp.json' },
    code: `{
  "mcpServers": {
    "citationone": {
      "url": "${SERVER_URL}",
      "headers": { "Authorization": "Bearer co_live_..." }
    }
  }
}`,
  },
  {
    client: 'Claude Desktop',
    note: { pl: 'claude_desktop_config.json, przez mcp-remote', en: 'claude_desktop_config.json, via mcp-remote' },
    code: `{
  "mcpServers": {
    "citationone": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${SERVER_URL}",
               "--header", "Authorization:\${AUTH_HEADER}"],
      "env": { "AUTH_HEADER": "Bearer co_live_..." }
    }
  }
}`,
  },
];

const COPY = {
  pl: {
    label: 'Dla agencji i specjalistów SEO',
    h1: 'Serwer MCP CitationOne',
    lead: 'Zlecaj audyty GEO i czytaj ich wyniki w rozmowie z asystentem AI - w Claude, Cursorze i innych klientach MCP. Ten sam silnik, klucz API i kredyty co w panelu.',
    ctaDocs: 'Instrukcja podłączenia',
    ctaKey: 'Utwórz klucz API',
    chatLabel: 'Przykładowa rozmowa',
    chat: [
      { who: 'Ty', text: 'Zrób audyt https://example.com/blog/geo pod frazę „co to jest geo” i wypisz trzy poprawki, które dadzą najwięcej.' },
      { who: 'Asystent', tool: 'start_audit', text: 'Zleciłem audyt. Potrwa kilka minut - sprawdzam postęp.' },
      { who: 'Asystent', tool: 'get_audit', text: 'Gotowe: Content Quality Score 61/100. Najwięcej dadzą: odpowiedź w pierwszym zdaniu sekcji o definicji, tabela GEO a SEO i źródła przy danych z badania. Pełny raport: app.citationone.com/…' },
    ],
    setupH2: 'Podłączenie w minutę',
    setupLead: 'Potrzebujesz klucza API (w panelu: Ustawienia → API) i adresu serwera. Klucz z prawem zlecania audytów pozwala asystentowi je uruchamiać; klucz tylko do odczytu wystarczy do przeglądania wyników.',
    serverLabel: 'Adres serwera (Streamable HTTP)',
    toolsH2: 'Narzędzia dostępne dla asystenta',
    toolsHead: ['Narzędzie', 'Działanie', 'Odpowiednik w API'],
    tools: [
      ['start_audit', 'Audyt adresu albo wklejonego tekstu (np. szkicu przed publikacją), opcjonalnie z frazą, językiem i projektem. Zwraca numer zadania.', 'POST /api/v1/audits'],
      ['get_audit', 'Status w trakcie, a po zakończeniu skrót: CQS na tle średniej top 10, wymiary, 10 najważniejszych zaleceń i link do raportu. Na prośbę pełny wynik z tekstami przed/po.', 'GET /api/v1/audits/{id}'],
      ['list_audits', 'Ostatnie audyty z wynikami, z filtrem po projekcie, domenie albo statusie.', 'GET /api/v1/audits'],
      ['get_credits', 'Saldo kredytów i ostatnie operacje.', 'GET /api/v1/credits/usage'],
    ],
    featuresH2: 'Zasady działania',
    features: [
      { title: 'Ten sam klucz co w API', body: 'Serwer MCP korzysta z kluczy API z panelu. Zakresy klucza działają tak samo, a cofnięcie klucza odcina też asystenta.' },
      { title: '1 audyt = 1 kredyt', body: 'Audyt zlecony przez asystenta kosztuje tyle samo co w panelu i przez API, z tej samej puli kredytów. Odczyt wyników, listy audytów i salda jest bezpłatny. Trzy pierwsze audyty na nowym koncie są darmowe.' },
      { title: 'Skrót do rozmowy, pełny wynik na prośbę', body: 'Domyślnie asystent dostaje zwięzły skrót, który mieści się w rozmowie. Pełny wynik z tekstami przed/po pobiera wtedy, gdy o niego poprosisz.' },
      { title: 'Link do pełnego raportu', body: 'Każdy wynik zawiera adres raportu w panelu - z wykresami, porównaniem z konkurencją i eksportem do PDF.' },
      { title: 'Te same limity i zabezpieczenia', body: 'Limity zapytań, liczba równoległych audytów i ochrona przed podwójnym zleceniem działają jak w API. Błąd wraca do asystenta jako jedno zdanie z kodem.' },
      { title: 'Treść strony jako dane', body: 'Wyniki cytują tekst z audytowanej strony i stron konkurencji. Serwer nakazuje asystentowi traktować ten tekst jako materiał do analizy.' },
    ],
    timing: 'Audyt trwa zwykle 3-8 minut. Asystent zleca go, a potem sam sprawdza postęp co 30-60 sekund.',
    skillH2: 'Skill dla Claude - audyty w pracy agencji',
    skillLead: 'Serwer MCP daje asystentowi narzędzia, a skill CitationOne uczy go, jak z nich korzystać przy pracy dla klientów. Działa w Claude Code, Claude Desktop i claude.ai; w Cursorze wystarczy sam serwer MCP.',
    skillItems: [
      'potwierdza koszt i saldo kredytów przed każdym audytem,',
      'sprawdza, czy strona nie była audytowana w ostatnich dniach, zanim wyda kredyt,',
      'czyta wynik na tle średniej top 10 Google, a różnice poniżej 5 punktów traktuje jako remis,',
      'łączy audyty kilku stron jednego klienta w jedną listę priorytetów z poprawkami dla całego serwisu,',
      'porównuje audyty przed i po zmianach,',
      'pisze podsumowanie dla klienta według gotowego szablonu.',
    ],
    skillDownload: 'Pobierz skill (SKILL.md)',
    skillInstall: 'Claude Code i Claude Desktop - zapis w katalogu skilli',
    skillClaudeAi: 'W claude.ai spakuj katalog citationone z tym plikiem do ZIP i wgraj go w ustawieniach skilli.',
    closing: 'Klucz API tworzysz w panelu: Ustawienia → API. Szczegóły i pełną listę parametrów znajdziesz w dokumentacji (po angielsku).',
    apiLink: 'Wolisz integrację z własnym kodem? Zobacz API',
    apiHref: '/pl/api',
    lang: 'pl',
  },
  en: {
    label: 'For agencies and SEO specialists',
    h1: 'CitationOne MCP server',
    lead: 'Run GEO audits and read their results in a conversation with an AI assistant - in Claude, Cursor and other MCP clients. The same engine, API key and credits as in the dashboard.',
    ctaDocs: 'Setup guide',
    ctaKey: 'Create an API key',
    chatLabel: 'Sample conversation',
    chat: [
      { who: 'You', text: 'Audit https://example.com/blog/geo for the keyword "what is geo" and list the three fixes with the biggest impact.' },
      { who: 'Assistant', tool: 'start_audit', text: 'Audit started. It takes a few minutes - checking progress.' },
      { who: 'Assistant', tool: 'get_audit', text: 'Done: Content Quality Score 61/100. Biggest wins: answer in the first sentence of the definition section, a GEO vs SEO table and sources next to the study data. Full report: app.citationone.com/…' },
    ],
    setupH2: 'Connect in a minute',
    setupLead: 'You need an API key (in the dashboard: Settings → API) and the server URL. A key allowed to submit audits lets the assistant start them; a read-only key is enough to browse results.',
    serverLabel: 'Server URL (Streamable HTTP)',
    toolsH2: 'Tools available to the assistant',
    toolsHead: ['Tool', 'What it does', 'API equivalent'],
    tools: [
      ['start_audit', 'Audits a URL or pasted text (e.g. a draft before publishing), optionally with a keyword, language and project. Returns a job id.', 'POST /api/v1/audits'],
      ['get_audit', 'Status while running; when finished, a summary: CQS against the top 10 average, dimensions, the 10 key recommendations and the report link. Full result with before/after text on request.', 'GET /api/v1/audits/{id}'],
      ['list_audits', 'Recent audits with scores, filtered by project, domain or status.', 'GET /api/v1/audits'],
      ['get_credits', 'Credit balance and recent credit events.', 'GET /api/v1/credits/usage'],
    ],
    featuresH2: 'How it works',
    features: [
      { title: 'The same key as the API', body: 'The MCP server uses the API keys from your dashboard. Key scopes work the same way, and revoking a key cuts off the assistant too.' },
      { title: '1 audit = 1 credit', body: 'An audit started by the assistant costs the same as in the dashboard and over the API, from the same credit pool. Reading results, the audit list and the balance is free. The first three audits on a new account are free.' },
      { title: 'A summary for the chat, full result on request', body: 'By default the assistant gets a compact summary that fits in a conversation. It fetches the full result with before/after text when you ask for it.' },
      { title: 'A link to the full report', body: 'Every result includes the report URL in the dashboard - with charts, the competitor comparison and PDF export.' },
      { title: 'The same limits and safeguards', body: 'Rate limits, concurrent audits and duplicate-submission protection work as in the API. Errors reach the assistant as one sentence with a code.' },
      { title: 'Page text treated as data', body: 'Results quote text from the audited page and competing pages. The server tells the assistant to treat that text as material to analyse.' },
    ],
    timing: 'An audit usually takes 3-8 minutes. The assistant starts it and then checks progress every 30-60 seconds on its own.',
    skillH2: 'Claude skill - audits in agency work',
    skillLead: 'The MCP server gives the assistant the tools; the CitationOne skill teaches it how to use them in client work. It works in Claude Code, Claude Desktop and claude.ai; in Cursor the MCP server alone is enough.',
    skillItems: [
      'confirms the cost and credit balance before every audit,',
      'checks whether the page was audited in the last few days before spending a credit,',
      'reads the score against the Google top 10 average and treats gaps under 5 points as level,',
      'merges audits of several pages of one client into one priority list with site-wide fixes,',
      'compares audits before and after changes,',
      'writes a client summary from a ready template.',
    ],
    skillDownload: 'Download the skill (SKILL.md)',
    skillInstall: 'Claude Code and Claude Desktop - save to your skills folder',
    skillClaudeAi: 'In claude.ai, zip the citationone folder with this file and upload it in the skills settings.',
    closing: 'You create API keys in the dashboard: Settings → API. The documentation has the details and the full parameter list.',
    apiLink: 'Prefer an integration in your own code? See the API',
    apiHref: '/api',
    lang: 'en',
  },
} as const;

function CodeBox({ title, code }: { title: string; code: string }) {
  return (
    <div style={{ border: '1px solid #dfe1e7', borderRadius: 12, overflow: 'hidden', background: '#0d1117' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid #1f2630' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a4250' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a4250' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a4250' }} />
        <span style={{ fontSize: 12, color: '#7d8695', marginLeft: 6, letterSpacing: '0.02em' }}>{title}</span>
      </div>
      <pre style={{ margin: 0, padding: '16px 16px 18px', overflowX: 'auto', fontSize: 12.5, lineHeight: 1.7, color: '#c9d3e0', fontFamily: MONO }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function McpContent({ lang }: { lang: 'pl' | 'en' }) {
  const c = COPY[lang];
  const registerUrl = `${APP_URL}/register?lang=${lang}`;
  const h2 = { fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.025em', margin: '0 0 12px' } as const;

  return (
    <section style={{ background: '#ffffff', padding: '44px 0 96px', position: 'relative', overflow: 'hidden' }}>
      <HeroBackdrop />
      <div style={{ maxWidth: 840, margin: '0 auto', paddingLeft: 16, paddingRight: 16, position: 'relative' }}>
        <header className="hero-rise" style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#818898', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
            {c.label}
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 22,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
          >
            {c.h1}
          </h1>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, maxWidth: 600, margin: '0 auto' }}>{c.lead}</p>
        </header>

        <div className="mcp-cta-row hero-rise">
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn-pop mcp-btn mcp-btn-primary">
            {c.ctaDocs} →
          </a>
          <a href={registerUrl} className="btn-pop mcp-btn mcp-btn-secondary">
            {c.ctaKey}
          </a>
        </div>
        <p className="hero-rise" style={{ textAlign: 'center', margin: '14px 0 0', fontSize: 14.5 }}>
          <a href="#skill" style={{ color: ACCENT, fontWeight: 600, textDecoration: 'none' }}>{c.skillH2.split(' - ')[0]} ↓</a>
        </p>

        {/* Przykladowa rozmowa (animowana) - pokazuje efekt, zanim czytelnik dojdzie do konfiguracji. */}
        <div style={{ marginTop: 44 }}>
          <McpChatDemo label={c.chatLabel} chat={c.chat} accent={ACCENT} />
        </div>

        <h2 className="reveal" style={{ ...h2, marginTop: 56 }}>{c.setupH2}</h2>
        <p className="reveal" style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 18px' }}>{c.setupLead}</p>
        <div className="reveal" style={{ marginBottom: 18 }}>
          <span style={{ display: 'block', fontSize: 12.5, color: '#666d80', marginBottom: 6 }}>{c.serverLabel}</span>
          <div style={{ display: 'inline-block', maxWidth: '100%', overflowX: 'auto', padding: '9px 14px', borderRadius: 7, background: '#f4f9fa', border: '1px solid #d7ecee', fontSize: 13.5, fontFamily: MONO, color: '#0d0d12', whiteSpace: 'nowrap' }}>
            {SERVER_URL}
          </div>
        </div>
        <div style={{ display: 'grid', gap: 14 }}>
          {SETUP.map((s, i) => (
            <div key={s.client} className="reveal" style={revealStyle({ delay: i * 0.06 })}>
              <CodeBox title={`${s.client} · ${s.note[lang]}`} code={s.code} />
            </div>
          ))}
        </div>

        <h2 className="reveal" style={{ ...h2, marginTop: 56 }}>{c.toolsH2}</h2>
        <div className="reveal mcp-table">
          <table>
            <thead>
              <tr>
                {c.toolsHead.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.tools.map(([name, desc, rest]) => (
                <tr key={name}>
                  <td><code>{name}</code></td>
                  <td>{desc}</td>
                  <td><code>{rest}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="reveal" style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: '14px 0 0' }}>{c.timing}</p>

        <h2 className="reveal" style={{ ...h2, marginTop: 56 }}>{c.featuresH2}</h2>
        <div className="mcp-features">
          {c.features.map((f, i) => (
            <div key={f.title} className="reveal card-lift" style={{ ...revealStyle({ delay: (i % 2) * 0.06 }), border: '1px solid #dfe1e7', borderRadius: 10, padding: '20px 20px', background: '#ffffff' }}>
              <h3 style={{ fontSize: 15.5, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.015em', margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65, margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>

        {/* Skill - po zasadach dzialania, bo zaklada podlaczony serwer. */}
        <div id="skill" className="reveal" style={{ marginTop: 56, border: '1px solid rgba(11,121,131,0.28)', borderRadius: 14, padding: '26px 24px', background: 'rgba(11,121,131,0.04)', scrollMarginTop: 88 }}>
          <h2 style={{ ...h2 }}>{c.skillH2}</h2>
          <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 12px' }}>{c.skillLead}</p>
          <ul className="mcp-skill-list">
            {c.skillItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div style={{ margin: '18px 0' }}>
            <CodeBox title={c.skillInstall} code={SKILL_INSTALL} />
          </div>
          <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.6, margin: '0 0 18px' }}>{c.skillClaudeAi}</p>
          <a href={SKILL_URL} target="_blank" rel="noopener noreferrer" className="btn-pop mcp-btn mcp-btn-secondary">
            {c.skillDownload} ↓
          </a>
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: 52 }}>
          <p style={{ fontSize: 15, color: '#666d80', lineHeight: 1.7, margin: '0 auto 20px', maxWidth: 560 }}>{c.closing}</p>
          <div className="mcp-cta-row">
            <a href={registerUrl} className="btn-pop mcp-btn mcp-btn-primary">{c.ctaKey} →</a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn-pop mcp-btn mcp-btn-secondary">{c.ctaDocs}</a>
          </div>
          <p style={{ marginTop: 22, fontSize: 14.5 }}>
            <a href={c.apiHref} style={{ color: ACCENT, fontWeight: 600, textDecoration: 'none' }}>{c.apiLink} →</a>
          </p>
        </div>
      </div>

      <style>{`
        .mcp-cta-row { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 12px; }
        .mcp-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 13px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; letter-spacing: -0.01em; }
        .mcp-btn-primary { background: ${ACCENT}; color: #fff; box-shadow: 0 4px 20px rgba(11,121,131,0.25); }
        .mcp-btn-secondary { background: #fff; color: #0d0d12; border: 1px solid #dfe1e7; font-weight: 600; }
        .mcp-msg { background: #fff; border: 1px solid #e7e9ef; border-radius: 12px; padding: 12px 14px; font-size: 14.5px; line-height: 1.6; color: #2b2f3d; max-width: 88%; overflow-wrap: anywhere; }
        .mcp-msg-user { justify-self: end; background: #e6f4f5; border-color: #cfe8ea; }
        .mcp-msg-who { display: inline-block; font-size: 12px; font-weight: 700; color: #666d80; margin-right: 8px; margin-bottom: 4px; }
        .mcp-msg-tool { display: inline-flex; align-items: center; gap: 5px; font-family: ${MONO}; font-size: 11.5px; color: ${ACCENT}; background: #f0f8f9; border: 1px solid #d7ecee; border-radius: 999px; padding: 1px 8px; margin-bottom: 4px; }
        .mcp-table { overflow-x: auto; border: 1px solid #e7e9ef; border-radius: 10px; }
        .mcp-table table { width: 100%; border-collapse: collapse; font-size: 14.5px; line-height: 1.55; }
        .mcp-table th { background: #f8fafb; text-align: left; font-weight: 650; color: #0d0d12; }
        .mcp-table th, .mcp-table td { padding: 11px 14px; border-bottom: 1px solid #eceff3; vertical-align: top; color: #36394a; }
        .mcp-table tr:last-child td { border-bottom: 0; }
        .mcp-table td:first-child, .mcp-table td:last-child { white-space: nowrap; }
        .mcp-table code { font-family: ${MONO}; font-size: 0.88em; background: #f1f3f6; padding: 0.12em 0.4em; border-radius: 5px; color: #0d0d12; }
        .mcp-features { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .mcp-skill-list { margin: 0; padding-left: 1.3em; list-style: disc; display: grid; gap: 6px; font-size: 15px; line-height: 1.6; color: #36394a; }
        .mcp-skill-list li::marker { color: ${ACCENT}; }
        @media (max-width: 768px) {
          .mcp-features { grid-template-columns: 1fr; }
          .mcp-msg { max-width: 100%; }
          .mcp-table td, .mcp-table th { min-width: 140px; }
          .mcp-table td:nth-child(2) { min-width: 220px; }
        }
        @media (max-width: 580px) {
          .mcp-cta-row > a { width: 100%; }
        }
      `}</style>
    </section>
  );
}
