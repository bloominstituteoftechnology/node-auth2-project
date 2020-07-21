const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = secrets.jwtSecret;
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        //Token is invalid or secret is wrong
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        // Token is good
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please provide authentication." });
  }
};
