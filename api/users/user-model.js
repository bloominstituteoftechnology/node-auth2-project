const db = require('../../data/db-config')

module.exports = {
    get() {
        return db('users')
    },

    add(user) {
        return db('users').insert(user)
    }
}