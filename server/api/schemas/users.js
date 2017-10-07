import { makeExecutableSchema } from 'graphql-tools';
import { prepare } from '../utils';
import users from './users.json';

const typeDefs = [`
type User {
  _id: String
  name: String
  username: String
  email: String
}

type Query {
  user(_id: String!): User
}`];

const resolvers = {
  Query: {
    user: (parent, { _id }) => prepare(users.filter(user => user._id === parseInt(_id, 10))[0])
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
