import { makeExecutableSchema } from 'graphql-tools';
import { prepare, paginate } from '../utils';
import posts from './posts.json';

const typeDefs = [`
type PageInfo {
  endCursor: String
  hasNextPage: Boolean
}

type Post {
  _id: String!
  id: String
  userId: String
  title: String
  body: String
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
  post(_id: String!): Post
  posts(first: Int, after: String): PostsConnection
  postsByUser(userId: String!, first: String, after: String): PostsConnection
}
`];

const resolvers = {
  Query: {
    post: (parent, { _id }) => {
      const post = posts.filter(p => p._id === parseInt(_id, 10));
      if (!post.length) {
        throw new Error('Post not found');
      }
      return prepare(post[0]);
    },
    posts: (parent, args) => paginate(posts, args),
    postsByUser: (parent, args) => {
      const userPosts = posts.filter(post => post.userId === parseInt(args.userId, 10));
      return paginate(userPosts, args);
    }
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
