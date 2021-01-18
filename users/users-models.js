const db = require("../data/config")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
	return db("users as u")
		.select("u.id", "u.username", "u.department")
}

function findByUsername(username) {
	return db("users as u")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password", "u.department")
}

function findById(id) {
    return db("users as u")
        .select("u.id", "u.username")
        .where("u.id", id)
        .first()
}

module.exports = {
	add,
	find,
    findByUsername,
    findById
}