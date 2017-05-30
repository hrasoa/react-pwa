(function(global) {
  importScripts('sw-toolbox.js');
  global.toolbox.options.cache.name = 'my-pwa-cache-v1';
  global.toolbox.options.debug = true;
  global.toolbox.precache([
    '/',
    '/bundle.*.css',
    '/bundle.*.js',
    '/vendor.*.js'
  ]);
  global.toolbox.router.default = global.toolbox.networkFirst;
  global.toolbox.router.get(/(\.js|\.css|\.gz)$/, toolbox.cacheFirst);
  global.addEventListener('install', function(event) {
    return event.waitUntil(global.skipWaiting());
  });
  global.addEventListener('activate', function(event) {
    return event.waitUntil(global.clients.claim());
  });
})(self);