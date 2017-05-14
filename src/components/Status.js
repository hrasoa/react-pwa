import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code; // eslint-disable-line no-param-reassign
      }
      return children;
    }}
  />
);

Status.propTypes = {
  code: PropTypes.number.isRequired
};

export default Status;
