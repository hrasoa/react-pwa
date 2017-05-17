import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/reducers/index';
import App from './src/components/App';

export default function serverRenderer() {
  return (req, res, next) => {
    const store = createStore(reducers);
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

    res.end();
  }
};