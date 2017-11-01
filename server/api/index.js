const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const helmet = require('helmet');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const apiRouter = require('./routes');
const schema = require('./schemas');
const db = require('./db');
const models = require('./models');

(async () => {
  try {
    const sequelize = await db.connect();
    const app = express();
    const now = new Date();
    app.use(session({
      store: new RedisStore({
        client: redis.createClient({ host: 'redis' })
      }),
      resave: true,
      saveUninitialized: false,
      cookie: {
        expires: now.setTime(now.getTime() + 1 * 3600 * 1000)
      },
      secret: 'keyboard cat'
    }));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use('/api', apiRouter);
    app.use('/graphql', bodyParser.json(), graphqlExpress({
      context: {
        models: models(sequelize)
      },
      schema
    }));
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
    app.listen(3001, () => {
      console.log('\x1b[35m', 'API -- Listening @ :3001'); // eslint-disable-line no-console
    });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();
