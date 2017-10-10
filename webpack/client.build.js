const BabiliPlugin = require('babili-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxBuildWebpackPlugin = require('workbox-webpack-plugin');
const envConfig = require('../server/config');
const shared = require('./shared');

const prodVendor = shared.vendors.production;
const extractChunk = new ExtractCssChunks({
  filename: '[name].[chunkhash].css'
});

const workboxSw = require.resolve('workbox-sw');
const workboxAnalytics = require.resolve('workbox-google-analytics');
const workboxCache = require.resolve('workbox-runtime-caching');

module.exports = {
  cache: true,
  entry: {
    main: [
      'regenerator-runtime/runtime',
      shared.paths.entry
    ],
    critical: shared.paths.critical,
    bundle: shared.paths.bundle,
    fonts: shared.paths.fonts,
    vendor: prodVendor
  },
  output: {
    path: shared.paths.output,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    library: '[name]',
    publicPath: envConfig.publicPath
  },
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 9999999, // always return data uri
              mimetype: 'font/truetype'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        include: shared.paths.src
      },
      {
        test: /\.scss$/,
        use: extractChunk.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer'),
                  require('cssnano')({
                    minifyFontValues: false,
                    discardUnused: false
                  })
                ]
              }
            },
            'sass-loader'
          ]
        }),
        include: shared.paths.src
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new StyleLintPlugin(),
    extractChunk,
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main'],
      chunks: ['critical', 'bundle'],
      minChunks: 0
    }),
    new BabiliPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/]
    }),
    new ManifestPlugin({
      fileName: 'bundle.json'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html'
    }),
    new WorkboxBuildWebpackPlugin({
      globPatterns: ['**/*.{js,css,map,gz}'],
      globIgnores: [],
      swSrc: './scripts/sw.js',
      swDest: './clientBuild/sw.js'
    }),
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { from: workboxSw },
      { from: workboxAnalytics },
      { from: workboxCache },
      { from: `${workboxSw}.map` },
      { from: `${workboxAnalytics}.map` },
      { from: `${workboxCache}.map` }
    ])
  ]
};
