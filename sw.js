(function(global) {
  importScripts('sw-toolbox.js');

  var CACHE_NAME = 'my-pwa-cache-v1';

  var urlsToCache = [
    '/',
    '/style.css',
    '/vendor.js',
    '/vendor.js.gz',
    '/bundle.js',
    '/bundle.js.gz'
  ];

  global.toolbox.options.cache.name = CACHE_NAME;
  global.toolbox.options.debug = true;
  global.toolbox.precache(urlsToCache);
  global.toolbox.router.default = global.toolbox.networkFirst;

  global.toolbox.router.get(/(\.js|\.css|\.gz)$/, toolbox.cacheFirst);

  global.addEventListener('install',
    function(event) { return event.waitUntil(global.skipWaiting()); });
  global.addEventListener('activate',
    function(event) { return event.waitUntil(global.clients.claim()); });

})(self);