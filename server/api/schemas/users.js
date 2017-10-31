const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = [`
type User {
  id: Int!
  name: String
  username: String
  email: String
}

type Query {
  user(id: Int!): User
  userByEmail(email: String!): User
}`];

const resolvers = {
  Query: {
    user: (parent, { id }, { models: { User } }) => User.findById(id),
    userByEmail: (parent, { email }, { models: { User } }) => User.findOne({
      where: { email }
    })
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
