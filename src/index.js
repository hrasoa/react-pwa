import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './style.scss';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        {Component}
      </BrowserRouter>
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
