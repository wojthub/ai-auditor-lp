// Okładki wpisów bloga (1200x630 JPG) - jeden szablon dla wszystkich wpisów.
// Ten sam plik to grafika wiodąca wpisu, miniatura na liście i obrazek og:image.
//
// Uruchomienie z katalogu ai-auditor-lp:  node scripts/blog-covers.mjs [slug ...]
// Bez argumentów generuje okładki wszystkich wpisów z src/data/blog.ts (oba języki).
// Wynik: public/blog/<lang>/okladki/<slug>.jpg (og) i <slug>-baner.jpg (strona) - nazwę wyprowadza `blogCoverUrl` w src/lib/blogCover.ts.
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer';

const ROOT = process.cwd();
const REGISTRY = readFileSync(join(ROOT, 'src/data/blog.ts'), 'utf8');
const AUTHOR = readFileSync(join(ROOT, 'public/author.jpg')).toString('base64');
const LABEL = { pl: 'Blog CitationOne', en: 'CitationOne Blog' };

// Rejestr jest w TS - wyciągamy pary (lang, slug, title) prostym parserem zamiast kompilacji.
function posts() {
  const out = [];
  const re = /\b(pl|en):\s*\{\s*slug:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(REGISTRY))) out.push({ lang: m[1], slug: m[2], title: m[3].replace(/\\'/g, "'") });
  return out;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Dwa warianty jednego szablonu: `og` 1200x630 (udostępnienia) i `baner` 1200x400 (strona wpisu i lista).
const VARIANTS = {
  og: { h: 630, inset: "64px 80px 74px", size: [68, 62], author: true, suffix: "" },
  baner: { h: 400, inset: "44px 80px 52px", size: [62, 56], author: false, suffix: "-baner" },
};

function html({ lang, title }, v) {
  const size = title.length > 48 ? v.size[1] : v.size[0];
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: ${v.h}px; }
  body {
    font-family: Inter, 'Segoe UI', Arial, sans-serif; position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse 720px 420px at 78% 38%, rgba(11,154,166,0.13), transparent 70%),
      radial-gradient(ellipse 600px 380px at 8% 100%, rgba(11,121,131,0.08), transparent 70%),
      #fbfcfc;
  }
  .dots { position: absolute; inset: 0; background-image: radial-gradient(#d3dadf 1.2px, transparent 1.2px); background-size: 26px 26px; opacity: .55;
    -webkit-mask-image: linear-gradient(115deg, transparent 10%, #000 55%, #000 100%); }
  .wrap { position: absolute; inset: ${v.inset}; display: flex; flex-direction: column; }
  .top { display: flex; align-items: center; justify-content: space-between; }
  .logo { font-size: 38px; font-weight: 600; letter-spacing: -1px;
    background: linear-gradient(90deg, #1a3a4a 0%, #0b7983 50%, #0b9aa6 100%); -webkit-background-clip: text; color: transparent; }
  .pill { font-size: 19px; font-weight: 600; color: #0b7983; background: #e6f4f5; border: 1px solid #c4e3e6; border-radius: 999px; padding: 8px 20px; }
  h1 { margin-top: auto; margin-bottom: auto; font-size: ${size}px; line-height: 1.12; font-weight: 800; letter-spacing: -0.03em; max-width: 1000px; text-wrap: balance;
    background: linear-gradient(90deg, #1a3a4a 0%, #0b7983 60%, #0b9aa6 100%); -webkit-background-clip: text; color: transparent; padding-bottom: 6px; }
  .author { display: flex; align-items: center; gap: 16px; }
  .author img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid #fff; box-shadow: 0 0 0 1px #dfe1e7; }
  .name { font-size: 21px; font-weight: 600; color: #0d0d12; }
  .site { font-size: 17px; color: #666d80; margin-top: 2px; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%); }
</style></head><body>
<div class="dots"></div>
<div class="wrap">
  <div class="top"><div class="logo">CitationOne</div><div class="pill">${LABEL[lang]}</div></div>
  <h1>${esc(title)}</h1>
  ${v.author ? `<div class="author"><img src="data:image/jpeg;base64,${AUTHOR}" alt="">
    <div><div class="name">Wojciech Władziński-Ulatowski</div><div class="site">citationone.com</div></div></div>` : ""}
</div>
<div class="bar"></div>
</body></html>`;
}

const only = process.argv.slice(2);
const todo = posts().filter((p) => !only.length || only.includes(p.slug));
const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  for (const p of todo) {
    const dir = join(ROOT, 'public/blog', p.lang, 'okladki');
    mkdirSync(dir, { recursive: true });
    for (const v of Object.values(VARIANTS)) {
      await page.setViewport({ width: 1200, height: v.h, deviceScaleFactor: 1 });
      await page.setContent(html(p, v), { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: join(dir, `${p.slug}${v.suffix}.jpg`), type: 'jpeg', quality: 90 });
      console.log(`${p.lang}/${p.slug}${v.suffix}.jpg`);
    }
  }
} finally {
  await browser.close();
}
