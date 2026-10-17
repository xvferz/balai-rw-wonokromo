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
