import { makeExecutableSchema } from 'graphql-tools';
import posts from './posts.json';

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

type PostsEdges {
  cursor: String
  node: Post
}

type Posts {
  totalCount: Int
  pageInfo: PageInfo
  edges: [PostsEdges]
}

type Query {
  post(_id: String): Post
  posts(first: Int, after: String): Posts
}

schema {
  query: Query
}`];

const prepare = o => ({ ...o, id: o['_id'] });

const resolvers = {
  Query: {
    post: (root, { _id }) => prepare(posts.filter(post => post['_id'] === parseInt(_id, 10))[0]),
    posts: (root, { first, after }) => {
      let requestedPosts = [...posts];

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
      };
    }
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
