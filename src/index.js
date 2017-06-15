/* eslint-disable global-require, no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import rootSaga from './sagas/index';
import Container from './containers/Container';

import './critical.scss';
import './style.scss';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);
delete window.__INITIAL_STATE__;

const render = () => {
  const Root = require('./components/App').default;
  ReactDOM.render(
    <Container>
      <Provider store={store}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </Provider>
    </Container>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/App', render);
  module.hot.accept('./reducers/index', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}
