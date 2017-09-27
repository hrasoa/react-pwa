/* eslint-disable no-underscore-dangle, global-require */
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';
import App from './components/App';
import './critical.scss';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = configureStore(
  window.__INITIAL_STATE__,
  { router: routerReducer },
  [middleware]
);
store.runSaga();
delete window.__INITIAL_STATE__;

history.listen((location) => {
  if (typeof navigator !== 'undefined' &&
    'serviceWorker' in navigator &&
    navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      action: 'navigate',
      url: location.pathname
    });
  }
});

function render(Root) {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Root />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    const NewApp = require('./components/App').default;
    render(NewApp);
  });
}

render(App);
