// Update with your config settings.

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './database/users.db3',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './database/migrations/20200811174219_users.js',
		},
		seeds: {
			directory: './database/seeds',
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys = ON', done);
			},
		},
	},
};
