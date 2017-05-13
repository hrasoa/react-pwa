import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import './style.scss';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      {Component}
    </AppContainer>,
    document.getElementById('root')
  );
};

render(<App initialState={(window.initialState || [])} />);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    render(<NextApp initialState={(window.initialState || [])} />);
  });
}
