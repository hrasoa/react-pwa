const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const shared = require('../../webpack/shared');

const app = express();
const outputPath = shared.paths.output;
const outputServerPath = shared.paths.outputServer;

const serverRenderer = require(path.join(outputServerPath, 'render.js')).default;
const clientStats = require(path.join(outputPath, 'stats.json'));
const bundleManifest = require(path.join(outputPath, 'bundle.json'));
const criticalCss = path.join(outputPath, bundleManifest['critical.css']);
const commonCss = [bundleManifest['bundle.css'], bundleManifest['fonts.css']];

app.use(helmet());
app.use(bodyParser.json());
app.use(favicon(shared.paths.favicon));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

fs.readFile(criticalCss, 'utf8', (err, criticalCssRaw) => {
  if (err) throw err;
  app.use(serverRenderer({
    clientStats,
    options: {
      commonCss,
      criticalCssRaw,
      isProd: true
    }
  }));

  app.listen(3000, () => {
    console.log('\x1b[35m', 'START  -- Listening @ :3000');
  });
});
