const express = require('express');
const { sendQuery, sendMutate } = require('./client');

const router = express.Router();

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
    const data = await sendQuery({
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

router.post('/register', async (req, res) => {
  try {
    const uid = req.body.uid;
    const data = await sendMutate({
      mutation: `
        mutation CreateUser($input: UserInput!) {
          user: createUser(input: $input) {
            id
            uid
          }
        }
      `,
      variables: {
        input: { uid }
      }
    });
    req.session.currentUser = data.user.id;
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

module.exports = router;
