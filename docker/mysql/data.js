const users = require('./users.json');
const posts = require('./posts.json');
const db = require('../../server/api/db');
const user = require('../../server/api/models/user');
const post = require('../../server/api/models/post');

(async () => {
  try {
    const sequelize = await db.connect();
    const User = user(sequelize);
    const Post = post(sequelize);
    const dates = {
      created_at: new Date(),
      updated_at: new Date()
    };
    User.bulkCreate(users.map(u => ({ ...u, ...dates })));
    Post.bulkCreate(posts.map(p => ({ ...p, ...dates })));
  } catch (err) {
    console.log(err);
  }
})();