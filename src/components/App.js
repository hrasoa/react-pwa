import { Helmet } from 'react-helmet';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Worker from './Worker';

export default withRouter(({ route }) => (
  <Worker>
    <div className="App">
      <Helmet>
        <title>My App</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <ul>
          <li><Link to="/">Home !!</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      <hr />
      {renderRoutes(route.routes)}
    </div>
  </Worker>
));
