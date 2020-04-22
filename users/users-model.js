const db = require("../data/db-Config");

module.exports = {
	getAll,
	getUsersBy,
	addUser,
};

function getAll() {
	return db("users");
}

function getUsersBy(filter) {
	return db("users").where(filter);
}

function addUser(user) {
	return db("users")
		.insert(user)
		.then(([id]) => getUsersWhere({ id }));
}