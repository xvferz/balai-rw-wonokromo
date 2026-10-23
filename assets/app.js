/* ============================================================
   Pelayanan Balai RW Wonokromo — app v9
   Ikon SVG, halaman Layanan (katalog kategori → per kategori),
   grid beranda, header + drawer, mode gelap.
   ============================================================ */
const $ = id => document.getElementById(id);
const $$ = sel => [...document.querySelectorAll(sel)];
const esc = s => String(s).replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
/* Emoji dibuang saat render agar tampilan konsisten lintas perangkat.
   Panah tipografis (→, ↗, ×) dan tanda baca tetap dipertahankan. */
const EMOJI_RE = /[0-9]\u{FE0F}?\u{20E3}|[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2300}-\u{23FF}\u{25A0}-\u{25FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]\u{FE0F}?|[\u{200D}\u{20E3}\u{FE0F}]/gu;
const tidy = s => String(s).replace(EMOJI_RE, "").replace(/\s{2,}/g, " ").trim();
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
/* Ikon dari sprite inline */
const IC = (n, cls) => `<svg class="ic${cls ? " " + cls : ""}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const smooth = () => matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
const scrollToEl = el => { if (el) el.scrollIntoView({ behavior: smooth(), block: "start" }); };
function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),1800); }
function bindCopy(root){
  root.querySelectorAll(".copy").forEach(b => b.onclick = () => {
    const v = b.dataset.copy;
    const fallback = () => { const el=b.parentElement.querySelector("b"); const r=document.createRange(); r.selectNodeContents(el); const s=getSelection(); s.removeAllRanges(); s.addRange(r); toast("Teks dipilih, tekan salin"); };
    try { navigator.clipboard.writeText(v).then(()=>toast("Disalin: "+v), fallback); } catch(e){ fallback(); }
  });
}

/* ============ Warna & ikon kategori (hue per grup) ============ */
const HUE = {
  adminduk:[216,58], surat:[268,44], izin:[160,52], sosial:[22,62], rumah:[42,66],
  didik:[244,52], sehat:[348,52], kerja:[176,48], petugas:[212,26]
};
const GICON = { adminduk:"idcard", surat:"file", izin:"building", sosial:"gift", rumah:"home", didik:"grad", sehat:"heart", kerja:"briefcase", petugas:"user-check" };
const cvars = g => { const [h,s] = HUE[g] || HUE.izin; return `--ch:${h};--csat:${s}%`; };
const gicon = g => GICON[g] || "list";
const gname = g => { const row = GROUPS.find(x => x[0] === g); return tidy(row ? row[1] : ""); };
const iconFor = l => {
  const s = String(l).toLowerCase();
  if (/whatsapp|takon/.test(s)) return "chat";
  if (/telp|hp|ponsel/.test(s)) return "phone";
  if (/mail|email/.test(s)) return "mail";
  if (/alamat|datang|lokasi|kantor|siola/.test(s)) return "pin";
  if (/situs|web|instagram|tiktok|oss\.go/.test(s)) return "globe";
  if (/jam|waktu/.test(s)) return "clock";
  return "info";
};

/* ============ Pencarian SSW (skor token + prefiks) ============ */
const ALL = CATS.flatMap(c => c.s.map(([n,r,k]) => ({n,r,c:c.n,e:c.e,h:norm(n+" "+c.n+" "+(k||""))})));
function feeHTML(r){ return `<span class="fee ${r?"r":"n"}">${r?"Ada retribusi":"Tanpa retribusi"}</span>`; }
function sswItemHTML(it, showCat, asLink){
  const inner = `<div><div class="nm">${esc(it.n)}</div>${showCat?`<div class="ct">${esc(it.c)}${asLink?" · via SSW Alfa":""}</div>`:""}</div>${feeHTML(it.r)}`;
  return asLink ? `<a class="item" href="#ssw">${inner}</a>` : `<div class="item">${inner}</div>`;
}
const toks = s => norm(s).split(/[^a-z0-9]+/).filter(Boolean);
const ALLIDX = ALL.map(it => ({it, tt: toks(it.n), at: toks(it.h)}));
function wScore(w, arr){
  let best = 0;
  for(let i = 0; i < arr.length && best < 4; i++){
    const t = arr[i];
    if(t === w) best = 4;
    else if(t.startsWith(w) && w.length >= 3) best = Math.max(best, 3);
    else if(t.includes(w) && w.length >= 4) best = Math.max(best, 1);
  }
  return best;
}
function entryScore(words, e){
  let sum = 0;
  for(const w of words){
    const t = wScore(w, e.tt), a = wScore(w, e.at);
    const s = t ? t + 3 : a;
    if(!s) return 0;
    sum += s;
  }
  return sum;
}
function ranked(words, idx){
  return idx.map(e => ({e, sc: entryScore(words, e)}))
    .filter(x => x.sc > 0)
    .sort((a,b) => b.sc - a.sc)
    .map(x => x.e);
}

/* ============ Beranda ============ */
const SVCIDX = SVC.map(s => ({s, tt: toks(s.t), at: toks([s.t, s.d, s.tags || "", gname(s.g)].join(" "))}));
function tileHTML(s){
  return `<a class="tile" data-cat style="${cvars(s.g)}" href="#${s.id}"><b>${esc(s.t)}</b><small>${esc(s.d)}</small><span class="ch">${esc(s.ch)}</span><span class="go" aria-hidden="true">↗</span></a>`;
}
function rwcardHTML(){
  return `<div class="rwcard"><span class="rw-ic">${IC("building")}</span>
    <div class="rwtop"><b>Bingung mulai dari mana? Datang ke Balai RW.</b><span>Petugas ASN di sana siap membantu menjawab pertanyaan Anda.</span></div>
    <div class="rwfacts">
      <div><small>Lokasi</small><b>Seluruh Kecamatan Wonokromo</b></div>
      <div><small>Jam layanan</small><b>08.00 – 16.00 WIB</b></div>
      <div><small>Biaya</small><b>Gratis</b></div>
    </div></div>`;
}
/* Hasil pencarian bersama (dipakai beranda + halaman Layanan).
   Mengembalikan HTML: panduan (tile) + izin di SSW (item). */
function searchHTML(raw, clearLabel){
  const words = norm(raw).split(/\s+/).filter(Boolean);
  const hs = ranked(words, SVCIDX).map(x => x.s);
  const ss = ranked(words, ALLIDX).map(x => x.it);
  let html = "";
  if(hs.length) html += `<div class="res-h"><h3>${hs.length} panduan layanan</h3>${clearLabel?`<button class="back" type="button" data-clear>${IC("x")} ${clearLabel}</button>`:""}</div><div class="grid">${hs.map(tileHTML).join("")}</div>`;
  if(ss.length) html += `<div class="res-h"><h3>${ss.length} izin di SSW Alfa</h3></div><div class="results">${ss.slice(0,30).map(it=>sswItemHTML(it,true,true)).join("")}</div>`;
  if(!html) html = `<div class="empty" style="margin-top:14px">Belum ketemu untuk "<b>${esc(raw)}</b>". Coba kata lain, atau tanyakan langsung ke petugas di Balai RW.</div>`;
  return html;
}
/* Beranda: hanya kartu Balai RW. Daftar 9 grup panjang dipindah ke halaman Layanan (v9). */
function renderHome(){
  const raw = $("hq").value.trim();
  $("hclr").hidden = !raw;
  const out = $("hout");
  if(raw){
    out.innerHTML = searchHTML(raw, "Hapus pencarian");
    $("kategori").hidden = true;
    return;
  }
  out.innerHTML = rwcardHTML();
  $("kategori").hidden = false;
}

/* ============ Halaman Layanan (katalog semua kategori) ============ */
let layCat = null, curView = "beranda";
function kcardHTML(g,l){
  const n = SVC.filter(s=>s.g===g).length;
  return `<a class="kcard" data-cat style="${cvars(g)}" href="#layanan/${g}">
    <span class="kcard-ic">${IC(gicon(g))}</span>
    <span class="kcard-b"><b>${esc(tidy(l))}</b><small>${n} panduan</small></span>
  </a>`;
}
function layIndexHTML(){
  const cards = GROUPS.map(([g,l]) => kcardHTML(g,l)).join("");
  const sswEntry = `<section class="lay-ssw"><span class="row-ic">${IC("search")}</span><div><b>Mencari jenis izin tertentu?</b><span>Telusuri ${ALL.length} izin non-berusaha di pencari SSW Alfa, lengkap dengan status retribusinya.</span></div><a class="btn btn-soft" href="#ssw">Buka pencari izin ${IC("arrow-right")}</a></section>`;
  return `<div class="kgrid">${cards}</div>${sswEntry}`;
}
function layCatHTML(g){
  const list = SVC.filter(s=>s.g===g);
  return `<a class="back lay-back" href="#layanan">${IC("arrow-left")} Semua kategori</a>
  <section data-cat style="${cvars(g)}">
    <div class="sec-h"><span class="sec-ic">${IC(gicon(g))}</span><div><h2>${esc(gname(g))}</h2><p>${list.length} panduan layanan</p></div></div>
    <div class="grid">${list.map(tileHTML).join("")}</div>
  </section>`;
}
function renderLayanan(){
  const body = $("layananBody");
  if(!body) return;
  const raw = $("lq").value.trim();
  $("lclr").hidden = !raw;
  if(raw){
    body.innerHTML = searchHTML(raw, "Tampilkan semua kategori");
    return;
  }
  if(layCat && HUE[layCat]){ body.innerHTML = layCatHTML(layCat); return; }
  body.innerHTML = layIndexHTML();
}

/* Grid kategori + kategori footer */
$("kgrid").innerHTML = GROUPS.map(([g,l]) => kcardHTML(g,l)).join("");
$("footCats").innerHTML = GROUPS.map(([g,l]) => `<li><button type="button" data-g="${g}">${esc(tidy(l))}</button></li>`).join("");

$("hstats").innerHTML = `<div><b>${SVC.length}</b><span>panduan</span></div><div><b>${ALL.length}</b><span>izin SSW Alfa</span></div><div><b>${GROUPS.length}</b><span>kategori</span></div>`;

/* ============ Pencarian global (di banner) ============ */
function setTerm(v){ $("hq").value = v; renderHome(); }
$("hq").addEventListener("input", () => renderHome());
$("hclr").onclick = () => { setTerm(""); $("hq").focus(); };
$("hsearchHero").addEventListener("submit", e => e.preventDefault());
/* Pencarian di halaman Layanan (id sendiri, tidak bentrok dengan beranda) */
$("lq").addEventListener("input", () => renderLayanan());
$("lclr").onclick = () => { $("lq").value = ""; renderLayanan(); $("lq").focus(); };
$("lsearch").addEventListener("submit", e => e.preventDefault());

/* ============ SSW finder ============ */
const out = $("out"), q = $("q"), clr = $("clr");
let cat = null;
function renderSSW(){
  const term = norm(q.value.trim());
  clr.hidden = !term;
  if(term){
    const words = term.split(/\s+/).filter(Boolean);
    const hits = ranked(words, ALLIDX).map(x => x.it);
    const ossHint = /\b(oss|nib|rba|izin usaha|umk|umkm|usaha mikro|nomor induk berusaha)\b/.test(term);
    out.innerHTML = (ossHint ? `<div class="callout">${IC("sparkle")}<span>Izin usaha seperti NIB diurus lewat <b>OSS RBA</b>, bukan SSW Alfa. <a href="#oss">Lihat caranya ${IC("arrow-right")}</a></span></div>` : "") +
      `<div class="res-h" style="margin-top:0"><h3>${hits.length} layanan cocok</h3></div>` +
      (hits.length ? `<div class="results">${hits.map(h=>sswItemHTML(h,true,false)).join("")}</div>`
       : `<div class="empty">Belum ketemu untuk "<b>${esc(q.value.trim())}</b>". Coba kata lain, pilih kategori, atau tanya DPMPTSP lewat kontak di bawah.</div>`);
    return;
  }
  if(cat !== null){
    const c = CATS[cat];
    out.innerHTML = `<div class="res-h" style="margin-top:0"><h3>${esc(c.n)}</h3><button class="back" type="button" id="backBtn">${IC("arrow-left")} Semua kategori</button></div>
      <div class="results">${c.s.map(([n,r])=>sswItemHTML({n,r},false,false)).join("")}</div>`;
    $("backBtn").onclick = () => { cat = null; renderSSW(); };
    return;
  }
  out.innerHTML = `<div class="cats">${CATS.map((c,i)=>`<button class="cat" type="button" data-i="${i}"><b>${esc(c.n)}</b><small>${c.s.length} layanan</small></button>`).join("")}</div>`;
  out.querySelectorAll(".cat").forEach(b => b.onclick = () => { cat = +b.dataset.i; renderSSW(); out.scrollIntoView({block:"nearest"}); });
}
const QUICK = [["IMB / PBG","pbg"],["Magang / PKL","magang"],["Reklame","reklame"],["Tebang pohon","pohon"],["Sewa lapangan","lapangan"],["Izin sekolah","sekolah"],["Surat ijo","surat ijo"],["Tera timbangan","timbangan"]];
$("quick").innerHTML = QUICK.map(([l,t])=>`<button type="button" data-t="${t}">${esc(tidy(l))}</button>`).join("");
$("quick").querySelectorAll("button").forEach(b => b.onclick = () => { q.value = b.dataset.t; cat = null; renderSSW(); });
q.addEventListener("input", () => { cat = null; renderSSW(); });
clr.onclick = () => { q.value = ""; renderSSW(); q.focus(); };

/* ============ Checklist (tersimpan per perangkat) ============ */
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
  return `<div class="share ${cls||""}"><span>Bantu warga lain:</span><a class="btn wa" href="https://wa.me/?text=${txt}" target="_blank" rel="noopener">${IC("chat")} Bagikan ke WhatsApp</a><button class="btn cp" type="button" data-link="${url}">${IC("copy")} Salin link</button></div>`;
}

/* ============ Halaman layanan umum ============ */
function linkHTML([label,url]){
  const ext = /^https?:/.test(url);
  return `<a class="btn ${ext?"":"back"}" style="font-size:14px" href="${esc(url)}"${ext?' target="_blank" rel="noopener"':""}>${esc(tidy(label))} ${IC(ext?"arrow-up-right":"chevron-right")}</a>`;
}
function renderSvc(s){
  const hero = $("svcHead").parentElement;
  hero.setAttribute("data-cat", "");
  hero.setAttribute("style", cvars(s.g));
  $("svcBody").setAttribute("data-cat", "");
  $("svcBody").setAttribute("style", cvars(s.g));
  const crumb = (h) => `<nav class="crumbs"><a href="#beranda">Beranda</a>${IC("chevron-right")}<button type="button" data-g="${s.g}">${esc(gname(s.g))}</button>${IC("chevron-right")}<span>${esc(s.t)}</span></nav>`;
  $("svcHead").innerHTML = `<a class="back hero-back" href="#layanan/${s.g}">${IC("arrow-left")} Kembali ke ${esc(gname(s.g))}</a>
    <h1>${esc(s.t)}</h1><p class="lead">${esc(s.d)}</p>
    <div class="chips"><span>${esc(s.ch)}</span>${s.steps?`<span>${s.steps.length} langkah</span>`:""}</div>${crumb(s)}`;
  let h = "", side = "";
  const blk = (cls, ic, title, body) => `<div class="block ${cls}"><h3><span class="b-ic">${IC(ic)}</span>${esc(title)}</h3>${body}</div>`;
  if(s.who) h += blk("o1","users","Untuk siapa", `<ul>${s.who.map(x=>`<li>${esc(tidy(x))}</li>`).join("")}</ul>`);
  if(s.cases) side += blk("o2","list","Syarat sesuai keperluan", s.cases.map(([t,items],ci)=>`<details class="x"${(ci===0||s.allOpen)?" open":""}><summary>${esc(tidy(t))}</summary>${items.map((x,i)=>`<label class="check"><input type="checkbox" id="c-${s.id}-${ci}-${i}"><span>${esc(tidy(x))}</span></label>`).join("")}</details>`).join(""));
  if(s.bring) side += blk("o2","list","Yang perlu disiapkan", s.bring.map((x,i)=>`<label class="check"><input type="checkbox" id="b-${s.id}-${i}"><span>${esc(tidy(x))}</span></label>`).join("") +
    ((s.extra||[]).map(([t,items])=>`<details class="x"><summary>${esc(tidy(t))}</summary><ul>${items.map(x=>`<li>${esc(tidy(x))}</li>`).join("")}</ul></details>`).join("")));
  else if(s.extra) h += blk("o3","book","Rincian", s.extra.map(([t,items])=>`<details class="x" open><summary>${esc(tidy(t))}</summary><ul>${items.map(x=>`<li>${esc(tidy(x))}</li>`).join("")}</ul></details>`).join(""));
  if(s.steps) h += blk("o3","route","Alurnya", `<ol class="flow">${s.steps.map(([w,t],i)=>`<li><span class="n">${i+1}</span><div><span class="who">${esc(tidy(w))}</span><p>${esc(tidy(t))}</p></div></li>`).join("")}</ol>`);
  if(s.kv) side += blk("o4","info", tidy(s.kvTitle||"Info"), `<div class="kv">${s.kv.map(([k,v])=>`<span>${esc(tidy(k))}</span><b>${esc(tidy(v))}</b>`).join("")}</div>${s.kvNote?`<p class="src-note">${esc(tidy(s.kvNote))}</p>`:""}`);
  if(s.sections) h += s.sections.map(([t,items])=>blk("o5","list", tidy(t), `<ul>${items.map(x=>`<li>${esc(tidy(x))}</li>`).join("")}</ul>`)).join("");
  if(s.notes) h += blk("o5","info","Perlu diketahui", s.notes.map(([k,t])=>`<div class="tip ${k}">${IC(k==="warn"?"alert":"info")}<span>${tidy(t)}</span></div>`).join(""));
  if(s.contacts) side += blk("o6","phone","Kontak", s.contacts.map(([e,l,v,cp,url])=>`<div class="row"><span class="row-ic">${IC(iconFor(l))}</span><div><small>${esc(tidy(l))}</small><b>${url?`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(v)}</a>`:esc(v)}</b></div>${cp?`<button class="copy" type="button" data-copy="${esc(cp)}">Salin</button>`:""}</div>`).join(""));
  if(s.links) side += `<div class="chips o7" style="margin-top:14px">${s.links.map(linkHTML).join("")}</div>`;
  h += shareHTML(s.id, s.t, "o8");
  h += `<p class="src-note o8">${IC("book")} Sumber: ${esc(s.src)}. · Diperbarui ${UPDATED}.</p>`;
  const body = $("svcBody");
  body.innerHTML = side ? `<div class="dgrid"><div class="dmain">${h}</div><aside class="dside">${side}</aside></div>` : `<div class="dgrid solo"><div class="dmain">${h}</div></div>`;
  wireBoxes(body); bindCopy(body);
}

/* ============ Shell: tema, drawer, navigasi ============ */
const drawer = $("drawer"), menuBtn = $("menuBtn");
function closeDrawer(){ if(drawer.hidden) return; drawer.hidden = true; menuBtn.setAttribute("aria-expanded","false"); document.body.style.overflow = ""; }
function openDrawer(){ drawer.hidden = false; menuBtn.setAttribute("aria-expanded","true"); document.body.style.overflow = "hidden"; }
menuBtn.onclick = () => drawer.hidden ? openDrawer() : closeDrawer();
drawer.addEventListener("click", e => { if(e.target === drawer) closeDrawer(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeDrawer(); });
/* Tema */
const THEME_KEY = "brw-theme";
function applyTheme(t){
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(THEME_KEY, t); } catch(e) {}
  $("themeBtn").setAttribute("aria-pressed", t === "dark");
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute("content", t === "dark" ? "#0A1411" : "#065F46");
}
$("themeBtn").onclick = () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
applyTheme(document.documentElement.dataset.theme || "light");
/* Kembali ke atas */
$("totop").onclick = () => window.scrollTo({ top: 0, behavior: smooth() });
/* delegated: kategori, section, hapus pencarian, tab */
document.addEventListener("click", e => {
  const home = e.target.closest('[data-nav="beranda"]');
  if(home){
    closeDrawer();
    /* Sudah di beranda? hash tidak berubah, jadi scroll ke atas manual */
    if(((location.hash || "").slice(1) || "beranda") === "beranda"){
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: smooth() });
      markNav("beranda");
    }
    return;
  }
  const lay = e.target.closest('[data-nav="layanan"]');
  if(lay){
    closeDrawer();
    /* Sudah di katalog (bukan di dalam kategori)? scroll ke atas + kosongkan pencarian */
    if((location.hash || "").slice(1) === "layanan"){
      e.preventDefault();
      $("lq").value = "";
      renderLayanan();
      window.scrollTo({ top: 0, behavior: smooth() });
      markNav("layanan");
    }
    return;
  }
  const grp = e.target.closest("[data-g]");
  if(grp){ closeDrawer(); goGroup(grp.dataset.g); return; }
  const go = e.target.closest("[data-go]");
  if(go){ closeDrawer(); goSection(go.dataset.go); return; }
  const clr2 = e.target.closest("[data-clear]");
  if(clr2){
    /* Tombol hapus pencarian: sadar konteks halamannya */
    if(curView === "layanan"){ $("lq").value = ""; renderLayanan(); scrollToEl($("layananBody")); }
    else { setTerm(""); scrollToEl($("kategori")); }
    return;
  }
  const cp = e.target.closest(".share .cp");
  if(cp){
    const v = cp.dataset.link;
    try { navigator.clipboard.writeText(v).then(()=>toast("Link disalin"), ()=>toast(v)); } catch(err){ toast(v); }
    return;
  }
  const j = e.target.closest("[data-jump]");
  if(j){ scrollToEl($(j.dataset.jump)); }
});
function ensureBeranda(cb){
  if(location.hash.slice(1) === "beranda"){ cb(); return; }
  location.hash = "beranda";
  setTimeout(cb, 90);
}
function goGroup(g){
  /* Sejak v9: kategori = halaman sendiri di #layanan/<g>, bukan seksi beranda */
  if(location.hash.slice(1) === "layanan/" + g) return;
  location.hash = "layanan/" + g;
}
function goSection(id){
  ensureBeranda(() => scrollToEl($(id)));
}
/* Sorot navigasi mengikuti bagian yang sedang terlihat (hanya di beranda) */
let navTick = false;
function navSpy(){
  navTick = false;
  /* Hanya di beranda; halaman lain highlight nav mengikuti view (lihat route) */
  if(curView !== "beranda") return;
  const help = $("bantuan").getBoundingClientRect();
  if(help.top < window.innerHeight * 0.6) markNav("bantuan");
  else markNav("beranda");
}
window.addEventListener("scroll", () => {
  if(!navTick){ navTick = true; requestAnimationFrame(navSpy); }
}, { passive: true });

/* ============ Router ============ */
const BRW = "Pelayanan Balai RW Wonokromo";
const DEFAULT_DESC = (document.querySelector('meta[name="description"]')||{}).content || "";
const VIEW_DESC = {
  layanan: "Daftar semua panduan layanan warga Kecamatan Wonokromo, Surabaya: KTP, KK, akta, surat keterangan, izin usaha, bansos, pendidikan, kesehatan, dan pekerjaan.",
  ssw: "Panduan SSW Alfa Surabaya: buat akun, ajukan izin online, pantau status, revisi berkas, dan telusuri 17 kategori layanan.",
  oss: "Cara buat akun OSS dan NIB usaha mikro gratis di oss.go.id, bisa didampingi petugas di Balai RW Kecamatan Wonokromo."
};
function markNav(key){
  $$("[data-nav]").forEach(a => {
    const on = a.dataset.nav === key;
    a.classList.toggle("on", on);
    if(on) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
  });
}
function setNav(view){ markNav(view === "beranda" ? "beranda" : "layanan"); }
/* Logo + palet halaman mengikuti warna kategori */
function setPageHue(g){
  const root = document.documentElement, hue = g && HUE[g];
  if(hue){
    root.dataset.hue = g;
    root.style.setProperty("--page-h", hue[0]);
    root.style.setProperty("--page-s", hue[1] + "%");
  } else {
    delete root.dataset.hue;
    root.style.removeProperty("--page-h");
    root.style.removeProperty("--page-s");
  }
}
/* Logo mark (header + footer) mengikuti warna kategori halaman yang dibuka */
function setMark(g){
  const root = document.documentElement;
  const hue = g && HUE[g];
  if(hue){
    root.style.setProperty("--mark-a", `hsl(${hue[0]} ${hue[1]}% 46%)`);
    root.style.setProperty("--mark-b", `hsl(${hue[0]} ${hue[1]}% 26%)`);
  } else {
    root.style.removeProperty("--mark-a");
    root.style.removeProperty("--mark-b");
  }
}
function route(){
  const raw = (location.hash||"").slice(1) || "beranda";
  /* Alias anchor lama (sebelum v9): #kategori → #layanan, #grp-<g> → #layanan/<g> */
  if(raw === "kategori"){ location.replace("#layanan"); return; }
  if(/^grp-/.test(raw)){
    const g = raw.slice(4);
    if(HUE[g]){ location.replace("#layanan/" + g); return; }
  }
  const seg = raw.split("/");
  const id = seg[0];
  const svc = SVCMAP[id];
  let view = "beranda";
  layCat = null;
  if(id === "ssw" || id === "oss") view = id;
  else if(id === "layanan"){ view = "layanan"; layCat = (seg[1] && HUE[seg[1]]) ? seg[1] : null; }
  else if(svc){ view = "svc"; renderSvc(svc); }
  curView = view;
  document.querySelectorAll("[data-view]").forEach(v => v.hidden = v.dataset.view !== view);
  setNav(view);
  const g = svc ? svc.g : layCat;
  setMark(g);
  setPageHue(g);
  window.scrollTo(0,0);
  document.title = svc ? (svc.t + " – " + BRW)
    : view === "layanan" ? (layCat ? (gname(layCat) + " – Semua Layanan – " + BRW) : ("Semua Layanan – " + BRW))
    : view === "ssw" ? ("Panduan SSW Alfa – " + BRW)
    : view === "oss" ? ("OSS RBA: Akun & NIB Usaha Mikro – " + BRW)
    : BRW;
  const md = document.querySelector('meta[name="description"]');
  if(md){
    let desc = svc ? svc.d : (VIEW_DESC[view] || DEFAULT_DESC);
    if(view === "layanan" && layCat) desc = `Panduan ${gname(layCat)} di Kecamatan Wonokromo, Surabaya: ${SVC.filter(s=>s.g===layCat).length} panduan dengan syarat, biaya, dan caranya.`;
    md.setAttribute("content", desc);
  }
  /* Masuk katalog: kosongkan pencarian lama supaya selalu mulai dari daftar kategori */
  if(view === "layanan"){
    $("lq").value = ""; renderLayanan();
    /* Banner katalog ikut palet kategori yang dibuka (daftar kategori = emerald bawaan) */
    const heroL = document.querySelector('[data-view="layanan"] .hero');
    if(layCat){ heroL.setAttribute("data-cat", ""); heroL.setAttribute("style", cvars(layCat)); }
    else { heroL.removeAttribute("data-cat"); heroL.removeAttribute("style"); }
  }
  /* Ornamen banner: glyph sesuai halaman, mengikuti kategori di katalog & lapis 3 */
  const orn = document.querySelector(`[data-view="${view}"] .hero-orn`);
  if(orn){
    const gl = view === "svc" ? gicon(svc.g)
      : (view === "layanan" && layCat ? gicon(layCat) : ({beranda:"search", ssw:"building", oss:"briefcase"}[view] || "list"));
    orn.querySelector("use").setAttribute("href", "#i-" + gl);
  }
}
window.addEventListener("hashchange", route);


/* ============ Init ============ */
bindCopy(document);
$("sswShare").innerHTML = shareHTML("ssw","Panduan SSW Alfa");
$("ossShare").innerHTML = shareHTML("oss","Cara buat akun OSS & NIB Usaha Mikro");
renderHome(); renderSSW(); renderLayanan(); update(); route();
/* Scrollspy tab SSW (instan, tanpa animasi) */
(() => {
  const btns = $$("nav.tabs [data-jump]");
  const ids = btns.map(b => b.dataset.jump);
  if(!btns.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => {
    es.forEach(en => { if(en.isIntersecting){ const i = ids.indexOf(en.target.id); btns.forEach((b,j) => b.classList.toggle("on", i === j)); } });
  }, { rootMargin: "-25% 0px -65% 0px" });
  ids.forEach(id => { const el = document.getElementById(id); if(el) io.observe(el); });
})();