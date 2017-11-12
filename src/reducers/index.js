import { combineReducers } from 'redux';
import merge from 'lodash.merge';
import * as ActionTypes from '../actions';
import paginate from './paginate';

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

// Updates an entity cache in payload to any action with payload.entities.
function entities(state = {}, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }
  return state;
}

function currentUser(state = {}, action) {
  switch (action.type) {
    case ActionTypes.CURRENT_USER.SUCCESS:
    case ActionTypes.REGISTER_USER.SUCCESS:
    case ActionTypes.LOGIN_USER.SUCCESS:
      return {
        ...state,
        id: action.payload.user.id,
        uid: action.payload.user.uid,
        isConnected: true
      };

    case ActionTypes.LOGOUT_USER.SUCCESS:
      return {
        ...state,
        isConnected: false
      };

    default:
      return state;
  }
}

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
  currentUser
};
