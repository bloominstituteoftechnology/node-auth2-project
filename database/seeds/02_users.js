const { use } = require("../../users/users-router");

exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "Admin", password: "password", department: "1"
    },
    {
      username: "Moss", password: "password", department: "2"
    },
    {
      username: "Roy", password: "password", department: "2"
    },
    {
      username: "Blake", password: "password", department: "3"
    },
    {
      username: "Ricky Roma", password: "password", department: "3"
    },
    {
      username: "Toby H. Flenderson", password: "password", department: "4"
    },
    {
      username: "Kevin Malone", password: "password", department: "5"
    },
    {
      username: "Oscar Martinez", password: "password", department: "5"
    },
    {
      username: "Angela Martin", password: "password", department: "5"
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
