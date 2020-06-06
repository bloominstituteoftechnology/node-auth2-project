
exports.up = function(knex) {
  return knex.schema
    .createTable('user', tbl => {
      tbl.increments('id');
      tbl.string('username', 128)
        .notNullable()
        .unique()
        .index();
      tbl.string('password', 128)
        .notNullable();
      tbl.string('department')
        .notNullable();
    })
};

exports.down = function(knex) {
  
};
