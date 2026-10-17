// Runs the actual search-scoring block from assets/app.js as one blob (no DOM needed)
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../assets/app.js', 'utf8');
const start = src.indexOf('/* Pencarian: token-prefiks');
const end = src.indexOf('/* ============ Warna kategori');
const block = src.slice(start, end);

const code = `
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const ALL = [];
${block}

const idx = [
  { tt: toks('Kartu Keluarga (KK)'), at: toks('kartu keluarga kk hilang rusak pecah barcode biodata adminduk'), s: { t: 'Kartu Keluarga (KK)' } },
  { tt: toks('Surat Keterangan Miskin (SKTM) & Desil'), at: toks('sktm desil dinsos keringanan pdam bansos'), s: { t: 'SKTM & Desil' } },
  { tt: toks('Bantuan Jamban'), at: toks('jamban wc toilet septic tank babs sanitasi'), s: { t: 'Bantuan Jamban' } },
  { tt: toks('PBG (dulu IMB)'), at: toks('imb pbg izin mendirikan bangunan bangun rumah renovasi'), s: { t: 'PBG (dulu IMB)' } },
];
for (const q of ['kk', 'ktp hilang', 'jamban', 'imb', 'sktm', 'keluarga']) {
  const words = norm(q).split(/\\s+/).filter(Boolean);
  console.log(q.padEnd(12), '->', JSON.stringify(ranked(words, idx).map(x => x.s.t)));
}
console.log('and-mode  :', JSON.stringify(ranked(norm('jamban beasiswa').split(/\\s+/), idx).map(x => x.s.t)));
console.log('prefix    :', JSON.stringify(ranked(norm('jamb septic').split(/\\s+/), idx).map(x => x.s.t)));
`;
eval(code);
