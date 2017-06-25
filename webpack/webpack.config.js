const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpackProdConfig = require('./webpack.config.prod');
const webpackDllConfig = require('./webpack.dll');
const dllVendor = webpackDllConfig.entry.vendor;
const devVendor = [
  'react-hot-loader'
];
const vendor = [].concat(dllVendor, devVendor);
const srcDir = path.resolve(__dirname, '../src');

module.exports = [{
  name: 'client',
  target: 'web',
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'regenerator-runtime/runtime',
      path.join(srcDir, 'index.js')
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
        include: srcDir
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          },
          'sass-loader'
        ],
        include: srcDir
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
    new StyleLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}, {
  name: 'server',
  target: 'node',
  entry: path.resolve(__dirname, '../server/serverRenderer.js'),
  output: {
    path: webpackProdConfig.output.path,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  }
}
];
