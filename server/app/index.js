const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const webpack = require('webpack');
const helmet = require('helmet');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackDev = require('../../webpack/dev');
const shared = require('../../webpack/shared');
const config = require('../config');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(favicon(shared.paths.favicon));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log('\x1b[35m', 'BUILD COMPLETE -- Listening @ :3000');
  });

const bundler = webpack(webpackDev);

app.use(webpackDevMiddleware(bundler, {
  publicPath: config.publicPath,
  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(bundler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(bundler));
bundler.plugin('done', done);
