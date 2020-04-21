
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    {username: 'Frodo', password: 'GANDALF!', department: 'Fellowship'},
    {username: 'Sam', password: 'po-ta-toes!', department: 'Fellowship'},
    {username: 'Legolas', password: 'theyretakingthehobbitstoisengard!', department: 'Fellowship'},
    {username: 'Gollum', password: 'precious', department: 'Misty Mountains'},
    {username: 'Boromir', password: 'onedoesnotsimply', department: 'Gondor'},
    {username: 'Eowyn', password: 'iamnoman', department: 'Rohan'},
    {username: 'Witch King', password: 'nomancankillme', department: 'Mordor'},
  ]);
};
