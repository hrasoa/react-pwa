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
