const webpack = require('webpack');
const { resolve } = require('path');
const HappyPack = require('happypack');

module.exports = [{
  name: 'client',
  target: 'web',
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ],
    vendor: [
      'axios',
      'prop-types',
      'react',
      'react-dom',
      'react-helmet',
      'react-hot-loader',
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
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
    contentBase: resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader'],
        include: resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: resolve(__dirname, 'src')
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
  entry: './serverRenderer.js',
  output: {
    path: resolve(__dirname, 'public'),
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
