const express = require('express');
const axios = require('axios');
const ApolloClient = require('apollo-client').default;
const gql = require('graphql-tag');

const router = express.Router();
const client = new ApolloClient({
  networkInterface: {
    query: request =>
      axios.post('http://0.0.0.0:3001/graphql', request)
        .then(response => response.data)
        .catch(error => error)
  }
});

const sendQuery = async ({ query, ...rest }) => {
  const response = await client.query({ query: gql`${query}`, ...rest })
    .catch((error) => {
      throw new Error(error);
    });
  return response.data;
};

router.get('/posts', async (req, res) => {
  try {
    const data = await sendQuery({
      query: `{
        posts {
          pageInfo { endCursor, hasNextPage }
          totalCount
          edges {
            cursor
            node { id, title }
          }
        }
      }`
    });
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const data = await sendQuery({
      query: `{
        post(id: ${req.params.id}) {
          id
          title
          body
        }
      }`
    });
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.get('/home', async (req, res) => {
  try {
    const data = await sendQuery({
      query: `{
        latestPosts: posts(first: 20) {
          totalCount
          pageInfo { endCursor, hasNextPage }
          edges {
            node { id, title }
          }
        }
      }`
    });
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
      user: {
        id: '809090',
        username: req.body.username,
        firstName: 'Dummy first name'
      }
    });
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

module.exports = router;
