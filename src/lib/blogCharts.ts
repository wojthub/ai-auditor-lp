import type { BlogLang } from '@/data/blog';
import { BLOG_CHARTS, type BarChart, type BlogChart, type ChartTone, type ColumnChart, type MatrixChart } from '@/data/blogCharts';

/**
 * Wykres z `src/data/blogCharts.ts` jako HTML (figure + inline SVG) - wolane przez `src/lib/blog.ts`
 * przy buildzie dla znacznika `<figure data-chart="id"></figure>`.
 *
 * Responsywnosc: kazdy wykres ma DWA uklady - szeroki (viewBox 640) i waski (viewBox 360, telefon).
 * Przelacza je CSS (`.bc-wide` / `.bc-narrow` w BlogPostView). Samo skalowanie jednego SVG dawaloby
 * na telefonie tekst ~7 px, wiec waski uklad przestawia elementy: kolumny -> paski poziome,
 * etykiety nad paskiem, macierz z numerami fraz i legenda pod spodem, kafelki jeden pod drugim.
 *
 * Kazdy slupek/komorka to `<g class="bc-mark" tabindex="0" data-tip="...">` - podpowiedz pokazuje
 * `BlogChartTips` (komponent kliencki).
 */

const INK = '#0d0d12';
const MUTED = '#666d80';
const SUBTLE = '#818898';
const FAINT = '#a4acb9';
const GRID = '#dfe1e7';
const BODY = '#36394a';
const ACCENT = '#0b7983';
const CLUSTER = '#c8602f';
const BRAND = 'CitationOne';
const TONE: Record<ChartTone, string> = { accent: ACCENT, light: '#9fd0d5', gray: '#8b93a3', warn: '#e07a4a' };
const SCALE = ['#f4f7f8', '#cfe8ea', '#9fd0d5', '#4fa3ac', ACCENT];

