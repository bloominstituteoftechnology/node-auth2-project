exports.up = function (knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.increments();
    tbl.text("username").notNullable();
    tbl.text("password").notNullable();
    tbl.text("department").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
