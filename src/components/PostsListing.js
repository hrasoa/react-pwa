import React from 'react';
import PropTypes from 'prop-types';
import PostsItem from './PostsItem';

const PostsListing = ({ posts }) => (
  <div>
    {posts.map(post => <PostsItem key={post.id} {...post} />)}
  </div>
);

PostsListing.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostsListing;
