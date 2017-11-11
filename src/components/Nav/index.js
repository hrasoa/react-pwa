import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsConnected } from '../../selectors/index';

const links = [
  { title: 'Home', to: '/' },
  { title: 'About', to: '/about' },
  { title: 'Private', to: '/private' }
];

const Nav = ({ isConnected }) => (
  <nav className="c-nav">
    <ul>
      {links.map(link => (
        <li key={link.to}>
          <Link
            className="c-nav__link"
            title={link.title}
            to={link.to}
          >
            {link.title}
          </Link>
        </li>
      ))}
      {!isConnected &&
        (<li>
          <Link
            className="c-nav__link"
            title="Login"
            to="/login"
          >
            Login
          </Link>
        </li>)}
      {isConnected &&
      (<li>
        <Link
          className="c-nav__link"
          title="Profile"
          to="/profile"
        >
          Profile
        </Link>
      </li>)}
    </ul>
  </nav>
);

Nav.propTypes = {
  isConnected: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isConnected: getIsConnected(state)
});

export default connect(mapStateToProps)(Nav);
