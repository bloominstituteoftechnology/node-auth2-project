const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./../secrets")

const buildToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_id: user.role_name,
  }
  const options = {
    expiresIn: "1d",
  }
  const signedToken = jwt.sign(payload, JWT_SECRET, options)
  return signedToken;
}

module.exports = buildToken;