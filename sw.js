var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  '/',
  '/style.css',
  '/vendor.js',
  '/vendor.js.gz',
  '/bundle.js',
  '/bundle.js.gz'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});