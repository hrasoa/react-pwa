/* eslint-disable global-require */
const merge = require('lodash.merge');
const config = require('./config');

switch (process.env.APP_ENV) {
  case 'dev':
  default:
    module.exports = merge({}, config, require('./config.dev'));
    break;

  case 'prod':
    module.exports = merge({}, config, require('./config.prod'));
    break;
}
