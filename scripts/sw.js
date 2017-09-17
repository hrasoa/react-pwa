importScripts('/workbox-sw.js');
importScripts('/workbox-runtime-caching.js');

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.precache([]);

workboxSW.router.registerRoute(
  '/',
  workboxSW.strategies.networkFirst()
);

workboxSW.router.registerRoute(
  '/about',
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(
  'https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(
  'https://fonts.gstatic.com/(.*)',
  workboxSW.strategies.cacheFirst()
);

const custom = new workbox.runtimeCaching.RequestWrapper();

self.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'navigate') {
    custom.fetchAndCache({ request: new Request(event.data.url) });
  }
});