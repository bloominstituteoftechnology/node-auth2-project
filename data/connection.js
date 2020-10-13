const knex = require("knex");

const knexfile = require("../knexfile");

const environment = "development";

module.exports = knex(knexfile[environment]);
