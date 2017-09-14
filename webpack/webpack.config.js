const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const fs = require('fs');
const commonConfig = require('./config');
const prodVendor = commonConfig.vendors.production;
const devVendor = commonConfig.vendors.dev;
const vendor = [].concat(prodVendor, devVendor);

module.exports = [{
  name: 'client',
  target: 'web',
  entry: {
    bundle: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
      'react-hot-loader/patch',
      'regenerator-runtime/runtime',
      commonConfig.paths.entry
    ],
    vendor
  },
  output: {
    path: commonConfig.paths.output,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: commonConfig.paths.publicPath
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
    contentBase: commonConfig.paths.output
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      filename: '[name].js',
      minChunks: Infinity
    }),
    new StyleLintPlugin(),
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
  entry: path.resolve(__dirname, '../server/serverRenderer.js'),
  output: {
    path: commonConfig.paths.output,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
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
