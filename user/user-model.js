const db = require("../database/config")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function addUser(user) {
    return db('users').insert(user)
}

function find() {
	return db("users").select("id", "username","department")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}

function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}

module.exports = {
	add,
	find,
	findBy,
	findById,
}
