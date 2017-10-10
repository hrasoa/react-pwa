const path = require('path');

const fileNames = {
  entry: 'index.js',
  critical: 'critical.scss',
  bundle: 'bundle.scss',
  fonts: 'fonts.scss',
  favicon: 'favicon.ico'
};

const srcPath = path.resolve(__dirname, '../src');
const src = file => path.join(srcPath, file);

module.exports = {
  paths: {
    entry: src(fileNames.entry),
    critical: src(fileNames.critical),
    bundle: src(fileNames.bundle),
    fonts: src(fileNames.fonts),
    favicon: src(fileNames.favicon),
    output: path.resolve(__dirname, '../clientBuild'),
    outputServer: path.resolve(__dirname, '../serverBuild'),
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
