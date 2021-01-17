//Pre-hashed password for "abc123"
const hashedPassword = "$2a$12$gidvflLXiaXpoNrYsLGFe.f2vwJPIERvmb8LP0FgYzeyjeQMpK0Va";

exports.seed = async function(knex) {
  await knex("users").insert([
    {id: 1, username: "vicky", password: hashedPassword, role_id: 1},
    {id: 2, username: "Nelson", password: hashedPassword, role_id: 1},
    {id: 3, username: "John", password: hashedPassword, role_id: 2},
    {id: 4, username: "Noah", password: hashedPassword, role_id: 2},
    {id: 5, username: "Ram", password: hashedPassword, role_id: 3},
    {id: 6, username: "Hari", password: hashedPassword, role_id: 3},
  ])
};