interface Ctx {
  W: number;
  narrow: boolean;
  lang: BlogLang;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const r = (n: number) => Math.round(n * 100) / 100;
const num = (v: number, d: number, lang: BlogLang) => (lang === 'pl' ? v.toFixed(d).replace('.', ',') : v.toFixed(d));
const fmt = (v: number, c: BlogChart, lang: BlogLang) => num(v, c.decimals, lang) + (c.unit ?? '');
/** Przyblizona szerokosc tekstu - Inter ~0.55 em na znak. */
const textW = (s: string, size: number) => s.length * size * 0.55;

function wrap(s: string, size: number, maxW: number): string[] {
  const lines: string[] = [];
  let cur = '';
  for (const w of s.split(' ')) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && textW(next, size) > maxW) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

function text(x: number, y: number, s: string, o: { size?: number; weight?: number; fill?: string; anchor?: 'start' | 'middle' | 'end' } = {}) {
  const a = o.anchor && o.anchor !== 'start' ? ` text-anchor="${o.anchor}"` : '';
  return `<text x="${r(x)}" y="${r(y)}"${a} font-size="${o.size ?? 14}"${o.weight ? ` font-weight="${o.weight}"` : ''} fill="${o.fill ?? INK}">${esc(s)}</text>`;
}

function mark(tip: string, inner: string) {
  return `<g class="bc-mark" tabindex="0" role="img" aria-label="${esc(tip)}" data-tip="${esc(tip)}">${inner}</g>`;
}

/** Slupek z zaokraglonym koncem 4 px i prostym bokiem przy osi. */
function columnPath(x: number, w: number, top: number, base: number) {
  const rad = Math.min(4, (base - top) / 2);
  return `M${r(x)},${r(base)} V${r(top + rad)} Q${r(x)},${r(top)} ${r(x + rad)},${r(top)} H${r(x + w - rad)} Q${r(x + w)},${r(top)} ${r(x + w)},${r(top + rad)} V${r(base)} Z`;
}
function barPath(x0: number, y: number, len: number, h: number) {
  const rad = Math.min(4, len / 2);
  const e = x0 + len;
  return `M${r(x0)},${r(y)} H${r(e - rad)} Q${r(e)},${r(y)} ${r(e)},${r(y + rad)} V${r(y + h - rad)} Q${r(e)},${r(y + h)} ${r(e - rad)},${r(y + h)} H${r(x0)} Z`;
}

/** Tytul i podtytul z zawijaniem; zwraca y, od ktorego zaczyna sie wykres. */
function header(c: BlogChart, ctx: Ctx): { s: string; y: number } {
  const tSize = ctx.narrow ? 18 : 21;
  const sSize = ctx.narrow ? 13 : 14;
  let s = '';
  let y = ctx.narrow ? 30 : 40;
  for (const l of wrap(c.title[ctx.lang], tSize, ctx.W - 48)) {
    s += text(24, y, l, { size: tSize, weight: 700 });
    y += tSize + 6;
  }
  y += 2;
  for (const l of wrap(c.subtitle[ctx.lang], sSize, ctx.W - 48)) {
    s += text(24, y, l, { size: sSize, fill: MUTED });
    y += sSize + 5;
  }
  return { s, y: y + 10 };
}

// ---------- kolumny (tylko szeroki uklad; waski = paski poziome) ----------

function columns(c: ColumnChart, ctx: Ctx, startY: number): { body: string; h: number } {
  const { lang } = ctx;
  const x0 = 64, x1 = ctx.W - 24;
  const top = startY + 44, base = top + 240;
  const k = (base - top) / c.max;
  const y = (v: number) => base - v * k;
  const slot = (x1 - x0) / c.values.length;
  const bw = Math.min(36, slot * 0.66);
  let s = '';
  for (const t of c.ticks) {
    s += `<line x1="${x0}" x2="${x1}" y1="${r(y(t))}" y2="${r(y(t))}" stroke="${t === 0 ? '#8b93a3' : GRID}" stroke-width="1"/>`;
    s += text(x0 - 10, y(t) + 5, `${t}${c.unit ?? ''}`, { size: 13, fill: SUBTLE, anchor: 'end' });
  }
  if (c.band) {
    const vals = c.values.slice(c.band.from, c.band.to + 1);
    const bt = y(Math.max(...vals)), bb = y(Math.min(...vals));
    const bx = x0 + c.band.from * slot + 4, bx2 = x0 + (c.band.to + 1) * slot - 4;
    s += `<rect x="${r(bx)}" y="${r(bt)}" width="${r(bx2 - bx)}" height="${r(bb - bt)}" fill="#e6f4f5" rx="4"/>`;
    s += text((bx + bx2) / 2, bt - 34, c.band.label[lang], { size: 14, weight: 600, fill: ACCENT, anchor: 'middle' });
  }
  c.values.forEach((v, i) => {
    const cx = x0 + i * slot + slot / 2;
    const tip = `${c.categoryLabel[lang]} ${c.categories[i]}: ${fmt(v, c, lang)}`;
    s += mark(
      tip,
      `<rect x="${r(x0 + i * slot)}" y="${top - 30}" width="${r(slot)}" height="${base - top + 30}" fill="transparent"/>` +
        `<path class="bc-fill" d="${columnPath(cx - bw / 2, bw, y(v), base)}" fill="${ACCENT}"/>` +
        text(cx, y(v) - 8, fmt(v, c, lang), { size: 13, weight: i === 0 ? 700 : 500, anchor: 'middle' }),
    );
    s += text(cx, base + 22, c.categories[i], { size: 14, fill: MUTED, anchor: 'middle' });
  });
  s += text((x0 + x1) / 2, base + 46, c.axisLabel[lang], { size: 13, fill: SUBTLE, anchor: 'middle' });
  return { body: s, h: base + 58 };
}

/** Kolumny na telefonie jako paski poziome (10 kolumn nie miesci podpisow w 360 px). */
function columnsAsBars(c: ColumnChart, ctx: Ctx, startY: number) {
  const bar: BarChart = {
    ...c,
    type: 'bars',
    labels: { pl: c.categories.map((x) => `${c.categoryLabel.pl} ${x}`), en: c.categories.map((x) => `${c.categoryLabel.en} ${x}`) },
    tones: c.values.map((_, i) => (c.band && i >= c.band.from && i <= c.band.to ? 'light' : 'accent')),
    ticks: c.ticks,
    legend: c.band ? { tone: 'light', label: c.band.label } : undefined,
  };
  return bars(bar, ctx, startY);
}

// ---------- paski poziome ----------

function bars(c: BarChart, ctx: Ctx, startY: number): { body: string; h: number } {
  const { lang, W, narrow } = ctx;
  const labels = c.labels[lang];
  let s = '';
  // Szeroki: etykieta w kolumnie po lewej. Waski: etykieta nad paskiem, pasek na cala szerokosc.
  const labelW = Math.max(...labels.map((l) => textW(l, 14.5)));
  const x0 = narrow ? 24 : Math.max(200, 24 + labelW + 14);
  const x1 = W - (narrow ? 64 : 80);
  const k = (x1 - x0) / c.max;
  const top = startY + (c.reference ? 22 : 4);
  const step = narrow ? 50 : 36;
  const bh = narrow ? 18 : 22;
  const barOff = narrow ? 22 : 0;
  const yEnd = top + 8 + labels.length * step - (narrow ? 4 : 0);
  for (const t of c.ticks) {
    const x = x0 + t * k;
    s += `<line x1="${r(x)}" x2="${r(x)}" y1="${top}" y2="${yEnd}" stroke="${t === 0 ? '#8b93a3' : GRID}"${t === 0 ? '' : ' stroke-dasharray="4 4"'}/>`;
    s += text(x, yEnd + 18, `${t}${c.unit ?? ''}`, { size: 13, fill: SUBTLE, anchor: 'middle' });
  }
  if (c.reference) {
    const x = x0 + c.reference.value * k;
    s += `<line x1="${r(x)}" x2="${r(x)}" y1="${top - 6}" y2="${yEnd}" stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    s += text(Math.min(x, W - 24 - textW(c.reference.label[lang], 13) / 2), top - 12, c.reference.label[lang], { size: 13, fill: MUTED, anchor: 'middle' });
  }
  labels.forEach((l, i) => {
    const y = top + 8 + i * step;
    const v = c.values[i];
    const len = v * k;
    const strong = c.tones[i] === 'accent';
    const tip = `${l}: ${fmt(v, c, lang)}`;
    const label = narrow ? text(x0, y + 14, l, { size: 14, weight: strong ? 600 : 400 }) : text(x0 - 12, y + 16, l, { size: 14.5, weight: strong ? 600 : 400, anchor: 'end' });
    const by = y + barOff;
    s += mark(
      tip,
      `<rect x="16" y="${r(y - 6)}" width="${W - 32}" height="${step}" fill="transparent"/>` +
        label +
        `<path class="bc-fill" d="${barPath(x0, by, len, bh)}" fill="${TONE[c.tones[i]]}"/>` +
        text(x0 + len + 8, by + bh / 2 + 5, fmt(v, c, lang), { size: 14, weight: 700 }),
    );
  });
  let h = yEnd + 34;
  if (c.legend) {
    s += `<rect x="24" y="${h}" width="14" height="14" rx="3" fill="${TONE[c.legend.tone]}"/>` + text(44, h + 12, c.legend.label[lang], { size: 13, fill: BODY });
    h += 28;
  }
  if (c.tiles?.length) {
    const cols = narrow ? 1 : c.tiles.length;
    const gap = 12, tw = (W - 48 - gap * (cols - 1)) / cols;
    c.tiles.forEach((t, i) => {
      const tx = 24 + (i % cols) * (tw + gap);
      const ty = h + Math.floor(i / cols) * (62 + gap);
      const val = t.value[lang];
      const lines = wrap(t.label[lang], 13.5, tw - 32 - textW(val, 20) - 12);
      s += `<rect x="${r(tx)}" y="${ty}" width="${r(tw)}" height="62" rx="12" fill="#f4f7f8"/>`;
      s += text(tx + 16, ty + 38, val, { size: 20, weight: 700, fill: ACCENT });
      const lx = tx + 16 + textW(val, 20) + 12;
      lines.slice(0, 2).forEach((ln, j) => (s += text(lx, ty + (lines.length > 1 ? 28 + j * 19 : 37), ln, { size: 13.5, fill: BODY })));
    });
    h += Math.ceil(c.tiles.length / cols) * (62 + gap) + 2;
  }
  return { body: s, h };
}

// ---------- macierz ----------

function plural(n: number, c: MatrixChart, lang: BlogLang) {
  if (lang === 'en') return n === 1 ? c.unitWord.one.en : c.unitWord.many.en;
  if (n === 1) return c.unitWord.one.pl;
  const d = n % 10, dd = n % 100;
  return d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? c.unitWord.few.pl : c.unitWord.many.pl;
}

function matrix(c: MatrixChart, ctx: Ctx, startY: number): { body: string; h: number } {
  const { lang, W, narrow } = ctx;
  const labels = c.labels[lang];
  const n = labels.length;
  const rowLabels = labels.map((l, i) => (narrow ? String(i + 1) : `${i + 1}. ${l}`));
  const labelW = Math.max(...rowLabels.map((l) => textW(l, 14)));
  const step = narrow ? Math.floor((W - 24 - 44) / n) : 48;
  const cell = step - 2;
  const x0 = narrow ? 44 : Math.min(Math.max(197, 24 + labelW + 14), W - 24 - n * step);
  const y0 = startY + 26;
  const vSize = narrow ? 13 : 14;
  let s = '';
  for (let j = 0; j < n; j++) s += text(x0 + j * step + cell / 2, y0 - 10, String(j + 1), { size: 13, fill: SUBTLE, anchor: 'middle' });
  for (let i = 0; i < n; i++) {
    const inCluster = c.cluster && i >= c.cluster.from && i <= c.cluster.to;
    s += text(x0 - 10, y0 + i * step + cell / 2 + 5, rowLabels[i], { size: narrow ? 13 : 14, weight: inCluster ? 600 : 400, fill: narrow ? SUBTLE : INK, anchor: 'end' });
    for (let j = 0; j < n; j++) {
      const x = x0 + j * step, y = y0 + i * step;
      if (i === j) {
        s += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="4" fill="#ffffff" stroke="${GRID}"/>` + text(x + cell / 2, y + cell / 2 + 5, '-', { size: vSize, fill: FAINT, anchor: 'middle' });
        continue;
      }
      const v = c.cells[i][j];
      const fill = SCALE[Math.max(0, Math.min(SCALE.length - 1, Math.round((v / c.max) * (SCALE.length - 1))))];
      const tip = `${labels[i]} × ${labels[j]}: ${v} ${plural(v, c, lang)}`;
      s += mark(
        tip,
        `<rect class="bc-fill" x="${x}" y="${y}" width="${cell}" height="${cell}" rx="4" fill="${fill}"/>` +
          text(x + cell / 2, y + cell / 2 + 5, String(v), { size: vSize, weight: v ? 700 : 400, fill: v === 0 ? FAINT : v / c.max >= 0.7 ? '#ffffff' : INK, anchor: 'middle' }),
      );
    }
  }
  if (c.cluster) {
    const a = x0 + c.cluster.from * step - 3, b = y0 + c.cluster.from * step - 3;
    const size = (c.cluster.to - c.cluster.from + 1) * step - 2 + 6;
    s += `<rect x="${a}" y="${b}" width="${size}" height="${size}" rx="7" fill="none" stroke="${CLUSTER}" stroke-width="2" pointer-events="none"/>`;
  }
  let ly = y0 + n * step + 18;
  // Na telefonie nazwy fraz pod macierza (w dwoch kolumnach).
  if (narrow) {
    const colW = (W - 48) / 2;
    labels.forEach((l, i) => {
      const col = i < Math.ceil(n / 2) ? 0 : 1;
      const row = col ? i - Math.ceil(n / 2) : i;
      s += text(24 + col * colW, ly + 14 + row * 20, `${i + 1}. ${l}`, { size: 13, fill: BODY });
    });
    ly += Math.ceil(n / 2) * 20 + 12;
  }
  s += text(24, ly + 12, c.legendLabel[lang], { size: 13, fill: MUTED });
  let lx = 24 + textW(c.legendLabel[lang], 13) + 10;
  const swStep = narrow ? 36 : 44;
  for (let v = 0; v <= c.max; v++) {
    const fill = SCALE[Math.round((v / c.max) * (SCALE.length - 1))];
    s += `<rect x="${r(lx)}" y="${ly}" width="16" height="16" rx="3" fill="${fill}" stroke="${GRID}"/>` + text(lx + 21, ly + 13, String(v), { size: 13, fill: BODY });
    lx += swStep;
  }
  if (c.cluster) {
    const label = c.cluster.label[lang];
    if (narrow || lx + 30 + textW(label, 13) > W - 24) {
      ly += 26;
      lx = 24;
    } else lx += 8;
    s += `<rect x="${r(lx)}" y="${ly}" width="16" height="16" rx="3" fill="none" stroke="${CLUSTER}" stroke-width="2"/>` + text(lx + 24, ly + 13, label, { size: 13, fill: BODY });
  }
  return { body: s, h: ly + 30 };
}

