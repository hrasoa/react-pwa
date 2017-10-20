const Sequelize = require('sequelize');

module.exports = sequelize => sequelize.define('post', {
  title: { type: Sequelize.STRING },
  body: { type: Sequelize.TEXT },
  user_id: { type: Sequelize.INTEGER }
});
