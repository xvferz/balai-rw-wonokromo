/* ============ Utilitas ============ */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
/* Desain bersih: buang semua emoji/ikon agar tampilan konsisten lintas perangkat.
   Panah tipografis (→, ↗) dan tanda baca sengaja dipertahankan. */
const EMOJI_RE = /[0-9]\u{FE0F}?\u{20E3}|[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2300}-\u{23FF}\u{25A0}-\u{25FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]\u{FE0F}?|[\u{200D}\u{20E3}\u{FE0F}]/gu;
const tidy = s => String(s).replace(EMOJI_RE, "").replace(/\s{2,}/g, " ").trim();
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
  const inner = `<div><div class="nm">${esc(it.n)}</div>${showCat?`<div class="ct">${esc(it.c)}${asLink?" · via SSW Alfa":""}</div>`:""}</div>${feeHTML(it.r)}`;
  return asLink ? `<a class="item" href="#ssw">${inner}</a>` : `<div class="item">${inner}</div>`;
}
/* Pencarian: token-prefiks dengan skor (judul lebih berbobot daripada tag). */
const toks = s => norm(s).split(/[^a-z0-9]+/).filter(Boolean);
const ALLIDX = ALL.map(it => ({it, tt: toks(it.n), at: toks(it.h)}));
function wScore(w, arr){
  let best = 0;
  for(let i = 0; i < arr.length && best < 4; i++){
    const t = arr[i];
    if(t === w) best = 4;                                      // kata sama persis
    else if(t.startsWith(w) && w.length >= 3) best = Math.max(best, 3);  // prefiks
    else if(t.includes(w) && w.length >= 4) best = Math.max(best, 1);    // substring
  }
  return best;
}
function entryScore(words, e){
  let sum = 0;
  for(const w of words){
    const t = wScore(w, e.tt), a = wScore(w, e.at);
    const s = t ? t + 3 : a;                                   // boost cocok di judul
    if(!s) return 0;                                           // tetap mode AND
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

/* ============ Warna kategori: satu ramp (hue saja) ============
   [utama, tint, gelap] — saturasi & kerlap seragam agar konsisten dgn brand. */
const COL = {
 adminduk:["hsl(220,60%,42%)","hsl(220,58%,96%)","hsl(220,52%,30%)"],
 surat:["hsl(272,45%,45%)","hsl(272,52%,96%)","hsl(272,45%,32%)"],
 izin:["hsl(160,55%,31%)","hsl(160,52%,95%)","hsl(160,50%,23%)"],
 sosial:["hsl(24,65%,42%)","hsl(24,66%,96%)","hsl(24,58%,30%)"],
 rumah:["hsl(45,70%,33%)","hsl(45,72%,96%)","hsl(45,62%,26%)"],
 didik:["hsl(244,55%,45%)","hsl(244,58%,96%)","hsl(244,50%,31%)"],
 sehat:["hsl(350,55%,42%)","hsl(350,62%,96%)","hsl(350,50%,30%)"],
 kerja:["hsl(175,50%,33%)","hsl(175,52%,96%)","hsl(175,48%,25%)"],
 petugas:["hsl(215,30%,42%)","hsl(215,34%,96%)","hsl(215,28%,28%)"]
};
const cvars = g => { const [c,cs,cd] = COL[g]||COL.izin; return `--c:${c};--cs:${cs};--cd:${cd}`; };

/* ============ Scrollspy ============ */
let homeSpyIO = null;
function rebindHomeSpy(){
  if(homeSpyIO){ homeSpyIO.disconnect(); homeSpyIO = null; }
  const btns = [...document.querySelectorAll("#catnav button")];
  if(!btns.length || !("IntersectionObserver" in window)) return;
  const ids = btns.map(b => "grp-" + b.dataset.g);
  homeSpyIO = new IntersectionObserver(es => {
    es.forEach(en => { if(en.isIntersecting){ const i = ids.indexOf(en.target.id); btns.forEach((b,j) => b.classList.toggle("on", i === j)); } });
  }, { rootMargin: "-30% 0px -60% 0px" });
  ids.forEach(id => { const el = document.getElementById(id); if(el) homeSpyIO.observe(el); });
}

/* ============ Beranda ============ */
const SVCIDX = SVC.map(s => ({s, tt: toks(s.t), at: toks([s.t, s.d, s.tags || "", GROUPS.find(g => g[0] === s.g)[1]].join(" "))}));
function tileHTML(s){
  return `<a class="tile${s.feat?" feat":""}" style="${cvars(s.g)}" href="#${s.id}"><div><b>${esc(s.t)}</b><small>${esc(s.d)}</small><span class="ch">${esc(s.ch)}</span></div></a>`;
}
function renderHome(){
  const raw = $("hq").value.trim(), term = norm(raw);
  $("hclr").hidden = !term;
  const out = $("hout");
  if(term){
    const words = term.split(/\s+/).filter(Boolean);
    const hs = ranked(words, SVCIDX).map(x => x.s);
    const ss = ranked(words, ALLIDX).map(x => x.it);
    let html = "";
    if(hs.length) html += `<div class="res-h"><h3>${hs.length} panduan layanan</h3></div><div class="grid">${hs.map(tileHTML).join("")}</div>`;
    if(ss.length) html += `<div class="res-h"><h3>${ss.length} izin di SSW Alfa</h3></div><div class="results">${ss.slice(0,30).map(it=>sswItemHTML(it,true,true)).join("")}</div>`;
    if(!html) html = `<div class="empty" style="margin-top:14px">Belum ketemu untuk "<b>${esc(raw)}</b>". Coba kata lain, atau tanyakan langsung ke petugas di Balai RW.</div>`;
    out.innerHTML = html;
    $("catnav").hidden = true;
    if(homeSpyIO){ homeSpyIO.disconnect(); homeSpyIO = null; }
    document.querySelectorAll("#catnav button").forEach(b => b.classList.remove("on"));
    return;
  }
  let html = `<div class="rwcard"><div class="rwtop"><div><b>Bingung mulai dari mana? Datang ke Balai RW.</b><span>Petugas ASN di sana siap membantu menjawab pertanyaan Anda.</span></div></div><div class="rwfacts"><div><small>Lokasi</small><b>Balai RW di seluruh Kecamatan Wonokromo</b></div><div><small>Jam layanan</small><b>08.00 – 16.00 WIB</b></div><div><small>Biaya</small><b>Gratis</b></div></div></div>`;
  GROUPS.forEach(([g,label]) => {
    const list = SVC.filter(s=>s.g===g);
    html += `<section id="grp-${g}" style="${cvars(g)}"><div class="sec-h"><h2>${esc(tidy(label))}</h2></div><div class="grid">${list.map(tileHTML).join("")}</div></section>`;
  });
  out.innerHTML = html;
  $("catnav").hidden = false;
  rebindHomeSpy();
}
$("catnav").innerHTML = GROUPS.map(([g,l])=>`<button type="button" style="${cvars(g)}" data-g="${g}">${esc(tidy(l))}</button>`).join("");
$("catnav").querySelectorAll("button").forEach(b => b.onclick = () => { if($("hq").value){ $("hq").value=""; renderHome(); } const el=$("grp-"+b.dataset.g); if(el) el.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}); });
$("hstats").innerHTML = `<div><b>${SVC.length}</b><span>panduan layanan</span></div><div><b>${ALL.length}</b><span>izin di SSW Alfa</span></div><div><b>${GROUPS.length}</b><span>kategori</span></div>`;
const HQUICK = [["🔎 Cek desil/gamis","cek gamis"],["📝 SKTM","sktm"],["🔐 Akun KNG","kng"],["📲 KTP digital","ikd"],["💒 Nikah","nikah"],["📊 Sanggah desil","desil"],["🆔 KTP hilang","ktp"],["📑 Akta","akta"],["⚖️ Ahli waris","waris"],["🎓 Beasiswa","beasiswa"],["💳 BPJS gratis","bpjs"],["🏚️ Bedah rumah","rutilahu"],["🛒 PKH / BPNT","pkh"],["🏪 NIB","nib"],["🏗️ IMB / PBG","imb"],["🧰 Cari kerja","kerja"]];
$("hquick").innerHTML = HQUICK.map(([l,t])=>`<button type="button" data-t="${t}">${esc(tidy(l))}</button>`).join("");
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
    const words = term.split(/\s+/).filter(Boolean);
    const hits = ranked(words, ALLIDX).map(x => x.it);
    const ossHint = /\b(oss|nib|rba|izin usaha|umk|umkm|usaha mikro|nomor induk berusaha)\b/.test(term);
    out.innerHTML = (ossHint ? `<div class="callout" style="margin-bottom:10px"><span>Izin usaha seperti NIB diurus lewat <b>OSS RBA</b>, bukan SSW Alfa. <a href="#oss">Lihat caranya →</a></span></div>` : "") +
      `<div class="res-h" style="margin-top:0"><h3>${hits.length} layanan cocok</h3></div>` +
      (hits.length ? `<div class="results">${hits.map(h=>sswItemHTML(h,true,false)).join("")}</div>`
       : `<div class="empty">Belum ketemu untuk "<b>${esc(q.value.trim())}</b>". Coba kata lain, pilih kategori, atau tanya DPMPTSP lewat kontak di bawah.</div>`);
    return;
  }
  if(cat !== null){
    const c = CATS[cat];
    out.innerHTML = `<div class="res-h" style="margin-top:0"><h3>${esc(c.n)}</h3><button class="back" type="button" id="backBtn">Semua kategori</button></div>
      <div class="results">${c.s.map(([n,r])=>sswItemHTML({n,r},false,false)).join("")}</div>`;
    $("backBtn").onclick = () => { cat = null; renderSSW(); };
    return;
  }
  out.innerHTML = `<div class="cats">${CATS.map((c,i)=>`<button class="cat" type="button" data-i="${i}"><b>${esc(c.n)}</b><small>${c.s.length} layanan</small></button>`).join("")}</div>`;
  out.querySelectorAll(".cat").forEach(b => b.onclick = () => { cat = +b.dataset.i; renderSSW(); out.scrollIntoView({block:"nearest"}); });
}
const QUICK = [["🏗️ IMB / PBG","pbg"],["🎓 Magang / PKL","magang"],["📢 Reklame","reklame"],["🌳 Tebang pohon","pohon"],["⚽ Sewa lapangan","lapangan"],["🏫 Izin sekolah","sekolah"],["🗺️ Surat ijo","surat ijo"],["⚖️ Tera timbangan","timbangan"]];
$("quick").innerHTML = QUICK.map(([l,t])=>`<button type="button" data-t="${t}">${esc(tidy(l))}</button>`).join("");
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
  return `<div class="share ${cls||""}"><span>Bantu warga lain:</span><a class="btn wa" href="https://wa.me/?text=${txt}" target="_blank" rel="noopener">Bagikan ke WhatsApp</a><button class="btn cp" type="button" data-link="${url}">Salin link</button></div>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest(".share .cp"); if(!b) return;
  const v = b.dataset.link;
  try { navigator.clipboard.writeText(v).then(()=>toast("Link disalin"), ()=>toast(v)); } catch(err){ toast(v); }
});

/* ============ Halaman layanan umum ============ */
function linkHTML([label,url]){
  const ext = /^https?:/.test(url);
  return `<a class="btn ${ext?"btn-gold":"back"}" style="font-size:14px" href="${esc(url)}"${ext?' target="_blank" rel="noopener"':""}>${esc(tidy(label))}</a>`;
}
function renderSvc(s){
  const [c,cs,cd] = COL[s.g]||COL.izin;
  const hero = $("svcHead").parentElement;
  hero.style.setProperty("--h1", cd); hero.style.setProperty("--h2", c);
  $("svcBody").setAttribute("style", cvars(s.g));
  $("svcHead").innerHTML = `<div class="eyebrow">${esc(tidy(GROUPS.find(g=>g[0]===s.g)[1]))}</div>
    <h1>${esc(s.t)}</h1><p>${esc(s.d)}</p>
    <div class="chips"><span>${esc(s.ch)}</span>${s.steps?`<span>${s.steps.length} langkah</span>`:""}</div>`;
  let h = "", side = "";
  if(s.who) h += `<div class="block o1"><h3>Untuk siapa</h3><ul>${s.who.map(x=>`<li>${esc(tidy(x))}</li>`).join("")}</ul></div>`;
  if(s.cases) side += `<div class="block o2"><h3>Syarat sesuai keperluan</h3>${s.cases.map(([t,items],ci)=>`<details class="x"${(ci===0||s.allOpen)?" open":""}><summary>${esc(tidy(t))}</summary>${items.map((x,i)=>`<label class="check"><input type="checkbox" id="c-${s.id}-${ci}-${i}"><span>${esc(tidy(x))}</span></label>`).join("")}</details>`).join("")}</div>`;
  if(s.bring) side +=`<div class="block o2"><h3>Yang perlu disiapkan</h3>${s.bring.map((x,i)=>`<label class="check"><input type="checkbox" id="b-${s.id}-${i}"><span>${esc(tidy(x))}</span></label>`).join("")}
    ${(s.extra||[]).map(([t,items])=>`<details class="x"><summary>${esc(tidy(t))}</summary><ul>${items.map(x=>`<li>${esc(tidy(x))}</li>`).join("")}</ul></details>`).join("")}</div>`;
  else if(s.extra) h += `<div class="block o3"><h3>Rincian</h3>${s.extra.map(([t,items])=>`<details class="x" open><summary>${esc(tidy(t))}</summary><ul>${items.map(x=>`<li>${esc(tidy(x))}</li>`).join("")}</ul></details>`).join("")}</div>`;
  if(s.steps) h += `<div class="block o3"><h3>Alurnya</h3><ol class="flow">${s.steps.map(([w,t],i)=>`<li><span class="n">${i+1}</span><div><span class="who">${esc(tidy(w))}</span><p>${esc(tidy(t))}</p></div></li>`).join("")}</ol></div>`;
  if(s.kv) side += `<div class="block o4"><h3>${esc(tidy(s.kvTitle||"Info"))}</h3><div class="kv">${s.kv.map(([k,v])=>`<span>${esc(tidy(k))}</span><b>${esc(tidy(v))}</b>`).join("")}</div>${s.kvNote?`<p class="src-note">${esc(tidy(s.kvNote))}</p>`:""}</div>`;
  if(s.sections) h += s.sections.map(([t,items])=>`<div class="block o5"><h3>${esc(tidy(t))}</h3><ul>${items.map(x=>`<li>${esc(tidy(x))}</li>`).join("")}</ul></div>`).join("");
  if(s.notes) h += `<div class="block o5"><h3>Perlu diketahui</h3>${s.notes.map(([k,t])=>`<div class="tip ${k}"><span>${tidy(t)}</span></div>`).join("")}</div>`;
  if(s.contacts) side += `<div class="block o6"><h3>Kontak</h3>${s.contacts.map(([e,l,v,cp,url])=>`<div class="row"><div><small>${esc(tidy(l))}</small><b>${url?`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(v)}</a>`:esc(v)}</b></div>${cp?`<button class="copy" type="button" data-copy="${esc(cp)}">Salin</button>`:""}</div>`).join("")}</div>`;
  if(s.links) side += `<div class="chips o7" style="margin-top:14px">${s.links.map(linkHTML).join("")}</div>`;
  h += shareHTML(s.id, s.t, "o8");
  h += `<p class="src-note o8">Sumber: ${esc(s.src)}. · Info diperbarui ${UPDATED}.</p>`;
  const body = $("svcBody");
  body.innerHTML = side ? `<div class="dgrid"><div class="dmain">${h}</div><aside class="dside">${side}</aside></div>` : `<div class="dgrid solo"><div class="dmain">${h}</div></div>`;
  wireBoxes(body); bindCopy(body);
}

/* ============ Router ============ */
const BRW = "Pelayanan Balai RW Wonokromo";
const DEFAULT_DESC = (document.querySelector('meta[name="description"]')||{}).content || "";
const VIEW_DESC = {
  ssw: "Panduan SSW Alfa Surabaya: buat akun, ajukan izin online, pantau status, revisi berkas, dan telusuri 17 kategori layanan.",
  oss: "Cara buat akun OSS dan NIB usaha mikro gratis di oss.go.id, bisa didampingi petugas di Balai RW Kecamatan Wonokromo."
};
function route(){
  const id = (location.hash||"").slice(1) || "beranda";
  let view = "beranda";
  if(id==="ssw"||id==="oss") view = id;
  else if(SVCMAP[id]){ view = "svc"; renderSvc(SVCMAP[id]); }
  document.querySelectorAll("[data-view]").forEach(v => v.hidden = v.dataset.view !== view);
  $("backLink").hidden = view === "beranda";
  window.scrollTo(0,0);
  /* Judul & deskripsi per halaman (riwayat back-button + SEO) */
  const svc = SVCMAP[id];
  document.title = svc ? (svc.t + " – " + BRW)
    : view === "ssw" ? ("Panduan SSW Alfa – " + BRW)
    : view === "oss" ? ("OSS RBA: Akun & NIB Usaha Mikro – " + BRW)
    : BRW;
  const md = document.querySelector('meta[name="description"]');
  if(md) md.setAttribute("content", svc ? svc.d : (VIEW_DESC[view] || DEFAULT_DESC));
}
document.querySelectorAll("[data-jump]").forEach(b => b.onclick = () => $(b.dataset.jump).scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}));
window.addEventListener("hashchange", route);
bindCopy(document);
$("sswShare").innerHTML = shareHTML("ssw","Panduan SSW Alfa");
$("ossShare").innerHTML = shareHTML("oss","Cara buat akun OSS & NIB Usaha Mikro");
renderHome(); renderSSW(); update(); route();
/* Scrollspy untuk tab SSW (instan, tanpa animasi) */
(() => {
  const btns = [...document.querySelectorAll("nav.tabs [data-jump]")];
  const ids = btns.map(b => b.dataset.jump);
  if(!btns.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => {
    es.forEach(en => { if(en.isIntersecting){ const i = ids.indexOf(en.target.id); btns.forEach((b,j) => b.classList.toggle("on", i === j)); } });
  }, { rootMargin: "-25% 0px -65% 0px" });
  ids.forEach(id => { const el = document.getElementById(id); if(el) io.observe(el); });
})();
