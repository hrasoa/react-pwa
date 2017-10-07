export default `
  extend type User {
    postsConnection(
      first: Int
      after: String
    ) : PostsConnection
  }
`;
