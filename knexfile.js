// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/auth2.db3",
    },
    useNullAsDefault: true,
    migrations: {
      filename: "./database/migrations",
    },
    seeds: {
      filename: "./seeds",
    },
  },
};
