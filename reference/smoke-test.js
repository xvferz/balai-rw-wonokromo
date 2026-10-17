const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const srv = http.createServer((req, res) => {
  try {
    const url = req.url.split('?')[0].split('#')[0];
    const rel = url === '/' ? 'index.html' : url.replace(/^\/+/, '');
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) { res.writeHead(404); res.end('404 ' + rel); return; }
    const ext = path.extname(full).toLowerCase();
    const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': mime });
    res.end(fs.readFileSync(full));
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});

srv.listen(8931, '127.0.0.1', async () => {
  const L = [];
  try {
    const r1 = await fetch('http://127.0.0.1:8931/');
    const html = await r1.text();
    L.push('index.html status=' + r1.status + ' bytes=' + html.length);
    for (const n of ['data-view="beranda"', 'data-view="ssw"', 'data-view="oss"', 'assets/app.js', 'Muhammad Ghifari Iksan'])
      L.push('contains "' + n + '" = ' + html.includes(n));
    for (const f of ['assets/style.css', 'assets/data.js', 'assets/app.js']) {
      const r = await fetch('http://127.0.0.1:8931/' + f);
      L.push(f + ': status=' + r.status + ' bytes=' + (await r.text()).length);
    }
    for (const id of ['hq','hout','catnav','hstats','hquick','hclr','out','q','clr','quick','barFill','barText','resetBtn','ossFill','ossText','ossReset','svcHead','svcBody','toast','backLink','sswShare','ossShare','sswStages'])
      if (!html.includes('id="' + id + '"')) L.push('MISSING id=' + id);
    // Cross-check: every SVC id used as an anchor href in HTML exists in data.js
    const data = fs.readFileSync(path.join(ROOT, 'assets/data.js'), 'utf8');
    const anchors = [...html.matchAll(/href="#([a-z0-9-]+)"/g)].map(m => m[1])
      .filter(id => !['beranda', 'ssw', 'oss', 'pusat', 'akta', 'kk', 'kng', 'desil', 'gamis', 'skm', 'dispensasi'].includes(id));
    for (const a of anchors) L.push('anchor #/' + a + ' in data.js SVCMAP? ' + (data.includes('id:"' + a + '"')));
    L.push('DONE');
  } catch (e) { L.push('ERROR ' + e); }
  srv.close();
  console.log(L.join('\n'));
});
