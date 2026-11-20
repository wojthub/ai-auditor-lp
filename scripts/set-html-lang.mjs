// Po `next build`: strony pod /pl dostają <html lang="pl">.
//
// Root layout jest jeden (src/app/layout.tsx) i ustawia lang="en" dla całej witryny, a layout /pl
// może dać język tylko elementowi wewnątrz <body>. Wyszukiwarki i czytniki ekranu czytają język
// z <html>, więc polskie strony były deklarowane jako angielskie (zgłoszone przez audyt SiteLint
// 2026-11-19). Static export daje gotowe pliki HTML, więc poprawiamy je tutaj; przejścia między
// stronami bez przeładowania obsługuje komponent `HtmlLang` w layoucie /pl.
//
// Katalog eksportu: przy `NEXT_DIST_DIR` eksport ląduje w nim, bez niego - w `out/`.
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const candidates = [process.env.NEXT_DIST_DIR, 'out'].filter(Boolean);
const root = candidates.find((d) => existsSync(join(d, 'pl.html')) || existsSync(join(d, 'pl', 'index.html')));
if (!root) {
  console.error(`[set-html-lang] nie znaleziono eksportu /pl w: ${candidates.join(', ')}`);
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith('.html')) yield p;
  }
}

const targets = [join(root, 'pl.html'), join(root, 'pl', 'index.html')].filter(existsSync);
if (existsSync(join(root, 'pl'))) targets.push(...[...htmlFiles(join(root, 'pl'))].filter((p) => !targets.includes(p)));

let changed = 0;
for (const file of targets) {
  const html = readFileSync(file, 'utf8');
  const next = html.replace(/<html lang="en"/, '<html lang="pl"');
  if (next !== html) {
    writeFileSync(file, next);
    changed++;
  }
}

if (changed === 0) {
  console.error('[set-html-lang] żaden plik /pl nie miał <html lang="en"> - zmienił się root layout? Sprawdź skrypt.');
  process.exit(1);
}
console.log(`[set-html-lang] lang="pl" w ${changed}/${targets.length} plikach (${root})`);
