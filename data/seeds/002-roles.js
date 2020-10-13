exports.seed = function (knex) {
  // Deletes ALL existing entries
  // Inserts seed entries
  return knex("roles").insert([{ name: "admin" }, { name: "user" }]);
};
