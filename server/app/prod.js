const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');
const webpackCommonConfig = require('../../webpack/config');

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
    isProd: true
  } }));

  app.listen(3000, () => {
    console.log("\x1b[35m", 'BUILD COMPLETE -- Listening @ :3000');
  });
});
