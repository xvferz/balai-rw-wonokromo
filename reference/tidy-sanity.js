// Runs the actual tidy()/EMOJI_RE from assets/app.js and checks real-world strings
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../assets/app.js', 'utf8');
const start = src.indexOf('const EMOJI_RE');
const end = src.indexOf('/* ============ Warna & ikon kategori');
const block = src.slice(start, end);

const code = `
${block}
const cases = [
  ['💰 Biaya', 'Biaya'],
  ['1\uFE0F\u20E3 KBLI harus sesuai', 'KBLI harus sesuai'],
  ['\u{1F3D8} Pelayanan di Balai RW', 'Pelayanan di Balai RW'],
  ['\u{1F4CD} Lokasi & kanal bantuan lainnya', 'Lokasi & kanal bantuan lainnya'],
  ['Desil 1\u20134', 'Desil 1\u20134'],
  ['Ajukan online: KNG Mandiri \u2197', 'Ajukan online: KNG Mandiri \u2197'],
  ['Cek desil \u2197', 'Cek desil \u2197'],
  ['\u{1F476} Akta kelahiran bayi', 'Akta kelahiran bayi'],
  ['familia \u{1F468}\u200D\u{1F469}\u200D\u{1F466} sekalian', 'familia sekalian'],
];
let fail = 0;
for (const [inp, want] of cases) {
  const got = tidy(inp);
  const ok = got === want;
  if (!ok) fail++;
  console.log((ok ? 'OK  ' : 'FAIL') + ' ' + JSON.stringify(inp) + ' -> ' + JSON.stringify(got) + (ok ? '' : ' (want ' + JSON.stringify(want) + ')'));
}
console.log(fail ? 'FAILURES: ' + fail : 'tidy() all OK');
`;
eval(code);
