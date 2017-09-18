importScripts('/workbox-sw.prod.v2.0.1js');
importScripts('/workbox-runtime-caching.prod.v2.0.0.js');

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.precache([]);

workboxSW.router.registerRoute(
  '/',
  workboxSW.strategies.networkFirst()
);

workboxSW.router.registerRoute(
  '/posts/(.*)',
  workboxSW.strategies.networkFirst()
);

workboxSW.router.registerRoute(
  '/api/(.*)',
  workboxSW.strategies.networkFirst()
);

workboxSW.router.registerRoute(
  '/about',
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(
  'https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheableResponse: { statuses: [0, 200] }
  })
);

workboxSW.router.registerRoute(
  'https://fonts.gstatic.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheableResponse: { statuses: [0, 200] }
  })
);

const custom = new workbox.runtimeCaching.RequestWrapper();

self.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'navigate') {
    custom.fetchAndCache({ request: new Request(event.data.url) });
  }
});