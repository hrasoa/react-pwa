const { resolve } = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    vendor: [
      'axios',
      'prop-types',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router-config',
      'react-router-dom',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: process.cwd(),
      path: resolve(__dirname, 'dll', '[name]-manifest.json'),
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