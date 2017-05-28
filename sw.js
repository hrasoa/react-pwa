(function(global) {
  importScripts('sw-toolbox.js');

  var urlsToCache = [
    '/',
    '/style.css',
    '/vendor.js',
    '/vendor.js.gz',
    '/bundle.js',
    '/bundle.js.gz'
  ];

  global.toolbox.cache.name = 'my-pwa-cache-v1';
  global.toolbox.precache(urlsToCache);
  global.toolbox.options.debug = true;
  global.toolbox.router.default = global.toolbox.networkFirst;

  global.addEventListener('install',
    function(event) { return event.waitUntil(global.skipWaiting()); });
  global.addEventListener('activate',
    function(event) { return event.waitUntil(global.clients.claim()); });

})(self);