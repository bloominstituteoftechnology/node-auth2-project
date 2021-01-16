
exports.seed = async function(knex) {
  await knex("users").insert([
    {id: 1, username: "vicky", password: "abc123", role_id: 1},
    {id: 2, username: "Nelson", password: "abc123", role_id: 1},
    {id: 3, username: "John", password: "abc123", role_id: 2},
    {id: 4, username: "Noah", password: "abc123", role_id: 2},
    {id: 5, username: "Ram", password: "abc123", role_id: 3},
    {id: 6, username: "Hari", password: "abc123", role_id: 3},
  ])
};
