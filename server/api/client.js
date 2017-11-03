const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const ApolloClient = require('apollo-client').default;
const fetch = require('node-fetch');
const gql = require('graphql-tag');

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://0.0.0.0:3001/graphql', fetch }),
  cache: new InMemoryCache()
});

const sendQuery = async ({ query, ...rest }) => {
  const response = await client.query({ query: gql`${query}`, ...rest })
    .catch((error) => {
      throw new Error(error);
    });
  return response.data;
};

const sendMutate = async ({ mutation, ...rest }) => {
  const response = await client.mutate({ mutation: gql`${mutation}`, ...rest })
    .catch((error) => {
      throw new Error(error);
    });
  return response.data;
};

module.exports = { sendQuery, sendMutate };
