const { mergeSchemas } = require('graphql-tools');
const usersSchema = require('./users');
const postsSchema = require('./posts');
const linkTypeDefs = require('./linkTypeDefs');

module.exports = mergeSchemas({
  schemas: [usersSchema, postsSchema, linkTypeDefs],
  resolvers: mergeInfo => ({
    User: {
      posts: {
        fragment: 'fragment UserFragment on User { id }',
        resolve(_, args, context, info) {
          return mergeInfo.delegate(
            'query',
            'postsByUser',
            {
              user_id: _.id,
              limit: args.limit || null,
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
