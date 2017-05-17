import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostsItem from './PostsItem';
import { fetchPosts } from '../actions/index';

class PostsListing extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
      {this.props.posts.map(post =>
        <PostsItem
          key={post.id}
          {...post}
        />
      )}
      </div>
    )
  }
}

PostsListing.defaultProps = {
  posts: []
};

PostsListing.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default PostsListing;
