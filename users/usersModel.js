const db = require('../data/config')

function getUsers() {
    return db('users')
}

function addUser(user) {
    const [id] = db('users').insert(user)
    return findByID(id)
}

function findByID(id) {
    return db('users').select('id').where('id', id).first()
}

function find() {
    return db('users').select('id', 'name')
}

function findBy(filter) {
    return db('users').select('id', 'name', 'password').where(filter)
}

module.exports = {
    addUser,
    getUsers,
    findByID,
    findBy,
    find
}