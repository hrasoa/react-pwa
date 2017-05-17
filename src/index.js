import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';
import './style.scss';

const store = createStore(
  reducers,
  window.initialState,
  applyMiddleware(
    thunkMiddleware
  )
);

delete window.initialState;

const render = () => {
  const App = require('./components/App').default; // eslint-disable-line global-require
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

if (module.hot) {
  module.hot.accept('./components/App', render);
  module.hot.accept('./reducers/index', () => {
    const nextRootReducer = require('./reducers/index'); // eslint-disable-line global-require
    store.replaceReducer(nextRootReducer);
  });
}
