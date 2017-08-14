import url from 'url';
import express from 'express';
import axios from 'axios';
import config from '../../src/config';
const router = express.Router();


const sendQuery = async (query) => {
  const response = await axios.post(`${config.serverUrl}/graphql`, {query})
    .catch((error) => {
      throw new Error(error);
    });
  return response.data;
};


const getPosts = sendQuery.bind(null, 'query { posts { id, title } }');


router.get('/posts', async (req, res) => {
  try {
    const { data } = await getPosts();
    res.json(data.posts);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});


router.get('/posts/:id', async (req, res) => {
  try {
    const { data } = await sendQuery(`query { post(_id:"${req.params.id}") { id, title, body } }`);
    res.json(data.post);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});


router.get('/home', async (req, res) => {
  try {
    const { data } = await sendQuery(`
      query {
        latestPosts: posts { id, title }
      }
    `);
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});


router.post('/login', (req, res) => {
  try {
    if (req.body.password !== '123') {
      throw new Error('Invalid password');
    }
    res.json({
      id: 809090,
      username: req.body.username,
      firstName: 'Dummy first name'
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});


export default router;
