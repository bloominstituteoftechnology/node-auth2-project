
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl =>{
        tbl.increments();
        tbl.string('username', 130).notNullable().unique().index();
        tbl.string('password', 260).notNullable()
        tbl.string('department').notNullable()
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};
