const db = require('../data/dbconfig')

module.exports = {
    get
}

function get() {
    return db('users').select('users.username')
}