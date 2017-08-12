import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import HomePage from '../containers/AsyncHomePage/index';
import PostPage from '../containers/AsyncPostPage/index';
import LoginPage from '../containers/AsyncLoginPage/index';
import PrivateRoute from '../containers/PrivateRoute';
import Profile from '../containers/AsyncProfile/index';
import Worker from '../containers/Worker';
import About from './AsyncAbout/index';
import Nav from './Nav/Nav';
import NotFound from './AsyncNotFound/index';

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
        <Route path="/login" exact component={LoginPage} />
        <Route path="/posts/:id" exact component={PostPage} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Worker>
);
