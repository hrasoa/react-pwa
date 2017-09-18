import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import HomePage from '../containers/AsyncHomePage/index';
import PostPage from '../containers/AsyncPostPage/index';
import LoginPage from '../containers/AsyncLoginPage/index';
import PrivateRoute from '../containers/PrivateRoute';
import Profile from '../containers/AsyncProfilePage/index';
import Worker from '../containers/Worker';
import Bundle from './AsyncBundle/index';
import About from './AsyncAbout/index';
import Private from './AsyncPrivate/index';
import Nav from './Nav';
import NotFound from './AsyncNotFound/index';

export default () => (
  <Worker>
    <Bundle />
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
