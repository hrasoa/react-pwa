import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_SINGLE_POST,
  REQUEST_SINGLE_POST,
  LEAVE_SINGLE_POST
} from '../actions/index';

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case REQUEST_SINGLE_POST:
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

    case RECEIVE_SINGLE_POST:
      return {
        ...state,
        isFetching: false,
        post: {
          [action.post.id]: { ...action.post, lastUpdated: action.receivedAt }
        },
        selectedPost: action.post.id
      };

    case LEAVE_SINGLE_POST:
      return {
        ...state,
        selectedPost: null
      };

    default:
      return state;
  }
};
