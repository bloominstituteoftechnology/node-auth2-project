const db = require('../data/dbConfig.js')

module.exports = {
    addUser,
    findUser,
    findBy,
    find
}

function find() {
    return db("users").select("id", "username").orderBy("id");
}
function addUser(user) {
    return db('users').insert(user)
}

function findBy(any) {
    return db('users').where(any).orderBy('id')
}

function findUser() {
    return db("users")

}