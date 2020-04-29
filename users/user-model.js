const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findBy,
  add,
}

function find(){
  return db('users')
    .select('id', 'username', 'department')
}

function findBy(filter){
  return db('users').where(filter);
}

function add(user){
  return db('users').insert(user);
}

function findById(id){
  return db('users')
    .where({id})
    .first();
}