import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import apiRouter from './routes';
import schema from './schema';
import webpackCommonConfig from '../../webpack/config';
import envConfig from '../config';

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/graphql', bodyParser.json(), (req, res) => {
  if (req.headers['x-access-token'] !== envConfig.secretToken) {
    res.status(403);
  }
  graphqlExpress({ schema })(req, res);
});

if (process.env.APP_ENV !== 'prod') {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

app.listen(3001, () => {
  console.log("\x1b[35m", 'API -- Listening @ http://localhost:3001');
});