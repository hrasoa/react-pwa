import express from 'express';
import data from '../testData';

const router = express.Router();

router.get('/contests', (req, res) => {
  res.send({ contests: data.contests });
});

export default router;
