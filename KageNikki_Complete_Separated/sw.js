// Basic service worker for PWA caching
const CACHE = 'kagenikki-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles/app.css'
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});
