import createCachedSelector from 're-reselect';


const postsSelector = state => state.entities.posts;
const picturesSelector = state => state.entities.pictures;
const postSelector = (state, id) => state.entities.posts[id];
const latestPostsSelector = state => state.pagination.latestPosts;
const latestPicturesSelector = state => state.pagination.latestPictures;


export const getPost = createCachedSelector(
  postSelector,
  post => post
)(
  (state, id) => id
);

export const getLatestPosts = createCachedSelector(
  postsSelector,
  latestPostsSelector,
  (posts, latestPosts) => latestPosts.ids.map(id => posts[id])
)(
  state => 'latestPosts'
);

export const getLatestPictures = createCachedSelector(
  picturesSelector,
  latestPicturesSelector,
  (pictures, latestPictures) => latestPictures.ids.map(id => pictures[id])
)(
  state => 'latestPictures'
);
