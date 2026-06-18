const CACHE_NAME = 'speed-reading-trainer-v2';
const ASSETS_TO_CACHE = [
  '.',
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
  'lib/pdf.min.js',
  'lib/pdf.worker.min.js',
  'lib/mammoth.browser.min.js',
  'lib/jszip.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
