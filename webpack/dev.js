const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const fs = require('fs');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const extractBundle = new ExtractCssChunks();
const shared = require('./shared');
const envConfig = require('../server/config');
const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve('node_modules/.cache/cache-loader')
  }
};

module.exports = [{
  cache: true,
  name: 'client',
  target: 'web',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    shared.paths.entry
  ],
  output: {
    path: shared.paths.output,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: envConfig.publicPath
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          cacheLoader,
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractCssChunks.extract({
          fallback: 'style-loader',
          use: [
            cacheLoader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                importLoaders: 1,
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            'sass-loader'
          ]
        }),
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    symlinks: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        APP_ENV: JSON.stringify(process.env.APP_ENV)
      }
    }),
    new StyleLintPlugin(),
    extractBundle,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}, {
  name: 'server',
  target: 'node',
  entry: [path.resolve(__dirname, '../server/app/render.js')],
  output: {
    path: shared.paths.outputServer,
    filename: 'render.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          cacheLoader,
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          cacheLoader,
          'css-loader/locals',
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    symlinks: false
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}];
