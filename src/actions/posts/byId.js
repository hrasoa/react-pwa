import axios from 'axios';

export const INVALIDATE_SINGLE_POST = 'INVALIDATE_SINGLE_POST';
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST';
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';

export function invalidateSinglePost(postId) {
  return {
    type: INVALIDATE_SINGLE_POST,
    postId
  };
}

export function requestSinglePost(postId) {
  return {
    type: REQUEST_SINGLE_POST,
    postId
  };
}

export function receiveSinglePost(post) {
  return {
    type: RECEIVE_SINGLE_POST,
    postId: post.id,
    post,
    receivedAt: Date.now()
  };
}

export function shouldFetchSinglePost(state, { params }) {
  const post = state.posts.byId[params.id];
  if (!post) {
    return true;
  } else if (!post.body) {
    return true;
  } else if (post.isFetching) {
    return false;
  }
  return post.didInvalidate;
}

export function fetchSinglePost({ serverUrl = '', ...match }) {
  const postId = match.params.id;
  return (dispatch) => {
    dispatch(requestSinglePost(postId));
    return axios.get(`${serverUrl}/api/posts/${postId}`)
      .then(response => dispatch(receiveSinglePost(response.data)))
      .catch(() => dispatch(invalidateSinglePost(postId)));
  };
}

export function fetchSinglePostIfNeeded(match) {
  return (dispatch, getState) => {
    if (shouldFetchSinglePost(getState(), match)) {
      return dispatch(fetchSinglePost(match));
    }
    return Promise.resolve();
  };
}
