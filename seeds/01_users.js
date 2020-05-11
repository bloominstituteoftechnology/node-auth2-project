exports.seed = async function (knex) {
  await knex("users").insert([
    {
      username: "big_homie_001",
      password: "W3lcom3",
      department: "Information Technology",
    },
    {
      username: "Darksouja118",
      password: "g00dB0y23",
      department: "Human Resources",
    },
    {
      username: "F_Baggins",
      password: "Myprecious45",
      department: "Custodial",
    },
  ]);
};
