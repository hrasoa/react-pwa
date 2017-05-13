import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

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
            <li>Home</li>
            <li>About</li>
          </ul>
        </div>
        <hr/>
        <div>
          {this.state.posts.map(post =>
            <PostItem key={post.id} {...post} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
