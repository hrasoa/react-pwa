import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { loadCurrentUser } from '../actions';
import { getIsConnected } from '../selectors';
import HomePage from '../containers/AsyncHomePage/index';
import PostPage from '../containers/AsyncPostPage/index';
import LoginPage from '../containers/AsyncLoginPage/index';
import PrivateRoute from '../containers/PrivateRoute';
import Profile from '../containers/AsyncProfilePage/index';
import About from './AsyncAbout/index';
import Private from './AsyncPrivate/index';
import Nav from './Nav';
import NotFound from './AsyncNotFound/index';

class App extends Component {
  componentWillMount() {
    if (this.props.isConnected === true) {
      this.props.loadCurrentUser();
    }
  }

  render() {
    return [
      <Helmet key="1">
        <title>My App</title>
        <link rel="canonical" href="http://example.com" />
      </Helmet>,
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
  }
}

App.propTypes = {
  loadCurrentUser: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isConnected: getIsConnected(state)
});

export default withRouter(connect(mapStateToProps, { loadCurrentUser })(App));
