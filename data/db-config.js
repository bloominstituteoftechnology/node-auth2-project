// const knex = require("knex");
// const config = require("../knexfile")
// const db = knex(config.development)
// module.exports = db

const knex = require("knex");

const knexfile = require("../knexfile.js");
const environment = process.env.NODE_ENV || "development";

module.exports = knex(knexfile[environment]);
