/* eslint-disable no-underscore-dangle, global-require */
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';
import './critical.scss';
import './style.scss';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = configureStore(
  window.__INITIAL_STATE__,
  { router: routerReducer },
  [middleware]
);
store.runSaga();
delete window.__INITIAL_STATE__;

const App = Root => (
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  </AppContainer>
);

function render() {
  const module = require('./components/App');
  ReactDOM.render(
    App(module.default),
    document.getElementById('root')
  );
}

render();

if (module.hot) {
  module.hot.accept('./components/App', render);
}
