const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if(token) {
        jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({message: 'No access granted'})
            } else {
                req.decodedJwt = decodedToken
                next();
            }
        })
    } else {
        res.status(500).json({Error: "Error in restricted-middleware"})
    }
}