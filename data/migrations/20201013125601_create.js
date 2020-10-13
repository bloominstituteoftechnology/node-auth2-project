
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments()
        tbl.text("username").notNull().unique()
        tbl.text("password").notNull()
        tbl.text("department").notNull()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users")
  };