import * as selectors from './index';

describe('selectors', () => {
  it('should get the latest posts', () => {
    expect(selectors.getLatestPosts({
      entities: {
        posts: {
          1: { id: 1, title: 'Post 1' },
          2: { id: 2, title: 'Post 2' }
        }
      },
      pagination: {
        latestPosts: { ids: ['1', '2'] }
      }
    })).toEqual({
      ids: ['1', '2'],
      items: [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ]
    });
  });
});
