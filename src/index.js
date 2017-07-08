/* eslint-disable global-require, no-underscore-dangle */
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';

import './critical.scss';
import './style.scss';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga();
delete window.__INITIAL_STATE__;

const render = () => {
  const Root = require('./components/App').default;
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
}
