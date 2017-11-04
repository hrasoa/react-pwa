import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { handleSubmit, handleSignUp } = this.props;
    return (
      <div>
        <h1>Login / Register</h1>
        <form>
          <ul>
            <li>
              <input
                id="email"
                ref={(input) => { this.email = input; }}
                placeholder="email"
              />
            </li>
            <li>
              <input
                type="password"
                ref={(input) => { this.password = input; }}
                id="password"
              />
            </li>
          </ul>
          <hr />
          <ul>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSignUp(this.email.value, this.password.value);
                }}
                type="button"
              >
                Sign Up
              </button>
            </li>
            <li>or</li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(this.email.value, this.password.value);
                }}
                type="button"
              >
                Sign In
              </button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default Login;
