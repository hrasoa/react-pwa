import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';


const postsSelector = state => state.entities.posts;
const picturesSelector = state => state.entities.pictures;
const postSelector = (state, id) => state.entities.posts[id] || {};
const latestPostsSelector = state => state.pagination.latestPosts;
const latestPicturesSelector = state => state.pagination.latestPictures;


export const getPost = createCachedSelector(
  postSelector,
  post => post
)(
  (state, id) => id
);


export const getLatestPosts = createSelector(
  postsSelector,
  latestPostsSelector,
  (posts, latestPosts) => ({
    ...latestPosts,
    items: latestPosts.ids.map(id => posts[id])
  })
);


export const getLatestPictures = createSelector(
  picturesSelector,
  latestPicturesSelector,
  (pictures, latestPictures) => ({
    ...latestPictures,
    items: latestPictures.ids.map(id => pictures[id])
  })
);
