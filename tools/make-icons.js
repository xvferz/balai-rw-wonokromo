/* Generate PNG icons for the PWA (no deps — hand-rolled PNG encoder).
 * Output: assets/icons/icon-512.png, icon-192.png, apple-touch-icon.png
 * Design: emerald gradient square + gold 5-point star (matches the favicon). */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/* ---- minimal PNG writer ---- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}
function encodePNG(w, h, pixel) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  const raw = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0, row = 0; y < h; y++, row += 1 + w * 4) {
    raw[row] = 0; // filter: none
    for (let x = 0; x < w; x++) {
      const [r, g, b, a] = pixel(x, y);
      const p = row + 1 + x * 4;
      raw[p] = r; raw[p + 1] = g; raw[p + 2] = b; raw[p + 3] = a;
    }
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ---- artwork ---- */
const C1 = [4, 120, 87];     // #047857 emerald-deep
const C2 = [52, 211, 153];   // #34D399 emerald
const GOLD = [253, 230, 138];// #FDE68A

function starPoly(s) {
  const cx = s / 2, cy = s / 2, r1 = 0.24 * s; // outer radius, inside maskable safe zone
  const r2 = r1 * 0.475;
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    pts.push([cx + (i % 2 ? r2 : r1) * Math.cos(a), cy + (i % 2 ? r2 : r1) * Math.sin(a)]);
  }
  return pts;
}
function inPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function design(size) {
  const poly = starPoly(size);
  return (x, y) => {
    const t = (x + y) / (2 * size);
    let r = C1[0] + (C2[0] - C1[0]) * t,
        g = C1[1] + (C2[1] - C1[1]) * t,
        b = C1[2] + (C2[2] - C1[2]) * t;
    let cov = 0; // 2x2 supersample for smooth edges
    for (const [ox, oy] of [[.25, .25], [.75, .25], [.25, .75], [.75, .75]])
      if (inPoly(x + ox, y + oy, poly)) cov += 0.25;
    if (cov > 0) {
      r += (GOLD[0] - r) * cov; g += (GOLD[1] - g) * cov; b += (GOLD[2] - b) * cov;
    }
    return [Math.round(r), Math.round(g), Math.round(b), 255];
  };
}

const out = path.join(__dirname, '..', 'assets', 'icons');
fs.mkdirSync(out, { recursive: true });
for (const [name, size] of [['icon-512.png', 512], ['icon-192.png', 192], ['apple-touch-icon.png', 180]]) {
  fs.writeFileSync(path.join(out, name), encodePNG(size, size, design(size)));
  console.log('wrote', name, size + 'x' + size);
}
