const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const apiRouter = require('./routes');
const schema = require('./schemas');
const db = require('./db');
const models = require('./models');
const session = require('../shared/session');

(async () => {
  try {
    const sequelize = await db.connect();
    const app = express();
    app.use(cors());
    app.use(session);
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
