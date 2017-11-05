import { combineReducers } from 'redux';
import merge from 'lodash.merge';
import * as ActionTypes from '../actions/index';
import loader from './loader';
import paginate from './paginate';

// Updates an entity cache in payload to any action with payload.entities.
function entities(state = {}, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }
  return state;
}

const getResultByKey = (action, key) => {
  if (!action.payload || !action.payload.result) {
    return action;
  }
  return {
    ...action,
    payload: {
      ...action.payload,
      ...action.payload[key],
      result: action.payload.result[key]
    }
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
      case ActionTypes.REGISTER.SUCCESS:
        return action.payload.result.user;

      case ActionTypes.LOGOUT_USER:
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
  })
});

export default {
  entities,
  pagination,
  ui
};
