import config from './config';
import apiRouter from './src/api/index';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.server';
import webpack from 'webpack';
import App from './src/components/App';
import data from './src/testData.json';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { match, RouterContext } from 'react-router'

const bundler = webpack(webpackConfig);
const app = express();

app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  force: true
}));

app.use(webpackDevMiddleware(bundler, {
  stats: 'minimal',
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(bundler, {
  log: console.log // eslint-disable-line no-console
}));

//app.set('view engine', 'ejs');

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/style.css>
    <script>window._initialData_ = ${JSON.stringify(data.contests)}</script>
    <div id=root>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

app.get('/', (req, res) => {
  //match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<App initialContests={data.contests}/>);

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml));
  //});
});

app.use('/api', apiRouter);
app.use(express.static('public'));

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
