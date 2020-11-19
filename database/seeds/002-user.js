exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "admin",
      password: "password",
      role: 1,
    },
    {
      username: "user",
      password: "password",
      role: 2,
    },
  ];

  return knex("users")
    .del()
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
