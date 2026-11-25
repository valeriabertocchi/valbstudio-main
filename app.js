/* Valb Studio · Gestionale — interfaccia e logica dell'app */
const svg=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const ICON={
  magazzino:svg('<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>'),
  ordini:svg('<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/>'),
  schede:svg('<rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="12" cy="9.5" r="2.5"/><path d="M8 15.5h8M9.5 18.5h5"/>'),
  note:svg('<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14.5 7.5l2 2"/>'),
  filati:svg('<circle cx="12" cy="12" r="8"/><path d="M5.5 8.5c4.5-.5 9.5 3 11.5 9M4.5 13c3.5 0 7 2.5 8 6.5M9 4.6c3 2 6.5 5.5 10.5 7"/>'),
  hardware:svg('<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>'),
  altri:svg('<circle cx="6" cy="17" r="2.8"/><circle cx="6" cy="7" r="2.8"/><path d="M8.3 8.6 20 18M8.3 15.4 20 6"/>'),
  Fettuccia:svg('<path d="M3 8.5c3-3 6 3 9 0s6 3 9 0"/><path d="M3 15.5c3-3 6 3 9 0s6 3 9 0"/>'),
  Cordino:svg('<path d="M4 20 20 4"/><path d="M6.5 15.5c1.5-2 3-1 4.5-3M9.5 12.5c1.5-2 3-1 4.5-3M12.5 9.5c1.5-2 3-1 4.5-3"/>'),
  "Altri materiali":svg('<circle cx="8" cy="8" r="2.6"/><circle cx="16" cy="8" r="2.6"/><circle cx="8" cy="16" r="2.6"/><circle cx="16" cy="16" r="2.6"/>'),
  dashboard:svg('<path d="M4 20h16"/><path d="M7 16.5v-4M12 16.5V6.5M17 16.5v-7"/>'),
  catalogo:svg('<path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"/>'),
  reorder:svg('<path d="M20 11a8 8 0 0 0-14.9-3.5M4 4v3.5h3.5"/><path d="M4 13a8 8 0 0 0 14.9 3.5M20 20v-3.5h-3.5"/>'),
  tag:svg('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>'),
  Catene:svg('<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>'),
  Bottoni:svg('<circle cx="12" cy="12" r="8"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="10" r="1"/><circle cx="10" cy="14" r="1"/><circle cx="14" cy="14" r="1"/>'),
  Altro:svg('<circle cx="8" cy="8" r="2.6"/><circle cx="16" cy="8" r="2.6"/><circle cx="8" cy="16" r="2.6"/><circle cx="16" cy="16" r="2.6"/>'),
  plus:svg('<path d="M12 5v14M5 12h14"/>'),
  search:svg('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>'),
  close:svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  camera:svg('<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  filter:svg('<path d="M4 6h16M7 12h10M10 18h4"/>'),
  impostazioni:svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  fodere:svg('<path d="M4 4h16v13l-2 2-2-2-2 2-2-2-2 2-2-2-2 2V4z"/><path d="M8 8h8M8 12h5"/>'),
  packaging:svg('<rect x="3.5" y="9" width="17" height="11.5" rx="1.5"/><path d="M3.5 13h17M12 9v11.5"/><path d="M12 9c-1.5-3-5.5-3.5-5.5-1.5S10 9 12 9c2 0 5.5.5 5.5-1.5S13.5 6 12 9z"/>'),
  trash:svg('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
  luxe:svg('<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8z"/><path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>')
};

/* ---------- fields ---------- */
const DISP3=[["In magazzino","ok"],["Esaurito","out"],["In lavorazione","wip"]];
const DISP2=[["In magazzino","ok"],["Esaurito","out"]];
const MAT=[["Fettuccia","sky"],["Cordino","sky"],["Altri materiali","sky"]];
const TIPI={"Fettuccia":["Normale","Luxe"],"Cordino":["Normale","Luxe"],"Altri materiali":["Lana","Cotone","Rafia","Altro"]};
const defTipo=m=>m==="Altri materiali"?"Altro":"Normale";
const tipoLabel=(m,t)=>m==="Altri materiali"?(t==="Altro"?"Altro materiale":t):`${m} ${t==="Luxe"?"Luxe":"normale"}`;
const matLabel=r=>r.materiale||"";
/* colours: write a name, get a swatch */
const PALETTE=[["bianco","#ffffff"],["panna","#f3ead8"],["avorio","#f4ecd9"],["naturale","#dcc8a0"],["beige","#d9c4a5"],["sabbia","#cdb38f"],["cammello","#b8895a"],
  ["caramello","#b06d32"],["cuoio","#8a5a32"],["marrone","#6b4423"],["cioccolato","#4a2c1b"],["tortora","#a39383"],["grigio","#9a9a9a"],["antracite","#3d3d3d"],["nero","#1c1c1c"],
  ["giallo","#f2cf3c"],["senape","#c99a2e"],["ocra","#c4882f"],["arancione","#e8873a"],["pesca","#f2b48f"],["corallo","#ee7b67"],["rosso","#c62f2f"],["bordeaux","#6f1d2b"],
  ["rosa","#f1b7c3"],["cipria","#e9c4bd"],["fucsia","#d13b8a"],["lilla","#c6a6d6"],["viola","#6e3f8f"],["celeste","#bfe0f2"],["azzurro","#8fc1e3"],["blu","#2c4f9e"],
  ["blu notte","#1f2a44"],["turchese","#3bb3b5"],["verde","#3f8f4f"],["salvia","#9fb08e"],["oliva","#7a7a3a"],["menta","#a8dcc1"],
  ["oro","linear-gradient(135deg,#f3dc8f,#b8892f 55%,#f1d98a)"],["argento","linear-gradient(135deg,#f4f4f4,#9c9c9c 55%,#e6e6e6)"],
  ["bronzo","linear-gradient(135deg,#e0a66b,#8a5a2b 55%,#d89a5e)"],["multicolor","conic-gradient(#e8873a,#f2cf3c,#3f8f4f,#2c4f9e,#6e3f8f,#d13b8a,#e8873a)"]];
const ALIAS={crema:"panna",ecru:"naturale",navy:"blu notte","blu navy":"blu notte","verde salvia":"salvia","marrone scuro":"cioccolato","bianco ottico":"bianco",
  multicolore:"multicolor",arancio:"arancione",dorato:"oro",argentato:"argento",glicine:"lilla",nocciola:"cammello",terracotta:"caramello",cognac:"cuoio",
  vinaccia:"bordeaux",lavanda:"lilla",petrolio:"turchese",smeraldo:"verde",kaki:"oliva",cachi:"oliva",grafite:"antracite",perla:"grigio",magenta:"fucsia"};
const PAL=Object.fromEntries(PALETTE);
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g," ").trim();
function colorHex(name){
  const n=norm(name);if(!n)return null;
  if(PAL[n])return PAL[n];if(ALIAS[n])return PAL[ALIAS[n]];
  const keys=[...Object.keys(PAL),...Object.keys(ALIAS)].filter(k=>n.includes(k)).sort((a,b)=>b.length-a.length);
  return keys.length?(PAL[keys[0]]||PAL[ALIAS[keys[0]]]):null;
}
const swHtml=(name,luxe,big)=>{const h=colorHex(name);return `<span class="sw${big?" lg":""}${luxe?" luxe":""}${h?"":" none"}" style="--c:${h||"transparent"}"></span>`;};
const colorHint=v=>!v?"Scrivi il colore (es. beige) oppure toccalo qui sotto.":colorHex(v)?"":"Non conosco questo colore: toccane uno simile qui sotto.";
const UNITA=[["pezzi",""],["metri",""],["grammi",""]];
const HWT=[["Catene",""],["Bottoni",""],["Altro",""]];
const SUBS={
  filati:{key:"materiale",opts:["Fettuccia","Cordino","Altri materiali"],def:"Fettuccia",allTitle:"Tutti i filati",allBtn:"Vedi tutti i filati",prompt:"Scegli il materiale"},
  hardware:{key:"tipo",opts:["Catene","Bottoni","Altro"],def:"Altro",allTitle:"Tutto l'hardware",allBtn:"Vedi tutto l'hardware",prompt:"Scegli il tipo"}};
const UNITA_F=[["metri",""],["pezzi",""],["grammi",""]];
const SCHEMA={
  filati:{name:"Filati",single:"Filato",cols:[{k:"foto",t:"photo"},{k:"nome",l:"Nome",t:"title"},{k:"disp",l:"Disponibilità",t:"select",o:DISP3},{k:"materiale",l:"Materiale",t:"select",o:MAT},
    {k:"acq",l:"Grammi acquistati",t:"stock"},{k:"instock",l:"Grammi in magazzino ora",t:"instock"},{k:"metri",l:"Metri acquistati",t:"metri"},{k:"prezzo",l:"Prezzo pagato",t:"money",h:"Quanto hai speso per i grammi acquistati"},
    {k:"colore",l:"Colore",t:"color"},
    {k:"fornitore",l:"Fornitore",t:"text",ph:"dove lo compri"},{k:"brand",l:"Brand",t:"text",ph:"il marchio del filato"},{k:"link",l:"Link",t:"url"},{k:"note",l:"Note",t:"long"}]},
  hardware:{name:"Hardware metallici",single:"Hardware",cols:[{k:"nome",l:"Nome",t:"title"},{k:"disp",l:"Disponibilità",t:"select",o:DISP2},{k:"tipo",l:"Tipo",t:"select",o:HWT},
    {k:"acq",l:"Pezzi acquistati",t:"stock"},{k:"instock",l:"Pezzi in magazzino ora",t:"instock"},{k:"costo",l:"Costo totale",t:"money",h:"Quanto hai speso per i pezzi acquistati"},
    {k:"fornitore",l:"Fornitore",t:"text"},{k:"link",l:"Link",t:"url"},{k:"note",l:"Note",t:"long"},{k:"foto",t:"photo"}]},
  fodere:{name:"Fodere",single:"Fodera",cols:[{k:"foto",t:"photo"},{k:"nome",l:"Nome",t:"title"},{k:"disp",l:"Disponibilità",t:"select",o:DISP2},
    {k:"colore",l:"Colore",t:"color"},{k:"acq",l:"Metri acquistati",t:"stock"},{k:"instock",l:"Metri in magazzino ora",t:"instock"},{k:"costo",l:"Prezzo",t:"money",h:"Quanto hai speso per i metri acquistati"},
    {k:"fornitore",l:"Fornitore",t:"text"},{k:"link",l:"Link fornitore",t:"url"},{k:"note",l:"Note",t:"long"}]},
  packaging:{name:"Packaging",single:"Packaging",cols:[{k:"foto",t:"photo"},{k:"nome",l:"Nome",t:"title"},{k:"disp",l:"Disponibilità",t:"select",o:DISP2},
    {k:"unita",l:"Unità di misura",t:"select",o:UNITA},{k:"acq",l:"Quantità acquistata",t:"stock"},{k:"instock",l:"In magazzino ora",t:"instock"},{k:"costo",l:"Costo",t:"money",h:"Quanto hai speso per la quantità acquistata"},
    {k:"fornitore",l:"Fornitore",t:"text"},{k:"link",l:"Link fornitore",t:"url"},{k:"note",l:"Note",t:"long"}]},
  altri:{name:"Altri materiali",single:"Materiale",cols:[{k:"nome",l:"Nome",t:"title"},{k:"disp",l:"Disponibilità",t:"select",o:DISP2},
    {k:"unita",l:"Unità di misura",t:"select",o:UNITA},{k:"acq",l:"Quantità acquistata",t:"stock"},{k:"instock",l:"In magazzino ora",t:"instock"},{k:"costo",l:"Costo",t:"money",h:"Quanto hai speso per la quantità acquistata"},
    {k:"colore",l:"Colore",t:"color"},{k:"fornitore",l:"Fornitore",t:"text"},{k:"link",l:"Link fornitore",t:"url"},{k:"note",l:"Note",t:"long"},{k:"foto",t:"photo"}]},
  modelli:{name:"Modelli",single:"Modello",cols:[{k:"fotos",l:"Foto",t:"gallery",max:10},{k:"nome",l:"Nome del modello",t:"title"},
    {k:"uso",l:"Materiali di base",t:"usage"},{k:"misure",l:"Misure",t:"text",ph:"es. 24 × 16 × 8 cm"},{k:"ore",l:"Ore di lavoro",t:"num",u:"h"},{k:"pdf",l:"Istruzioni e disegni",t:"pdf"},{k:"note",l:"Note",t:"long"}]},
  prodotti:{name:"Borse",single:"Borsa",cols:[{k:"fotos",l:"Foto",t:"gallery",max:10},{k:"nome",l:"Nome",t:"title"},{k:"prezzo",l:"Prezzo di vendita",t:"money"},{k:"modello",l:"Forma (modello)",t:"model"},
    {k:"colore",l:"Colore",t:"color"},{k:"misure",l:"Misure",t:"text",ph:"es. 24 × 16 × 8 cm"},{k:"ore",l:"Ore di lavoro",t:"ore"},{k:"uso",l:"Materiali utilizzati",t:"usage"},{k:"note",l:"Note",t:"long"}]},
  progetti:{name:"Progetti",single:"Progetto",cols:[{k:"fotos",l:"Ispirazioni",t:"gallery",max:10},{k:"nome",l:"Nome del progetto",t:"title"},{k:"stato",l:"Stato",t:"select",o:[["Da realizzare","todo"],["In lavorazione","wip"],["Finito","ok"]]},{k:"tipo",l:"Che cosa è",t:"select",o:[["Borsa",""],["Altro",""]]},
    {k:"descrizione",l:"Descrizione",t:"long",ph:"Descrivi il progetto: forma, materiali, colori, idee…"},{k:"note",l:"Note",t:"long"}]},
  ispirazioni:{name:"Ispirazioni",single:"Ispirazione",cols:[{k:"fotos",l:"Immagine",t:"gallery",max:1},{k:"nome",l:"Titolo",t:"title"},{k:"link",l:"Link Pinterest",t:"url"},{k:"note",l:"Note",t:"long"}]},
  ordini:{name:"Ordini",single:"Ordine",cols:[{k:"cliente",l:"Nome cliente",t:"title"},{k:"costo",l:"Costo borsa",t:"money",h:"Il prezzo a cui la vendi"},{k:"data",l:"Data dell'ordine",t:"date"},{k:"prodotto",l:"Borsa",t:"product"}]},
  note:{name:"Note",single:"Nota",cols:[{k:"titolo",l:"Titolo",t:"title"},{k:"testo",l:"Testo",t:"long"}]}
};
/* what sits on top of a detail page, and which sections hide behind buttons */
const G={qty:{id:"qty",t:"Quantità e prezzo"},col:{id:"col",t:"Colore",keys:["colore"]},forn:{id:"forn",t:"Fornitore e brand",keys:["fornitore","brand","link"]},
  note:{id:"note",t:"Note",keys:["note"]},uses:{id:"uses",t:"Usato nelle borse",keys:[]}};
const QTYKEYS={filati:["acq","instock","metri","prezzo"],hardware:["acq","instock","costo"],fodere:["acq","instock","costo"],altri:["unita","acq","instock","costo"],packaging:["unita","acq","instock","costo"]};
/* photo always sits on top of the page; the rest hides behind section buttons */
const LAYOUT={
  filati:{top:["disp","materiale"],groups:[{...G.qty,keys:QTYKEYS.filati},G.col,G.forn,G.uses,G.note]},
  hardware:{top:["disp","tipo"],groups:[{...G.qty,keys:QTYKEYS.hardware},{...G.forn,t:"Fornitore"},G.uses,G.note]},
  fodere:{top:["disp"],groups:[G.col,{...G.qty,t:"Metri e prezzo",keys:QTYKEYS.fodere},{...G.forn,t:"Fornitore"},G.uses,G.note]},
  altri:{top:["disp"],groups:[{...G.qty,keys:QTYKEYS.altri},G.col,{...G.forn,t:"Fornitore"},G.uses,G.note]},
  packaging:{top:["disp"],groups:[{...G.qty,keys:QTYKEYS.packaging},{...G.forn,t:"Fornitore"},G.uses,G.note]},
  daordinare:{top:["coll","materiale","tipo"],groups:[{...G.qty,keys:null},G.col,G.forn,G.note]},
  modelli:{top:[],groups:[{id:"usage",t:"Materiali di base",keys:["uso"]},{id:"misure",t:"Misure e ore",keys:["misure","ore"]},{id:"pdf",t:"Istruzioni (PDF)",keys:["pdf"]},G.note]},
  prodotti:{top:["prezzo"],groups:[{id:"model",t:"Forma (modello)",keys:["modello"]},{id:"col",t:"Colore",keys:["colore"]},{id:"misure",t:"Misure",keys:["misure"]},{id:"ore",t:"Ore di lavoro",keys:["ore"]},{id:"usage",t:"Materiali utilizzati",keys:["uso"]},G.note,{id:"orders",t:"Ordini",keys:[]}]},
  progetti:{top:["stato","tipo","descrizione"],groups:[G.note]},
  ispirazioni:{top:["link","note"],groups:[]},
  ordini:{top:["costo","data"],groups:[{id:"bag",t:"Borsa",keys:["prodotto"]}]}
};

/* dates are stored as yyyy-mm-dd */
function isoOf(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function isoToday(){return isoOf(new Date());}
function isoAgo(months,day){const t=new Date(),d=new Date(t.getFullYear(),t.getMonth()-months,1);d.setDate(months?day:Math.min(day,t.getDate()));return isoOf(d);}
/* ---------- data (starts empty; loaded from this device and from the cloud by sync.js) ---------- */
const DATA={filati:[],hardware:[],fodere:[],altri:[],modelli:[],prodotti:[],ordini:[],cats:[],daordinare:[],note:[],progetti:[],ispirazioni:[]};
const SET={tariffa:"",splash:true,laborOn:true};

/* ---------- state ---------- */
let tab="magazzino",sub=null,mat=null,filter="Tutti",query="",searchOpen=false,sheet=null;
let useTab="filati",picker=false,laborOpen=false,showOut=false,showAdd=false,delArm=false;
let openG=new Set(),oDraft={nome:"",coll:"filati",materiale:"Fettuccia",tipo:"Normale"};
let tipo=null,filtersOpen=false,popCtx=null,F={disp:"",colore:"",fornitore:"",brand:""};
let selMode=false;const selected=new Set();
const resetF=()=>{F={disp:"",colore:"",fornitore:"",brand:""};filtersOpen=false;query="";searchOpen=false;selMode=false;selected.clear();};
const dismissed=new Set();

/* ---------- helpers ---------- */
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const r2=x=>Math.round((x+Number.EPSILON)*100)/100;       /* money: round to the cent */
const r6=x=>Math.round(x*1e6)/1e6;                        /* quantities: kill float dust (0.1+0.2) */
const eur=n=>(n===""||n==null||isNaN(n))?"—":new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR"}).format(n);
const qf=(n,u)=>new Intl.NumberFormat("it-IT",{maximumFractionDigits:2}).format(n)+" "+u;
const pnum=s=>{s=String(s??"").trim().replace(/\s/g,"").replace(",",".");if(s==="")return "";const n=parseFloat(s);return isNaN(n)?"":n;};
const fin=v=>(v===""||v==null)?"":String(v).replace(".",",");
const byId=(coll,id)=>(DATA[coll]||[]).find(x=>x.id===id);
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const initials=s=>(s||"?").split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase()||"?";
const href=u=>/^https?:\/\//.test(u)?u:"https://"+u;
const today=()=>new Date().toLocaleDateString("it-IT",{day:"numeric",month:"short",year:"numeric"});
const plural=(n,a,b)=>`${n} ${n===1?a:b}`;
const short=(s,n)=>s.length>n?s.slice(0,n).trim()+"…":s;
const INV=["filati","hardware","fodere","altri"];
const catName=c=>c==="filati"?"Filati":SCHEMA[c].name;
const inMat=r=>{const S=SUBS[sub];return !S||!mat||mat==="Tutti"||(r[S.key]||S.def)===mat;};

/* stock: left = bought − used in every bag */
const unitOf=(coll,r)=>coll==="filati"?"g":coll==="hardware"?"pz":coll==="fodere"?"m":({pezzi:"pz",metri:"m",grammi:"g"}[r&&r.unita]||"pz");
const paid=(coll,r)=>+(coll==="filati"?r.prezzo:r.costo)||0;
const unitCost=(coll,r)=>(+r.acq>0)?paid(coll,r)/(+r.acq):0;
const priceLbl=(coll,uc,un)=>coll==="filati"?`${eur(uc*100)} ogni 100 g`:`${eur(uc)} / ${un}`;
const unitPrice=(coll,r)=>priceLbl(coll,unitCost(coll,r),unitOf(coll,r));
const usedBy=(coll,id,except)=>r6(DATA.prodotti.filter(p=>p!==except).reduce((a,p)=>a+(p.uso||[]).filter(u=>u.coll===coll&&u.id===id).reduce((b,u)=>b+(+u.qty||0),0),0));
const remaining=(coll,r,except)=>r6((+r.acq||0)-usedBy(coll,r.id,except)+(+r.adj||0));
const hasQty=r=>+r.acq>0||(+r.adj||0)!==0;
const leftTxt=(n,un)=>n<0?`mancano ${qf(-n,un)}`:`${qf(n,un)} rimasti`;
const autoOut=(coll,r)=>INV.includes(coll)&&hasQty(r)&&remaining(coll,r)<=0;
const dispOf=(coll,r)=>autoOut(coll,r)?"Esaurito":r.disp;
const DOT={"In magazzino":"ok","Esaurito":"out","In lavorazione":"wip"};
const stDot=v=>!v?"":v==="Esaurito"?`<span class="pill red">Esaurito</span>`:`<span class="st ${DOT[v]||"ok"}">${esc(v)}</span>`;
const outCount=(c,rows)=>(rows||DATA[c]).filter(r=>dispOf(c,r)==="Esaurito").length;
const usesOf=(coll,r)=>DATA.prodotti.flatMap(p=>(p.uso||[]).filter(u=>u.coll===coll&&u.id===r.id).map(u=>[p,u]));

/* costs: every material line is rounded to the cent, so the lines always add up to the total.
   In a bag the unit price is fixed when the material is added (u.uc): buying more later at another
   price does not change the cost of bags already made. */
const ucOf=u=>{const it=byId(u.coll,u.id);return (u.uc!=null)?u.uc:(it?unitCost(u.coll,it):0);};
const useCost=u=>r2((+u.qty||0)*ucOf(u));
const sumOf=(p,c)=>r2((p&&p.uso||[]).filter(u=>!c||u.coll===c).reduce((a,u)=>a+useCost(u),0));
const labor=p=>(p&&SET.laborOn&&+p.ore>0&&+SET.tariffa>0)?r2((+p.ore)*(+SET.tariffa)):0;
const bagCost=p=>p?r2(sumOf(p)+labor(p)):0;
const gainOf=o=>r2((+o.costo||0)-bagCost(byId("prodotti",o.prodotto)));
const freeze=(coll,id)=>{const it=byId(coll,id),uc=it?unitCost(coll,it):0;return uc>0?uc:undefined;};

/* background image for a photo reference: ready now, or filled in as soon as the photo is loaded */
function bgAttr(ref){const u=MEDIA.url(ref);return u?`style="background-image:url('${u}')"`:ref?`data-mref="${esc(ref)}"`:"";}
function ph(p,size){
  const src=p&&((p.fotos&&p.fotos[0])||p.foto),u=src?MEDIA.url(src):"";
  if(u)return `<span class="ph ${size}" style="background-image:url('${u}')"></span>`;
  return `<span class="ph ${size}"${src?` data-mref="${esc(src)}"`:""} style="--tone:${(p&&p.tone)||"#b09078"}">${esc(initials(p?p.nome:"?"))}</span>`;
}

/* ---------- main views ---------- */
function bigBtn(attrs,icon,title,subHtml,dark){
  return `<button class="bigbtn${dark==="sky"?" skyb2":dark?" dark":""}" ${attrs}><span class="ic">${icon}</span><span class="txt"><span class="t">${title}</span><span class="s">${subHtml}</span></span><span class="chev">›</span></button>`;
}
const outBadge=(o,sky)=>o?`<span class="count${sky?"":" red"}">${o}<span class="lbl"> ${o===1?"esaurito":"esauriti"}</span></span>`:"";
const reorderRows=()=>INV.flatMap(c=>DATA[c].map((r,i)=>[c,r,i]).filter(([,r])=>dispOf(c,r)==="Esaurito"));
const pendingOut=()=>reorderRows().filter(([c,r])=>!DATA.daordinare.some(x=>x.ref===r.id)&&!dismissed.has(c+":"+r.id));
/* background photos of the warehouse tiles (more to come) */
const TILESHORT={hardware:"Hardware",altri:"Altri"};
const TILEIMG={};
function viewStore(){
  const todo=DATA.daordinare.length,pend=pendingOut().length;
  const cnt=[todo?plural(todo,"nella lista","nella lista"):"",pend?pend+" da controllare":""].filter(Boolean).join(" · ")||"Lista vuota";
  const cats=INV.filter(c=>c!=="packaging"),n=cats.length;
  return `<div class="page fit"><div class="fit-head"><h1>Magazzino</h1><button class="addcat" data-newcat aria-label="Nuova categoria" title="Nuova categoria">+</button></div>
    <div class="tiles2${n<=2||(n<=4&&cats.some(c=>TILEIMG[c]))?" one":""}" style="--cols:${Math.min(n,4)}">${cats.map(c=>{const img=TILEIMG[c];return `<button class="tile2${img?" photo":""}" data-sub="${c}"${img?` style="background-image:url('${img}')"`:""}>
      <span class="tt${img?" glass":""}"><span class="t"><span class="full">${esc(SCHEMA[c].name)}</span><span class="short">${esc(TILESHORT[c]||SCHEMA[c].name)}</span></span><span class="s"><span class="n">${plural(DATA[c].length,"articolo","articoli")}</span>${outBadge(outCount(c),true)}</span></span></button>`;}).join("")}</div>
    ${bigBtn(`data-sub="ordinare"`,ICON.reorder,"Ordina di nuovo",cnt,"sky")}
  </div>`;
}
const PLUR={"Fettuccia":"Tutte le fettucce","Cordino":"Tutti i cordini","Altri materiali":"Tutti gli altri materiali"};
const addLbl=c=>({filati:"un filato",hardware:"un hardware",fodere:"una fodera",altri:"un materiale"}[c]||"un articolo");
function viewMaterials(){
  const S=SUBS[sub],all=DATA[sub];
  return `<div class="page"><button class="back" data-back>‹ Magazzino</button><h1>${SCHEMA[sub].name}</h1><p class="meta">${S.prompt}</p>
    <div class="btns three">${S.opts.map(m=>{const rows=all.filter(r=>(r[S.key]||S.def)===m);
      return bigBtn(`data-mat="${esc(m)}"`,ICON[m]||ICON.tag,m,`${plural(rows.length,"articolo","articoli")} ${outBadge(outCount(sub,rows),true)}`,true);}).join("")}</div>
    <button class="textlink" data-mat="Tutti">${S.allBtn} (${all.length}) ›</button>
    <button class="addrow" data-addhere>+ Aggiungi ${addLbl(sub)}</button></div>`;
}
function viewTypes(){
  const rows=DATA.filati.filter(r=>r.materiale===mat);
  return `<div class="page"><button class="back" data-back>‹ Filati</button><h1>${esc(mat)}</h1><p class="meta">Scegli il tipo</p>
    <div class="btns two">${TIPI[mat].map(t=>{const rr=rows.filter(r=>(r.tipo||defTipo(mat))===t);
      return bigBtn(`data-tipo="${t}"`,t==="Luxe"?ICON.luxe:ICON[mat],esc(tipoLabel(mat,t)),`${plural(rr.length,"articolo","articoli")}${t==="Luxe"?" · lurex con glitter":""} ${outBadge(outCount("filati",rr),true)}`,true);}).join("")}</div>
    <button class="textlink" data-tipo="Tutti">${PLUR[mat]} (${rows.length}) ›</button></div>`;
}
function itemRow(coll,r,i){
  const un=unitOf(coll,r),d=dispOf(coll,r);
  const showMat=coll==="filati"&&(!mat||mat==="Tutti");
  const sel=selMode&&selected.has(r.id);
  const open=selMode?`<button class="row${sel?" selected":""}" data-sel="${r.id}" aria-pressed="${sel}"><span class="chk">${sel?"✓":""}</span>`
    :`<div class="swp" data-swp="${coll}:${r.id}"><div class="swp-bg" aria-hidden="true"><span class="swp-del">${ICON.trash}Elimina</span><span class="swp-re">Riordina${ICON.reorder}</span></div><button class="row" data-open="${coll}:${i}">`;
  return `${open}${r.foto?ph(r,"sm"):""}
    <span class="body"><span class="name">${esc(r.nome)||"Senza nome"}</span>
      <span class="sub">${d!=="In magazzino"?stDot(d):""}${hasQty(r)?`<span>${leftTxt(remaining(coll,r),un)}</span>`:""}${r.colore?`<span class="colopt">${swHtml(r.colore,!!r.lurex)}${esc(r.colore)}${r.lurex?" lurex":""}</span>`:""}${showMat&&r.materiale?`<span class="pill sky">${esc(matLabel(r))}</span>`:""}${coll==="hardware"&&(!mat||mat==="Tutti")?`<span class="pill">${esc(r.tipo||"Altro")}</span>`:""}</span></span>
    <span class="price">${eur(paid(coll,r)||"")}</span>${selMode?"":`<span class="chev">›</span>`}</button>${selMode?"":"</div>"}`;
}
const FVAL={disp:r=>dispOf(sub,r),colore:r=>norm(r.colore),fornitore:r=>r.fornitore||"",brand:r=>r.brand||""};
function catRows(){
  const qn=norm(query);
  return DATA[sub].map((r,i)=>[r,i]).filter(([r])=>inMat(r)&&Object.entries(F).every(([k,v])=>!v||FVAL[k](r)===v)&&
    (!qn||norm([r.nome,r.brand,r.fornitore,r.colore,r.note,matLabel(r)].join(" ")).includes(qn)));
}
function filterPanel(base){
  const opts=SCHEMA[sub].cols.find(c=>c.k==="disp").o.map(o=>o[0]);
  const uniq=f=>[...new Set(base.map(f).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"it"));
  const sec=(k,l,vals,lab)=>vals.length?`<div class="field"><span class="flabel">${l}</span><div class="opts">${vals.map(v=>`<button class="opt${k==="colore"?" colopt":""}" data-f="${k}" data-v="${esc(v)}" aria-pressed="${F[k]===v}">${lab?lab(v):esc(v)}</button>`).join("")}</div></div>`:"";
  const n=catRows().length;
  return `<div class="box fpanel">${sec("disp","Disponibilità",opts)}${SCHEMA[sub].cols.some(c=>c.k==="colore")?sec("colore","Colore",uniq(r=>norm(r.colore)),v=>swHtml(v)+esc(v)):""}${sub==="filati"?sec("brand","Brand",uniq(r=>r.brand)):""}${sec("fornitore","Fornitore",uniq(r=>r.fornitore))}
    <div class="btnrow"><button class="btn" data-fdone>Mostra ${plural(n,"risultato","risultati")}</button>${Object.values(F).some(Boolean)?`<button class="btn ghost" data-freset>Azzera filtri</button>`:""}</div></div>`;
}
const activePills=()=>Object.entries(F).filter(([,v])=>v).map(([k,v])=>`<button class="pill fpill" data-fclear="${k}" aria-label="Togli filtro ${esc(v)}">${k==="colore"?swHtml(v):""}${esc(v)} ×</button>`).join("");
function renderCatList(){
  const rows=catRows();
  $("list").innerHTML=rows.length?rows.map(([r,i])=>itemRow(sub,r,i)).join(""):`<div class="empty">${query?"Nessun risultato per “"+esc(query)+"”.":"Nessun articolo. Tocca «Aggiungi» qui sotto."}</div>`;
}
function viewCategory(){
  const s=SCHEMA[sub],base=DATA[sub].filter(inMat),o=outCount(sub,base),nF=Object.values(F).filter(Boolean).length;
  const inner=SUBS[sub]&&mat;
  const title=!inner?s.name:mat==="Tutti"?SUBS[sub].allTitle:mat;
  const back=!inner?"Magazzino":s.name;
  return `<div class="page"><button class="back" data-back>‹ ${esc(back)}</button><h1>${esc(title)}</h1>
    <div class="meta-row"><p class="meta"><b>${base.length}</b> ${base.length===1?"articolo":"articoli"}${o?` · <b>${o}</b> ${o===1?"esaurito":"esauriti"}`:""}</p>
      <button class="tool${nF||filtersOpen?" on":""}" id="flt-btn" aria-expanded="${filtersOpen}">${ICON.filter}<span>Filtri${nF?" · "+nF:""}</span></button>
      <button class="tool${selMode?" on":""}" id="sel-btn">${selMode?"Fine":"Seleziona"}</button>
      <div class="search${searchOpen?" open":""}"><input id="q" placeholder="Cerca per nome…" value="${esc(query)}" aria-label="Cerca" tabindex="${searchOpen?0:-1}">
        <button class="search-btn" id="search-btn" aria-label="${searchOpen?"Chiudi ricerca":"Cerca"}">${searchOpen?ICON.close:ICON.search}</button></div></div>
    ${filtersOpen?filterPanel(base):nF?`<div class="opts" style="margin-bottom:12px">${activePills()}</div>`:""}
    ${!selMode&&base.length?`<p class="hint" style="margin:-2px 0 10px">Scorri una riga verso destra per eliminarla, verso sinistra per riordinarla.</p>`:""}
    <div class="list two" id="list"></div>
    ${selMode?"":`<button class="addrow" data-addhere>+ Aggiungi ${addLbl(sub)}</button>`}
    ${selMode?selBar():""}
    ${isCustom(sub)&&!selMode?`<button class="textlink" data-catedit>Rinomina o elimina la categoria</button>`:""}</div>`;
}
function selBar(){
  const n=selected.size,ids=catRows().map(([r])=>r.id),all=ids.length&&ids.every(id=>selected.has(id));
  return `<div class="selbar"><span class="selc">${n?plural(n,"selezionato","selezionati"):"Tocca le righe da scegliere"}</span><button class="linkbtn" data-selall>${all?"Nessuno":"Seleziona tutti"}</button>
    <span class="selbtns"><button class="btn skyb" data-selre ${n?"":"disabled"}>Riordina</button><button class="btn redb" data-seldel ${n?"":"disabled"}>Elimina</button></span></div>`;
}
function orow(x,i){
  const pp=paid(x.coll,x);
  const info=[+x.acq>0?qf(x.acq,unitOf(x.coll,x)):"",pp?eur(pp):""].filter(Boolean).join(" · ");
  return `<div class="orow"><button class="ocheck" data-ocheck="${i}" aria-label="Arrivato: sposta ${esc(x.nome)} in magazzino"><span class="dot"></span><span>Arrivato</span></button>
    <button class="body" data-open="daordinare:${i}"><span class="name">${esc(x.nome)||"Senza nome"}</span>
      <span class="sub"><span class="pill">${catName(x.coll)}</span>${x.coll==="filati"&&x.materiale?`<span class="pill sky">${esc(matLabel(x))}</span>`:""}${x.ref?'<span class="pill">Riordino</span>':""}<span>${info?esc(info):"Tocca per compilare"}</span></span></button>
    <button class="x" data-orem="${i}" aria-label="Togli dalla lista">×</button></div>`;
}
function viewToOrder(){
  const L=DATA.daordinare,pend=pendingOut();
  const CATS=INV.map(k=>[k,catName(k)]);
  return `<div class="page"><button class="back" data-back>‹ Magazzino</button><h1>Ordina di nuovo</h1>
    <p class="meta">Quando arriva tocca il pallino: lo sposto in magazzino.</p>
    ${L.length?`<div class="olist">${L.map((x,i)=>orow(x,i)).join("")}</div>`:`<div class="empty">La lista è vuota.</div>`}
    <button class="fold" data-fold="add" aria-expanded="${showAdd}"><span class="l">+ Aggiungi</span><span class="chev">›</span></button>
    ${showAdd?`<div class="foldbody"><div class="box">
      <div class="field"><label class="flabel" for="o-nome">Cosa devi ordinare?</label><input class="inp" id="o-nome" value="${esc(oDraft.nome)}" placeholder="es. Catena oro 100 cm" autocomplete="off"></div>
      <div class="opts">${CATS.map(([k,l])=>`<button class="opt" data-ocat="${k}" aria-pressed="${oDraft.coll===k}">${l}</button>`).join("")}</div>
      ${oDraft.coll==="filati"?`<div class="matseg">${MAT.map(([m])=>`<button class="matb" data-omat="${esc(m)}" aria-pressed="${oDraft.materiale===m}"><span class="mi">${ICON[m]||ICON.tag}</span><span>${esc(m)}</span></button>`).join("")}</div>`:""}
      <div class="btnrow"><button class="btn" data-oadd>Aggiungi alla lista</button><button class="btn ghost" data-oadd="full">Aggiungi e compila la scheda</button></div>
    </div></div>`:""}
    <button class="fold" data-fold="out" aria-expanded="${showOut}"><span class="l">Esauriti da controllare</span>${pend.length?`<span class="count red">${pend.length}</span>`:`<span class="meta" style="margin:0">nessuno</span>`}<span class="chev">›</span></button>
    ${showOut?`<div class="foldbody">${pend.length?pend.map(([c,r,i])=>`<div class="box"><div><button class="name" style="font-weight:600;font-size:15.5px" data-open="${c}:${i}">${esc(r.nome)} ›</button>
        <p class="hint">${catName(c)}${r.materiale?" · "+esc(matLabel(r)):""}${r.fornitore?" · "+esc(r.fornitore):""}</p></div>
        <div class="btnrow"><button class="btn" data-oyes="${c}:${r.id}">Aggiungi alla lista</button><button class="btn ghost" data-ono="${c}:${r.id}">Non serve</button></div></div>`).join(""):`<p class="hint">Niente da controllare.</p>`}
      ${dismissed.size?`<button class="textlink" data-oreset>Mostra di nuovo quelli nascosti (${dismissed.size})</button>`:""}</div>`:""}
  </div>`;
}
function viewOrders(){
  const O=DATA.ordini,inc=r2(O.reduce((a,o)=>a+(+o.costo||0),0)),sp=r2(O.reduce((a,o)=>a+bagCost(byId("prodotti",o.prodotto)),0)),g=r2(inc-sp);
  return `<div class="page"><h1>Ordini</h1><p class="meta"><b>${O.length}</b> ordini</p>
    <div class="stats"><div class="stat"><span class="stat-l">Incassato</span><span class="stat-v${lng(inc)}">${eur(inc)}</span></div>
      <div class="stat"><span class="stat-l">Spesa</span><span class="stat-v${lng(sp)}">${eur(sp)}</span></div>
      <div class="stat"><span class="stat-l">Guadagno</span><span class="stat-v ${g<0?"loss":"gain"}${lng(g)}">${eur(g)}</span></div></div>
    <div class="list two">${O.length?O.map((o,i)=>{const p=byId("prodotti",o.prodotto),v=gainOf(o);
      return `<button class="row" data-open="ordini:${i}">${ph(p,"sm")}<span class="body"><span class="name">${esc(o.cliente)||"Nuovo cliente"}</span><span class="sub">${p?esc(p.nome):"Borsa da scegliere"}${o.data?" · "+dshort(o.data):""}</span></span>
        <span class="right"><span class="price">${eur(o.costo)}</span><span class="small-gain ${v<0?"loss":"gain"}">${v<0?"":"+"}${eur(v)}</span></span></button>`;}).join(""):`<div class="empty">Nessun ordine. Tocca + per aggiungerne uno.</div>`}</div></div>`;
}
/* custom warehouse categories created with "+ Nuova categoria" */
function makeCat(id,name){
  SCHEMA[id]={name,single:name,cols:[{k:"foto",t:"photo"},{k:"nome",l:"Nome",t:"title"},{k:"disp",l:"Disponibilità",t:"select",o:DISP2},
    {k:"unita",l:"Unità di misura",t:"select",o:UNITA},{k:"acq",l:"Quantità acquistata",t:"stock"},{k:"instock",l:"In magazzino ora",t:"instock"},{k:"costo",l:"Costo",t:"money",h:"Quanto hai speso per la quantità acquistata"},
    {k:"colore",l:"Colore",t:"color"},{k:"fornitore",l:"Fornitore",t:"text"},{k:"link",l:"Link fornitore",t:"url"},{k:"note",l:"Note",t:"long"}]};
  QTYKEYS[id]=["unita","acq","instock","costo"];
  LAYOUT[id]={top:["disp"],groups:[{...G.qty,keys:QTYKEYS[id]},G.col,{...G.forn,t:"Fornitore"},G.uses,G.note]};
  if(!DATA[id])DATA[id]=[];
  if(!INV.includes(id))INV.push(id);
}
const isCustom=c=>/^c_/.test(c||"");
function popCatForm(id){
  popCtx={cat:id||null};
  $("pop").innerHTML=`<div class="pop-card" role="dialog" aria-label="${id?"Modifica categoria":"Nuova categoria"}"><p class="pop-t">${id?"Modifica categoria":"Nuova categoria"}</p>
    <div class="field"><label class="flabel" for="nc-name">Nome</label><input class="inp" id="nc-name" value="${id?esc(SCHEMA[id].name):""}" placeholder="es. Manici, Bottoni, Perline" autocomplete="off"></div>
    ${id?"":`<p class="pop-p">Ogni articolo avrà foto, quantità, prezzo, colore, fornitore e note, come gli altri materiali.</p>`}
    <button class="pop-opt go" data-savecat>${id?"Salva":"Crea categoria"}</button>
    ${id?`<button class="pop-opt danger" data-delcat>Elimina categoria</button>`:""}
    <button class="pop-cancel" data-popclose>Annulla</button></div>`;
  $("pop").hidden=false;setTimeout(()=>{const i=$("nc-name");if(i)i.focus();},60);
}
function saveCat(){
  const i=$("nc-name"),name=(i&&i.value||"").trim(),id=popCtx&&popCtx.cat;
  if(!name){if(i){i.placeholder="Scrivi prima il nome";i.focus();}return;}
  $("pop").hidden=true;popCtx=null;
  if(id){SCHEMA[id].name=SCHEMA[id].single=name;const c=DATA.cats.find(x=>x.id===id);if(c)c.name=name;renderMain();return;}
  const nid="c_"+Date.now().toString(36);DATA.cats.push({id:nid,name});makeCat(nid,name);go("magazzino",nid);
}
function deleteCat(id){
  const n=(DATA[id]||[]).length,name=SCHEMA[id].name;
  popConfirm(`Eliminare «${name}»?`,n?`Verranno eliminati anche i suoi ${plural(n,"articolo","articoli")}. Le borse che li usano mantengono la loro spesa.`:"La categoria è vuota.","Elimina categoria",()=>{
    delete DATA[id];INV.splice(INV.indexOf(id),1);DATA.cats=DATA.cats.filter(c=>c.id!==id);
    DATA.daordinare=DATA.daordinare.filter(x=>x.coll!==id);go("magazzino");toast(`Categoria «${name}» eliminata`);});
}
let catSeg="borse";
const SEGS=[["borse","Ordini"],["modelli","Modelli"],["progetti","Progetti"]];
const SEGCOLL={modelli:"modelli",borse:"prodotti",progetti:"progetti",ispirazioni:"ispirazioni"};
function viewCatalogo(){
  const L=DATA[SEGCOLL[catSeg]];let body;
  if(catSeg==="modelli")body=`<p class="meta">Tocca un modello per vederlo o per creare una borsa</p>
    ${L.length?"":`<div class="empty">Nessun modello. Tocca + per aggiungere il primo.</div>`}<div class="grid small">${L.map((m,i)=>`<button class="card" data-open="modelli:${i}">${ph(m,"lg")}<span class="cname">${esc(m.nome)||"Senza nome"}</span><span class="csub">Spesa ${eur(bagCost(m))}</span></button>`).join("")}</div>`;
  else if(catSeg==="borse")body=`<p class="meta">Le borse fatte per gli ordini, da vendere: ognuna un pezzo unico</p>
    ${L.length?"":`<div class="empty">Nessuna borsa. Tocca + per aggiungerne una, oppure parti da un modello.</div>`}<div class="grid">${L.map((p,i)=>{const o=DATA.ordini.find(x=>x.prodotto===p.id);
      return `<button class="card" data-open="prodotti:${i}">${ph(p,"lg")}<span class="cname">${esc(p.nome)||"Senza nome"}</span><span class="csub">${eur(p.prezzo)}${o?" · "+esc(o.cliente):""}</span></button>`;}).join("")}</div>`;
  else if(catSeg==="progetti")body=`<p class="meta">Le idee per le prossime borse. Ne inizi uno con il pulsante al centro, in basso.</p>
    ${L.length?`<div class="grid">${L.map((p,i)=>`<button class="card" data-open="progetti:${i}">${ph(p,"lg")}<span class="cname">${esc(p.nome)||"Senza nome"}</span><span class="csub">${ptag(p.stato)}</span></button>`).join("")}</div>`:`<div class="empty">Nessun progetto. Tocca «Nuovo progetto» in basso.</div>`}`;
  else body=`<p class="meta">Le immagini prese da Pinterest. Su Pinterest tieni premuto su un'immagine e scegli «Salva immagine», poi qui tocca + e prendila dalla galleria.</p>
    ${L.length?`<div class="insp">${L.map((x,i)=>`<button class="insp-it" data-open="ispirazioni:${i}" aria-label="${esc(x.nome||"Ispirazione")}" ${bgAttr(x.fotos&&x.fotos[0])}></button>`).join("")}</div>`:`<div class="empty">Nessuna immagine. Tocca + per aggiungerne una.</div>`}`;
  if(catSeg==="ispirazioni")return `<div class="page"><button class="back" data-seg="borse">‹ Catalogo</button><h1>Ispirazioni</h1>${body}</div>`;
  return `<div class="page"><div class="fit-head"><h1>Catalogo</h1><button class="inspbtn" data-seg="ispirazioni">✦ Ispirazioni</button></div>
    <div class="segc three" role="group" aria-label="Cosa vedere">${SEGS.map(([k,l])=>`<button class="segb" data-seg="${k}" aria-pressed="${catSeg===k}">${l} <span>${DATA[SEGCOLL[k]].length}</span></button>`).join("")}</div>
    ${body}</div>`;
}
function viewSettings(){
  return `<div class="page"><h1>Impostazioni</h1>
    <h2 style="margin-top:14px">Costo di realizzazione</h2>
    <div class="groups">
      <div class="setrow"><span class="setl"><b>Tariffa oraria</b><small>Quanto vale un'ora del tuo lavoro</small></span>
        <div class="affix pre" style="width:120px;flex:none"><input class="inp" id="set-tariffa" type="text" inputmode="decimal" value="${fin(SET.tariffa)}" placeholder="0,00" aria-label="Tariffa oraria"></div></div>
      <label class="setrow switch"><span class="setl"><b>Aggiungi il lavoro al costo</b><small>Ore di lavoro della borsa × tariffa oraria</small></span><input type="checkbox" id="set-labor" ${SET.laborOn?"checked":""}></label>
    </div>
    <p class="hint" style="margin-top:8px">Il costo del lavoro si aggiunge alla spesa di ogni borsa in cui scrivi le ore.</p>
    ${syncBox()}
  </div>`;
}
function viewNotes(){
  return `<div class="page"><h1>Note</h1><p class="meta"><b>${DATA.note.length}</b> note</p>
    <div class="notes">${DATA.note.length?DATA.note.map((n,i)=>`<button class="note" data-open="note:${i}"><span class="note-title">${esc(n.titolo)||"Senza titolo"}</span>
      <span class="note-text">${esc(n.testo)}</span><span class="note-date">${esc(n.data)}</span></button>`).join(""):`<div class="empty">Nessuna nota. Tocca + per scriverne una.</div>`}</div></div>`;
}
/* ---------- dashboard ---------- */
const PST=[["Finito","ok","Finiti"],["In lavorazione","wip","In lavorazione"],["Da realizzare","todo","Da realizzare"]];
const pstOf=p=>PST.find(x=>x[0]===p.stato)||PST[2];
const ptag=v=>{const x=PST.find(z=>z[0]===v)||PST[2];return `<span class="ptag ${x[1]}">${x[0]}</span>`;};
function projBox(){
  const P=DATA.progetti,n=P.length,c=PST.map(([v,k,l])=>[k,l,P.filter(p=>pstOf(p)[0]===v).length]);
  return `<section class="vcard pcard" aria-labelledby="vh0"><div class="pc-head"><h2 id="vh0">Progetti</h2><button class="textlink" data-goproj>Vedi tutti ›</button></div>
    <div class="pstats"><div class="ps tot"><span class="pn">${n}</span><span class="pl">Totali</span></div>
      ${c.map(([k,l,v])=>`<div class="ps" data-ps="${k}"><span class="pn">${v}</span><span class="pl"><i class="d-${k}"></i>${l}</span></div>`).join("")}</div>
    ${n?`<div class="pbar" role="img" aria-label="${c.map(([,l,v])=>v+" "+l.toLowerCase()).join(", ")}">${c.filter(x=>x[2]).map(([k,,v])=>`<span class="d-${k}" style="flex:${v}"></span>`).join("")}</div>`:""}</section>`;
}
let statPer="6m",statTable=false,statPick=null,STAT=null;
const MESI=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];
const MESIL=["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
const dshort=s=>{const m=/^(\d{4})-(\d\d)-(\d\d)$/.exec(s||"");return m?`${+m[3]} ${MESI[+m[2]-1]}`:"";};
const mIndex=s=>{const m=/^(\d{4})-(\d\d)/.exec(s||"");if(!m){const t=new Date();return t.getFullYear()*12+t.getMonth();}return (+m[1])*12+(+m[2]-1);};
const PIE=[["gain","Guadagno"],["filati","Filati"],["hardware","Hardware"],["fodere","Fodere"],["altri","Altri materiali"],["lavoro","Lavoro"]];
function statData(){
  const t=new Date(),cur=t.getFullYear()*12+t.getMonth(),idx=DATA.ordini.map(o=>mIndex(o.data));
  let a,b=cur;
  if(statPer==="6m")a=cur-5;else if(statPer==="anno")a=t.getFullYear()*12;
  else{a=idx.length?Math.min(cur,...idx):cur-5;b=idx.length?Math.max(cur,...idx):cur;if(b-a<2)a=b-2;}
  const months=[];for(let k=a;k<=b;k++)months.push({k,y:Math.floor(k/12),m:k%12,inc:0,sp:0,g:0,n:0});
  const split={filati:0,hardware:0,fodere:0,altri:0,lavoro:0};
  DATA.ordini.forEach((o,j)=>{const x=months[idx[j]-a];if(!x)return;
    const p=byId("prodotti",o.prodotto),sp=bagCost(p);
    x.inc=r2(x.inc+(+o.costo||0));x.sp=r2(x.sp+sp);x.g=r2(x.inc-x.sp);x.n++;
    if(p){let mat=sumOf(p);["filati","hardware","fodere"].forEach(k=>{const v=sumOf(p,k);split[k]=r2(split[k]+v);mat=r2(mat-v);});
      split.altri=r2(split.altri+mat);split.lavoro=r2(split.lavoro+labor(p));}});
  const inc=r2(months.reduce((s,x)=>s+x.inc,0)),sp=r2(months.reduce((s,x)=>s+x.sp,0));
  return {months,inc,sp,g:r2(inc-sp),n:months.reduce((s,x)=>s+x.n,0),split};
}
function pieParts(S){
  const parts=PIE.filter(([k])=>k!=="gain").map(([k,l])=>({k,l,v:S.split[k]})).filter(x=>x.v>0);
  if(S.g>0)parts.unshift({k:"gain",l:"Guadagno",v:S.g});
  return parts;
}
const lng=v=>Math.abs(v)>=1000?" long":"";
const pct=(v,t)=>{const p=v/t*100;return p>0&&p<1?"<1%":Math.round(p)+"%";};
function viewStats(){
  const S=STAT=statData();
  const per=[["6m","6 mesi"],["anno","Quest'anno"],["tutto","Sempre"]];
  let h=`<div class="page viz"><h1>Dashboard</h1>${projBox()}
    <div class="segc three" role="group" aria-label="Periodo">${per.map(([k,l])=>`<button class="segb" data-per="${k}" aria-pressed="${statPer===k}">${l}</button>`).join("")}</div>`;
  if(!S.n)return h+`<div class="empty">Nessun ordine in questo periodo.</div></div>`;
  const parts=pieParts(S),tot=r2(parts.reduce((s,x)=>s+x.v,0)),oneY=S.months[0].y===S.months[S.months.length-1].y;
  h+=`<div class="stats"><div class="stat"><span class="stat-l">Incassato</span><span class="stat-v${lng(S.inc)}">${eur(S.inc)}</span></div>
      <div class="stat"><span class="stat-l">Spesa</span><span class="stat-v${lng(S.sp)}">${eur(S.sp)}</span></div>
      <div class="stat"><span class="stat-l">Guadagno</span><span class="stat-v ${S.g<0?"loss":"gain"}${lng(S.g)}">${eur(S.g)}</span></div></div>
    <p class="meta"><b>${S.n}</b> ${S.n===1?"borsa venduta":"borse vendute"} · in media <b>${eur(r2(S.g/S.n))}</b> di guadagno a borsa</p>
    <section class="vcard" aria-labelledby="vh1"><h2 id="vh1">Mese per mese</h2><p class="vsub">Quanto hai guadagnato e quanto hai speso ogni mese. Tocca un mese per vedere i numeri.</p>
      <div class="legend"><span><i class="b-gain"></i>Guadagno</span><span><i class="b-spend"></i>Spesa</span></div>
      <div class="chart" id="ch-months"></div><div class="vtip" id="vtip" hidden></div>
      <button class="textlink" data-stattable aria-expanded="${statTable}">${statTable?"Nascondi la tabella":"Mostra la tabella mese per mese"}</button>
      ${statTable?`<div class="mscroll"><table class="mtable"><thead><tr><th>${oneY?S.months[0].y:"Mese"}</th><th>Incassato</th><th>Spesa</th><th>Guadagno</th></tr></thead><tbody>${S.months.map(x=>`<tr><td>${oneY?MESI[x.m]:MESI[x.m]+" "+String(x.y).slice(2)}</td>${[x.inc,x.sp,x.g].map(v=>x.n?`<td>${eur(v)}</td>`:`<td class="z">—</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:""}
    </section>
    <section class="vcard" aria-labelledby="vh2"><h2 id="vh2">${S.g>0?"Dove vanno i soldi":"Dove vanno le spese"}</h2>
      <p class="vsub">${!parts.length?"Scrivi il prezzo degli ordini e scegli la borsa per vedere come si divide l'incassato.":S.g>0?`Come si divide quello che hai incassato (${eur(S.inc)})`:"In questo periodo le spese superano l'incassato"}</p>
      <div class="donut-wrap"${parts.length?"":" hidden"}><div class="chart donut" id="ch-pie"></div>
        <ul class="dleg">${parts.map(x=>`<li><button data-pk="${x.k}" aria-pressed="false"><i class="b-${x.k}"></i><span>${x.l}</span><span class="dv">${eur(x.v)}</span><span class="dp">${pct(x.v,tot)}</span></button></li>`).join("")}</ul></div>
    </section></div>`;
  return h;
}
function paintCharts(){if(!STAT||!STAT.n)return;paintMonths();paintPie();}
/* a bar: 4px rounded at the value end, square on the baseline */
function barPath(x,w,y0,y1){
  const h=Math.abs(y1-y0);if(h<.5)return "";
  const r=Math.min(4,w/2,h),up=y1<y0,e=y1,s=up?1:-1;
  return `M${x},${y0}V${e+s*r}Q${x},${e} ${x+r},${e}H${x+w-r}Q${x+w},${e} ${x+w},${e+s*r}V${y0}Z`;
}
const niceStep=raw=>{const p=Math.pow(10,Math.floor(Math.log10(raw||1))),f=raw/p;return (f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*p;};
const tickTxt=v=>v===0?"0":new Intl.NumberFormat("it-IT",{maximumFractionDigits:0}).format(v)+" €";
function paintMonths(){
  const el=$("ch-months");if(!el)return;const S=STAT,M=S.months;
  const W=Math.max(220,Math.floor(el.clientWidth)),H=210,padL=46,padR=4,padT=22,padB=26,pw=W-padL-padR,ph=H-padT-padB;
  let hi=Math.max(0,...M.map(x=>Math.max(x.g,x.sp))),lo=Math.min(0,...M.map(x=>Math.min(x.g,x.sp)));
  const st=niceStep((hi-lo)/4||10);hi=Math.ceil(hi/st)*st||st;lo=Math.floor(lo/st)*st;
  const y=v=>padT+ph*(hi-v)/(hi-lo),band=pw/M.length,bw=Math.max(3,Math.min(22,(band-8)/2)),gap=2,y0=y(0);
  const every=band<26?2:1;
  let s=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Guadagno e spesa mese per mese">`;
  for(let v=lo;v<=hi+1e-9;v+=st)s+=`<line class="grid" x1="${padL}" x2="${W-padR}" y1="${y(v)}" y2="${y(v)}"/><text class="yl" x="${padL-8}" y="${y(v)+3.5}">${tickTxt(v)}</text>`;
  M.forEach((x,i)=>{s+=`<rect class="hit" data-mi="${i}" tabindex="0" aria-label="${MESIL[x.m]} ${x.y}: guadagno ${eur(x.g)}, spesa ${eur(x.sp)}" x="${padL+band*i}" y="${padT-14}" width="${band}" height="${ph+14}" rx="8"/>`;});
  s+=`<line class="base" x1="${padL}" x2="${W-padR}" y1="${y0}" y2="${y0}"/>`;
  let best=-1;M.forEach((x,i)=>{if(x.n&&(best<0||x.g>M[best].g))best=i;});
  M.forEach((x,i)=>{const cx=padL+band*i+band/2;
    if(x.n){const a=barPath(cx-gap/2-bw,bw,y0,y(x.g)),b=barPath(cx+gap/2,bw,y0,y(x.sp));
      if(a)s+=`<path class="bar f-gain" d="${a}"/>`;if(b)s+=`<path class="bar f-spend" d="${b}"/>`;}
    if((M.length-1-i)%every===0)s+=`<text class="xl" x="${cx}" y="${H-8}">${MESI[x.m]}${x.m===0&&M.length>12?" "+String(x.y).slice(2):""}</text>`;});
  if(best>=0&&M[best].g>0&&band>=34){const cx=padL+band*best+band/2-gap/2-bw/2;s+=`<text class="dl" x="${cx}" y="${y(M[best].g)-6}">${tickTxt(Math.round(M[best].g))}</text>`;}
  el.innerHTML=s+"</svg>";
  const tip=$("vtip"),card=el.closest(".vcard");
  const show=i=>{const x=M[i];el.querySelectorAll(".hit").forEach(r=>r.classList.toggle("on",+r.dataset.mi===i));
    tip.innerHTML=`<div class="th">${MESIL[x.m]} ${x.y}</div>${x.n?`<div class="tr"><i class="k b-gain"></i><b>${eur(x.g)}</b><span>guadagno</span></div><div class="tr"><i class="k b-spend"></i><b>${eur(x.sp)}</b><span>spesa</span></div><div class="tr"><i class="k none"></i><b>${eur(x.inc)}</b><span>incassato · ${plural(x.n,"borsa","borse")}</span></div>`:`<div class="tr"><span>Nessun ordine</span></div>`}`;
    tip.hidden=false;const cr=card.getBoundingClientRect(),er=el.getBoundingClientRect(),tw=tip.offsetWidth;
    let cx=er.left-cr.left+padL+band*i+band/2;cx=Math.max(tw/2+6,Math.min(cr.width-tw/2-6,cx));
    tip.style.left=cx+"px";tip.style.top=(er.top-cr.top-tip.offsetHeight-6)+"px";};
  const hide=()=>{tip.hidden=true;el.querySelectorAll(".hit.on").forEach(r=>r.classList.remove("on"));};
  const at=e=>{const h=e.target.closest&&e.target.closest("[data-mi]");if(h)show(+h.dataset.mi);};
  el.onpointerdown=at;el.onpointermove=e=>{if(e.pointerType==="mouse"||e.buttons)at(e);};
  el.onpointerleave=e=>{if(e.pointerType==="mouse")hide();};
  el.querySelectorAll(".hit").forEach(r=>{r.onfocus=()=>show(+r.dataset.mi);r.onblur=hide;});
  card.onpointerdown=e=>{if(!e.target.closest("#ch-months"))hide();};
}
function paintPie(){
  const el=$("ch-pie");if(!el||!STAT)return;
  const parts=pieParts(STAT),tot=parts.reduce((s,x)=>s+x.v,0),C=88,R=86,r0=56;
  if(!parts.length||!(tot>0)){el.innerHTML="";return;}
  const sel=parts.find(x=>x.k===statPick)||parts[0];
  let a=-Math.PI/2,s=`<svg viewBox="0 0 176 176" role="img" aria-label="${STAT.g>0?"Come si divide l'incassato":"Come si dividono le spese"}">`;
  const pt=(ang,rad)=>[C+rad*Math.cos(ang),C+rad*Math.sin(ang)];
  parts.forEach(x=>{const sw=x.v/tot*Math.PI*2,b=a+Math.min(sw,Math.PI*2-1e-4),lg=sw>Math.PI?1:0;
    const [x1,y1]=pt(a,R),[x2,y2]=pt(b,R),[x3,y3]=pt(b,r0),[x4,y4]=pt(a,r0);
    s+=`<path class="pseg f-${x.k}${statPick&&statPick!==x.k?" dim":""}" data-pk="${x.k}" tabindex="0" aria-label="${x.l}: ${eur(x.v)}, ${pct(x.v,tot)}" d="M${x1},${y1}A${R},${R} 0 ${lg} 1 ${x2},${y2}L${x3},${y3}A${r0},${r0} 0 ${lg} 0 ${x4},${y4}Z"/>`;a+=sw;});
  s+=`<text class="c1" x="${C}" y="${C-14}">${sel.l.length>12?sel.l.split(" ")[0]:sel.l}</text><text class="c2" x="${C}" y="${C+13}">${pct(sel.v,tot)}</text><text class="c3" x="${C}" y="${C+31}">${eur(sel.v)}</text></svg>`;
  el.innerHTML=s;
  document.querySelectorAll(".dleg [data-pk]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.pk===statPick));
  el.querySelectorAll(".pseg").forEach(p=>p.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();statPick=statPick===p.dataset.pk?null:p.dataset.pk;paintPie();}});
}
/* bottom bar: icons only. The bar has a round notch under the raised "+" and one under the section you are in;
   on a tap the brown circle (with its notch) glides to the new icon and takes that icon inside. */
const BAR={f:8,cy:-2};let indX=null,indRaf=0,indMoving=false,indTab=null;
const clamp01=v=>Math.max(0,Math.min(1,v));
function drawBar(xs){
  const nav=$("tabbar"),W=nav.clientWidth,H=nav.clientHeight,{f,cy}=BAR,R=$("indc").offsetWidth/2+6;
  const dx=Math.sqrt((R+f)*(R+f)-(f-cy)*(f-cy)),tx=R*dx/(R+f);let w="",fl="",h="";
  xs.forEach(x=>{if(x==null)return;
    w+=`<rect x="${x-dx}" y="-2" width="${dx-tx}" height="${f+2}"/><rect x="${x+tx}" y="-2" width="${dx-tx}" height="${f+2}"/>`;
    fl+=`<circle cx="${x-dx}" cy="${f}" r="${f}"/><circle cx="${x+dx}" cy="${f}" r="${f}"/>`;
    h+=`<circle cx="${x}" cy="${cy}" r="${R}"/>`;});
  $("barmask").innerHTML=`<rect x="-20" y="-80" width="${W+40}" height="${H+100}" fill="#fff"/><g fill="#000">${w}</g><g fill="#fff">${fl}</g><g fill="#000">${h}</g>`;
  const r=$("barrect");r.setAttribute("width",W);r.setAttribute("height",H);
}
function centerX(el){const n=$("tabbar").getBoundingClientRect(),r=el.getBoundingClientRect();return r.left-n.left+r.width/2;}
/* the icon of the section you are in lives in the circle, so in the bar it is hidden */
function barIcons(from,to,k){
  document.querySelectorAll("#tabs [data-tab]").forEach(b=>{const key=b.dataset.tab;let o=1;
    if(key===to)o=k==null?0:1-clamp01((k-.6)/.3);else if(key===from&&k!=null)o=clamp01((k-.08)/.3);
    b.querySelector(".ti").style.opacity=o;});
}
function placeInd(animate){
  const nav=$("tabbar"),b=document.querySelector(`#tabs [data-tab="${tab}"]`),fab=document.querySelector("#tabs [data-newproj]"),ic=$("indic");
  cancelAnimationFrame(indRaf);indMoving=false;
  const fx=fab?centerX(fab):null;nav.classList.toggle("none",!b);
  if(!b){drawBar([fx]);indX=null;indTab=null;barIcons(null,null,null);return;}
  const x=centerX(b);
  if(indX==null||!animate||indTab===tab){indX=x;indTab=tab;ic.innerHTML=ICON[tab];ic.dataset.k=tab;ic.style.opacity=1;
    nav.style.setProperty("--nx",x+"px");drawBar([fx,x]);barIcons(null,tab,null);return;}
  const x0=indX,from=indTab,t0=performance.now(),D=Math.min(780,360+Math.abs(x-x0)*1.6);
  indMoving=true;indTab=tab;
  const step=t=>{const k=Math.min(1,(t-t0)/D),e=-(Math.cos(Math.PI*k)-1)/2;indX=x0+(x-x0)*e;
    nav.style.setProperty("--nx",indX+"px");drawBar([fx,indX]);
    if(k>=.5&&ic.dataset.k!==tab){ic.innerHTML=ICON[tab];ic.dataset.k=tab;}
    ic.style.opacity=clamp01(Math.abs(1-2*k)*1.8).toFixed(3);barIcons(from,tab,k);
    if(k<1)indRaf=requestAnimationFrame(step);else{indMoving=false;ic.style.opacity=1;barIcons(null,tab,null);}};
  indRaf=requestAnimationFrame(step);
}
const TABS=[["magazzino","Magazzino"],["catalogo","Catalogo"],["nuovo","Nuovo progetto"],["ordini","Ordini"],["dashboard","Dashboard"]];
function renderTabs(){
  const T=$("tabs");
  if(!T.dataset.built){T.dataset.built="1";
    T.innerHTML=TABS.map(([k,l])=>k==="nuovo"?`<button class="tab fab" data-newproj aria-label="${l}"><span class="fab-c">${ICON.plus}</span></button>`
      :`<button class="tab" data-tab="${k}" aria-label="${l}" aria-current="false"><span class="ti">${ICON[k]}</span></button>`).join("");}
  T.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-current",b.dataset.tab===tab));
  placeInd(true);$("notes-btn").setAttribute("aria-current",tab==="note");$("set-btn").setAttribute("aria-current",tab==="impostazioni");}
function renderMain(){
  const m=$("main"),st=m.scrollTop;
  if(tab==="magazzino")m.innerHTML=!sub?viewStore():sub==="ordinare"?viewToOrder():(SUBS[sub]&&!mat)?viewMaterials():viewCategory();
  else if(tab==="ordini")m.innerHTML=viewOrders();
  else if(tab==="catalogo")m.innerHTML=viewCatalogo();
  else if(tab==="impostazioni")m.innerHTML=viewSettings();
  else if(tab==="dashboard")m.innerHTML=viewStats();
  else m.innerHTML=viewNotes();
  if(tab==="dashboard")paintCharts();
  if($("list")){renderCatList();$("q").addEventListener("input",e=>{query=e.target.value;renderCatList();});}
  const on=$("o-nome");if(on)on.addEventListener("input",e=>{oDraft.nome=e.target.value;});
  $("add").hidden=tab==="magazzino"||tab==="impostazioni"||tab==="dashboard";
  const st1=$("set-tariffa");if(st1)st1.addEventListener("input",()=>{SET.tariffa=pnum(st1.value);checkSync();});
  const st3=$("set-labor");if(st3)st3.addEventListener("change",()=>{SET.laborOn=st3.checked;checkSync();});
  const st2=$("set-splash");if(st2)st2.addEventListener("change",()=>{SET.splash=st2.checked;});
  m.scrollTop=st;
  checkSync();
}
function go(t,s){tab=t;sub=s||null;mat=null;tipo=null;showOut=false;showAdd=false;resetF();renderTabs();renderMain();$("main").scrollTop=0;}

/* ---------- detail pages ---------- */
const orderSchema=r=>({single:"Ordina di nuovo",cols:[{k:"coll",l:"Categoria",t:"ocat"},
  ...SCHEMA[r.coll].cols.filter(c=>c.k!=="disp"&&c.k!=="instock").map(c=>c.k==="acq"?{...c,l:({filati:"Grammi da ordinare",hardware:"Pezzi da ordinare",fodere:"Metri da ordinare"}[r.coll]||"Quantità da ordinare")}
    :c.k==="metri"?{...c,l:"Metri da ordinare"}:(c.t==="money")?{...c,l:"Prezzo",h:"Quanto lo paghi in tutto"}:c)]});
const schemaOf=(coll,r)=>coll==="daordinare"?orderSchema(r):SCHEMA[coll];
const orderHint=r=>(+r.acq>0&&paid(r.coll,r))?`Prezzo unitario: <b>${unitPrice(r.coll,r)}</b>`:"Scrivi quantità e prezzo: il prezzo unitario si calcola da solo.";
function stockHint(coll,r){
  if(!(+r.acq>0))return "Quanti ne hai comprati in tutto: serve per il prezzo unitario.";
  return paid(coll,r)?`Prezzo unitario: <b>${unitPrice(coll,r)}</b>`:"Scrivi anche il prezzo pagato per avere il prezzo unitario.";
}
function instockHint(coll,r){
  const un=unitOf(coll,r),used=usedBy(coll,r.id);
  return `${used?`${qf(used,un)} già usati nelle borse · `:""}Scrivilo tu quando conti i pezzi: poi si aggiorna da solo con quelli che usi.`;
}
const metriHint=r=>(+r.acq>0&&+r.metri>0)?`Circa <b>${qf(Math.max(0,r.metri*remaining("filati",r)/r.acq),"m")}</b> rimasti`:"";
function gsum(id,r,coll){
  const ec=coll==="daordinare"?r.coll:coll;
  switch(id){ /* returns HTML: user text is escaped here */
    case "qty":{const un=unitOf(ec,r),pp=paid(ec,r);
      if(coll==="daordinare")return [+r.acq>0?qf(r.acq,un):"",pp?eur(pp):""].filter(Boolean).join(" · ")||"Da compilare";
      return hasQty(r)?`${leftTxt(remaining(coll,r),un)}${pp?" · "+eur(pp):""}`:"Da compilare";}
    case "col":return r.colore?`<span class="colopt" style="justify-content:flex-end">${swHtml(r.colore,!!r.lurex)}${esc(r.colore)}${r.lurex?" · lurex":""}</span>`:"Scegli";
    case "forn":return esc([r.fornitore,r.brand].filter(Boolean).join(" · "))||"—";
    case "uses":return plural(usesOf(coll,r).length,"borsa","borse");
    case "note":return r.note?esc(short(r.note,26)):"Nessuna";
    case "usage":return (coll==="prodotti"?"Spesa ":"Spesa stimata ")+eur(bagCost(r));
    case "misure":return esc([r.misure,coll!=="prodotti"&&+r.ore>0?qf(+r.ore,"h"):""].filter(Boolean).join(" · "))||"—";
    case "ore":{const h=+r.ore||0,l=labor(r);return h?`${qf(h,"h")}${l>0?" · "+eur(l):""}`:"—";}
    case "pdf":return r.pdf?esc(r.pdf.name):"Nessuno";
    case "pin":return r.link?esc(short(r.link.replace(/^https?:\/\//,""),26)):"—";
    case "model":{const m=byId("modelli",r.modello);return m?esc(m.nome):"Nessuno";}
    case "orders":return plural(DATA.ordini.filter(o=>o.prodotto===r.id).length,"ordine","ordini");
    case "bag":{const p=byId("prodotti",r.prodotto);return p?esc(p.nome):"Scegli la borsa";}
  }
  return "";
}
function useLine(u,i,bag){
  const it=byId(u.coll,u.id),name=it?it.nome:(u.nome||"Materiale")+" (eliminato)",un=it?unitOf(u.coll,it):"";
  let s,over=false;
  if(!it)s="Non è più in magazzino: la spesa resta quella registrata";
  else{
    const avail=remaining(u.coll,it,bag);over=!!bag&&(+u.qty||0)>avail;
    if(over)s=`Non basta: ne restano ${qf(Math.max(0,avail),un)}`;
    else{
      const cur=unitCost(u.coll,it),changed=bag&&u.uc!=null&&Math.abs(u.uc-cur)>1e-9&&cur>0;
      s=`Disponibili ${qf(Math.max(0,avail),un)} · ${priceLbl(u.coll,ucOf(u),un)}${changed?` · <button class="refresh" data-urefresh="${i}">usa il prezzo attuale (${priceLbl(u.coll,cur,un)})</button>`:""}`;
    }
  }
  return `<div class="urow"><div class="um"><span class="un">${esc(name)}</span><span class="us${over?" warn":""}" data-uwarn="${i}">${s}</span></div>
    <div class="affix" data-u="${un}"><input class="inp" type="text" inputmode="decimal" data-uqty="${i}" value="${fin(u.qty)}" placeholder="0" aria-label="Quantità usata di ${esc(name)}"></div>
    <span class="uc" data-ucost="${i}">${eur(useCost(u))}</span><button class="x" data-urem="${i}" aria-label="Togli ${esc(name)}">×</button></div>`;
}
function laborBlock(r){
  if(!laborOpen&&!(+r.ore>0))return `<button class="mini" data-labor>+ Ore di lavoro</button>`;
  return `<div class="labor"><div class="field"><label class="flabel" for="f-ore">Ore di lavoro</label><div class="affix" data-u="h" style="max-width:170px"><input class="inp" id="f-ore" data-k="ore" data-num type="text" inputmode="decimal" value="${fin(r.ore)}" placeholder="0"></div></div>
    <p class="hint" data-laborhint>${laborHint(r)}</p></div>`;
}
const laborHint=r=>{const h=+r.ore||0,t=+SET.tariffa||0;
  if(!h)return "Scrivi le ore: con la tariffa oraria delle Impostazioni si aggiungono al costo.";
  if(!t)return "Imposta la tariffa oraria nelle Impostazioni per contare il lavoro.";
  return `${qf(h,"h")} × ${eur(t)} = <b>${eur(r2(h*t))}</b> · ${SET.laborOn?"aggiunto al costo":"non aggiunto (si attiva nelle Impostazioni)"}`;};
function renderUsage(r,coll){
  const bag=coll==="prodotti"?r:null,uso=r.uso||(r.uso=[]);
  const SING={filati:"filato",hardware:"hardware",fodere:"fodera",altri:"materiale",packaging:"packaging"};
  const rows=uso.map((u,i)=>[u,i]).filter(([u])=>u.coll===useTab);
  const avail=DATA[useTab].filter(it=>!uso.some(u=>u.coll===useTab&&u.id===it.id));
  const tot=bagCost(r),g=r2((+r.prezzo||0)-tot);
  return `<div class="utabs">${INV.map(k=>{const n=uso.filter(u=>u.coll===k).length;
      return `<button class="utab" data-utab="${k}" aria-pressed="${k===useTab}"><span class="l">${k==="altri"?"Altri":SCHEMA[k].name.split(" ")[0]}</span><span class="n" data-usub="${k}">${n?n+" · "+eur(sumOf(r,k)):"nessuno"}</span></button>`;}).join("")}</div>
    ${rows.map(([u,i])=>useLine(u,i,bag)).join("")}
    ${!rows.length&&!picker?`<p class="hint">Nessun ${SING[useTab]||"materiale"} aggiunto.</p>`:""}
    ${picker?`<div class="picker">${avail.length?avail.map(it=>{const un=unitOf(useTab,it);
        return `<button class="pick" data-uadd="${it.id}"><span>${esc(it.nome)}</span><span class="ps">${+it.acq>0?leftTxt(remaining(useTab,it,bag),un):""}${dispOf(useTab,it)==="Esaurito"?' <span class="pill red">Esaurito</span>':""}</span></button>`;}).join(""):`<p class="hint" style="padding:12px">Hai già aggiunto tutto.</p>`}</div>
      <button class="linkbtn" data-upick>Chiudi elenco</button>`:`<button class="linkbtn" data-upick>+ Aggiungi ${SING[useTab]||"materiale"}</button>`}
    <div class="cost-box"><div class="cost-line"><span>Spesa per realizzarla</span><b data-utotal>${eur(tot)}</b></div>
      ${bag?`<p class="cost-note" data-ubreak>${labor(r)>0?`Materiali ${eur(sumOf(r))} + lavoro ${eur(labor(r))}`:""}</p>
        <div class="cost-line"><span>Guadagno sul prezzo di vendita</span><b data-ugain class="${g<0?"loss":"gain"}">${eur(g)}</b></div>
        <p class="cost-note">I materiali si scalano dal magazzino da soli. Se elimini la borsa, tornano disponibili.</p>`
      :`<p class="cost-note">Spesa stimata con i prezzi di oggi. Dal magazzino si scala solo quando crei una borsa.</p>`}</div>`;
}
/* photo galleries (up to 10) and the instructions PDF */
function galleryField(r,c){
  const L=r.fotos||(r.fotos=[]),max=c.max||10;
  return `<div class="field"><span class="flabel">${c.l||"Foto"}${max>1?` · ${L.length}/${max}`:""}</span>
    <div class="gal">${L.map((src,i)=>`<div class="gal-it${i===0&&max>1?" cover":""}"><button class="gal-img" data-gcover="${i}" ${bgAttr(src)} aria-label="${i===0?"Copertina":"Metti come copertina"}"></button><button class="gal-x" data-gdel="${i}" aria-label="Togli la foto">×</button>${i===0&&max>1?'<span class="gal-tag">Copertina</span>':""}</div>`).join("")}
      ${L.length<max?`<label class="gal-add" for="f-gal" tabindex="0">+<small>${L.length?"Aggiungi":"Foto"}</small></label>`:""}</div>
    <input type="file" accept="image/*" ${max>1?"multiple":""} id="f-gal" hidden>
    ${L.length>1?'<p class="hint">Tocca una foto per metterla come copertina.</p>':""}</div>`;
}
function galTop(r,s){const gc=s.cols.find(c=>c.t==="gallery");if(!gc)return "";return (r.fotos&&r.fotos.length?ph(r,"hero"):"")+galleryField(r,gc);}
function pdfLink(r){const ref=r.pdf.ref||r.pdf.data,u=MEDIA.url(ref);return u?`href="${u}"`:`href="#" data-mhref="${esc(ref)}" aria-disabled="true"`;}
function pdfField(r,c){
  return `<div class="field">${r.pdf?`<div class="pdfrow"><span class="pdfic">PDF</span><span class="pdfn">${esc(r.pdf.name)}</span><a class="btn ghost" ${pdfLink(r)} target="_blank" rel="noopener">Apri</a><button class="btn ghost" data-pdfdel>Togli</button></div>`
    :`<label class="btn" for="f-pdf" tabindex="0" style="align-self:flex-start">Aggiungi il PDF</label>`}
    <input type="file" accept="application/pdf" id="f-pdf" hidden><p class="hint">Un PDF con le istruzioni e i disegni da seguire.</p></div>`;
}
/* new bag from a model: first choose what changes */
const FMOPTS=[["misure","Misure"],["prezzo","Prezzo"],["col","Colore"],["ore","Ore di lavoro"],["filati","Filati"],["hardware","Hardware"],["fodere","Fodera"],["altri","Altri materiali"],["note","Note"]];
function popFromModel(m){popCtx={fromModel:m.id,pick:new Set()};paintFM();$("pop").hidden=false;}
function paintFM(){
  const m=byId("modelli",popCtx.fromModel);
  $("pop").innerHTML=`<div class="pop-card" role="dialog" aria-label="Nuova borsa dal modello"><p class="pop-t">Cosa cambi rispetto a «${esc(m.nome)}»?</p>
    <p class="pop-p">La forma resta quella del modello. Scegli cosa vuoi modificare: tutto il resto viene copiato.</p>
    <div class="fmopts">${FMOPTS.map(([k,l])=>`<button class="fmopt" data-fmopt="${k}" aria-pressed="${popCtx.pick.has(k)}"><span class="chk">${popCtx.pick.has(k)?"✓":""}</span>${l}</button>`).join("")}</div>
    <button class="pop-opt go" data-fmgo>Crea la borsa</button><button class="pop-cancel" data-popclose>Annulla</button></div>`;
}
function createFromModel(){
  const m=byId("modelli",popCtx.fromModel),pick=popCtx.pick;$("pop").hidden=true;popCtx=null;
  const p={id:uid("p"),nome:m.nome,modello:m.id,prezzo:"",colore:"",misure:m.misure||"",ore:m.ore||"",uso:copyUse(m.uso),note:"",fotos:[...(m.fotos||[])],tone:m.tone};
  DATA.prodotti.unshift(p);go("catalogo");catSeg="borse";renderMain();
  const open=[...pick].filter(k=>["misure","col","ore","note"].includes(k)),mats=["filati","hardware","fodere","altri"].filter(k=>pick.has(k));
  if(mats.length)open.push("usage");
  openSheet("prodotti",0,{open,useTab:mats[0]||"filati"});
  setTimeout(()=>{const t=document.querySelector(pick.has("prezzo")?"#f-prezzo":".sheet .title-in");if(t){t.focus();if(t.select)t.select();}},330);
}
function photoTop(r){
  const input=`<input type="file" accept="image/*" id="f-foto" hidden>`;
  if(!r.foto)return `<label class="photo-add" for="f-foto" tabindex="0">${ICON.camera}<span><b>Aggiungi una foto</b><small>Scatta con la fotocamera o scegli dalla galleria. È facoltativa.</small></span></label>${input}`;
  return `${ph(r,"hero")}<div class="photo-btns"><label class="btn ghost" for="f-foto" tabindex="0">Cambia foto</label><button class="btn ghost" data-rmfoto>Rimuovi</button></div>${input}`;
}
function field(c,r,coll){
  const id="f-"+c.k,v=r[c.k],hint=c.h?`<p class="hint">${c.h}</p>`:"",ec=coll==="daordinare"?r.coll:coll;
  const lab=`<label class="flabel" for="${id}">${c.l}</label>`;
  switch(c.t){
    case "ocat":return r.ref?"":`<div class="field"><span class="flabel">${c.l}</span><div class="opts">${INV.map(k=>`<button class="opt" data-ocoll="${k}" aria-pressed="${r.coll===k}">${catName(k)}</button>`).join("")}</div></div>`;
    case "usage":return renderUsage(r,coll);
    case "gallery":return "";
    case "pdf":return pdfField(r,c);
    case "ore":return `<div class="field">${lab}<div class="affix" data-u="h"><input class="inp" id="${id}" data-k="ore" data-num type="text" inputmode="decimal" value="${fin(v)}" placeholder="0"></div><p class="hint" data-laborhint>${laborHint(r)}</p></div>`;
    case "photo":return "";
    case "matpick":return `<div class="field"><span class="flabel">${c.l}</span><div class="opts">${MAT.map(([m])=>`<button class="opt sky" data-matpick="${esc(m)}" aria-pressed="${r.materiale===m}">${esc(r.materiale===m?matLabel(r):m)} ›</button>`).join("")}</div>
      <p class="hint">Tocca il materiale per scegliere il tipo (normale o Luxe, lana, cotone…).</p></div>`;
    case "color":return `<div class="field"><div class="color-row"><span data-swatch>${swHtml(v,false,true)}</span><input class="inp" id="${id}" data-k="colore" value="${esc(v)}" placeholder="es. beige, salvia, oro" autocomplete="off" aria-label="Colore"></div>
      <p class="hint" data-colorhint>${colorHint(v)}</p>
      <div class="palette">${PALETTE.map(([n,h])=>`<button class="pal" data-color="${n}" aria-pressed="${norm(v)===n}"><span class="sw" style="--c:${h}"></span>${n}</button>`).join("")}</div></div>`;
    case "select":{
      if(c.k==="materiale"||(c.k==="tipo"&&ec==="hardware"))return `<div class="field"><span class="flabel">${c.l}</span><div class="matseg">${c.o.map(([o])=>`<button class="matb" data-set="${c.k}" data-v="${esc(o)}" aria-pressed="${v===o}"><span class="mi">${ICON[o]||ICON.tag}</span><span>${esc(o)}</span></button>`).join("")}</div></div>`;
      const cur=c.k==="disp"?dispOf(coll,r):v;
      return `<div class="field"><span class="flabel">${c.l}</span><div class="opts">${c.o.map(([o,k])=>`<button class="opt ${k}" data-set="${c.k}" data-v="${esc(o)}" aria-pressed="${cur===o}">${esc(o)}</button>`).join("")}</div>
        ${c.k==="disp"&&autoOut(coll,r)?`<p class="hint">Segnato esaurito in automatico perché è finito.</p>`:""}</div>`;}
    case "product":return `<div class="opts">${DATA.prodotti.map(p=>{const other=DATA.ordini.find(o=>o.prodotto===p.id&&o!==r);
      return `<button class="popt" data-set="prodotto" data-v="${p.id}" aria-pressed="${v===p.id}">${ph(p,"xs")}<span>${esc(p.nome)}<small>${eur(p.prezzo)}${other?" · già nell'ordine di "+esc(other.cliente):""}</small></span></button>`;}).join("")}</div>
      <p class="hint">Ogni borsa è un pezzo unico: se vendi due volte lo stesso modello, crea un'altra borsa dal Catalogo.</p>`;
    case "model":return `<div class="opts">${DATA.modelli.map(m=>`<button class="popt" data-set="modello" data-v="${m.id}" aria-pressed="${v===m.id}">${ph(m,"xs")}<span>${esc(m.nome)}</span></button>`).join("")}</div>`;
    case "date":return `<div class="field">${lab}<input class="inp" id="${id}" data-k="${c.k}" type="date" value="${esc(v)}"><p class="hint">Serve per le statistiche mese per mese.</p></div>`;
    case "long":return `<div class="field">${lab}<textarea id="${id}" data-k="${c.k}" placeholder="${esc(c.ph||"Scrivi qui")}">${esc(v)}</textarea></div>`;
    case "money":return `<div class="field">${lab}<div class="affix pre"><input class="inp" id="${id}" data-k="${c.k}" data-num type="text" inputmode="decimal" value="${fin(v)}" placeholder="0,00"></div>${hint}</div>`;
    case "instock":return `<div class="field">${lab}<div class="affix" data-u="${unitOf(coll,r)}"><input class="inp" id="${id}" data-instock type="text" inputmode="decimal" value="${hasQty(r)?fin(remaining(coll,r)):""}" placeholder="0"></div><p class="hint" data-instockhint>${instockHint(coll,r)}</p></div>`;
    case "stock":return `<div class="field">${lab}<div class="affix" data-u="${unitOf(ec,r)}"><input class="inp" id="${id}" data-k="${c.k}" data-num type="text" inputmode="decimal" value="${fin(v)}" placeholder="0"></div>
      <p class="hint" data-stockhint>${coll==="daordinare"?orderHint(r):stockHint(coll,r)}</p></div>`;
    case "metri":return `<div class="field">${lab}<div class="affix" data-u="m"><input class="inp" id="${id}" data-k="${c.k}" data-num type="text" inputmode="decimal" value="${fin(v)}" placeholder="0"></div>
      ${coll==="daordinare"?"":`<p class="hint" data-metrihint>${metriHint(r)}</p>`}</div>`;
    case "num":return `<div class="field">${lab}<div class="affix" data-u="${c.u}"><input class="inp" id="${id}" data-k="${c.k}" data-num type="text" inputmode="decimal" value="${fin(v)}" placeholder="0"></div>${hint}</div>`;
    case "url":return `<div class="field">${lab}<div class="link-row"><input class="inp" id="${id}" data-k="${c.k}" type="url" value="${esc(v)}" placeholder="sito.it">${v?`<a href="${esc(href(v))}" target="_blank" rel="noopener">Apri</a>`:""}</div></div>`;
  }
  const sg=c.k==="fornitore"||c.k==="brand";
  return `<div class="field">${lab}<input class="inp" id="${id}" data-k="${c.k}"${sg?` data-suggest="${c.k}" autocomplete="off"`:""} value="${esc(v)}" placeholder="${esc(c.ph||"—")}">${sg?'<div class="sugg" hidden></div>':""}${hint}</div>`;
}
function groupExtra(id,r,coll){
  if(id==="uses")return `<div class="opts">${usesOf(coll,r).map(([p,u])=>`<span class="pill">${esc(p.nome)} · ${qf(+u.qty||0,unitOf(coll,r))}</span>`).join("")}</div>`;
  if(id==="orders")return `<div class="opts">${DATA.ordini.filter(o=>o.prodotto===r.id).map(o=>`<button class="popt" data-open="ordini:${DATA.ordini.indexOf(o)}"><span>${esc(o.cliente)||"Cliente"}<small>${eur(o.costo)}</small></span></button>`).join("")}</div>`;
  return "";
}
function headline(r,coll){
  if(coll==="prodotti"){const t=bagCost(r),g=r2((+r.prezzo||0)-t);
    return `<p class="headline" data-headline>Spesa <b>${eur(t)}</b> · Guadagno <b class="${g<0?"loss":"gain"}">${eur(g)}</b></p>`;}
  if(coll==="modelli")return `<p class="headline" data-headline>Spesa stimata <b>${eur(bagCost(r))}</b></p>`;
  return "";
}
function orderBox(r){
  const p=byId("prodotti",r.prodotto),sp=bagCost(p),v=r2((+r.costo||0)-sp);
  const parts=p?[...INV.map(k=>[k,sumOf(p,k)]).filter(([,s])=>s>0).map(([k,s])=>`${k==="hardware"?"Hardware":catName(k)} ${eur(s)}`),...(labor(p)>0?[`Lavoro ${eur(labor(p))}`]:[])].join(" · "):"";
  return `<div class="cost-box solo"><div class="cost-line"><span>Costo borsa</span><b data-o-price>${eur(r.costo)}</b></div>
    <div class="cost-line"><span>Spesa per realizzarla</span><b>${eur(sp)}</b></div>
    ${parts?`<p class="cost-note">${parts}</p>`:p?"":`<p class="cost-note">Scegli la borsa per calcolare la spesa.</p>`}
    <div class="cost-line total"><span>Guadagno effettivo</span><b data-o-gain class="${v<0?"loss":"gain"}">${eur(v)}</b></div></div>
    ${p?`<button class="linkbtn" data-open="prodotti:${DATA.prodotti.indexOf(p)}">Apri la scheda della borsa ›</button>`:""}`;
}
function actions(coll,r){
  if(coll==="daordinare"){const it=r.ref&&byId(r.coll,r.ref);
    return `${it?`<p class="hint">Riordino di <b>${esc(it.nome)}</b>: quantità e prezzo si aggiungono a quelli che hai già.</p>`:""}
      <button class="primary" data-action="arrive">Arrivato: sposta in magazzino<small>Lo trovi in ${catName(r.coll)}${r.coll==="filati"&&r.materiale?" › "+esc(r.materiale):""}</small></button>`;}
  if(coll==="prodotti")return `<button class="primary" data-action="orderFromProduct">Crea un ordine con questa borsa</button>`;
  if(coll==="modelli")return `<button class="primary" data-action="fromModel">Crea una borsa da questo modello<small>Poi cambi materiali, misure e prezzo</small></button>`;
  return "";
}
function delWarn(coll,r){
  if(INV.includes(coll)){const n=usesOf(coll,r).length;return n?`È usato in ${plural(n,"borsa","borse")}: la loro spesa non cambia.`:"";}
  if(coll==="prodotti"){const n=DATA.ordini.filter(o=>o.prodotto===r.id).length;
    return (n?`È collegata a ${plural(n,"ordine","ordini")}, che resteranno senza borsa. `:"")+"I materiali torneranno disponibili in magazzino.";}
  if(coll==="modelli")return "Le borse già create non cambiano.";
  return "";
}
function renderSheet(keep){
  if(!sheet){$("app").classList.remove("open");return;}
  const old=$("sheet").querySelector(".sheet-body,.note-editor"),st=keep&&old?old.scrollTop:0;
  const {coll,idx}=sheet,r=DATA[coll][idx];
  if(!r){sheet=null;$("app").classList.remove("open");return;}
  const delBtn=`<button class="del${delArm?" armed":""}" data-del>${delArm?"Tocca di nuovo per eliminare":"Elimina"}</button>${delArm&&delWarn(coll,r)?`<p class="hint warn" style="text-align:center">${delWarn(coll,r)}</p>`:""}`;
  if(coll==="note"){
    $("sheet").innerHTML=`<div class="sheet-top"><span class="kind">Nota · ${esc(r.data)}</span><button class="done" data-close>Fine</button></div>
      <div class="note-editor"><input class="title-in" id="f-titolo" data-k="titolo" value="${esc(r.titolo)}" placeholder="Titolo" aria-label="Titolo">
        <textarea class="note-area" id="f-testo" data-k="testo" placeholder="Scrivi qui. Tocca una riga qualsiasi per iniziare da lì." aria-label="Testo della nota">${esc(r.testo)}</textarea>${delBtn}</div>`;
    $("app").classList.add("open");
    $("sheet").querySelectorAll("[data-k]").forEach(el=>el.addEventListener("input",()=>{r[el.dataset.k]=el.value;renderMain();}));
    const ta=$("f-testo"),grow=()=>{ta.style.height="auto";ta.style.height=ta.scrollHeight+"px";};
    ta.addEventListener("input",grow);requestAnimationFrame(()=>{grow();$("sheet").querySelector(".note-editor").scrollTop=st;});
    ta.addEventListener("click",e=>{if(padToTap(ta,e)){r.testo=ta.value;grow();renderMain();}});
    return;
  }
  const s=schemaOf(coll,r),L=LAYOUT[coll],col=k=>s.cols.find(c=>c.k===k),tc=s.cols.find(c=>c.t==="title");
  const gk=g=>g.keys||QTYKEYS[r.coll];
  const groups=L.groups.filter(g=>(g.id!=="uses"||usesOf(coll,r).length)&&(g.id!=="orders"||DATA.ordini.some(o=>o.prodotto===r.id))&&(!gk(g).length||gk(g).some(k=>col(k))));
  $("sheet").innerHTML=`<div class="sheet-top"><span class="kind">${s.single}</span><button class="done" data-close>Fine</button></div>
    <div class="sheet-body">
      ${s.cols.some(c=>c.t==="photo")?photoTop(r):""}${galTop(r,s)}
      <input class="title-in" id="f-${tc.k}" data-k="${tc.k}" value="${esc(r[tc.k])}" placeholder="${tc.l}" aria-label="${tc.l}">
      ${L.top.map(k=>col(k)?field(col(k),r,coll):"").join("")}
      ${headline(r,coll)}
      ${groups.length?'<div class="groups">':''}${groups.map(g=>{const open=openG.has(g.id),keys=gk(g);
        if(g.id==="col")return `<div class="grp"><button class="grp-btn" data-colorpop><span class="gt">${g.t}</span><span class="gs" data-gsum="col">${gsum("col",r,coll)}</span><span class="chev">›</span></button></div>`;
        return `<div class="grp"><button class="grp-btn" data-grp="${g.id}" aria-expanded="${open}"><span class="gt">${g.t}</span><span class="gs" data-gsum="${g.id}">${gsum(g.id,r,coll)}</span><span class="chev">›</span></button>
          ${open?`<div class="grp-body">${keys.map(k=>col(k)?field(col(k),r,coll):"").join("")}${groupExtra(g.id,r,coll)}</div>`:""}</div>`;}).join("")}${groups.length?"</div>":""}
      ${coll==="ordini"?orderBox(r):""}
      ${actions(coll,r)}
      ${delBtn}
    </div>`;
  $("app").classList.add("open");
  const body=$("sheet").querySelector(".sheet-body");body.scrollTop=st;
  body.querySelectorAll("[data-k]").forEach(el=>el.addEventListener("input",()=>{
    r[el.dataset.k]=el.hasAttribute("data-num")?pnum(el.value):el.value;refreshNumbers();renderMain();}));
  body.querySelectorAll("[data-uqty]").forEach(el=>el.addEventListener("input",()=>{r.uso[+el.dataset.uqty].qty=pnum(el.value);refreshNumbers();renderMain();}));
  const ik=body.querySelector("[data-instock]");if(ik)ik.addEventListener("input",()=>{const v=pnum(ik.value);if(v==="")return;r.adj=r6(v-((+r.acq||0)-usedBy(coll,r.id)));refreshNumbers();renderMain();});
  body.querySelectorAll("[data-suggest]").forEach(inp=>{inp.addEventListener("focus",()=>paintSugg(inp));inp.addEventListener("input",()=>paintSugg(inp));
    inp.addEventListener("blur",()=>setTimeout(()=>{const box=inp.closest(".field").querySelector(".sugg");if(box&&document.activeElement!==inp)box.hidden=true;},180));});
  const fg=$("f-gal");if(fg)fg.addEventListener("change",()=>{const gc=s.cols.find(c=>c.t==="gallery"),L=r.fotos||(r.fotos=[]),files=[...fg.files].slice(0,(gc.max||10)-L.length);let n=files.length;if(!n)return;
    Promise.all(files.map(file=>MEDIA.add(file))).then(refs=>{refs.forEach(x=>{if(x)L.push(x);});renderSheet(true);renderMain();});});
  const fp=$("f-pdf");if(fp)fp.addEventListener("change",()=>{const file=fp.files[0];if(!file)return;MEDIA.add(file).then(ref=>{if(!ref)return;r.pdf={name:file.name,ref};renderSheet(true);renderMain();});});
  const tf=$("f-tariffa");if(tf)tf.addEventListener("input",()=>{SET.tariffa=pnum(tf.value);refreshNumbers();renderMain();});
  const ob=$("f-oreon");if(ob)ob.addEventListener("change",()=>{r.oreOn=ob.checked;refreshNumbers();renderMain();});
  const f=$("f-foto");if(f)f.addEventListener("change",()=>{const file=f.files[0];if(!file)return;MEDIA.add(file).then(ref=>{if(!ref)return;r.foto=ref;renderSheet(true);renderMain();});});
}
/* live numbers while typing, without redrawing the inputs */
function refreshNumbers(){
  if(!sheet)return;
  const {coll}=sheet,r=DATA[coll][sheet.idx],S=$("sheet");
  const set=(sel,html)=>S.querySelectorAll(sel).forEach(e=>e.innerHTML=html);
  const tone=(sel,v)=>{const e=S.querySelector(sel);if(e){e.textContent=eur(v);e.className=v<0?"loss":"gain";}};
  S.querySelectorAll("[data-gsum]").forEach(e=>e.innerHTML=gsum(e.dataset.gsum,r,coll));
  const swE=S.querySelector("[data-swatch]");if(swE){swE.innerHTML=swHtml(r.colore,false,true);set("[data-colorhint]",colorHint(r.colore));
    S.querySelectorAll("[data-color]").forEach(b=>b.setAttribute("aria-pressed",norm(r.colore)===b.dataset.color));}
  if(INV.includes(coll)){set("[data-stockhint]",stockHint(coll,r));set("[data-metrihint]",metriHint(r));set("[data-instockhint]",instockHint(coll,r));
    const isk=S.querySelector("[data-instock]");if(isk&&document.activeElement!==isk)isk.value=hasQty(r)?fin(remaining(coll,r)):"";}
  if(coll==="daordinare")set("[data-stockhint]",orderHint(r));
  if(coll==="prodotti"||coll==="modelli"){
    const bag=coll==="prodotti"?r:null;
    (r.uso||[]).forEach((u,i)=>{set(`[data-ucost="${i}"]`,eur(useCost(u)));const it=byId(u.coll,u.id),w=S.querySelector(`[data-uwarn="${i}"]`);
      if(w&&it&&bag){const avail=remaining(u.coll,it,bag),over=(+u.qty||0)>avail;w.classList.toggle("warn",over);
        if(over)w.innerHTML=`Non basta: ne restano ${qf(Math.max(0,avail),unitOf(u.coll,it))}`;
        else if(w.textContent.startsWith("Non basta"))w.innerHTML=`Disponibili ${qf(Math.max(0,avail),unitOf(u.coll,it))} · ${priceLbl(u.coll,ucOf(u),unitOf(u.coll,it))}`;}});
    INV.forEach(k=>{const n=(r.uso||[]).filter(u=>u.coll===k).length;set(`[data-usub="${k}"]`,n?n+" · "+eur(sumOf(r,k)):"nessuno");});
    const tot=bagCost(r);set("[data-utotal]",eur(tot));tone("[data-ugain]",r2((+r.prezzo||0)-tot));
    set("[data-laborhint]",laborHint(r));set("[data-ubreak]",labor(r)>0?`Materiali ${eur(sumOf(r))} + lavoro ${eur(labor(r))}`:"");
    const h=S.querySelector("[data-headline]");if(h)h.outerHTML=headline(r,coll);
  }
  if(coll==="ordini"){set("[data-o-price]",eur(r.costo));tone("[data-o-gain]",gainOf(r));}
}
/* tapping an empty line below the text starts writing on that line */
function padToTap(ta,e){
  const cs=getComputedStyle(ta),lh=parseFloat(cs.lineHeight)||38,rect=ta.getBoundingClientRect();
  const y=e.clientY-rect.top-(parseFloat(cs.paddingTop)||0);
  const m=document.createElement("div");
  m.style.cssText=`position:absolute;visibility:hidden;left:-9999px;top:0;white-space:pre-wrap;overflow-wrap:break-word;width:${ta.clientWidth-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0)}px;font-family:${cs.fontFamily};font-size:${cs.fontSize};font-weight:${cs.fontWeight};line-height:${cs.lineHeight};letter-spacing:${cs.letterSpacing}`;
  m.textContent=ta.value+"​";document.body.appendChild(m);const lines=Math.max(1,Math.round(m.offsetHeight/lh));m.remove();
  const tapLine=Math.floor(y/lh);
  if(tapLine<lines)return false;
  ta.value+="\n".repeat(tapLine-lines+1);const n=ta.value.length;ta.setSelectionRange(n,n);return true;
}
function openSheet(coll,idx,opts){
  if(idx<0||!DATA[coll][idx])return;
  sheet={coll,idx};useTab=(opts&&opts.useTab)||"filati";picker=false;laborOpen=false;delArm=false;openG=new Set((opts&&opts.open)||[]);
  if(coll==="fodere"||(coll==="daordinare"&&DATA[coll][idx]&&DATA[coll][idx].coll==="fodere")){openG.add("col");openG.add("qty");}
  const r=DATA[coll][idx];
  if(coll==="ordini"&&!r.prodotto)openG.add("bag");
  renderSheet(false);
  if(opts&&opts.focus)setTimeout(()=>{const t=document.querySelector(".sheet .title-in");if(t){t.focus();t.select();}},320);
}
function closeSheet(){sheet=null;delArm=false;renderSheet();}

/* ---------- create ---------- */
const blankOrder=o=>Object.assign({id:uid("o"),nome:"",coll:"filati",materiale:"",tipo:"",colore:"",brand:"",ref:null,unita:"pezzi",acq:"",metri:"",prezzo:"",costo:"",fornitore:"",link:"",note:"",foto:""},o);
const tones=["#c49a74","#8f9a7c","#a77b5e","#bf9f6e","#7d6a8a","#9c8470"];
function addNew(){
  let coll,r;
  if(tab==="magazzino"){coll=sub;r={id:uid(sub[0]),foto:""};SCHEMA[coll].cols.forEach(c=>{if(c.t!=="photo")r[c.k]=c.t==="select"?c.o[0][0]:"";});
    if(SUBS[sub])r[SUBS[sub].key]=(mat&&mat!=="Tutti")?mat:SUBS[sub].def;}
  else if(tab==="ordini"){coll="ordini";r={id:uid("r"),cliente:"",prodotto:"",costo:"",data:isoToday()};}
  else if(tab==="catalogo"&&catSeg==="modelli"){coll="modelli";r={id:uid("m"),nome:"",misure:"",uso:[],ore:"",note:"",fotos:[],pdf:null,tone:tones[DATA.modelli.length%tones.length]};}
  else if(tab==="catalogo"&&catSeg==="progetti"){coll="progetti";r=blankProject();}
  else if(tab==="catalogo"&&catSeg==="ispirazioni"){coll="ispirazioni";r={id:uid("i"),nome:"",link:"",note:"",fotos:[]};}
  else if(tab==="catalogo"){coll="prodotti";r={id:uid("p"),nome:"",modello:"",prezzo:"",colore:"",misure:"",uso:[],note:"",fotos:[],ore:"",tone:tones[DATA.prodotti.length%tones.length]};}
  else{coll="note";r={id:uid("n"),titolo:"",testo:"",data:today()};}
  DATA[coll].unshift(r);renderMain();openSheet(coll,0,{focus:coll!=="ispirazioni",open:coll==="prodotti"?["model"]:INV.includes(coll)?["qty"]:[]});
  if(coll==="ispirazioni"){const g=$("f-gal");if(g)g.click();}
}
const blankProject=()=>({id:uid("j"),nome:"",stato:"Da realizzare",tipo:"Borsa",descrizione:"",link:"",note:"",fotos:[],data:today(),tone:tones[DATA.progetti.length%tones.length]});
function newProject(){go("catalogo");catSeg="progetti";DATA.progetti.unshift(blankProject());renderMain();openSheet("progetti",0,{focus:true});}
function addToOrder(full){
  const nome=(oDraft.nome||"").trim();
  if(!nome&&!full){const i=$("o-nome");if(i){i.placeholder="Scrivi prima cosa devi ordinare";i.focus();}return;}
  DATA.daordinare.unshift(blankOrder({nome,coll:oDraft.coll,materiale:oDraft.coll==="filati"?oDraft.materiale:"",tipo:oDraft.coll==="filati"?oDraft.tipo:""}));
  oDraft.nome="";
  if(full){showAdd=false;renderMain();openSheet("daordinare",0,{focus:!nome,open:["qty"]});return;}
  renderMain();const i=$("o-nome");if(i)i.focus();
}
const copyUse=uso=>(uso||[]).map(u=>({coll:u.coll,id:u.id,qty:u.qty,uc:freeze(u.coll,u.id),nome:(byId(u.coll,u.id)||u).nome}));
function moveToStock(i){
  const x=DATA.daordinare[i];if(!x)return;
  const c=x.coll,snapInv=JSON.parse(JSON.stringify(DATA[c])),snapList=JSON.parse(JSON.stringify(DATA.daordinare));
  const it=x.ref&&byId(c,x.ref),q=+x.acq||0,pr=paid(c,x),mt=+x.metri||0;let target=it;
  if(it){
    it.acq=r6((+it.acq||0)+q);
    if(c==="filati"){it.prezzo=r2((+it.prezzo||0)+pr);if(mt)it.metri=r6((+it.metri||0)+mt);}else it.costo=r2((+it.costo||0)+pr);
    it.disp="In magazzino";if(x.foto&&!it.foto)it.foto=x.foto;
  }else{
    target={id:uid(c[0]),nome:x.nome||"Senza nome",disp:"In magazzino",acq:x.acq,fornitore:x.fornitore||"",link:x.link||"",foto:x.foto||""};
    if(c==="filati")Object.assign(target,{materiale:x.materiale||"Fettuccia",tipo:x.tipo||defTipo(x.materiale||"Fettuccia"),colore:x.colore||"",lurex:!!x.lurex,brand:x.brand||"",metri:x.metri,prezzo:x.prezzo,note:x.note||""});
    else if(c==="hardware")Object.assign(target,{costo:x.costo,tipo:x.tipo||"Altro",note:x.note||""});
    else Object.assign(target,{costo:x.costo,unita:x.unita||(c==="fodere"?"metri":"pezzi"),colore:x.colore||"",note:x.note||""});
    DATA[c].unshift(target);
  }
  DATA.daordinare.splice(i,1);renderMain();
  const id=target.id,where=catName(c)+(SUBS[c]?" › "+(target[SUBS[c].key]||SUBS[c].def):"");
  toast(`Spostato in magazzino: ${where}`,[
    ["Annulla",()=>{DATA[c]=snapInv;DATA.daordinare=snapList;renderMain();}],
    ["Apri",()=>{go("magazzino",c);if(SUBS[c]){mat=target[SUBS[c].key]||SUBS[c].def;renderMain();}openSheet(c,DATA[c].findIndex(z=>z.id===id));}]]);
}
/* "Arrivato": the dot fills, the name is crossed out, then the row flies into the Magazzino tab */
let arriving=false;
function arrive(i){
  if(arriving)return;
  const btn=document.querySelector(`[data-ocheck="${i}"]`),row=btn&&btn.closest(".orow");
  if(!row||!DATA.daordinare[i]){moveToStock(i);return;}
  arriving=true;row.classList.add("arriving");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finish=()=>{arriving=false;moveToStock(i);const t=tab==="magazzino"?$("indc"):document.querySelector('[data-tab="magazzino"]');
    if(t&&!reduce){t.classList.remove("bump");void t.offsetWidth;t.classList.add("bump");setTimeout(()=>t.classList.remove("bump"),550);}};
  if(reduce){setTimeout(finish,450);return;}
  setTimeout(()=>{
    const app=$("app"),ar=app.getBoundingClientRect(),rr=row.getBoundingClientRect(),tEl=tab==="magazzino"?$("indic"):document.querySelector('[data-tab="magazzino"] .ti');
    if(!tEl){finish();return;}
    const tr=tEl.getBoundingClientRect(),g=row.cloneNode(true);
    g.classList.add("ghost");g.removeAttribute("id");g.setAttribute("aria-hidden","true");
    Object.assign(g.style,{left:(rr.left-ar.left)+"px",top:(rr.top-ar.top)+"px",width:rr.width+"px",height:rr.height+"px"});
    app.appendChild(g);
    row.style.height=rr.height+"px";void row.offsetHeight;row.classList.add("gone");
    const dx=(tr.left+tr.width/2)-(rr.left+rr.width/2),dy=(tr.top+tr.height/2)-(rr.top+rr.height/2);
    const an=g.animate([{transform:"translate(0,0) scale(1)",opacity:1},{transform:`translate(${dx*.35}px,${dy*.2-24}px) scale(.7)`,opacity:1,offset:.35},{transform:`translate(${dx}px,${dy}px) scale(.08)`,opacity:.15}],
      {duration:650,easing:"cubic-bezier(.45,0,.6,1)",fill:"forwards"});
    an.onfinish=()=>{g.remove();finish();};
  },560);
}
function openPop(m,target){
  popCtx={mat:m,target};
  const cur=target==="draft"?(oDraft.materiale===m?oDraft.tipo:null):(sheet&&DATA[sheet.coll][sheet.idx].materiale===m?DATA[sheet.coll][sheet.idx].tipo:null);
  $("pop").innerHTML=`<div class="pop-card" role="dialog" aria-label="Scegli il tipo"><p class="pop-t">${m==="Altri materiali"?"Che materiale è?":m==="Fettuccia"?"Che fettuccia è?":"Che cordino è?"}</p>
    ${TIPI[m].map(t=>`<button class="pop-opt" data-popv="${t}" aria-pressed="${cur===t}">${tipoLabel(m,t)}${t==="Luxe"?"<small>lurex con glitter</small>":""}</button>`).join("")}
    <button class="pop-cancel" data-popclose>Annulla</button></div>`;
  $("pop").hidden=false;
}
function popConfirm(title,text,okLabel,fn){
  popCtx={ok:fn};
  $("pop").innerHTML=`<div class="pop-card" role="alertdialog" aria-label="${esc(title)}"><p class="pop-t">${esc(title)}</p>${text?`<p class="pop-p">${esc(text)}</p>`:""}
    <button class="pop-opt danger" data-popok>${esc(okLabel)}</button><button class="pop-cancel" data-popclose>Annulla</button></div>`;
  $("pop").hidden=false;
}
/* delete one or more warehouse items (asks first, can be undone) */
function askDelete(coll,ids){
  const items=ids.map(id=>byId(coll,id)).filter(Boolean);if(!items.length)return;
  const used=items.some(r=>usesOf(coll,r).length);
  popConfirm(items.length===1?`Eliminare «${items[0].nome||"Senza nome"}»?`:`Eliminare ${items.length} articoli?`,
    used?(items.length===1?"È usato in alcune borse":"Alcuni sono usati nelle borse")+": la spesa di quelle borse non cambia.":"Potrai annullare subito dopo.","Elimina",()=>{
      const snap=JSON.parse(JSON.stringify(DATA[coll]));
      DATA[coll]=DATA[coll].filter(r=>!ids.includes(r.id));selMode=false;selected.clear();renderMain();
      toast(items.length===1?"Eliminato":`${items.length} articoli eliminati`,[["Annulla",()=>{DATA[coll]=snap;renderMain();}]]);});
}
/* put one or more warehouse items on the "Ordina di nuovo" list */
function reorderItems(coll,ids){
  const added=[];let already=0;
  ids.forEach(id=>{const it=byId(coll,id);if(!it)return;
    if(DATA.daordinare.some(x=>x.ref===id)){already++;return;}
    const x=blankOrder({nome:it.nome,coll,materiale:it.materiale||"",tipo:it.tipo||"",colore:it.colore||"",lurex:!!it.lurex,brand:it.brand||"",ref:id,unita:it.unita||"pezzi",fornitore:it.fornitore||"",link:it.link||""});
    DATA.daordinare.unshift(x);added.push(x.id);});
  selMode=false;selected.clear();renderMain();
  if(!added.length){toast(already===1?"È già in Ordina di nuovo":"Sono già in Ordina di nuovo",[["Apri",()=>go("magazzino","ordinare")]]);return;}
  toast(`${added.length===1?"Aggiunto":added.length+" aggiunti"} a Ordina di nuovo${already?` (${already} già in lista)`:""}`,[
    ["Annulla",()=>{DATA.daordinare=DATA.daordinare.filter(x=>!added.includes(x.id));renderMain();}],["Apri",()=>go("magazzino","ordinare")]]);
}
/* swipe a warehouse row: right = delete, left = reorder */
let drag=null,swallow=false;
$("sheet").addEventListener("pointerdown",e=>{if(e.target.closest("[data-sugv]"))e.preventDefault();});
$("main").addEventListener("pointerdown",e=>{const w=e.target.closest(".swp");if(!w||selMode||e.button>0)return;drag={w,row:w.querySelector(".row"),x:e.clientX,y:e.clientY,dx:0,on:false};});
$("main").addEventListener("pointermove",e=>{
  if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(!drag.on){
    if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.3){drag.on=true;drag.w.classList.add("dragging");try{drag.row.setPointerCapture(e.pointerId);}catch(_){}}
    else if(Math.abs(dy)>10){drag=null;return;}else return;
  }
  drag.dx=Math.max(-150,Math.min(150,dx));drag.w.dataset.dir=drag.dx>0?"right":"left";drag.row.style.transform=`translateX(${drag.dx}px)`;
});
function endDrag(cancel){
  if(!drag)return;const d=drag;drag=null;if(!d.on)return;
  swallow=true;setTimeout(()=>{swallow=false;},400);
  d.w.classList.remove("dragging");d.row.style.transform="";setTimeout(()=>{delete d.w.dataset.dir;},220);
  if(cancel)return;
  const [c,id]=d.w.dataset.swp.split(":");
  if(d.dx>90)askDelete(c,[id]);else if(d.dx<-90)reorderItems(c,[id]);
}
$("main").addEventListener("pointerup",()=>endDrag(false));
$("main").addEventListener("pointercancel",()=>endDrag(true));
/* colour: tap the "Colore" row → popup with every colour (or type one), then for yarns "È lurex?" */
const curRec=()=>sheet&&DATA[sheet.coll][sheet.idx];
const lurexOn=r=>sheet&&(sheet.coll==="filati"||(sheet.coll==="daordinare"&&r&&r.coll==="filati"));
function popColor(){
  const r=curRec(),v=r.colore||"";popCtx={color:true};
  $("pop").innerHTML=`<div class="pop-card" role="dialog" aria-label="Scegli il colore"><p class="pop-t">Colore</p>
    <div class="color-row"><span id="pc-sw">${swHtml(v,!!r.lurex,true)}</span><input class="inp" id="pc-name" value="${esc(v)}" placeholder="Scrivi un colore, es. beige" autocomplete="off" aria-label="Nome del colore"></div>
    <div class="palette">${PALETTE.map(([n,h])=>`<button class="pal" data-pickcolor="${n}" aria-pressed="${norm(v)===n}"><span class="sw" style="--c:${h}"></span>${n}</button>`).join("")}</div>
    <button class="pop-opt go" data-colorok>Fatto</button><button class="pop-cancel" data-popclose>Annulla</button></div>`;
  $("pop").hidden=false;
  $("pc-name").addEventListener("input",e=>{$("pc-sw").innerHTML=swHtml(e.target.value,!!r.lurex,true);});
}
function setColor(name){
  const r=curRec();r.colore=name;$("pop").hidden=true;popCtx=null;renderSheet(true);renderMain();
  if(lurexOn(r))popLurex();
}
function popLurex(){
  const r=curRec();popCtx={lurex:true};
  $("pop").innerHTML=`<div class="pop-card" role="dialog" aria-label="Lurex"><p class="pop-t">È lurex?</p><p class="pop-p">Il lurex ha il filo metallizzato con i glitter.</p>
    <button class="pop-opt" data-lurex="1" aria-pressed="${!!r.lurex}">Sì, è lurex<small>con glitter</small></button>
    <button class="pop-opt" data-lurex="0" aria-pressed="${!r.lurex}">No<small>senza glitter</small></button>
    <button class="pop-cancel" data-popclose>Annulla</button></div>`;
  $("pop").hidden=false;
}
/* suggestions for supplier and brand, from the names already used */
function suggList(k){
  const set=new Set(),add=v=>{v=(v||"").trim();if(v)set.add(v);};
  if(k==="brand"){DATA.filati.forEach(r=>add(r.brand));DATA.daordinare.forEach(r=>add(r.brand));}
  else{INV.forEach(c=>(DATA[c]||[]).forEach(r=>add(r.fornitore)));DATA.daordinare.forEach(r=>add(r.fornitore));}
  return [...set].sort((a,b)=>a.localeCompare(b,"it"));
}
function paintSugg(inp){
  const k=inp.dataset.suggest,box=inp.closest(".field").querySelector(".sugg"),q=norm(inp.value);
  const L=suggList(k).filter(v=>norm(v)!==q&&(!q||norm(v).includes(q))).slice(0,6);
  box.innerHTML=L.length?`<span class="sugg-l">${q?"Forse cerchi":"Già usati"}</span>${L.map(v=>`<button class="sugg-b" data-sugv="${esc(v)}" data-sugk="${k}">${esc(v)}</button>`).join("")}`:"";
  box.hidden=!L.length;
}
let toastT;
function toast(msg,acts){
  const el=$("toast");el._acts=acts||[];
  el.innerHTML=`<span>${esc(msg)}</span><span class="acts">${el._acts.map(([l],k)=>`<button data-toastact="${k}">${l}</button>`).join("")}</span>`;
  el.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>{el.hidden=true;},6000);
}

/* ---------- taps ---------- */
$("app").addEventListener("click",e=>{
  if(swallow){swallow=false;return;}   /* a swipe just ended: don't treat it as a tap */
  const t=e.target,q=s=>t.closest(s);
  let b;
  if(b=q("[data-toastact]")){const el=$("toast");el.hidden=true;const a=el._acts[+b.dataset.toastact];if(a)a[1]();return;}
  if(q("#notes-btn")){closeSheet();go("note");return;}
  if(q("#set-btn")){closeSheet();go("impostazioni");return;}
  if(b=q("[data-per]")){statPer=b.dataset.per;statPick=null;renderMain();return;}
  if(q("[data-stattable]")){statTable=!statTable;renderMain();return;}
  if(q("[data-goproj]")){go("catalogo");catSeg="progetti";renderMain();return;}
  if(b=q("[data-pk]")){statPick=statPick===b.dataset.pk?null:b.dataset.pk;paintPie();return;}
  if(q("[data-newproj]")){closeSheet();newProject();return;}
  if(q("[data-gopack]")){go("magazzino","packaging");return;}
  if(b=q("[data-tab]")){closeSheet();go(b.dataset.tab);return;}
  if(b=q("[data-seg]")){catSeg=b.dataset.seg;renderMain();return;}
  if(b=q("[data-sub]")){go(tab,b.dataset.sub);return;}
  /* popup: choose the kind of material */
  if(t.id==="pop"||q("[data-popclose]")){$("pop").hidden=true;popCtx=null;return;}
  if(q("[data-newcat]")){popCatForm(null);return;}
  if(q("[data-catedit]")){popCatForm(sub);return;}
  if(q("[data-savecat]")){saveCat();return;}
  if(q("[data-delcat]")){const id=popCtx&&popCtx.cat;$("pop").hidden=true;if(id)deleteCat(id);return;}
  if(b=q("[data-fmopt]")){const k=b.dataset.fmopt;popCtx.pick.has(k)?popCtx.pick.delete(k):popCtx.pick.add(k);paintFM();return;}
  if(q("[data-fmgo]")){createFromModel();return;}
  if(q("[data-colorpop]")){popColor();return;}
  if(b=q("[data-pickcolor]")){setColor(b.dataset.pickcolor);return;}
  if(q("[data-colorok]")){const i=$("pc-name");setColor((i&&i.value||"").trim());return;}
  if(b=q("[data-lurex]")){const r=curRec();r.lurex=b.dataset.lurex==="1";$("pop").hidden=true;popCtx=null;renderSheet(true);renderMain();return;}
  if(q("[data-popok]")){const fn=popCtx&&popCtx.ok;$("pop").hidden=true;popCtx=null;if(fn)fn();return;}
  if(b=q("[data-popv]")){const v=b.dataset.popv,{mat:m,target}=popCtx;$("pop").hidden=true;popCtx=null;
    if(target==="draft"){oDraft.materiale=m;oDraft.tipo=v;renderMain();}
    else if(sheet){const r=DATA[sheet.coll][sheet.idx];r.materiale=m;r.tipo=v;renderSheet(true);renderMain();}
    return;}
  if(b=q("[data-matpick]")){openPop(b.dataset.matpick,"sheet");return;}
  if(b=q("[data-omat]")){oDraft.materiale=b.dataset.omat;renderMain();return;}
  if(b=q("[data-mat]")){mat=b.dataset.mat;tipo=null;resetF();renderMain();$("main").scrollTop=0;return;}
  if(b=q("[data-tipo]")){tipo=b.dataset.tipo;resetF();renderMain();$("main").scrollTop=0;return;}
  if(q("[data-back]")){resetF();
    if(sub==="filati"&&tipo){tipo=null;renderMain();}
    else if(SUBS[sub]&&mat){mat=null;renderMain();}
    else go(tab,null);
    $("main").scrollTop=0;return;}
  if(q("#search-btn")){searchOpen=!searchOpen;if(!searchOpen)query="";renderMain();if(searchOpen)setTimeout(()=>$("q").focus(),60);return;}
  if(q("#flt-btn")){filtersOpen=!filtersOpen;renderMain();return;}
  if(b=q("[data-f]")){const k=b.dataset.f,v=b.dataset.v;F[k]=F[k]===v?"":v;renderMain();return;}
  if(q("[data-fdone]")){filtersOpen=false;renderMain();return;}
  if(q("[data-freset]")){F={disp:"",colore:"",fornitore:"",brand:""};renderMain();return;}
  if(b=q("[data-fclear]")){F[b.dataset.fclear]="";renderMain();return;}
  if(q("#sel-btn")){selMode=!selMode;selected.clear();renderMain();return;}
  if(b=q("[data-sel]")){const id=b.dataset.sel;selected.has(id)?selected.delete(id):selected.add(id);renderMain();return;}
  if(q("[data-selall]")){const ids=catRows().map(([r])=>r.id);if(ids.every(id=>selected.has(id)))selected.clear();else ids.forEach(id=>selected.add(id));renderMain();return;}
  if(q("[data-selre]")){if(selected.size)reorderItems(sub,[...selected]);return;}
  if(q("[data-seldel]")){if(selected.size)askDelete(sub,[...selected]);return;}
  if(q("#add")||q("[data-addhere]")){addNew();return;}
  if(b=q("[data-fold]")){if(b.dataset.fold==="out")showOut=!showOut;else showAdd=!showAdd;renderMain();if(b.dataset.fold==="add"&&showAdd){const i=$("o-nome");if(i)i.focus();}return;}
  if(b=q("[data-ocat]")){oDraft.coll=b.dataset.ocat;renderMain();return;}
  if(b=q("[data-oadd]")){addToOrder(b.dataset.oadd==="full");return;}
  if(b=q("[data-ocheck]")){arrive(+b.dataset.ocheck);return;}
  if(b=q("[data-orem]")){DATA.daordinare.splice(+b.dataset.orem,1);renderMain();return;}
  if(b=q("[data-oyes]")){const [c,id]=b.dataset.oyes.split(":"),it=byId(c,id);
    DATA.daordinare.unshift(blankOrder({nome:it.nome,coll:c,materiale:it.materiale||"",tipo:it.tipo||"",colore:it.colore||"",lurex:!!it.lurex,brand:it.brand||"",ref:id,unita:it.unita||"pezzi",fornitore:it.fornitore||"",link:it.link||""}));renderMain();return;}
  if(b=q("[data-ono]")){dismissed.add(b.dataset.ono);renderMain();return;}
  if(q("[data-oreset]")){dismissed.clear();renderMain();return;}
  if(b=q("[data-open]")){const [c,i]=b.dataset.open.split(":");openSheet(c,+i);return;}
  if(!sheet)return;
  const r=DATA[sheet.coll][sheet.idx];
  if(q("[data-close]")){closeSheet();return;}
  if(b=q("[data-del]")){
    if(!delArm){delArm=true;renderSheet(true);return;}
    DATA[sheet.coll].splice(sheet.idx,1);closeSheet();renderMain();toast("Eliminato");return;}
  if(delArm){delArm=false;renderSheet(true);}
  if(b=q("[data-grp]")){const g=b.dataset.grp;openG.has(g)?openG.delete(g):openG.add(g);renderSheet(true);return;}
  if(b=q("[data-sugv]")){const k=b.dataset.sugk,v=b.dataset.sugv;r[k]=v;const inp=$("f-"+k);if(inp)inp.value=v;const box=b.closest(".sugg");if(box)box.hidden=true;refreshNumbers();renderMain();return;}
  if(q("[data-rmfoto]")){r.foto="";renderSheet(true);renderMain();return;}
  if(b=q("[data-gcover]")){const i=+b.dataset.gcover;if(i>0)r.fotos.unshift(r.fotos.splice(i,1)[0]);renderSheet(true);renderMain();return;}
  if(b=q("[data-gdel]")){r.fotos.splice(+b.dataset.gdel,1);renderSheet(true);renderMain();return;}
  if(q("[data-pdfdel]")){r.pdf=null;renderSheet(true);renderMain();return;}
  if(b=q("[data-color]")){r.colore=b.dataset.color;refreshNumbers();renderMain();const i=$("f-colore");if(i)i.value=r.colore;return;}
  if(b=q("[data-ocoll]")){const v=b.dataset.ocoll;r.coll=v;if(v==="filati"&&!r.materiale)r.materiale="Fettuccia";if(v==="altri"&&!r.unita)r.unita="pezzi";renderSheet(true);renderMain();return;}
  if(b=q("[data-set]")){const k=b.dataset.set,v=b.dataset.v;r[k]=v;
    if(sheet.coll==="ordini"&&k==="prodotto"&&(r.costo===""||r.costo==null)){const p=byId("prodotti",v);if(p)r.costo=p.prezzo;}
    if(sheet.coll==="prodotti"&&k==="modello"){const m=byId("modelli",v);
      if(m){if(!r.uso||!r.uso.length)r.uso=copyUse(m.uso);if(!r.misure)r.misure=m.misure;if(!r.nome)r.nome=m.nome;if(r.ore===""||r.ore==null)r.ore=m.ore;}}
    renderSheet(true);renderMain();return;}
  if(b=q("[data-utab]")){useTab=b.dataset.utab;picker=false;renderSheet(true);return;}
  if(q("[data-upick]")){picker=!picker;renderSheet(true);return;}
  if(b=q("[data-uadd]")){const it=byId(useTab,b.dataset.uadd);
    (r.uso=r.uso||[]).push({coll:useTab,id:it.id,qty:"",uc:sheet.coll==="prodotti"?freeze(useTab,it.id):undefined,nome:it.nome});
    picker=false;renderSheet(true);renderMain();const inp=document.querySelector(`[data-uqty="${r.uso.length-1}"]`);if(inp)inp.focus();return;}
  if(b=q("[data-urem]")){r.uso.splice(+b.dataset.urem,1);renderSheet(true);renderMain();return;}
  if(b=q("[data-urefresh]")){const u=r.uso[+b.dataset.urefresh];u.uc=freeze(u.coll,u.id);renderSheet(true);renderMain();return;}
  if(q("[data-labor]")){laborOpen=true;renderSheet(true);setTimeout(()=>{const o=$("f-ore");if(o)o.focus();},30);return;}
  if(b=q("[data-action]")){const a=b.dataset.action;
    if(a==="arrive"){const i=sheet.idx;closeSheet();setTimeout(()=>arrive(i),320);return;}
    if(a==="fromModel"){popFromModel(r);return;}
    if(a==="orderFromProduct"){DATA.ordini.unshift({id:uid("r"),cliente:"",prodotto:r.id,costo:r.prezzo,data:isoToday()});go("ordini");openSheet("ordini",0,{focus:true});return;}
  }
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){if(!$("pop").hidden){$("pop").hidden=true;popCtx=null;}else closeSheet();}
  if(e.key==="Enter"&&e.target.matches("label[for]")){const fi=$(e.target.htmlFor);if(fi&&fi.type==="file")fi.click();}
  if(e.key==="Enter"&&e.target.id==="o-nome"){e.preventDefault();addToOrder(false);}
  if(e.key==="Enter"&&e.target.id==="nc-name"){e.preventDefault();saveCat();}
});

/* opening screen: short (about 1.5 s), once per launch, tap to skip */
let splashTimer;
function playSplash(){
  const s=$("splash");clearTimeout(splashTimer);
  s.classList.remove("gone","play");void s.offsetWidth;s.classList.add("play");
  splashTimer=setTimeout(()=>s.classList.add("gone"),1500);
}
$("splash").addEventListener("click",()=>$("splash").classList.add("gone"));
let seen=false;try{seen=sessionStorage.getItem("valb-splash")==="1";sessionStorage.setItem("valb-splash","1");}catch(_){}
if(seen||!SET.splash)$("splash").classList.add("gone");else playSplash();
$("notes-btn").innerHTML=ICON.note;$("set-btn").innerHTML=ICON.impostazioni;
new ResizeObserver(()=>{if(tab==="dashboard")paintCharts();}).observe($("main"));
{let lw=0,lh=0;new ResizeObserver(()=>{const n=$("tabbar");if(n.clientWidth===lw&&n.clientHeight===lh)return;lw=n.clientWidth;lh=n.clientHeight;if(!indMoving)placeInd(false);}).observe($("tabbar"));}
/* first render happens in sync.js, after the saved data is loaded */
