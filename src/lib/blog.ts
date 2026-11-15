import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Marked, type Token, type Tokens } from 'marked';
import { BLOG_POSTS, type BlogLang } from '@/data/blog';

// Tresc wpisow bloga: `content/blog/<lang>/<slug>.md` -> HTML w czasie builda (static export).
// Pliki pisze zespol w repo, wiec HTML z Markdowna jest zaufany i nie przechodzi sanitizacji.

// Kod znaku zamiast literalu - kontrola `grep -r` z CLAUDE.md (em dash w src/) ma zwracac pusto.
const EM_DASH = String.fromCharCode(0x2014);

const CONTENT_DIR =path.join(process.cwd(), 'content', 'blog');

export interface TocItem {
  id: string;
  label: string;
}

export interface RenderedPost {
  html: string;
  toc: TocItem[];
  readingMinutes: number;
  /** Liczba slow tresci - `wordCount` w schema BlogPosting. */
  wordCount: number;
  /** Pytania z sekcji „Najczęstsze pytania” (H3 + tresc pod nim) - do schema FAQPage. */
  faq: FaqItem[];
}

export interface FaqItem {
  q: string;
  a: string;
}

/** `Jak zacząć?` -> `jak-zaczac` - kotwice H2 bez polskich znakow i interpunkcji. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Cudzyslow w alt/title/href (np. `Wynik "CQS"`) zamykalby atrybut i psul HTML. */
function attr(v: string): string {
  return v.replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Spis tresci renderuje React, ktory sam escapuje tekst - encje z HTML-a marked trzeba odkodowac. */
function decodeEntities(v: string): string {
  return v
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&');
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) && !/^https:\/\/(www\.)?citationone\.com(\/|$)/.test(href);
}

/**
 * Ramka „najwazniejsze informacje” z zarowka. Dwa zapisy w Markdownie:
 * 1. akapit „Najwazniejsze informacje…:” / „Key takeaways…:” (konczy sie dwukropkiem), a zaraz pod
 *    nim lista - tak pisze skill lp-article, wiec artykuly nie potrzebuja zadnej skladni;
 * 2. jawnie: `> [!KEY] Opcjonalny tytul` + tresc cytatu (dowolne bloki).
 */
const KEY_LEAD = /^(najważniejsze|najwazniejsze|kluczowe|w skrócie|w skrocie|key takeaways|key points|key facts|in short|tl;dr)\b[^\n]*:$/i;
const KEY_TITLE: Record<BlogLang, string> = { pl: 'Najważniejsze informacje', en: 'Key takeaways' };
const BULB =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/></svg>';

function keyBox(titleHtml: string, bodyHtml: string): string {
  return (
    '<aside class="blog-key" role="note">' +
    `<div class="blog-key-head"><span class="blog-key-icon">${BULB}</span><p class="blog-key-title">${titleHtml}</p></div>` +
    `<div class="blog-key-body">${bodyHtml}</div></aside>\n`
  );
}

/**
 * Box „Zapamiętaj!” - jedna, najważniejsza zasada sekcji w osobnej ramce. Zapis w Markdownie:
 * `> [!ZAPAMIETAJ] Opcjonalny tytul` + tresc cytatu (alias `[!REMEMBER]` dla EN).
 */
const REMEMBER_RE = /^\[!(?:ZAPAMIETAJ|ZAPAMIĘTAJ|REMEMBER)\][ \t]*([^\n]*)\n?([\s\S]*)$/i;
const REMEMBER_TITLE: Record<BlogLang, string> = { pl: 'Zapamiętaj!', en: 'Remember!' };
const PIN =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';

function rememberBox(titleHtml: string, bodyHtml: string): string {
  return (
    '<aside class="blog-remember" role="note">' +
    `<p class="blog-remember-title"><span class="blog-remember-icon">${PIN}</span>${titleHtml}</p>` +
    `<div class="blog-remember-body">${bodyHtml}</div></aside>\n`
  );
}

const FAQ_HEADING = /^(najczęstsze pytania|najczestsze pytania|faq|frequently asked questions|common questions)\b/i;

function htmlToken(html: string): Token {
  return { type: 'html', raw: html, text: html, block: true, pre: false } as Token;
}

