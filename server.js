import apiRouter from './api/index';
import config from './config';
import express from 'express';
import path from 'path';
import serverRenderer from './serverRenderer';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'production') {
  const bundler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(bundler, {
    hot: true,
    publicPath: '/',
    stats: 'minimal'
  }));
  app.use(webpackHotMiddleware(bundler.compilers.find(compiler => compiler.name === 'client')));
  app.use(webpackHotServerMiddleware(bundler));
} else {
  app.use(serverRenderer());
}

app.use('/api', apiRouter);

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
