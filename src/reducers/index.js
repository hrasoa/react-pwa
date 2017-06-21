import { combineReducers } from 'redux';
import merge from 'lodash.merge';
import * as ActionTypes from '../actions/index';
import paginate from './paginate';

// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

const pagination = combineReducers({
  latestPosts: paginate({
    mapActionResults: action => ({
      ...action,
      response: { ...action.response, result: action.response.result.latestPosts }
    }),
    types: [
      ActionTypes.HOME.REQUEST,
      ActionTypes.HOME.SUCCESS,
      ActionTypes.HOME.FAILURE
    ]
  }),
  latestPictures: paginate({
    mapActionResults: action => ({
      ...action,
      response: { ...action.response, result: action.response.result.latestPictures }
    }),
    types: [
      ActionTypes.HOME.REQUEST,
      ActionTypes.HOME.SUCCESS,
      ActionTypes.HOME.FAILURE
    ]
  })
});

export default combineReducers({
  entities,
  pagination
});
