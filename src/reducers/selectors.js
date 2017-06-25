export const getPost = (state, id) => state.entities.posts[id];
export const getLatestPosts = state => state.pagination.latestPosts || {};
export const getLatestPictures = state => state.pagination.latestPictures || {};
