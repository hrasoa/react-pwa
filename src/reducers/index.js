import { combineReducers } from 'redux';
import merge from 'lodash.merge';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { posts: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

export default combineReducers({
  entities
});
