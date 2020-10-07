const db = require("../data/db-config.js");

function find(){
    return db("users")
        .select("id", "username", "department")
        .orderBy("id");
};

function findBy(filter) {
    return db("users")
        .select("id", "username", "password")
        .where(filter)
}

function findById(id) {
    return db("users")
        .where({ id })
        .first();
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    find,
    findBy,
    findById,
    add
  };