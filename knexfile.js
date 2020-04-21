// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./databse/auth.db3",
    },
    migrations: {
      directory: "./databse/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    useNullAsDefault: true,
  },
};
