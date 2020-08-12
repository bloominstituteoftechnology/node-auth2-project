const db = require('../../database/db-config');

const find = () => {
	return db('users').select('id', 'username', 'department');
};

const findBy = (filter) => {
	return db('users').where(filter);
};

const findById = (id) => {
	return db('users').where({ id }).first();
};

const findByDept = (department) => {
	console.log(department);
	return db('users')
		.select('id', 'username', 'department')
		.where({ department });
};

const add = (user) => {
	return db('users')
		.insert(user)
		.then(([id]) => db('users').where({ id }).first());
};

const update = (id, changes) => {
	return db('users').where({ id }).update(changes);
};

const remove = (id) => {
	return db('users').where({ id }).del();
};

module.exports = {
	find,
	findBy,
	findById,
	findByDept,
	add,
	update,
	remove,
};
