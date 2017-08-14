/* eslint-disable no-underscore-dangle */
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';
import RootApp from './components/App';
import './critical.scss';
import './style.scss';

const history = createHistory();
const middleware = routerMiddleware(history);

const rehydrateState = window.__ASYNC_COMPONENTS_STATE__;
const store = configureStore(
  window.__INITIAL_STATE__,
  { router: routerReducer },
  [middleware]
);
store.runSaga();
delete window.__ASYNC_COMPONENTS_STATE__;
delete window.__INITIAL_STATE__;

const App = (Root, connectedRoute = false) => (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <AppContainer>
      <Provider store={store}>
        {connectedRoute ?
          <ConnectedRouter history={history}>
            <Root />
          </ConnectedRouter> :
          <BrowserRouter>
            <Root />
          </BrowserRouter>}
      </Provider>
    </AppContainer>
  </AsyncComponentProvider>
);

async function render() {
  const module = await import(
    /* webpackMode: "eager" */
    './components/App'
  );

  ReactDOM.render(
    App(module.default, true),
    document.getElementById('root')
  );
}

asyncBootstrapper(App(RootApp)).then(render);

if (module.hot) {
  module.hot.accept('./components/App', render);
}
