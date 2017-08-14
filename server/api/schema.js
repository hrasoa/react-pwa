import { makeExecutableSchema } from 'graphql-tools';
import posts from './posts.json';

const typeDefs = [`
type Post {
  _id: String,
  id: String,
  userId: String,
  title: String,
  body: String
}

type Query {
  post(_id: String): Post
  posts: [Post]
}

schema {
  query: Query
}`];

const prepare = o => ({ ...o, id: o['_id'] });

const resolvers = {
  Query: {
    post: (root, { _id }) => posts.filter(post => post['_id'] === parseInt(_id, 10)).map(prepare)[0],
    posts: () => posts.map(prepare)
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
