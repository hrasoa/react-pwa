const { makeExecutableSchema } = require('graphql-tools');

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
  cursor: Int
  node: Post
}

type PostsConnection {
  totalCount: Int
  pageInfo: PageInfo
  edges: [PostsEdges]
}

type Query {
  post(id: Int!): Post
  posts(first: Int, after: Int): PostsConnection
  postsByUser(user_id: Int!, first: Int, after: Int): PostsConnection
}
`];

const resolvers = {
  Query: {
    post: (parent, { id }, { models: { Post } }) => Post.findById(id),
    posts: (parent, args, { models: { Post } }) => Post.findAll(),
    postsByUser: (parent, { user_id }) => []
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
