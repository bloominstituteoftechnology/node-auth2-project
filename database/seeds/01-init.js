exports.seed = function(knex){
  const department = [
    {name: "admin"},
    {name: "user"},
  ];

  return knex("department")
    .insert(department)
    .then(() => console.log("\n== Seed data for department table added. ==\n"));
};