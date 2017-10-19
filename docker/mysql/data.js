const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'db',
    user : 'root',
    password : 'password'
  }
});
const users = require('../../server/api/schemas/users.json');
const posts = require('../../server/api/schemas/posts.json');

(async () => {
  await knex
    .withSchema('pwa')
    .table('users')
    .insert(users)
    .catch(console.log);

  await knex
    .withSchema('pwa')
    .table('posts')
    .insert(posts)
    .catch(console.log);

  console.log('Done');
})();