const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=http://0.0.0.0:3000/__webpack_hmr',
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
    inline: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: resolve(__dirname, 'public'),
    port: 3000,
    host: '0.0.0.0',
    stats: 'minimal'
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
};
