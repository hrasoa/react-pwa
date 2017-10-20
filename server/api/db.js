const Sequelize = require('sequelize');

const db = new Sequelize('pwa', 'root', 'password', {
  host: 'db',
  // operatorsAliases: false,
  dialect: 'mysql'
});

module.exports = {
  connect: () =>
    db
      .authenticate()
      .then(() => db)
      .catch((err) => {
        throw new Error('Unable to connect to the database:', err);
      })
};
