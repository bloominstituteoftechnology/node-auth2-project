
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'Cpt.Picard', password: 'Enterprise001', roleid: 0, admin: 1 },
        { username: 'Cmdr. Riker', password: 'Enterprise002', roleid: 0, admin: 1 },
        { username: 'Lt. Cmdr. Data', password: 'Enterprise0003', roleid: 1, admin: 1 }
      ]);
    });
};
