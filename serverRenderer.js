import { Helmet } from 'react-helmet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import thunkMiddleware from 'redux-thunk';
import reducers from './src/reducers/index';
import config from './config';
import routes from './src/routes/index';
import manifest from './src/manifest.json';

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);

const loadBranchData = location => {
  const branch = matchRoutes(routes, location);
  const promises = branch.map(({ route, match }) => {
    return route && route.component.fetchData
      ? store.dispatch(route.component.fetchData({ ...match, serverUrl: config.serverUrl }))
      : Promise.resolve(null)
  });
  return Promise.all(promises);
};

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
    loadBranchData(req.url).then(response => {
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}
          >
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );
      res.status(200).render('index', {
        helmet: Helmet.renderStatic(),
        initialMarkup: markup,
        initialState: store.getState(),
        manifest,
        assetsManifest,
        prod: process.env.NODE_ENV === 'production'
      });
      res.end();
    });
  }
};