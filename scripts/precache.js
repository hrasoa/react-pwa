import swPrecache from 'sw-precache';
import { resolve } from 'path';
import fs from 'fs';
import uglifyJs from 'uglify-js';
import webpackConfig from '../webpack/webpack.config.prod';
import pkg from '../package.json';
import manifest from '../src/manifest.json';

const publicDir = webpackConfig.output.path;

swPrecache.generate({
  cacheId: pkg.name,
  verbose: true,
  dontCacheBustUrlsMatching: /./,
  staticFileGlobs: [
    manifest.start_url,
    `${publicDir}/{bundle,vendor}.*.{js,css,gz}`,
    `${publicDir}/manifest.json`
  ],
  importScripts: [
    '/sw-scripts.js'
  ],
  stripPrefix: publicDir,
  runtimeCaching: [{
    urlPattern: '/api/:entity',
    handler: 'networkFirst'
  }, {
    urlPattern: '/api/:entity/:id',
    handler: 'networkFirst'
  }]
}).then((serviceWorkerString) => {
  fs.writeFile(`${publicDir}/sw.js`, uglifyJs.minify(serviceWorkerString).code, (err) => {
    if (err) {
      return console.log(err);
    }
  });
});
