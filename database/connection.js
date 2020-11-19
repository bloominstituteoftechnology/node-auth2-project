const knex = require("knex");

const knexfile = require("../knexfile.js");
const enviroment = process.env.NODE_ENV || "development";

module.exports = knex(knexfile[enviroment]);