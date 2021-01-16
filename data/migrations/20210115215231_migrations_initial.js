
exports.up = async function (knex) {
    await knex.schema.createTable("roles", (table) => {
        table.increments("id")
        table.text("name").notNull().unique()
    })
  
    await knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.text("username").notNull().unique()
        table.text("password").notNull()
        table.integer("role_id").notNull().defaultTo(1).references("id").inTable("roles").onDelete("RESTRICT").onUpdate("CASCADE")
    })
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExsists("roles")
    await knex.schema.dropTableIfExsists("users")
};
