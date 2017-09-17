importScripts('/workbox-sw.js');

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.precache([]);