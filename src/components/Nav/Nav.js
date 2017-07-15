import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav className="c-nav">
    <ul>
      <li>
        <Link
          className="c-nav__link"
          title="Home"
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="c-nav__link"
          title="About"
          to="/about"
        >
          About
        </Link>
      </li>
    </ul>
  </nav>
);
