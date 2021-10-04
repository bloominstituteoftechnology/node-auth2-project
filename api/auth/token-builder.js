const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets');

module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role_name: user.role_id
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, JWT_SECRET, options)
}