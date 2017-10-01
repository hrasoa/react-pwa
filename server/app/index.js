import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import path from 'path';
import helmet from 'helmet';
import webpackConfig from '../../webpack/dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import webpackCommonConfig from '../../webpack/config';
import envConfig from '../config';

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
