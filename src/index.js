import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';
import routes from './routes/index';

import './style.scss';

const store = createStore(
  reducers,
  window.initialState,
  applyMiddleware(
    thunkMiddleware
  )
);

delete window.initialState;

const render = () => {
  const routes = require('./routes').default; // eslint-disable-line global-require
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
  module.hot.accept('./routes', render);
  module.hot.accept('./reducers/index', () => {
    const nextRootReducer = require('./reducers/index'); // eslint-disable-line global-require
    store.replaceReducer(nextRootReducer);
  });
}
