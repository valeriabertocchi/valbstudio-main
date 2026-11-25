/* Valb Studio · Gestionale — salvataggio sul dispositivo, foto e sincronizzazione tra iPhone e iPad.

   Come funziona
   - Tutti i dati (DATA, SET, esauriti nascosti) sono salvati subito su questo dispositivo (localStorage),
     così l'app funziona anche senza connessione.
   - Foto e PDF sono salvati a parte (IndexedDB); nelle schede resta solo un riferimento "m:<id>".
   - Se è collegato un progetto Supabase e hai fatto l'accesso, ogni scheda diventa una riga della tabella
     "items" (una riga per scheda). Le modifiche partono da sole; quelle fatte sull'altro dispositivo
     arrivano in tempo reale (e comunque a ogni apertura e ogni 30 secondi).
     Foto e PDF vanno nello spazio "media" di Supabase Storage.
   - Se la stessa scheda viene cambiata su due dispositivi senza connessione, vince l'ultima inviata. */

/* ---------- small helpers ---------- */
const LS={
  get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(_){return d;}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(_){return false;}},
  del(k){try{localStorage.removeItem(k);}catch(_){}}
};
const KEY={data:"valb.data.v1",known:"valb.known.v1",since:"valb.since.v1",cloud:"valb.cloud.v1",user:"valb.user.v1"};
/* same JSON whatever the key order (the database may reorder keys) */
function canon(v){
  if(v===null||typeof v!=="object")return JSON.stringify(v);
  if(Array.isArray(v))return "["+v.map(x=>x===undefined||typeof x==="function"?"null":canon(x)).join(",")+"]";
  return "{"+Object.keys(v).filter(k=>v[k]!==undefined&&typeof v[k]!=="function").sort().map(k=>JSON.stringify(k)+":"+canon(v[k])).join(",")+"}";
}
function hashStr(s){
  let a=0x811c9dc5,b=0x9747b28c;
  for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);a=Math.imul(a^c,16777619);b=Math.imul(b^c,2246822519);}
  return (a>>>0).toString(36)+(b>>>0).toString(36)+s.length.toString(36);
}
const hashOf=v=>hashStr(canon(v));
const newId=()=>(crypto.randomUUID?crypto.randomUUID():uid("m")+uid(""));

