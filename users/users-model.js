const db = require("../database/connection.js");

module.exports = {
  add,
  find,
  findBy,
  findAll,
  findById,
};

function find(dep) {
  return db("users as u")
    .select("u.id", "u.username", "d.name as department")
    .join("departments as d", "u.department", "d.id")
    .where({ department: dep });
}

function findAll() {
  return db("users as u")
    .join("departments as d", "u.department", "d.id")
    .select("u.id", "u.username", "d.name as department");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}
