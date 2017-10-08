const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const shared = require('../../webpack/shared');

const app = express();
const { output, outputServer } = shared.paths;

const serverRenderer = require(path.join(outputServer, 'render.js')).default;
const clientStats = require(path.join(output, 'stats.json'));
const bundleManifest = require(path.join(output, 'bundle.json'));
const mainCss = path.join(output, bundleManifest['main.css']);

app.use(helmet());
app.use(bodyParser.json());
app.use(favicon(shared.paths.favicon));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

fs.readFile(mainCss, 'utf8', (err, criticalCssRaw) => {
  if (err) throw err;
  app.use(serverRenderer({
    clientStats,
    options: {
      criticalCssRaw,
      isProd: true
    }
  }));

  app.listen(3000, () => {
    console.log('\x1b[35m', 'START  -- Listening @ :3000');
  });
});
