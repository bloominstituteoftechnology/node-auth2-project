exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const departments = [
    {
      name: "finance", // will get id 1
    },
    {
      name: "sales", // will get id 2
    },
  ];

  return knex("departments")
    .insert(departments)
    .then(() => console.log("\n== Seed data for departments table added. ==\n"));
};
