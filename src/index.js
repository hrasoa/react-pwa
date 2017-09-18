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

function render(Root) {
  ReactDOM.render(
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
