const path = require('path');

const fileNames = {
  entry: 'index.js',
  vendorManifest: 'vendor-manifest.json',
  bundleManifest: 'bundle-manifest.json',
  favicon: 'favicon.ico'
};

const srcPath = path.resolve(__dirname, '../src');
const dllPath = path.resolve(__dirname, '../dll');
const outputPath = path.resolve(__dirname, '../public');

module.exports = {
  paths: {
    bundleManifest: path.join(outputPath, fileNames.bundleManifest),
    dll: dllPath,
    dllManifest: path.join(dllPath, fileNames.vendorManifest),
    entry: path.join(srcPath, fileNames.entry),
    favicon: path.join(srcPath, fileNames.favicon),
    output: outputPath,
    publicPath: '/',
    src: srcPath,
    vendorManifest: path.join(outputPath, fileNames.vendorManifest)
  },
  vendors: {
    dev: [
      'react-hot-loader'
    ],
    production: [
      'axios',
      'lodash.merge',
      'lodash.union',
      'prop-types',
      'normalizr',
      'react',
      'react-async-bootstrapper',
      'react-async-component',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-saga',
      'regenerator-runtime/runtime',
      'reselect',
      're-reselect'
    ]
  },
  fileNames: fileNames
};
