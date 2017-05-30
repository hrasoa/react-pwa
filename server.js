import express from 'express';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import gzipStatic from 'connect-gzip-static';
import { resolve } from 'path';
import apiRouter from './api/index';
import config from './config';

const app = express();

app.use(helmet());
app.use('/api', apiRouter);
app.use(gzipStatic(resolve(__dirname, 'public')));
app.use(express.static('public'));
app.use(favicon(resolve(__dirname, 'src', 'favicon.ico')));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const bundler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(bundler, {
    hot: true,
    publicPath: '/',
    stats: 'minimal'
  }));
  app.use(webpackHotMiddleware(bundler.compilers.find(compiler => compiler.name === 'client')));
  app.use(webpackHotServerMiddleware(bundler));
} else {
  const serverRenderer = require('./serverRenderer').default;
  const vendorManifest = require('./public/vendor-manifest.json');
  const bundleManifest = require('./public/bundle-manifest.json');
  app.use(serverRenderer({
    bundleCss: bundleManifest['bundle.css'],
    bundleJs: bundleManifest['bundle.js'],
    vendorJs: vendorManifest['vendor.js']
  }));
}

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
