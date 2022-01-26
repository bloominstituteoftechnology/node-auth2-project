const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

function tokenBuilder(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
        role_name: user.role_name
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = {
  tokenBuilder,
}