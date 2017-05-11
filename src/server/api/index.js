import express from 'express';
import data from '../../client/testData';

const router = express.Router();

router.get('/contests', (req, res) => {
  res.send({ contests: data.contests });
});

export default router;
