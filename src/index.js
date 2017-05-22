import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';
import './style.scss';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  composeEnhancers(applyMiddleware(
    thunkMiddleware
  ))
);
/* eslint-enable */

delete window.INITIAL_STATE;

const render = () => {
  const routes = require('./routes/index').default; // eslint-disable-line global-require
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./routes/index', render);
  module.hot.accept('./reducers/index', () => {
    const nextRootReducer = require('./reducers/index').default; // eslint-disable-line global-require
    store.replaceReducer(nextRootReducer);
  });
}
