// Generuje 5 grafik SVG do wpisów bloga LP (paleta CitationOne). Wynik: ai-auditor-lp/public/blog/pl/*.svg
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = 'C:/Users/wojci/antigravity-repo/ai-auditor-lp/public/blog/pl';
mkdirSync(OUT, { recursive: true });

const C = {
  teal: '#0b7983', tealLight: '#a8d5d9', tealBg: '#e6f4f5', ink: '#0d0d12', muted: '#666d80', subtle: '#818898',
  line: '#dfe1e7', surface: '#f8fafb', gray: '#8b93a3', grayLight: '#e3e6eb', orange: '#c8602f', orangeBg: '#fdf1ea', white: '#ffffff',
};
const FONT = `Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pct = (v) => v.toFixed(1).replace('.', ',') + '%';
const num = (v) => v.toFixed(1).replace('.', ',');

function svg(w, h, title, desc, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d" font-family="${FONT}">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<rect width="${w}" height="${h}" fill="${C.white}"/>
${body}
<text x="${w - 24}" y="${h - 16}" text-anchor="end" font-size="13" font-weight="600" fill="${C.teal}">CitationOne</text>
</svg>\n`;
}
const text = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''} font-size="${o.size || 16}"${o.weight ? ` font-weight="${o.weight}"` : ''} fill="${o.fill || C.ink}">${esc(s)}</text>`;
const lines = (x, y, arr, o = {}) => arr.map((s, i) => text(x, y + i * (o.lh || 20), s, o)).join('\n');
// Słupek z zaokrąglonym końcem danych (4px), płaski przy osi.
function barV(x, yBase, w, h, fill) {
  const r = Math.min(4, h);
  return `<path d="M${x},${yBase} V${yBase - h + r} Q${x},${yBase - h} ${x + r},${yBase - h} H${x + w - r} Q${x + w},${yBase - h} ${x + w},${yBase - h + r} V${yBase} Z" fill="${fill}"/>`;
}
function barH(x, y, w, h, fill) {
  const r = Math.min(4, w);
  return `<path d="M${x},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x} Z" fill="${fill}"/>`;
}

// 1. AI Overviews - pozycja a cytowanie
{
  const data = [59.9, 52.9, 46.8, 40.8, 35.3, 33.2, 32.9, 28.6, 27.8, 28.9];
  const W = 640, H = 430, x0 = 64, x1 = 616, base = 350, top = 110, max = 70;
  const y = (v) => base - (v / max) * (base - top);
  const band = (x1 - x0) / 10, bw = 36;
  let b = '';
  b += text(24, 40, 'Pozycja w TOP 10 a cytowanie w AI Overview', { size: 21, weight: 700 });
  b += text(24, 66, '996 polskich SERP-ów z audytów CitationOne, stan na 10.11.2026', { size: 14, fill: C.muted });
  for (const g of [0, 20, 40, 60]) {
    b += `<line x1="${x0}" x2="${x1}" y1="${y(g)}" y2="${y(g)}" stroke="${g === 0 ? C.gray : C.line}" stroke-width="1"/>`;
    b += text(x0 - 10, y(g) + 5, g + '%', { size: 13, fill: C.subtle, anchor: 'end' });
  }
  // pasmo 6-10
  const bx = x0 + band * 5 + 4, bxe = x1 - 4;
  b += `<rect x="${bx}" y="${y(33.2)}" width="${bxe - bx}" height="${y(27.8) - y(33.2)}" fill="${C.tealBg}" rx="4"/>`;
  b += text((bx + bxe) / 2, y(33.2) - 34, 'pozycje 6-10: pasmo ~28-33%', { size: 14, weight: 600, fill: C.teal, anchor: 'middle' });
  data.forEach((v, i) => {
    const cx = x0 + band * i + band / 2;
    b += barV(cx - bw / 2, base, bw, base - y(v), C.teal);
    b += text(cx, y(v) - 8, i < 5 || i === 9 ? pct(v).replace(',9%', ',9%') : pct(v), { size: 13, weight: i === 0 ? 700 : 500, anchor: 'middle', fill: C.ink });
    b += text(cx, base + 22, String(i + 1), { size: 14, anchor: 'middle', fill: C.muted });
  });
  b += text((x0 + x1) / 2, base + 46, 'pozycja w wynikach organicznych', { size: 13, anchor: 'middle', fill: C.subtle });
  writeFileSync(`${OUT}/aio-pozycja-a-cytowanie.svg`, svg(W, H,
    'Pozycja w TOP 10 a cytowanie w AI Overview',
    'Odsetek SERP-ów, w których strona z danej pozycji była cytowana w AI Overview: 1 - 59,9%, 2 - 52,9%, 3 - 46,8%, 4 - 40,8%, 5 - 35,3%, 6 - 33,2%, 7 - 32,9%, 8 - 28,6%, 9 - 27,8%, 10 - 28,9%.', b));
}

// 2. Badanie GEO (Princeton) - wpływ zmian w treści
{
  const rows = [
    ['Dodanie cytatów', 27.8, C.teal], ['Dodanie statystyk', 25.9, C.teal], ['Dodanie odwołań do źródeł', 24.9, C.teal],
    ['Tekst bez zmian', 19.5, C.gray], ['Upychanie słów kluczowych', 17.8, C.orange],
  ];
  const W = 640, H = 380, lx = 24, x0 = 250, x1 = 560, max = 30, top = 104, rh = 46, bh = 24;
  const x = (v) => x0 + (v / max) * (x1 - x0);
  let b = '';
  b += text(24, 40, 'Które zmiany w treści zwiększają widoczność w AI?', { size: 21, weight: 700 });
  b += text(24, 66, 'Badanie GEO (Princeton, KDD 2024), wynik widoczności w odpowiedzi AI', { size: 14, fill: C.muted });
  const by = top + rows.length * rh;
  b += `<line x1="${x(19.5)}" x2="${x(19.5)}" y1="${top - 12}" y2="${by - 8}" stroke="${C.gray}" stroke-width="1" stroke-dasharray="4 4"/>`;
  rows.forEach(([label, v, fill], i) => {
    const yy = top + i * rh;
    b += text(lx, yy + bh / 2 + 6, label, { size: 15, fill: C.ink, weight: fill === C.gray ? 400 : 500 });
    b += barH(x0, yy, x(v) - x0, bh, fill);
    b += text(x(v) + 8, yy + bh / 2 + 6, num(v), { size: 15, weight: 700 });
  });
  b += text(x(19.5), by + 12, 'poziom tekstu bez zmian', { size: 12.5, fill: C.subtle, anchor: 'middle' });
  writeFileSync(`${OUT}/badanie-geo-wyniki.svg`, svg(W, H,
    'Które zmiany w treści zwiększają widoczność w AI?',
    'Wynik widoczności w badaniu GEO: dodanie cytatów 27,8, dodanie statystyk 25,9, dodanie odwołań do źródeł 24,9, tekst bez zmian 19,5, upychanie słów kluczowych 17,8.', b));
}

// 3. Zasada zmiany daty
{
  const W = 640, H = 285, x0 = 24, x1 = 616, y0 = 112, h = 40;
  const segs = [
    [0, 20, C.grayLight, C.ink, 'poniżej 20%', 'Daty bez zmian', ['literówki, linki,', 'pojedyncze liczby']],
    [20, 50, C.tealLight, C.ink, '20-50%', 'Data aktualizacji', ['nowe dane, sekcje,', 'przebudowa struktury']],
    [50, 100, C.teal, C.white, 'ponad 50%', 'Nowa data publikacji', ['tekst w dużej części', 'napisany od nowa']],
  ];
  const x = (p) => x0 + (p / 100) * (x1 - x0);
  let b = '';
  b += text(24, 40, 'Kiedy zmienić datę przy aktualizacji artykułu?', { size: 21, weight: 700 });
  b += text(24, 66, 'Odsetek nowej lub przepisanej treści - reguła praktyczna CitationOne', { size: 14, fill: C.muted });
  segs.forEach(([a, z, fill, ink, range, decision, sub], i) => {
    const xa = x(a) + (i ? 1 : 0), xz = x(z) - (i < 2 ? 1 : 0);
    const r = i === 0 ? `M${xa + 4},${y0} H${xz} V${y0 + h} H${xa + 4} Q${xa},${y0 + h} ${xa},${y0 + h - 4} V${y0 + 4} Q${xa},${y0} ${xa + 4},${y0} Z`
      : i === 2 ? `M${xa},${y0} H${xz - 4} Q${xz},${y0} ${xz},${y0 + 4} V${y0 + h - 4} Q${xz},${y0 + h} ${xz - 4},${y0 + h} H${xa} Z`
      : `M${xa},${y0} H${xz} V${y0 + h} H${xa} Z`;
    b += `<path d="${r}" fill="${fill}"/>`;
    b += text((xa + xz) / 2, y0 + h / 2 + 6, range, { size: 15, weight: 700, fill: ink, anchor: 'middle' });
    const tx = xa + (i ? 12 : 2);
    b += text(tx, y0 + h + 34, decision, { size: 14.5, weight: 700, fill: i === 2 ? C.teal : C.ink });
    b += lines(tx, y0 + h + 58, sub, { size: 13.5, fill: C.muted, lh: 19 });
  });
  for (const p of [0, 20, 50, 100]) b += text(x(p), y0 - 10, p + '%', { size: 12.5, fill: C.subtle, anchor: p === 0 ? 'start' : p === 100 ? 'end' : 'middle' });
  writeFileSync(`${OUT}/zasada-zmiany-daty.svg`, svg(W, H,
    'Kiedy zmienić datę przy aktualizacji artykułu?',
    'Reguła CitationOne: poniżej 20% zmian daty zostają bez zmian, 20-50% zmian oznacza datę aktualizacji, ponad 50% nowej treści oznacza nową datę publikacji.', b));
}

// 4. Jak AI wybiera źródła - 3 etapy
{
  const W = 640, H = 560, cx = 24, cw = 592, ch = 118, gap = 34, top = 92;
  const steps = [
    ['Wyszukiwanie', 'Zapytania do indeksu wyszukiwarki, także na pytania', 'poboczne (query fan-out)', 'Warunek: strona w indeksie i dostępna dla robota'],
    ['Wybór fragmentów', 'Akapity, tabele i listy, które odpowiadają', 'na pytanie lub jego część', 'Warunek: sekcja zrozumiała po wycięciu z tekstu'],
    ['Synteza odpowiedzi', 'Odpowiedź napisana z wybranych fragmentów', 'z linkami do stron źródłowych', 'Efekt: cytowanie i link do Twojej strony'],
  ];
  let b = '';
  b += text(24, 40, 'Jak systemy AI wybierają źródła odpowiedzi?', { size: 21, weight: 700 });
  b += text(24, 66, 'Trzy etapy w asystencie AI z dostępem do internetu', { size: 14, fill: C.muted });
  steps.forEach(([t, d1, d2, cond], i) => {
    const y = top + i * (ch + gap);
    b += `<rect x="${cx}" y="${y}" width="${cw}" height="${ch}" rx="12" fill="${C.surface}" stroke="${C.line}"/>`;
    b += `<circle cx="${cx + 38}" cy="${y + 36}" r="17" fill="${C.teal}"/>`;
    b += text(cx + 38, y + 42, String(i + 1), { size: 17, weight: 700, fill: C.white, anchor: 'middle' });
    b += text(cx + 70, y + 34, t, { size: 18, weight: 700 });
    b += lines(cx + 70, y + 58, [d1, d2], { size: 14.5, fill: C.muted, lh: 19 });
    b += text(cx + 70, y + ch - 14, cond, { size: 13.5, weight: 600, fill: C.teal });
    if (i < 2) {
      const ay = y + ch + 6;
      b += `<path d="M${cx + 38},${ay} V${ay + gap - 14} M${cx + 31},${ay + gap - 21} L${cx + 38},${ay + gap - 13} L${cx + 45},${ay + gap - 21}" stroke="${C.gray}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  });
  writeFileSync(`${OUT}/jak-ai-wybiera-zrodla.svg`, svg(W, H,
    'Jak systemy AI wybierają źródła odpowiedzi?',
    'Trzy etapy: 1. wyszukiwanie w indeksie, także na pytania poboczne (warunek: strona w indeksie i dostępna dla robota), 2. wybór fragmentów odpowiadających na pytanie (warunek: sekcja zrozumiała po wycięciu), 3. synteza odpowiedzi z linkami do źródeł (efekt: cytowanie).', b));
}

