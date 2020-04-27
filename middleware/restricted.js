const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'forbidden' });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      throw new Error('invalid authentication details');
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
