const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const ApolloClient = require('apollo-client').default;
const fetch = require('node-fetch');
const gql = require('graphql-tag');

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://0.0.0.0:3001/graphql', fetch }),
  cache: new InMemoryCache()
});

const sendQuery = async (query, options) => {
  const response = await client.query({ query: gql`${query}`, ...options })
    .catch((error) => {
      throw new Error(error);
    });
  return response.data;
};

const sendMutation = async (mutation, options) => {
  const response = await client.mutate({ mutation: gql`${mutation}`, ...options })
    .catch((error) => {
      throw new Error(error);
    });
  return response.data;
};

module.exports = { sendQuery, sendMutation };
