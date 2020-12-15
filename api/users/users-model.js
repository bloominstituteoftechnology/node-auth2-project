const db = require('../../database/connection');

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db('users as u')
        .join('department as d', 'u.department', '=', 'd.id')
        .select('u.id', 'u.username', 'd.name as department');
}
function findBy(filter) {
    return db('users as u')
        .join('department as d', 'u.department', '=', 'd.id')
        .select('u.id', 'u.username', 'd.name as department', 'u.password')
        .where(filter);
}
async function add(user) {
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
}
function findById(id) {
    return db('users as u')
        .join('department as d', 'u.department', '=', 'd.id')
        .select('u.id', 'u.username', 'd.name as department')
        .where('u.id', id)
        .first();
}