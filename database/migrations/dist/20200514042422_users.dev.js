"use strict";

exports.up = function _callee(knex) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex.schema.createTable("users", function (table) {
            table.increments();
            table.text("username").notNull().unique();
            table.text("password").notNull();
            table.string("department").notNull();
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.down = function _callee2(knex) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(knex.schema.dropTableIfExists("users"));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};