import {
  normalize,
  schema
} from 'normalizr';
import axios from 'axios';
import config from '../../config';

function callApi(endpoint, entitySchema) {
  const fullUrl = `${((typeof window === 'undefined') ? config.serverUrl : '')}/api/${endpoint}`;
  return axios.get(fullUrl)
    .then(response => ({ response: normalize(response.data, entitySchema) }))
    .catch(error => ({ error: error.message || 'Something bad happened' }));
}

const postSchema = new schema.Entity('posts');
const pictureSchema = new schema.Entity('pictures');
const postsSchema = new schema.Array(postSchema);
const picturesSchema = new schema.Array(pictureSchema);
const homeSchema = new schema.Object({
  latestPosts: postsSchema,
  latestPictures: picturesSchema
});


export const fetchPost = id => callApi(`posts/${id}`, postSchema);
export const fetchPosts = () => callApi('posts', postsSchema);
export const fetchPictures = () => callApi('pictures', picturesSchema);
export const fetchHome = () => callApi('home', homeSchema);
