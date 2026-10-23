# Pelayanan Balai RW Wonokromo — Remake

Pembuatan ulang dari https://pelayanan-balai-rw.netlify.app/
Portal perorangan berisi panduan layanan warga Kecamatan Wonokromo, Kota Surabaya:
KTP/KK/Akta, surat keterangan, perizinan (SSW Alfa), izin usaha mikro (OSS RBA/NIB),
bansos, pendidikan, kesehatan, dan pekerjaan.

✍️ Kredit konten asli: **Muhammad Ghifari Iksan, S.Tr.IP., M.A.P.**
Referensi snapshot dari situs asli disimpan di `reference/`.

## Struktur

```
index.html            → seluruh markup (5 view: beranda, layanan, ssw, oss, svc) + sprite ikon SVG
assets/style.css      → design system v3+ (token, light + dark, komponen, responsif)
assets/data.js        → data murni: CATS (17 kategori, ~130 layanan SSW),
                        GROUPS (9 kelompok portal), SVC (~40 panduan layanan)
assets/app.js         → logika: render + ikon, pencarian berbobot skor, checklist localStorage,
                        router hash (beranda / Layanan katalog / Layanan/<kategori> / svc / ssw / oss,
                        + redirect alias anchor lama) + judul & meta deskripsi per halaman,
                        tema per kategori, drawer, bagikan
sw.js                 → service worker (offline-first, stale-while-revalidate)
manifest.webmanifest  → PWA manifest (dapat di-install ke layar utama HP)
assets/icons/         → ikon PWA (dibuat oleh tools/make-icons.js)
serve.js              → server statis kecil untuk uji lokal / preview via Wi-Fi
reference/            → snapshot HTML asli + catatan + hasil ekstraksi + skrip uji
netlify.toml          → config deploy Netlify (publish ".", cache headers)
robots.txt
```

## Tipografi

Seluruh teks memakai **Poppins** (400/500/600/700/800) dari Google Fonts —
satu keluarga untuk judul dan isi, agar konsisten dan mudah dibaca di HP.

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
- **Rapikan halaman katalog (v9.3)**:
  - **Ikon pencari izin mengikat judul**: chip "Mencari jenis izin tertentu?" kini sejajar
    dengan baris judulnya (sebelumnya mengapung di tengah blok teks saat desc beberapa baris).
  - **Tombol Kembali ke Beranda** di banner katalog — melengkapi tangga kembali:
    lapis 3 → kategori, kategori → katalog, katalog → beranda.
  - **Jarak banner → konten katalog seragam**: baris kategori katalog sebelumnya menempel
    lurus ke banner (0px); kini isi katalog diberi jarak napas (24–32px, ikut lebar layar)
    dan margin atas "Semua kategori" dilepas supaya halaman kategori memakai jarak yang sama.
- **Judul kartu tak lagi terpotong di tengah kata di ponsel (v9.5)**: `overflow-wrap:anywhere`
    global membiarkan "Keterangan"/"Lingkungan" terpotong jadi huruf yatim ("Keteranga|n")
    saat kolom kartu ~360px hanya menyisakan 85px; kolom teks diberi +8px (padding sisi kartu
    14→12, jarak grid & ikon→teks 10→8, chip ikon 38→36) sehingga kata terpanjang (92px) utuh
    mulai @360, dengan `hyphens:auto` sebagai lapis cadangan untuk layar yang lebih sempit.
- **Ikon pencari izin persis di tengah chip (v9.4)**: rule pewarna teks `.lay-ssw span`
    menimpa `display:grid` chip `.row-ic`, membuat ikon menempel di pojok kiri-atas;
    selektor dipertajam menjadi `.lay-ssw div span` supaya chip tetap grid.
- **Mengikuti halaman & navigasi lapis 3 (v9.2)**:
  - **Banner katalog ikut palet kategori**: `#layanan/<kategori>` kini menampilkan banner
    berwarna kategori yang dibuka (daftar kategori = hijau emerald bawaan); halaman layanan
    (lapis 3) memang sudah ikut warna kategorinya sejak v7.
  - **Hiasan banner satu motif**: glyph ikon situs diperbesar, samar (opacity 7%), di sisi
    kanan atas dan tergunting sudut banner — Cari di beranda, Bangunan di SSW, Tas kerja di
    OSS, Daftar di katalog; di katalog dalam & lapis 3 glyph mengikuti ikon kategorinya
    (didukung `route()`), sehingga hiasan ini tetap berisi makna, bukan blob hiasan.
  - **Jarak FAQ seragam**: kartu sebaris kini disamakan tingginya (grid standar, tanpa
    `align-items:start`), sehingga jarak antar kartu terhitung sama di kedua kolom.
  - **Tombol Kembali di lapis 3**: banner halaman layanan punya tombol "Kembali ke <kategori>"
    di atas judul (crumb tetap ada) menuju halaman kategorinya.
  - **Verifikasi**: lint 0 FAIL / 4 WARN (font brand Poppins, glass header, overshoot scale(0),
    em-dash — semuanya disengaja); klik semua jalur lolos (20 cek, termasuk hue banner dan
    tombol Kembali).
