import { Helmet } from 'react-helmet';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import {
  Link,
  withRouter
} from 'react-router-dom';

import '../manifest.json';

export default withRouter(({ route }) => (
  <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FFFFFF" />
      <title>My App</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
    <hr />
    {renderRoutes(route.routes)}
  </div>
));
