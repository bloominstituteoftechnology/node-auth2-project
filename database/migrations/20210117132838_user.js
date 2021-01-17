
exports.up = async function(knex) {
  await knex.schema.createTable('user', (table) => {
      table.increments('id')
      table.text('username').notNull().unique()
      table.text('password').notNull()
      table.text('department')

  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('user')
};
