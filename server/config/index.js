/* eslint-disable global-require */
const merge = require('lodash.merge');
const d = require('./default');

const conf = () => {
  switch (process.env.APP_ENV) {
    case 'production':
      return merge({}, d, require('./production'));

    default:
      return merge({}, d, require('./development'));
  }
};

module.exports = conf();

