const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const extractBundle = new ExtractTextPlugin('[name].[chunkhash].css');
const extractCritical = new ExtractTextPlugin('critical.css');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./config');
const extractConfig = {
  fallback: 'style-loader',
  use: [
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          require('autoprefixer'),
          require('cssnano')
        ]
      }
    },
    'sass-loader'
  ]
};

module.exports = {
  cache: true,
  entry: {
    bundle: [
      'regenerator-runtime/runtime',
      commonConfig.paths.entry
    ]
  },
  output: {
    path: commonConfig.paths.output,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    library: '[name]',
    publicPath: commonConfig.paths.publicPath
  },
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader', 'eslint-loader' ],
        include: commonConfig.paths.src
      },
      {
        test: /style\.scss$/,
        use: extractBundle.extract(extractConfig),
        include: commonConfig.paths.src
      },
      {
        test: /critical\.scss$/,
        use: extractCritical.extract(extractConfig),
        include: commonConfig.paths.src
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new StyleLintPlugin(),
    extractCritical,
    extractBundle,
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(commonConfig.paths.dllManifest)
    }),
    new BabiliPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ManifestPlugin({
      fileName: commonConfig.fileNames.bundleManifest
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html'
    })
  ]
};
