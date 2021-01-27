const db = require("../../database/connection");

module.exports = {
  find,
  findById,
  add,
  findUserBy,
  findInDepartment,
};

function find() {
  return db("users as u");
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findUserBy(filter) {
  return db("users as u").where(filter).first();
}

function findInDepartment(department) {
  return db("users as u").where("u.department", department);
}
