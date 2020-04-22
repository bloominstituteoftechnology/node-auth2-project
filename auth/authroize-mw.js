const jwt = require('jsonwebtoken');
const secrets = require('../secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    const secrets = secrets.jwSecret

    jwt.verify(token, secret, (error, decodedToken) => {
        if (error){
            console.log(error)
            res.status(401).json({message: 'Error in token'})
        } else {
            req.decodedToken = decodedToken
            next()
        }
    })
} 

