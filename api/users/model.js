const db = require('../../data/dbConfig.js');
const query = db('users');

async function get() {
    const users = await query;
    return users 
      ? users
      : null;
};

function getBy(filter) {};

function add(user) {};

function remove(userid) {};

function update(userid, changes) {};

function patch(userid, changes) {};

module.exports = {
    get,
    getBy,
    add, 
    remove, 
    update, 
    patch,
};

