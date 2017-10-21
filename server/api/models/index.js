module.exports = (sequelize) => {
  const User = require('./user')(sequelize);
  const Post = require('./post')(sequelize);

  User.hasMany(Post, { foreignKey: 'user_id' });
  Post.hasOne(User, { foreignKey: 'user_id' });

  return {
    User,
    Post
  };
};
