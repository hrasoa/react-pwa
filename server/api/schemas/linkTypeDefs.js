export default `
  extend type User {
    posts(
      first: Int
      after: String
    ) : PostsConnection
  }
`;
