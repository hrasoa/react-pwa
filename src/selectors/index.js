import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';


const postsSelector = state => state.entities.posts || {};
const picturesSelector = state => state.entities.pictures || {};
const usersSelector = state => state.entities.users || {};
const postSelector = (state, id) => (state.entities.posts && state.entities.posts[id]) || {};
const latestPostsSelector = state => state.pagination.latestPosts;
const latestPicturesSelector = state => state.pagination.latestPictures;
const meSelector = state => state.ui.me;


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


export const getConnectedUser = createSelector(
  usersSelector,
  meSelector,
  (users, me) => (me && users && users[me]) || {}
);


export const getIsConnected = createSelector(
  getConnectedUser,
  user => typeof user.id !== 'undefined'
);
