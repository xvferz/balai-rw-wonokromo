/* Service worker: offline-first app shell for Pelayanan Balai RW Wonokromo.
 * Strategy: stale-while-revalidate for same-origin GETs. */
const VERSION = 'balai-rw-v9';
const ASSETS = [
  './',
  './index.html',
  './assets/style.css',
  './assets/data.js',
  './assets/app.js',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/img/hero-dtc.jpg',
  './assets/img/stasiun-wonokromo.jpg',
  './assets/img/wonokromo-dulu.jpg',
  './assets/img/wonokromo-kini.jpg',
  './assets/img/balai-kota.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Google Fonts etc. pass through

  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req);
    const net = fetch(req).then((res) => {
      if (res && res.status === 200) cache.put(req, res.clone());
      return res;
    }).catch(() => hit || cache.match('./index.html'));
    return hit || net;
  })());
});
