const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackDevConfig = require('./webpack.config');

const commonConfig = webpackDevConfig.reduce(function(acc, conf) {
  if (conf.name === 'client') {
    acc.vendor = conf.entry.vendor.filter(function(vendor) {
      return vendor !== 'react-hot-loader';
    });
    acc.output = conf.output;
  }
  return acc;
}, {});

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: commonConfig.vendor
  },
  output: commonConfig.output,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        include: resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
        include: resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'sw.js' }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new ExtractTextPlugin({
      filename: 'style.css'
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
