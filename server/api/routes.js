const express = require('express');
const { query, mutate } = require('./client');

const router = express.Router();

router.get('/posts', async (req, res) => {
  try {
    const data = await query({
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
    const data = await query({
      query: `
        query GetPost($id: Int!) {
          post(id: $id) {
            id
            body
            title
          }
        }
      `,
      variables: {
        id: req.params.id
      }
    });
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.get('/home', async (req, res) => {
  try {
    const data = await query({
      query: `{
        latestPosts: posts(limit: 20) {
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

router.post('/login', async (req, res) => {
  try {
    const data = await query({
      query: `
        query GetUser($email: String!) {
          user: userByEmail(email: $email) {
            id
            username
            email
          }
        }
      `,
      variables: {
        email: req.body.email
      }
    });
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.post('/user', async (req, res) => {
  try {
    const uid = req.body.uid;
    const data = await mutate({
      mutation: `
        mutation AddUser($input: UserInput!) {
          user: createUser(input: $input) {
            uid
          }
        }
      `,
      variables: {
        input: { uid }
      }
    });
    req.session.currentUser = uid;
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

module.exports = router;
