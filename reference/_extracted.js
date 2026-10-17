/* ============ Data layanan SSW Alfa: [nama, retribusi?, kata kunci] ============ */
const CATS = [
 {n:"Lingkungan Hidup",e:"🌳",s:[
  ["Persetujuan Teknis Pemenuhan Baku Mutu Air Limbah",0,"limbah cair pabrik usaha"],
  ["Izin Perabuan, Pemindahan, Pengangkutan Jenazah",0,"kremasi makam jenazah"],
  ["Surat Keputusan Kelayakan Lingkungan Hidup (SKKLH)",0,"amdal"],
  ["Persetujuan Pernyataan Kesanggupan Pengelolaan Lingkungan Hidup (PKPLH)",0,"ukl upl sppl"],
  ["Izin Pemakaian Ruang Terbuka Hijau",0,"rth taman acara"],
  ["Izin Penebangan / Pemindahan Pohon",0,"tebang potong pohon"],
  ["Izin Pembuangan Sampah",1,"sampah"],
  ["Persetujuan Teknis Pengumpulan Limbah B3",0,"b3 berbahaya"]]},
 {n:"Kebudayaan, Kepemudaan, Olahraga & Pariwisata",e:"🏟️",s:[
  ["Izin Pemakaian Stan pada Taman Hiburan Pantai Kenjeran",1,"kenjeran stand jualan wisata"],
  ["Izin Pemakaian Lahan pada Taman Hiburan Pantai Kenjeran",1,"kenjeran wisata"],
  ["Pemakaian Gedung Balai Budaya",1,"sewa gedung acara"],
  ["Pemakaian Gedung Cagar Budaya Balai Pemuda",1,"sewa gedung acara"],
  ["Pemakaian Ruangan / Lahan pada Museum dan Monumen Tugu Pahlawan",1,"sewa acara"],
  ["Pemugaran Bangunan dan/atau Lingkungan Cagar Budaya",0,"renovasi heritage"],
  ["Pemanfaatan Bangunan dan/atau Lingkungan Cagar Budaya",1,"heritage"],
  ["Pemakaian Lapangan THOR (bayar via VA)",1,"sewa lapangan olahraga"],
  ["Pemakaian Stadion Bung Tomo (bayar via VA)",1,"sewa stadion sepak bola"],
  ["Pemakaian Lapangan Tenis Dharmawangsa (bayar via VA)",1,"sewa lapangan tenis"],
  ["Pemakaian Lapangan Softball Dharmawangsa (bayar via VA)",1,"sewa lapangan"],
  ["Pemakaian Sewa Gelora Pancasila (bayar via VA)",1,"sewa gor olahraga"],
  ["Pemakaian Gelora 10 Nopember (bayar via VA)",1,"sewa stadion"],
  ["Pemakaian Lapangan Hockey Dharmawangsa",1,"sewa lapangan"],
  ["Pemakaian Gelanggang Remaja (bayar via VA)",1,"sewa gor"]]},
 {n:"Pendidikan",e:"🏫",s:[
  ["Daftar Ulang Izin Operasional Satuan Pendidikan",0,"sekolah paud tk kursus"],
  ["Izin Pendirian Satuan Pendidikan",0,"sekolah paud tk dirikan"],
  ["Izin Operasional Satuan Pendidikan",0,"sekolah paud tk"],
  ["Perubahan Izin Operasional Pendidikan",0,"sekolah"]]},
 {n:"Perhubungan, Angkutan & Lalu Lintas",e:"🚌",s:[
  ["ANDALALIN (Analisis Dampak Lalu Lintas)",0,"lalu lintas"],
  ["Surat Keterangan Pemakaian Kios/Stand di Terminal Penumpang Umum",1,"terminal kios"],
  ["Izin Insidentil",0,"angkutan sementara"],
  ["Rekomendasi Perubahan Peruntukan Angkutan Umum menjadi Pribadi",0,"plat kuning hitam kendaraan"],
  ["Rekomendasi Peremajaan/Penggantian Kendaraan Angkutan Umum",0,"kendaraan angkot"],
  ["Mutasi Izin Keluar Kendaraan",0,"kendaraan mutasi"],
  ["Izin Penyelenggaraan Tempat Parkir",0,"parkir"]]},
 {n:"Sumber Daya Air & Bina Marga",e:"💧",s:[
  ["Arahan Sistem Drainase",0,"saluran got banjir"],
  ["Perpanjangan Izin Penempatan Jaringan Utilitas",1,"kabel pipa tiang"],
  ["Izin Pelaksanaan Kegiatan Pembangunan",0,"galian jalan proyek"]]},
 {n:"Pemakaian & Pengelolaan Aset Daerah",e:"🗺️",s:[
  ["Penelitian Pengukuran & Peruntukan Tanah untuk Pemecahan/Penggabungan IPT",0,"surat ijo tanah"],
  ["Penelitian Pengukuran & Peruntukan Tanah untuk Peresmian/Pemutihan IPT",0,"surat ijo tanah"],
  ["Persetujuan Penjaminan Bangunan",0,"agunan jaminan bank surat ijo"],
  ["Persetujuan Pengalihan IPT",0,"surat ijo jual beli"],
  ["Retribusi Izin Pemakaian Rumah (IPR)",1,"rumah dinas"],
  ["Izin Pemakaian Rumah (IPR)",1,"rumah dinas"],
  ["Pemakaian Gedung, Wisma/Kamar, Ruangan/Kelas",1,"sewa gedung ruangan"],
  ["Pengganti IPT",0,"surat ijo hilang"],
  ["Peningkatan Jangka Waktu IPT",0,"surat ijo"],
  ["Perubahan IPT",0,"surat ijo"],
  ["Perpanjangan Izin Pemakaian Tanah (IPT)",0,"surat ijo perpanjang"],
  ["Pengalihan Izin Pemakaian Tanah (IPT)",0,"surat ijo"],
  ["Retribusi IPT",1,"surat ijo bayar"],
  ["Peresmian IPT",0,"surat ijo"],
  ["Pemutihan IPT",0,"surat ijo"],
  ["Permohonan Pecah atau Gabung IPT",0,"surat ijo"],
  ["Blokir IPT",0,"surat ijo"],
  ["Penghapusan Blokir IPT",0,"surat ijo"],
  ["Pengurangan Jangka Waktu IPT",0,"surat ijo"]]},
 {n:"Penanggulangan Bencana",e:"🆘",s:[
  ["Izin Penyelenggaraan Pengumpulan Sumbangan (Bencana)",0,"donasi galang dana"]]},
 {n:"Pemadam Kebakaran & Penyelamatan",e:"🚒",s:[
  ["Rekomendasi Sistem Proteksi Kebakaran",0,"apar hydrant damkar"],
  ["Izin Pemakaian Gedung/Fasilitas Pusdiklat Tenaga Kebakaran",1,"damkar pelatihan"]]},
 {n:"Perumahan Rakyat, Kawasan Permukiman & Pertanahan",e:"🏠",s:[
  ["Persetujuan Bangunan Gedung (PBG)",1,"imb bangun rumah ruko renovasi"],
  ["Sertifikat Laik Fungsi (SLF) Bersyarat",0,"slf bangunan"],
  ["Izin Pemakaian Rusun",0,"rumah susun rusunawa"],
  ["Keterangan Rencana Kota (KRK)",1,"skrk tata ruang"],
  ["Konfirmasi Kesesuaian Kegiatan Pemanfaatan Ruang (KKKPR)",1,"tata ruang kkpr usaha"],
  ["Sertifikat Laik Fungsi (SLF)",0,"slf bangunan"],
  ["Rekomendasi Pertelaan",0,"apartemen strata"]]},
 {n:"Sosial Kemasyarakatan",e:"🤝",s:[
  ["Izin Pengumpulan Sumbangan (Sosial)",0,"donasi galang dana"],
  ["Rekomendasi Izin Pengangkatan Anak (Adopsi)",0,"adopsi anak"],
  ["Surat Tanda Pendaftaran Lembaga Kesejahteraan Sosial (STP-LKS)",0,"panti yayasan lks"]]},
 {n:"Koperasi, Usaha Kecil & Menengah, Perdagangan",e:"🛍️",s:[
  ["Keterangan Susunan Pengurus dan Pengawas Koperasi",0,"koperasi"],
  ["Pemakaian Stan Sentra Makanan dan Minuman",1,"sentra wisata kuliner umkm jualan"]]},
 {n:"Perindustrian & Ketenagakerjaan",e:"🏭",s:[
  ["Pendaftaran Perjanjian Alih Daya",0,"outsourcing"],
  ["Pencatatan Serikat Pekerja/Buruh",0,"serikat buruh"],
  ["Pendaftaran Perjanjian Kerja Bersama (PKB)",0,"pkb"],
  ["Tanda Daftar Lembaga Pelatihan Kerja (LPK) Pemerintah",0,"lpk pelatihan kursus"],
  ["Tanda Daftar Lembaga Pelatihan Kerja (LPK) Perusahaan",0,"lpk pelatihan kursus"],
  ["Tanda Daftar Bursa Kerja Khusus (BKK)",0,"bkk smk loker"],
  ["Pencatatan Lembaga Kerja Sama (LKS) Bipartit",0,"bipartit"],
  ["Pencatatan Perjanjian Kerja Waktu Tertentu (PKWT)",0,"kontrak kerja pkwt"],
  ["Pengesahan Peraturan Perusahaan (PP)",0,"peraturan perusahaan"]]},
 {n:"Pertanian & Ketahanan Pangan",e:"🌾",s:[
  ["Keterangan Terdaftar Kelompok Usaha Garam Rakyat (KUGAR)",0,"garam"],
  ["Persetujuan Pemakaian Stand Sentra Ikan Hias",1,"ikan hias stand"],
  ["Keterangan Terdaftar Kelompok Wanita Tani (KWT)",0,"kwt urban farming ibu"],
  ["SK Pemenuhan Persyaratan Teknis untuk SIVET",0,"dokter hewan praktik"],
  ["Rekomendasi Nomor Kontrol Veteriner",0,"nkv daging"],
  ["Keterangan Terdaftar Kelompok Usaha Bersama (KUB) Nelayan",0,"nelayan"],
  ["Rekomendasi Instalasi Karantina Hewan",0,"karantina hewan"],
  ["Keterangan Terdaftar Kelompok Tani Peternak",1,"ternak"],
  ["Izin Tenaga Kesehatan Hewan",0,"dokter hewan"],
  ["SK Pemenuhan Persyaratan Tempat Pelayanan Paramedik Veteriner",0,"hewan"],
  ["Keterangan Terdaftar Kelompok Pengolah & Pemasar Ikan (POKLAHSAR)",1,"ikan olahan"],
  ["Keterangan Terdaftar Kelompok Pembudidaya Ikan (POKDAKAN)",0,"budidaya ikan lele"],
  ["Keterangan Terdaftar Kelompok Petani",0,"poktan tani"],
  ["Keterangan Terdaftar Kelompok Masyarakat Pengawas (POKMASWAS)",0,"pengawas laut"],
  ["Izin Praktik Tenaga Paramedik Veteriner",0,"hewan"]]},
 {n:"Perpustakaan & Kearsipan",e:"📚",s:[
  ["Tanda Daftar Perpustakaan",0,"perpustakaan taman baca tbm"]]},
 {n:"Penelitian / Magang PKL",e:"🎓",s:[
  ["Surat Keterangan Penelitian (SKP)",0,"magang pkl riset skripsi mahasiswa siswa survei"]]},
 {n:"Metrologi Legal",e:"⚖️",s:[
  ["Layanan Tera / Tera Ulang",1,"timbangan meteran takaran"],
  ["Rekomendasi Penerbitan Tanda Daftar Reparasi",0,"reparasi timbangan"],
  ["Rekomendasi Perpanjangan Tanda Daftar Reparasi",0,"reparasi timbangan"],
  ["Persetujuan Penambahan Cakupan Wilayah Kerja Tanda Daftar Reparasi",0,"reparasi"],
  ["Rekomendasi Penambahan Ruang Lingkup Tanda Daftar Reparasi",0,"reparasi"]]},
 {n:"Pajak & Reklame",e:"📢",s:[
  ["Reklame Insidentil",0,"spanduk banner baliho umbul-umbul acara"],
  ["Izin Penyelenggaraan Reklame Permanen s.d. 8 m²",0,"papan nama neon box billboard toko"]]}
];

