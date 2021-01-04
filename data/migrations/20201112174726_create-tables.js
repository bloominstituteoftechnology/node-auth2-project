const { enable } = require("../../server");

exports.up = function(knex) {
  return knex.schema
  .createTable("Users", tbl =>{
    tbl.increments();

    tbl.string("name", 128).notNullable().unique();

    tbl.string("password", 128).notNullable();

    tbl.string("department", 128).notNullable()
  })
};

exports.down = function(knex) {
  
};
