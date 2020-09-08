// Update with your config settings.

module.exports = {
	client: "sqlite3",
	useNullAsDefault: true,
	connection: {
		filename: "./database/autho.db3",
	},
	migrations: {
		directory: "./migrations",
	},
	seeds: {
		directory: "./database/seeds",
	},
	pool: {
		afterCreate: (conn, done) => {
			conn.run("PRAGMA foreign_keys = ON", done)
		},
	},
}

  