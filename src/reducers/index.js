import { combineReducers } from 'redux';
import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_SINGLE_POST,
  REQUEST_SINGLE_POST
} from '../actions/index';

function updateItem(oldObject = {}, newValues) {
  return { ...oldObject, ...newValues };
}

function updateItemByKeyInObject(obj = {}, key, newValues) {
  return {
    ...obj,
    [key]: updateItem(obj[key], newValues)
  };
}

function byId(state = {}, action) {
  switch (action.type) {
    case REQUEST_SINGLE_POST:
      return updateItemByKeyInObject(
        state,
        action.postId, {
          isFetching: true
        }
      );

    case RECEIVE_SINGLE_POST:
      return updateItemByKeyInObject(
        state,
        action.post.id, {
          ...action.post,
          isFetching: false,
          lastUpdated: action.receivedAt,
          lastViewed: action.receivedAt
        }
      );

    default:
      return state;
  }
}

function byListing(state = {}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return updateItemByKeyInObject(
        state,
        action.listingName, {
          isFetching: true
        }
      );

    case RECEIVE_POSTS: {
      return updateItemByKeyInObject(
        state,
        action.listingName, {
          isFetching: false,
          items: action.items,
          lastUpdated: action.receivedAt
        }
      );
    }

    default:
      return state;
  }
}

const posts = combineReducers({
  byId,
  byListing
});

export default combineReducers({
  posts
});
