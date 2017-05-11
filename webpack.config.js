const webpack = require('webpack');
const { resolve } = require('path');

module.exports = [{
  name: 'client',
  target: 'web',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    publicPath: '/',
    contentBase: resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: /src/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/
      }
    ]
  },
  plugins: [
    //new HtmlWebpackPlugin({ template: 'index.ejs' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}, {
  name: 'server',
  target: 'node',
  entry: './server.js',
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
];
