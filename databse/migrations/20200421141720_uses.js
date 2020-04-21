exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
      users.increments();
    users.string("username", 200).notNullable().unique();
    users.string('password', 200).notNullable().unique();
    users.string('department', 200).notNullable();
  });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
