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

export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST';
function requestSinglePost() {
  return { type: REQUEST_SINGLE_POST };
}

export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
function receiveSinglePost(post) {
  return {
    type: RECEIVE_SINGLE_POST,
    post,
    receivedAt: Date.now()
  };
}

export function fetchSinglePost({ serverUrl = '', ...match }) {
  return (dispatch) => {
    dispatch(requestSinglePost());
    return axios.get(`${serverUrl}/api/posts/${match.params.id}`)
      .then(response => dispatch(receiveSinglePost(response.data)));
  };
}
