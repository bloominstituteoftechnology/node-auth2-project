const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).json('I WANT A TOKEN')
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json('I WANT VALID TOKEN: ' + err.message)
      } else {
        req.decodedToken = decoded
        next()
      }
    })
  }
};