import * as actions from './index';

describe('actions', () => {
  it('should creates request types', () => {
    const expectedTypes = {
      REQUEST: 'POST_REQUEST',
      SUCCESS: 'POST_SUCCESS',
      FAILURE: 'POST_FAILURE'
    };
    expect(actions.createRequestTypes('POST')).toEqual(expectedTypes);
  });
});