/* ============ Kategori & layanan portal ============ */
const GROUPS = [
 ["adminduk","🆔 KTP, KK & Akta"],
 ["surat","📄 Surat Keterangan"],
 ["izin","🏛️ Perizinan & Izin Usaha"],
 ["sosial","🤝 Bantuan Sosial"],
 ["rumah","🏠 Rumah & Lingkungan"],
 ["didik","🎓 Pendidikan"],
 ["sehat","🏥 Kesehatan & Keluarga"],
 ["kerja","💼 Pekerjaan"],
 ["petugas","👔 Untuk Petugas Balai RW"]
];
const BALAIRW = "Materi Pelayanan Balai RW, Pemerintah Kota Surabaya";
const WONO = "Syarat Pelayanan Publik Kecamatan Wonokromo";
const KEC = "Standar Pelayanan Kecamatan (infografis Sistem, Mekanisme, dan Prosedur)";
const WONO_CONTACT = [["💬","WhatsApp Kecamatan Wonokromo","0878 8571 4876","087885714876"],["📞","Telepon Kecamatan Wonokromo","031-5621411","0315621411"]];
const ADM_KV = [["💰 Biaya","Gratis"],["🧾 Yang didapat saat mengajukan","Kitir / tanda terima"]];
const ADM_NOTE = [["","Syarat ini dari Kecamatan Wonokromo. Kecamatan lain di Surabaya umumnya sama, tapi sebaiknya konfirmasi dulu ke kecamatan tempat Anda tinggal."]];
const SYARAT = "Daftar Syarat Pelayanan Kelurahan (layanan online mandiri)";
const KLAMPID = ["Ajukan online: KNG Mandiri ↗","https://wargaklampid-dispendukcapil.surabaya.go.id/app/login"];
const KNG_GUIDE = ["Cara buat akun KNG Mandiri","#kng"];
const KLAMPID_NOTE = ["","Bisa diajukan <b>online mandiri</b> lewat aplikasi <b>KNG Mandiri</b> (Klampid New Generation) di wargaklampid-dispendukcapil.surabaya.go.id, atau datang ke Kelurahan/Kecamatan. Belum punya akun? Lihat <b>Cara Buat Akun KNG Mandiri</b>, atau minta bantuan petugas di Balai RW."];
const SVC = [
 {id:"kng",g:"adminduk",feat:1,e:"🔐",t:"Cara Buat Akun KNG Mandiri",d:"Akun Klampid New Generation untuk mengurus KK, akta, KIA, dan pindah secara online dari HP.",ch:"Online · Dibantu di Balai RW",tags:"kng klampid klampid new generation akun daftar akun dispendukcapil online mandiri adminduk login",
  bring:["HP Android dengan data seluler","Nomor HP / WhatsApp aktif (ada verifikasi lewat WA)","Email yang valid dan aktif di HP (ada notifikasi lewat email)","KTP untuk difoto, atau KK jika KTP hilang"],
  steps:[["Warga","Buka link KNG Mandiri (tombol \"Buka KNG Mandiri\" di bawah halaman ini), lalu klik Buat Akun"],["Warga","Pilih KTP Surabaya atau Non KTP Surabaya"],["Warga","Isi NIK"],["Warga","Isi username: boleh nama, NIK, atau yang lain sesuai keinginan"],["Warga","Isi email yang valid"],["Warga","Isi nomor telepon (HP aktif)"],["Warga","Buat password, lalu ketik ulang di Konfirmasi Password"],["Warga","Centang captcha, lalu klik Simpan / Buat Akun"],["Warga","Verifikasi akun: isi data kembali, upload foto KTP dan selfie dengan KTP. KTP hilang? Upload foto KK dan selfie dengan KK"],["Petugas Dispendukcapil","Memverifikasi akun pada jam kerja, pukul 07.30–16.00 WIB"],["Warga","Verifikasi lewat WhatsApp, sekitar 15 menit. Selesai, akun siap dipakai"]],
  sections:[["🔑 Syarat password",["Minimal 8 karakter","Ada huruf besar dan huruf kecil","Ada angka","Ada karakter khusus, misalnya @ # *"]]],
  notes:[["warn","Email harus benar dan aktif di HP, karena notifikasi dikirim lewat email. Nomor HP juga harus aktif di WhatsApp untuk verifikasi."],["","Akun didaftarkan di luar jam kerja? Verifikasi oleh petugas baru diproses pada jam kerja berikutnya (07.30–16.00 WIB)."],["","Kesulitan mendaftar? Datang ke Balai RW, petugas siap membantu."]],
  contacts:WONO_CONTACT,links:[["Buka KNG Mandiri ↗","https://wargaklampid-dispendukcapil.surabaya.go.id/app/login"],["Syarat KK","#kk"],["Syarat Akta","#akta"]],src:"Tata Cara Pembuatan Akun KNG Mandiri (Dispendukcapil Kota Surabaya)"},
 {id:"kk",g:"adminduk",e:"👨‍👩‍👧‍👦",t:"Kartu Keluarga (KK)",d:"KK hilang, rusak, pecah KK, ganti ke KK barcode, atau ubah biodata.",ch:"Online · Di Kecamatan",tags:"kk kartu keluarga hilang rusak pecah barcode biodata ksk perubahan data nama tanggal lahir pekerjaan agama pendidikan",
  cases:[["KK hilang",["Fotokopi KK (opsional)","Surat keterangan kehilangan dari kepolisian"]],["Ganti ke KK barcode",["Kartu Keluarga","Buku nikah (opsional)"]],["Pecah KK",["Kartu Keluarga","Buku nikah / akta cerai"]],["Perubahan biodata (data di KK)",["Kartu Keluarga","Pendidikan: ijazah terakhir","Status kawin tercatat: buku nikah","Pekerjaan: surat keterangan kerja","Agama: surat keterangan pindah agama"]],["Ubah nama, tanggal lahir, kota lahir, atau nama orang tua",["Wajib punya akta kelahiran","Belum punya akta? Urus sekaligus Akta Kelahiran + Perubahan Biodata (lihat halaman Akta)"]],["KK rusak",["Kartu Keluarga"]]],
  kv:ADM_KV,kvTitle:"💡 Biaya & bukti",notes:[KLAMPID_NOTE].concat(ADM_NOTE),contacts:WONO_CONTACT,links:[KLAMPID,KNG_GUIDE,["Halaman Akta","#akta"]],src:WONO+" dan "+SYARAT},

 {id:"ktp",g:"adminduk",e:"🆔",t:"KTP Elektronik (KTP-el)",d:"Rekam KTP pertama kali, atau KTP hilang, rusak, ganti data, dan KTP lama.",ch:"Di Kecamatan",tags:"ktp ktp-el e-ktp hilang rusak rekam 17 tahun perubahan elemen",
  cases:[["Baru 17 tahun, atau di atas 17 tahun dan baru perekaman",["Fotokopi KK 2 lembar"]],["Hilang, rusak, perubahan elemen (data), atau KTP lama belum elektronik",["Fotokopi KK","Surat kehilangan dari kepolisian (jika hilang)","KTP fisik (jika rusak, perubahan elemen, atau belum elektronik)"]]],
  kv:ADM_KV,kvTitle:"💡 Biaya & bukti",notes:ADM_NOTE,contacts:WONO_CONTACT,src:WONO},
 {id:"kia",g:"adminduk",e:"🧒",t:"Kartu Identitas Anak (KIA)",d:"Kartu identitas untuk anak yang belum punya KTP.",ch:"Online · Di Kecamatan",tags:"kia kartu identitas anak kartu anak",
  bring:["KK orang tua, 1 lembar","Akta kelahiran anak, 1 lembar","Pas foto anak 3×4, 1 lembar (untuk anak usia di atas 5 tahun)","Rapor atau data sekolah"],
  kv:ADM_KV,kvTitle:"💡 Biaya & bukti",notes:[KLAMPID_NOTE],contacts:WONO_CONTACT,links:[KLAMPID,KNG_GUIDE],src:SYARAT},

 {id:"akta",g:"adminduk",e:"📑",t:"Akta Kelahiran, Kematian, Perkawinan & Perceraian",d:"Syarat akta kelahiran (bayi, dewasa, plus perubahan biodata), kematian, perkawinan, dan perceraian.",ch:"Online · Di Kecamatan",tags:"akta kelahiran lahir bayi dewasa kematian meninggal perkawinan nikah perceraian cerai catatan sipil sptjm perubahan biodata",
  cases:[["👶 Akta kelahiran bayi",["Kartu Keluarga asli","Surat nikah asli","Surat keterangan lahir dari dokter/bidan asli","KTP ibu bayi","KTP 2 orang saksi"]],
         ["🧑 Akta kelahiran dewasa (belum pernah punya akta)",["Kartu Keluarga","KTP-el pemohon","KTP 2 orang saksi","Mengisi formulir SPTJM kelahiran","Mengisi formulir SPTJM pasangan suami istri (pengganti buku nikah orang tua)"]],
         ["✏️ Akta kelahiran + perubahan biodata",["KK asli dan KTP asli","Buku nikah orang tua asli","Buku nikah pemohon asli","Ijazah SD, SMP, SMA","Mengisi formulir SPTJM kelahiran","Surat pernyataan bermaterai 10.000","Data pembanding: KK dan akta lahir saudara kandung"]],
         ["🕊️ Akta kematian",["Kartu Keluarga asli","Surat keterangan kematian dari dokter/bidan asli","KTP pelapor","KTP 2 orang saksi","Tidak punya surat dokter/bidan? Isi formulir dari Kelurahan yang ditandatangani dan distempel RT"]],
         ["💍 Akta perkawinan",["Surat keterangan telah terjadinya perkawinan dari pemuka agama","Foto 4×6 berdampingan"]],
         ["📄 Akta perceraian",["Akta perkawinan","Surat pengantar pengadilan","Kartu Keluarga","Salinan putusan pengadilan","Foto 3×4"]]],
  kv:ADM_KV,kvTitle:"💡 Biaya & bukti",notes:[["","SPTJM = Surat Pernyataan Tanggung Jawab Mutlak, yaitu surat pernyataan dari pemohon bahwa data yang disampaikan benar."],KLAMPID_NOTE],contacts:WONO_CONTACT,links:[KLAMPID,KNG_GUIDE],src:SYARAT+" dan "+WONO},

 {id:"pindah",g:"adminduk",e:"🧳",t:"Pindah Keluar & Pindah Masuk",d:"Mengurus surat pindah keluar dari alamat sekarang, atau pindah masuk ke Surabaya.",ch:"Online · Di Kecamatan",tags:"pindah keluar masuk domisili surat pindah mutasi skpwni numpang kk",
  cases:[["🚚 Pindah keluar",["Kartu Keluarga","Kartu Keluarga tujuan (opsional)"]],["🏠 Pindah masuk",["Surat pindah SKPWNI (bagi yang datang dari luar kota)","Mengisi formulir dari Kelurahan","Buku nikah asli","Kartu Keluarga tujuan asli (bila menumpang KK)","Kartu Keluarga penjamin","Foto di depan rumah (dicetak)"]]],
  kv:ADM_KV,kvTitle:"💡 Biaya & bukti",notes:[["","SKPWNI = Surat Keterangan Pindah Warga Negara Indonesia, diurus di daerah asal sebelum pindah."],KLAMPID_NOTE],contacts:WONO_CONTACT,links:[KLAMPID,KNG_GUIDE],src:WONO+" dan "+SYARAT},
 {id:"ikd",g:"adminduk",e:"📲",t:"Aktivasi IKD (KTP Digital)",d:"Identitas Kependudukan Digital: KTP di HP lewat aplikasi IKD.",ch:"Aplikasi + Balai RW",tags:"ikd identitas kependudukan digital ktp digital aktivasi",
  bring:["HP Android dengan aplikasi IKD (Play Store)","NIK dan email aktif","Datang ke Balai RW untuk scan barcode ke petugas"],
  steps:[["Warga","Unduh dan instal aplikasi Identitas Kependudukan Digital (IKD) di Play Store"],["Warga","Isi data pribadi: NIK, nama, dan email"],["Warga","Verifikasi wajah pemohon lewat kamera HP"],["Warga & petugas Balai RW","Datang ke Balai RW, scan barcode ke petugas"],["Warga","Verifikasi dan aktivasi PIN lewat email"],["Warga","Aktivasi IKD berhasil"]],
  notes:[["","Scan barcode untuk aktivasi IKD bisa dilakukan di <b>Balai RW seluruh Kecamatan Wonokromo</b>, pukul 08.00–16.00 WIB. Petugas juga bisa membantu dari langkah pertama."]],contacts:WONO_CONTACT,src:"Infografis Langkah-Langkah Aktivasi IKD"},

 {id:"ahliwaris",g:"surat",allOpen:1,e:"⚖️",t:"Surat Keterangan Ahli Waris (SKAW)",d:"Surat yang menerangkan siapa saja ahli waris dari orang yang meninggal.",ch:"Online SSW Alfa · Kelurahan",tags:"ahli waris skaw warisan waris pewaris sidang waris",
  cases:[["Dokumen pewaris (almarhum)",["Fotokopi KK / KTP pewaris","Fotokopi akta kematian pewaris","Fotokopi surat nikah almarhum, dilegalisir"]],["Dokumen ahli waris",["Fotokopi KK dan KTP suami/istri ahli waris","Fotokopi KK dan KTP ahli waris","Fotokopi akta kelahiran ahli waris","Fotokopi akta kematian ahli waris (jika ada ahli waris yang sudah meninggal)"]],["Surat & saksi",["Surat pengantar RT/RW","Fotokopi KTP 2 orang saksi","Formulir permohonan SKAW (disediakan Kelurahan)","Surat pernyataan ahli waris sesuai silsilah keluarga, ditandatangani para ahli waris dan 2 saksi, bermaterai","Surat pernyataan kebenaran dokumen"]]],
  steps:[["Pemohon","Ajukan online mandiri di sswalfa.surabaya.go.id, atau serahkan berkas ke Kelurahan"],["Petugas Kelurahan","Memeriksa kelengkapan. Jika belum lengkap, berkas dikembalikan untuk dilengkapi"],["Pemohon","Menandatangani surat pernyataan kebenaran dokumen"],["Kelurahan","Sidang waris di kantor Kelurahan, wajib dihadiri semua ahli waris dan saksi"],["Kelurahan","Menyerahkan berkas permohonan ke Kecamatan"],["Petugas Kecamatan","Memverifikasi dan memproses berkas"],["Kelurahan","Menyerahkan Surat Keterangan Ahli Waris kepada pemohon"]],
  kv:[["⏱️ Lama proses","1 hari"],["💰 Biaya","Gratis"],["📑 Berkas","Rangkap 2"]],kvTitle:"Waktu & biaya",
  notes:[["warn","Bawa <b>berkas asli</b> untuk dicocokkan dengan fotokopi. <b>Semua nama</b> di semua dokumen harus sama persis, tanpa perbedaan."],["warn","<b>Semua ahli waris dan saksi wajib datang</b> saat sidang waris di kantor Kelurahan."],["","SKAW yang bisa diurus di Kelurahan hanya untuk <b>satu tingkat keturunan</b>, yaitu antara orang tua dan anak (Peraturan Wali Kota Nomor 50 Tahun 2021)."]],
  contacts:WONO_CONTACT,links:[["Ajukan lewat SSW Alfa","#ssw"]],src:SYARAT+", "+KEC+", dan "+WONO},

 {id:"skm",g:"surat",feat:1,e:"📝",t:"Surat Keterangan Miskin (SKTM) & Desil",d:"Diajukan online lewat e-Pelayanan Dinas Sosial Kota Surabaya. Surat dikirim lewat WhatsApp.",ch:"Online e-Pelayanan Dinsos",tags:"sktm skm surat keterangan miskin tidak mampu surat keterangan desil dinsos dinas sosial e-pelayanan keringanan pdam rusun denda akte bantuan hukum isbat nikah sidang waris rehabilitasi napza pendidikan",
  bring:["Foto KTP dan foto KK (untuk daftar akun)","Email aktif (untuk verifikasi dan kode OTP saat login)","Nomor HP / WhatsApp aktif (surat dikirim lewat WA)","Scan KK, format PDF/foto, maksimal 2 MB"],
  steps:[["Warga","Buka e-Pelayanan Dinas Sosial di dinassosial.surabaya.go.id/pelayanan"],["Warga","Belum punya akun? Klik Pendaftaran Akun → Daftar akun, lalu isi data diri sesuai KK/KTP"],["Warga","Upload foto KTP dan foto KK, isi email aktif, nomor HP, dan password, lalu simpan"],["Warga","Masuk dengan NIK dan password, centang \"Saya bukan robot\", lalu klik Masuk"],["Warga","Buka Pelayanan Surat Keterangan → tab Pengajuan, lalu pilih jenis surat: Surat Keterangan Miskin atau Surat Keterangan Desil"],["Warga","Isi formulir, upload dokumen, lalu klik Kirim"],["Dinas Sosial","Memproses pengajuan. Pantau di tab Menunggu dan Selesai; surat dikirim lewat WhatsApp"]],
  cases:[["📝 Surat Keterangan Miskin",["NIK pemohon","Scan Kartu Keluarga (PDF/foto, maks. 2 MB)","Pilih keperluan: pendidikan; bantuan hukum (perceraian, rehabilitasi napza, sidang waris, isbat nikah); keringanan PDAM; perpanjangan dan permohonan rusun; denda akta kelahiran; atau lainnya","Nomor WhatsApp aktif","Scan surat dari instansi yang meminta Surat Keterangan Miskin (PDF/foto, maks. 2 MB)","Alamat tempat tinggal saat ini"]],["📊 Surat Keterangan Desil",["NIK pemohon","Scan Kartu Keluarga (PDF/foto, maks. 2 MB)","Tulis keperluannya","Nomor WhatsApp aktif","Dokumen pendukung, wajib (PDF/foto, maks. 2 MB)"]]],
  sections:[["🧾 Data yang diisi saat daftar akun",["NIK, nomor KK, nama, jenis kelamin, hubungan keluarga, status kawin","Tempat dan tanggal lahir, agama, pendidikan terakhir, pekerjaan","Alamat sesuai KK, RT, RW, provinsi, kabupaten/kota, kecamatan, kelurahan","Alamat tempat tinggal saat ini: sama dengan KK atau tidak","Foto KTP, foto KK, email, nomor HP, password"]],["🔑 Syarat password",["Minimal 8 karakter","Ada huruf besar dan huruf kecil","Ada angka","Ada simbol khusus, misalnya @ # $"]]],
  notes:[["","Lupa password? Klik <b>Reset password</b>. Email salah atau belum terverifikasi? Klik <b>Perbaiki email</b>. Keduanya ada di halaman login e-Pelayanan."],["","Ada kendala saat mengirim? Gunakan <b>Google Chrome versi terbaru</b>."],["warn","Dengan sengaja memalsukan identitas atau dokumen dapat diancam pidana penjara 6 tahun atau denda Rp50 juta (Undang-Undang Nomor 23 Tahun 2006)."],["","Kesulitan mendaftar atau mengunggah dokumen? Datang ke Balai RW, petugas siap membantu."]],
  links:[["Buka e-Pelayanan Dinsos ↗","https://dinassosial.surabaya.go.id/pelayanan"],["Cek & Sanggah Desil","#desil"]],src:"e-Pelayanan Dinas Sosial Kota Surabaya (dinassosial.surabaya.go.id)"},
 {id:"suket",g:"surat",e:"📝",t:"Surat Keterangan",d:"Surat keterangan umum dari Kecamatan untuk berbagai keperluan.",ch:"Di Kecamatan",tags:"surat keterangan suket domisili keterangan kecamatan",
  bring:["KTP","KK","Surat pengantar RT"],
  steps:[["Pemohon","Menyerahkan berkas permohonan dan persyaratan"],["Petugas","Memverifikasi berkas yang sudah lengkap"],["Petugas","Memproses berkas permohonan"],["Petugas","Menyerahkan surat keterangan setelah dicatat di buku agenda Kecamatan"]],
  kv:[["⏱️ Lama proses","1 hari"],["💰 Biaya","Gratis"]],kvTitle:"Waktu & biaya",contacts:WONO_CONTACT,src:KEC},
 {id:"asesmen",g:"surat",e:"🎪",t:"Surat Hasil Asesmen Kegiatan",d:"Dasar untuk izin keramaian dari Polsek/Polrestabes, misalnya acara, hajatan, atau lomba.",ch:"Di Kecamatan",tags:"asesmen kegiatan izin keramaian acara hajatan konser lomba event polsek",
  bring:["Surat pengantar RT dan RW","Surat pengantar dari Kelurahan","Fotokopi KTP dan KSK (Kartu Susunan Keluarga / KK)","Surat pernyataan pemohon bermaterai (untuk pemohon perorangan)","Proposal kegiatan (untuk kegiatan yang lebih besar)"],
  steps:[["Pemohon","Membawa berkas kelengkapan ke Kecamatan"],["Pemohon, Kelurahan & 3 pilar","Survei lokasi pelaksanaan bersama Kecamatan, Koramil, dan Polsek"],["Kecamatan","Hasil survei menjadi dasar penerbitan surat izin dari Polsek / Polrestabes"]],
  kv:[["⏱️ Lama proses","1 minggu*"],["💰 Biaya","Gratis"]],kvTitle:"Waktu & biaya",kvNote:"*Dihitung setelah berkas lengkap. Ajukan jauh-jauh hari sebelum acara.",
  contacts:WONO_CONTACT,src:KEC},
 {id:"nikah",g:"surat",e:"💒",t:"Surat Pengantar Nikah",d:"Berkas pengantar dari Kelurahan untuk mendaftar nikah.",ch:"Online SSW Alfa · Kelurahan",tags:"nikah menikah pengantar nikah n1 n4 kua catin kawin",
  bring:["Surat pengantar RT/RW","KTP kedua calon","Kartu Keluarga kedua calon","Akta lahir / ijazah kedua calon","KTP 2 orang saksi (warga Surabaya)","Pas foto 3×4 latar biru: 5 lembar (warga kelurahan setempat) atau 3 lembar (luar kelurahan)","Janda/duda: akta kematian pasangan atau akta cerai"],
  notes:[["","Bisa diajukan <b>online mandiri</b> lewat <b>sswalfa.surabaya.go.id</b> atau datang ke Kelurahan."]],contacts:WONO_CONTACT,links:[["Panduan SSW Alfa","#ssw"],["Dispensasi Nikah","#dispensasi"]],src:SYARAT},
 {id:"belumnikah",g:"surat",e:"🧾",t:"Keterangan Belum Menikah / Janda-Duda",d:"Surat keterangan belum menikah, atau janda/duda yang belum menikah lagi.",ch:"Online SSW Alfa · Kelurahan",tags:"belum menikah belum kawin janda duda status perkawinan keterangan lajang",
  cases:[["💍 Belum pernah menikah",["Surat pengantar RT/RW","Kartu Keluarga","KTP pemohon + KTP 2 orang saksi","Surat pernyataan bermaterai 10.000, ditandatangani 2 saksi (formulir disediakan Kelurahan)"]],["🕊️ Janda/duda belum menikah lagi",["Surat pengantar RT/RW","Kartu Keluarga","KTP pemohon + KTP 2 orang saksi","Surat pernyataan bermaterai 10.000, ditandatangani 2 saksi (formulir disediakan Kelurahan)","Akta cerai / akta kematian pasangan"]]],
  notes:[["","Bisa diajukan <b>online mandiri</b> lewat <b>sswalfa.surabaya.go.id</b> atau datang ke Kelurahan."]],contacts:WONO_CONTACT,links:[["Panduan SSW Alfa","#ssw"]],src:SYARAT},
 {id:"domisiliusaha",g:"surat",e:"🏪",t:"Keterangan Domisili Usaha",d:"Surat keterangan lokasi usaha, diajukan lewat SSW Alfa.",ch:"Online SSW Alfa",tags:"domisili usaha sku keterangan usaha lokasi usaha umkm",
  bring:["Surat pengantar RT/RW","Dokumen akta pendirian dan/atau NIB","KTP pemohon","Kartu Keluarga","Foto lokasi usaha","Surat pernyataan"],
  notes:[["","Diajukan <b>online mandiri</b> lewat <b>sswalfa.surabaya.go.id</b>. Belum punya NIB? Lihat panduan OSS."]],contacts:WONO_CONTACT,links:[["Panduan SSW Alfa","#ssw"],["Buat NIB di OSS","#oss"]],src:SYARAT},
 {id:"dispensasi",g:"surat",e:"💍",t:"Dispensasi Nikah",d:"Surat keterangan dispensasi nikah dari Kelurahan/Kecamatan.",ch:"Di Kecamatan",tags:"dispensasi nikah menikah kawin kua catin n1 n4 n7",
  bring:["Formulir N1–N4 calon mempelai dari Kelurahan","Formulir N7 dari KUA setempat","KK asli","Surat pernyataan belum pernah menikah","Foto 4×6 calon mempelai, 2 lembar","Surat keterangan kesehatan calon pengantin dari Puskesmas"],
  extra:[["Jika ada kondisi khusus",["Calon mempelai berstatus cerai hidup/mati: lampirkan akta perceraian dari pengadilan / Catatan Sipil, atau akta kematian","Salah satu calon mempelai WNA: lampirkan KITAP/KITAS yang masih berlaku"]]],
  steps:[["Pemohon","Menyerahkan berkas melalui loket pelayanan"],["Petugas","Memverifikasi berkas yang sudah lengkap"],["Petugas","Memproses berkas permohonan"],["Petugas","Menyerahkan surat keterangan dispensasi nikah setelah dicatat di buku agenda Kelurahan/Kecamatan"]],
  kv:[["⏱️ Lama proses","1 hari"],["💰 Biaya","Gratis"]],kvTitle:"Waktu & biaya",contacts:WONO_CONTACT,src:KEC},

 {id:"ssw",g:"izin",e:"🏙️",t:"SSW Alfa",d:"Perizinan online Pemkot Surabaya: buat akun, ajukan, pantau, cetak izin.",ch:"Online",tags:"izin online perizinan dpmptsp",feat:1,special:1},
 {id:"oss",g:"izin",e:"🏪",t:"OSS RBA: Akun & NIB Usaha Mikro",d:"Buat akun OSS lalu terbitkan NIB, identitas resmi pelaku usaha. Gratis.",ch:"Online · Didampingi di Balai RW",tags:"oss nib izin usaha umkm umk usaha mikro nomor induk berusaha kbli",feat:1,special:1},
 {id:"pusat",g:"izin",e:"📍",t:"Lokasi Layanan & Kanal Bantuan Perizinan",d:"5 Sentra Pelayanan Publik, pendampingan di Balai RW, Takon Sobat, SIPINTAR, dan Wargaku.",ch:"Datang / Online",tags:"spp sentra pelayanan publik mpp siola menur pakal nambangan joyoboyo takon sobat sipintar wargaku pengaduan konsultasi dpmptsp",
  kv:[["🧾 Total layanan elektronik","1.330 layanan"],["🏢 Perizinan berusaha (lewat OSS)","1.118 KBLI"],["🧩 PB-UMKU (lewat OSS)","55 layanan"],["📄 Perizinan non berusaha (lewat SSW Alfa)","101 layanan"],["📝 Pelayanan non perizinan (lewat SSW Alfa)","52 layanan"]],kvTitle:"📊 Layanan perizinan Kota Surabaya",kvNote:"Perizinan berusaha dibagi menurut tingkat risiko: rendah 491, menengah rendah 298, menengah tinggi 272, tinggi 57 KBLI. Persyaratan dasar: KKKPR, KKPRL, Persetujuan Lingkungan, serta PBG dan SLF. Sumber data: Peraturan Pemerintah Nomor 28 Tahun 2025.",
  extra:[["🏘️ Pelayanan di Balai RW",["Pendampingan pembuatan NIB usaha mikro (lewat OSS)","Informasi dan pendampingan SSW Alfa: pembuatan akun dan cara mengakses"]],
         ["🏢 Sentra Pelayanan Publik (SPP) di 5 wilayah",["Surabaya Pusat: MPP Siola, Jl. Tunjungan No. 1–3","Surabaya Timur: SPP Menur, Jl. Menur 31 C","Surabaya Barat: SPP Pakal, Taman Cahaya Pakal, Jl. Raya Pakal","Surabaya Utara: SPP Nambangan, Taman Segoro, Jl. Nambangan No. 1","Surabaya Selatan: SPP Joyoboyo, Terminal Intermoda Joyoboyo (TIJ) Lt. 3"]],
         ["📱 Kanal pengaduan & informasi",["Takon Sobat: konsultasi perizinan berusaha (OSS) dan non berusaha (SSW Alfa) lewat WhatsApp","SIPINTAR (Sistem Informasi Perizinan dan Investasi Kota Surabaya), dengan asisten Cak Bot: dpm-ptsp.surabaya.go.id/sipintar","Aplikasi Wargaku: untuk mengakses berbagai layanan publik dan pengaduan Pemerintah Kota Surabaya"]]],
  contacts:[["💬","Takon Sobat (WhatsApp)","+62 852-3498-2434","6285234982434"],["🤖","SIPINTAR","dpm-ptsp.surabaya.go.id/sipintar","","https://dpm-ptsp.surabaya.go.id/sipintar/"],["🌐","Situs DPMPTSP","dpm-ptsp.surabaya.go.id","","https://dpm-ptsp.surabaya.go.id"],["📷","Instagram / TikTok","@dpmptspsby"],["▶️","YouTube","DPM-PTSP Surabaya"]],
  links:[["Panduan SSW Alfa","#ssw"],["Panduan OSS & NIB","#oss"]],src:"Materi Layanan Perizinan dan Non Perizinan di Balai RW, Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Kota Surabaya"},
 {id:"pbg",g:"izin",e:"🏗️",t:"PBG (dulu IMB)",d:"Izin untuk membangun baru, mengubah, memperluas, atau merawat bangunan.",ch:"Online",tags:"imb pbg izin mendirikan bangunan bangun rumah renovasi",
  steps:[["Pemohon","Unggah berkas permohonan"],["UPTSA / Kecamatan","Verifikasi data"],["Dinas","Berkas diproses di dinas"],["Dinas","Mengirim pemberitahuan pengantar bayar"],["Pemohon","Membayar retribusi"],["UPTSA","Konfirmasi pembayaran"],["Dinas","Cetak dan pengesahan SK"],["Pemohon","SK terbit"]],
  kv:[["🏡 Rumah tinggal","1 hari kerja"],["🏪 UMKM","2 hari kerja"],["🏢 Non rumah tinggal, non-TABG","3 hari kerja"],["🏬 Non rumah tinggal, TABG","10 hari kerja"]],kvTitle:"⏱️ Lama proses",
  bring:["Fotokopi SKRK dan/atau IMB lama beserta gambar (untuk perubahan IMB)","Fotokopi KTP pemohon dan/atau pemilik tanah, atau akta pendirian badan hukum","Surat kuasa dan fotokopi KTP penerima kuasa, jika dikuasakan","Fotokopi bukti kepemilikan tanah (dilegalisir)","Surat pernyataan pertanggungjawaban pendirian bangunan","Foto lokasi persil (bidang tanah) yang diajukan","Gambar rencana teknis bangunan format CAD","Gambar dan perhitungan struktur, SKA struktur, dan surat pernyataan tanggung jawab perencana struktur","Rekomendasi Tim Ahli Cagar Budaya (khusus bangunan cagar budaya)"],
  extra:[["🏢 Lewat Kecamatan: bangunan < 500 m² (gratis, 1 hari)",["KTP","Formulir permohonan IMB","Legalisir surat tanah","Foto persil yang diajukan","Denah rencana pembangunan","SKRK asli","Yang didapat: tanda terima bahwa berkas sudah masuk"]],["Tambahan: rumah tinggal > 2 lantai / > 500 m² oleh pengembang",["BAST PSU (serah terima prasarana, sarana, dan utilitas)","Fotokopi SPPL atau izin lingkungan, rekomendasi drainase, dan rekomendasi lalu lintas"]],
         ["Tambahan: non rumah tinggal usaha mikro",["Fotokopi SPPL atau izin lingkungan, rekomendasi drainase, dan rekomendasi lalu lintas","Surat pernyataan usaha mikro"]],
         ["Tambahan: non rumah tinggal non-TABG",["BAST PSU (untuk pengembang)","Fotokopi SPPL atau izin lingkungan, rekomendasi drainase, dan rekomendasi lalu lintas"]],
         ["Tambahan: non rumah tinggal TABG",["Gambar rencana teknis yang sudah direkomendasi TABG","Gambar dan perhitungan struktur dengan data tanah, SKA struktur, dan surat pernyataan perencana struktur yang sudah direkomendasi TABG","Gambar skematik dan analisa MEP (Mekanikal, Elektrikal, Plumbing) yang sudah direkomendasi TABG","BAST PSU","Fotokopi SPPL atau izin lingkungan, rekomendasi drainase, dan rekomendasi lalu lintas"]]],
  notes:[["warn","Informasi ini dari brosur IMB lama. Di SSW Alfa, layanan ini sekarang bernama <b>Persetujuan Bangunan Gedung (PBG)</b>. Cek ulang persyaratan terbaru di halaman layanannya."],["","TABG = Tim Ahli Bangunan Gedung. Bangunan yang perlu pertimbangan TABG antara lain bangunan untuk kepentingan umum, bangunan di bawah tanah/air, atau di atas prasarana umum."]],
  contacts:[["🏢","Dinas Perumahan Rakyat dan Kawasan Permukiman serta Pertanahan","Jl. Taman Surya No. 1, Surabaya 60272"],["📞","Telepon","031-5312144 ext. 130 / 534","0315312144"],["📷","Instagram","@disperkim.surabaya"],["🌐","Situs","etakok-dprkpp.surabaya.go.id","","https://etakok-dprkpp.surabaya.go.id"]],
  links:[["Ajukan lewat SSW Alfa","#ssw"]],src:BALAIRW+" (brosur Pelayanan IMB)"},
 {id:"skrk",g:"izin",e:"🗺️",t:"SKRK (Surat Keterangan Rencana Kota)",d:"Informasi aturan tata bangunan dan lingkungan untuk satu lokasi tanah.",ch:"Online",tags:"skrk krk rencana kota tata ruang peruntukan tanah",
  steps:[["Pemohon","Mendaftar melalui sswalfa.surabaya.go.id"],["DPMPTSP","Verifikasi kelengkapan persyaratan administrasi"],["DPRKPP","Verifikasi persyaratan teknis dan overlay (pencocokan) dengan peta tata ruang"],["DPRKPP","Mengesahkan SKRK, lalu dicetak di DPMPTSP"],["Pemohon","Mengambil SKRK di DPMPTSP"]],
  kv:[["⏱️ Lama proses","3 hari kerja*"],["💰 Biaya (menurut brosur)","Gratis"]],kvTitle:"Waktu & biaya",kvNote:"*Dihitung sejak berkas dinyatakan lengkap, benar, dan sesuai ketentuan.",
  bring:["Formulir permohonan SKRK","Fotokopi KTP pemohon (WNI)","Fotokopi Izin Tinggal Terbatas/Tetap (WNA atas nama badan hukum)","Fotokopi akta pendirian badan hukum dan perubahannya (untuk badan hukum)","Surat kuasa dan fotokopi KTP penerima kuasa","Fotokopi bukti status kepemilikan tanah","Gambar sketsa persil yang ditandatangani pemohon (jika melampirkan 2 bukti kepemilikan atau lebih)","Surat pernyataan keabsahan dan kebenaran dokumen, bermaterai","SKRK asli, untuk perencanaan ulang (replanning) atau revisi"],
  extra:[["🏢 Lewat Kecamatan: lahan < 500 m² (gratis, 1 hari)",["Fotokopi KTP","Legalisir surat tanah","Formulir permohonan SKRK","Foto persil yang diajukan","Sketsa persil","Yang didapat: tanda terima bahwa berkas sudah masuk"]],["Jenis surat tanah & siapa yang melegalisir",["Sertifikat Hak Milik (SHM): BPN, Notaris, dan PPAT","Sertifikat Hak Guna Bangunan (SHGB): BPN, Notaris, dan PPAT","Surat Ijin Pemakaian Tanah (SIPT): DPBT (Dinas Tanah)","Petok D / Letter C: diketahui dan dilegalisir Lurah/Camat","Hak Pengelolaan Lahan (HPL): PT. Pelindo III","Surat Izin Pinjam Pakai (SIPP): diketahui Komandan Utama TNI AL"]]],
  notes:[["warn","Di daftar SSW Alfa saat ini, layanan ini bernama <b>Keterangan Rencana Kota (KRK)</b> dan berlabel <b>ada retribusi</b>, berbeda dengan brosur yang menyebut gratis. Pastikan biaya terbaru di SSW Alfa."],["","Kuasa hanya boleh diberikan kepada keluarga/saudara, atau staf/bawahan, dibuktikan dengan fotokopi KK atau surat pernyataan bermaterai, atau surat keterangan kepegawaian bermaterai."],["","Status peruntukan tanah bisa dicek sendiri di <b>petaperuntukan-dprkpp.surabaya.go.id</b>."]],
  contacts:[["🏢","Meeting Point DPRKPP","Jl. Taman Surya No. 1, Surabaya"],["📷","Instagram","@tatakota_surabaya"],["🌐","Situs","etakok-dprkpp.surabaya.go.id","","https://etakok-dprkpp.surabaya.go.id"]],
  links:[["Ajukan lewat SSW Alfa","#ssw"],["Cek peta peruntukan ↗","https://petaperuntukan-dprkpp.surabaya.go.id"]],src:BALAIRW+" (brosur Pelayanan SKRK)"},

 {id:"cekstatus",g:"sosial",feat:1,e:"🔎",t:"Cek Desil & Status Gamis/Pramis",d:"Cek desil DTSEN dan status keluarga miskin (gamis) atau pra-miskin (pramis) Pemkot Surabaya secara online.",ch:"Online · Dibantu di Balai RW",tags:"cek desil cek gamis pramis keluarga miskin pra miskin sikeluargamiskin stiker status bansos nik nonaktif dtsen cekbansos cek status",
  kv:[["📊 Desil DTSEN","Data pusat (BPS & Kemensos)"],["🏠 Gamis / Pramis","Data Pemkot Surabaya"]],kvTitle:"🧭 Dua data yang berbeda",kvNote:"Desil dipakai untuk bansos pusat (PKH, sembako, BPJS PBI). Status gamis (keluarga miskin) dan pramis (keluarga pra-miskin) dipakai untuk intervensi Pemkot Surabaya. Seseorang bisa tercatat di salah satu saja, jadi cek keduanya.",
  bring:["HP dengan internet","NIK / KTP","Kartu Keluarga"],
  sections:[["1️⃣ Cek desil DTSEN",["Buka cekbansos.kemensos.go.id","Pilih provinsi, kabupaten/kota, kecamatan, dan kelurahan, lalu isi nama sesuai KTP","Atau pakai aplikasi Cek Bansos: login, lalu buka menu Profil untuk melihat peringkat desil"]],
            ["2️⃣ Cek status gamis / pramis",["Buka sikeluargamiskin.surabaya.go.id (SI Keluarga Miskin, Dinas Sosial Kota Surabaya)","Pilih menu Cek Keluarga Miskin / Keluarga Pra Miskin, lalu isi data yang diminta","Hasilnya menampilkan status keluarga dan bantuan yang diterima, misalnya PKH, BPNT, permakanan, padat karya, atau seragam sekolah"]],
            ["3️⃣ Cek stiker keluarga miskin",["Rumah keluarga miskin biasanya ditempeli stiker ber-barcode","Buka sikeluargamiskin.surabaya.go.id, pilih Cek Stiker, lalu arahkan kamera HP ke barcode di stiker"]],
            ["4️⃣ NIK tiba-tiba nonaktif?",["Pemkot Surabaya menonaktifkan sementara NIK warga yang belum tercatat dalam survei DTSEN","Konfirmasi data lewat cekinwarga.surabaya.go.id/konfirmasi-data-survey, atau datang ke Kelurahan","Setelah diverifikasi dan memenuhi syarat, layanan aktif kembali"]],
            ["❓ Hasilnya tidak sesuai?",["Desil tidak sesuai: ajukan pembaruan lewat halaman Cek & Sanggah Desil","Belum terdaftar gamis padahal layak: lihat halaman Usulan Data Keluarga Miskin (lewat RT/RW)","Butuh surat keterangan: lihat halaman SKTM & Surat Keterangan Desil","Bingung? Datang ke Balai RW, petugas siap membantu mengecek"]]],
  links:[["Cek desil ↗","https://cekbansos.kemensos.go.id"],["Cek gamis/pramis ↗","https://sikeluargamiskin.surabaya.go.id"],["Konfirmasi NIK ↗","https://cekinwarga.surabaya.go.id/konfirmasi-data-survey"],["Sanggah desil","#desil"],["Usulan keluarga miskin","#gamis"],["SKTM & Surat Ket. Desil","#skm"]],
  src:"Kemensos (Cek Bansos), SI Keluarga Miskin Dinas Sosial Kota Surabaya, dan laman resmi surabaya.go.id"},
 {id:"desil",g:"sosial",e:"📊",t:"Cek & Sanggah Desil DTSEN",d:"Desil menentukan siapa yang dapat bansos dan BPJS PBI. Begini cara cek dan mengusulkan pembaruan datanya.",ch:"Online · Dibantu di Balai RW",feat:1,tags:"desil dtsen sanggah usul cek bansos pemutakhiran pembaruan data pbi bpjs bps kemensos peringkat kesejahteraan",
  kv:[["🔴 Desil 1–4","Miskin · prioritas PKH & sembako"],["🟠 Desil 1–5","Bisa dapat BPJS PBI"],["🟡 Desil 5–6","Hidup pas-pasan"],["🟢 Desil 7–10","Sejahtera · bukan prioritas"]],kvTitle:"🎚️ Arti desil",kvNote:"Desil = peringkat kesejahteraan keluarga di DTSEN (Data Tunggal Sosial Ekonomi Nasional), dari 1 (10% termiskin) sampai 10 (10% terkaya).",
  bring:["HP dengan aplikasi Cek Bansos (Google Play / App Store)","KTP dan Kartu Keluarga","Swafoto (selfie) dan foto KTP untuk membuat akun","Data kondisi keluarga terbaru: pekerjaan, penghasilan, kondisi rumah, listrik, aset"],
  steps:[["Warga","Unduh aplikasi Cek Bansos (Kementerian Sosial) di Google Play atau App Store"],["Warga","Buat akun atau masuk: isi data diri lengkap, unggah swafoto dan foto KTP"],["Warga","Buka menu Profil, cek status desil, lalu klik \"Request Pembaharuan Data\""],["Warga","Klik \"Ya, Setuju\", isi 39 variabel DTSEN sesuai kondisi terbaru, lalu klik Kirim/Submit"],["Pendamping Sosial Kemensos","Verifikasi lapangan ke rumah warga"],["Kemensos RI & BPS","Data divalidasi bertahap oleh Kemensos RI, lalu pemeringkatan desil dilakukan oleh BPS"]],
  sections:[["🤔 Kenapa desil saya tinggi?",["Desil dihitung dari data yang terhubung dengan NIK, bukan karena ada petugas yang sengaja menaikkan.","Contoh yang bisa membuat desil naik: punya kredit/utang bank, cicilan motor, emas di pegadaian, pinjaman online atau PayLater, tabungan cukup besar, sertifikat tanah, kendaraan lebih dari satu motor atau punya mobil.","Juga: rumah permanen (tembok, lantai keramik), daya listrik tinggi, penghasilan di atas UMK, ada anggota keluarga ASN, punya BPJS Ketenagakerjaan, atau di KK tercatat bekerja sebagai karyawan swasta/wiraswasta.","Coba ingat: KTP pernah dipakai untuk apa saja? Kalau data di KK (misalnya pekerjaan) sudah tidak sesuai, perbarui juga di Dukcapil."]],
            ["🛣️ Jalur lain selain aplikasi",["Isi formulir pemutakhiran mandiri BPS di dtsen-form.bps.go.id","Datang ke Kelurahan: petugas mencatat, lalu Dinas Sosial bersama Kelurahan melakukan survei lapangan","WhatsApp Kemensos 0887-7171-171 atau call center 171"]],
            ["🧑‍💼 Untuk petugas Balai RW",["Bantu warga mengecek desil di cekbansos.kemensos.go.id atau aplikasi Cek Bansos","Pastikan masalahnya: warga miskin tercatat di desil 6–10, atau keluarga mampu tercatat di desil rendah","Pandu pengisian di aplikasi. Jika warga tidak bisa, catat dan teruskan ke Kelurahan untuk verifikasi lapangan","Catat setiap pengajuan: nama, NIK, desil sekarang, alasan, tanggal, dan jalur yang dipakai","RT/RW diminta melaporkan warga miskin yang tercatat di desil 6–10 ke Kelurahan"]]],
  notes:[["warn","Desil ditetapkan oleh pemerintah pusat. Dinas Sosial dan Kelurahan hanya <b>memverifikasi dan mengusulkan</b> perubahan, tidak bisa mengubah desil secara langsung."],["","Perubahan <b>tidak langsung</b> terjadi. Data diperbarui berkala, dan hasilnya bisa naik, turun, atau tetap. Di Surabaya, dari 3.283 sanggahan sampai September 2026: 1.845 turun desil, 345 naik, 1.093 tetap."],["","Desil DTSEN berbeda dengan data keluarga miskin/pra-miskin milik Pemkot Surabaya. Lihat juga <b>Usulan Data Keluarga Miskin</b>."]],
  contacts:[["☎️","Bantuan akun Cek Bansos","171","171"],["💬","WhatsApp Kemensos","0887-7171-171","088771711171"],["🌐","Dinas Sosial Kota Surabaya","dinassosial.surabaya.go.id","","https://dinassosial.surabaya.go.id/"]],
  links:[["Cek desil online ↗","https://cekbansos.kemensos.go.id"],["Formulir BPS ↗","https://dtsen-form.bps.go.id"],["Cek status gamis/pramis","#cekstatus"],["Surat Keterangan Desil","#skm"],["Usulan Data Keluarga Miskin","#gamis"]],src:"Infografis Cara Mengusulkan Pemutakhiran Desil DTSEN (Dinas Sosial Kota Surabaya), materi sosialisasi Tingkat Kesejahteraan Menurut Desil, dan pemberitaan ANTARA Jatim September 2026"},
 {id:"gamis",g:"sosial",e:"📋",t:"Usulan Data Keluarga Miskin",d:"Mengusulkan keluarga agar masuk data keluarga miskin yang ditetapkan Dinas Sosial.",ch:"Lewat RT/RW",tags:"keluarga miskin gamis pra miskin data dinsos mbr",
  who:["Warga Kota Surabaya yang merasa layak masuk data keluarga miskin"],
  steps:[["Warga","Menyampaikan usulan baru ke RT"],["RT","Meneruskan usulan ke RW"],["RW","Meneruskan usulan ke Kelurahan"],["Kelurahan","Melakukan verifikasi"],["Kecamatan","Melakukan verifikasi"],["Dinas Sosial","Melakukan verifikasi"],["Kelurahan","Membahas data dalam Musyawarah Kelurahan (Muskel), lalu membuat Berita Acara (BA) hasil Muskel"],["Kelurahan","Mengunggah BA melalui aplikasi"],["Dinas Sosial","Menetapkan keluarga miskin"]],
  links:[["Cek status gamis/pramis","#cekstatus"],["Cek & sanggah desil","#desil"]],src:BALAIRW},
 {id:"pkh",g:"sosial",e:"🛒",t:"Usulan Bansos PKH & BPNT",d:"Mengusulkan keluarga sebagai penerima Program Keluarga Harapan dan Bantuan Pangan Non Tunai.",ch:"Lewat RT/RW",tags:"pkh bpnt bansos sembako bantuan pangan program keluarga harapan",
  steps:[["Warga","Menyampaikan usulan baru ke RT"],["RT","Meneruskan usulan ke RW"],["RW","Meneruskan usulan ke Kelurahan"],["Kelurahan / Kecamatan","Melakukan outreach (kunjungan dan pengecekan langsung ke rumah)"],["Dinas Sosial","Melakukan verifikasi"],["Kelurahan","Membahas dalam Musyawarah Kelurahan (Muskel) dan membuat BA hasil Muskel"],["Kelurahan","Mengunggah BA melalui aplikasi"],["Dinas Sosial","Menetapkan keluarga miskin"],["Dinas Sosial","Mengusulkan sebagai penerima bansos PKH & BPNT"]],
  notes:[["","Keluarga harus <b>ditetapkan sebagai keluarga miskin</b> dulu sebelum diusulkan menerima PKH dan BPNT."]],
  links:[["Lihat: Usulan Data Keluarga Miskin","#gamis"]],src:BALAIRW},
 {id:"baznas",g:"sosial",e:"🕌",t:"Bantuan Baznas",d:"Bantuan kesehatan, modal usaha, atau perbaikan rumah dari Baznas Kota Surabaya.",ch:"Di Balai RW",tags:"baznas zakat bantuan kesehatan modal usaha rutilahu muslim",
  who:["Penduduk Kota Surabaya","Warga muslim","Diutamakan keluarga miskin dan pra-miskin"],bring:["KTP / KK"],
  steps:[["Warga","Menyampaikan keluhan atau kebutuhannya"],["Petugas","Mencatat keperluan warga: bantuan kesehatan, modal usaha, atau Rutilahu (rumah tidak layak huni)"],["Petugas","Menghubungi Unit Pengumpul Zakat (UPZ) Kecamatan"],["UPZ Kecamatan","Bersurat ke Baznas tentang permintaan pemohon"],["Baznas & UPZ","Melakukan outreach (kunjungan dan pengecekan langsung) ke pemohon"],["Baznas","Menindaklanjuti usulan dengan mempertimbangkan permintaan warga dan hasil outreach"]],
  notes:[["","UPZ Kecamatan adalah pegawai kecamatan yang memiliki SK dari Baznas Kota Surabaya."],["warn","Bantuan modal usaha yang diberikan tidak selalu sama dengan yang diusulkan warga."]],
  links:[["Bukan muslim? Lihat Bantuan BSP","#bsp"]],src:BALAIRW},
 {id:"bsp",g:"sosial",e:"💚",t:"Bantuan Bangga Surabaya Peduli (BSP)",d:"Bantuan kesehatan, modal usaha, atau perbaikan rumah dari Bangga Surabaya Peduli.",ch:"Di Balai RW",tags:"bsp bangga surabaya peduli bantuan kesehatan modal usaha rutilahu",
  who:["Penduduk Kota Surabaya","Diutamakan keluarga miskin dan pra-miskin"],bring:["KTP / KK"],
  steps:[["Warga","Menyampaikan keluhan atau kebutuhannya"],["Petugas","Mencatat keperluan warga: bantuan kesehatan, modal usaha, atau Rutilahu"],["Petugas","Menghubungi pegawai Kelurahan/Kecamatan untuk outreach ke pemohon"],["Kelurahan / Kecamatan","Bersurat kepada Bangga Surabaya Peduli"],["BSP & Kelurahan / Kecamatan","Melakukan outreach (kunjungan dan pengecekan langsung) ke pemohon"],["BSP","Menindaklanjuti usulan dengan mempertimbangkan permintaan warga dan hasil outreach"]],
  notes:[["warn","Bantuan modal usaha yang diberikan tidak selalu sama dengan yang diusulkan warga."]],src:BALAIRW},
 {id:"disabilitas",g:"sosial",e:"♿",t:"Alat Bantu Disabilitas",d:"Usulan baru alat bantu (misalnya kursi roda) untuk warga penyandang disabilitas.",ch:"Lewat RT/RW",tags:"disabilitas alat bantu kursi roda kruk tongkat difabel",
  who:["Warga ber-KTP/KK Surabaya"],bring:["KTP / KK Surabaya"],
  steps:[["Warga","Mengajukan usulan ke RT/RW"],["Kelurahan","Melakukan identifikasi dan outreach (pengecekan langsung)"],["Kecamatan","Melakukan verifikasi dan bersurat ke Dinas Sosial"],["Dinas Sosial","Memverifikasi data calon penerima"],["Petugas","Pemeriksaan / pengukuran alat bantu"],["Dinas Sosial","Menyerahkan alat bantu disabilitas"],["Penerima","Menandatangani Berita Acara Serah Terima"]],src:BALAIRW},
 {id:"lansia",g:"sosial",e:"👵",t:"Usulan Lansia ke UPTD Griya Wreda",d:"Penempatan lansia terlantar di panti Griya Wreda milik Dinas Sosial.",ch:"Lewat Kelurahan",tags:"lansia griya wreda panti jompo terlantar orang tua",
  who:["Usia 60 tahun ke atas","KTP Surabaya","Terlantar, miskin, dan tidak ada keluarga","Tidak punya riwayat gangguan jiwa"],
  steps:[["Warga","Mengusulkan lansia baru"],["Kelurahan","Melakukan outreach dan mengecek kriteria"],["Puskesmas","Pemeriksaan kesehatan dan laboratorium (TB, HIV, Hepatitis)"],["Kelurahan & Kecamatan","Bersurat pengusulan lansia baru"],["Dinas Sosial","Menerima surat pengusulan"],["UPTD Griya Wreda","Melakukan pengecekan dan outreach lansia"],["UPTD Griya Wreda","Menerima lansia baru sesuai hasil verifikasi"]],
  notes:[["","Dasar: Peraturan Wali Kota Nomor 120 Tahun 2021."]],src:BALAIRW},
 {id:"liponsos",g:"sosial",e:"🏠",t:"Penyerahan Warga ke Liponsos Keputih",d:"Keluarga menyerahkan warga terlantar atau dengan gangguan jiwa ke UPTD Lingkungan Pondok Sosial (Liponsos) Keputih.",ch:"Lewat RT/RW",tags:"liponsos keputih odgj gangguan jiwa terlantar penyerahan",
  who:["Warga Kota Surabaya yang terlantar atau orang dengan gangguan jiwa (ODGJ), dilaporkan oleh warga atau keluarga"],
  bring:["Fotokopi Kartu Keluarga","KTP klien dan KTP penanggung jawab","Kartu BPJS, jika ada","Surat pernyataan tidak menuntut secara hukum atas penyerahan"],
  steps:[["Warga / Keluarga","Melapor ke RT/RW"],["Kelurahan","Bersurat ke Dinas Sosial, disertai hasil outreach klien"],["Dinas Sosial","Menerima surat pengantar permohonan penempatan klien"],["UPTD Liponsos Keputih","Membuat Berita Acara Penyerahan"]],
  notes:[["","Dasar: Peraturan Wali Kota Nomor 36 Tahun 2016."]],links:[["Menemukan orang terlantar di jalan? Lihat alurnya","#t4"]],src:BALAIRW},
 {id:"t4",g:"sosial",e:"🚨",t:"Lapor Orang Terlantar di Jalan",d:"Orang terlantar, kehabisan bekal, gelandangan, lansia terlantar, atau ODGJ di jalan.",ch:"Lapor langsung",tags:"gelandangan terlantar kehabisan bekal odgj jalan t4 liponsos lapor",
  steps:[["Masyarakat","Melaporkan orang terlantar yang ditemui"],["Kelurahan / Kecamatan / Posko Terpadu / Satpol PP / Polisi","Menerima laporan dan menangani"],["UPTD Liponsos Keputih","Membuat Berita Acara Penyerahan Klien"]],
  notes:[["","Dasar: Peraturan Wali Kota Nomor 36 Tahun 2016."]],src:BALAIRW},

 {id:"jamban",g:"rumah",e:"🚽",t:"Bantuan Jamban",d:"Pembuatan jamban sehat lengkap dengan septic tank untuk rumah yang belum punya.",ch:"Lewat Kelurahan",tags:"jamban wc toilet septic tank babs sanitasi",
  who:["Tidak memiliki jamban","Berdomisili di Kota Surabaya"],bring:["Fotokopi KTP, atau KK, atau surat domisili Kota Surabaya"],
  steps:[["KSH / RT / RW","Mendata rumah BABS (Buang Air Besar Sembarangan), atau warga mengajukan sendiri ke Kelurahan"],["Kelurahan","Merekap dan mengusulkan calon penerima ke Dinas Lingkungan Hidup"],["Dinas Lingkungan Hidup","Survei dan verifikasi calon penerima"],["Dinas Lingkungan Hidup","Sosialisasi kepada calon penerima"],["Pelaksana","Membangun jamban termasuk instalasi septic tank"],["Penerima","Serah terima jamban"]],
  notes:[["","Dasar: Peraturan Wali Kota Nomor 115 Tahun 2023 tentang Perubahan Kedua atas Peraturan Wali Kota Nomor 14 Tahun 2019 tentang Pelaksanaan Pembuatan Jamban di Kota Surabaya."]],src:BALAIRW},
 {id:"dandanomah",g:"rumah",e:"🏚️",t:"Dandan Omah (Perbaikan Rutilahu)",d:"Perbaikan rumah tidak layak huni (Rutilahu), termasuk rumah korban kebakaran atau bencana.",ch:"Lewat KSH",tags:"dandan omah rutilahu rumah tidak layak huni bedah rumah renovasi perbaikan",
  who:["Penduduk Kota Surabaya","Belum pernah mendapat bantuan perbaikan Rutilahu (kecuali korban bencana)"],
  bring:["KTP dan Kartu Keluarga","Surat keterangan domisili","Kondisi rumah tidak layak huni, atau korban kebakaran/bencana","Rumah berdiri di atas tanah dengan dasar penguasaan yang sah","Rekomendasi dari Lurah","Surat pernyataan: rumah/tanah tidak dalam sengketa dan akan dihuni sendiri","Surat pernyataan belum pernah menerima bantuan perbaikan rumah dari pemerintah (kecuali jamban sehat dan bencana)","Surat pernyataan tidak menjual atau menyewakan rumah hasil perbaikan selama 5 tahun"],
  steps:[["Kader Surabaya Hebat","Mengusulkan melalui aplikasi Sayang Warga"],["Kelurahan","Memverifikasi usulan melalui eRutilahu"],["DPRKPP","Memproses di dinas melalui eRutilahu"],["Kelurahan & warga","Musyawarah KRPR (Kesepakatan Rencana Perbaikan Rumah)"],["KTPR","Menyusun RAB dan gambar, didampingi DPRKPP"],["KTPR","Padat karya: tenaga kerja dari masyarakat sekitar"],["KTPR","Pelaksanaan dan pengawasan, dipantau DPRKPP lewat eRutilahu"],["DPRKPP, KTPR, Lurah, penerima","Serah terima dengan menandatangani Berita Acara Penyerahan"]],
  notes:[["","KTPR = Kelompok Teknis Perbaikan Rumah. DPRKPP = Dinas Perumahan Rakyat dan Kawasan Permukiman serta Pertanahan. RAB = Rencana Anggaran Biaya."]],src:BALAIRW},

 {id:"ijazah",g:"didik",e:"📜",t:"Tebus Ijazah (LaporDik)",d:"Bantuan menebus ijazah yang tertahan di sekolah untuk warga tidak mampu.",ch:"Lewat Kelurahan",tags:"ijazah tebus tertahan sekolah lapordik baznas",
  steps:[["Warga","Mengajukan ke Kelurahan (atau ke Baznas, yang meneruskan ke Kelurahan)"],["Kelurahan","Outreach ke siswa dan sekolah, bisa menegosiasikan pembebasan atau pengurangan biaya. Hasilnya dimasukkan ke aplikasi LaporDik"],["Kelurahan","Jika keluarga dinilai mampu, tidak menerima bantuan"],["Dinas Pendidikan","Jika tidak mampu: menerima hasil outreach dan bernegosiasi dengan sekolah soal pembebasan/pengurangan biaya"],["Dinas Pendidikan","Meneruskan ke Baznas (siswa muslim) atau ke Bangga Surabaya Peduli (siswa non-muslim)"],["Baznas / BSP","Memanggil siswa untuk diberikan biaya tebus ijazah, dengan membawa syarat yang ditentukan"]],src:BALAIRW},
 {id:"beasiswa-sma",g:"didik",e:"🎒",t:"Beasiswa SMA/SMK/MA Sederajat",d:"Beasiswa Pemkot untuk siswa SMA/SMK/MA warga Surabaya.",ch:"Di Balai RW",tags:"beasiswa sma smk ma siswa pemuda tangguh sekolah",
  who:["Warga Kota Surabaya","Sedang sekolah di SMA/SMK/MA sederajat","Tidak sedang menerima beasiswa serupa (KIP, beasiswa yayasan, atau beasiswa swasta)"],
  bring:["Foto formal","Kartu Keluarga","Rapor pengetahuan dan keterampilan terakhir (fotokopi boleh)","Surat pernyataan tidak menerima beasiswa lain"],
  steps:[["Warga","Membawa kelengkapan ke petugas"],["Petugas","Memasukkan data ke aplikasi pemudatangguh.surabaya.go.id"],["Panitia seleksi","Memverifikasi kebenaran data"],["Panitia seleksi","Mengumumkan hasil. Jika lolos, siswa dipanggil lewat sekolah untuk daftar ulang"]],src:BALAIRW},
 {id:"beasiswa-pt",g:"didik",e:"🎓",t:"Beasiswa Perguruan Tinggi",d:"Beasiswa Pemkot untuk mahasiswa, daftar online lewat Besmart.",ch:"Online",tags:"beasiswa kuliah mahasiswa perguruan tinggi besmart universitas",
  who:["Mahasiswa (sudah diterima di perguruan tinggi)"],
  bring:["Formulir pendaftaran yang sudah diisi","Foto berwarna terbaru 3×4, 2 lembar","Fotokopi Kartu Keluarga","Surat pernyataan belum pernah kawin","Surat pernyataan belum/tidak sedang menerima beasiswa sejenis","Surat keterangan/bukti diterima di perguruan tinggi"],
  steps:[["Mahasiswa","Mendaftar di besmart.surabaya.go.id"],["Mahasiswa","Mengisi daftar isian, mengunduh formulir, dan mengunggah data"],["Mahasiswa","Menyimpan data"],["Mahasiswa","Mengecek pengajuan"],["Mahasiswa","Menyimpan bukti pengajuan"]],
  links:[["Buka Besmart ↗","https://besmart.surabaya.go.id"]],src:BALAIRW},

 {id:"kesehatan",g:"sehat",e:"🏥",t:"Konseling Kesehatan di Balai RW",d:"Tanya soal kesehatan, BPJS, khitan, dan katarak. Kalau perlu, dirujuk ke Puskesmas.",ch:"Di Balai RW",tags:"kesehatan konseling puskesmas rujuk dinkes",
  steps:[["Warga","Datang ke Balai RW"],["Petugas","Memberi konseling kesehatan"],["Petugas","Jika perlu dirujuk, warga diarahkan ke Puskesmas untuk mendapat pelayanan kesehatan. Jika tidak, selesai"]],
  notes:[["","Topik yang bisa ditanyakan: konseling kesehatan masyarakat, pendaftaran BPJS lewat EDabu, pelayanan khitan, dan pelayanan katarak."]],
  links:[["Daftar BPJS (UHC)","#bpjs"],["Khitan","#khitan"],["Operasi katarak","#katarak"]],src:BALAIRW+" (Dinas Kesehatan Kota Surabaya)"},
 {id:"bpjs",g:"sehat",e:"💳",t:"Daftar BPJS Gratis (UHC)",d:"Jaminan Kesehatan Semesta, BPJS yang iurannya ditanggung Pemkot untuk penduduk Surabaya.",ch:"Kelurahan / Faskes",tags:"bpjs uhc jamkesda kis edabu kesehatan gratis universal health coverage mutasi",
  bring:["Surat pengantar RT/RW","Kartu Keluarga","Mengisi formulir dari Kelurahan","Kartu BPJS lama (bila mutasi)"],
  steps:[["Warga","Jika sehat, daftar ke Kelurahan. Jika sedang sakit, daftar ke fasilitas kesehatan"],["Petugas","Memasukkan data calon peserta di aplikasi EDabu Jamkesda BPJS Kesehatan"],["BPJS Kesehatan","Jika input gagal, BPJS melakukan verifikasi"],["Dispendukcapil","Jika input berhasil, verifikasi kependudukan dan persetujuan oleh Dinas Kependudukan dan Pencatatan Sipil"],["BPJS Kesehatan","Data masuk master file BPJS, kepesertaan aktif"]],
  notes:[["","UHC = Universal Health Coverage (jaminan kesehatan untuk semua warga). Jika verifikasi Dispendukcapil tidak disetujui, pendaftaran diulang dari awal."]],src:BALAIRW+" dan "+SYARAT},
 {id:"khitan",g:"sehat",e:"✂️",t:"Pendaftaran Khitan",d:"Khitan gratis di Puskesmas untuk warga Surabaya.",ch:"Sayang Warga",tags:"khitan sunat sunatan anak puskesmas",
  steps:[["Warga","Mendaftar lewat aplikasi Sayang Warga di RT/RW, Kelurahan/Kecamatan, atau Puskesmas"],["Kelurahan / Kecamatan","Memberikan data peserta ke Puskesmas di wilayahnya"],["Puskesmas","Menentukan jadwal pelaksanaan khitan"],["Puskesmas","Memberi tahu peserta jadwal pelaksanaannya"]],src:BALAIRW},
 {id:"katarak",g:"sehat",e:"👁️",t:"Pendaftaran Operasi Katarak",d:"Daftar operasi katarak lewat Kader Surabaya Hebat atau langsung ke Kelurahan.",ch:"Lewat KSH",tags:"katarak mata operasi puskesmas",
  steps:[["Pasien","Mendaftar lewat Kader Surabaya Hebat (KSH), atau langsung ke Kelurahan"],["KSH","Memasukkan data ke Aplikasi Sayang Warga (ASW)"],["RT → RW → Kelurahan","Menyetujui (approve) berjenjang"],["Kelurahan","Merekap data pasien dan membuat surat pengantar"],["Puskesmas","Menerima rekap pasien untuk ditindaklanjuti"]],src:BALAIRW},
 {id:"puspaga",g:"sehat",e:"🤗",t:"Konseling Puspaga",d:"Konseling keluarga gratis di Pojok Konseling Puspaga Balai RW.",ch:"Di Balai RW",tags:"puspaga konseling keluarga psikolog anak perempuan masalah rumah tangga curhat",
  kv:[["🕗 Konseling","Setiap hari, 08.00–16.00"]],kvTitle:"Jam layanan",
  steps:[["Warga","Datang ke Pojok Konseling Puspaga Balai RW dan mengisi buku tamu"],["Petugas","Memberikan formulir persetujuan klien (informed consent) untuk diisi"],["Petugas","Pengamatan dan wawancara, konseling awal (non-klinis) dan psikoedukasi, lalu mengisi berita acara pendampingan"],["Petugas","Jika perlu konseling lanjutan, menjadwalkan dengan psikolog volunteer wilayah tersebut"],["Psikolog","Konseling lanjutan sesuai jadwal. Jika masalahnya berat, dirujuk ke Puspaga Kota, UPTD PPA, Puskesmas, atau instansi lain; petugas mengisi form rujukan"],["Warga","Membawa form rujukan ke instansi yang dituju"]],
  notes:[["","Setiap Selasa dan Kamis, petugas didampingi mahasiswa."]],
  contacts:[["📱","Puspaga Kota Surabaya","0877 2228 8959","087722288959"],["☎️","Hotline UPTD PPA Kota Surabaya","0811 3345 303","08113345303"],["📷","Instagram / Facebook","@puspaga.sby · Puspaga Sby"],["🏢","Kantor","Mal Pelayanan Publik (ex. Siola) Lt. 2, Jl. Tunjungan 1–3, Surabaya"]],
  links:[["Kelas parenting Puspaga","#parenting"]],src:BALAIRW+" (Dinas Pengendalian Penduduk, Pemberdayaan Perempuan dan Perlindungan Anak)"},
 {id:"parenting",g:"sehat",e:"👨‍👩‍👧",t:"Kelas Parenting Puspaga",d:"Sosialisasi dan kelas parenting di Balai RW, temanya menyesuaikan kebutuhan wilayah.",ch:"Di Balai RW",tags:"parenting puspaga sosialisasi orang tua anak kelas",
  kv:[["📅 Jadwal","Selasa & Kamis, 15.00–17.00"]],kvTitle:"Jadwal",kvNote:"Sesuai penjadwalan dari Kecamatan.",
  steps:[["Warga","Datang ke Puspaga Balai RW sesuai jadwal"],["Pemateri","Relawan PKBM, satgas PPA, penyuluh KB, psikolog volunteer, LSM, fasilitator Balai RW, mahasiswa, kader KSH, Puskesmas, atau pemerhati perempuan dan anak"],["Pemateri","Pemberian materi"],["Semua","Sesi diskusi dan tanya jawab"],["Warga","Acara selesai. Jika butuh konseling, bisa lanjut di Pojok Konseling Puspaga"]],
  contacts:[["📱","Puspaga Kota Surabaya","0877 2228 8959","087722288959"],["📷","Instagram","@puspaga.sby"]],
  links:[["Konseling Puspaga","#puspaga"]],src:BALAIRW},

 {id:"kerja",g:"kerja",e:"🧰",t:"Cari Kerja: Padat Karya & ASSIK",d:"Ikut program Padat Karya atau daftar di aplikasi ASSIK Dinas Perindustrian dan Tenaga Kerja.",ch:"Di Balai RW",tags:"kerja lowongan loker pekerjaan padat karya assik disperinaker",
  steps:[["Warga","Datang ke Balai RW"],["Petugas","Menjelaskan Program Padat Karya dan aplikasi ASSIK Dinas Perindustrian dan Tenaga Kerja"],["Warga","Pilih ikut Program Padat Karya, atau daftar di aplikasi ASSIK (bisa dibantu petugas Balai RW)"],["Kelurahan","Menjelaskan bahwa ASSIK hanya mempermudah pencarian kerja; keputusan diterima atau tidak ada di perusahaan"]],src:BALAIRW},

 {id:"sop",g:"petugas",e:"🗂️",t:"SOP Pelayanan Balai RW",d:"12 langkah tugas harian ASN di Balai RW beserta waktu bakunya.",ch:"Petugas ASN",tags:"sop petugas asn balai rw presensi help desk",
  steps:[["Petugas ASN","Menerima jadwal tugas dan surat tugas (5 menit)"],["Petugas ASN","Presensi masuk di Balai RW (5 menit)"],["Petugas ASN","Menerima layanan dan menjawab pertanyaan warga (15 menit). Jika tidak bisa dijawab, hubungi Lurah/Camat/Kepala PD terkait"],["Camat / Lurah / Koordinator RW / PD","Menjawab pertanyaan lewat help desk sesuai SOP (15 menit)"],["Petugas ASN & PD","Edukasi 4 pilar Kampung Pancasila bersama PD, Kecamatan, Kelurahan, RW, dan warga (30 menit)"],["Petugas ASN","Memantau pelaksanaan Kampung Pancasila (30 menit)"],["Petugas ASN & PD","Evaluasi dan edukasi tindak lanjut (15 menit)"],["Petugas ASN","Tugas kedinasan sesuai tugas, fungsi, dan Indikator Kinerja Individu (330 menit)"],["Petugas ASN","Melaporkan hasil layanan ke Kepala OPD (10 menit)"],["Kepala PD / Camat / Lurah","Menerima laporan hasil layanan (5 menit)"],["Kepala PD / Camat / Lurah","Monitoring dan evaluasi pelayanan Balai RW (30 menit)"],["Petugas ASN","Presensi pulang (5 menit)"]],
  kv:[["Total waktu baku","495 menit (8 jam 15 menit)"]],kvTitle:"⏱️ Ringkasan",
  notes:[["","PD = Perangkat Daerah. Help desk = layanan bantuan yang menjawab pertanyaan yang belum bisa dijawab petugas di lokasi."]],src:BALAIRW},
 {id:"pancasila",g:"petugas",e:"🇮🇩",t:"Materi Kampung Pancasila",d:"Kumpulan materi edukasi 4 pilar Kampung Pancasila.",ch:"Tautan",tags:"kampung pancasila materi 4 pilar edukasi",
  notes:[["","Materi dipakai untuk edukasi 4 pilar Kampung Pancasila bersama Perangkat Daerah, Kecamatan, Kelurahan, RW, dan warga."]],
  links:[["Buka materi ↗","https://bit.ly/MATERIKAMPUNGPANCASILA"]],src:BALAIRW}
];
const SVCMAP = Object.fromEntries(SVC.map(s=>[s.id,s]));

