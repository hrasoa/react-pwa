import swPrecache from 'sw-precache';
const { resolve } = require('path');
import webpackConfig from './webpack.config.prod';
import pkg from './package.json';

const publicDir = webpackConfig.output.path;

swPrecache.write(`${publicDir}/sw.js`, {
    cacheId: pkg.name,
    dontCacheBustUrlsMatching: /./,
    dynamicUrlToDependencies: {
        '/': [resolve(__dirname, 'views', 'index.ejs')]
    },
    staticFileGlobs: [
        publicDir + '/bundle.*.{js,css}',
        publicDir + '/vendor.*.{js,css}'
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
});

