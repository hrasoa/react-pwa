import React from 'react';
import PostListing from './Posts/PostListing';

export default props =>
  (
    <div>
      <h2>Latest Posts</h2>
      <PostListing {...props} />
    </div>
  );