- **Sederhanakan UI/UX (v9.1)**:
  - **Tanpa foto**: semua foto dihapus (hero beranda, kartu Balai RW, band "Wonokromo, dulu & kini",
    hero SSW) — antarmuka kembali teks + ikon SVG murni; `assets/img/` & `assets/credits.json`
    dihapus dan kode foto di footer/README/SW turut dibersihkan.
  - **"Wonokromo, dulu & kini" dihapus** dari beranda; FAQ langsung mengikuti grid kategori.
  - **Ikon SVG kembali di kartu kategori** (chip berwarna kategori), panah dekoratif dibuang.
  - **Margin FAQ dirapikan**: padding seragam 16px, jarak antar-jawaban konsisten (12/16px),
    jawaban terbuka dipisah garis tipis dari pertanyaannya.
- **Halaman Layanan + permukaan rata (v9)**:
  - **"Layanan" jadi halaman sendiri** (`#layanan`): katalog 9 kategori sebagai kartu teks
    (tanpa ikon di atas kartu — warna kategori muncul saat hover) plus tile pintu masuk ke
    pencari izin SSW; setiap kategori punya halaman sendiri di `#layanan/<kategori>`
    (tombol "Semua kategori" untuk kembali). Anchor lama dialihkan otomatis:
    `#kategori` → `#layanan`, `#grp-<x>` → `#layanan/<x>`, dan judul + meta deskripsi
    mengikuti halaman/kategori yang terbuka.
  - **Beranda dipadatkan**: hero berfoto (DTC Wonokromo) dengan judul besar, strip statistik
    berlabel pendek (44 panduan · 104 izin SSW · 9 kategori), grid kategori ringkas,
    kartu Balai RW berfoto Stasiun, band foto **"Wonokromo, dulu & kini"** (arsip Kurkdjian
    1905–1906 vs Jalan Kranggan 2025), dan FAQ (2 kolom di desktop).
  - **Desain permukaan rata**: pola ornamen dibuang — blob latar, tekstur titik, eyebrow,
    ikon outline samar di banner, garis tipis di kartu, chip bercahaya; bayangan hanya untuk
    elemen yang benar-benar mengambang (drawer, toast, hover lift), blur hanya di header.
  - **Ukuran teks naik** (body 16px; skala 13/14/15/16) supaya nyaman dibaca warga,
    label micro tidak lagi kapital semua, judul halaman layanan lebih besar.
  - **Kartu kategori dirombak jadi teks murni**: panah dan ikon SVG di dalam kartu diganti
    tanda tautan tipografis, supaya tidak terbaca sebagai "deretan kartu ikon".
  - **Lint**: 0 FAIL / 2 WARN (font brand Poppins + em-dash, keduanya disengaja);
    **klik semua jalur lolos** (17 cek: router, redirect, pencarian, drawer, crumb, tema foto).
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
  - Di halaman layanan, **seluruh antarmuka ikut warna kategori**: tombol utama, checkbox,
    progres, chip, link, sorot navigasi, **footer**, dan terutama **mode gelap**
    (latar, kartu, garis, teks, dan cahaya latar semuanya ditintu dari hue halaman).
  - Sorot navigasi (pill bercahaya) mengikuti item yang sedang aktif, dan **ikut warna halaman**;
    di beranda ia bergeser sendiri saat menggulir (atas → *Beranda*, bagian kategori → *Layanan*,
    footer kontak → *Bantuan*).
  - Grup navigasi + tombol tema digeser sedikit ke kanan (jarak tetap 16px dari logo/ikon).
  - Tombol **Beranda** (header, drawer, dan logo) kini benar-benar bekerja: kalau sudah di
    beranda, klik langsung menggulir ke atas.
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

## Foto & kredit

Situs ini tidak lagi memakai foto apa pun (dirapikan pada v9.1) — seluruh visual berupa
ikon SVG yang digambar sendiri di sprite inline, jadi tidak ada aset pihak ketiga yang
perlu diatribusikan. Riwayat foto situs versi v9 (beserta kreditnya) tetap tersimpan
di riwayat commit git.

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
