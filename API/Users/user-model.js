const db = require("../../DATABASE/db-config");
const find = () => {
  return db("users");
};

const findBy = (filter) => {
  return db("users").where(filter);
};

async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
  }
  

const findById = (id) => {
  return db("users").where("id", id);
};

module.exports = {
  find,
  findBy,
  add,
  findById,
};
