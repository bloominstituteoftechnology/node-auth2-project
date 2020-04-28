exports.seed = function (knex) {
  return knex("department").insert([
    { name: "admin" },
    { name: "sales" },
    { name: "finance" },
  ]);
};
