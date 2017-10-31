import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';
import App from './components/App';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = configureStore({
  initialState: window.__INITIAL_STATE__,
  otherReducers: { router: routerReducer },
  otherMiddlewares: [middleware],
  sagaArgs: {
    firebase: firebase.initializeApp(window.__FIREBASE)
  }
});
store.runSaga();
delete window.__INITIAL_STATE__;
delete window.__FIREBASE;

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
