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

  global.toolbox.cache.name = CACHE_NAME;

  global.toolbox.precache(urlsToCache);

})(self);