function render(markdown: string, lang: BlogLang): { html: string; toc: TocItem[]; faq: FaqItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      // H1 strony daje szablon z rejestru, wiec `#` w tresci schodzi do H2.
      heading(this: { parser: { parseInline(t: Tokens.Generic[]): string } }, { tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const level = Math.max(2, depth);
        const base = slugify(inner) || 'section';
        const n = (used.get(base) ?? 0) + 1;
        used.set(base, n);
        const id = n === 1 ? base : `${base}-${n}`;
        if (level === 2) toc.push({ id, label: decodeEntities(inner.replace(/<[^>]+>/g, '')) });
        return `<h${level} id="${id}">${inner}</h${level}>\n`;
      },
      link(this: { parser: { parseInline(t: Tokens.Generic[]): string } }, { href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const t = title ? ` title="${attr(title)}"` : '';
        const ext = isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${attr(href)}"${t}${ext}>${inner}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const t = title ? ` title="${attr(title)}"` : '';
        return `<img src="${attr(href)}" alt="${attr(text)}"${t} loading="lazy" decoding="async" />`;
      },
      // Szeroka tabela przewija sie w swoim pudelku zamiast rozpychac strone na telefonie.
      table(this: { parser: { parseInline(t: Tokens.Generic[]): string } }, token: Tokens.Table) {
        const cell = (c: Tokens.TableCell, tag: 'th' | 'td') => {
          const align = c.align ? ` style="text-align:${c.align}"` : '';
          return `<${tag}${align}>${this.parser.parseInline(c.tokens)}</${tag}>`;
        };
        const head = `<tr>${token.header.map((c) => cell(c, 'th')).join('')}</tr>`;
        const body = token.rows.map((r) => `<tr>${r.map((c) => cell(c, 'td')).join('')}</tr>`).join('');
        return `<div class="blog-table"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>\n`;
      },
    },
  });
  const tokens = marked.lexer(markdown);
  const out: Token[] = [];
  let inFaq = false;
  // FAQ do schema: H3 w sekcji FAQ = pytanie, tokeny do kolejnego naglowka = odpowiedz (czysty tekst).
  const faq: FaqItem[] = [];
  let faqQ: string | null = null;
  let faqA: Token[] = [];
  const plain = (h: string) => decodeEntities(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  const flushFaq = () => {
    if (faqQ) {
      const a = plain(marked.parser(faqA));
      if (a) faq.push({ q: faqQ, a });
    }
    faqQ = null;
    faqA = [];
  };
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.type === 'heading') flushFaq();
    // Sekcja FAQ (od H2 „Najczęstsze pytania” do kolejnego H2) dostaje wrapper `.blog-faq` - mniejsza czcionka.
    if (tok.type === 'heading' && tok.depth <= 2) {
      if (inFaq) out.push(htmlToken('</section>\n'));
      inFaq = FAQ_HEADING.test(tok.text.trim());
      if (inFaq) out.push(htmlToken('<section class="blog-faq">\n'));
    }
    if (inFaq && tok.type === 'heading' && tok.depth === 3) faqQ = plain(marked.parseInline(tok.text) as string);
    else if (inFaq && faqQ && tok.type !== 'space') faqA.push(tok);
    // Zapis 1: akapit-zapowiedz z dwukropkiem + lista bezposrednio pod nim.
    if (tok.type === 'paragraph' && KEY_LEAD.test(tok.text.trim())) {
      let j = i + 1;
      while (tokens[j]?.type === 'space') j++;
      const list = tokens[j];
      if (list?.type === 'list') {
        const title = marked.parseInline(tok.text.trim().replace(/:$/, '')) as string;
        out.push(htmlToken(keyBox(title, marked.parser([list]))));
        i = j;
        continue;
      }
    }
    // Zapis 2: > [!KEY] Tytul
    if (tok.type === 'blockquote') {
      const r = tok.text.match(REMEMBER_RE);
      if (r) {
        const title = r[1].trim() ? (marked.parseInline(r[1].trim()) as string) : REMEMBER_TITLE[lang];
        out.push(htmlToken(rememberBox(title, marked.parse(r[2], { async: false }) as string)));
        continue;
      }
      const m = tok.text.match(/^\[!KEY\][ \t]*([^\n]*)\n?([\s\S]*)$/i);
      if (m) {
        const title = m[1].trim() ? (marked.parseInline(m[1].trim()) as string) : KEY_TITLE[lang];
        out.push(htmlToken(keyBox(title, marked.parse(m[2], { async: false }) as string)));
        continue;
      }
    }
    out.push(tok);
  }
  flushFaq();
  if (inFaq) out.push(htmlToken('</section>\n'));
  const html = marked.parser(out);
  return { html, toc, faq };
}

function countWords(markdown: string): number {
  return markdown.replace(/[#>*_`|\-\[\]()!]/g, ' ').split(/\s+/).filter(Boolean).length;
}

/** ~200 slow/min, zaokraglone w gore, minimum 1. */
function readingMinutes(words: number): number {
  return Math.max(1, Math.ceil(words / 200));
}

const cache = new Map<string, Promise<RenderedPost>>();

/**
 * Wyrenderowany wpis. Brak pliku albo em dash w tresci PRZERYWA build - wpis w rejestrze bez
 * tresci dalby pusta strone w indeksie, a zasada „dywiz, nie em dash" obowiazuje cale repo.
 */
export function renderPost(lang: BlogLang, slug: string): Promise<RenderedPost> {
  const key = `${lang}/${slug}`;
  let p = cache.get(key);
  if (!p) {
    p = (async () => {
      const file = path.join(CONTENT_DIR, lang, `${slug}.md`);
      let md: string;
      try {
        md = await readFile(file, 'utf8');
      } catch {
        throw new Error(`Blog: brak pliku ${path.relative(process.cwd(), file)} dla wpisu z rejestru src/data/blog.ts`);
      }
      if (md.includes(EM_DASH)) throw new Error(`Blog: em dash w ${key}.md - uzyj dywizu "-"`);
      const { html, toc, faq } = render(md, lang);
      const wordCount = countWords(md);
      return { html, toc, readingMinutes: readingMinutes(wordCount), wordCount, faq };
    })();
    cache.set(key, p);
  }
  return p;
}

/** Kontrola rejestru przy buildzie: daty w formacie YYYY-MM-DD i unikalne slugi per jezyk. */
export function assertBlogRegistry(): void {
  const date = /^\d{4}-\d{2}-\d{2}$/;
  for (const lang of ['pl', 'en'] as const) {
    const seen = new Set<string>();
    for (const p of BLOG_POSTS) {
      const t = p[lang];
      if (!t) continue;
      if (seen.has(t.slug)) throw new Error(`Blog: zdublowany slug ${lang}/${t.slug}`);
      seen.add(t.slug);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug)) throw new Error(`Blog: niepoprawny slug ${lang}/${t.slug}`);
    }
  }
  for (const p of BLOG_POSTS) {
    if (!date.test(p.date) || (p.updated && !date.test(p.updated))) throw new Error(`Blog: zla data we wpisie ${p.id}`);
    for (const t of [p.pl, p.en]) if (t && (t.title + t.description).includes(EM_DASH)) throw new Error(`Blog: em dash w metadanych ${p.id}`);
  }
}
