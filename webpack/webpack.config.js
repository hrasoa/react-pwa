const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const commonConfig = require('./config');
const prodVendor = commonConfig.vendors.production;
const devVendor = commonConfig.vendors.dev;
const vendor = [].concat(prodVendor, devVendor);

function jsLoader(env) {
  return [
    {
      loader: 'babel-loader',
      options: {
        forceEnv: env
      }
    },
    'eslint-loader'
  ]
}

module.exports = [{
  name: 'client',
  target: 'web',
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      commonConfig.paths.entry
    ],
    vendor: vendor
  },
  output: {
    path: commonConfig.paths.output,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: commonConfig.paths.publicPath
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
    contentBase: commonConfig.paths.output
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: jsLoader('web'),
        include: commonConfig.paths.src
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
        include: commonConfig.paths.src
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
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
    path: commonConfig.paths.output,
    filename: '[name].server.js',
    chunkFilename: '[name].server.js',
    libraryTarget: 'commonjs2',
    publicPath: commonConfig.paths.publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: jsLoader('node'),
        exclude: /node_modules/
      }
    ]
  }
}];
