import { Helmet } from 'react-helmet';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import Nav from './Nav/Nav';
import Worker from './Worker';

export default withRouter(({ route }) => (
  <Worker>
    <div className="o-container">
      <Helmet>
        <title>My App</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Nav />
      {renderRoutes(route.routes)}
    </div>
  </Worker>
));
