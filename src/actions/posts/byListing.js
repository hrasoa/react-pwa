import axios from 'axios';

export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const UPDATE_POSTS = 'UPDATE_POSTS';

function invalidatePosts(listingName) {
  return {
    type: INVALIDATE_POSTS,
    listingName
  };
}

function requestPosts(listingName) {
  return {
    type: REQUEST_POSTS,
    listingName
  };
}

function receivePosts({ listingName, items }) {
  return {
    type: RECEIVE_POSTS,
    items,
    listingName,
    receivedAt: Date.now()
  };
}

function updatePosts({ items }) {
  return {
    type: UPDATE_POSTS,
    items,
    receivedAt: Date.now()
  };
}

function shouldFetchPosts(state, listingName) {
  const posts = state.posts.byListing[listingName];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
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
      })
      .catch(() => dispatch(invalidatePosts(listingName)));
  };
}

export function fetchPostsIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), params.listingName)) {
      return dispatch(fetchPosts(params));
    }
    return Promise.resolve();
  };
}
