import { Helmet } from 'react-helmet';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import {
  Link,
  withRouter
} from 'react-router-dom';

export default withRouter(({ route }) => (
  <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <title>My Title</title>
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
