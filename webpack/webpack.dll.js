const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./config');

module.exports = {
  entry: {
    vendor: commonConfig.vendors.production
  },
  output: {
    path: commonConfig.paths.output,
    filename: '[name].[chunkhash].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new BabiliPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DllPlugin({
      context: process.cwd(),
      path: commonConfig.paths.dllManifest,
      name: '[name]'
    }),
    new ManifestPlugin({
      fileName: commonConfig.fileNames.vendorManifest
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report-vendor.html'
    })
  ]
};