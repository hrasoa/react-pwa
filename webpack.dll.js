var { resolve } = require('path');
var webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

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
    filename: '[name].js',
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
    })
  ]
};