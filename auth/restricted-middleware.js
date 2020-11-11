const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets.js')

module.exports = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'hello, where is your token?' })
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log('decoded error ->', err);
      return res.status(401).json({ message: 'token no bueno' })
    }

    console.log('decoded token ->', decoded)
    req.decodedJwt = decoded
    next()
  })
}
