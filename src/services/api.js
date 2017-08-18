import {
  normalize,
  schema
} from 'normalizr';
import axios from 'axios';
import config from '../config';


function callApi(endpoint, entitySchema, options) {
  const fullUrl = `${((typeof window === 'undefined') ? config.serverUrl : '')}/api/${endpoint}`;
  const requestOptions = {
    url: fullUrl,
    method: 'get',
    ...options
  };

  return axios(requestOptions)
    .then((response) => {
      // first lets create the normalized tree
      const data = {};
      const extra = {};
      Object.keys(response.data).forEach((dataKey) => {
        const { edges, ...rest } = response.data[dataKey];
        data[dataKey] = edges ? edges.map(edge => edge.node) : rest;
        extra[dataKey] = rest;
      });
      const normalized = normalize(data, entitySchema);

      // then attach other data to the response
      return { response: { ...normalized, ...extra } };
    })
    .catch(response => ({
      error: (response.errors && response.errors[0].message) || 'Something bad happened'
    }));
}


export const getTokenSource = () => {
  const CancelToken = axios.CancelToken;
  return CancelToken.source();
};


const postSchema = new schema.Entity('posts');
const userSchema = new schema.Entity('users');
const postsSchema = [postSchema];
const singlePostSchema = new schema.Object({
  post: postSchema
});
const homeSchema = new schema.Object({
  latestPosts: postsSchema
});


export const fetchPost = ({ id, cancelToken }) => callApi(`posts/${id}`, singlePostSchema, { cancelToken });
export const fetchPosts = ({ cancelToken }) => callApi('posts', postsSchema, { cancelToken });
export const fetchHome = ({ cancelToken }) => callApi('home', homeSchema, { cancelToken });
export const authorize = ({ username, password, cancelToken }) =>
  callApi('login', userSchema, { method: 'post', data: { username, password }, cancelToken });
