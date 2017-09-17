const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const BabiliPlugin = require('babili-webpack-plugin');
const commonConfig = require('./config');

module.exports = {
  name: 'server',
  target: 'node',
  entry: [path.resolve(__dirname, '../server/serverRenderer.js')],
  output: {
    path: commonConfig.paths.output,
    filename: '[name].server.js',
    libraryTarget: 'commonjs2'
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
        NODE_ENV: JSON.stringify('production'),
        APP_ENV: JSON.stringify(process.env.APP_ENV)
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new BabiliPlugin()
  ]
};
