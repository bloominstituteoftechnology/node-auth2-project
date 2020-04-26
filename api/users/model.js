const db = require('../../data/dbConfig.js');

const query = db('users');

function getAll() {
  return query;
}

function getBy(filter) {
  return query.where(filter);
}

async function add(user) {
  const [userid] = await query.insert(user, 'userid');

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