/* ---------- photos and PDFs on this device (IndexedDB) ---------- */
const IDB={
  open(){
    if(!this.p)this.p=new Promise((res,rej)=>{const r=indexedDB.open("valb-media",1);
      r.onupgradeneeded=()=>r.result.createObjectStore("media",{keyPath:"id"});
      r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});
    return this.p;
  },
  async run(mode,fn){
    const db=await this.open();
    return new Promise((res,rej)=>{const t=db.transaction("media",mode);let out;const r=fn(t.objectStore("media"));
      if(r)r.onsuccess=()=>{out=r.result;};t.oncomplete=()=>res(out);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error);});
  },
  get(id){return this.run("readonly",s=>s.get(id));},
  put(rec){return this.run("readwrite",s=>s.put(rec));},
  all(){return this.run("readonly",s=>s.getAll());},
  clear(){return this.run("readwrite",s=>s.clear());}
};
/* make photos lighter before saving them: max 1600 px, JPEG */
function shrinkImage(file,max=1600,q=.85){
  return new Promise(res=>{
    const u=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{try{
        const k=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight)),w=Math.max(1,Math.round(img.naturalWidth*k)),h=Math.max(1,Math.round(img.naturalHeight*k));
        const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,w,h);g.drawImage(img,0,0,w,h);
        c.toBlob(b=>{URL.revokeObjectURL(u);res(b||file);},"image/jpeg",q);
      }catch(_){URL.revokeObjectURL(u);res(file);}};
    img.onerror=()=>{URL.revokeObjectURL(u);res(file);};
    img.src=u;
  });
}
const MEDIA={
  urls:new Map(),loading:new Map(),failed:new Map(),
  isRef:s=>typeof s==="string"&&s.startsWith("m:"),
  /* address to show a photo now, or "" (the photo is then loaded and shown as soon as it is ready) */
  url(ref){
    if(!ref)return "";
    if(!this.isRef(ref))return ref;
    const id=ref.slice(2),u=this.urls.get(id);
    if(u)return u;
    this.load(id);return "";
  },
  load(id){
    if(this.loading.has(id))return this.loading.get(id);
    const f=this.failed.get(id);if(f&&Date.now()-f<15000)return Promise.resolve(null);
    const p=(async()=>{
      let rec=await IDB.get(id).catch(()=>null);
      if(!rec&&Cloud.ready()){
        const blob=await Cloud.download(id);
        if(blob){rec={id,buf:await blob.arrayBuffer(),type:blob.type||"application/octet-stream",up:1};await IDB.put(rec).catch(()=>{});}
      }
      if(!rec){this.failed.set(id,Date.now());return null;}
      const u=URL.createObjectURL(new Blob([rec.buf],{type:rec.type}));this.urls.set(id,u);this.failed.delete(id);this.paint(id,u);return u;
    })().catch(()=>{this.failed.set(id,Date.now());return null;}).finally(()=>this.loading.delete(id));
    this.loading.set(id,p);return p;
  },
  paint(id,u){
    const ref="m:"+id;
    document.querySelectorAll(`[data-mref="${ref}"]`).forEach(el=>{el.style.backgroundImage=`url('${u}')`;el.removeAttribute("data-mref");if(el.classList.contains("ph"))el.textContent="";});
    document.querySelectorAll(`[data-mhref="${ref}"]`).forEach(el=>{el.href=u;el.removeAttribute("data-mhref");el.removeAttribute("aria-disabled");});
  },
  /* try again the photos that were not ready (e.g. still being sent by the other device) */
  retry(){document.querySelectorAll("[data-mref],[data-mhref]").forEach(el=>{const r=el.dataset.mref||el.dataset.mhref;if(this.isRef(r)){this.failed.delete(r.slice(2));this.url(r);}});},
  async add(file){
    try{
      let blob=file,type=file.type||"";
      if(/^image\//.test(type)||/\.(heic|heif|jpe?g|png|webp)$/i.test(file.name||"")){blob=await shrinkImage(file);type=blob.type||"image/jpeg";}
      const id=newId();
      await IDB.put({id,buf:await blob.arrayBuffer(),type:type||"application/octet-stream",up:0});
      this.urls.set(id,URL.createObjectURL(blob));
      Cloud.kick();
      return "m:"+id;
    }catch(e){toast("Non sono riuscita a salvare il file. Riprova.");return null;}
  }
};

/* ---------- data on this device ---------- */
let lastSaved="",saveTimer=0,storageWarned=false;
function snapshot(){return {v:1,DATA,SET:{...SET},dismissed:[...dismissed]};}
function saveLocal(){
  const s=JSON.stringify(snapshot());
  if(s===lastSaved)return;
  try{localStorage.setItem(KEY.data,s);lastSaved=s;}
  catch(_){if(!storageWarned){storageWarned=true;toast("Memoria del telefono piena: non riesco a salvare le ultime modifiche.");}}
}
function wipeData(){
  Object.keys(DATA).forEach(k=>{if(isCustom(k))delete DATA[k];else DATA[k]=[];});
  ["filati","hardware","fodere","altri","modelli","prodotti","ordini","cats","daordinare","note","progetti","ispirazioni"].forEach(k=>{if(!DATA[k])DATA[k]=[];});
  Object.assign(SET,{tariffa:"",splash:true,laborOn:true});dismissed.clear();rebuildCats();
}
function loadLocal(){
  const s=LS.get(KEY.data,null);if(!s||!s.DATA)return false;
  Object.keys(s.DATA).forEach(k=>{if(Array.isArray(s.DATA[k]))DATA[k]=s.DATA[k];});
  Object.assign(SET,s.SET||{});dismissed.clear();(s.dismissed||[]).forEach(x=>dismissed.add(x));
  rebuildCats();lastSaved=JSON.stringify(snapshot());return true;
}
/* custom warehouse categories follow DATA.cats */
function rebuildCats(){
  const ids=new Set((DATA.cats||[]).map(c=>c.id));
  INV.filter(isCustom).forEach(id=>{if(!ids.has(id)){INV.splice(INV.indexOf(id),1);delete SCHEMA[id];delete LAYOUT[id];delete QTYKEYS[id];delete DATA[id];}});
  (DATA.cats||[]).forEach(c=>{if(!SCHEMA[c.id])makeCat(c.id,c.name);else SCHEMA[c.id].name=SCHEMA[c.id].single=c.name;});
  Object.keys(DATA).forEach(k=>{if(isCustom(k)&&!ids.has(k))delete DATA[k];});
  if(sub&&isCustom(sub)&&!ids.has(sub)){sub=null;}
}
/* called by the app after every change (and after every redraw) */
function checkSync(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{saveLocal();if(Cloud.user)Cloud.push().catch(()=>{});},350);
}
function flush(){clearTimeout(saveTimer);saveLocal();if(Cloud.user)Cloud.push().catch(()=>{});}
addEventListener("pagehide",flush);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")flush();else if(Cloud.user)Cloud.kick(0);});

