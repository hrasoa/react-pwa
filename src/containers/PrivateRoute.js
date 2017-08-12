import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import {
  getIsConnected,
  getConnectedUser
} from '../selectors/index';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.isConnected ? (
        <Component {...props} connectedUser={rest.connectedUser} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  connectedUser: getConnectedUser(state),
  isConnected: getIsConnected(state)
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
