
exports.up = function createUserTable(knex) {
  return knex.schema.createTable('users', (table) => {
    // auto incrementing userid
    table.increments('userid').primary();
    // username
    table.text('username').notNullable();
    // password
    table.text('password', 8).notNullable();
    // user roleid
    table.integer('roleid').defaultTo(0);
    // admin
    table.integer('admin').defaultTo(0);
  });
};

exports.down = function dropUserTable(knex) {
  return knex.schema.dropTableIfExists('users');
};
