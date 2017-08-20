import url from 'url';
import express from 'express';
import axios from 'axios';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import config from '../../src/config';
const router = express.Router();

const client = new ApolloClient({
  networkInterface: {
    query: request =>
      axios.post(`${config.serverUrl}/graphql`, request)
        .then(response => response.data)
        .catch(error => error)
  }
});


const sendQuery = async (req, res, { query }) => {
  try {
    const response = await client.query({ query: gql`${query}` })
      .catch((error) => {
        throw new Error(error);
      });
    res.json(response.data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
};


router.get('/posts', (req, res) => sendQuery(req, res, {
  query: `{
    posts {
      pageInfo { endCursor, hasNextPage }
      totalCount
      edges {
        cursor
        node { id, title }
      }
    }
  }`})
);


router.get('/posts/:id', (req, res) => sendQuery(req, res, {
  query: `{
    post(_id: "${req.params.id}") {
      id, title, body
    }
  }`})
);


router.get('/home', (req, res) => sendQuery(req, res, {
  query: `{
    latestPosts: posts(first: 20) {
      totalCount
      pageInfo { endCursor, hasNextPage }
      edges {
        node { id, title }
      }
    }
  }`})
);


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
