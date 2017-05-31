import * as actions from '../../../src/actions/posts/byId';

describe('actions', () => {
  it('should invalidate a post', () => {
    const expectedAction = {
      type: actions.INVALIDATE_SINGLE_POST,
      postId: 1
    };
    expect(actions.invalidateSinglePost(1)).toEqual(expectedAction);
  })
});
