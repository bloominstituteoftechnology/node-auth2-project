const db = require('../database/config')

module.exports = {
    findUser,
    findUserId,
    addUser,
    findUserBy,
    findByUsername
}

function findUser() {
    return db('user').select('id','username')
}

function findUserBy(filter) {
	return db("user")
		.select("id", "username", "password")
		.where(filter)
}

function findByUsername(username) {
	return db("user as u")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password")
}

function findUserId(id) {
    return db('user')
        .select('id', 'username')
        .where({id})
        .first()
}

async function addUser(user) {
    const [id] = await db('user').insert(user)
    return findUserId(id)
}