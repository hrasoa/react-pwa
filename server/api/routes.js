const express = require('express');
const sendQuery = require('./client');

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

router.post('/login', async (req, res) => {
  try {
    const data = await sendQuery({
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

router.get('/user', (req, res) => {
  console.log(req.session.uid);
  if (!req.session.uid) {
    req.session.uid = '3fIkepr2dJdb0szOJFE7YvwS31k2';
  }
  res.json({ uid: req.session.uid || null });
});

module.exports = router;
