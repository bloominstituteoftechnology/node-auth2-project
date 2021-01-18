const bcrypt = require("bcrypt");

exports.seed = async function(knex) {
	await knex("users").insert([
		{ id: 1, username: "spongebob", password: await bcrypt.hash("abc123", 14), department: "admin" },
		{ id: 2, username: "batman", password: await bcrypt.hash("abc1234", 14), department: "user" },
	])
}