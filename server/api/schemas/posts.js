const { makeExecutableSchema } = require('graphql-tools');
const { paginate } = require('../utils');

const typeDefs = [`
type PageInfo {
  endCursor: String
  hasNextPage: Boolean
}

type Post {
  id: Int!
  user_id: String
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
  post(id: Int!): Post
  posts(first: Int = 20, after: String): PostsConnection
  postsByUser(user_id: Int!, first: Int = 5, after: String): PostsConnection
}
`];

const resolvers = {
  Query: {
    post: (parent, { id }, { models: { Post } }) => Post.findById(id),
    posts: (parent, args, { models: { Post } }) => paginate(Post, args),
    postsByUser: (parent, args, { models: { Post } }) =>
      paginate(Post, { ...args, where: { user_id: args.user_id } })
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
