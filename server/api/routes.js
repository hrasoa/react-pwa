const express = require('express');
const base64 = require('base-64');
const { sendQuery, sendMutation } = require('./client');

const router = express.Router();

router.get('/posts/:id', async (req, res) => {
  try {
    const data = await sendQuery(`
      query GetPost($id: Int!) {
        post(id: $id) {
          id
          body
          title
        }
      }
    `, {
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
    const data = await sendQuery(`{
      latestPosts: posts(limit: 20) {
        totalCount
        pageInfo { endCursor, hasNextPage }
        edges {
          node { id, title }
        }
      }
    }`);
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.get('/user/logout', (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        throw new Error(err);
      }
    });
    res.json({ message: 'Log out success.' });
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.get('/user/current', async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    console.log(authHeader);
/*
    const data = await sendQuery(`
      query CurrentUser($uid: String!) {
        user: userByUid(uid: $uid) {
          id
          uid
        }
      }
    `, {
      variables: { uid }
    });*/

    // res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.post('/user/update', async (req, res) => {
  const uid = req.body.uid;
  try {
    const data = await sendMutation(`
      mutation UpdateUser($input: UserInput!) {
        user: updateUserByUid(input: $input) {
          id
          uid
        }
      }
    `, {
      variables: {
        input: { uid }
      }
    });
    req.session.currentUser = data.user;
    res.json(data);
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.post('/user/register', async (req, res) => {
  const uid = req.body.uid;
  try {
    const data = await sendMutation(`
      mutation CreateUser($input: UserInput!) {
        user: createUser(input: $input) {
          id
          uid
        }
      }
    `, {
      variables: {
        input: { uid }
      }
    });
    req.session.currentUser = data.user;
    res.json(data);
  } catch (e) {
    req.session.currentUser = { uid };
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

module.exports = router;
