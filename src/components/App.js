import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import PostListing from './PostListing';
import NotFound from './NotFound';
import About from './About';


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
