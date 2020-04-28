
exports.up = function(knex) {
  return knex.schema.createTable('users', users=>{
      users.increments()
      users
      .string("username",123)
      .notNullable()
      .unique()
      users.string('password',123).notNullable()
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
