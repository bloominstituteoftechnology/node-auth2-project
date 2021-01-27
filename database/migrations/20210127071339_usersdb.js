exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();

    tbl.string("username", 128).notNullable().unique().index();
    tbl.string("password", 256).notNullable();
    tbl.string("department", 256).notNullable();
  });
};

exports.down = function (knex) {
  return knex.dropTableIfExists("users");
};
