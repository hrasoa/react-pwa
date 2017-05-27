import {
  INVALIDATE_POSTS,
  RECEIVE_POSTS,
  REQUEST_POSTS
} from '../../actions/index';
import {
  createReducer,
  updateItem
} from '../utilities';

const defaultPostsState = {
  isFetching: false,
  didInvalidate: false
};

const invalidatePosts = state => updateItem(state, { didInvalidate: true });

const requestPosts = state => updateItem(state, { isFetching: true });

const receivePosts = (state, action) => updateItem(state, {
  isFetching: false,
  items: action.items.map(item => item.id),
  lastUpdated: action.receivedAt,
  didInvalidate: false
});

const posts = createReducer(defaultPostsState, {
  [INVALIDATE_POSTS]: invalidatePosts,
  [REQUEST_POSTS]: requestPosts,
  [RECEIVE_POSTS]: receivePosts
});

const handlePosts = (state, action) => updateItem(state, {
  [action.listingName]: posts(state[action.listingName], action)
});

export default createReducer({}, {
  [INVALIDATE_POSTS]: handlePosts,
  [REQUEST_POSTS]: handlePosts,
  [RECEIVE_POSTS]: handlePosts
});
