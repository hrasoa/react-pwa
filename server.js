import apiRouter from './api/index';
import compression from 'compression';
import config from './config';
import express from 'express';

const app = express();

app.use(express.static('public'));

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
  app.use(compression());
  app.use(serverRenderer());
}

app.use('/api', apiRouter);

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
