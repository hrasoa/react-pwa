import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import HomePage from '../containers/AsyncHomePage';
import PostPage from '../containers/AsyncPostPage';
import LoginPage from '../containers/AsyncLoginPage';
import PrivateRoute from '../containers/PrivateRoute';
import Profile from '../containers/AsyncProfilePage';
import Worker from '../containers/Worker';
import About from './AsyncAbout';
import Private from './AsyncPrivate';
import Nav from './Nav/Nav';
import NotFound from './AsyncNotFound';

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
        <PrivateRoute path="/private" exact component={Private} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Worker>
);
