import {
  RECEIVE_POSTS,
  REQUEST_POSTS
} from '../../actions/index';
import {
  updateItemByKeyInObject
} from '../utilities';

export default (state = {}, action) => {
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
          items: action.items.map(item => item.id),
          lastUpdated: action.receivedAt
        }
      );
    }

    default:
      return state;
  }
};
