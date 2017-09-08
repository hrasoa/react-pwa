import express from 'express';
import axios from 'axios';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import config from '../../src/config';
import appConfig from '../../config/index';

const router = express.Router();

const client = new ApolloClient({
  networkInterface: {
    query: request =>
      axios.post(`${config.serverUrl}/graphql`, request, {
        headers: { 'x-access-token': appConfig.secretToken }
      })
        .then(response => response.data)
        .catch(error => error)
  }
});


const sendQuery = async ({ query }) => {
  const response = await client.query({ query: gql`${query}` })
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
        post(_id: "${req.params.id}") {
          id, title, body
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
    res.json({ user: {
      id: '809090',
      username: req.body.username,
      firstName: 'Dummy first name'
    }});
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});


export default router;
