/**
 * Treści dla agentów AI: `llms.txt` (https://llmstxt.org) i paczka wiedzy w Open Knowledge Format
 * v0.2 (https://github.com/GoogleCloudPlatform/open-knowledge-format) pod `/knowledge/`.
 *
 * Wszystko generuje się W CZASIE BUILDA z tych samych danych co podstrony (`src/data/*`,
 * changelog z aplikacji), więc pliki nie rozjeżdżają się ze stroną. Route handlery:
 * `src/app/llms.txt/route.ts` i `src/app/knowledge/[...path]/route.ts`.
 *
 * OKF w skrócie: paczka = katalog plików .md; każdy plik poza `index.md` i `log.md` to „koncept”
 * z frontmatterem YAML (wymagany tylko `type`). `index.md` nie ma frontmattera (wyjątek: korzeń
 * paczki może mieć `okf_version`), `log.md` ma nagłówki `YYYY-MM-DD` od najnowszego.
 * Linki wewnątrz paczki są absolutne względem korzenia paczki (`/dimensions/bluf.md`).
 *
 * Paczka jest po angielsku (wersja domyślna strony). `llms.txt` wskazuje też wersję PL.
 */

import { DIMENSIONS_EN, dimensionSlugsEn } from '@/data/dimensions-en';
import { TOOLS_EN, toolSlugsEn } from '@/data/tools-en';
import { plSlugForEn } from '@/data/dimension-types';
import { toolPlSlugForEn } from '@/data/tool-types';
import type { DimTable } from '@/data/dimension-types';
import { getChangelog } from '@/lib/changelog';
import { BLOG_POSTS, blogPostsFor } from '@/data/blog';

const SITE = 'https://citationone.com';
const APP = 'https://app.citationone.com';
export const KNOWLEDGE_BASE = '/knowledge';
const OKF_VERSION = '0.2';

/** Fakty produktu w jednym miejscu - te same liczby co w metadanych podstron. */
const PRODUCT = {
  name: 'CitationOne',
  summary:
    'CitationOne is a GEO (generative engine optimization) content audit tool. It scores how likely AI answers (ChatGPT, Claude, Google AI Overviews, Google AI Mode) are to cite a page, compares the page with the current Google top 10 for its keyword, checks which pages Google AI Overviews, ChatGPT and Google AI Mode actually cite, and returns before/after fixes ready to apply.',
  pricing: '3 free audits to start, then EUR 2 per audit (1 audit = 1 credit), credit packages, no subscription.',
  sampleReport: `${APP}/share/BDBhqK8ZvffG9-rKXPNCeUTW?lang=en`,
};

// --- pomocnicze ---------------------------------------------------------------------------

/** Wartość YAML w cudzysłowie - teksty z danych mają dwukropki i cudzysłowy. */
function yamlString(s: string): string {
  return JSON.stringify(s);
}

function frontmatter(fields: Record<string, string | string[] | undefined>): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v !== undefined && (!Array.isArray(v) || v.length > 0))
    .map(([k, v]) => (Array.isArray(v) ? `${k}: [${v.map(yamlString).join(', ')}]` : `${k}: ${yamlString(v as string)}`));
  return `---\n${lines.join('\n')}\n---\n`;
}

function cell(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\n+/g, ' ');
}

function table(t: DimTable): string {
  const out: string[] = [];
  if (t.caption) out.push(`**${t.caption}**`, '');
  out.push(`| ${cell(t.head[0])} | ${cell(t.head[1])} |`, '| --- | --- |');
  for (const [a, b] of t.rows) out.push(`| ${cell(a)} | ${cell(b)} |`);
  return out.join('\n');
}

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
const paragraphs = (items: string[]) => items.join('\n\n');

function section(heading: string, body: string | undefined): string {
  return body && body.trim() ? `# ${heading}\n\n${body.trim()}\n` : '';
}

function faq(items: { q: string; a: string }[]): string {
  return items.map((f) => `**${f.q}**\n\n${f.a}`).join('\n\n');
}

function doc(fm: string, sections: string[]): string {
  return `${fm}\n${sections.filter(Boolean).join('\n')}`;
}

// --- koncepty ------------------------------------------------------------------------------

