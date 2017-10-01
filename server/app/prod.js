import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import path from 'path';
import helmet from 'helmet';
import fs from 'fs';
import webpackCommonConfig from '../../webpack/config';
import envConfig from '../config';

const app = express();
const outputPath = webpackCommonConfig.paths.output;
const outputServerPath = webpackCommonConfig.paths.outputServer;

const serverRenderer = require(path.join(outputServerPath, 'prod.render.js')).default;
const clientStats = require(path.join(outputPath, 'stats.json'));
const bundleManifest = require(path.join(outputPath, 'bundle.json'));
const mainCss = path.join(outputPath, bundleManifest['main.css']);

app.use(helmet());
app.use(bodyParser.json());
app.use(favicon(webpackCommonConfig.paths.favicon));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

fs.readFile(mainCss, 'utf8', (err, data) => {
  if (err) throw err;
  app.use(serverRenderer({ clientStats, options: {
    criticalCssRaw: data,
    envConfig,
    isProd: true
  } }));
  
  app.listen(3000, () => {
    console.log("\x1b[35m", 'BUILD COMPLETE -- Listening @ :3000');
  });
});
