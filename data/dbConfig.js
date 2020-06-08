const knex = require("knex");

const db = require("../knexfile.js");
const environment = process.env.NODE_ENV || "development";

module.exports = knex(db[environment]);