function dimensionDoc(slug: string): string {
  const d = DIMENSIONS_EN[slug];
  const pl = plSlugForEn(slug);
  return doc(
    frontmatter({
      type: 'Scoring Dimension',
      title: d.name,
      description: d.description,
      resource: `${SITE}/dimensions/${slug}`,
      tags: ['geo', 'content-audit', 'scoring-dimension'],
      ...(pl ? { resource_pl: `${SITE}/pl/wymiary/${pl}` } : {}),
    }),
    [
      section('Summary', d.lead),
      section(d.whyHeading, paragraphs(d.why)),
      section(d.howHeading, [paragraphs(d.how.intro), ...d.how.tables.map(table)].filter(Boolean).join('\n\n')),
      section('What raises the score', bullets(d.raises)),
      section('What lowers the score', bullets(d.lowers)),
      section('In the report', bullets(d.report)),
      section('FAQ', faq(d.faq)),
      section(
        'Related dimensions',
        bullets(d.related.filter((r) => DIMENSIONS_EN[r.slug]).map((r) => `[${r.name}](/dimensions/${r.slug}.md) - ${r.desc}`))
      ),
    ]
  );
}

function toolDoc(slug: string): string {
  const t = TOOLS_EN[slug];
  const pl = toolPlSlugForEn(slug);
  return doc(
    frontmatter({
      type: 'Tool',
      title: t.name,
      description: t.description,
      resource: `${SITE}/tools/${slug}`,
      tags: ['geo', 'seo-tool'],
      ...(pl ? { resource_pl: `${SITE}/pl/narzedzia/${pl}` } : {}),
    }),
    [
      section('Summary', t.lead),
      section(t.defHeading, paragraphs(t.def)),
      section(t.whyHeading, paragraphs(t.why)),
      section(t.stepsHeading, t.steps.map((s, i) => `${i + 1}. **${s.title}** ${s.desc}`).join('\n')),
      t.configTable ? section('Settings', table(t.configTable)) : '',
      section(t.outputHeading, bullets(t.output)),
      section(t.limitsHeading, bullets(t.limits)),
      section('FAQ', faq(t.faq)),
      section(
        'Related tools',
        bullets(t.related.filter((r) => TOOLS_EN[r.slug]).map((r) => `[${r.name}](/tools/${r.slug}.md) - ${r.desc}`))
      ),
    ]
  );
}

function productDoc(): string {
  return doc(
    frontmatter({
      type: 'Product',
      title: PRODUCT.name,
      description: PRODUCT.summary,
      resource: SITE,
      tags: ['geo', 'content-audit', 'ai-search'],
    }),
    [
      section('Summary', PRODUCT.summary),
      section(
        'What an audit returns',
        bullets([
          `Content Quality Score (CQS, 0-100): a weighted average of 10 [scoring dimensions](/dimensions/index.md), E-E-A-T and the page title and meta description. Weights depend on the content type detected from the Google top 10, and the score is shown next to the top 10 average.`,
          'Information Gain (what the page adds over the top 10), reported outside the score.',
          'Before/after recommendations ordered by priority, plus an optional automatic rewrite of the content with the recommendations applied (1 credit).',
          'Competitor comparison from Google, ChatGPT and Google AI Mode, and coverage of Fan-Out questions.',
          `A shareable report link, PDF and Markdown export. Sample report: ${PRODUCT.sampleReport}`,
        ])
      ),
      section('Pricing', `${PRODUCT.pricing} Details: ${SITE}/pricing`),
      section(
        'Tools',
        bullets(toolSlugsEn().map((s) => `[${TOOLS_EN[s].name}](/tools/${s}.md) - ${TOOLS_EN[s].description}`))
      ),
      section('API', 'Audits can be run programmatically - see [API](/api.md) - and from AI assistants over [MCP](/mcp.md).'),
      section('Languages', `The site is available in English (${SITE}) and Polish (${SITE}/pl).`),
    ]
  );
}

function apiDoc(): string {
  return doc(
    frontmatter({
      type: 'API',
      title: 'CitationOne API',
      description: 'REST + JSON API for running content audits: API key auth, bulk requests, public report links. 1 audit = 1 credit.',
      resource: `${APP}/api-docs.md`,
      tags: ['api', 'rest'],
    }),
    [
      section(
        'Summary',
        `The API runs the same audit as the web app and returns the same report data. Full reference as HTML: ${APP}/api-docs, as Markdown for agents: ${APP}/api-docs.md. Overview page: ${SITE}/api.`
      ),
      section('Related', bullets([
        '[CitationOne](/product.md) - the product the API exposes',
        '[MCP server](/mcp.md) - the same API for AI assistants',
      ])),
    ]
  );
}

