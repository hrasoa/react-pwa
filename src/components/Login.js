import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(this.email.value, this.password.value);
          }}
        >
          <ul>
            <li>
              <input
                type="email"
                id="email"
                ref={(input) => { this.email = input; }}
                placeholder="email "
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
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default Login;
