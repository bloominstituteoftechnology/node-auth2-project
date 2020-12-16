const db = require('../../database/config');

module.exports = {
  add,
  getAll,
  getBy
};

async function add(user) {
  const [id] = await db('users')
    .insert(user, 'id');
    return db ('users')
      .select('users.id', 'users.username', 'users.department')
      .where('users.id', id)
      .first();
}

function getAll() {
  return db('users')
    .select('users.id', 'users.username', 'users.department');
}

function getBy(filter) {
  return db ('users')
    .select('users.id', 'users.username', 'users.department', 'users.password')
}
