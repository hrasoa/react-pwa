import {
  INVALIDATE_SINGLE_POST,
  RECEIVE_SINGLE_POST,
  REQUEST_SINGLE_POST,
  UPDATE_POSTS
} from '../../actions/index';
import {
  updateItemsInObject,
  updateItem
} from '../utilities';

const defaultPostState = {
  isFetching: false,
  didInvalidate: false
};

function post(state = defaultPostState, action) {
  switch (action.type) {
    case INVALIDATE_SINGLE_POST:
      return updateItem(state, { didInvalidate: true });

    case REQUEST_SINGLE_POST:
      return updateItem(state, { isFetching: true });

    case RECEIVE_SINGLE_POST:
      return updateItem(state, {
        ...action.post,
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        firstViewed: action.receivedAt
      });

    default:
      return state;
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SINGLE_POST:
    case REQUEST_SINGLE_POST:
    case RECEIVE_SINGLE_POST:
      return updateItem(state, { [action.postId]: post(state[action.postId], action) });

    case UPDATE_POSTS:
      return updateItemsInObject(
        state,
        action.items.map(item => ({ ...item, lastUpdated: action.receivedAt }))
      );

    default:
      return state;
  }
};
