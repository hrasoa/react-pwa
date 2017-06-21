import React from 'react';
import PropTypes from 'prop-types';
import PostListingItem from './PostListingItem';

const PostListing = ({ latestPosts: { ids }, posts }) => (
  <ul className="c-post-listing">
    {ids && ids.map(postId => (
      <li key={postId}>
        <PostListingItem {...posts[postId]} />
      </li>)
    )}
  </ul>
);

PostListing.propTypes = {
  latestPosts: PropTypes.shape({
    ids: PropTypes.array
  }).isRequired,
  posts: PropTypes.shape({
    id: PropTypes.number
  }).isRequired
};

export default PostListing;
