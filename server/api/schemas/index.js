import { mergeSchemas } from 'graphql-tools';
import usersSchema from './users';
import postsSchema from './posts';
import linkTypeDefs from './linkTypeDefs';

export default mergeSchemas({
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
