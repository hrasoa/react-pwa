import { makeExecutableSchema } from 'graphql-tools';
import posts from './posts.json';
import users from './users.json';

const typeDefs = [`
type PageInfo {
  endCursor: String
  hasNextPage: Boolean
}

type Post {
  _id: String
  id: String
  userId: String
  title: String
  body: String
}

type User {
  _id: String
  name: String
  username: String
  email: String
  postsConnection(
    first: Int
    after: String
  ) : PostsConnection
}

type PostsEdges {
  cursor: String
  node: Post
}

type PostsConnection {
  totalCount: Int
  pageInfo: PageInfo
  edges: [PostsEdges]
}

type Query {
  user(_id: String!): User
  post(_id: String!): Post
  posts(first: Int, after: String): PostsConnection
}

schema {
  query: Query
}`];

const prepare = o => ({ ...o, id: o['_id'] });

const paginate = (list, { first, after }) => {
  let requestedPosts = [...list];

  if (after) {
    const index = requestedPosts.reduce((acc, post, index) => {
      if (post._id === parseInt(after, 10)) {
        acc = index;
      }
      return acc;
    }, 0);
    requestedPosts = requestedPosts.slice(index + 1);
  }

  if (first) {
    requestedPosts = requestedPosts.slice(0, first);
  }

  return {
    totalCount: requestedPosts.length,
    edges: requestedPosts.map(post => ({
      node: prepare(post),
      cursor: post._id
    })),
    pageInfo: {
      endCursor: requestedPosts[requestedPosts.length - 1]._id,
      nexPage: false
    }
  }
};

const resolvers = {
  User: {
    postsConnection: ({ _id }, args) => {
      const requestedPosts = posts.filter(post => post.userId === parseInt(_id, 10));
      return paginate(requestedPosts, args);
    }
  },
  Query: {
    user: (root, { _id }) => prepare(users.filter(user => user['_id'] === parseInt(_id, 10))[0]),
    post: (root, { _id }) => prepare(posts.filter(post => post['_id'] === parseInt(_id, 10))[0]),
    posts: (root, args) => paginate(posts, args)
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
