/* Valb Studio · Gestionale — service worker: l'app si apre anche senza connessione.
   Quando pubblichi una nuova versione, cambia il numero qui sotto (VERSION) così iPhone e iPad la scaricano. */
const VERSION = "valb-2026-11-25-1";
const SHELL = [
  "./", "index.html", "styles.css", "app.js", "sync.js", "config.js", "manifest.webmanifest",
  "vendor/supabase-2.118.0.js",
  "logo/monogramma.png", "logo/scritta.png", "logo/fregio.png",
  "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== "valb-fonts").map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  /* fonts of the opening screen: keep a copy */
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open("valb-fonts").then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok || res.type === "opaque") c.put(req, res.clone());
      return res;
    }));
    return;
  }

  /* only the app's own files; the database (Supabase) always goes to the network */
  if (url.origin !== self.location.origin) return;

  /* app files: answer at once from the copy, and fetch the newest version for next time */
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const res = await net;
    if (res) return res;
    if (req.mode === "navigate") { const home = await c.match("index.html"); if (home) return home; }
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }));
});
