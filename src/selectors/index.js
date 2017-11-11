import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

const postsSelector = state => state.entities.posts || {};

const usersSelector = state => state.entities.users || {};

const postSelector = (state, id) => (state.entities.posts && state.entities.posts[id]) || {};

const latestPostsSelector = state => state.pagination.latestPosts;

const currentUserSelector = state => state.currentUser || null;

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
  usersSelector,
  (id, users) => (id && users[id]) || null
);

export const getIsConnected = createSelector(
  currentUserSelector,
  id => id !== null
);
