import config from './config';
import apiRouter from './src/api/index';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import webpackConfig from './webpack.config';
import webpack from 'webpack';
import serverRenderer from './server';

const bundler = webpack(webpackConfig);
const app = express();

app.use(webpackDevMiddleware(bundler, {
  publicPath: '/',
  stats: 'minimal'
}));
app.use(webpackHotMiddleware(bundler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(bundler));

//app.set('view engine', 'ejs');

//app.use(serverRenderer());

app.use('/api', apiRouter);
app.use(express.static('public'));

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
