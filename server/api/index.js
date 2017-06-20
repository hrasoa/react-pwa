import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/posts', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      res.send(response.data.map(({ id, title }) => ({ id, title })));
    });
});

router.get('/posts/:id', (req, res) => {
  axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
    .then(response => {
      res.send(response.data);
    });
});

router.get('/pictures', (req, res) => {
  axios.get('https://unsplash.it/list')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/home', (req, res) => {
  const posts = axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.data.map(({ id, title }) => ({ id, title })));
  const pictures = axios.get('https://unsplash.it/list')
    .then(response => response.data);

  Promise.all([ posts, pictures ]).then(results => {
    res.send({
      latestPosts: results[0],
      latestPictures: results[1]
    })
  });
});


export default router;
