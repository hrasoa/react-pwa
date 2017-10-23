module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Post = require('./post')(sequelize);
  User.hasMany(Post);
  Post.belongsTo(User);
  return {
    User,
    Post
  };
};
