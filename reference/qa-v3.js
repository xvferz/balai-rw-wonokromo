// QA v3: memastikan semua id, ikon, dan tautan internal konsisten
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(ROOT, 'assets/app.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'assets/style.css'), 'utf8');
let fail = 0;
const ok = (c, m) => { if (!c) fail++; console.log((c ? 'OK   ' : 'FAIL ') + m); };

// 1. id yang dipanggil app.js harus ada di markup
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
const wanted = new Set([...app.matchAll(/(?<!\$)\$\("([^"]+)"\)/g)].map(m => m[1]).filter(i => !/[\[\] .]/.test(i)));
const missingIds = [...wanted].filter(i => !ids.has(i) && i !== 'backBtn'); // backBtn dibuat saat render
ok(missingIds.length === 0, 'id dipanggil app.js ada di markup' + (missingIds.length ? ' -> missing: ' + missingIds.join(', ') : ' (' + wanted.size + ' id)'));

// 2. simbol ikon: setiap <use href="#i-x"> punya <symbol id="i-x">
const syms = new Set([...html.matchAll(/<symbol id="([^"]+)"/g)].map(m => m[1]));
const used = new Set([...(html + app).matchAll(/#(i-[a-z-]+)/g)].map(m => m[1]));
const missIc = [...used].filter(u => !syms.has(u));
ok(missIc.length === 0, 'ikon terpakai punya symbol' + (missIc.length ? ' -> missing: ' + missIc.join(', ') : ' (' + used.size + '/' + syms.size + ')'));

// 3. tautan anchor internal harus ada targetnya (atau route yang dikenal)
const data = fs.readFileSync(path.join(ROOT, 'assets/data.js'), 'utf8');
const svcIds = new Set([...data.matchAll(/\bid:"([a-z0-9-]+)"/g)].map(m => m[1]));
const routes = new Set(['beranda', 'ssw', 'oss', ...svcIds]);
const anchors = [...html.matchAll(/href="#([A-Za-z0-9_-]+)"/g)].map(m => m[1]);
const missA = anchors.filter(a => !ids.has(a) && !routes.has(a));
ok(missA.length === 0, 'anchor internal valid' + (missA.length ? ' -> missing: ' + missA.join(', ') : ' (' + anchors.length + ' tautan)'));

// 4. token & fitur baru ada di CSS
for (const [label, needle] of [
  ['token dark mode', '[data-theme="dark"]'],
  ['header sticky', '.head{position:sticky'],
  ['drawer', '.drawer-in'],
  ['kategori grid', '.kgrid{'],
  ['kartu kategori', '.kcard{'],
  ['footer modern', '.foot-top{'],
  ['faq', '.faq-item{'],
  ['kategori dari hue', '[data-cat]{'],
  ['crumbs', '.crumbs{']
]) ok(css.includes(needle), 'css: ' + label);

// 5. kelas yang dihapus di v3 tidak boleh masih dipakai
for (const cls of ['catnav', 'backLink']) {
  const inApp = app.includes(cls);
  ok(!inApp, 'kelas lama dibuang dari JS: ' + cls);
}

// 6. sprite berada di markup dan cukup besar untuk Audit kernel
ok((syms.size >= 30 ? true : false), 'jumlah ikon >= 30 (' + syms.size + ')');

console.log(fail ? '\nFAILURES: ' + fail : '\nSemua cek v3 lolos');
process.exitCode = fail ? 1 : 0;