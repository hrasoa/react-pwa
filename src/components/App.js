import React from 'react';
import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import About from './About';
import NotFound from './NotFound';
import Posts from '../containers/Posts';

export default () => (
  <div className="App">
    <div>
      <ul>
        <li><Link to="/">Hooome</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
    <hr/>
    <Switch>
      <Route exact path="/" component={Posts}/>
      <Route exact path="/about" component={About}/>
      <Route component={NotFound}/>
    </Switch>
  </div>
);
