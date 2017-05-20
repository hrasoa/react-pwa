import {
  RECEIVE_POSTS,
  REQUEST_POSTS
} from '../actions/index';

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        posts: action.posts,
        lastUpdated: action.receivedAt
      };

    default:
      return state;
  }
};
