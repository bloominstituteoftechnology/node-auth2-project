const db = require('../data/config')

function find() {
    return db('users')
}

module.exports = {
    find
}