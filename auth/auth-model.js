const db = require('../data/dbconfig')

module.exports = {
    add,
    findBy
}

function add(user) {
    return db('users').insert(user)
        .then(() => { return {username: user.username, department: user.department } })
}

function findBy(username) {
    return db('users').where({username})
}