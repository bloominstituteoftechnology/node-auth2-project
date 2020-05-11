// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/users.db3",
    },
  },

  migrations: {
    directory: "./migrations",
  },

  seeds: {
    directory: "./seeds",
  },

  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};
