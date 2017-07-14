import swPrecache from 'sw-precache';
import { resolve } from 'path';
import fs from 'fs';
import webpackConfig from '../webpack/webpack.config.prod';
import pkg from '../package.json';
import manifest from '../src/manifest.json';

const publicDir = webpackConfig.output.path;

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
  //fs.writeFile(`${publicDir}/sw.js`, uglifyJs.minify(serviceWorkerString).code);
  fs.writeFile(`${publicDir}/sw.js`, serviceWorkerString);
});

fs.readFile(resolve(__dirname, 'sw-scripts.js'), 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }
  //console.log('typeof data', uglifyJs.minify(data));
  //fs.writeFile(`${publicDir}/sw-scripts.js`, uglifyJs.minify(data).code);
  fs.writeFile(`${publicDir}/sw-scripts.js`, data);
});
