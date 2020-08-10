exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const departments = [
    {
      name: "Admin", // will get id 1
    },
    {
      name: "IT", // will get id 2
    },
    {
      name: "Sales", // will get id 3
    },
    {
      name: "HR", // will get id 4
    },
    { 
      name: "Finance", // will get id 5
    }
  ];

  return knex("departments")
    .insert(departments)
    .then(() => console.log("\n== Seed data for departments table added. ==\n"));
};
