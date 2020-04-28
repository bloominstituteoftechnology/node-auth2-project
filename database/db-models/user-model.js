const db = require("../dbConfig.js");

module.exports = {
  addUser,
  getUsers,
  getUserById,
  findBy,
};

// function getUsers(department) {
//   return db("users as u")
//     .join("department as d", "d.id", "u.department_id")
//     .select("u.id", "u.username", "d.name")
//     .where("d.name", department);
// }

function getUsers(department) {
  return db("users")
    .select("id", "username", "department")
    .where({ department });
}

// function getUserById(id) {
//   return db("users as u")
//     .join("department as d", "d.id", "u.department_id")
//     .select("u.id", "u.username", "d.name")
//     .where("u.id", id)
//     .first();
// }

function getUserById(id) {
  return db("users")
    .select("id", "username", "department")
    .where("id", id)
    .first();
}

// function findBy(filter) {
//   return db("users as u")
//     .join("department as d", "d.id", "u.department_id")
//     .select("u.id", "u.username", "u.password", "d.name as role")
//     .where(filter)
//     .first();
// }

function findBy(filter) {
  return db("users")
    .select("id", "username", "password", "department")
    .where(filter)
    .first();
}

// async function addUser(newUser) {
//   const [id] = await db("users").insert({
//     username: newUser.username,
//     password: newUser.password,
//     department_id: db("department")
//       .select("id")
//       .where("name", newUser.department),
//   });

//   return getUserById(id);
// }

async function addUser(newUser) {
  const [id] = await db("users").insert(newUser);

  return getUserById(id);
}
