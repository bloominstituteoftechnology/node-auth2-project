const knex = require('knex');

const knexfile = require('../knexfile');
const env = process.env.NODE_ENV || 'development';

module.exports = knex(knexfile[env]);