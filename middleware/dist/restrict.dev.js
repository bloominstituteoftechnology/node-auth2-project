"use strict";

var jwt = require("jsonwebtoken");

function restrict() {
  var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "normal";
  return function _callee(req, res, next) {
    var authError, token;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authError = {
              message: "You shall not pass!"
            };
            _context.prev = 1;
            // this utilizes the `cookie-parser` middleware to pull the JWT out
            // of the cookies that were automatically sent by the client.
            token = req.cookies.token;

            if (token) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(401).json(authError));

          case 5:
            // this checks to make sure the token's signature is valid. if it is,
            // we can trust the data in the payload and consider the user logged in.
            // if it isn't, we know the payload may have been tampered with, and we
            // make the user log in again.
            jwt.verify(token, process.env.JWT_SECRET || "La vida es sueño", function (err, decodedPayload) {
              if (err || decodedPayload.userRole !== role) {
                return res.status(401).json(authError);
              } // we attach the decoded payload values to the request, just in case we
              // need to access them in later middleware functions or route handlers.
              // (to look up the user by ID, for example.)


              req.token = decodedPayload;
              next();
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
}

module.exports = restrict;