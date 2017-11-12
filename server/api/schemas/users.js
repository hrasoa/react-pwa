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
    name: String
    username: String
    email: String
  }

  type Query {
    user(id: Int!): User
    userByUid(uid: String!): User
  }

  type Mutation {
    createUser(input: UserInput!): User
    findOrCreateUserByUid(uid: String!): User
    updateUserByUid(input: UserInput!): User
  }
`];

const resolvers = {
  Query: {
    user: (_, { id }, { models: { User } }) => User.findById(id),
    userByUid: (_, { uid }, { models: { User } }) => User.findOn({ where: { uid } })
  },
  Mutation: {
    createUser: (_, { input }, { models: { User } }) => User.create(input).then(user => user),
    findOrCreateUserByUid: (_, { uid }, { models: { User } }) =>
      User.findOrCreate({ where: { uid } }).spread(user => user),
    updateUserByUid: async (_, { input }, { models: { User } }) => {
      const { uid, ...rest } = input;
      const user = await User.findOne({ where: { uid } });
      return await user.update(rest);
    }
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