function mcpDoc(): string {
  return doc(
    frontmatter({
      type: 'API',
      title: 'CitationOne MCP server',
      description: 'MCP (Model Context Protocol) server for running CitationOne audits and reading the results from Claude Code, Claude Desktop, Cursor and other MCP clients. Same API key and credits as the REST API.',
      resource: `${APP}/api/mcp`,
      tags: ['api', 'mcp', 'ai-assistants'],
    }),
    [
      section(
        'Summary',
        `Streamable HTTP endpoint at ${APP}/api/mcp, authenticated with an API key from the app settings (header "Authorization: Bearer co_live_..."). It runs the same audit as the web app and the REST API: 1 audit = 1 credit, reading results is free, and the same rate and concurrency limits apply. Setup for each client: ${APP}/api-docs#mcp. Overview page: ${SITE}/mcp.`
      ),
      section(
        'Tools',
        bullets([
          'start_audit - audit a public URL or pasted text (e.g. a draft before publishing), with an optional keyword, language, project and idempotency key; returns a job id. An audit takes about 3-8 minutes.',
          'get_audit - status while running; when completed, a summary with the Content Quality Score, the top 10 average, the dimensions, the 10 most important recommendations and a report link. With detail "full" it returns every recommendation with before/after text.',
          'list_audits - recent audits with scores, filtered by project, domain or status.',
          'get_credits - the credit balance and the most recent credit events.',
        ])
      ),
      section(
        'Claude skill',
        `An optional skill (${APP}/skills/citationone/SKILL.md) teaches Claude to use these tools in agency work: confirming the cost before an audit, reading scores against the top 10, merging several pages of one client into one priority list, comparing audits before and after changes, and a client summary template. Skills work in Claude Code, Claude Desktop and claude.ai.`
      ),
      section('Related', bullets([
        '[API](/api.md) - the REST API behind the MCP tools',
        '[CitationOne](/product.md) - what an audit returns',
      ])),
    ]
  );
}

function rootIndex(): string {
  const dims = dimensionSlugsEn();
  const tools = toolSlugsEn();
  return [
    frontmatter({ okf_version: OKF_VERSION }),
    `# CitationOne knowledge bundle`,
    '',
    `${PRODUCT.summary}`,
    '',
    '# Product',
    '',
    `- [CitationOne](/product.md) - what the audit does, what it returns, pricing`,
    `- [API](/api.md) - running audits over REST and JSON`,
    `- [MCP server](/mcp.md) - running audits from Claude, Cursor and other AI assistants`,
    '',
    '# Scoring dimensions',
    '',
    `- [All dimensions](/dimensions/index.md) - 11 dimensions that count toward the Content Quality Score, plus Information Gain reported outside it`,
    '',
    '# Tools',
    '',
    `- [All tools](/tools/index.md) - ${tools.length} tools that work on a whole site`,
    '',
    '# History',
    '',
    `- [Change log](/log.md) - product changes, newest first`,
    '',
  ].join('\n');
}

function dimensionsIndex(): string {
  return [
    '# Scoring dimensions',
    '',
    'The audit compares the page with the Google top 10 for its keyword. The Content Quality Score is a weighted average of the 11 dimensions below (10 content dimensions plus E-E-A-T) and the page title and meta description. Information Gain is reported outside the score.',
    '',
    ...dimensionSlugsEn().map((s) => `- [${DIMENSIONS_EN[s].name}](/dimensions/${s}.md) - ${DIMENSIONS_EN[s].description}`),
    '',
  ].join('\n');
}

function toolsIndex(): string {
  return [
    '# Tools',
    '',
    ...toolSlugsEn().map((s) => `- [${TOOLS_EN[s].name}](/tools/${s}.md) - ${TOOLS_EN[s].description}`),
    '',
  ].join('\n');
}

/**
 * Wpisy changelogu wspominają znaczniki dosłownie („blok <script>”). Renderer Markdowna wziąłby
 * je za HTML i ukrył - w kodzie inline zostają tekstem.
 */
function codeTags(s: string): string {
  return s.replace(/<\/?[a-zA-Z][^<>]*>/g, (tag) => `\`${tag}\``);
}

/** `log.md` wg OKF §9: nagłówki dat od najnowszej, pod nimi wpisy prozą. */
async function changeLog(): Promise<string> {
  const entries = await getChangelog();
  const out = ['# Change log', ''];
  let current = '';
  for (const e of entries) {
    if (e.date !== current) {
      current = e.date;
      out.push(`## ${e.date}`, '');
    }
    out.push(`**${codeTags(e.title.en)}** ${codeTags(e.description.en)}`, '');
  }
  return out.join('\n');
}

