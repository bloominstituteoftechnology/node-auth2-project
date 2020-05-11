const bcrypt = require("bcryptjs");
const db = require("../data/db-config");

module.exports = {
  find,
  findBy,
  add,
  findById,
};

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password", "department")
    .where(filter);
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .select("id", "username", "department")
    .first();
}
