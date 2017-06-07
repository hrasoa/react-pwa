import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import rootSaga from './sagas/index';

import './critical.scss';
import './style.scss';

/* eslint-disable no-underscore-dangle */
const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);
delete window.__INITIAL_STATE__;
/* eslint-enable */

const render = () => {
  /* eslint-disable global-require */
  const Root = require('./components/App').default;
  /* eslint-enable */
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/App', render);
  module.hot.accept('./reducers/index', () => {
    /* eslint-disable global-require */
    const nextRootReducer = require('./reducers/index').default;
    /* eslint-enable */
    store.replaceReducer(nextRootReducer);
  });
}
