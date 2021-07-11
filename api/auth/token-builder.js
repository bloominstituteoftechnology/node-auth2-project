const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../secrets/index')

module.exports = function (user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
        message: user.role === 'admin'?  'Admin role initialized' : 'Welcome to user mode!'
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(
        payload,
        JWT_SECRET,
        options,
    )
}
