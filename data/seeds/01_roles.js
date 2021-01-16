
exports.seed = async function(knex) {
  await knex("roles").insert([
    { id: 1, name: "admin" },
    { id: 2, name: "staff" },
    { id: 3, name: "student" }
 ])
};
