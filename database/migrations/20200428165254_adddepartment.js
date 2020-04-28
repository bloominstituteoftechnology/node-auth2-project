
exports.up = function(knex) {
  return knex.schema.table("users", (tbl)=>{
      tbl.string("department").notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfItExists("users")
};
