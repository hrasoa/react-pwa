import React from 'react';
import { renderRoutes } from 'react-router-config';
import {
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

export default withRouter(({ route }) => (
  <div className="App">
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
