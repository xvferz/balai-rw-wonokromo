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
    // every DOM id app.js touches
    for (const id of ['hq','hout','catnav','hstats','hquick','hclr','out','q','clr','quick','barFill','barText','resetBtn','ossFill','ossText','ossReset','svcHead','svcBody','toast','backLink','sswShare','ossShare','sswStages'])
      if (!html.includes('id="' + id + '"')) L.push('MISSING id=' + id);
    L.push('DONE');
  } catch (e) { L.push('ERROR ' + e); }
  srv.close();
  console.log(L.join('\n'));
});
