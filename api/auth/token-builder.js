const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../secrets");

module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwtSecret, options);
};
