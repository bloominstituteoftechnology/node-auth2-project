const db = require("../data/dbConfig")

async function add(user) {
	const [id] = await db("userTable").insert(user)
	return findById(id)
}

function find() {
	return db("userTable").select("id", "username")
}

function findBy(filter) {
	return db("userTable")
		.select("id", "username", "password", "department")
		.where(filter)
}

function findById(id) {
	return db("userTable")
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