/* ============ Utilitas ============ */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),1800); }
function bindCopy(root){
  root.querySelectorAll(".copy").forEach(b => b.onclick = () => {
    const v = b.dataset.copy;
    const fallback = () => { const el=b.parentElement.querySelector("b"); const r=document.createRange(); r.selectNodeContents(el); const s=getSelection(); s.removeAllRanges(); s.addRange(r); toast("Teks dipilih, tekan salin"); };
    try { navigator.clipboard.writeText(v).then(()=>toast("Disalin: "+v), fallback); } catch(e){ fallback(); }
  });
}

/* ============ SSW finder data ============ */
const ALL = CATS.flatMap(c => c.s.map(([n,r,k]) => ({n,r,c:c.n,e:c.e,h:norm(n+" "+c.n+" "+(k||""))})));
function feeHTML(r){ return `<span class="fee ${r?"r":"n"}">${r?"Ada retribusi":"Tanpa retribusi"}</span>`; }
function sswItemHTML(it, showCat, asLink){
  const inner = `<div><div class="nm">${esc(it.n)}</div>${showCat?`<div class="ct">${it.e} ${esc(it.c)}${asLink?" · via SSW Alfa":""}</div>`:""}</div>${feeHTML(it.r)}`;
  return asLink ? `<a class="item" href="#ssw">${inner}</a>` : `<div class="item">${inner}</div>`;
}
function matchWords(h, words){ return words.every(w => h.includes(w)); }

