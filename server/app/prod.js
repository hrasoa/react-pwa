const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const shared = require('../../webpack/shared');

const app = express();
const outputPath = shared.paths.output;
const serverRenderer = require(shared.paths.render).default;
const clientStats = require(shared.paths.stats);
const bundleManifest = require(shared.paths.bundleManifest);
const criticalCss = path.join(outputPath, bundleManifest['critical.css']);

app.use(helmet());
app.use(bodyParser.json());
app.use(favicon(shared.paths.favicon));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

const readFile = file => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, content) => {
    if (err) reject(err);
    resolve(content);
  });
});

(async () => {
  try {
    const critical = readFile(criticalCss);
    const fontLoader = readFile(shared.paths.fontLoader);
    const sw = readFile(shared.paths.sw);
    const criticalCssRaw = await critical;
    const fontLoaderRaw = await fontLoader;
    const swRaw = await sw;

    app.use(serverRenderer({
      clientStats,
      options: {
        bundleCss: bundleManifest['bundle.css'],
        fontsCss: bundleManifest['fonts.css'],
        criticalCssRaw,
        fontLoaderRaw,
        swRaw,
        isProd: true
      }
    }));

    app.listen(3000, () => {
      console.log('\x1b[35m', 'START  -- Listening @ :3000');
    });
  } catch (err) {
    console.log(err);
  }
})();
