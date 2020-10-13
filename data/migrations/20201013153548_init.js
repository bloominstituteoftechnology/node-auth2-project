exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments(),
        table.string("username").notNullable().unique().index();
      table.string("password").notNullable();
    })
    .createTable("roles", (table) => {
      table.increments();
      table.string("name", 128).notNullable().unique();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
