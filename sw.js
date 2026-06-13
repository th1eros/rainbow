const CACHE = 'abitat-v2';
const URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/assets/logo.png',
  '/manifest.json',
  '/components/dashboard.html',
  '/components/assets/list.html',
  '/components/assets/create.html',
  '/components/vulns/list.html',
  '/components/vulns/create.html',
  '/components/scans/list.html',
  '/components/scans/start.html',
  '/components/labs/list.html',
  '/components/labs/deploy.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(URLS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});