import React from 'react';
import { Route } from 'react-router-dom';

export default ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code;
    }
    return children;
  }}/>
);
