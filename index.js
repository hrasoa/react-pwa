import apiRouter from './api/index';
import config from './config';
import express from 'express';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

const bundler = webpack(webpackConfig);
const app = express();

app.use(webpackDevMiddleware(bundler, {
  publicPath: '/',
  stats: 'minimal'
}));
app.use(webpackHotMiddleware(bundler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(bundler));

app.set('view engine', 'ejs');app.use('/api', apiRouter);

app.use(express.static('public'));

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
