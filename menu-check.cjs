// Sprawdza, czy etykiety w rozwijanym menu mieszcza sie w jednej linii karty 292px.
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.resolve('.next-build');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.txt': 'text/plain', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(ROOT, p);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(ROOT, p + '.html');
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(4599, r));
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const [name, url] of [['PL', 'http://localhost:4599/pl'], ['EN', 'http://localhost:4599/']]) {
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.hover('.nav-dd-trigger');
    await new Promise((r) => setTimeout(r, 400));
    const rows = await page.evaluate(() => {
      const card = document.querySelector('.nav-dd-card');
      return [...card.querySelectorAll('.nav-dd-label')].map((el) => {
        const lh = parseFloat(getComputedStyle(el).lineHeight) || parseFloat(getComputedStyle(el).fontSize) * 1.2;
        return { text: el.textContent, w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height), lines: Math.round(el.getBoundingClientRect().height / lh) };
      });
    });
    console.log('\n=== ' + name + ' ===');
    for (const r of rows) console.log(`${r.lines} lin. | ${String(r.w).padStart(3)}px | ${r.text}`);
    await page.screenshot({ path: `menu-${name}.png`, clip: { x: 100, y: 60, width: 500, height: 340 } });
  }

  await browser.close();
  server.close();
})();
