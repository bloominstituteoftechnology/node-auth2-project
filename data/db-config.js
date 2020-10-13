const knex = require("knex")
const config = require("../knexfile")

const db = knex(config.development)

module.exports = {
    find,
    add,
    findBy
}

function find(){
    return db("users")
}

function add(user){
    return db("users").insert(user)
    
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}