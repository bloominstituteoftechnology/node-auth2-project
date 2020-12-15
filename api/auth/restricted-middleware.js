const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

module.exports = (req, res, next) => {
  // pull the token from header
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json('we wants token')
  } else {
    // check it with jwt (async form verify)
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json('we wants GOOD token: ' + err.message)
      } else {
        // token valid and not expired,
        // tack the decoded token to req and proceed
        req.decodedToken = decoded
        next()
      }
    })
  }
};
