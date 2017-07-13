const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HappyPack = require('happypack');
const ManifestPlugin = require('webpack-manifest-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const extractBundle = new ExtractTextPlugin('[name].[chunkhash].css');
const extractCritical = new ExtractTextPlugin('critical.css');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
const srcDir = path.resolve(__dirname, '../src');

module.exports = {
  cache: true,
  entry: {
    bundle: [
      path.join(srcDir, 'index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    library: '[name]'
  },
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader'],
        include: srcDir
      },
      {
        test: /style\.scss$/,
        use: extractBundle.extract(extractConfig),
        include: srcDir
      },
      {
        test: /critical\.scss$/,
        use: extractCritical.extract(extractConfig),
        include: srcDir
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HappyPack({
      loaders: [ 'babel-loader', 'eslint-loader' ]
    }),
    new StyleLintPlugin(),
    extractCritical,
    extractBundle,
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.resolve(__dirname, '../dll/vendor-manifest.json'))
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ManifestPlugin({
      fileName: 'bundle-manifest.json'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html'
    })
  ]
};
