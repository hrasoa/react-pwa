import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostsItem from './PostsItem';

class PostsListing extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <ul>
        {this.props.posts.map(post => <li><PostsItem key={post.id} {...post} /></li>)}
      </ul>
    );
  }
}

PostsListing.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostsListing;
