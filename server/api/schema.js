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
  let requiresList = [...list];

  if (after) {
    const index = requiresList.reduce((acc, listItem, index) => {
      if (listItem._id === parseInt(after, 10)) {
        acc = index;
      }
      return acc;
    }, 0);
    requiresList = requiresList.slice(index + 1);
  }

  if (first) {
    requiresList = requiresList.slice(0, first);
  }

  return {
    totalCount: requiresList.length,
    edges: requiresList.map(listItem => ({
      node: prepare(listItem),
      cursor: listItem._id
    })),
    pageInfo: {
      endCursor: requiresList[requiresList.length - 1]._id,
      nexPage: false
    }
  }
};

const resolvers = {
  User: {
    postsConnection: ({ _id }, args) => {
      const userPosts = posts.filter(post => post.userId === parseInt(_id, 10));
      return paginate(userPosts, args);
    }
  },
  Query: {
    user: (root, { _id }) => prepare(users.filter(user => user['_id'] === parseInt(_id, 10))[0]),
    post: (root, { _id }) => {
      const post = posts.filter(post => post['_id'] === parseInt(_id, 10));
      if (!post.length) {
        throw new Error('Post not found');
      }
      return prepare(post[0]);
    },
    posts: (root, args) => paginate(posts, args)
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
