const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
    // token must be included in the header as Authorization
    const [directive, token] = req.headers.authorization.split(" ")

    if (!directive || directive != 'Bearer') {
        res.status(401).json({ message: 'no bear!' })
    }
    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'invalid token' })
            }
            req.decodedJWT = decodedToken
            console.log(decodedToken)
            next()
        })
    } else {
        res.status(401).json({ message: 'No token found' })
    }
}