const db = require('../../data/dbConfig.js');

const table = 'users';

function getAll() {
  return db(table);
}

function getBy(filter) {
  return db(table).where(filter).first();
}

async function add(user) {
  const [userid] = await db(table).insert(user, 'userid');

  return getBy({ userid });
}

function remove(userid) {
  return userid;
}

function update(userid, changes) {
  return { userid, changes };
}

function patch(userid, changes) {
  return { userid, changes };
}

module.exports = {
  getAll,
  getBy,
  add,
  remove,
  update,
  patch,
};
