const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpackProdConfig = require('./webpack.config.prod');

module.exports = {
  entry: {
    vendor: [
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
      'regenerator-runtime/runtime'
    ]
  },
  output: {
    path: webpackProdConfig.output.path,
    filename: '[name].[chunkhash].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ManifestPlugin({
      fileName: 'vendor-manifest.json'
    })
  ]
};