/** Ścieżka w paczce (bez `/knowledge`) → treść pliku. */
export async function knowledgeFiles(): Promise<Record<string, string>> {
  const files: Record<string, string> = {
    'index.md': rootIndex(),
    'product.md': productDoc(),
    'api.md': apiDoc(),
    'mcp.md': mcpDoc(),
    'dimensions/index.md': dimensionsIndex(),
    'tools/index.md': toolsIndex(),
    'log.md': await changeLog(),
  };
  for (const s of dimensionSlugsEn()) files[`dimensions/${s}.md`] = dimensionDoc(s);
  for (const s of toolSlugsEn()) files[`tools/${s}.md`] = toolDoc(s);
  return files;
}

// --- llms.txt ------------------------------------------------------------------------------

export function llmsTxt(): string {
  const k = (p: string) => `${SITE}${KNOWLEDGE_BASE}/${p}`;
  return [
    `# ${PRODUCT.name}`,
    '',
    `> ${PRODUCT.summary}`,
    '',
    `Pricing: ${PRODUCT.pricing} Every page below has a Markdown version in the knowledge bundle (Open Knowledge Format v${OKF_VERSION}) at ${SITE}${KNOWLEDGE_BASE}/index.md.`,
    '',
    '## Product',
    '',
    `- [How the auditor works](${SITE}/how-it-works): from a URL to before/after fixes, step by step`,
    `- [Scoring dimensions](${SITE}/dimensions): the 11 dimensions (10 content dimensions plus E-E-A-T) behind the Content Quality Score, plus Information Gain`,
    `- [Pricing](${SITE}/pricing): free audits, price per audit, credit packages`,
    `- [Product overview (Markdown)](${k('product.md')}): what an audit returns, pricing, tools`,
    `- [Sample report](${PRODUCT.sampleReport}): a real shared audit report`,
    `- [Changelog](${SITE}/changelog): product changes, newest first`,
    '',
    '## Scoring dimensions',
    '',
    ...dimensionSlugsEn().map((s) => `- [${DIMENSIONS_EN[s].name}](${SITE}/dimensions/${s}): ${DIMENSIONS_EN[s].description} Markdown: ${k(`dimensions/${s}.md`)}`),
    '',
    '## Tools',
    '',
    ...toolSlugsEn().map((s) => `- [${TOOLS_EN[s].name}](${SITE}/tools/${s}): ${TOOLS_EN[s].description} Markdown: ${k(`tools/${s}.md`)}`),
    '',
    '## API',
    '',
    `- [API overview](${SITE}/api): REST + JSON, API key auth, bulk requests, 1 audit = 1 credit`,
    `- [API reference (Markdown)](${APP}/api-docs.md): full endpoint reference for agents`,
    `- [MCP server](${SITE}/mcp): run audits and read results from Claude Code, Claude Desktop, Cursor and other MCP clients (Streamable HTTP at ${APP}/api/mcp, same API key and credits); setup in ${APP}/api-docs#mcp. Markdown: ${k('mcp.md')}`,
    `- [Claude skill for CitationOne](${APP}/skills/citationone/SKILL.md): teaches Claude to use the MCP tools in agency work (cost confirmation, reading scores against the top 10, multi-page priority lists, before/after comparisons, client summary template)`,
    '',
    '## Blog',
    '',
    ...blogPostsFor('en').map((p) => `- [${p.t.title}](${SITE}/blog/${p.t.slug}): ${p.t.description}`),
    ...BLOG_POSTS.filter((p) => p.pl && !p.en).map((p) => `- [${p.pl!.title}](${SITE}/pl/blog/${p.pl!.slug}) (Polish): ${p.pl!.description}`),
    '',
    '## Optional',
    '',
    `- [Knowledge bundle index](${k('index.md')}): entry point of the Open Knowledge Format bundle`,
    `- [Change log (Markdown)](${k('log.md')}): the changelog as an OKF log`,
    `- [Referral program](${SITE}/affiliate): 10% commission on referred orders`,
    `- [Polish version](${SITE}/pl): the whole site in Polish, including [dimensions](${SITE}/pl/wymiary) and [pricing](${SITE}/pl/cennik)`,
    '',
  ].join('\n');
}
