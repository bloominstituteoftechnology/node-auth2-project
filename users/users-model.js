//set up database object
const db = require('../database/dbConfig.js');

//construct helper functions

//find users
function find(){
    return db('users').select('id', 'username', 'password');
}

//find users through a specific filter
function findBy(filter){
    return db('users').where(filter);
}

//add users with async
async function add(user) {
    const [id] = await db('users').insert(user, 'id');

    return findById(id);
}

//find user by id
function findById(id) {
    return db('users').where({id}).first();
}