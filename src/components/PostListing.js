import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostListingItem from './PostListingItem';

class PostListing extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <ul>
        {this.props.posts.map(post => (
          <li key={post.id}>
            <PostListingItem {...post} />
          </li>)
        )}
      </ul>
    );
  }
}

PostListing.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostListing;
