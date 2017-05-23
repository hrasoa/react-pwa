import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_SINGLE_POST,
  REQUEST_SINGLE_POST
} from '../actions/index';

function updateItem(oldObject = {}, newValues) {
  return { ...oldObject, ...newValues };
}

function updateItemInObject(obj = {}, itemId, newValues) {
  return {
    ...obj,
    [itemId]: updateItem(obj[itemId], newValues)
  };
}

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
        post: updateItemInObject(
          state.post,
          action.post.id,
          { ...action.post, lastUpdated: action.receivedAt }
        )
      };

    default:
      return state;
  }
};
