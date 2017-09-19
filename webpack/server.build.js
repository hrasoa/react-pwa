const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const BabiliPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const commonConfig = require('./config');

module.exports = {
  name: 'server',
  target: 'node',
  entry: [path.resolve(__dirname, '../server/app/render.js')],
  output: {
    path: commonConfig.paths.outputServer,
    filename: 'prod.render.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader/locals',
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new BabiliPlugin(),
    new CopyWebpackPlugin([
      { from: './server' }
    ])
  ]
};
