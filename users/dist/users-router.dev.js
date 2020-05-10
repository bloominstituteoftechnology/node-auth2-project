"use strict";

var express = require("express");

var Users = require("./users-model");

var restrict = require("../middleware/restrict");

var router = express.Router(); // This endpoint is only available to logged-in admin users due to the `restrict` middleware

router.get("/", restrict("admin"), function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.t0 = res.status(200);
          _context.next = 4;
          return regeneratorRuntime.awrap(Users.find());

        case 4:
          _context.t1 = _context.sent;

          _context.t0.json.call(_context.t0, _context.t1);

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t2 = _context["catch"](0);
          next(_context.t2);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;