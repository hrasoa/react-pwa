import swPrecache from 'sw-precache';
import { resolve } from 'path';
import fs from 'fs';
import webpackConfig from '../webpack/config';
import pkg from '../package.json';
import manifest from '../src/manifest.json';

const publicDir = webpackConfig.paths.output;

swPrecache.generate({
  cacheId: pkg.name,
  verbose: true,
  dontCacheBustUrlsMatching: /./,
  staticFileGlobs: [
    `${publicDir}/*.{js,css,gz}`,
    `${publicDir}/manifest.json`
  ],
  importScripts: [
    '/sw-scripts.js'
  ],
  stripPrefix: publicDir,
  runtimeCaching: [{
    urlPattern: '/',
    handler: 'networkFirst'
  }, {
    urlPattern: '/posts/:id',
    handler: 'networkFirst'
  }, {
    urlPattern: '/about',
    handler: 'cacheFirst'
  }, {
    urlPattern: '/api/:entity',
    handler: 'networkFirst'
  }, {
    urlPattern: '/api/:entity/:id',
    handler: 'networkFirst'
  }, {
    urlPattern: new RegExp('https://fonts.googleapis.com/(.*)'),
    handler: 'cacheFirst'
  }, {
    urlPattern: new RegExp('https://fonts.gstatic.com/(.*)'),
    handler: 'cacheFirst'
  }]
}).then((serviceWorkerString) => {
  fs.writeFile(`${publicDir}/sw.js`, serviceWorkerString);
});
