import React from 'react';
import PropTypes from 'prop-types';
import PostListingItem from './PostListingItem';

const PostListing = ({ latestPosts }) => (
  <ul className="c-post-listing">
    {latestPosts.map(post => (
      <li key={post.id}>
        <PostListingItem {...post} />
      </li>)
    )}
  </ul>
);

PostListing.propTypes = {
  latestPosts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostListing;
