import {
  RECEIVE_SINGLE_POST,
  REQUEST_SINGLE_POST,
  UPDATE_POSTS
} from '../../actions/index';
import {
  updateItemByKeyInObject,
  updateItemsInObject
} from '../utilities';

export default (state = {}, action) => {
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
          firstViewed: action.receivedAt
        }
      );

    case UPDATE_POSTS:
      return updateItemsInObject(
        state,
        action.items.map(item => ({ ...item, lastUpdated: action.receivedAt }))
      );

    default:
      return state;
  }
};
