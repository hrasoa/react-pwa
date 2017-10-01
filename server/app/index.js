const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const webpack = require('webpack');
const path = require('path');
const helmet = require('helmet');
const webpackConfig = require('../../webpack/dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackCommonConfig = require('../../webpack/config');
const envConfig = require('../config');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(favicon(webpackCommonConfig.paths.favicon));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log("\x1b[35m", 'BUILD COMPLETE -- Listening @ :3000');
  });

const bundler = webpack(webpackConfig);

app.use(webpackDevMiddleware(bundler, {
  publicPath: envConfig.publicPath,
  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(bundler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(bundler));
bundler.plugin('done', done);
