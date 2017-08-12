import { combineReducers } from 'redux';
import merge from 'lodash.merge';
import * as ActionTypes from '../actions/index';
import loader from './loader';
import paginate from './paginate';


// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}


const getResultByKey = (action, key) => {
  if (!action.response || !action.response.result) {
    return action;
  }
  return {
    ...action,
    response: { ...action.response, result: action.response.result[key] }
  };
};


export const ui = combineReducers({
  postContent: loader({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.POST.REQUEST,
      ActionTypes.POST.SUCCESS,
      ActionTypes.POST.FAILURE
    ]
  }),
  me: (state = null, action) => {
    switch (action.type) {
      case ActionTypes.LOGIN.SUCCESS:
        return action.response.result;

      case ActionTypes.LOGOUT:
      case ActionTypes.LOGIN.FAILURE:
        return null;

      default:
        return state;
    }
  }
});


export const pagination = combineReducers({
  latestPosts: paginate({
    mapActionResults: action => getResultByKey(action, 'latestPosts'),
    types: [
      ActionTypes.HOME.REQUEST,
      ActionTypes.HOME.SUCCESS,
      ActionTypes.HOME.FAILURE
    ]
  }),
  latestPictures: paginate({
    mapActionResults: action => getResultByKey(action, 'latestPictures'),
    types: [
      ActionTypes.HOME.REQUEST,
      ActionTypes.HOME.SUCCESS,
      ActionTypes.HOME.FAILURE
    ]
  })
});


export default combineReducers({
  entities,
  pagination,
  ui
});
