const db = require("../../data/connection.js");

function get() {
    return db("users")
}

function getBy(filter) {
    return db("users")
        .where(filter)
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return getById(id)
}

function getById(id) {
    return db("users")
        .where("users.id", id)
        .first()
}

module.exports = {
    getBy,
    get,
    add,
    getById
}