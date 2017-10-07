module.exports = `
  extend type User {
    posts(
      first: Int
      after: String
    ) : PostsConnection
  }
`;