/* ============ Warna kategori: [utama, lembut, gelap] ============ */
const COL = {adminduk:["#2563EB","#E8F0FF","#1E40AF"],surat:["#7C3AED","#F1EAFE","#5B21B6"],izin:["#059669","#E2F6EC","#047857"],sosial:["#EA580C","#FFEDE2","#C2410C"],rumah:["#CA8A04","#FEF6D6","#A16207"],didik:["#4F46E5","#ECEBFF","#3730A3"],sehat:["#E11D48","#FFE7EE","#BE123C"],kerja:["#0D9488","#DCF5F2","#0F766E"],petugas:["#475569","#EDF1F6","#334155"]};
const cvars = g => { const [c,cs,cd] = COL[g]||COL.izin; return `--c:${c};--cs:${cs};--cd:${cd}`; };

/* ============ Beranda ============ */
const SVCIDX = SVC.map(s => ({s, h:norm([s.t,s.d,s.tags||"",GROUPS.find(g=>g[0]===s.g)[1]].join(" "))}));
function tileHTML(s){
  return `<a class="tile${s.feat?" feat":""}" style="${cvars(s.g)}" href="#${s.id}"><span class="e">${s.e}</span><div><b>${esc(s.t)}</b><small>${esc(s.d)}</small><span class="ch">${esc(s.ch)}</span></div></a>`;
}
function renderHome(){
  const raw = $("hq").value.trim(), term = norm(raw);
  $("hclr").hidden = !term;
  const out = $("hout");
  if(term){
    const words = term.split(/\s+/);
    const hs = SVCIDX.filter(x => matchWords(x.h, words)).map(x=>x.s);
    const ss = ALL.filter(it => matchWords(it.h, words));
    let html = "";
    if(hs.length) html += `<div class="res-h"><h3>${hs.length} panduan layanan</h3></div><div class="grid">${hs.map(tileHTML).join("")}</div>`;
    if(ss.length) html += `<div class="res-h"><h3>${ss.length} izin di SSW Alfa</h3></div><div class="results">${ss.slice(0,30).map(it=>sswItemHTML(it,true,true)).join("")}</div>`;
    if(!html) html = `<div class="empty" style="margin-top:14px">Belum ketemu untuk "<b>${esc(raw)}</b>". Coba kata lain, atau tanyakan langsung ke petugas di Balai RW.</div>`;
    out.innerHTML = html; return;
  }
  let html = `<div class="rwcard"><div class="rwtop"><span class="e">🏘️</span><div><b>Bingung mulai dari mana? Datang ke Balai RW.</b><span>Petugas ASN di sana siap membantu menjawab pertanyaan Anda.</span></div></div><div class="rwfacts"><div><small>📍 Lokasi</small><b>Balai RW di seluruh Kecamatan Wonokromo</b></div><div><small>🕗 Jam layanan</small><b>08.00 – 16.00 WIB</b></div><div><small>💰 Biaya</small><b>Gratis</b></div></div></div>`;
  GROUPS.forEach(([g,label]) => {
    const list = SVC.filter(s=>s.g===g);
    html += `<section id="grp-${g}" style="${cvars(g)}"><div class="sec-h"><h2>${label}</h2></div><div class="grid">${list.map(tileHTML).join("")}</div></section>`;
  });
  out.innerHTML = html;
  $("catnav").hidden = false;
}
$("catnav").innerHTML = GROUPS.map(([g,l])=>`<button type="button" style="${cvars(g)}" data-g="${g}">${esc(l)}</button>`).join("");
$("catnav").querySelectorAll("button").forEach(b => b.onclick = () => { if($("hq").value){ $("hq").value=""; renderHome(); } const el=$("grp-"+b.dataset.g); if(el) el.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}); });
$("hstats").innerHTML = `<div><b>${SVC.length}</b><span>panduan layanan</span></div><div><b>${ALL.length}</b><span>izin di SSW Alfa</span></div><div><b>${GROUPS.length}</b><span>kategori</span></div>`;
const HQUICK = [["🔎 Cek desil/gamis","cek gamis"],["📝 SKTM","sktm"],["🔐 Akun KNG","kng"],["📲 KTP digital","ikd"],["💒 Nikah","nikah"],["📊 Sanggah desil","desil"],["🆔 KTP hilang","ktp"],["📑 Akta","akta"],["⚖️ Ahli waris","waris"],["🎓 Beasiswa","beasiswa"],["💳 BPJS gratis","bpjs"],["🏚️ Bedah rumah","rutilahu"],["🛒 PKH / BPNT","pkh"],["🏪 NIB","nib"],["🏗️ IMB / PBG","imb"],["🧰 Cari kerja","kerja"]];
$("hquick").innerHTML = HQUICK.map(([l,t])=>`<button type="button" data-t="${t}">${l}</button>`).join("");
$("hquick").querySelectorAll("button").forEach(b => b.onclick = () => { $("hq").value = b.dataset.t; renderHome(); });
$("hq").addEventListener("input", renderHome);
$("hclr").onclick = () => { $("hq").value=""; renderHome(); $("hq").focus(); };

