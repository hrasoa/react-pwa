import merge from 'lodash.merge';
import union from 'lodash.union';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({
  types,
  mapActionToKey,
  mapActionResults = action => action
}) {
  const defaultState = {
    isFetching: false,
    nextPageUrl: null,
    pageCount: 0,
    ids: []
  };

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  const [requestType, successType, failureType] = types;

  function updatePagination(state = defaultState, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        });
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          pageInfo: action.response.pageInfo,
          totalCount: action.response.totalCount,
          didInvalidate: false
        });
      case failureType:
        return merge({}, state, {
          isFetching: false,
          didInvalidate: true
        });
      default:
        return state;
    }
  }

  return (state = mapActionToKey ? {} : defaultState, action) => {
    switch (action.type) {
      case requestType:
      case failureType:
      case successType:
        if (mapActionToKey) {
          const key = mapActionToKey(action);
          if (typeof key !== 'string') {
            throw new Error('Expected key to be a string.');
          }
          return merge({}, state, {
            [key]: updatePagination(state[key], mapActionResults(action))
          });
        }
        return merge({}, state, updatePagination(state, mapActionResults(action)));
      default:
        return state;
    }
  };
}
