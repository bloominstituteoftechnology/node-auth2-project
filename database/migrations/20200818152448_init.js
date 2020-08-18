exports.up = function (knex) {
  return knex.schema
    .createTable("department", (tbl) => {
      tbl.increments();

      tbl.string("name", 128);
    })
    .createTable("users", (tbl) => {
      tbl.increments();

      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("department").dropTableIfExists("users");
};
