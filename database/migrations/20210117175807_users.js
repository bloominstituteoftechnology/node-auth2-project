exports.up = async function(knex) {
	await knex.schema.createTable("users", (tbl) => {
		tbl.increments()
		tbl.text("username").notNull().unique()
        tbl.text("password").notNull()
        tbl.text("departments")
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("users")
}
