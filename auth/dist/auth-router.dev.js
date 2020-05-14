"use strict";

var express = require("express");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var Users = require("../users/users-model");

var restrict = require("../middleware/restrict");

var router = express.Router();
router.post("/register", restrict("admin"), function _callee(req, res, next) {
  var username, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          username = req.body.username;
          _context.next = 4;
          return regeneratorRuntime.awrap(Users.findBy({
            username: username
          }).first());

        case 4:
          user = _context.sent;

          if (!user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            message: "Username is already taken"
          }));

        case 7:
          _context.t0 = res.status(201);
          _context.next = 10;
          return regeneratorRuntime.awrap(Users.add(req.body));

        case 10:
          _context.t1 = _context.sent;

          _context.t0.json.call(_context.t0, _context.t1);

          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t2 = _context["catch"](0);
          next(_context.t2);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.post("/login", restrict("admin"), function _callee2(req, res, next) {
  var authError, user, passwordValid, tokenPayload;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          authError = {
            message: "Invalid Credentials"
          };
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Users.findBy({
            username: req.body.username
          }).first());

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(401).json(authError));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 9:
          passwordValid = _context2.sent;

          if (passwordValid) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(401).json(authError));

        case 12:
          tokenPayload = {
            userId: user.id,
            userRole: "admin" // this would normally come from the database

          }; // this sends the token back as a cookie instead of in the request body,
          // so the client will automatically save it in its cookie jar.

          res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET || "La vida es sueño"));
          res.json({
            message: "Welcome ".concat(user.username, "!")
          });
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);
          next(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 17]]);
});
module.exports = router;