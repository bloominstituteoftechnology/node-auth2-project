exports.seed = function (knex) {
    return knex("users").insert([
        {
            id: 1,
            username: "maple2",
            password: "wrow",
            department: "department",
        },
        {
            id: 2,
            username: "beebop",
            password: "hello123",
            department: "haha nice",
        },
        {
            id: 3,
            username: "beebop2electricboogaloo",
            password: "hhhh",
            department: "gummy bear department",
        }
    ])
  }