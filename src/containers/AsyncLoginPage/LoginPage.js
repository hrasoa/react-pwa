import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from '../../components/Login';
import { signUp, signIn } from '../../middlewares/firebase';
import { getIsConnected } from '../../selectors/index';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignIn(email, password) {
    this.props.signIn({ email, password });
  }

  handleSignUp(email, password) {
    this.props.signUp({ email, password });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    return this.props.isConnected ?
      <Redirect to={from} /> :
      <Login
        handleSignUp={this.handleSignUp}
        handleSignIn={this.handleSignIn}
      />;
  }
}

LoginPage.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isConnected: getIsConnected(state)
});

export default connect(mapStateToProps, { signIn, signUp })(LoginPage);
