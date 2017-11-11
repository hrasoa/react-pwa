const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const expires = new Date();
expires.setFullYear(expires.getFullYear() + 1);

module.exports = session({
  store: new RedisStore({
    client: redis.createClient({ host: 'redis' })
  }),
  resave: true,
  saveUninitialized: false,
  cookie: {
    domain: 'localhost',
    expires: expires - Date.now()
  },
  name: 'sessionId',
  secret: 'keyboard cat'
});
