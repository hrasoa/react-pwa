import express from 'express';
import data from '../src/testData.json';

const router = express.Router();

router.get('/posts', (req, res) => {
  res.send({ posts: data.posts });
});

export default router;
