# Pelayanan Balai RW Wonokromo — Remake

Pembuatan ulang dari https://pelayanan-balai-rw.netlify.app/
Portal perorangan berisi panduan layanan warga Kecamatan Wonokromo, Kota Surabaya:
KTP/KK/Akta, surat keterangan, perizinan (SSW Alfa), izin usaha mikro (OSS RBA/NIB),
bansos, pendidikan, kesehatan, dan pekerjaan.

✍️ Kredit konten asli: **Muhammad Ghifari Iksan, S.Tr.IP., M.A.P.**
Referensi snapshot dari situs asli disimpan di `reference/`.

## Struktur

```
index.html            → seluruh markup (4 view: beranda, ssw, oss, svc) + sprite ikon SVG
assets/style.css      → design system v3 (token, light + dark, komponen, responsif)
assets/data.js        → data murni: CATS (17 kategori, ~130 layanan SSW),
                        GROUPS (9 kelompok portal), SVC (~40 panduan layanan)
assets/app.js         → logika: render + ikon, pencarian berbobot skor, checklist localStorage,
                        router hash + judul/deskripsi per halaman, tema, drawer, salin & bagikan
sw.js                 → service worker (offline-first, stale-while-revalidate)
manifest.webmanifest  → PWA manifest (dapat di-install ke layar utama HP)
assets/icons/         → ikon PWA (dibuat oleh tools/make-icons.js)
serve.js              → server statis kecil untuk uji lokal / preview via Wi-Fi
reference/            → snapshot HTML asli + catatan + hasil ekstraksi + skrip uji
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
- **Tampilan v5 "Ramping & Rapi"**:
  - Banner dipersempit: hanya eyebrow + judul + ringkasan + pencarian; angka statistik pindah ke
    **strip putih di bawah banner**, jadi tidak padat di HP.
  - Latar banner diberi tekstur halus: titik + lingkaran konsentris + ikon garis besar samar
    (disembunyikan di layar HP).
  - Kartu bergaya **putih + garis tipis + radius 20px tanpa bayangan**; saat hover (desktop)
    kartu terangkat dan judulnya memakai warna kategorinya.
  - Grid kategori jadi vertikal di layar HP supaya teks tidak sempit.
  - Saat mengetik pencarian, grid kategori disembunyikan agar fokus ke hasil.
  - Penandaan "kartu unggulan" (warna oranye) dihapus — semua kartu sama.
  - Kolom pencarian di header dan chip "Cari cepat" dihapus; pencarian hanya di banner.
- **Detail kecil (v6)**: logo mark di header mengikuti warna kategori halaman yang dibuka
  (hijau emerald di beranda/SSW/OSS, warna kategori di halaman layanan), navigasi dipersempit
  jadi **Beranda · Layanan · Bantuan**, dan latar halaman diberi gradasi hijau samar +
  titik halus di bagian atas.
- **Palet ikut banner (v7)**:
  - Di halaman layanan, **mode gelap ikut warna kategori**: latar, kartu, garis, teks, dan
    cahaya latar semuanya ditintu dari hue halaman yang sedang dibuka.
  - Sorot navigasi (pill bercahaya) mengikuti item yang sedang aktif, dan **ikut warna halaman**;
    di beranda ia bergeser sendiri saat menggulir (atas → *Beranda*, bagian kategori → *Layanan*,
    footer kontak → *Bantuan*).
  - Grup navigasi + tombol tema digeser sedikit ke kanan (jarak tetap 16px dari logo/ikon).
- **Desain v3 "Ikon & Navigasi"**:
  - **Ikon SVG line-art** sebagai satu sprite inline (`<symbol>` + `<use>`), 39 ikon —
    dipakai di header, kartu kategori, judul seksi, baris kontak, footer, dan langkah.
  - **Header modern**: sticky dengan logo mark, nav (Beranda/SSW Alfa/OSS RBA/Layanan/Bantuan),
    tombol tema, dan **drawer** di mobile.
  - **Mode gelap/terang** lengkap (token terpisah), mengikuti sistem, diingat di `localStorage`,
    plus pratinjau paksa lewat `?t=light` / `?t=dark`.
  - **Beranda lebih padat**: grid 9 kategori berikon (menggantikan rel kategori lama),
    kartu info Balai RW, dan **FAQ** (6 pertanyaan).
  - **Footer modern**: 4 kolom (brand + kontak, navigasi, kategori, layanan resmi),
    bar bawah dengan tombol "Kembali ke atas".
  - Warna kategori kini diturunkan dari satu hue per grup (`--ch`/`--csat`) sehingga
    tint gelap/terang tetap konsisten di kedua tema.
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
