import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import reducers from './src/reducers/index';
import App from './src/components/App';
import config from './config';
import { fetchPosts } from './src/actions/index';

export default function serverRenderer() {
  return (req, res, next) => {
    const store = createStore(
      reducers,
      applyMiddleware(
        thunkMiddleware
      )
    );
    const context = {};
    const markup = (
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App />
        </StaticRouter>
      </Provider>
    );

    store.dispatch(fetchPosts(config.serverUrl))
      .then(response => {
        res.status(200).render('index', {
          initialMarkup: ReactDOMServer.renderToString(markup),
          initialState: store.getState(),
          prod: process.env.NODE_ENV === 'production'
        });
        res.end();
      });

  }
};