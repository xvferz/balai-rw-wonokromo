# Pelayanan Balai RW Wonokromo — Remake

Pembuatan ulang dari https://pelayanan-balai-rw.netlify.app/
Portal perorangan berisi panduan layanan warga Kecamatan Wonokromo, Kota Surabaya:
KTP/KK/Akta, surat keterangan, perizinan (SSW Alfa), izin usaha mikro (OSS RBA/NIB),
bansos, pendidikan, kesehatan, dan pekerjaan.

✍️ Kredit konten asli: **Muhammad Ghifari Iksan, S.Tr.IP., M.A.P.**
Referensi snapshot dari situs asli disimpan di `reference/`.

## Struktur

```
index.html            → seluruh markup (4 view: beranda, ssw, oss, svc)
assets/style.css      → seluruh CSS (tema terang + blok "overhaul polish" mobile di bawah)
assets/data.js        → data murni: CATS (17 kategori, ~130 layanan SSW),
                        GROUPS (9 kelompok portal), SVC (~40 panduan layanan)
assets/app.js         → logika: pencarian berbobot skor, checklist localStorage,
                        router hash + judul/deskripsi per halaman, tombol salin & bagikan
sw.js                 → service worker (offline-first, stale-while-revalidate)
manifest.webmanifest  → PWA manifest (dapat di-install ke layar utama HP)
assets/icons/         → ikon PWA (dibuat oleh tools/make-icons.js)
serve.js              → server statis kecil untuk uji lokal / preview via Wi-Fi
reference/            → snapshot HTML asli + catatan + hasil ekstraksi
netlify.toml          → config deploy Netlify (publish ".", cache headers)
robots.txt
```

## Menjalankan secara lokal

```bash
# server statis tanpa dependensi (bisa diakses HP via Wi-Fi yang sama)
node serve.js          # -> http://localhost:8080

# atau lewat http, bukan file://, karena hash router
npx.cmd serve .        # jika npx.ps1 diblokir execution policy, pakai npx.cmd
```

## Perbedaan vs situs asli

- Dipecah menjadi `index.html` + `assets/{style.css,data.js,app.js}` (asli: satu file HTML raksasa).
- Menghapus snippet kolom komentar/HUD khusus Netlify.
- **PWA**: dapat di-install ke layar utama HP, jalan offline (service worker cache-first app shell, SWR).
- **Overhaul mobile**: target sentuh ≥40px, umpan balik `:active`, tap-highlight dimatikan,
  scrollbar rail tersembunyi juga di WebKit, `.kv` satu kolom di layar kecil, hero & toast yang
  rapi di safe-area, hover "nyangkut" dinetralkan di perangkat sentuh.
- **Pencarian lebih pintar**: token + prefiks + skor (judul lebih berbobot daripada tag),
  masih mode-AND sehingga hasil tetap relevan.
- **Desain v2 "Clean & Consistent"**: design token (skala spasi/radius/bayangan/tipografi),
  tanpa emoji & ikon (teks murni + panah tipografis), 9 warna kategori disatukan pada satu
  ramp HSL (hue saja), satu komponen tombol/chip/kartu/pencarian, scrollspy instan pada tab
  SSW & kategori beranda, strip kredit dipindah ke footer.
- **SEO/halaman**: tiap route mengubah `document.title` + meta description
  (riwayat back-button lebih informatif); canonical + og:image + robots.txt.
- Semua konten, data layanan, dan fitur interaktif sama seperti aslinya.

## Melakukan edit

- Menambah/mengubah panduan layanan: edit array `SVC` di `assets/data.js`
  (setiap item: `id, g(grup), e(emoji), t(judul), d, ch, tags, bring, cases, steps, kv, notes, contacts, links, src`).
- Menambah layanan SSW Alfa: edit `CATS` (format `[nama, retribusi(0/1), kata kunci]`).
- Mengubah tampilan: `assets/style.css`.

## Menyebarkan

Statis tanpa langkah build — tarik-dan-letakkan folder tersebut ke Netlify, atau:
```bash
npx.cmd netlify-cli deploy --dir . --prod
```
Setelah live di https, PWA-nya bisa: "Add to Home Screen" di HP Android/iOS,
dan tetap terbuka meski koneksi balai RW putus (cache service worker).
