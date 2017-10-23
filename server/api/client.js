const axios = require('axios');
const ApolloClient = require('apollo-client').default;
const gql = require('graphql-tag');

const client = new ApolloClient({
  networkInterface: {
    query: request =>
      axios.post('http://0.0.0.0:3001/graphql', request)
        .then(response => response.data)
        .catch(error => error)
  }
});

const sendQuery = async ({ query, ...rest }) => {
  const response = await client.query({ query: gql`${query}`, ...rest })
    .catch((error) => {
      throw new Error(error);
    });
  return response.data;
};

module.exports = sendQuery;
