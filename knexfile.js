// Update with your config settings.

module.exports = {
	development: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/staff.db3",
		},
	},
	migrations: {
		directory: "./data/migrations",
	},
	seeds: {
		directory: "./data/seeds",
	},
	pool: {
		afterCreate: (conn, done) => {
			// runs after a connection is made to the sqlite engine
			conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
		},
	},
	staging: {
		client: "sqlite3",
		connection: {
			database: "./data/staff.db3",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		client: "sqlite3",
		connection: {
			database: "./data/staff.db3",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};
