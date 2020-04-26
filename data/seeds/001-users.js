
exports.seed = function seedUsers(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      knex('users').insert([
        {
          username: 'Cpt.Picard',
          password: 'Enterprise001',
          roleid: 0,
          admin: 1,
        },
        {
          username: 'Cmdr. Riker',
          password: 'Enterprise002',
          roleid: 0,
          admin: 1,
        },
        {
          username: 'Lt. Cmdr. Data',
          password: 'Enterprise0003',
          roleid: 1,
          admin: 1,
        },
      ]);
    });
};
