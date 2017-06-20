import { combineReducers } from 'redux';
import merge from 'lodash.merge';

// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}


function pagination(state = {}, action) {
  switch (action.type) {
    case 'HOME_SUCCESS':
      return merge({}, state, Object.keys(action.response.result).reduce((acc, key) => {
        acc[key] = { ids: action.response.result[key] };
        return acc;
      }, {}));

    default:
      return state;
  }
}

export default combineReducers({
  entities,
  pagination
});