// ---------- wejscie ----------

let uid = 0;

function svg(c: BlogChart, id: string, ctx: Ctx): string {
  const head = header(c, ctx);
  const { body, h: bodyEnd } =
    c.type === 'columns' ? (ctx.narrow ? columnsAsBars(c, ctx, head.y) : columns(c, ctx, head.y)) : c.type === 'bars' ? bars(c, ctx, head.y) : matrix(c, ctx, head.y);
  const h = bodyEnd + 28;
  const tid = `bc-${id}-${ctx.lang}-${++uid}`;
  return (
    `<svg class="bc-svg ${ctx.narrow ? 'bc-narrow' : 'bc-wide'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ctx.W} ${h}" width="${ctx.W}" height="${h}" role="group" aria-labelledby="${tid}-t ${tid}-d" font-family="Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">` +
    `<title id="${tid}-t">${esc(c.title[ctx.lang])}</title><desc id="${tid}-d">${esc(c.summary[ctx.lang])}</desc>` +
    `<rect width="${ctx.W}" height="${h}" fill="#ffffff"/>` +
    head.s +
    body +
    text(ctx.W - 24, h - 12, BRAND, { size: 13, weight: 600, fill: ACCENT, anchor: 'end' }) +
    `</svg>`
  );
}

export function renderChart(id: string, lang: BlogLang): string {
  const c = BLOG_CHARTS[id];
  if (!c) throw new Error(`Blog: nieznany wykres data-chart="${id}" - dodaj go w src/data/blogCharts.ts`);
  const wide = svg(c, id, { W: 640, narrow: false, lang });
  const narrow = svg(c, id, { W: 360, narrow: true, lang });
  return `<figure class="blog-chart" data-chart="${esc(id)}">${wide}${narrow}<figcaption>${esc(c.caption[lang])}</figcaption></figure>\n`;
}
