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
    .then(response => ({ response: normalize(response.data, entitySchema) }))
    .catch(error => ({
      error: (error.response && error.response.data && error.response.data.message) || 'Something bad happened'
    }));
}


export const getTokenSource = () => {
  const CancelToken = axios.CancelToken;
  return CancelToken.source();
};


const postSchema = new schema.Entity('posts');
const pictureSchema = new schema.Entity('pictures');
const userSchema = new schema.Entity('users');
const postsSchema = new schema.Array(postSchema);
const picturesSchema = new schema.Array(pictureSchema);
const homeSchema = new schema.Object({
  latestPosts: postsSchema,
  latestPictures: picturesSchema
});


export const fetchPost = ({ id, cancelToken }) => callApi(`posts/${id}`, postSchema, { cancelToken });
export const fetchPosts = ({ cancelToken }) => callApi('posts', postsSchema, { cancelToken });
export const fetchPictures = ({ cancelToken }) => callApi('pictures', picturesSchema, { cancelToken });
export const fetchHome = ({ cancelToken }) => callApi('home', homeSchema, { cancelToken });
export const authorize = ({ username, password, cancelToken }) =>
  callApi('login', userSchema, { method: 'post', data: { username, password }, cancelToken });
