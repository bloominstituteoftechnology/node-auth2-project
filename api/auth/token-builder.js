const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./../secrets")

const buildToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    role_id: user.role,
  }
  const options = {
    expiresIn: "1d",
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = buildToken;