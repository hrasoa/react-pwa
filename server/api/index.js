import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/posts', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      res.send(response.data.slice(0, 10).map(({ id, title }) => ({ id, title })));
    });
});

router.get('/posts/:id', (req, res) => {
  axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
    .then(response => {
      res.send(response.data);
    });
});

export default router;