// 5. ChatGPT - warunki cytowania
{
  const W = 640, H = 640, lx = 24, lw = 330, rx = 390, rw = 226, bh = 84, gap = 30, top = 92;
  const checks = [
    ['robots.txt dopuszcza', 'robota OAI-SearchBot', ['Strona nie pojawi się', 'w wynikach wyszukiwania', 'ChatGPT']],
    ['CDN i firewall przepuszczają', 'adresy IP robota OpenAI', ['Robot nie pobierze strony', 'mimo otwartego robots.txt']],
    ['Strona jest w indeksie', 'Google i Bing', ['Małe szanse, że ChatGPT', 'trafi na stronę']],
    ['Sekcje odpowiadają wprost,', 'z faktami i źródłami', ['ChatGPT częściej wybierze', 'fragment konkurencji']],
  ];
  let b = '';
  b += text(24, 40, 'Czy ChatGPT może zacytować Twoją stronę?', { size: 21, weight: 700 });
  b += text(24, 66, 'Cztery warunki z dokumentacji OpenAI i badań GEO, w kolejności sprawdzania', { size: 14, fill: C.muted });
  checks.forEach(([a, z, no], i) => {
    const y = top + i * (bh + gap);
    b += `<rect x="${lx}" y="${y}" width="${lw}" height="${bh}" rx="12" fill="${C.surface}" stroke="${C.line}"/>`;
    b += `<circle cx="${lx + 30}" cy="${y + bh / 2}" r="15" fill="${C.teal}"/>`;
    b += text(lx + 30, y + bh / 2 + 6, String(i + 1), { size: 15, weight: 700, fill: C.white, anchor: 'middle' });
    b += lines(lx + 58, y + 36, [a, z], { size: 15.5, weight: 600, lh: 22 });
    // Nie -> skutek
    const my = y + bh / 2;
    b += `<path d="M${lx + lw + 6},${my} H${rx - 8} M${rx - 14},${my - 6} L${rx - 7},${my} L${rx - 14},${my + 6}" stroke="${C.orange}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    b += text((lx + lw + rx) / 2, my - 8, 'nie', { size: 12.5, weight: 600, fill: C.orange, anchor: 'middle' });
    const nh = 18 + no.length * 18;
    b += `<rect x="${rx}" y="${my - nh / 2}" width="${rw}" height="${nh}" rx="10" fill="${C.orangeBg}"/>`;
    b += lines(rx + 12, my - nh / 2 + 22, no, { size: 13.5, fill: C.ink, lh: 18 });
    // Tak -> dalej
    const ay = y + bh + 4;
    b += `<path d="M${lx + 30},${ay} V${ay + gap - 10} M${lx + 24},${ay + gap - 16} L${lx + 30},${ay + gap - 9} L${lx + 36},${ay + gap - 16}" stroke="${C.teal}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    b += text(lx + 44, ay + gap / 2 + 4, 'tak', { size: 12.5, weight: 600, fill: C.teal });
  });
  const fy = top + 4 * (bh + gap);
  b += `<rect x="${lx}" y="${fy}" width="${lw}" height="56" rx="12" fill="${C.teal}"/>`;
  b += lines(lx + 20, fy + 24, ['Strona może zostać zacytowana', '(OpenAI nie gwarantuje miejsca)'], { size: 14.5, weight: 600, fill: C.white, lh: 20 });
  writeFileSync(`${OUT}/chatgpt-warunki-cytowania.svg`, svg(W, H,
    'Czy ChatGPT może zacytować Twoją stronę?',
    'Cztery warunki: 1. robots.txt dopuszcza OAI-SearchBot, inaczej strona nie pojawi się w wyszukiwaniu ChatGPT, 2. CDN i firewall przepuszczają adresy IP robota OpenAI, 3. strona jest w indeksie Google i Bing, 4. sekcje odpowiadają wprost z faktami i źródłami. Po spełnieniu warunków strona może zostać zacytowana, ale OpenAI nie gwarantuje miejsca.', b));
}
console.log('ok');
