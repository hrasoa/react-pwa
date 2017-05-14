import React from 'react';
import PostsItem from './PostsItem';

export default ({ posts }) => (
  <div>
    {posts.map(post => <PostsItem key={post.id} {...post} />)}
  </div>
);