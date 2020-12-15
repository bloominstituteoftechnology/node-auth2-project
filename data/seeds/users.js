
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'andrew', password: "blah", department: "admin" },
        { username: 'paul', password: "blah", department: "worker" },
        { username: 'tierra', password: "blah", department: "worker" },
        { username: 'cheryl', password: "blah", department: "worker" },
      ]);
    });
};
