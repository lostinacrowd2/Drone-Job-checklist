const CACHE = 'fg-v3';
const FILES_TO_CACHE = [
  '/Drone-Job-checklist/',
  '/Drone-Job-checklist/index.html',
  '/Drone-Job-checklist/manifest.json',
  '/Drone-Job-checklist/icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
