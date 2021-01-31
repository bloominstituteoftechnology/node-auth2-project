
exports.seed = async function(knex) {
      await knex('users').insert([
        {id: 1, username: "johndoe", password: "qwerty123", department: "Food"},
        {id: 2, username: "janedoe", password: "asdfg321", department: "Home Goods"}
      ]);
};
