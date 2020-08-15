
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test', password: "safe", department: "sales"},
        {username: 'test2', password: "safe", department: "eng"},

      ]);
    });
};
