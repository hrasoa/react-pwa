import url from 'url';
import express from 'express';
import axios from 'axios';

const router = express.Router();

const getPosts = (params = {}) => {
  const perPage = parseInt(params.query && params.query._perPage || 10, 10);
  const page = parseInt(params.query && params.query._page || 1, 10);
  return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response =>
      response.data.slice((page - 1) * perPage, (page - 1) * perPage + perPage));
};

const getPictures = (params = {}) => {
  const perPage = parseInt(params.query && params.query._perPage || 10, 10);
  const page = parseInt(params.query && params.query._page || 1, 10);
  return axios.get('https://unsplash.it/list')
    .then(response =>
      response.data.slice((page - 1) * perPage, (page - 1) * perPage + perPage));
};

router.get('/posts', (req, res) => {
  getPosts(url.parse(req.url, true)).then(data => {
    res.send(data);
  });
});

router.get('/posts/:id', (req, res) => {
  axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
    .then(response => {
      res.send(response.data);
    });
});

router.get('/pictures', (req, res) => {
  getPictures(url.parse(req.url, true)).then(data => {
    res.send(data);
  });
});

router.get('/home', (req, res) => {
  const posts = getPosts();
  const pictures = getPictures();
  Promise.all([ posts, pictures ]).then(results => {
    res.send({
      latestPosts: results[0],
      latestPictures: results[1]
    })
  });
});


export default router;
