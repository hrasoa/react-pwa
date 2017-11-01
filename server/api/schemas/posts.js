const { makeExecutableSchema } = require('graphql-tools');
const { paginate } = require('../utils');

const typeDefs = [`
type PageInfo {
  endCursor: String
  hasNextPage: Boolean
}

type Post {
  id: Int!
  user_id: Int
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
  posts(limit: Int = 20, after: String): PostsConnection
  postsByUser(user_id: Int!, limit: Int = 5, after: String): PostsConnection
}
`];

const resolvers = {
  Query: {
    post: (_, { id }, { models: { Post } }) => Post.findById(id),
    posts: async (_, args, { models: { Post } }) => {
      const data = await Post.paginate(args);
      return paginate(data);
    },
    postsByUser: async (_, args, { models: { Post } }) => {
      const data = await Post.paginate({ ...args, where: { user_id: args.user_id } });
      return paginate(data);
    }
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
