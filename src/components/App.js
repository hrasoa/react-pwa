import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import HomePage from '../containers/HomePage';
import PostPage from '../containers/PostPage';
import Worker from '../containers/Worker';
import About from './About';
import Nav from './Nav/Nav';
import NotFound from './NotFound';

export default () => (
  <Worker>
    <Helmet>
      <title>My App</title>
      <link rel="canonical" href="http://example.com" />
    </Helmet>
    <Nav />
    <div className="o-container">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" exact component={About} />
        <Route path="/posts/:id" exact component={PostPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Worker>
);
