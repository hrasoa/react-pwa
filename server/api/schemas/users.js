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
  userByUsername(username: String!): User
}`];

const resolvers = {
  Query: {
    user: (parent, { id }, { models: { User } }) => User.findById(id),
    userByUsername: (parent, { username }, { models: { User } }) => User.findOne({
      where: { username }
    })
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
