import {
  INVALIDATE_POSTS,
  RECEIVE_POSTS,
  REQUEST_POSTS
} from '../../actions/index';
import { updateItem } from '../utilities';

const defaultPostsState = {
  isFetching: false,
  didInvalidate: false
};

function posts(state = defaultPostsState, action) {
  switch (action.type) {
    case INVALIDATE_POSTS:
      return updateItem(state, { didInvalidate: true });

    case REQUEST_POSTS:
      return updateItem(state, { isFetching: true });

    case RECEIVE_POSTS: {
      return updateItem(
        state, {
          isFetching: false,
          items: action.items.map(item => item.id),
          lastUpdated: action.receivedAt,
          didInvalidate: false
        }
      );
    }

    default:
      return state;
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_POSTS:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return updateItem(state, {
        [action.listingName]: posts(state[action.listingName], action)
      });

    default:
      return state;
  }
};
