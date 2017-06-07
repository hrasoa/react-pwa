import { Helmet } from 'react-helmet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import thunkMiddleware from 'redux-thunk';
import reducers from '../src/reducers/index';
import config from './config';
import manifest from '../src/manifest.json';
import App from '../src/components/App';

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);

const defaultAssetsManifest = {
  bundleCss: 'bundle.css',
  bundleJs: 'bundle.js',
  vendorJs: 'vendor.js'
};

export default function serverRenderer({
  clientStats,
  serverStats,
  assetsManifest = defaultAssetsManifest
}) {
  return (req, res, next) => {
    const context = {};

      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}
          >
            <App />
          </StaticRouter>
        </Provider>
      );

      if (context.url) {
        res.writeHead(301, {
          Location: context.url
        });
        res.end();
      } else {
        res.status(200).render('index', {
          helmet: Helmet.renderStatic(),
          initialMarkup: markup,
          initialState: store.getState(),
          manifest,
          assetsManifest,
          prod: process.env.NODE_ENV === 'production'
        });
        res.end();
      }
  }
};