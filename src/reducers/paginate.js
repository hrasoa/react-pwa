import merge from 'lodash.merge';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({ types, mapActionResults = action => action }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  const [requestType, successType, failureType] = types;

  function updatePagination(state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        });
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: action.response.result,
          pageCount: state.pageCount + 1,
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

  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case failureType:
        return merge({}, state, updatePagination(state, action));
      case successType:
        return merge({}, state, updatePagination(state, mapActionResults(action)));
      default:
        return state;
    }
  };
}
