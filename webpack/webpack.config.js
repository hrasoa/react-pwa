const webpack = require('webpack');
const { resolve } = require('path');
const HappyPack = require('happypack');
const webpackProdConfig = require('./webpack.config.prod');
const webpackDllConfig = require('./webpack.dll');
const dllVendor = webpackDllConfig.entry.vendor;
const vendor = [].concat(dllVendor, 'react-hot-loader');

module.exports = [{
  name: 'client',
  target: 'web',
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      resolve(__dirname, '../src/index.js')
    ],
    vendor: vendor
  },
  output: {
    path: webpackProdConfig.output.path,
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
    contentBase: webpackProdConfig.output.path
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader'],
        include: resolve(__dirname, '../src')
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: resolve(__dirname, '../src')
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new HappyPack({
      loaders: ['babel-loader', 'eslint-loader']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}, {
  name: 'server',
  target: 'node',
  entry: resolve(__dirname, '../server/serverRenderer.js'),
  output: {
    path: webpackProdConfig.output.path,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
];
