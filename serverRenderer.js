import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import postsApp from './src/reducers/postsApp';
import App from './src/components/App';
import data from './src/testData.json';

export default function serverRenderer() {
  return (req, res, next) => {
    const store = createStore(postsApp, data);
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

    res.status(200).render('index', {
      initialMarkup: ReactDOMServer.renderToString(markup),
      initialState: store.getState(),
      prod: process.env.NODE_ENV === 'production'
    });
  }
};