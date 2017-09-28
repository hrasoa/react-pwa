import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Helmet from 'react-helmet';
import HomePage from '../containers/AsyncHomePage/index';
import PostPage from '../containers/AsyncPostPage/index';
import LoginPage from '../containers/AsyncLoginPage/index';
import PrivateRoute from '../containers/PrivateRoute';
import Profile from '../containers/AsyncProfilePage/index';
import About from './AsyncAbout/index';
import Bundle from './AsyncBundle/index';
import Private from './AsyncPrivate/index';
import Nav from './Nav';
import NotFound from './AsyncNotFound/index';

export default () => [
  <Helmet key="1">
    <title>My App</title>
    <link rel="canonical" href="http://example.com" />
  </Helmet>,
  <Bundle key="2" />,
  <Nav key="3" />,
  <div key="4" className="o-container">
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
];
