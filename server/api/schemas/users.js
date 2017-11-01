const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = [`
  type User {
    id: Int!
    uid: String!
    name: String
    username: String
    email: String
  }

  input UserInput {
    uid: String!
  }

  type Query {
    user(id: Int!): User
    userByEmail(email: String!): User
    userByUid(uid: String!): User
  }

  type Mutation {
    createUser(input: UserInput!): User
  }
`];

const resolvers = {
  Query: {
    user: (_, { id }, { models: { User } }) => User.findById(id),
    userByEmail: (_, { email }, { models: { User } }) => User.findOne({
      where: { email }
    }),
    userByUid: (_, { uid }, { models: { User } }) => User.findOne({
      where: { uid }
    })
  },
  Mutation: {
    createUser: (_, { input }, { models: { User } }) => User.create(input).then(user => user)
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
