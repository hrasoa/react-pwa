/* eslint-disable global-require, no-underscore-dangle */
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';
import './critical.scss';
import './style.scss';


const rehydrateState = window.__ASYNC_COMPONENTS_STATE__;
const store = configureStore(window.__INITIAL_STATE__);
store.runSaga();
delete window.__INITIAL_STATE__;


const App = Root => (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  </AsyncComponentProvider>
);

const render = () => {
  const NewRoot = require('./components/App').default;
  ReactDOM.render(
    App(NewRoot),
    document.getElementById('root')
  );
};

asyncBootstrapper(App(require('./components/App').default)).then(render);

if (module.hot) {
  module.hot.accept('./components/App', render);
}
