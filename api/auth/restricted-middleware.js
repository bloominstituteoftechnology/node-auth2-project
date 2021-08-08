const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({
      status: 401,
      message: "No token for you",
    });
  }
  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return next({
        status: 401,
        message: `Your token is bad: ${err.message}`,
      });
    }
    req.decodedJwt = decodedToken;
    next();
  });
};
