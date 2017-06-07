import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
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
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render();
