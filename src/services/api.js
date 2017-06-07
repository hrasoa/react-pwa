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

export const toto = '1';

export const fetchPost = id => callApi(`posts/${id}`, postSchema);