/* ============ SSW finder ============ */
const out = $("out"), q = $("q"), clr = $("clr");
let cat = null;
function renderSSW(){
  const term = norm(q.value.trim());
  clr.hidden = !term;
  if(term){
    const words = term.split(/\s+/);
    const hits = ALL.filter(it => matchWords(it.h, words));
    const ossHint = /\b(oss|nib|rba|izin usaha|umk|umkm|usaha mikro|nomor induk berusaha)\b/.test(term);
    out.innerHTML = (ossHint ? `<div class="callout" style="margin-bottom:10px">🏪 <span>Izin usaha seperti NIB diurus lewat <b>OSS RBA</b>, bukan SSW Alfa. <a href="#oss">Lihat caranya →</a></span></div>` : "") +
      `<div class="res-h" style="margin-top:0"><h3>${hits.length} layanan cocok</h3></div>` +
      (hits.length ? `<div class="results">${hits.map(h=>sswItemHTML(h,true,false)).join("")}</div>`
       : `<div class="empty">Belum ketemu untuk "<b>${esc(q.value.trim())}</b>". Coba kata lain, pilih kategori, atau tanya DPMPTSP lewat kontak di bawah.</div>`);
    return;
  }
  if(cat !== null){
    const c = CATS[cat];
    out.innerHTML = `<div class="res-h" style="margin-top:0"><h3>${c.e} ${esc(c.n)}</h3><button class="back" type="button" id="backBtn">← Semua kategori</button></div>
      <div class="results">${c.s.map(([n,r])=>sswItemHTML({n,r},false,false)).join("")}</div>`;
    $("backBtn").onclick = () => { cat = null; renderSSW(); };
    return;
  }
  out.innerHTML = `<div class="cats">${CATS.map((c,i)=>`<button class="cat" type="button" data-i="${i}"><span class="e">${c.e}</span><b>${esc(c.n)}</b><small>${c.s.length} layanan</small></button>`).join("")}</div>`;
  out.querySelectorAll(".cat").forEach(b => b.onclick = () => { cat = +b.dataset.i; renderSSW(); out.scrollIntoView({block:"nearest"}); });
}
const QUICK = [["🏗️ IMB / PBG","pbg"],["🎓 Magang / PKL","magang"],["📢 Reklame","reklame"],["🌳 Tebang pohon","pohon"],["⚽ Sewa lapangan","lapangan"],["🏫 Izin sekolah","sekolah"],["🗺️ Surat ijo","surat ijo"],["⚖️ Tera timbangan","timbangan"]];
$("quick").innerHTML = QUICK.map(([l,t])=>`<button type="button" data-t="${t}">${l}</button>`).join("");
$("quick").querySelectorAll("button").forEach(b => b.onclick = () => { q.value = b.dataset.t; cat = null; renderSSW(); });
q.addEventListener("input", () => { cat = null; renderSSW(); });
clr.onclick = () => { q.value = ""; renderSSW(); q.focus(); };

