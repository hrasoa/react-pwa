import merge from 'lodash.merge';

export default function loader({
  types,
  mapActionToKey
}) {
  const defaultState = {
    isFetching: false,
    didInvalidate: false
  };

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  const [requestType, successType, failureType] = types;

  function updateLoader(state = defaultState, action) {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        };
      case successType:
        return {
          ...state,
          isFetching: false,
          didInvalidate: false
        };
      case failureType:
        return {
          ...state,
          isFetching: false,
          didInvalidate: true
        };
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
          return merge({}, state, {
            [key]: updateLoader(state[key], action)
          });
        }
        return merge({}, state, updateLoader(state, action));
      default:
        return state;
    }
  };
}
