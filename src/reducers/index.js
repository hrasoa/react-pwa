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

function updateItemsInObject(obj = {}, items) {
  return items.reduce((acc, item) => {
    acc[item.id] = updateItem(obj[item.id], item);
    return acc;
  }, {});
}

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case REQUEST_SINGLE_POST:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_POSTS: {
      const postsById = updateItemsInObject(state.posts, action.posts);
      return {
        ...state,
        isFetching: false,
        posts: {
          ...postsById,
          listing: action.posts.map(post => post.id)
        }
      };
    }

    case RECEIVE_SINGLE_POST:
      return {
        ...state,
        isFetching: false,
        posts: updateItemInObject(
          state.posts,
          action.post.id, {
            ...action.post,
            lastUpdated: action.receivedAt
          }
        )
      };

    default:
      return state;
  }
};
