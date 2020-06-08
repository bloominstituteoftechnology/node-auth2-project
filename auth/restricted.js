const jwt = require('jsonwebtoken')
const secret = require('../config/secrets.js')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (token) {
            jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
                if (error) {
                    res.status(401).json({ message: 'Your are not allowed to touch it' })
                } else {
                    req.decodedJwt = decodedToken
                    next();
                }
            })
        } else {
            res.json({ message: 'Invalid authorization' })
        }
    }
    catch  {
        res.status(401).json({ message: 'You need to Login' })
    }
}