/* ============ Checklist (disimpan per perangkat) ============ */
const KEY = "sswalfa-check-v1";
let saved = {};
try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch(e) {}
function persist(){ try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch(e) {} }
function wireBoxes(root){
  root.querySelectorAll('.check input[type="checkbox"]').forEach(b => {
    if(saved[b.id]) b.checked = true;
    b.addEventListener("change", () => { saved[b.id] = b.checked; persist(); update(); });
  });
}
const stageBoxes = [...document.querySelectorAll('#sswStages input')];
const ossBoxes = [...document.querySelectorAll('#ossStage input, #ossNib input')];
function meter(list, fill, text){
  const done = list.filter(b=>b.checked).length;
  $(fill).style.width = (done/list.length*100)+"%";
  $(text).textContent = `${done}/${list.length} langkah`;
}
function update(){
  meter(stageBoxes,"barFill","barText");
  meter(ossBoxes,"ossFill","ossText");
  document.querySelectorAll(".stage").forEach(s => {
    const bs = [...s.querySelectorAll("input")];
    s.classList.toggle("done", bs.length > 0 && bs.every(b=>b.checked));
  });
}
function resetList(list){ list.forEach(b => { b.checked = false; saved[b.id] = false; }); persist(); update(); toast("Centangan dikosongkan"); }
$("resetBtn").onclick = () => resetList(stageBoxes);
$("ossReset").onclick = () => resetList(ossBoxes);
wireBoxes(document.querySelector('[data-view="ssw"]'));
wireBoxes(document.querySelector('[data-view="oss"]'));

