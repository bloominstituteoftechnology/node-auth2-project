/* eslint-disable func-names */

const cleaner = require('knex-cleaner');

exports.seed = function cleanTable(knex) {
  return cleaner.clean(knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};
