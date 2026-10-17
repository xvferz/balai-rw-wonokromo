const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const srv = http.createServer((req, res) => {
  try {
    const url = req.url.split('?')[0].split('#')[0];
    const rel = decodeURIComponent(url === '/' ? 'index.html' : url.replace(/^\/+/, ''));
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) { res.writeHead(404); res.end('404 ' + rel); return; }
    const ext = path.extname(full).toLowerCase();
    const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.js.map': 'application/json' }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': mime });
    res.end(fs.readFileSync(full));
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});

srv.listen(8932, '127.0.0.1', async () => {
  const L = [];
  try {
    const get = async (p) => { const r = await fetch('http://127.0.0.1:8932/' + p); return { r, body: await r.text() }; };
    const r1 = await get('');
    const html = r1.body;
    L.push('index.html status=' + r1.r.status + ' bytes=' + html.length);
    for (const n of ['data-view="beranda"', 'data-view="ssw"', 'data-view="oss"', 'assets/app.js', 'Muhammad Ghifari Iksan', 'manifest', 'sw.js', 'apple-touch-icon'])
      L.push('contains "' + n + '" = ' + html.includes(n));
    for (const f of ['assets/style.css', 'assets/data.js', 'assets/app.js', 'manifest.webmanifest', 'sw.js', 'robots.txt', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png', 'assets/icons/apple-touch-icon.png']) {
      const r = await get(f);
      L.push(f + ': status=' + r.r.status + ' mime=' + r.r.headers.get('content-type'));
    }
    // manifest sanity
    const man = JSON.parse((await get('manifest.webmanifest')).body);
    L.push('manifest: name="' + man.name + '" icons=' + man.icons.length + ' display=' + man.display);
    // png dims
    const b512 = fs.readFileSync(path.join(ROOT, 'assets/icons/icon-512.png'));
    L.push('icon-512: w=' + b512.readUInt32BE(16) + ' h=' + b512.readUInt32BE(20));
    // sw sanity
    const sw = (await get('sw.js')).body;
    L.push('sw.js: has fetch handler=' + sw.includes("'fetch'") + ', version=' + (sw.match(/VERSION = '([^']+)'/) || [])[1]);
    // every DOM id app.js touches (v3 shell)
    for (const id of ['hq','gq','hout','kgrid','hstats','hquick','hclr','out','q','clr','quick','barFill','barText','resetBtn','ossFill','ossText','ossReset','svcHead','svcBody','toast','sswShare','ossShare','sswStages','head','drawer','menuBtn','sbtn','themeBtn','totop','footCats','bantuan'])
      if (!html.includes('id="' + id + '"')) L.push('MISSING id=' + id);
    // v3 features present
    for (const n of ['<symbol id="i-search"', 'id="kgrid"', 'faq-item', 'foot-top', 'dataset.theme', 'brw-theme'])
      if (!html.includes(n)) L.push('MISSING feature: ' + n);
    // Desain: kontras emoji bebas. app.js boleh punya emoji HANYA di data label
    // HQUICK/QUICK yang selalu melewati tidy() saat render.
    const EMOJI_RE = /[0-9]\u{FE0F}?\u{20E3}|[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2300}-\u{23FF}\u{25A0}-\u{25FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]\u{FE0F}?|[\u{200D}\u{20E3}\u{FE0F}]/u;
    const scan = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8').split('\n')
      .map((line, i) => ({ n: i + 1, line })).filter(x => EMOJI_RE.test(x.line));
    for (const f of ['index.html', 'assets/style.css'])
      L.push(f + ': emoji-free = ' + (scan(f).length ? 'FAIL' : 'OK'));
    {
      const hits = scan('assets/app.js');
      const ok = hits.every(x => x.line.includes('const HQUICK') || x.line.includes('const QUICK'));
      L.push('assets/app.js: emoji only in tidied label data = ' + (ok ? 'OK' : 'FAIL line ' + hits.map(h => h.n).join(',')));
    }
    const cssT = fs.readFileSync(path.join(ROOT, 'assets/style.css'), 'utf8');
    L.push('css tokens: ' + (cssT.includes('--r-md:16px') && cssT.includes('--sh-2') && cssT.includes('[data-theme="dark"]') && cssT.includes('.hero[data-cat]') && cssT.includes('.tabs button.on') ? 'OK' : 'MISSING'));
    L.push('DONE');
  } catch (e) { L.push('ERROR ' + e); }
  srv.close();
  console.log(L.join('\n'));
});
