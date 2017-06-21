import React from 'react';
import PostListing from './Posts/PostListing';
import PictureListing from './Pictures/PictureListing';

export default props =>
  (
    <div>
      <h2>Latest Posts</h2>
      <PostListing {...props} />
      <h2>Latest Pictures</h2>
      <PictureListing {...props} />
    </div>
  );
