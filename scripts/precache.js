import swPrecache from 'sw-precache';
import { resolve } from 'path';
import fs from 'fs';
import uglifyJs from 'uglify-js';
import webpackConfig from '../webpack/webpack.config.prod';
import pkg from '../package.json';

const publicDir = webpackConfig.output.path;

swPrecache.generate({
  cacheId: pkg.name,
  dontCacheBustUrlsMatching: /./,
  dynamicUrlToDependencies: {
    '/': [resolve(__dirname, '../server/views/index.ejs')]
  },
  staticFileGlobs: [
    `${publicDir}/{bundle,vendor}.*.{js,css}`
  ],
  navigateFallback: '/',
  navigateFallbackWhitelist: [
    /^\/posts\//,
    /^\/about/
  ],
  stripPrefix: publicDir,
  runtimeCaching: [{
    urlPattern: /api/,
    handler: 'networkFirst'
  }]
}).then((serviceWorkerString) => {
  fs.writeFile(`${publicDir}/sw.js`, uglifyJs.minify(serviceWorkerString).code, (err) => {
    if (err) {
      return console.log(err);
    }
  });
});
