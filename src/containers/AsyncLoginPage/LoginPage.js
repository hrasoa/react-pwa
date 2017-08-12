import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from '../../components/Login';
import { loginRequest } from '../../actions/index';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(email, password) {
    this.props.loginRequest(email, password);
  }

  render() {
    return <Login handleSubmit={this.handleSubmit} />;
  }
}

LoginPage.propTypes = {
  loginRequest: PropTypes.func.isRequired
};

export default connect(null, { loginRequest })(LoginPage);
