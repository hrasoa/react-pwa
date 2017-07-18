import React from 'react';
import PropTypes from 'prop-types';
import PostListingItem from './PostListingItem';

const PostListing = ({ latestPosts: { items } }) => (
  <ul className="c-post-listing">
    {items.map(post => (
      <li key={post.id}>
        <PostListingItem {...post} />
      </li>)
    )}
  </ul>
);

PostListing.propTypes = {
  latestPosts: PropTypes.shape({
    items: PropTypes.array
  }).isRequired
};

export default PostListing;
