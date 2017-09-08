const merge = require('lodash.merge');
const config = require('./config');

switch (process.env.APP_ENV) {
  case 'dev':
    module.exports = merge({}, config, require('./config.dev'));
    break;

  case 'qa':
    module.exports = merge({}, config, require('./config.qa'));
    break;

  case 'production':
  default:
    module.exports = merge({}, config, require('./config.prod'));
    break;
}
