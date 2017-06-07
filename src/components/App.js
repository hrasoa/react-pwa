import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Home from '../containers/Home';
import PostPage from '../containers/Posts/PostPage';
import About from './About';
import Nav from './Nav/Nav';
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
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/posts/:id" exact component={PostPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Worker>
);
