module.exports = {
  add,
  find,
  findBy,
  findById,
};

const db = require("../../data/connection");

function findById(id) {
  return db("users").where({ id }).first();
}

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function add(newUser) {
  return db("users")
    .insert(newUser)
    .then((ids) => {
      const id = ids[0];

      return findById(id);
    });
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}
