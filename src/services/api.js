import {
  normalize,
  schema
} from 'normalizr';
import axios from 'axios';
import config from '../../config';


function callApi(endpoint, entitySchema, token) {
  const fullUrl = `${((typeof window === 'undefined') ? config.serverUrl : '')}/api/${endpoint}`;
  return axios.get(fullUrl, {
    cancelToken: token
  })
    .then(response => ({ response: normalize(response.data, entitySchema) }))
    .catch(error => ({ error: error.message || 'Something bad happened' }));
}


export const getTokenSource = () => {
  const CancelToken = axios.CancelToken;
  return CancelToken.source();
};


const postSchema = new schema.Entity('posts');
const pictureSchema = new schema.Entity('pictures');
const postsSchema = new schema.Array(postSchema);
const picturesSchema = new schema.Array(pictureSchema);
const homeSchema = new schema.Object({
  latestPosts: postsSchema,
  latestPictures: picturesSchema
});


export const fetchPost = ({ id, token }) => callApi(`posts/${id}`, postSchema, token);
export const fetchPosts = ({ token }) => callApi('posts', postsSchema, token);
export const fetchPictures = ({ token }) => callApi('pictures', picturesSchema, token);
export const fetchHome = ({ token }) => callApi('home', homeSchema, token);
