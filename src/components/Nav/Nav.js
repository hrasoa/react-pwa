import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  { title: 'Home', to: '/' },
  { title: 'About', to: '/about' },
  { title: 'Login', to: '/login' },
  { title: 'Private', to: '/private' }
];

export default () => (
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
    </ul>
  </nav>
);
