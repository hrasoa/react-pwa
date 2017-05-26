import { combineReducers } from 'redux';
import byId from './byId';
import byListing from './byListing';

export default combineReducers({
  byId,
  byListing
});
