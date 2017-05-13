import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ message }) => {
  return (
    <h2 className="Header">
      {message}
    </h2>
  );
};

export default Header;
