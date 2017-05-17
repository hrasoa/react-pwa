import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/posts', (req, res) => {
  axios.get('http://jsonplaceholder.typicode.com/posts')
    .then(response => {
      res.send(response.data);
    });
});

export default router;
