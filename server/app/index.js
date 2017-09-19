import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import path from 'path';
import helmet from 'helmet';
import fs from 'fs';
import gzipStatic from 'connect-gzip-static';
import webpackCommonConfig from '../../webpack/config';
import envConfig from '../config';

const app = express();
const outputPath = webpackCommonConfig.paths.output;
const outputServerPath = webpackCommonConfig.paths.outputServer;

app.use(helmet());
app.use(bodyParser.json());
app.use(gzipStatic(outputPath));
app.use(favicon(webpackCommonConfig.paths.favicon));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log("\x1b[35m", 'BUILD COMPLETE -- Listening @ http://localhost:3000');
  });

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('../../webpack/dev');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
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
} else {
  app.use(express.static('clientBuild'));
  const serverRenderer = require(path.join(outputServerPath, 'prod.render.js')).default;
  const clientStats = require(path.join(outputPath, 'stats.json'));
  const bundleManifest = require(path.join(outputPath, 'bundle.json'));
  const mainCss = path.join(outputPath, bundleManifest['main.css']);
  fs.readFile(mainCss, 'utf8', (err, data) => {
    if (err) throw err;
    app.use(serverRenderer({ clientStats, options: {
      criticalCssRaw: data
    } }));
    done();
  });
}
