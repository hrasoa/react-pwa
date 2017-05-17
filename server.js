import express from 'express';
import compression from 'compression';
import apiRouter from './src/api/index';
import config from './config';

const app = express();
app.use('/api', apiRouter);
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

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
