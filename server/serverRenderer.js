import { Helmet } from 'react-helmet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../src/reducers/index';
import config from './config';
import manifest from '../src/manifest.json';
import App from '../src/components/App';
import configureStore from '../src/store/configureStore';
import rootSaga from '../src/sagas/index';

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
    const store = configureStore();
    const context = {};
    const rootComp = (
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App />
        </StaticRouter>
      </Provider>
    );

    store.runSaga(rootSaga).done.then(() => {
      if (context.url) {
        res.writeHead(301, {
          Location: context.url
        });
        res.end();
      } else {
        const markup = ReactDOMServer.renderToString(rootComp);
        res.status(200).render('index', {
          helmet: Helmet.renderStatic(),
          initialMarkup: markup,
          initialState: JSON.stringify(store.getState()),
          manifest,
          assetsManifest,
          prod: process.env.NODE_ENV === 'production'
        });
        res.end();
      }
    }).catch((e) => {
      console.log(e.message);
      res.status(500).send(e.message);
    });

    ReactDOMServer.renderToString(rootComp);
    store.close();
  }
};