const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secret");

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwtSecret, options);
}

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json("You shall not pass");
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
  } else {
    res.status(401).json("You shall not pass");
  }
}

module.exports = { generateToken, restricted };
