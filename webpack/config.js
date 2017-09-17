const path = require('path');

const fileNames = {
  entry: 'index.js',
  favicon: 'favicon.ico'
};

const srcPath = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../public');

module.exports = {
  paths: {
    entry: path.join(srcPath, fileNames.entry),
    favicon: path.join(srcPath, fileNames.favicon),
    output: outputPath,
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
      'prop-types',
      'normalizr',
      're-reselect',
      'react',
      'react-universal-component',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'redux',
      'redux-saga',
      'regenerator-runtime/runtime',
      'reselect'
    ]
  },
  fileNames
};
