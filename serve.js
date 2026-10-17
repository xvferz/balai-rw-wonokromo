/* Tiny static server for local testing on your phone/PC:
 *     node serve.js           -> serves on 0.0.0.0:8080
 *     node serve.js 3000      -> custom port
 * Serves index.html at "/" and any file in this folder. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  try {
    const url = req.url.split('?')[0].split('#')[0];
    const rel = decodeURIComponent(url === '/' ? 'index.html' : url.replace(/^\/+/, ''));
    const full = path.join(ROOT, rel);
    if (!full.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('404 ' + rel);
      return;
    }
    const mime = MIME[path.extname(full).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': mime, 'cache-control': 'no-store' });
    fs.createReadStream(full).pipe(res);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log('Serving ' + ROOT);
  console.log('  Local:   http://localhost:' + PORT + '/');
  console.log('  LAN:     http://<ip-PC-anda>:' + PORT + '/');
});
