import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import About from './About';
import NotFound from './NotFound';
import PostListing from './PostListing';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.initialState;
  }

  render() {
    return (
      <div className="App">
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <hr/>
        <Switch>
          <Route exact path="/" render={() => <PostListing posts={this.state.posts} />}/>
          <Route path="/about" component={About}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