/* ---------- records: one per card, compared with what the cloud already has ---------- */
const ASC=new Set(["cats"]);   /* categories keep the order in which they were created */
function eachRecord(fn){
  Object.keys(DATA).forEach(coll=>{const L=DATA[coll];if(!Array.isArray(L))return;
    const n=L.length,now=Date.now();
    L.forEach((r,i)=>{if(!r||typeof r!=="object"||r.id==null)return;
      if(r._t==null)r._t=ASC.has(coll)?now-(n-i):now-i;   /* keeps the order the list has now */
      fn(coll,String(r.id),r);});
  });
  fn("_set","main",{...SET});
  fn("_meta","dismissed",{list:[...dismissed].sort()});
}
const recKey=(coll,rid)=>coll+"/"+rid;
function localRecord(coll,rid){
  if(coll==="_set")return {...SET};
  if(coll==="_meta"&&rid==="dismissed")return {list:[...dismissed].sort()};
  const L=DATA[coll];return Array.isArray(L)?L.find(r=>r&&String(r.id)===rid)||null:null;
}
function insertByTime(L,rec,asc){
  const t=+rec._t||0;let i=asc?L.findIndex(r=>(+r._t||0)>t):L.findIndex(r=>(+r._t||0)<t);
  if(i<0)i=L.length;L.splice(i,0,rec);
}
let known=LS.get(KEY.known,{});
const saveKnown=()=>LS.set(KEY.known,known);
let renderPending=false;
function safeRender(){
  const a=document.activeElement,typing=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA")&&a.closest("#main,#sheet");
  if(typing){if(!renderPending){renderPending=true;a.addEventListener("blur",()=>{renderPending=false;safeRender();},{once:true});}return;}
  renderMain();if(sheet)renderSheet(true);
}
/* changes coming from the cloud (the other device) */
function applyRemote(rows){
  if(!rows||!rows.length)return;
  const openObj=sheet&&DATA[sheet.coll]?DATA[sheet.coll][sheet.idx]:null;
  let changed=false,cats=false;
  rows.forEach(row=>{
    if(!row||!row.coll||row.rid==null)return;
    const coll=row.coll,rid=String(row.rid),key=recKey(coll,rid),cur=localRecord(coll,rid);
    const curH=cur?hashOf(cur):null,dirty=cur?curH!==known[key]:known[key]!==undefined;
    if(row.deleted){
      if(cur&&dirty)return;                       /* changed here meanwhile: keep it, it will be sent again */
      if(cur&&Array.isArray(DATA[coll])){DATA[coll].splice(DATA[coll].indexOf(cur),1);changed=true;if(coll==="cats")cats=true;}
      delete known[key];return;
    }
    const data=row.data||{},rh=hashOf(data);
    if(cur&&curH===rh){known[key]=rh;return;}   /* already the same */
    const first=coll.startsWith("_")&&known[key]===undefined;   /* settings on a device that never synced: take the cloud's */
    if(dirty&&!first)return;                     /* unsent changes here win */
    if(coll==="_set")Object.assign(SET,data);
    else if(coll==="_meta"){if(rid==="dismissed"){dismissed.clear();(data.list||[]).forEach(x=>dismissed.add(x));}}
    else{
      if(!Array.isArray(DATA[coll]))DATA[coll]=[];
      if(cur){Object.keys(cur).forEach(k=>delete cur[k]);Object.assign(cur,data);}
      else insertByTime(DATA[coll],data,ASC.has(coll));
      if(coll==="cats")cats=true;
    }
    known[key]=rh;changed=true;
  });
  saveKnown();
  if(!changed)return;
  if(cats)rebuildCats();
  if(sheet){const L=DATA[sheet.coll],i=L&&openObj?L.indexOf(openObj):-1;if(i<0)closeSheet();else sheet.idx=i;}
  saveLocal();safeRender();
}

