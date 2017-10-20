const Sequelize = require('sequelize');
const withPagination = require('sequelize-cursor-pagination');

module.exports = (sequelize) => {
  const Post = sequelize.define('post', {
    title: { type: Sequelize.STRING },
    body: { type: Sequelize.TEXT },
    user_id: { type: Sequelize.INTEGER }
  });

  withPagination()(Post);

  return Post;
};
