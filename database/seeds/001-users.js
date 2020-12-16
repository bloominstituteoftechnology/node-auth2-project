
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Paco',password: '11111',department: 'Watching'},
        {username: 'Shiro',password: '22222',department: 'Outside'},
        {username: 'Monkey',password: '33333',department: 'Atack'}
      ]);
    });
};
