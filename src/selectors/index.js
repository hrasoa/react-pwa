import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

const postsSelector = state => state.entities.posts || {};

const usersSelector = state => state.entities.users || {};

const postSelector = (state, id) => (state.entities.posts && state.entities.posts[id]) || {};

const latestPostsSelector = state => state.pagination.latestPosts;

const currentUserSelector = state => state.currentUser || {};

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

export const getCurrentUser = createSelector(
  currentUserSelector,
  user => user
);

export const getCurrentUserEntity = createSelector(
  currentUserSelector,
  usersSelector,
  (user, users) => (user.id && users[user.id]) || null
);

export const getIsConnected = createSelector(
  currentUserSelector,
  user => user.isConnected === true
);
