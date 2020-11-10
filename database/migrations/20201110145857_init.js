exports.up = function(knex) {
  return knex.schema
    .createTable("roles", tbl => {
      tbl.increments();

      tbl.string("name", 128).notNullable().unique();
    })
    .createTable("users", tbl => {
      tbl.increments();

      tbl.string("username", 128).notNull().index();
      tbl.string("password", 256).notNull();

      tbl
        .integer("department")
        .unsigned()
        .references("department.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("department").dropTableIfExists("users");
};
