
exports.seed = async function(knex) {
  await knex("roles").insert([
    { id: 1, role: "admin" },
    { id: 2, role: "staff" },
    { id: 3, role: "student" }
 ])
};
