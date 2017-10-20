const Sequelize = require('sequelize');
const { db } = require('../config');

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  // operatorsAliases: false,
  dialect: 'mysql'
});

module.exports = {
  connect: () =>
    sequelize
      .authenticate()
      .then(() => sequelize)
      .catch((err) => {
        throw new Error('Unable to connect to the database:', err);
      })
};
