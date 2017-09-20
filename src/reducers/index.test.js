import * as reducers from './index';
import * as ActionTypes from '../actions/index';

describe('reducers', () => {
  describe('ui reducer', () => {
    it('should return initial state', () => {
      expect(reducers.ui(undefined, {})).toEqual({
        me: null,
        postContent: {}
      });
    });

    it('should request a post content', () => {
      expect(reducers.ui({}, { type: ActionTypes.POST.REQUEST, id: 1 }))
        .toEqual({
          me: null,
          postContent: {
            1: { isFetching: true, didInvalidate: false }
          }
        });
    });
  });
});
