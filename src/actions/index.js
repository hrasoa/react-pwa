import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts() {
  return { type: REQUEST_POSTS };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
    receivedAt: Date.now()
  };
}

export function fetchPosts({ serverUrl = '' }) {
  return (dispatch) => {
    dispatch(requestPosts());
    return axios.get(`${serverUrl}/api/posts`)
      .then(response => dispatch(receivePosts(response.data)));
  };
}