/* ============ Bagikan ============ */
const SITE = "https://pelayanan-balai-rw.netlify.app/";
const UPDATED = "Oktober 2026";
function shareHTML(id, title, cls){
  const url = SITE + "#" + id;
  const txt = encodeURIComponent(`${title} – panduan dari Pelayanan Balai RW Kecamatan Wonokromo:\n${url}`);
  return `<div class="share ${cls||""}"><span>Bantu warga lain:</span><a class="btn wa" href="https://wa.me/?text=${txt}" target="_blank" rel="noopener">💬 Bagikan ke WhatsApp</a><button class="btn cp" type="button" data-link="${url}">🔗 Salin link</button></div>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest(".share .cp"); if(!b) return;
  const v = b.dataset.link;
  try { navigator.clipboard.writeText(v).then(()=>toast("Link disalin"), ()=>toast(v)); } catch(err){ toast(v); }
});

/* ============ Halaman layanan umum ============ */
function linkHTML([label,url]){
  const ext = /^https?:/.test(url);
  return `<a class="btn ${ext?"btn-gold":"back"}" style="font-size:14px" href="${esc(url)}"${ext?' target="_blank" rel="noopener"':""}>${esc(label)}</a>`;
}
function renderSvc(s){
  const [c,cs,cd] = COL[s.g]||COL.izin;
  const hero = $("svcHead").parentElement;
  hero.style.setProperty("--h1", cd); hero.style.setProperty("--h2", c);
  $("svcBody").setAttribute("style", cvars(s.g));
  $("svcHead").innerHTML = `<div class="eyebrow">${esc(GROUPS.find(g=>g[0]===s.g)[1].replace(/^\S+\s/,""))}</div>
    <h1><span class="e" aria-hidden="true">${s.e}</span> ${esc(s.t)}</h1><p>${esc(s.d)}</p>
    <div class="chips"><span>📍 ${esc(s.ch)}</span>${s.steps?`<span>👣 ${s.steps.length} langkah</span>`:""}</div>`;
  let h = "", side = "";
  if(s.who) h += `<div class="block o1"><h3>🙋 Untuk siapa</h3><ul>${s.who.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`;
  if(s.cases) side += `<div class="block o2"><h3>🎒 Syarat sesuai keperluan</h3>${s.cases.map(([t,items],ci)=>`<details class="x"${(ci===0||s.allOpen)?" open":""}><summary>${esc(t)}</summary>${items.map((x,i)=>`<label class="check"><input type="checkbox" id="c-${s.id}-${ci}-${i}"><span>${esc(x)}</span></label>`).join("")}</details>`).join("")}</div>`;
  if(s.bring) side +=`<div class="block o2"><h3>🎒 Yang perlu disiapkan</h3>${s.bring.map((x,i)=>`<label class="check"><input type="checkbox" id="b-${s.id}-${i}"><span>${esc(x)}</span></label>`).join("")}
    ${(s.extra||[]).map(([t,items])=>`<details class="x"><summary>${esc(t)}</summary><ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></details>`).join("")}</div>`;
  else if(s.extra) h += `<div class="block o3"><h3>📑 Rincian</h3>${s.extra.map(([t,items])=>`<details class="x" open><summary>${esc(t)}</summary><ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></details>`).join("")}</div>`;
  if(s.steps) h += `<div class="block o3"><h3>🧭 Alurnya</h3><ol class="flow">${s.steps.map(([w,t],i)=>`<li><span class="n">${i+1}</span><div><span class="who">${esc(w)}</span><p>${esc(t)}</p></div></li>`).join("")}</ol></div>`;
  if(s.kv) side += `<div class="block o4"><h3>${esc(s.kvTitle||"Info")}</h3><div class="kv">${s.kv.map(([k,v])=>`<span>${esc(k)}</span><b>${esc(v)}</b>`).join("")}</div>${s.kvNote?`<p class="src-note">${esc(s.kvNote)}</p>`:""}</div>`;
  if(s.sections) h += s.sections.map(([t,items])=>`<div class="block o5"><h3>${esc(t)}</h3><ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");
  if(s.notes) h += `<div class="block o5"><h3>💡 Perlu diketahui</h3>${s.notes.map(([k,t])=>`<div class="tip ${k}">${k==="warn"?"⚠️":"ℹ️"} <span>${t}</span></div>`).join("")}</div>`;
  if(s.contacts) side += `<div class="block o6"><h3>☎️ Kontak</h3>${s.contacts.map(([e,l,v,cp,url])=>`<div class="row"><span class="e">${e}</span><div><small>${esc(l)}</small><b>${url?`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(v)}</a>`:esc(v)}</b></div>${cp?`<button class="copy" type="button" data-copy="${esc(cp)}">Salin</button>`:""}</div>`).join("")}</div>`;
  if(s.links) side += `<div class="chips o7" style="margin-top:14px">${s.links.map(linkHTML).join("")}</div>`;
  h += shareHTML(s.id, s.t, "o8");
  h += `<p class="src-note o8">Sumber: ${esc(s.src)}. · 🗓️ Info diperbarui ${UPDATED}.</p>`;
  const body = $("svcBody");
  body.innerHTML = side ? `<div class="dgrid"><div class="dmain">${h}</div><aside class="dside">${side}</aside></div>` : `<div class="dgrid solo"><div class="dmain">${h}</div></div>`;
  wireBoxes(body); bindCopy(body);
}

/* ============ Router ============ */
function route(){
  const id = (location.hash||"").slice(1) || "beranda";
  let view = "beranda";
  if(id==="ssw"||id==="oss") view = id;
  else if(SVCMAP[id]){ view = "svc"; renderSvc(SVCMAP[id]); }
  document.querySelectorAll("[data-view]").forEach(v => v.hidden = v.dataset.view !== view);
  $("backLink").hidden = view === "beranda";
  window.scrollTo(0,0);
}
document.querySelectorAll("[data-jump]").forEach(b => b.onclick = () => $(b.dataset.jump).scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}));
window.addEventListener("hashchange", route);
bindCopy(document);
$("sswShare").innerHTML = shareHTML("ssw","Panduan SSW Alfa");
$("ossShare").innerHTML = shareHTML("oss","Cara buat akun OSS & NIB Usaha Mikro");
renderHome(); renderSSW(); update(); route();
