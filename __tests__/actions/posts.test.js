import * as actionsById from '../../src/actions/posts/byId';

describe('actions by Id', () => {
  it('should invalidate a post', () => {
    const expectedAction = {
      type: actionsById.INVALIDATE_SINGLE_POST,
      postId: 1
    };
    expect(actionsById.invalidateSinglePost(1)).toEqual(expectedAction);
  });
});
