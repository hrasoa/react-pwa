const path = require('path');

const fileNames = {
  bundle: 'bundle.scss',
  bundleManifest: 'bundle.json',
  critical: 'critical.scss',
  entry: 'index.js',
  favicon: 'favicon.ico',
  fontLoader: 'fontLoader.js',
  fonts: 'fonts.scss',
  render: 'render.js',
  stats: 'stats.json',
  sw: 'swRegister.js'
};

const srcPath = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../clientBuild');
const outputPathServer = path.resolve(__dirname, '../serverBuild');
const src = file => path.join(srcPath, file);
const out = file => path.join(outputPath, file);
const outServer = file => path.join(outputPathServer, file);

module.exports = {
  paths: {
    entry: src(fileNames.entry),
    critical: src(fileNames.critical),
    bundle: src(fileNames.bundle),
    bundleManifest: out(fileNames.bundleManifest),
    fonts: src(fileNames.fonts),
    favicon: src(fileNames.favicon),
    fontLoader: out(fileNames.fontLoader),
    render: outServer(fileNames.render),
    stats: out(fileNames.stats),
    sw: out(fileNames.sw),
    output: outputPath,
    outputServer: outputPathServer,
    src: srcPath
  },
  vendors: {
    dev: [
      'react-hot-loader'
    ],
    production: [
      'axios',
      'history',
      'lodash.merge',
      'lodash.union',
      'normalizr',
      'prop-types',
      're-reselect',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'react-universal-component',
      'redux',
      'redux-saga',
      'regenerator-runtime/runtime',
      'reselect'
    ]
  },
  fileNames
};
