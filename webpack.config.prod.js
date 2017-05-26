const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: [
      './src/index.js'
    ],
    vendor: [
      "axios",
      "prop-types",
      "react",
      "react-dom",
      "react-helmet",
      "react-hot-loader",
      "react-redux",
      "react-router-config",
      "react-router-dom",
      "react-router-redux",
      "redux",
      "redux-thunk"
    ]
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        include: resolve(__dirname, 'src')
      },
      {
        test: /manifest\.json$/,
        use: ['file-loader?name=[name].[ext]'],
        include: resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
        include: resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
