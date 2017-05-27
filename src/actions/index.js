import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(listingName) {
  return {
    type: REQUEST_POSTS,
    listingName
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts({ listingName, items }) {
  return {
    type: RECEIVE_POSTS,
    items,
    listingName,
    receivedAt: Date.now()
  };
}

export const UPDATE_POSTS = 'UPDATE_POSTS';
function updatePosts({ items }) {
  return {
    type: UPDATE_POSTS,
    items,
    receivedAt: Date.now()
  };
}

export function fetchPosts({ serverUrl = '', listingName }) {
  return (dispatch) => {
    dispatch(requestPosts(listingName));
    return axios.get(`${serverUrl}/api/posts`)
      .then((response) => {
        dispatch(updatePosts({ items: response.data }));
        return dispatch(receivePosts({
          items: response.data,
          listingName
        }));
      });
  };
}

export const INVALIDATE_SINGLE_POST = 'INVALIDATE_SINGLE_POST';
export function invalidateSinglePost(postId) {
  return {
    type: INVALIDATE_SINGLE_POST,
    postId
  };
}

export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST';
function requestSinglePost(postId) {
  return {
    type: REQUEST_SINGLE_POST,
    postId
  };
}

export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
function receiveSinglePost(post) {
  return {
    type: RECEIVE_SINGLE_POST,
    postId: post.id,
    post,
    receivedAt: Date.now()
  };
}

function shouldFetchSinglePost(state, { params }) {
  const postId = params.id;
  const post = state.posts.byId[postId] &&
    state.posts.byId[postId].firstViewed;
  if (!post) {
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
      .catch(error => dispatch(invalidateSinglePost(postId)));
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