/* ---------- cloud (Supabase) ---------- */
const Cloud={
  client:null,user:null,state:"off",at:null,err:"",busy:false,again:false,ch:null,timer:0,poll:0,
  cfg(){const c=LS.get(KEY.cloud,null)||{},d=window.VALB_CONFIG||{};return {url:String(c.url||d.supabaseUrl||"").trim(),key:String(c.key||d.supabaseAnonKey||"").trim(),skip:!!c.skip};},
  configured(){const c=this.cfg();return !!(c.url&&c.key);},
  ready(){return !!(this.client&&this.user&&navigator.onLine!==false);},
  setState(s,err){this.state=s;this.err=err||"";paintSync();},
  init(){
    if(this.client||!this.configured()||!window.supabase)return;
    const c=this.cfg();
    try{this.client=window.supabase.createClient(c.url,c.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:"valb-auth"}});}
    catch(e){this.client=null;this.setState("error","Indirizzo o chiave non validi");showGate("setup",{err:"Indirizzo o chiave non validi. Controlla e riprova."});return;}
    this.client.auth.onAuthStateChange((ev,session)=>{
      if(ev==="PASSWORD_RECOVERY"){showGate("newpass");return;}
      if(session&&session.user){if(!this.user||this.user.id!==session.user.id)this.start(session.user);}
      else if(ev==="SIGNED_OUT"){this.stop();}
    });
    this.setState("login");
    this.client.auth.getSession().then(({data})=>{
      const s=data&&data.session;
      if(s&&s.user){if(!this.user)this.start(s.user);}
      else if(!this.user)showGate("login");
    }).catch(()=>{if(!this.user)showGate("login");});
  },
  start(user){
    const prev=LS.get(KEY.user,null);
    if(prev&&prev.id&&prev.id!==user.id){   /* another account on this device: start clean */
      wipeData();known={};saveKnown();LS.del(KEY.since);lastSaved="";saveLocal();IDB.clear().catch(()=>{});MEDIA.urls.clear();
      renderMain();
    }
    this.user=user;LS.set(KEY.user,{id:user.id,email:user.email||""});
    if(gateMode!=="newpass")hideGate();
    try{
      if(this.ch)this.client.removeChannel(this.ch);
      this.ch=this.client.channel("items-"+user.id)
        .on("postgres_changes",{event:"*",schema:"public",table:"items",filter:"user_id=eq."+user.id},p=>{
          const r=p&&p.new;if(!r||!r.coll)return;
          applyRemote([r]);this.mark(r.updated_at);
        })
        .subscribe();
    }catch(_){}
    clearInterval(this.poll);
    this.poll=setInterval(()=>{if(document.visibilityState==="visible")this.kick(0);},30000);
    this.kick(0);
  },
  stop(){
    clearInterval(this.poll);clearTimeout(this.timer);
    if(this.ch&&this.client){try{this.client.removeChannel(this.ch);}catch(_){}}
    this.ch=null;this.user=null;this.setState(this.configured()?"login":"off");
  },
  kick(ms=500){clearTimeout(this.timer);this.timer=setTimeout(()=>this.sync(),ms);},
  mark(ts){
    if(!ts||!this.user)return;const all=LS.get(KEY.since,{}),cur=all[this.user.id];
    if(!cur||Date.parse(ts)>Date.parse(cur)){all[this.user.id]=ts;LS.set(KEY.since,all);}
  },
  async sync(){
    if(!this.client||!this.user)return;
    if(navigator.onLine===false){this.setState("offline");return;}
    if(this.busy){this.again=true;return;}
    this.busy=true;this.setState("syncing");
    try{
      await this.pull();
      await this.push();
      await this.uploadMedia();
      this.at=new Date();this.setState("ok");MEDIA.retry();
    }catch(e){this.setState(navigator.onLine===false?"offline":"error",errText(e));}
    this.busy=false;
    if(this.again){this.again=false;this.kick(300);}
  },
  async pull(){
    const uidv=this.user.id,since=(LS.get(KEY.since,{})[uidv])||"1970-01-01T00:00:00.000Z";
    const from=new Date(Math.max(0,Date.parse(since)-120000)).toISOString();   /* a little overlap is harmless */
    for(let off=0;;off+=500){
      const {data,error}=await this.client.from("items").select("coll,rid,data,deleted,updated_at")
        .eq("user_id",uidv).gt("updated_at",from).order("updated_at",{ascending:true}).range(off,off+499);
      if(error)throw error;
      applyRemote(data||[]);(data||[]).forEach(r=>this.mark(r.updated_at));
      if(!data||data.length<500)break;
    }
  },
  pushing:null,
  push(){
    if(!this.client||!this.user||navigator.onLine===false)return Promise.resolve();
    if(this.pushing){this.pushAgain=true;return this.pushing;}
    const run=async()=>{
      try{
        do{
          this.pushAgain=false;
          const uidv=this.user.id,rows=[],marks=[],seen=new Set();
          eachRecord((coll,rid,r)=>{const key=recKey(coll,rid);seen.add(key);const h=hashOf(r);
            if(known[key]!==h){rows.push({user_id:uidv,coll,rid,data:JSON.parse(JSON.stringify(r)),deleted:false});marks.push([key,h]);}});
          Object.keys(known).forEach(key=>{if(seen.has(key))return;const i=key.indexOf("/");
            rows.push({user_id:uidv,coll:key.slice(0,i),rid:key.slice(i+1),data:null,deleted:true});marks.push([key,null]);});
          for(let i=0;i<rows.length;i+=200){
            const {error}=await this.client.from("items").upsert(rows.slice(i,i+200),{onConflict:"user_id,coll,rid"});
            if(error)throw error;
            marks.slice(i,i+200).forEach(([k,h])=>{if(h===null)delete known[k];else known[k]=h;});
            saveKnown();
          }
          if(rows.length){this.at=new Date();if(this.state!=="syncing")this.setState("ok");}
        }while(this.pushAgain);
      }catch(e){this.setState(navigator.onLine===false?"offline":"error",errText(e));throw e;}
    };
    /* "finally" always runs later, so the flag is cleared even when there was nothing to send */
    this.pushing=run().finally(()=>{this.pushing=null;});
    return this.pushing;
  },
  async uploadMedia(){
    const all=await IDB.all().catch(()=>[]);
    for(const rec of all){
      if(rec.up)continue;
      const {error}=await this.client.storage.from("media").upload(this.user.id+"/"+rec.id,new Blob([rec.buf],{type:rec.type}),{upsert:true,contentType:rec.type});
      if(error)throw error;
      rec.up=1;await IDB.put(rec).catch(()=>{});
    }
  },
  async download(id){
    try{const {data,error}=await this.client.storage.from("media").download(this.user.id+"/"+id);return error?null:data;}catch(_){return null;}
  }
};
addEventListener("online",()=>{if(Cloud.user)Cloud.kick(0);});
addEventListener("offline",()=>{if(Cloud.user)Cloud.setState("offline");});

