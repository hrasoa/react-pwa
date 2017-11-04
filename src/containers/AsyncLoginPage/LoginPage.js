import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from '../../components/Login';
import { loginRequest, signUpRequest } from '../../actions/index';
import { getIsConnected } from '../../selectors/index';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSubmit(email, password) {
    this.props.loginRequest({ email, password });
  }

  handleSignUp(email, password) {
    this.props.signUpRequest({ email, password });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    return this.props.isConnected ?
      <Redirect to={from} /> :
      <Login
        handleSignUp={this.handleSignUp}
        handleSubmit={this.handleSubmit}
      />;
  }
}

LoginPage.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  loginRequest: PropTypes.func.isRequired,
  signUpRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isConnected: getIsConnected(state)
});

export default connect(mapStateToProps, { loginRequest, signUpRequest })(LoginPage);
