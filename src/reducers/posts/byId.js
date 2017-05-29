import {
  INVALIDATE_SINGLE_POST,
  RECEIVE_SINGLE_POST,
  REQUEST_SINGLE_POST,
  UPDATE_POSTS
} from '../../actions/index';
import {
  createReducer,
  updateItemsInObject,
  updateItem
} from '../utilities';

const defaultPostState = {
  isFetching: false,
  didInvalidate: false
};

const invalidatePost = state => updateItem(state, { didInvalidate: true });

const requestPost = state => updateItem(state, { isFetching: true });

const receivePost = (state, action) => updateItem(state, {
  ...action.post,
  isFetching: false,
  didInvalidate: false,
  lastUpdated: action.receivedAt
});

const updatePost = (state, action) => updateItemsInObject(
  state,
  action.items.map(item => ({ ...item, lastUpdated: action.receivedAt }))
);

const post = createReducer(defaultPostState, {
  [INVALIDATE_SINGLE_POST]: invalidatePost,
  [REQUEST_SINGLE_POST]: requestPost,
  [RECEIVE_SINGLE_POST]: receivePost
});

const handlePost = (state, action) => updateItem(state, {
  [action.postId]: post(state[action.postId], action)
});

export default createReducer({}, {
  [INVALIDATE_SINGLE_POST]: handlePost,
  [REQUEST_SINGLE_POST]: handlePost,
  [RECEIVE_SINGLE_POST]: handlePost,
  [UPDATE_POSTS]: updatePost
});
