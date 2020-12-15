
const jwt = require('jsonwebtoken');
const { secret } = require("../../config/secrets.js")

module.exports = (user) => (req, res, next) => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expires: "1000s",
    }
    return jwt.sign(payload, secret, options)
}

