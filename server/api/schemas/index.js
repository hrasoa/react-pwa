const { mergeSchemas } = require('graphql-tools');
const usersSchema = require('./users');
const postsSchema = require('./posts');
const linkTypeDefs = require('./linkTypeDefs');

module.exports = mergeSchemas({
  schemas: [usersSchema, postsSchema, linkTypeDefs],
  resolvers: mergeInfo => ({
    User: {
      posts: {
        fragment: 'fragment UserFragment on User { _id }',
        resolve(parent, args, context, info) {
          const userId = parent._id;
          return mergeInfo.delegate(
            'query',
            'postsByUser',
            {
              userId,
              first: args.first || null,
              after: args.after || null
            },
            context,
            info
          );
        }
      }
    }
  })
});
