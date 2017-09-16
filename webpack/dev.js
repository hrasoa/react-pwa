const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const fs = require('fs');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const commonConfig = require('./config');
const extractBundle = new ExtractCssChunks();

const res = p => path.resolve(__dirname, p);

const nodeModules = res('../node_modules');
// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals
  }, {});

externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = [{
  name: 'client',
  target: 'web',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    'regenerator-runtime/runtime',
    commonConfig.paths.entry
  ],
  output: {
    path: commonConfig.paths.output,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: commonConfig.paths.publicPath
  },
  devtool: 'source-map',
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
        use: ExtractCssChunks.extract({
          fallback: 'style-loader',
          use: [
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
  plugins: [
    new StyleLintPlugin(),
    extractBundle,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}, {
  name: 'server',
  target: 'node',
  entry: [path.resolve(__dirname, '../server/serverRenderer.js')],
  output: {
    path: commonConfig.paths.output,
    filename: '[name].server.js',
    libraryTarget: 'commonjs2'
  },
  externals,
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
          'css-loader/locals',
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
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
