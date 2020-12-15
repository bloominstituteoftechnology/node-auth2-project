// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: 'true',
    connection: {
      filename: './database/users.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    migration: {
      directory: './database/migrations'
    }, 
    seeds: {
      directory: './database/seeds'
    }
  },

  staging: {
    
  },

  production: {

  }

};
