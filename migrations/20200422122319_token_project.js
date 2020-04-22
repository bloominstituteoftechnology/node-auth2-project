
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
        users.increments('id');
        users.string('username')
          .notNullable()
          .unique();
        users.string('password')
          .notNullable();
        users.string('department')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
