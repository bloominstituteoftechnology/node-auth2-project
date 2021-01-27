
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "bill", password: "lovecraft" },
        { username: "joey", password: "herbert" },
        { username: "robbie", password: "junger" }
      ]);
    });
};
