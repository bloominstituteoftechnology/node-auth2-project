"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var bcrypt = require("bcryptjs");

var db = require("../database/config");

function add(user) {
  var _ref, _ref2, id;

  return regeneratorRuntime.async(function add$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 14));

        case 2:
          user.password = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(db("users").insert(user));

        case 5:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          id = _ref2[0];
          return _context.abrupt("return", findById(id));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function find() {
  return db("users").select("id", "username", "department");
}

function findBy(filter) {
  return db("users").select("id", "username", "password", "department").where(filter);
}

function findById(id) {
  return db("users").select("id", "username", "department").where({
    id: id
  }).first();
}

module.exports = {
  add: add,
  find: find,
  findBy: findBy,
  findById: findById
};