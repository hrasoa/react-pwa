import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import About from './About';
import Nav from './Nav/Nav';
import PostHome from '../containers/Posts/PostHome';
import PostView from '../containers/Posts/PostView';
import NotFound from './NotFound';
import Worker from './Worker';

export default () => (
  <Worker>
    <div className="o-container">
      <Helmet>
        <title>My App</title>
        <link rel="canonical" href="http://example.com" />
      </Helmet>
      <Nav />
      <Switch>
        <Route path="/" exact component={PostHome} />
        <Route path="/about" exact component={About} />
        <Route path="/posts/:id" exact component={PostView} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Worker>
);