function errText(e){
  const m=String((e&&(e.message||e.error_description||e.msg))||e||"");
  if(/invalid login credentials/i.test(m))return "Email o password non corretti.";
  if(/email not confirmed/i.test(m))return "Devi prima confermare l'email: apri il messaggio che hai ricevuto e tocca il link.";
  if(/already registered|already exists/i.test(m))return "Questa email ha già un account: tocca «Entra».";
  if(/password should be at least|weak password/i.test(m))return "La password deve avere almeno 6 caratteri.";
  if(/rate limit|too many/i.test(m))return "Troppi tentativi: aspetta qualche minuto e riprova.";
  if(/failed to fetch|network|load failed|fetch/i.test(m))return "Non riesco a collegarmi: controlla la connessione.";
  if(/signups not allowed|signup is disabled/i.test(m))return "La creazione di nuovi account è disattivata.";
  if(/relation .*items.* does not exist|could not find the table/i.test(m))return "Nel database manca la tabella: esegui il file supabase/schema.sql (vedi la guida).";
  if(/bucket not found/i.test(m))return "Nel database manca lo spazio per le foto: esegui il file supabase/schema.sql (vedi la guida).";
  return m||"Errore sconosciuto.";
}

/* ---------- sync box in Impostazioni ---------- */
function syncLine(){
  const s=Cloud.state,hm=Cloud.at?Cloud.at.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"}):"";
  const cls=s==="ok"?"ok":s==="syncing"?"syncing":"offline";
  const [t,d]=
    !Cloud.configured()?["Solo su questo dispositivo","Collega iPhone e iPad per avere gli stessi dati su entrambi"]:
    !Cloud.user?["Accesso non fatto","Entra con la tua email per sincronizzare"]:
    s==="syncing"?["Sincronizzazione in corso…","Sto scambiando le modifiche con l'altro dispositivo"]:
    s==="offline"?["Sei offline","Le modifiche sono salvate qui e partono appena torna la connessione"]:
    s==="error"?["Sincronizzazione non riuscita",Cloud.err||"Riprovo tra poco"]:
    ["Sincronizzato",(hm?`Ultimo aggiornamento alle ${hm} · `:"")+"stessi dati su iPhone e iPad"];
  return `<span class="sdot" aria-hidden="true"></span><span class="setl"><b>${esc(t)}</b><small>${esc(d)}</small></span>`;
}
const syncCls=()=>!Cloud.user?" offline":Cloud.state==="syncing"?" syncing":Cloud.state==="ok"?"":" offline";
function paintSync(){const e=$("sync");if(e){e.className="setrow sync"+syncCls();e.innerHTML=syncLine();}}
function syncBox(){
  const c=Cloud.configured(),u=Cloud.user;
  return `<h2>Sincronizzazione</h2>
    <div class="groups">
      <div class="setrow sync${syncCls()}" id="sync">${syncLine()}</div>
      ${u?`<div class="setrow"><span class="setl"><b>Account</b><small>${esc(u.email||"")}</small></span></div>`:""}
      <div class="acct-btns">
        ${!c?`<button class="btn" data-gate="setup">Collega iPhone e iPad</button>`:!u?`<button class="btn" data-gate="login">Entra</button>`:`<button class="btn ghost" data-syncnow>Sincronizza ora</button><button class="btn ghost" data-logout>Esci</button>`}
        <button class="btn ghost" data-backup>Scarica una copia dei dati</button>
      </div>
    </div>
    ${c&&!u?`<button class="textlink" data-unlink>Scollega il database da questo dispositivo</button>`:""}`;
}
function downloadBackup(){
  const blob=new Blob([JSON.stringify({app:"Valb Studio",data:snapshot(),creato:new Date().toISOString()},null,1)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`valb-studio-backup-${isoToday()}.json`;
  document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);
}
function logout(){
  popConfirm("Uscire dall'account?","I dati restano salvati nel cloud e sull'altro dispositivo. Da questo dispositivo verranno tolti finché non entri di nuovo.","Esci",async()=>{
    const em=(Cloud.user&&Cloud.user.email)||"";
    try{await Cloud.push();}catch(_){}
    try{await Cloud.client.auth.signOut();}catch(_){}
    Cloud.stop();wipeData();known={};saveKnown();LS.del(KEY.since);LS.set(KEY.user,{email:em});lastSaved="";saveLocal();
    await IDB.clear().catch(()=>{});MEDIA.urls.clear();
    closeSheet();go("magazzino");showGate("login");
  });
}
$("app").addEventListener("click",e=>{
  const t=e.target;
  if(t.closest("[data-gate]")){e.stopPropagation();showGate(t.closest("[data-gate]").dataset.gate);return;}
  if(t.closest("[data-syncnow]")){e.stopPropagation();Cloud.kick(0);return;}
  if(t.closest("[data-logout]")){e.stopPropagation();logout();return;}
  if(t.closest("[data-backup]")){e.stopPropagation();downloadBackup();return;}
  if(t.closest("[data-unlink]")){e.stopPropagation();
    popConfirm("Scollegare il database?","I dati restano su questo dispositivo, ma non si sincronizzano più finché non lo ricolleghi.","Scollega",()=>{
      LS.set(KEY.cloud,{skip:true});Cloud.stop();Cloud.client=null;renderMain();});return;}
  if(t.closest("[data-mhref]")){e.preventDefault();e.stopPropagation();toast("Il PDF si sta ancora caricando: riprova tra un attimo.");return;}
},true);

/* ---------- setup and login screens ---------- */
let gateMode="",gateBusy=false;
function gateHtml(mode,o){
  o=o||{};
  const brand=`<div class="brand-big" role="img" aria-label="Valb Studio"><span class="lm lm-mono"></span><span class="lm lm-word"></span></div>`;
  const msg=o.err?`<p class="msg err" role="alert">${esc(o.err)}</p>`:o.msg?`<p class="msg" role="status">${esc(o.msg)}</p>`:"";
  const c=Cloud.cfg(),email=o.email||(LS.get(KEY.user,null)||{}).email||"";
  if(mode==="setup")return `<form class="gate-in" data-gform="setup">${brand}<h1>Collega iPhone e iPad</h1>
    <p class="lead">Per avere gli stessi dati su entrambi i dispositivi, incolla qui i due codici del tuo progetto Supabase (Project Settings › API). Lo fai una volta su ogni dispositivo.</p>${msg}
    <div class="field"><label class="flabel" for="g-url">Project URL</label><input class="inp" id="g-url" type="url" inputmode="url" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="https://xxxx.supabase.co" value="${esc(c.url)}"></div>
    <div class="field"><label class="flabel" for="g-key">Chiave anon public</label><input class="inp" id="g-key" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="eyJhbGciOi…" value="${esc(c.key)}"></div>
    <button class="primary" type="submit">Collega</button>
    <button class="textlink" type="button" data-gskip>Per ora usa l'app solo su questo dispositivo</button></form>`;
  if(mode==="signup")return `<form class="gate-in" data-gform="signup">${brand}<h1>Crea il tuo account</h1>
    <p class="lead">Lo crei una volta sola. Poi su iPhone e iPad entri con la stessa email e password.</p>${msg}
    <div class="field"><label class="flabel" for="g-email">Email</label><input class="inp" id="g-email" type="email" autocomplete="username" autocapitalize="off" value="${esc(email)}"></div>
    <div class="field"><label class="flabel" for="g-pass">Password (almeno 6 caratteri)</label><input class="inp" id="g-pass" type="password" autocomplete="new-password"></div>
    <button class="primary" type="submit">Crea account</button>
    <button class="textlink" type="button" data-gmode="login">Hai già un account? Entra</button></form>`;
  if(mode==="newpass")return `<form class="gate-in" data-gform="newpass">${brand}<h1>Nuova password</h1>${msg}
    <div class="field"><label class="flabel" for="g-pass">Nuova password (almeno 6 caratteri)</label><input class="inp" id="g-pass" type="password" autocomplete="new-password"></div>
    <button class="primary" type="submit">Salva la password</button></form>`;
  return `<form class="gate-in" data-gform="login">${brand}<h1>Entra</h1>
    <p class="lead">Usa la stessa email e password su iPhone e iPad: i dati saranno uguali su entrambi.</p>${msg}
    <div class="field"><label class="flabel" for="g-email">Email</label><input class="inp" id="g-email" type="email" autocomplete="username" autocapitalize="off" value="${esc(email)}"></div>
    <div class="field"><label class="flabel" for="g-pass">Password</label><input class="inp" id="g-pass" type="password" autocomplete="current-password"></div>
    <button class="primary" type="submit">Entra</button>
    <button class="textlink" type="button" data-gmode="signup">Prima volta? Crea l'account</button>
    <button class="textlink" type="button" data-gforgot>Password dimenticata?</button>
    <button class="textlink" type="button" data-gmode="setup">Cambia database</button></form>`;
}
function showGate(mode,o){gateMode=mode;const g=$("gate");g.innerHTML=gateHtml(mode,o);g.hidden=false;}
function hideGate(){gateMode="";const g=$("gate");g.hidden=true;g.innerHTML="";}
function gateBtn(on){const b=$("gate").querySelector(".primary");if(b){b.disabled=on;}gateBusy=on;}
$("gate").addEventListener("click",e=>{
  const t=e.target;e.stopPropagation();
  let b;
  if(b=t.closest("[data-gmode]")){showGate(b.dataset.gmode);return;}
  if(t.closest("[data-gskip]")){LS.set(KEY.cloud,{skip:true});hideGate();return;}
  if(t.closest("[data-gforgot]")){
    const em=($("g-email")||{}).value||"";
    if(!em.trim()){showGate("login",{err:"Scrivi prima la tua email, poi tocca «Password dimenticata?»."});return;}
    Cloud.client.auth.resetPasswordForEmail(em.trim(),{redirectTo:location.origin+location.pathname})
      .then(({error})=>showGate("login",error?{err:errText(error),email:em}:{msg:"Ti ho mandato un'email: apri il link per scegliere una nuova password.",email:em}))
      .catch(err=>showGate("login",{err:errText(err),email:em}));
    return;
  }
});
$("gate").addEventListener("submit",async e=>{
  e.preventDefault();if(gateBusy)return;
  const f=e.target,mode=f.dataset.gform,v=id=>(($(id)||{}).value||"").trim();
  if(mode==="setup"){
    let url=v("g-url").replace(/\/+$/,""),key=v("g-key");
    if(url&&!/^https?:\/\//.test(url))url="https://"+url;
    if(!/^https:\/\/[^\s/]+$/.test(url)||key.length<20){showGate("setup",{err:"Controlla i due codici: il Project URL inizia con https:// e la chiave anon public è una riga lunga."});return;}
    LS.set(KEY.cloud,{url,key});Cloud.client=null;Cloud.init();return;
  }
  if(!Cloud.client){Cloud.init();if(!Cloud.client)return;}
  const email=v("g-email"),pass=($("g-pass")||{}).value||"";
  gateBtn(true);
  try{
    if(mode==="login"){
      if(!email||!pass){gateBtn(false);showGate("login",{err:"Scrivi email e password.",email});return;}
      const {data,error}=await Cloud.client.auth.signInWithPassword({email,password:pass});
      if(error)throw error;
      if(data&&data.user&&!Cloud.user)Cloud.start(data.user);
    }else if(mode==="signup"){
      if(!email||pass.length<6){gateBtn(false);showGate("signup",{err:"Scrivi la tua email e una password di almeno 6 caratteri.",email});return;}
      const {data,error}=await Cloud.client.auth.signUp({email,password:pass,options:{emailRedirectTo:location.origin+location.pathname}});
      if(error)throw error;
      if(data&&data.session&&data.user){if(!Cloud.user)Cloud.start(data.user);}
      else{LS.set(KEY.user,{email});showGate("login",{msg:"Account creato. Ti ho mandato un'email: apri il link per confermare, poi torna qui ed entra."});}
    }else if(mode==="newpass"){
      if(pass.length<6){gateBtn(false);showGate("newpass",{err:"La password deve avere almeno 6 caratteri."});return;}
      const {error}=await Cloud.client.auth.updateUser({password:pass});
      if(error)throw error;
      hideGate();toast("Password cambiata");
    }
  }catch(err){showGate(mode,{err:errText(err),email});}
  gateBtn(false);
});

/* ---------- start ---------- */
(function boot(){
  loadLocal();
  renderTabs();renderMain();
  if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))navigator.serviceWorker.register("sw.js").catch(()=>{});
  const c=Cloud.cfg();
  if(Cloud.configured())Cloud.init();
  else if(!c.skip)showGate("setup");
})();
