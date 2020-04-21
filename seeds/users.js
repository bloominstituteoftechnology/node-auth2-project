const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      const password = "password";
      const hash = [];

      hash[0] = bcrypt.hashSync(password, 8);
      hash[1] = bcrypt.hashSync(password, 8);
      hash[2] = bcrypt.hashSync(password, 8);
      // Inserts seed entries
      return knex('users').insert([
        {username: 'henry', password: hash[0], department: "lambda"}
      ]);
    });
};