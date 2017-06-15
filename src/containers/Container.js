/* eslint-disable global-require */
import React from 'react';

export default ({ children }) => {
  if (module.hot) {
    const AppContainer = require('react-hot-loader').AppContainer;
    return <AppContainer>{children}</AppContainer>;
  }
  return children;
};
